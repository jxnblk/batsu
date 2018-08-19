import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import hash from 'fnv1a'

export const id = n => 'x' + hash(n).toString(36)
export const classnames = (...args) => args.filter(Boolean).join(' ')
export const hyphenate = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

export const createRule = (className, key, value, children = '', media) => {
  const rule = '.' + className + children + '{' + hyphenate(key) + ':' + value + '}'
  if (!media) return rule
  return media + '{' + rule + '}'
}

export const parse = (obj, children = '', media) => {
  const rules = []
  const classNames = []

  for (const key in obj) {
    const value = obj[key]
    if (value === null || value === undefined) continue
    switch (typeof value) {
      case 'object':
        if (/^@/.test(key)) {
          const { className, rule } = parse(value, children, key)
          classNames.push(className)
          rules.push(rule)
        } else {
          const { className, rules } = parse(value, children + key, media)
          classNames.push(className)
          rules.push(rule)
        }
        continue
      case 'string':
      case 'number':
        const cn = id(key + value)
        const rule = createRule(cn, key, value, children, media)
        classNames.push(cn)
        rules.push(rule)
    }
  }

  return {
    className: classNames.join(' '),
    rule: rules.join('')
  }
}

export class Base extends React.Component {
  static propTypes = {
    css: PropTypes.object,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.css === state.css) return null
    const { className, rule } = parse(props.css)
    return {
      css: props.css,
      className,
      rule
    }
  }

  state = {
    didMount: false,
    css: null,
    className: null,
    rule: ''
  }

  componentDidMount () {
    this.setState({ didMount: true })
  }

  render () {
    const {
      tag: Tag = 'div',
      className,
      css = {},
      ...props
    } = this.props
    const { didMount, rule } = this.state

    const style = <style
      dangerouslySetInnerHTML={{ __html: rule }}
    />

    return (
      <React.Fragment>
        {didMount ? createPortal(style, document.head) : style}
        <Tag
          {...props}
          className={classnames(
            className,
            this.state.className
          )}
        />
      </React.Fragment>
    )
  }
}

export default Base
