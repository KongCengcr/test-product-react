import axios from 'axios'

export async function getProducts(){
    try {
        const response = await axios({
            url: `https://dummyjson.com/products`,
            method: 'GET'
        })

        return response
    }catch(e){
        console.log(e)
    }
}