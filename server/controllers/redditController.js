import axios from "axios";
import { RedditModel } from "../models/Reddit.js";

export const addRedditUrl = async (req, res, next) => {
  try {
    const url = req.body.redditUrl;
    let response;

    const redditPost = await RedditModel.findOne({
      type: "submission",
      content: url,
    });
    //console.log(redditPost);

    if (redditPost)
      return res
        .status(200)
        .json({ message: "Already tracking this reddit post" });

    try {
      response = await axios.post("http://127.0.0.1:5003/getComment", {
        url,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    const { createdAt, numComments, score, title, upvoteRatio } =
      response.data.data;

    const newRedditPost = await new RedditModel({
      type: "submission",
      content: url,
      name: title,
      originTime: createdAt,
    });

    newRedditPost.body.push({
      data: {
        submission: {
          numComments,
          score,
          upvoteRatio,
        },
      },
    });

    newRedditPost.save();

    return res.status(200).json({
      success: true,
      message: "Successfully started tracking!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSubreddit = async (req, res, next) => {
  try {
    const subreddit = req.body.subreddit;
    const isSubreddit = await RedditModel.findOne({
      type: "subreddit",
      content: subreddit,
    });

    if (isSubreddit) {
      return res
        .status(200)
        .json({ message: "Already tracking this subreddit" });
    }
    let response;
    try {
      response = await axios.post("http://127.0.0.1:5003/getSubreddit", {
        subreddit,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    const { name, numSubscribers, subredditData } = response.data.data;

    const newSubreddit = await new RedditModel({
      type: "subreddit",
      content: subreddit,
      name,
    });

    newSubreddit.body.push({
      data: {
        subreddit: {
          numSubscribers,
          hotTopics: subredditData,
        },
      },
    });

    newSubreddit.save();

    return res.status(200).json({
      success: true,
      message: "Successfully started tracking!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTracking = async (req, res, next) => {
  try {
    const allData = await RedditModel.find();

    console.log("olaayyyyy");

    return res.status(200).json({
      success: true,
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRedditTypeById = async (req, res, next) => {
  try {
    const { redditId } = req.params;
    const data = await RedditModel.findById(redditId);

    return res.status(200).json({
      success: true,
      data: data,
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
