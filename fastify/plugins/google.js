import oauthPlugin from '@fastify/oauth2'
import fastifyPlugin from 'fastify-plugin'
import axios from 'axios'
import querystring from 'querystring'
import User from '../models/user.js'

const GoogleAuth = async (fastify) => {
  try {
    // Register oauth plugin
    fastify.register(oauthPlugin, {
      name: 'googleOAuth2',
      scope: ['profile', 'email'],
      credentials: {
        client: {
          id: process.env.GOOGLE_CLIENT_ID,
          secret: process.env.GOOGLE_CLIENT_SECRET,
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      startRedirectPath: '/user/login/google',
      callbackUri: 'http://localhost:3000/user/login/google/callback',
    })

    // Define the callback route
    fastify.get('/user/login/google/callback', async (request, reply) => {
      const queryString = request.url.split('?')[1]
      const queryParams = querystring.parse(queryString)
      const authorizationCode = queryParams.code

      // Exchange authorization code for access token
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code: authorizationCode,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/user/login/google/callback',
          grant_type: 'authorization_code',
        }
      )

      const accessToken = tokenResponse.data.access_token
      const userInfoResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const userInfo = userInfoResponse.data
      console.log('User Information:', userInfo)

      // Check if user exists in database, if not, create it
      try {
        let user = await User.findOne({
          email: userInfo.email,
          password: 'google',
          username: userInfo.name,
        })
        if (!user) {
          const newUser = new User({
            username: userInfo.name,
            email: userInfo.email,
            password: 'google',
          })
          await newUser.save()
          user = newUser
        }
        const token = await user.generateAuthToken()
        // save token in cookies
        reply
          .setCookie('token', token, {
            path: '/',
            domain: 'localhost',
            httpOnly: false,
            secure: true,
            sameSite: 'None',
          })
          .redirect('http://localhost:4000')
      } catch (error) {
        fastify.log.error(error)
        reply.status(500).send({ error: 'Internal Server Error : ', error })
      }
    })
  } catch (error) {
    fastify.log.error(error)
    reply.status(500).send({ error: 'Internal Server Error : ', error })
  }
}

export default fastifyPlugin(GoogleAuth)

// http://localhost:3000/user/login/google/callback?state=x94rmBp7eRtz3QFJxWRWfA&code=4%2F0Adeu5BWdjOLFtnRAHbEBk-dOjqI4vKX9n4Hsd4RngJqiXd72-vSEoFK2ax3mmXqtKFhljA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&hd=etna-alternance.net&prompt=consent
