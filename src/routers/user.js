
const express = require('express')
const User = require('../models/User')
const auth = require("../middleware/auth");

const router = express.Router()


router.post('/user', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
       // res.status(400).send(error)
          res.status(400).send({message : "E-mail already exists!"})
    }
})


router.post('/user/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/user/me', auth, async(req, res, next) => {
    // View logged in user profile
    res.send(req.user)
})

router.get('/user/grantpermission/:id', auth, async(req, res, next) => {
    // View logged in user profile
    if(req.user.admin){
        const user  = await User.grantPermission(req.params.id); 
        res.send(user); 
    }else{
        res.send({message : "Not authorized to access this resource"})
    }
})

router.get('/user/revokepermission/:id', auth, async(req, res, next) => {

    if(req.user.admin){
        const user  = await User.revokePermission(req.params.id); 
        res.send(user); 
    }else{
        res.send({message : "Not authorized to access this resource"})
    }
})


router.get('/users', auth, async(req, res, next) => {
    // View logged in user profile
    if(req.user.admin){
        const users  = await User.getAll(); 
        res.send(users); 
    }else{
        res.send({message : "Not authorized to access this resource"})
    }
})



router.post('/user/me/logout', auth, async (req, res ,next) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


// the user will logout of the all the devices ; a.k.a : enough internet for the day 
router.post('/user/me/logoutall', auth, async(req, res,next) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router