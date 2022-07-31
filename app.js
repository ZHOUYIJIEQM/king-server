const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.post(
  '/login',
  async (req, res, next) => {
    // res.send('home =======')
    console.log(req.body);
    return res.status(422).send({
      message: 'home 422'
    })
  }
)

const port = 3080
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})