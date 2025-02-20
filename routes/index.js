import express from 'express'
import { fetchJson } from '../helpers/fetchWrapper.js'

const index = express.Router()

// Overzicht
index.get('/', (request, response) => {
  const url = `${process.env.API_URL}/squads/`

  fetchJson(url).then((data) => {
    response.render('index', data)
  })
})

export default index
