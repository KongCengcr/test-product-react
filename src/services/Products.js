import axios from 'axios'

export const getProducts = async () => {
  try {
    const response = await axios({
      url: 'https://dummyjson.com/products',
      method: 'GET'
    })

    return response
  } catch (e) {
    console.log(e)
  }
}
