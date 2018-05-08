import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'

export const CardNote = ({ note, i }) => (
  <div key={i}>
    <li>{note}</li>
  </div>
)
export const ProjectCard = ({ card, i }) => (
  <Grid.Column>
    <div key={i}>
      <h3>{card.columnName}</h3>
      <ul>
        {card.notes.map((note, i) => {
          return <CardNote note={note} i={i} />
        })}
      </ul>
    </div>
  </Grid.Column>
)
