const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    //Authorization: Bearer <token> 
    try {
       const token = req.header('Authorization').replace('Bearer ', '') // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZjNGFiNWYyYzIxMmEwMDhmYzhiNmYiLCJpYXQiOjE1OTM1OTQ4MTl9.ZgTRl60f7MbHfZdeYkmxaTYHBEwfEvtf6WiYuxutPSM
       const data = jwt.verify(token, process.env.JWT_KEY)
       const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth