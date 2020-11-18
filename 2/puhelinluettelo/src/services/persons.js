import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data
}

const create = async (person) => {
  const res = await axios.post(BASE_URL, person)
  return res
}

const remove = async (personId) => {
  const res = await axios.delete(`${BASE_URL}/${personId}`)
  return res
}

const update = async (personId, update) => {
  const res = await axios.put(`${BASE_URL}/${personId}`, update)
  return res
}

export default {
  getAll,
  create,
  delete: remove,
  update,
}
