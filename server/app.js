if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const UserController = require('./controller/userController')
const Controller = require('./controller/controller')
const authentication = require('./middleware/authentication')
const authorization = require('./middleware/authorization')


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/register', UserController.userRegister)
app.post('/login', UserController.userLogin)
app.post('/login/google', UserController.userLoginGoogle)
app.get('/digimons', Controller.getAllDigimon)
app.get('/digimons/:id', Controller.digimonDetail)
app.post('/digimons/:id/detail', Controller.openAI)
app.use(authentication, authorization)
app.get('/profile', Controller.getUser)
app.put('/profile', Controller.editUser)
app.delete('/profile', Controller.deleteUser)

app.listen(port, () => {
    console.log(`Example app listening on port ${PORT}`)
})