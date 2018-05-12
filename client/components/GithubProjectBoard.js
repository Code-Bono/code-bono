import React, { Component } from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import { CardNote, ProjectCard } from './utils/GitHubUtils'
import Board from 'react-trello'
import axios from 'axios'

export default class GitHubProjectBoard extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { projectCards, project, handleSubmit, handleColumnChange } = this.props
    const projectId = project.id

    // data structure required by react-trello module
    const projectBoard = projectCards.length ? projectCards.map((column, i) => {

      const columnNotes = column.cards.map((card) => {
        return (
          {
            id: card.cardId.toString(),
            description: card.note
          }
        )
      })
      return (
        {
          id: column.columnId,
          title: column.columnName,
          cards: columnNotes
        }
      )
    }) : null

    const data = {
      lanes: projectBoard
    }

    //using react-trello's "onCardAdd" attribute to dispatch thunk to update github
    function onCardAdd(card, laneId) {
      handleSubmit(card, projectId, laneId)
    }

// since the view of the board is being handled by react-trello, didn't need to go through the redux store to update state; simply needed to reach backend to make post request to github api
    function handleDragEnd(cardId, sourceLaneId, targetLaneId, position) {
      axios.post(`/api/projects/${projectId}/cards/move`, {cardId, targetColumn: targetLaneId})
      .then(res => res.data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    }

    return (
      <div>
        {
          projectCards.length ?
          <Board data={data}
            draggable={true}
            editable={true}
            hideCardDeleteIcon={true}
            handleDragEnd={handleDragEnd}
            onCardAdd={onCardAdd}
            style={{backgroundColor: 'black'}}
            />
          : null
        }
      </div>
    )
  }
}



