import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

export const CardNote = ({ note, i }) => (
  <div key={i}>
    <div className="ui card">
      <div className="content">
        <div className="description">{note}</div>
      </div>
    </div>
  </div>
)
export const ProjectCard = ({ card, i }) => (
  <Grid.Column>
    <div key={i}>
      <h3>{card.columnName}</h3>
      {card.notes.map((note, i) => {
        return (
          <div key={i}>
            <CardNote note={note}/>
          </div>
        )
      })}
    </div>
  </Grid.Column>
)
