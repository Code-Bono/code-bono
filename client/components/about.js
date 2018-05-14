import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Image } from 'semantic-ui-react'
// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default function About() {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container about">
          <h2 className="grey-text">Meet the Team</h2>
          <p>
            Code Bono is a capstone project built by Ian Dewsbury, Geena Gao, Da
            Woon "Daniel" Lee, and Yoni Slotwiner at Fullstack Academy of Code.
          </p>
        </div>
      </div>
      <Container className="team">
        <Card.Group itemsPerRow={4}>
          <Card>
            <Image src="https://avatars1.githubusercontent.com/u/17074732?s=460&v=4" />
            <Card.Content>
              <Card.Header>Ian Dewsbury</Card.Header>
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://avatars3.githubusercontent.com/u/17211212?s=400&u=2bfd5d0a9f90426f6f188e77874e3f98c944f197&v=4" />
            <Card.Content>
              <Card.Header>Geena Gao</Card.Header>
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://avatars3.githubusercontent.com/u/27169173?s=460&v=4" />
            <Card.Content>
              <Card.Header>Da Woon "Daniel" Lee</Card.Header>
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://avatars3.githubusercontent.com/u/24399279?s=460&v=4" />
            <Card.Content>
              <Card.Header>Yoni Slotwiner</Card.Header>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </div>
  )
}
