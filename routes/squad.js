import express from 'express'
import { fetchJson } from '../helpers/fetchWrapper.js'

const index = express.Router()

// Overzicht
index.get('/', (request, response) => {
    const id = request.query.id || null
    const url = `${process.env.API_URL}/squad/?id=${id}`

    fetchJson(url).then((data) => {
        response.render('squad', data)
    })
})

export default index
