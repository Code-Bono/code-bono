import {expect} from 'chai'
import {fetchSingleProposal} from '../singleProposal'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creator', () => {
  let store
  let mockAxios

  const initialState = {proposal: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSingleProposal', () => {
    it('eventually dispatches the GET_SINGLE_PROPOSAL action', () => {
      const proposalId = 1
      const fakeProposal = {
        name: 'proposal-1',
        description: 'a great project for a great cause!'
      }
      mockAxios.onGet(`/api/proposals/${proposalId}`).replyOnce(200, fakeProposal)
      return store.dispatch(fetchSingleProposal(proposalId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_SINGLE_PROPOSAL')
          expect(actions[0].singleProposal).to.be.deep.equal(fakeProposal)
        })
    })
  })
})
