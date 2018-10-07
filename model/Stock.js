const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  bay: {
    type: String,
    required: true,
    max: 40,
    lowercase: true
  },
  column: {
    type: String,
    lowercase: true
  },
  row: {
    type: String,
    lowercase: true
  },
  side: {
    type: String,
    lowercase: true
  },
  well: {
    type: String,
    required: true,
    lowercase: true
  },
  depth: {
    type: String,
    required: true,
    lowercase: true
  },
  box: {
    type: String,
    required: true,
    lowercase: true
  },
  sample: {
    type: String,
    required: true,
    lowercase: true
  },
  barcode: {
    type: String,
    // required: true,
    lowercase: true
  },
  status: {
    type: String
  },
  imagepublicid: {
    type: String
  },
  imageurl: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

StockSchema.plugin(mongoosePaginate);
// const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Stock = mongoose.model('stock', StockSchema);
