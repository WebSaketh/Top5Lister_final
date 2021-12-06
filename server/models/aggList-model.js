const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top5ListSchema = new Schema(
  {
    name: { type: String, required: true },
    lists: { type: [String], required: true },
    likes: { type: [String], required: false },
    dislikes: { type: [String], required: false },
    views: { type: Number, required: false },
    comments: { type: [String], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AggList", Top5ListSchema);
