import axios from "axios";
import { FacebookModel } from "../models/Facebook.js";
import jwt from "jsonwebtoken";
import { FacebookPostModel } from "../models/FacebookPost.js";

export const facebookLogin = async (req, res, next) => {
  try {
    const { userId, accessToken } = req.body;
    if (!userId || userId == "" || !accessToken || accessToken == "") {
      return res
        .status(400)
        .json({ message: "userId and accessToken are required" });
    }

    let { data } = await getUserByFacebookIdAndAccessToken(accessToken, userId);
    let user = await FacebookModel.findOne({ facebookId: data.id });
    let authObject = {};
    if (user) {
      console.log("hey");
      await user.updateOne({ accessToken: accessToken });
      var token = jwt.sign({ id: user._id }, "secret", { expiresIn: "20h" });
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully logged in.",
      };
      return res.status(201).json(authObject);
    } else {
      user = await FacebookModel.create({
        name: data.name,
        email: data.email,
        facebookId: data.id,
        userId,
        accessToken,
      });
      var token = jwt.sign({ id: user._id }, "secret", { expiresIn: "20h" });
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully Registered.",
      };
      return res.status(201).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

let getUserByFacebookIdAndAccessToken = (accessToken, userId) => {
  let urlGraphFacebook = `https://graph.facebook.com/v18.0/${userId}?fields=id,name,email&access_token=${accessToken}`;
  let result = axios.get(urlGraphFacebook);
  return result;
};

export const getFacebookPosts = async (req, res, next) => {
  try {
    let { userId, accessToken } = req.params;

    let urlApi = `https://graph.facebook.com/v18.0/me/posts?access_token=${accessToken}`;

    let result = await axios.get(urlApi);
    // console.log(result);

    const postArray = result.data.data;
    const filteredPostArray = postArray.filter((post) => {
      if (post.message) {
        return post;
      }
    });

    return res.status(200).json(filteredPostArray);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFacebookPostById = async (req, res, next) => {
  try {
    const { postId, accessToken } = req.params;

    let postInDatabase = await FacebookPostModel.findOne({ postId });

    if (postInDatabase) {
      return res.status(200).json({ success: true, data: postInDatabase });
    }

    let urlGraphFacebook = `https://graph.facebook.com/v18.0/${postId}?fields=created_time,story,message,shares,reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(LOVE).limit(0).summary(1).as(love),reactions.type(HAHA).limit(0).summary(1).as(haha),reactions.type(WOW).limit(0).summary(1).as(wow),reactions.type(SAD).limit(0).summary(1).as(sad),reactions.type(ANGRY).limit(0).summary(1).as(angry)&limit=10&access_token=${accessToken}`;
    let result = await axios.get(urlGraphFacebook);

    const resultData = result.data;
    let reactionObj = {};

    reactionObj.likes = { count: resultData.like.summary.total_count };
    reactionObj.loves = { count: resultData.love.summary.total_count };
    reactionObj.hahas = { count: resultData.haha.summary.total_count };
    reactionObj.wows = { count: resultData.wow.summary.total_count };
    reactionObj.sads = { count: resultData.sad.summary.total_count };
    reactionObj.angrys = { count: resultData.angry.summary.total_count };
    reactionObj.shares = { count: resultData.shares?.count || 0 };

    const post = new FacebookPostModel({
      postId,
      message: resultData.message,
      totalData: reactionObj,
      data: reactionObj,
    });

    post.save();

    return res
      .status(200)
      .json({ success: true, message: "Successfully Tracking", data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
