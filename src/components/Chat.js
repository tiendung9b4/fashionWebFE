import React, { useState, useEffect, useRef } from 'react';
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
  const [userMap, setUserMap] = useState({}); // Map for user IDs to usernames

  const messagesEndRef = useRef(null); // Ref for the end of the message list

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    if (!user['id']) {
      navigate('/login')
    } else {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7006/chat?userId=" + user['id']) // Replace with your SignalR endpoint
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
          // Fetch user map and admins
          fetchAdmins();
          fetchUserMap(); // Ensure this is populated before messages start arriving
        })
        .catch(err => console.error('SignalR connection error:', err));

      connection.onclose(() => {
        console.log('SignalR connection closed. Reconnecting...');
        setTimeout(() => connection.start(), 5000); // Reconnect every 5 seconds
      });


    }
  }, [connection]);

  useEffect(() => {
    if (connection && Object.keys(userMap).length > 0) { // Check if userMap is populated
      // Setup the ReceiveMessage listener
      connection.on('ReceiveMessage', (fromUserId, messageContent) => {
        const fromUserName = userMap[fromUserId] || fromUserId;
        setMessages(prevMessages => [
          ...prevMessages,
          { fromUserName, messageContent }
        ]);
      });
    }
    return () => {
      if (connection) {
        connection.off('ReceiveMessage'); // Clean up listener
      }
    };
  }, [connection, userMap]); // Trigger when userMap is updated

  //Load all message
  useEffect(() => {
    if (!user['id']) {
      navigate('/login')
    } else {
      if (selectedAdmin?.id) {
        ApiGetChatByBothUserId(selectedAdmin?.id, user['id'])
          .then(data => {
            ApiGetAllMessageByChatId(data?.result?.chatId)
              .then(data => {
                const mappedMessages = data?.result.map(msg => ({
                  ...msg,
                  fromUserName: userMap[msg.fromUserName] || msg.fromUserName,
                  toUserName: userMap[msg.toUserName] || msg.toUserName,
                }));

                setMessages(mappedMessages)
              })
          })
          .catch(error => {
            setMessages([])
          })
      }

    }
  }, [selectedAdmin, connection, userMap])

  // Fetch list of admins
  const fetchAdmins = () => {
    // Replace with your API call to fetch admins
    ApiGetAllUser()
      .then(data => {
        const adminsList = user.roles.includes('admin')
          ? data.result.filter(u => u.id !== user.id)
          : data.result.filter(u => u.roles.includes('admin'));
        setAdmins(adminsList);
        if (adminsList.length > 0) setSelectedAdmin(adminsList[0]);
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })

  };
  // Fetch the user map (ID -> Username)
  const fetchUserMap = () => {
    ApiGetAllUser().then(data => {
      const map = {};
      data?.result.forEach(u => {
        map[u.id] = u.name;
      });
      setUserMap(map);
    });
  };

  // Send a new message
  const sendMessage = () => {
    if (connection && messageInput.trim() !== '') {
      connection.invoke('SendMessage', selectedAdmin?.id, messageInput)
        .catch(err => console.error('Error sending message:', err));
      setMessageInput('');
    }
  };
  // Handle Enter key press in input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent newline if the input is a textarea
      sendMessage();
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
            <li key={admin?.id} onClick={() => setSelectedAdmin(admin)} className={`cursor-pointer ${admin?.id === selectedAdmin?.id ? 'bg-blue-500 text-white' : 'bg-gray-300'} p-2 rounded mb-2`}>
              {admin?.name}
              {/* <img style={{ borderRadius: '50%' }} className="bg-blue-500 w-10 h-10 flex justify-center items-center" alt='' src={admin?.avatarUrl} /> */}

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
            <div key={index} className={`mb-2 flex ${msg.fromUserName === user.name ? 'justify-start' : 'justify-end'}`}>
              <div className={`p-2 rounded-lg ${msg.fromUserName === user.name ? 'bg-blue-200 text-left' : 'bg-gray-300 text-right'}`}>
                <strong>{msg.fromUserName}: </strong>
                <span>{msg.messageContent}</span>
              </div>
            </div>
          ))}
          {/* Ref to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyPress}

            className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}