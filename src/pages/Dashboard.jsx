import React from 'react'
import Header from '../components/Header.jsx'
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