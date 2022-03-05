import connectDB from "../../middleware/mongodb";
import Url from "../../models/urls";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const url = await Url.findOne({ short_url: req.query.id });
      if (url) {
        res.writeHead(302, { location: url.long_url });
        res.end();
      } else {
        res.status(404).send("url_not_found");
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

export default connectDB(handler);
