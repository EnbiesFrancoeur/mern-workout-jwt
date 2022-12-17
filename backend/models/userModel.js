const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('Both Email and password are required')
  }

  if (!validator.isEmail(email)) {
    throw Error('Invalid Email Addresses')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password must be at least 8 characters long (minimum : 1 lower case, 1 upper case, 1 number,1 special character or symbols)')
  }
  //check if user exists
  const isExist = await this.findOne({ email })

  if (isExist) {
    throw Error('Email already exists')
  }
  //bcrypt
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// static login method

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('Both Email and password are required')
  }
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema);
