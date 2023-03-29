import express from 'express'
import * as dotenv from 'dotenv'
import indexRoute from './routes/index.js'
import memberRoute from './routes/member.js'
import shoutRoute from './routes/shout.js'
import { postJson } from './helpers/fetchWrapper.js'

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

// Stel de routes in
server.use('/', indexRoute)
server.use('/member', memberRoute)
// server.use('/shout', shoutRoute)

server.post('/shout', (request, response) => { // http://localhost:8000/shout
  const url = `${process.env.API_URL}/shout`

  postJson(url, request.body).then((data) => {
    console.log('body', request.body)

    if (data.message == 'Succes') {
      response.redirect(`/member/?id=${data.id}&shoutPosted=true`)
      console.log('data from api', data)
    } else {
      response.redirect(`/member/?id=${data.id}&shoutPosted=false`)
    }
  })
})

// Start met luisteren
server.listen(server.get('port'), () => {
  console.log(`Application started on http://localhost:${server.get('port')}`)
})
