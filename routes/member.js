import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const member = express.Router()

// Haal de gegevens van één member op
member.get('/', (request, response) => {
  const id = request.query.id || null
  const url = `${process.env.API_URL}/member/?id=${id}`

  fetchJson(url).then((data) => {
    response.render('member', data)
  })
})

// Toon het formulier om een nieuwe member aan te maken
member.get('/new', (request, response) => {
  const data = {
    id: null,
    slug: null,
    name: null,
    prefix: null,
    surname: null,
    nickname: null,
    avatar: null,
    gitHubHandle: null,
    website: null,
    colour: null,
    bio: null,
    squad: request.query.squad || null,
  }
  response.render('memberForm.ejs', data)
})

// Handel het versturen van het formulier af
member.post('/', (request, response) => {
  // Roep de API aan met de post methode
  const url = `${process.env.API_URL}/member`
  postJson(url, request.body).then((data) => {
    let newMember = { ...request.body }
    newMember.id = data.data.createMember.id
    response.render('memberForm.ejs', newMember)
  })
})

export default member
