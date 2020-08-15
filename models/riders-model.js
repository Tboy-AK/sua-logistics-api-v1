const { mongoose } = require('../configs/mongodb-config');

const { Schema } = mongoose;

const RidersSchema = new Schema({
  authId: {
    type: Schema.Types.ObjectId, ref: 'Auths', required: true, unique: true,
  },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  verified: { type: Boolean, required: true, default: false },
}, { timestamps: true });
const RidersModel = mongoose.model('Riders', RidersSchema);

module.exports = RidersModel;
