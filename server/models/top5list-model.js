const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top5ListSchema = new Schema(
  {
    name: { type: String, required: true },
    items: { type: [String], required: true },
    ownerEmail: { type: String, required: true },
    username: { type: String, required: false },
    likes: { type: [String], required: false },
    dislikes: { type: [String], required: false },
    views: { type: Number, required: false },
    comments: { type: [String], required: false },
    public: { type: Boolean, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Top5List", Top5ListSchema);
