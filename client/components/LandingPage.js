import React, { Component } from 'react'
import { Grid, Image, Card, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {
    const { proposals, handleClick } = this.props
    return (
      <div className="pusher" id="landingPage">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="inverted header">
              CODE FOR
              <span className="header-alt"> GOOD.</span>
            </h1>
            <h2>
              Code Bono connects nonprofits with developers looking to
              contribute their skills.
            </h2>
            <br />
            <div>
              <Link to="/signup">
                <Button>Sign Up Now</Button>
              </Link>
              <span> or </span>
              <Link to="/proposals" style={{ color: '#303030' }}>
                Browse proposals
              </Link>
            </div>
          </div>
        </div>
        <h2 className="text-center" style={{ color: '#303030' }}>
          Featured Nonprofit Proposals
        </h2>
        <Container>
          <p className="text-center" style={{ color: '#303030' }}>
            Browse through proposals for technical projects for see which
            organizations need your skills
          </p>
          <br />
          {proposals.length ? (
            <Card.Group itemsPerRow={3}>
              {proposals.slice(0, 3).map(proposal => {
                return (
                  <Card key={proposal.id} className="ui card">
                    <div className="image">
                      <img src={proposal.image} />
                    </div>
                    <div className="content">
                      <a className="header">{proposal.name}</a>
                      <a className="ui sub header">
                        {proposal.organization.name}
                      </a>
                      <div className="description">{proposal.snippet}</div>
                      <br />
                      <div className="meta">
                        <span className="date">
                          Deadline: {proposal.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="extra content">
                      <button
                        className="ui button"
                        onClick={evt => handleClick(evt, proposal.id)}
                      >
                        <Link to={`/proposals/${proposal.id}`}>More info</Link>
                      </button>
                    </div>
                  </Card>
                )
              })}
            </Card.Group>
          ) : (
            <h3 className="loading">Loading project cards...</h3>
          )}
        </Container>
        <br />
        <br />
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h2 className="grey-text">About Code Bono</h2>
            <p>
              Code Bono creates new opportunities for nonprofit organizations
              and skilled engineers to connect and engage in pro bono software
              development by consolidating resources and information. Code Bono
              is a capstone project built by Ian Dewsbury, Geena Gao, Da Woon
              "Daniel" Lee, and Yoni Slotwiner at Fullstack Academy of Code.
            </p>
          </div>
        </div>
        <br />
        <h2 className="text-center">How does it work?</h2>
        <Container>
          <div className="flex how-it-works-container">
            <div className="how-it-works-singular">
              <img
                className="how-it-works-image-singular"
                src={
                  'https://cdn4.iconfinder.com/data/icons/working-human-1/48/19-512.png'
                }
              />
            </div>
            <div className="how-it-works-text-singular">
              <h4 className="subheading">Tell us about yourself</h4>
              <p className="how-it-works-text">
                Fill out a profile to tell us about your skills and which causes
                you're interested in working with
              </p>
            </div>
          </div>
          <div className="flex how-it-works-container">
            <div className="how-it-works-text-singular">
              <h4 className="subheading">Browse Open Requests</h4>
              <p className="how-it-works-text">
                Explore proposals from nonprofits that need your technical
                skills and support causes that interest you
              </p>
            </div>
            <div className="how-it-works-singular">
              <img
                className="how-it-works-image-singular"
                src="https://uploads-ssl.webflow.com/5a7f9a16c794270001337a9c/5ad52fc83d5f8367c50aee1e_Form%20-%20dark%20blue%20250px.png"
              />
            </div>
          </div>
          <div className="flex how-it-works-container">
            <div className="how-it-works-singular">
              <img
                className="how-it-works-image-singular"
                src="https://cdn3.iconfinder.com/data/icons/interaction-design/512/registration-512.png"
              />
            </div>
            <div className="how-it-works-text-singular">
              <h4 className="subheading">Sign up</h4>
              <p className="how-it-works-text">
                We'll match you with a team with like-minded developers who want
                to work on the same proposal
              </p>
            </div>
          </div>
          <div className="flex how-it-works-container">
            <div className="how-it-works-text-singular">
              <h4 className="subheading">Start hacking for good</h4>
              <p className="how-it-works-text">
                The nonprofit will send you and your team specifics for the
                project scope via our online collaboration tool
              </p>
            </div>
            <div className="how-it-works-singular">
              <img
                className="how-it-works-image-singular"
                src="https://www.freeiconspng.com/uploads/laptop-icon-png-25.png"
              />
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
