import { postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

const shout = express.Router()

shout.post('/', (request, response) => { // http://localhost:8000/shout
  const url = `${process.env.API_URL}/shout`

  postJson(url, request.body).then((data) => {

    console.log(request.body)

    if (data.message == 'Succes') {
      response.redirect('/member/?id=cldcsnrpc0z9w0auooju1uj1g&shoutPosted=true')

    } else {
      response.redirect('/member/?id=cldcsnrpc0z9w0auooju1uj1g&shoutPosted=false')
    }
  })
})

shout.get(/)

export default shout
