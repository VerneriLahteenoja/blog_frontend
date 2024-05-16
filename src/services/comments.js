import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const res = await axios.get(`${baseUrl}/comments`)
    return res.data
}

const create = async (id, comment) => {
    const res = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return res.data
}

export default { getAll, create }