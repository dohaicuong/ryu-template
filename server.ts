import express from 'express'
import { engine } from 'express-handlebars'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany()

  res.render('home', {
    layout: false,
    helpers: {
      firstName() { return users[0].firstName },
      lastName() { return users[0].lastName }
    }
  })
})

app.get('/create-user', async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      firstName: 'Ryu',
      lastName: 'Nguyen'
    }
  })

  res.send({ user: newUser })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})