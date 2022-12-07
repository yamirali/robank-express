const {Router} = require('express')
const { route } = require('express/lib/application')
const Todo = require('../models/Todo')
const User = require('../models/User')
const Good = require('../models/Good')
const router = Router()

router.get('/market', async (req, res) => {
    const goods = await Good.find({}).lean()

    res.render('index', {
        title: 'Goods',
        isMarket: true,
        goods
    })
})

router.get('/cart', (req,res) => {
    if(req.app.locals.isLogedin) {
        console.log('success')
        res.render('cart', {
            title: 'Your cart',
            isCart: true,
            mainUser: req.app.locals.mainUser
        })
    } else {
        console.log('error')

        res.render('cart', {
            title: 'Your cart',
            isCart: true,
            isLogedin: false
        })
    }
    
})

// router.get('/create', (req,res) => {
//     res.render('create', {
//         title: 'Create todo',
//         isCreate: true
//     })
// })

// router.post('/create', async (req,res) => {
//     const todo = new Todo({
//         title: req.body.title,
//     })

//     await todo.save()
//     res.redirect('/')
// })

router.post('/buy', async (req, res) => {
    const good = await Good.findById(req.body.id).lean()
    const user = await User.findById(req.app.locals.mainUser._id)
    
    console.log(req.body.quantity)
    good.quantity = req.body.quantity
    user.order.push(good)
    req.app.locals.mainUser = user;

    await user.save()

    res.redirect('/index')
})

router.post('/remove', async (req, res) => {
    const good = await Good.findById(req.body.id).lean()
    const user = await User.findById(req.app.locals.mainUser._id)
    
    var index = user.order.findIndex((obj) => obj._id == req.body.id)
    user.order.splice(index, 1);

    req.app.locals.mainUser = user;
    await user.save()

    res.redirect('/cart')
})

router.get('/allLogin', async (req, res) => {
    const users = await User.find({}).lean()

    res.render('allLogin', {
        title: 'Users page',
        isProfile: true,
        users
    })
})

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login page',
        isLogin: true
    })
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({'login': req.body.login})
    if(user) {
        if(user.password == req.body.pass) {
            req.app.locals.isLogedin = true
            req.app.locals.mainUser = user
            res.redirect('/allLogin')
        }
        else {
            console.log('error')
            res.render('login', {
                info: 'error login'
            })
        }
    } else {
        console.log('error')
        res.render('login', {
            info: 'error login'
        })
    }
})

module.exports = router