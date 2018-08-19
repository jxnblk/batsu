import React from 'react'
import Base from './index'

export const styled = (tag) => (...args) => {
  const funcs = args.filter(a => typeof a === 'function')
  const style = args.filter(a => typeof a !== 'function')
    .reduce((a, style) => ({ ...a, ...style }), {})

  const func = props => funcs.reduce((a, fn) => ({
    ...a,
    ...fn(props)
  }), {})

  const Component = props => {
    return (
      <Base
        {...props}
        tag={tag}
        css={{
          ...style,
          ...props.css,
          ...func(props)
        }}
      />
    )
  }

  return Component
}

export default styled
