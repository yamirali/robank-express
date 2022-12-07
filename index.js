const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
var favicon = require('serve-favicon');

const PORT = process.env.PORT || 3050

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)
app.use('/favicon.ico', express.static('/favicon.ico'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.y4fsiww.mongodb.net/todos', {
            useNewUrlParser: true,
        })
        app.listen(PORT, () => {
            console.log('started')
        })
    } catch (e) {
        console.log(e)
    }
}

app.locals.isLogedin = false
app.locals.mainUser = {}
 
start()