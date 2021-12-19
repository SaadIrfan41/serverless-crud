const axios = require('axios')
require('dotenv').config()
// const { GET_LINKS } = require('./utils/linkQueries.js')
// const sendQuery = require('./utils/sendQuery')
// const formattedResponse = require('./utils/formattedResponse')
exports.handler = async (event) => {
  const CREATE_Contact_Form = `
    mutation($firstName: String!, $lastName: String!, $email: String!,$phoneNumber:String! ) {
        createContactForm( data: { firstName:$firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber }) {
            
            _id
            firstName
            lastName
            email
            phoneNumber
        }
    }
`
  const { firstName, lastName, email, phoneNumber } = JSON.parse(event.body)
  const variables = { firstName, lastName, email, phoneNumber }
  try {
    const { data } = await axios({
      url: 'https://graphql.fauna.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY}`,
      },
      data: {
        query: CREATE_Contact_Form,
        variables,
      },
    })
    console.log('Response', data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.error('ERROR', err)
    return {
      statusCode: 500,
      err: JSON.stringify(err),
    }
  }
}
