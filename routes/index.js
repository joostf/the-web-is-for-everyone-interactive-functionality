import express from 'express'
import { fetchJson } from '../helpers/fetchWrapper.js'

const index = express.Router()

// Overzicht
index.get('/', (request, response) => {
  const slug = request.query.squad || 'squad-a-2022'
  const url = `${process.env.API_URL}/squad/${slug}`

  fetchJson(url).then((data) => {
    response.render('index', data)
  })
})

export default index
