import {expect} from 'chai'
import {createOrg} from '../organization'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creator', () => {
  let store
  let mockAxios

  const initialStore = {org: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialStore)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('createOrg', () => {
    it('eventually dispatches the CREATE_ORG action', () => {
      const mockOrg = {name: 'Seeds 4 Peace'}
      mockAxios.onPost('/api/orgs').replyOnce(201, mockOrg)
      return store.dispatch(createOrg())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_ORG')
          expect(actions[0].org).to.be.deep.equal(mockOrg)
        })
    })
  })
})
