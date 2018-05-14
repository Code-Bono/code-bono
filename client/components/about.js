import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Image, Button } from 'semantic-ui-react'

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
              <Card.Description>
                After some time as a litigator, I'm looking forward to using my
                aptitude for problem-solving and communication alongside my
                newly developed technical skills as a developer.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  href="https://github.com/ianmichaeld"
                  target="_blank"
                  basic
                  color="black"
                >
                  <a>
                    <i className="fab fa-github fa-2x" />
                  </a>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/ian-dewsbury-8806772/"
                  target="_blank"
                  basic
                  color="blue"
                >
                  <a>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://avatars3.githubusercontent.com/u/17211212?s=400&u=2bfd5d0a9f90426f6f188e77874e3f98c944f197&v=4" />
            <Card.Content>
              <Card.Header>Geena Gao</Card.Header>
              <Card.Description>
                Full-stack software engineer bent on using her powers for good.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  href="https://github.com/geenagao"
                  target="_blank"
                  basic
                  color="black"
                >
                  <a>
                    <i className="fab fa-github fa-2x" />
                  </a>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/geenagao/"
                  target="_blank"
                  basic
                  color="blue"
                >
                  <a>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://avatars3.githubusercontent.com/u/27169173?s=460&v=4" />
            <Card.Content>
              <Card.Header>Da Woon "Daniel" Lee</Card.Header>
              <Card.Description>
                A full-stack developer open to both front-end or back-end
                positions with an interest in media/entertainment.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  href="https://github.com/Dawolee"
                  target="_blank"
                  basic
                  color="black"
                >
                  <a>
                    <i className="fab fa-github fa-2x" />
                  </a>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/da-woon-lee-078938b5/"
                  target="_blank"
                  basic
                  color="blue"
                >
                  <a>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Image
              className="yoni"
              src="https://avatars3.githubusercontent.com/u/24399279?s=460&v=4"
            />
            <Card.Content>
              <Card.Header>Yoni Slotwiner</Card.Header>
              <Card.Description>
                Software developer passionate about the intersection of product,
                operations, and customer service.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  href="https://github.com/johnnyslots"
                  target="_blank"
                  basic
                  color="black"
                >
                  <a>
                    <i className="fab fa-github fa-2x" />
                  </a>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/yonislotwiner/"
                  target="_blank"
                  basic
                  color="blue"
                >
                  <a>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </div>
  )
}
