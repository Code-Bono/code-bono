import React, { Component } from 'react'
import { Form, Button, Segment, TextArea } from 'semantic-ui-react'

export const AddProjectCard = props => {

  const { noteToAdd, handleChange, handleSubmit, project } = props
  const projectId = project.id
  const toDoColumnId = project.id ? project.repo.toDoColumnId : null

  return (
    <div className="ui form">
      <form className="ui form" method="post" onSubmit={evt => handleSubmit(noteToAdd, projectId, toDoColumnId, evt)} >
          <label>Add Card To Project Board</label>
            <div className="field add-project-textarea">
                <textarea
                className="form-control"
                type="text"
                name="noteToAdd"
                value={noteToAdd}
                onChange={handleChange}
                placeholder="Enter a note"
              />
            </div>
            <button className="ui button" type="submit">Submit</button>
      </form>
    </div>
  )

}



