import React from 'react'
import Base from '../src'
import styled from '../src/styled'
import { compose, fontSize, space, color } from 'styled-system'

export const Box = ({
  bold,
  css,
  ...props
}) =>
  <Base
    {...props}
    css={{
      fontWeight: bold ? 'bold' : null,
      ...css
    }}
    mapStyles={compose(color, space)}
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
