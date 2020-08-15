const { mongoose } = require('../configs/mongodb-config');

const { Schema } = mongoose;

const PartnersSchema = new Schema({
  authId: {
    type: Schema.Types.ObjectId, ref: 'Auths', required: true, unique: true,
  },
  businessName: { type: String, required: true, minlength: 2 },
  address: { type: String, required: true, minlength: 10 },
}, { timestamps: true });
const PartnersModel = mongoose.model('Partners', PartnersSchema);

module.exports = PartnersModel;
