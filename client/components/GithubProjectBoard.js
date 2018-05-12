import React, { Component } from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import AddProjectCardContainer from './AddProjectCardContainer'
import { CardNote, ProjectCard } from './utils/GitHubUtils'
import Board from 'react-trello'

export default class GitHubProjectBoard extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const projectCards = this.props.projectCards
    console.log('PROPS?', this.props)


    const allNotes = projectCards.length ? projectCards.map((card, i) => {
      const columnNotes = card.notes.map((note, i) => {
        return (
          {
            id: `Card${i+1}`,
            description: note
          }
        )
      })
      return (
        {
          id: `lane${i+1}`,
          title: card.columnName,
          cards: columnNotes
        }
      )
    }) : null

    const data = {
      lanes: allNotes
    }

    const handleSubmit = this.props.handleSubmit
    const projectId = this.props.project.id
    const project = this.props.project


    function onCardAdd(card, laneId) {
      let columnId;
      if(laneId === 'lane1') columnId = project.repo.toDoColumnId
      else if(laneId === 'lane2') columnId = project.repo.inProgressColumnId
      else if(laneId === 'lane3') columnId = project.repo.doneColumnId

      handleSubmit(card, projectId, columnId)
    }


    return (
      <div>
        {
          projectCards.length ?
          <Board data={data}
            draggable={true}
            editable={true}
            hideCardDeleteIcon={true}
            onCardAdd={onCardAdd}
            style={{backgroundColor: 'white'}}
            />
          : null
        }
      </div>
    )
  }
}



