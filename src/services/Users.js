import axios from 'axios'

export const getUsers = async () => {
  try {
    const response = await axios({
      url: 'https://dummyjson.com/users',
      method: 'GET'
    })

    return response
  } catch (e) {
    console.log(e)
  }
}
