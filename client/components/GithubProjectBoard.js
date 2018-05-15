import React, { Component } from 'react'
import { Grid, Image, Header, Container } from 'semantic-ui-react'
import { CardNote, ProjectCard } from './utils/GitHubUtils'
import Board from 'react-trello'
import axios from 'axios'

const GitHubProjectBoard = props => {

  const {
    projectCards,
    project,
    handleSubmit
  } = props
  const projectId = project.id
  const repoURL = props.project.id ? props.project.repo.URL : null

  // data structure required by react-trello module
  const projectBoard = projectCards.map((column, i) => {
        const columnNotes = column.cards.map(card => {
          return {
            id: card.cardId.toString(),
            description: card.note
          }
        })
        return {
          id: column.columnId.toString(),
          title: column.columnName,
          cards: columnNotes
        }
      })

  const data = {
    lanes: projectBoard
  }

  //using react-trello's "onCardAdd" attribute to dispatch thunk to update github
  function onCardAdd(card, laneId) {
    handleSubmit(card, projectId, laneId)
  }

  // since the view of the board is being handled by react-trello, didn't need to go through the redux store to update state; simply needed to reach backend to make post request to github api
  function handleDragEnd(cardId, sourceLaneId, targetLaneId, position) {
    axios
      .post(`/api/projects/${projectId}/cards/move`, {
        cardId,
        targetColumn: targetLaneId
      })
      .then(res => res.data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="projectBoard-header">
          <Header as="h2" icon textAlign="center">
            <Header.Content>Github Project Board</Header.Content>
          </Header>
      </div>
      <div className="image-container">
        <a href={repoURL} target="_blank"><Image
          centered
          size="mini"
          src="https://www.freeiconspng.com/uploads/github-logo-icon-30.png"
        /></a>
      </div>
      <div className="project-board-container">
        {projectCards.length ? (
          <Board
            data={data}
            draggable={true}
            editable={true}
            hideCardDeleteIcon={true}
            handleDragEnd={handleDragEnd}
            onCardAdd={onCardAdd}
            style={{ backgroundColor: '#309aab' }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default GitHubProjectBoard
