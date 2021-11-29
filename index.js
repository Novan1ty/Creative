// Creative ~ 11/3/21; November 3, 2021

const Express = require('express')
const Mongoose = require('mongoose')
const Method = require('method-override')

const App = Express()

App.use(Express.static('Creative'))
App.set('view-engine', 'ejs')
App.use(Express.urlencoded({ extended: true }))
App.set('views', __dirname + '/Creative')
App.use(Method('_method'))

Mongoose.connect(process.env['MongoDB'], {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Connected.'))

// const Login = require('./Routes/Login.js')
const Character = require('./Routes/Character.js')
const Realm = require('./Routes/Realm.js')
// const Region = require('./Routes/Region.js')
const Item = require('./Routes/Item.js')

// App.use('/login', Login)
App.use('/characters', Character)
App.use('/realms', Realm)
// App.use('/regions', Region)
App.use('/items', Item)

const Routes = require('./Miscs.js').Routes
App.get('/', (req, res) => {
    return res.render('Routes.ejs', { Routes: Routes })
})

App.listen(5656)