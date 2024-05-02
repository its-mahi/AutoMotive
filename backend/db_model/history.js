// const mongoose = require('mongoose');

// const userHistorySchema = new mongoose.Schema({
//   userId: {
//     // type: mongoose.Schema.Types.ObjectId,
//     type: String,
//     // ref: 'User',
//     required: true
//   },
//   inputVideo: {
//     type: String,
//     required: true
//   },
//   output: {
//     type: String,
//     required: true
//   }
// //   timestamp: {
// //     type: Date,
// //     default: Date.now
// //   }
// });

// const UserHistory = mongoose.model('UserHistory', userHistorySchema);

// module.exports = UserHistory;


// Assuming MongoDB setup and connected
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  inputVideoUrl: { type: String, required: true },
  outputVideoUrl: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

module.exports = History;
