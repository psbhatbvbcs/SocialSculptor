import axios from "axios";
import { RedditModel } from "../models/Reddit.js";
import { YoutubeModel } from "../models/Youtube.js";

export const addYoutubeChannel = async (req, res, next) => {
  try {
    console.log("hey");
    const ID = req.body.ytChannel;

    console.log(ID);
    const youtubeChannel = await YoutubeModel.findOne({
      type: "channel",
      content: ID,
    });
    //console.log(redditPost);

    if (youtubeChannel)
      return res
        .status(200)
        .json({ message: "Already tracking this youtube channel" });

    let part = "snippet,contentDetails,statistics";

    console.log(process.env.YOUTUBE_GOOGLE_API);

    var url = "https://www.googleapis.com/youtube/v3/channels";
    url += "?part=" + encodeURIComponent(part);
    url += "&id=" + encodeURIComponent(ID);
    url += "&key=" + process.env.YOUTUBE_GOOGLE_API;

    let data;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { subscriberCount, viewCount, videoCount } =
          data.items[0].statistics;

        const { title, publishedAt } = data.items[0].snippet;

        const newYoutubeChannel = new YoutubeModel({
          type: "channel",
          content: ID,
          name: title,
          originTime: publishedAt,
        });

        newYoutubeChannel.body.push({
          data: {
            channel: {
              subscribers: subscriberCount,
              views: viewCount,
              videos: videoCount,
            },
          },
        });

        newYoutubeChannel.save();
      });

    return res.status(200).json({
      success: true,
      message: "Successfully started tracking!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addYoutubeVideo = async (req, res, next) => {
  try {
    const ID = req.body.ytVideo;

    const youtubeVideo = await YoutubeModel.findOne({
      type: "video",
      content: ID,
    });
    //console.log(redditPost);

    if (youtubeVideo)
      return res
        .status(200)
        .json({ message: "Already tracking this youtube channel" });

    let part = "snippet,contentDetails,statistics";

    var url = "https://www.googleapis.com/youtube/v3/videos";
    url += "?part=" + encodeURIComponent(part);
    url += "&id=" + encodeURIComponent(ID);
    url += "&key=" + process.env.YOUTUBE_GOOGLE_API;

    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const { likeCount, viewCount, commentCount } =
            data.items[0].statistics;

          const { title, publishedAt } = data.items[0].snippet;

          const newYoutubeVideo = new YoutubeModel({
            type: "video",
            content: ID,
            name: title,
            originTime: publishedAt,
          });

          newYoutubeVideo.body.push({
            data: {
              video: {
                likes: likeCount,
                views: viewCount,
                comments: commentCount,
              },
            },
          });

          newYoutubeVideo.save();
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

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
    const allData = await YoutubeModel.find();

    console.log("olaayyyyy");
    console.log(allData);

    return res.status(200).json({
      success: true,
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRedditTypeById = async (req, res, next) => {};
