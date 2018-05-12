import React, { Component } from 'react'
import { Grid, Image, Card, Feed } from 'semantic-ui-react'

export const CardNote = ({ note }) => (
  <div>
    <div className="project-card">
      <div className="content">
        <div className="description">{note}</div>
      </div>
    </div>
  </div>
)
export const ProjectCard = ({ card }) => {
  return (
    <Grid.Column>
      <div>
        <Card>
          <Card.Content>
            <Card.Header>
              <h3>{card.columnName}</h3>
            </Card.Header>
          </Card.Content>
          {
            card.notes.length ?
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    {card.notes.map((note, i) => {
                      console.log('note', note)
                      return (
                        <div key={i}>
                          <CardNote note={note}/>
                        </div>
                      )
                    })}
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
            :
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    There are currently no cards in this column
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          }
        </Card>
      </div>
    </Grid.Column>
  )
}



