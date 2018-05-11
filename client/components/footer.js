import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default function Footer() {
  return (
    <Menu inverted id="footer">
      <Menu.Item>About</Menu.Item>
      <Menu.Item>Contact</Menu.Item>
      <Menu.Item>Fullstack</Menu.Item>
    </Menu>
  )
}
