import { Schema, model } from "mongoose";

var YoutubeSchema = new Schema(
  {
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
            channel: {
              subscribers: Number,
              views: Number,
              videos: Number,
            },
            // Define the structure of the data for each "subreddit" update
            video: {
              likes: Number,
              views: Number,
              comments: Number,
            },
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const YoutubeModel = model("Youtube", YoutubeSchema);
