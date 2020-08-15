const { mongoose } = require('../configs/mongodb-config');

const { Schema } = mongoose;

const ItemSchema = new mongoose.Schema({
  name: { type: Number, required: true, unique: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, min: 0.00 },
}, { timestamps: true });

const OrdersSchema = new mongoose.Schema({
  orderStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: [
      'in cart', 'ordered', 'canceled', 'in transit', 'delivered', 'completed', 'returned',
    ],
  },
  partnerId: { type: Schema.Types.ObjectId, ref: 'Partners', required: true },
  riderId: { type: Schema.Types.ObjectId, ref: 'Riders', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
  items: [ItemSchema],
  discount: { type: Number, min: 0.00 },
  desc: { type: String, required: true },
}, { timestamps: true });
const OrdersModel = mongoose.model('Orders', OrdersSchema);

module.exports = OrdersModel;
