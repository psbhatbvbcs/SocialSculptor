from flask import Flask, request, jsonify
from flask_cors import CORS
import praw
import os

app = Flask(__name__)
CORS(app)

MONGO_URI = os.environ.get("MONGO_URI")

reddit_client_id = os.environ.get("REDDIT_CLIENT_ID")
reddit_client_secret = os.environ.get("REDDIT_CLIENT_SECRET")
reddit_password = os.environ.get("REDDIT_PASSWORD")
reddit_user_agent = os.environ.get("REDDIT_USER_AGENT")
reddit_username = os.environ.get("REDDIT_USERNAME")


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/getComment", methods=["POST"])
def getComment():
    try:
        url = request.json["url"]

        reddit = praw.Reddit(
            client_id=reddit_client_id,
            client_secret=reddit_client_secret,
            password=reddit_password,
            user_agent=reddit_user_agent,
            username=reddit_username,
        )

        submission = reddit.submission(url=url)

        results = {
            "title": submission.title,
            "score": submission.score,
            "numComments": submission.num_comments,
            "upvoteRatio": submission.upvote_ratio,
            "createdAt": submission.created_utc,
        }

        return {"data": results}

    except Exception as e:
        print(str(e))


@app.route("/getSubreddit", methods=["POST"])
def getSubreddit():
    subredditName = request.json["subreddit"]

    reddit = praw.Reddit(
        client_id=reddit_client_id,
        client_secret=reddit_client_secret,
        password=reddit_password,
        user_agent=reddit_user_agent,
        username=reddit_username,
    )

    subreddit = reddit.subreddit(subredditName)

    submission_data = []

    for submission in subreddit.hot(limit=10):
        submission_info = {
            "title": submission.title,
            "score": submission.score,
            "num_comments": submission.num_comments,
        }
        submission_data.append(submission_info)

    subredditData = {
        "name": subreddit.display_name,
        "numSubscribers": subreddit.subscribers,
        "subredditData": submission_data,
    }

    return {"data": subredditData}


if __name__ == "__main__":
    app.run(port=5003)
