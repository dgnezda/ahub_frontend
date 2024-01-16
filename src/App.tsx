import { useState } from 'react'
import './App.css'
import { WebSocketProvider, socket } from './contexts/WebsocketContext'
import { Websocket } from './components/Websocket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <WebSocketProvider value={socket}>
      <Websocket />
    </WebSocketProvider>
  )
}

export default App
