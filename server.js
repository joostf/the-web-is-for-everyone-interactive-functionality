import express from 'express'
import * as dotenv from 'dotenv'
import { fetchJson, postJson } from './helpers/fetchWrapper.js'

// expose env variables
dotenv.config()

// Maak een nieuwe express app
const server = express()

// Stel het poortnummer in
server.set('port', process.env.PORT || 8000)

// Stel de view engine in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel de public map in
server.use(express.static('public'))

// Stel afhandeling van formulieren in
server.use(express.json()) 
server.use(express.urlencoded({ extended: true }))

server.get('/', (request, response) => {
  const url = `${process.env.API_URL}/squads/`

  fetchJson(url).then((data) => {
    response.render('index', data)
  })
})

server.get('/squad', (request, response) => {
  const id = request.query.id || null
  const url = `${process.env.API_URL}/squad/?id=${id}`

  fetchJson(url).then((data) => {
      response.render('squad', data)
  })
})

server.get('/member', (request, response) => {
  const id = request.query.id || null
  const url = `${process.env.API_URL}/member/?id=${id}`
  
  fetchJson(url).then((data) => {
    response.render('member', data)
  })
})

server.post('/shout', (request, response) => {t
  const url = `${process.env.API_URL}/shout`

  postJson(url, request.body).then((data) => {
    if (data.message == 'Succes') {
      response.redirect(`/member/?id=${data.id}&shoutPosted=true`)

    } else {
      response.redirect(`/member/?id=${data.id}&shoutPosted=false`)
    }
  })
})

// Start met luisteren
server.listen(server.get('port'), () => {
  console.log(`Application started on http://localhost:${server.get('port')}`)
})
