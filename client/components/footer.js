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
        <Link to="/team">
          <Menu.Item name="About Us" />
        </Link>
        <Link to="https://www.fullstackacademy.com/">
          <Menu.Item name="Fullstack Academy" />
        </Link>
      </Menu>
    </Segment>
  )
}
