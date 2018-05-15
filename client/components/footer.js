import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment, Container } from 'semantic-ui-react'
// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default function Footer() {
  return (
    <Segment className="footer-design" inverted>
      <Container className="inner-footer">
        <Menu inverted secondary>
          <Link to="/">
            <Menu.Item name="Code Bono" />
          </Link>
          <Link to="/about">
            <Menu.Item name="About Us" />
          </Link>
          <a href="https://www.fullstackacademy.com/" target="_blank">
            <Menu.Item name="Fullstack Academy" />
          </a>
        </Menu>
        <h3 className="inspirational-quote">
          “The best way to find yourself is to lose yourself in the service of
          others.” <h3>- Mahatma Gandhi</h3>
        </h3>
        <a href="https://github.com/Code-Bono/code-bono" target="_blank">
          <i className="fab fa-github fa-2x" />
        </a>
      </Container>
    </Segment>
  )
}
