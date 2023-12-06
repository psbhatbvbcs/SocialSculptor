import { Schema, model } from "mongoose";

var FacebookPostSchema = new Schema(
  {
    postId: {
      type: String,
    },
    message: {
      type: String,
    },
    totalData: {
      likes: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      loves: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      hahas: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      wows: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      sads: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      angrys: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      shares: {
        count: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    },
    data: [
      {
        likes: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        loves: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        hahas: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        wows: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        sads: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        angrys: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
        shares: {
          count: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const FacebookPostModel = model("FacebookPost", FacebookPostSchema);
