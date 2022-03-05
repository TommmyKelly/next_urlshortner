import mongoose from "mongoose";
const Schema = mongoose.Schema;

const url = new Schema({
  short_url: {
    type: String,
    required: true,
  },
  long_url: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

const Url = mongoose.model("Url", url);

export default Url;
