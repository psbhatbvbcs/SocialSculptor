import { Box, Grid, Typography, styled, useMediaQuery } from "@mui/material";
import { api } from "api/axiosMy";
import { StyledDashboard } from "components/BackgroundBox";
import AppAreaInstalled from "components/Dashboard/AppAreaInstalled";
import AppCurrentDownload from "components/Dashboard/AppCurrentDownload";
import AppWidgetSummary from "components/Dashboard/AppWidgetSummary";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  color: "primary",
  fontWeight: "bold",
  margin: theme.spacing(0, 0, 1, 4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
}));

const FacebookPostAnalysis = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [chartData, setChartData] = useState({});
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

  const generateChartData = (key) => {
    const lastTenEntries = postData?.data.slice(
      postData?.data.length >= 10 ? -10 : -1 * postData?.data.length
    );

    //console.log("lastTenEntries", lastTenEntries);

    if (lastTenEntries?.length < 2) {
      // If there are less than 2 elements in the array, use the original count values
      const newChartData = lastTenEntries.map((entry) =>
        Number(entry[key].count)
      );

      setChartData((prevChartData) => ({
        ...prevChartData,
        [key]: newChartData,
      }));
    } else {
      // Calculate the difference between consecutive elements

      const differences = [];
      for (let i = 1; i < lastTenEntries.length; i++) {
        const prevCount = lastTenEntries[i - 1][key]?.count;
        const currentCount = lastTenEntries[i][key]?.count;
        const difference = currentCount - prevCount;
        differences.push(difference);
      }

      setChartData((prevChartData) => ({
        ...prevChartData,
        [key]: differences,
      }));
    }
    //console.log("Chart", chartData);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const facebookAuth = localStorage.getItem("facebookAuth");
      if (facebookAuth) {
        try {
          const facebookAuthObj = JSON.parse(facebookAuth);
          const accessToken = facebookAuthObj.accessToken;

          const { data } = await api.get(
            `/v01/facebook/getPost/${postId}/${accessToken}`
          );

          setPostData(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPost();
  }, [postId]); // Added dependencies to the useEffect

  useEffect(() => {
    // Check if postData and postData.totalData are defined
    if (postData && postData.totalData) {
      // Use Object.keys only if postData.totalData is defined
      for (const key of Object.keys(postData.totalData)) {
        generateChartData(key);
      }
    }
  }, [postData]);
  const testArr = [0, 3];

  return (
    <>
      <StyledDashboard>
        {!postData ? (
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
                <AppCurrentDownload
                  CHART_DATA={
                    postData?.totalData &&
                    Object.keys(postData.totalData)
                      .filter((key) => key !== "_id")
                      .map((key) => postData.totalData[key].count)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppAreaInstalled postData={postData} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {postData?.totalData &&
                Object.keys(postData.totalData)
                  .filter((key) => key !== "_id")
                  .map((key, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <AppWidgetSummary
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        percent={
                          postData.totalData
                            ? postData?.totalData[key].count -
                              postData?.data[
                                postData?.data.length >= 2
                                  ? postData?.data.length - 2
                                  : 0
                              ][key].count
                            : 0
                        }
                        total={
                          postData && postData.totalData
                            ? postData?.totalData[key].count
                            : 0
                        }
                        chartColor={"#00AB55"}
                        chartDataOk={chartData[key]}
                      />
                    </Grid>
                  ))}
            </Grid>
          </Box>
        )}
      </StyledDashboard>
    </>
  );
};

export default FacebookPostAnalysis;
