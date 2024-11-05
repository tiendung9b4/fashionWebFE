import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr'; // Import SignalR library
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiGetAllUser } from '../services/authService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { ApiGetAllMessageByChatId, ApiGetChatByBothUserId } from '../services/chatService';

export default function Chat() {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
  const [connection, setConnection] = useState(null);
  const [admins, setAdmins] = useState([]); // List of admins
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Currently selected admin
  const [messages, setMessages] = useState([]); // List of messages
  const [messageInput, setMessageInput] = useState(''); // Input for new message

  useEffect(() => {
    if(!user['id']){
        navigate('/login')
    }else{
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7006/chat?userId="+user['id']) // Replace with your SignalR endpoint
          .withAutomaticReconnect()
          .build();
    
        setConnection(newConnection);
    }

  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('SignalR connected');
          // Fetch list of admins
          fetchAdmins();
          // Listen for new messages
          connection.on('ReceiveMessage', (fromUserName, messageContent) => {
            setMessages(prevMessages => [...prevMessages, { fromUserName, messageContent }]);
          });
        })
        .catch(err => console.error('SignalR connection error:', err));
    }
  }, [connection]);

  //Load all message
  useEffect(() => {
    if(!user['id']){
        navigate('/login')
    }else{
        if(selectedAdmin?.id){
            ApiGetChatByBothUserId(selectedAdmin?.id, user['id'])
            .then(data => {
                ApiGetAllMessageByChatId(data?.result?.chatId)
                .then(data => {
                    setMessages(data?.result)
                })
            })
            .catch(error => {
                setMessages([])
            })
        }

    }
  }, [selectedAdmin])

  // Fetch list of admins
  const fetchAdmins = () => {
    // Replace with your API call to fetch admins
    ApiGetAllUser()
    .then(data => {
        if(user?.roles?.includes('admin')){
            setAdmins(data?.result?.filter(u => u.id != user['id']));
            // Automatically select the first admin
            if (data?.result?.length > 0) {
                setSelectedAdmin(data?.result[0]);
            }
        }else{
            setAdmins(data?.result?.filter(u => u.roles.includes('admin')));
            // Automatically select the first admin
            if (data?.result?.filter(u => u.roles.includes('admin'))?.length > 0) {
                setSelectedAdmin(data?.result[0]);
            }
        }
    })
    .catch(error => {
        ErrorCommonAxios(error)
    })
    
  };

  // Send a new message
  const sendMessage = () => {
    if (connection && messageInput.trim() !== '') {
      connection.invoke('SendMessage', selectedAdmin?.id, messageInput)
        .catch(err => console.error('Error sending message:', err));
      setMessageInput('');
    }
  };
//container mx-auto py-8 flex flex-wrap pt-32 mb-32
  return (
    <div className="flex h-screen container mx-auto pt-32 mb-32">
      {/* Left Sidebar for Admins */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Select Admin</h2>
        <ul>
          {admins.map(admin => (
            <li key={admin?.id} onClick={() => setSelectedAdmin(admin)} className={`cursor-pointer ${admin?.id === selectedAdmin?.id ? 'bg-blue-500 text-white' : 'bg-gray-300' } p-2 rounded mb-2`}>
              {admin?.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Right Sidebar for Messages */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{selectedAdmin?.name}</h2>
          <button onClick={fetchAdmins} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh Admins</button>
        </div>
        <div className="overflow-y-auto h-5/6">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.user === 'Me' ? 'text-right' : ''}`}>
              <strong>{msg.fromUserName}: </strong>
              <span>{msg.messageContent}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
