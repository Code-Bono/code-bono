import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="ui stackable inverted divided grid">
          <div className="nine wide column">
            <h4 className="ui inverted header">About</h4>
            <div className="ui inverted link list">
              <p className="text-left">
                Code Bono creates new opportunities for nonprofit organizations
                and skilled engineers to connect and engage in pro bono software
                development by consolidating information and resources for the
                market. Code Bono is a capstone project built by Ian Dewsbury,
                Geena Gao, Da Woon "Daniel" Lee, and Yoni Slotwiner at Fullstack
                Academy of Code.
              </p>
            </div>
          </div>
          <div className="three wide column">
            <h1>Code Bono</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
