import React from 'react'
import Header from '../components/header'
import SocialLinksForm from '../components/SocialLinkForm'

const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="container">
      <SocialLinksForm/>
    </div>
    </>
  )
}

export default Dashboard