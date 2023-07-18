const express = require('express')
const db = require('./db')
const dotenv = require('dotenv');
const { swaggerServe, swaggerSetup } = require('./swaggerconfig')
const storageRoutes = require('./routes/storageRoutes')
const itemRoutes = require('./routes/itemroutes')
const itemTypeRoutes = require('./routes/itemTypesroutes')
const { options } = require('./swaggerconfig')
dotenv.config()
const app = express()
db()
app.use(express.json())
app.use('/storageSpaces', storageRoutes)
app.use('/itemTypes', itemTypeRoutes)
app.use('/items', itemRoutes)
app.use("/api-docs", swaggerServe, swaggerSetup); 

app.listen(process.env.PORT, () => {
  console.log('Listening to PORT: ', process.env.PORT)
})
