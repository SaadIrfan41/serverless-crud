const axios = require('axios')
require('dotenv').config()

exports.handler = async (event) => {
  const Get_ALL_CONTACT_FORM = `
    query{
  allContactForms{
    data{
      _id
      email
      firstName
      lastName
      phoneNumber
    }
  }
}
`

  try {
    const { data } = await axios({
      url: 'https://graphql.fauna.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY}`,
      },
      data: {
        query: Get_ALL_CONTACT_FORM,
        variables: {},
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
