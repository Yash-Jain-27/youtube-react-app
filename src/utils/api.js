import axios from 'axios'

// can be set and used as process.env.YOUTUBE_API_KEY
const apiKey = ''

export const request = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: apiKey,
    },
})