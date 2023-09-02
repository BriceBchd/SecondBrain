import Mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await Bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = JWT.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.verifyJWT = async function (request, reply) {
  console.log('verifyJWT');
  console.log(request.headers.authorization);
  const User = this;
  const token = request.headers.authorization.replace('Bearer ', '');
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
  if (!user) {
    throw new Error('Not authorized');
  }
  return user;
};

UserSchema.statics.findByToken = async function (token) {
  const User = this;
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
  return user;
};

UserSchema.statics.findByCredentials = async function (username, password) {
  const User = this;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid username');
  }
  const isMatch = await Bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  return user;
};

const User = Mongoose.model('User', UserSchema);

export default User;
