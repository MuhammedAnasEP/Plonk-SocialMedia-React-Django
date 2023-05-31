import React from 'react'
import Layout from '../../components/Layout'
import ChatBody from '../../components/Messages/ChatBody'

function Message() {
  return (
    <div>
      <Layout page='home'>
        <ChatBody/>
      </Layout>
    </div>
  )
}

export default Message
