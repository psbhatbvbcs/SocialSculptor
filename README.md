# Social Sculptor
## _Track Insights of social media at one place_

Welcome to my project "Social Sculptor". As the title suggests, here you can analyse and sculpt your presence on social media.

[VIDEO LINK](https://vimeo.com/891329556?share=copy) - Video which gives a complete walkthrough of my project along with explaination of my process and ideas.
The social media platforms which is handled by this project:
- REDDIT
- FACEBOOK
- YOUTUBE

## Features
>The features were carefully created based on user experience and usefulness. I have tried to reach my best potential in the time constraint given
- REDDIT:
-- Track a subreddit: Subscribers
-- Track a post: Score, Upvotes
- FACEBOOK:
-- Track your posts: See all type of reactions, shares
- YOUTUBE:
-- Track a channel: Number of videos, subscribers, views
-- Track a video: Number of likes, views, comments
- All the data is updated automatically for the choosen interval
- The frontend supports dynamic updation of these stats for the interval with visually pleasing charts, data cards and more
- Facebook data is extracted from OAUTH-2 API. For now it is only possible from the App creators account as they allow for projects which are published to allow login from any account.
- Secure backup to backend for efficient retreival
- REDUX state management to ensure less load on the server

## Cool things to find in the project
>These are some of the things to look out for creativity and logic
- [Automatic Refressher](https://github.com/psbhatbvbcs/SocialSculptor/blob/master/server/utils/cronJob.js) - Runs the refreshing algorithms at fixed intervals of time
- [Backend Controllers](https://github.com/psbhatbvbcs/SocialSculptor/tree/master/server/controllers) - API controllers and backend to handle API requests and connection to python backend
- [Python Backend](https://github.com/psbhatbvbcs/SocialSculptor/tree/master/pythonBackend) - Python backend to handle PRAW library to manage reddit functions and API
- [Chart Data Generator on Frontedn](https://github.com/psbhatbvbcs/SocialSculptor/tree/master/client/src/scenes) - Code in folders like "YoutubeById", "FacebookPostAnalysis", etc to generate Time series data for visual enhancement

## Analysis on what improvement can be done:
>If I had more time these are some of the changes that I would do
- Handle processing of chart data in seperate components
- Better logic to handle failures in API fetching of Facebook
- Strong encryption on data saved in the backend
- Reduce redundancy both in frontend and backend by refactoring some parts of code

## Tech

The tech used for the project:

- NodeJs
- Express
- React
- Python
- MongoDB
- REST API's
- Material UI Library for styled components

All API's have been extracted after careful understanding of the documentation.
