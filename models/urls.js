import mongoose from "mongoose";
var Schema = mongoose.Schema;

var url = new Schema({
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

var Url = mongoose.model("Url", url);

export default Url;
