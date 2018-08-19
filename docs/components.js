import React from 'react'
import Base from '../src'
import styled from '../src/styled'
import { fontSize, space, color } from 'styled-system'

export const Box = ({
  bold,
  p,
  color,
  bg,
  css,
  ...props
}) =>
  <Base
    {...props}
    css={{
      fontWeight: bold ? 'bold' : null,
      padding: p,
      color: color,
      backgroundColor: bg,
      ...css
    }}
  />

const inc = state => ({ count: state.count + 1 })
const colors = [
  'magenta',
  'cyan',
  'yellow'
]
export class Counter extends React.Component {
  state = {
    count: 0
  }
  render () {
    const { count } = this.state
    const color = colors[count % colors.length]
    return (
      <Box
        {...this.props}
        onClick={e => this.setState(inc)}
        css={{
          WebkitUserSelect: 'none'
        }}
        bg={color}>
        {count} {color}
      </Box>
    )
  }
}

export const Heading = styled('h1')({
  color: 'tomato'
}, color, fontSize, space)
