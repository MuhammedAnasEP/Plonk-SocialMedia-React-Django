import Card from '../Card'
import ChatList from './ChatList'
import ChatContent from './ChatContent'

const ChatBody = () => {
  return (
    <Card>
        <div className='flex gap-1 h-[600px] '>
            <ChatList/>
            <ChatContent />
        </div>
    </Card>
  )
}

export default ChatBody
