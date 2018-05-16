import React, { Component } from 'react'
import { Grid, Image, Card, Button, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class AllProposals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proposalName: ''
    }

    this.filterProposals = this.filterProposals.bind(this)
  }

  filterProposals(proposal) {
    const proposalMatch = new RegExp(this.state.proposalName, 'i')
    return proposalMatch.test(proposal.name)
  }

  renderProposalSearch() {
    return (
      <div>
        <div className="ui left icon input focus search">
          <i className="search icon" />
          <input
            type="text"
            placeholder="Search proposal name..."
            onChange={evt => {
              this.setState({ proposalName: evt.target.value })
            }}
          />
        </div>
        {/*<select className="ui compact selection dropdown">
          <option value="all">All Causes</option>
          <option selected="" value="mentoring">
            Mentoring
          </option>
          <option value="counselling">Counselling</option>
          </select>*/}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {
    const { proposals } = this.props

    return (
      <div>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container stripe">
            <h2 className="grey-text">All Proposals</h2>
            <p>
              Browse through proposals and causes for technical projects to see
              which organizations need your skills
            </p>
          </div>
        </div>
        <Container>
          {this.renderProposalSearch()}
          {proposals.length ? (
            <Card.Group itemsPerRow={3}>
              {proposals.filter(this.filterProposals).map(proposal => {
                return (
                  <Card key={proposal.id} className="ui card">
                    <div className="image">
                      <img src={proposal.image} />
                    </div>
                    <div className="content">
                      <Link className="header" to={`/proposals/${proposal.id}`}>
                        {proposal.name}{' '}
                      </Link>
                      <a className="ui sub header">
                        {proposal.organization.name}
                      </a>
                      <div className="description">{proposal.snippet}</div>
                      <br />
                      {proposal.causes.length ? (
                        <div className="content">
                          Causes:{' '}
                          {proposal.causes.map(cause => `${cause.name}`)}
                        </div>
                      ) : null}
                      <br />
                      <div className="meta">
                        <span className="date">
                          Deadline: {proposal.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="extra content">
                      <Link to={`/proposals/${proposal.id}`}>
                        <Button primary id="all-proposals-more-info">
                          More info
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </Card.Group>
          ) : (
            <h3 className="loading">Loading project cards...</h3>
          )}
        </Container>
      </div>
    )
  }
}
