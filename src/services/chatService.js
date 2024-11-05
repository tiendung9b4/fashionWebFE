// import React from 'react'
import axios from '../axios/myAxios'

const ApiGetChatByBothUserId = (userId1, userId2) => {
    return axios.get(`api/chat/GetChatByBothUserId?userId1=${userId1}&userId2=${userId2}`)
}

const ApiGetAllMessageByChatId = (chatId) => {
    return axios.get(`api/chat/GetAllMessageByChatId/${chatId}`)
}

export { ApiGetChatByBothUserId, ApiGetAllMessageByChatId }