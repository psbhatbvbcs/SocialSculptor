import { Box, Grid, Typography, styled, useMediaQuery } from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import AppCurrentReddit from "components/Dashboard/AppCurrentReddit";
import AppRedditDisplay from "components/Dashboard/AppRedditDisplay";
import AppWidgetSummary from "components/Dashboard/AppWidgetSummary";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export const RedditType = () => {
  const { redditId } = useParams();
  const { reddit } = useSelector((state) => state.app);

  const [redditData, setRedditData] = useState({});
  const [chartData, setChartData] = useState({});
  const [charter, setCharter] = useState({});
  const [chartOkData, setChartOkData] = useState({});
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

  useEffect(() => {
    const selectedReddit = reddit.find((item) => item._id === redditId);
    setRedditData(selectedReddit || {});
  }, [redditId, reddit]);

  useEffect(() => {
    try {
      console.log(redditData);
      if (redditData?.body?.length > 0) {
        const latestData =
          redditData.body[redditData.body.length - 1]?.data[redditData.type] ||
          {};
        setCharter(latestData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [redditData]);

  const getChartData = (type) => {
    try {
      if (type === "submission" && charter.numComments && charter.score) {
        return [charter.numComments, charter.score];
      } else if (type === "subreddit" && charter.numSubscribers) {
        console.log("hooooyea", charter.numSubscribers);
        return [charter.numSubscribers];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error getting chart data:", error);
      return [];
    }
  };

  const generateChartBarData = (key) => {
    const lastTenEntries = redditData?.body?.slice(
      redditData.body.length >= 10 ? -10 : -1 * redditData.body.length
    );

    console.log("lastTenEntries", lastTenEntries);

    if (lastTenEntries?.length < 2) {
      const newChartData = lastTenEntries?.map(
        (entry) => Number(entry?.data[redditData.type][key]) || 0
      );

      console.log("key", key, "newChartData", newChartData);

      setChartData((prevChartData) => ({
        ...prevChartData,
        [key]: newChartData,
      }));

      setChartOkData(newChartData);
    } else {
      const differences = [];
      for (let i = 1; i < lastTenEntries?.length; i++) {
        const prevCount =
          lastTenEntries[i - 1]?.data[redditData.type][key] || 0;
        const currentCount = lastTenEntries[i]?.data[redditData.type][key] || 0;
        const difference = Number(currentCount) - Number(prevCount);
        differences.push(difference);
      }

      setChartData((prevChartData) => ({
        ...prevChartData,
        [key]: differences,
      }));

      setChartOkData(differences);
    }
  };

  useEffect(() => {
    if (redditData?.body?.length > 0) {
      for (const key of Object.keys(
        redditData.body[0]?.data[redditData.type] || {}
      )) {
        if (key !== "upvoteRatio" && key !== "hotTopics") {
          generateChartBarData(key);
        }
      }
    }
    console.log(chartData);
  }, [redditData?.body]);

  return (
    <>
      <StyledDashboard>
        {!redditData.body ? (
          <Typography ml={4} variant="h4">
            Use the different options to get insights of your choice!
          </Typography>
        ) : (
          <Box
            p={isNonMobile ? "3rem 2rem" : "1rem 0.5rem"}
            display={"flex"}
            flexDirection={"column"}
            gap={"15px"}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentReddit
                  type={redditData.type}
                  CHART_DATA={getChartData(redditData.type)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                {redditData.body.length > 0 ? (
                  <AppRedditDisplay
                    postData={redditData.body}
                    type={redditData.type}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {redditData.body ? (
                Object.keys(
                  redditData.body[redditData.body.length - 1]?.data[
                    redditData.type
                  ] || {}
                )
                  .filter((key) => key !== "upvoteRatio" && key !== "hotTopics")
                  .map((key, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <AppWidgetSummary
                        title={
                          redditData.type === "submission"
                            ? index === 0
                              ? "Comments"
                              : "Score"
                            : "Subscribers"
                        }
                        percent={
                          redditData.body.length >= 2
                            ? charter[key] -
                                redditData.body[redditData.body.length - 2]
                                  ?.data[redditData.type][key] || 0
                            : charter[key]
                        }
                        total={charter[key] || 0}
                        chartColor={"#00AB55"}
                        chartDataOk={
                          chartOkData[key] !== undefined
                            ? chartOkData[key]
                            : []
                        }
                      />
                    </Grid>
                  ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        )}
      </StyledDashboard>
    </>
  );
};

export default RedditType;
