import { useContext, useEffect, useState } from "react"
import { WebSocketContext } from "../contexts/WebsocketContext"

type NotificationPayload = {
    content: string
    msg: string
}

export const Websocket = () => {
    const [value, setValue] = useState('')
    const [notifications, setNotifications] = useState<NotificationPayload[]>([])
    const socket = useContext(WebSocketContext)
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected!')
        })
        socket.on('onNotification', (newNotification: NotificationPayload) => {
            console.log('onNotification event received!')
            console.log(newNotification)
            setNotifications(prev => [...prev, newNotification])
        })

        return () => {
            console.log('Unregistering Events')
            socket.off('connect') // need to call this, otherwise it will connect 2 times
            socket.off('onNotification')
        }
    }, []) // empty dependency array means this useEffect hook will only run once

    const onSubmit = () => {
        socket.emit('newNotification', value)
        setValue('')
    }

    return (
        <div>
            <h1>Websocket Component</h1>
            <div>
                {notifications.length === 0 
                    ? <div>No notifications</div>
                    : <div>
                        {notifications.map(msg => <div>
                            <p>{msg.content}</p> {/* FIXME: Warning - every DIV child needs a unique ID */}
                        </div>)}
                    </div>
                }
            </div>
            <div>
                <input 
                    type="text" 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                />
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    )
}
