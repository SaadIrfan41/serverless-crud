const axios = require('axios')
require('dotenv').config()
// const { GET_LINKS } = require('./utils/linkQueries.js')
// const sendQuery = require('./utils/sendQuery')
// const formattedResponse = require('./utils/formattedResponse')
exports.handler = async (event) => {
  const Single_Contact_Form = `
    query($id: ID! ) {
        findContactFormByID(  id: $id) {
            
            _id
            firstName
            lastName
            email
            phoneNumber
        }
    }
`
  const { id } = JSON.parse(event.body)

  const variables = { id }
  try {
    const { data } = await axios({
      url: 'https://graphql.fauna.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: Single_Contact_Form,
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
