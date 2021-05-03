// const { Client } = require('pg')
const { Pool } = require('pg')

const dotenv = require('dotenv');
dotenv.config();
// const AWS = require('aws-sdk')
// const secretsManager = new AWS.SecretsManager({ region: 'us-east-1'  })

// const getSecrets = async (secretId) => {
//   return await new Promise((resolve, reject) => {
//     secretsManager.getSecretValue(secretId, (err, result) => {
//       if (err) reject(err)
//       // resolve(JSON.parse(result.secretString))
//       console.log(result)
//     })
//   })
// }

// const secret = getSecrets(process.env.SECRET_ID)

// const test = async () => {


exports.handler = async (event, context, cb) => {
  // const client = new Client({
  //   user: 'postgres',
  //   host: process.env.HOST,
  //   // database: 'flashcards-2',
  //   password: process.env.PASSWORD,
  //   port: process.env.PORT,
  // });

  // await client
  //   .connect()
  //   .then(() => console.log('connected'))
  //   .catch(err => console.error('connection error', err.stack))

  // await client.query('SELECT datname FROM pg_database', (err, res) => {
  //   if (err) throw err
  //   console.log(res.rows)
  // })
  
  // client.end()

  const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    // database: 'flashcards-2',
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
  // callback - checkout a client
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query("SELECT * FROM public.flashcards", (err, res) => {
      done()
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })
  })
  await pool.end()

}