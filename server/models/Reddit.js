import { mongoose } from "mongoose";

const redditSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  originTime: {
    type: Date,
  },
  body: {
    type: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        data: {
          // Define the structure of the data for each "submission" update
          // You may need to adjust this based on your requirements
          submission: {
            numComments: Number,
            score: Number,
            upvoteRatio: Number,
          },
          // Define the structure of the data for each "subreddit" update
          subreddit: {
            numSubscribers: Number,
            hotTopics: [{ title: String, score: Number, num_comments: Number }],
          },
        },
      },
    ],
    default: [],
  },
});

export const RedditModel = mongoose.model("Reddit", redditSchema);
