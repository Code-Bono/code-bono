import React from 'react'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export default function Home() {
  return (
    <div>
      <Link to="/collab">
        <h3>Take me to my collaboration eden!!</h3>
      </Link>
    </div>
  )
}
