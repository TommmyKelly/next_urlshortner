import connectDB from "../../middleware/mongodb";
import Url from "../../models/urls";

const create_url = async () => {
  const url = Date.now().toString(36) + Math.random().toString(36).substring(2);
  const item = await Url.findOne({ short_url: url });
  if (item) {
    return create_url();
  } else {
    return url;
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if long_url is providedSS
    const { long_url } = req.body;
    if (long_url) {
      try {
        const check_url = await Url.findOne({ long_url });

        if (check_url) {
          res.status(200).json({ short_url: check_url.short_url });
        } else {
          const url = new Url({
            short_url: await create_url(),
            long_url,
          });
          // Create new user
          const url_created = await url.save();
          return res.status(200).json({ short_url: url_created.short_url });
        }
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
