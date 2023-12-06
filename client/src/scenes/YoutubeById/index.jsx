import { Box, Grid, Typography, styled, useMediaQuery } from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import AppCurrentReddit from "components/Dashboard/AppCurrentReddit";
import AppRedditDisplay from "components/Dashboard/AppRedditDisplay";
import AppWidgetSummary from "components/Dashboard/AppWidgetSummary";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AppCurrentYoutube from "components/Dashboard/AppCurrentYoutube";
import AppYoutubeDisplay from "components/Dashboard/AppYoutubeDisplay";

export const YoutubeById = () => {
  const { ID } = useParams();
  const { youtube } = useSelector((state) => state.app);

  const [youtubeData, setYoutubeData] = useState({});
  const [chartData, setChartData] = useState({});
  const [charter, setCharter] = useState({});
  const [chartOkData, setChartOkData] = useState({});
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

  useEffect(() => {
    const selectedReddit = youtube.find((item) => item._id === ID);
    setYoutubeData(selectedReddit || {});
  }, [ID, youtube]);

  useEffect(() => {
    try {
      console.log(youtubeData);
      if (youtubeData?.body?.length > 0) {
        const latestData =
          youtubeData.body[youtubeData.body.length - 1]?.data[
            youtubeData.type
          ] || {};
        setCharter(latestData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [youtubeData]);

  const getChartData = (type) => {
    try {
      if (
        type === "channel" &&
        charter.subscribers &&
        charter.videos &&
        charter.views
      ) {
        return [charter.subscribers, charter.views, charter.videos];
      } else if (
        type === "video" &&
        charter.views &&
        charter.comments &&
        charter.likes
      ) {
        console.log("hooooyea", charter.views);
        return [charter.likes, charter.views, charter.comments];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error getting chart data:", error);
      return [];
    }
  };

  const generateChartBarData = (key) => {
    const lastTenEntries = youtubeData?.body?.slice(
      youtubeData.body.length >= 10 ? -10 : -1 * youtubeData.body.length
    );

    console.log("lastTenEntries", lastTenEntries);

    if (lastTenEntries?.length < 2) {
      const newChartData = lastTenEntries?.map(
        (entry) => Number(entry?.data[youtubeData.type][key]) || 0
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
          lastTenEntries[i - 1]?.data[youtubeData.type][key] || 0;
        const currentCount =
          lastTenEntries[i]?.data[youtubeData.type][key] || 0;
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

  const getTitle = (index) => {
    if (youtubeData.type === "channel") {
      if (index === 0) {
        return "Subscribers";
      } else if (index === 1) {
        return "Views";
      } else {
        return "Videos";
      }
    } else if (youtubeData.type === "video") {
      if (index === 0) {
        return "Likes";
      } else if (index === 1) {
        return "Views";
      } else {
        return "Comments";
      }
    }
  };

  useEffect(() => {
    if (youtubeData?.body?.length > 0) {
      for (const key of Object.keys(
        youtubeData.body[0]?.data[youtubeData.type] || {}
      )) {
        if (key !== "upvoteRatio" && key !== "hotTopics") {
          generateChartBarData(key);
        }
      }
    }
    console.log(chartData);
  }, [youtubeData?.body]);

  return (
    <>
      <StyledDashboard>
        {!youtubeData.body ? (
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
                <AppCurrentYoutube
                  type={youtubeData.type}
                  CHART_DATA={getChartData(youtubeData.type)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                {youtubeData.body.length > 0 ? (
                  <AppYoutubeDisplay
                    postData={youtubeData.body}
                    type={youtubeData.type}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {youtubeData.body ? (
                Object.keys(
                  youtubeData.body[youtubeData.body.length - 1]?.data[
                    youtubeData.type
                  ] || {}
                )
                  .filter((key) => key !== "upvoteRatio" && key !== "hotTopics")
                  .map((key, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <AppWidgetSummary
                        title={getTitle(index) || ""}
                        percent={
                          youtubeData.body.length >= 2
                            ? charter[key] -
                                youtubeData.body[youtubeData.body.length - 2]
                                  ?.data[youtubeData.type][key] || 0
                            : charter[key]
                        }
                        total={charter[key] || 0}
                        chartColor={"#00AB55"}
                        chartDataOk={
                          chartOkData[key] !== undefined ? chartOkData[key] : []
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

export default YoutubeById;
