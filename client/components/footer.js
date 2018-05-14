import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default function Footer() {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Link to="/">
          <Menu.Item name="Code Bono" />
        </Link>
        <Link to="/about">
          <Menu.Item name="About Us" />
        </Link>
        <Menu.Item
          name="Fullstack Academy"
          href="https://www.fullstackacademy.com"
        />
      </Menu>
    </Segment>
  )
}
