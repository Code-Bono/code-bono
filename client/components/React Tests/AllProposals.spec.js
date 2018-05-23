import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProposals from '../AllProposals'
import { Link } from 'react-router-dom'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProposals', () => {
  let proposals = [{
    name: 'Give Our Kids a Home',
    description:
      'We are looking for a team to create a mobile app that matches orphans with prospective adoptive parents. The final project should support cross-platform functionality (i.e. both iOS and Android compatible). Experience with development in React Native is a major plus!',
    deadline: '2018-06-22',
    isActive: true,
    image: 'http://www.tedthomas.com/wp-content/uploads/2017/01/home1.png',
    causes: [],
    organization: {
      name: 'Federation for Orphans'

    }
  }]

  beforeEach(() => {
    proposals = shallow(<AllProposals proposals={proposals} fetchProposalsFromServer={() => undefined} />)
  })

  it('renders the organization name as a link', () => {
    expect(proposals.find('a').text()).to.be.equal('Federation for Orphans')
  })
})
