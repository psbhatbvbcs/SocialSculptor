import axios from "axios";
import { RedditModel } from "../models/Reddit.js";
import { FacebookPostModel } from "../models/FacebookPost.js";
import { FacebookModel } from "../models/Facebook.js";
import { YoutubeModel } from "../models/Youtube.js";

const updateSubmission = async (obj) => {
  const url = obj.content;

  try {
    // Fetch the latest data using axios
    const response = await axios.post("http://127.0.0.1:5003/getComment", {
      url,
    });

    const { createdAt, numComments, score, title, upvoteRatio } =
      response.data.data;

    // Update the object with the latest data
    obj.body.push({
      data: {
        submission: {
          numComments,
          score,
          upvoteRatio,
        },
      },
    });

    console.log(`Updated submission: ${url}`);
  } catch (error) {
    console.error(`Error updating submission (${url}): ${error.message}`);
  }
};

const updateSubreddit = async (obj) => {
  const subreddit = obj.content;

  try {
    // Fetch the latest data using axios
    const response = await axios.post("http://127.0.0.1:5003/getSubreddit", {
      subreddit,
    });

    const { name, numSubscribers, subredditData } = response.data.data;

    // Update the object with the latest data
    obj.body.push({
      data: {
        subreddit: {
          numSubscribers,
          hotTopics: subredditData,
        },
      },
    });

    console.log(`Updated subreddit: ${subreddit}`);
  } catch (error) {
    console.error(`Error updating subreddit (${subreddit}): ${error.message}`);
  }
};

export const updateEverything = async () => {
  try {
    // Retrieve all objects from the database
    const allObjects = await RedditModel.find();

    // Loop through each object and update it
    for (const obj of allObjects) {
      if (obj.type === "submission") {
        await updateSubmission(obj);
      } else if (obj.type === "subreddit") {
        await updateSubreddit(obj);
      }

      // Save the updated object to the database
      await obj.save();
    }

    console.log("Successfully updated everything!");

    setTimeout(updateEverything, 10 * 60 * 1000);
  } catch (error) {
    console.error("Error updating everything:", error.message);
    setTimeout(updateEverything, 10 * 60 * 1000);
  }
};

export const updateFacebookEverything = async () => {
  try {
    const facebookUser = await FacebookModel.findOne();
    const postsData = await FacebookPostModel.find();

    for (const post of postsData) {
      console.log("postId", post.postId, "user", facebookUser.accessToken);
      let urlGraphFacebook = `https://graph.facebook.com/v18.0/${post.postId}?fields=created_time,story,message,shares,reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(LOVE).limit(0).summary(1).as(love),reactions.type(HAHA).limit(0).summary(1).as(haha),reactions.type(WOW).limit(0).summary(1).as(wow),reactions.type(SAD).limit(0).summary(1).as(sad),reactions.type(ANGRY).limit(0).summary(1).as(angry)&limit=10&access_token=${facebookUser.accessToken}`;
      let result = await axios.get(urlGraphFacebook);
      const resultData = result.data;
      console.log(resultData);
      let reactionObj = {};

      reactionObj.likes = { count: resultData.like.summary.total_count };
      reactionObj.loves = { count: resultData.love.summary.total_count };
      reactionObj.hahas = { count: resultData.haha.summary.total_count };
      reactionObj.wows = { count: resultData.wow.summary.total_count };
      reactionObj.sads = { count: resultData.sad.summary.total_count };
      reactionObj.angrys = { count: resultData.angry.summary.total_count };
      reactionObj.shares = { count: resultData.shares?.count || 0 };
      post.totalData = reactionObj;
      post.data.push(reactionObj);
      post.save();
    }
    console.log("Successfully updated facebook posts");
    setTimeout(updateFacebookEverything, 10 * 60 * 1000);
  } catch (error) {
    console.error("Error updating facebook posts:", error.message);
    setTimeout(updateFacebookEverything, 10 * 60 * 1000);
  }
};

const updateChannel = async (obj) => {
  const ID = obj.content;

  try {
    // Fetch the latest data using axios
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

        obj.body.push({
          data: {
            channel: {
              subscribers: subscriberCount,
              views: viewCount,
              videos: videoCount,
            },
          },
        });

        obj.save();
      });

    console.log(`Updated channel: ${ID}`);
  } catch (error) {
    console.error(`Error updating channel (${ID}): ${error.message}`);
  }
};

const updateVideo = async (obj) => {
  const ID = obj.content;

  try {
    // Fetch the latest data using axios
    let part = "snippet,contentDetails,statistics";

    var url = "https://www.googleapis.com/youtube/v3/videos";
    url += "?part=" + encodeURIComponent(part);
    url += "&id=" + encodeURIComponent(ID);
    url += "&key=" + process.env.YOUTUBE_GOOGLE_API;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { likeCount, viewCount, commentCount } = data.items[0].statistics;

        obj.body.push({
          data: {
            video: {
              likes: likeCount,
              views: viewCount,
              comments: commentCount,
            },
          },
        });

        obj.save();
      });

    console.log(`Updated Video: ${ID}`);
  } catch (error) {
    console.error(`Error updating Video (${ID}): ${error.message}`);
  }
};

export const updateEverythingYoutube = async () => {
  try {
    // Retrieve all objects from the database
    const allObjects = await YoutubeModel.find();

    // Loop through each object and update it
    for (const obj of allObjects) {
      if (obj.type === "channel") {
        await updateChannel(obj);
      } else if (obj.type === "video") {
        await updateVideo(obj);
      }

      await obj.save();
    }

    console.log("Successfully updated everything!");

    setTimeout(updateEverythingYoutube, 10 * 60 * 1000);
  } catch (error) {
    console.error("Error updating everything:", error.message);
    setTimeout(updateEverythingYoutube, 10 * 60 * 1000);
  }
};
