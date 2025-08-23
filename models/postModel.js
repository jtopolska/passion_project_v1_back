const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: String },
  publishDate: { type: Date },
  reactions: {
    like: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    thumbUp: { type: Number, default: 0 },
    heart: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);





// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     imageUrl: { 
//         type: String, 
//         required: true 
//     }
// }, { timestamps: true });

// module.exports = mongoose.model(`Posts`, postSchema)