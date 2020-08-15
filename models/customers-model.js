const { mongoose } = require('../configs/mongodb-config');

const { Schema } = mongoose;

const CustomersSchema = new Schema({
  authId: {
    type: Schema.Types.ObjectId, ref: 'Auths', unique: true, required: true,
  },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
}, { timestamps: true });
const CustomersModel = mongoose.model('Customers', CustomersSchema);

module.exports = CustomersModel;
