import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

export const AddProjectCard = props => {

  const { noteToAdd, handleChange, handleSubmit } = props

  return (
    <form className="ui form" method="post" onSubmit={evt => handleSubmit(noteToAdd, evt)} >
      <div className="field">
        <label>Add Card To Project Board</label>
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
  )

}
