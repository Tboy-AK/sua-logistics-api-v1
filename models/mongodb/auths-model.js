const { mongoose } = require('../../configs/mongodb-config');

const AuthsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  phone: {
    type: String, required: true, unique: true, minlength: 10,
  },
  password: { type: String, required: true, minlength: 6 },
  userType: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['admin', 'partner', 'rider', 'customer'],
  },
}, { timestamps: true });
const AuthsModel = mongoose.model('Auths', AuthsSchema);

module.exports = AuthsModel;
