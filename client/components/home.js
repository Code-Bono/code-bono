import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export default function LandingPage() {
  return (
    <div>
      <Link to="/collab">
        <h3>Take me to my collaboration eden!!</h3>
      </Link>
    </div>
  )
}
