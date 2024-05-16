import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const res = await axios.get(`${baseUrl}/comments`)
    return res.data
}

const create = async (blogId, newObject) => {
    const res = await axios.post(`${baseUrl}/${blogId}/comments`, newObject)
    return res.data
}

export default { getAll, create }