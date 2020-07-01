const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema ; 

const userSchema = Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    admin: {
        type: Boolean,
        default: false
    },
    tokens: [{ 
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


userSchema.statics.grantPermission = async (id) => {

    const user = await User.findOne({ _id : id } )
    if (!user) {
        throw new Error({ error: 'User not Found ! ' })
    }
    user.admin = true; 
    user.save(); 
    return user
}


userSchema.statics.revokePermission = async (id) => {

    const user = await User.findOne({ _id : id } )
    if (!user) {
        throw new Error({ error: 'User not Found ! ' })
    }
    user.admin = false; 
    user.save(); 
    return user
}
userSchema.statics.getAll = async () => {
    const users = await User.find({});
    if (!users) {
        // s3ib l7al hna :P 
        throw new Error({ error: 'Users not Found ! ' })
    }
    
    return users
}
const User = mongoose.model('User', userSchema)

module.exports = User