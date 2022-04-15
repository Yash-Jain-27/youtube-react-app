import { request } from "../utils/api"

export const getSearchResults = async (query) => {
    return await request.get('search', {
        params: {
            part: 'id,snippet',
            type: 'video',
            q: query
        }
    })
}

export const getNextPageSearchResults = async (query, page) => {
    return await request.get('search', {
        params: {
            part: 'id,snippet',
            type: 'video',
            q: query,
            pageToken: page
            // pageToken: 'CAUQAA',
        }
    })
}
