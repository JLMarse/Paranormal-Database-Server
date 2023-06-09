const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//funciona

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],

      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],

      trim: true
    },
    avatar: {
      type: String,
      trim: true,
      default: ''
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    favoriteEvents: [
      {
        ref: 'event',
        type: Schema.Types.ObjectId
      }
    ],
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { name, lastName, avatar, email, _id } = this
  const payload = { name, lastName, avatar, email, _id }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("user", userSchema);

module.exports = User;
