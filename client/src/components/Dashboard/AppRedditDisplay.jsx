import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box, TextField } from "@mui/material";
// components
import { BaseOptionChart } from "../chart/index";

// ----------------------------------------------------------------------

export default function AppRedditDisplay({ postData, type }) {
  const [seriesData, setSeriesData] = useState(2023);
  const [totalReactions, setTotalReactions] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  console.log(postData);

  useEffect(() => {
    // Perform calculations based on postData and update state
    if (postData && postData[0].data) {
      const lastTenEntries = Object.keys(postData[0].data).length
        ? postData?.slice(-10)
        : [];

      let updatedTotalReactions = [];
      let updatedTotalComments = [];
      let updatedTotalScore = [];
      if (type === "submission") {
        lastTenEntries.forEach((index) => {
          let acc = 0;
          let acc1 = 0;
          Object.keys(index.data[type]).forEach((key) => {
            if (key === "numComments") {
              acc += index.data[type][key];
            } else if (key === "score") {
              acc1 += index.data[type][key];
            }
          });
          updatedTotalComments.push(acc);
          updatedTotalScore.push(acc1);
        });

        updatedTotalComments.reverse();
        updatedTotalScore.reverse();
        while (updatedTotalComments.length < 9) {
          updatedTotalComments.push(0);
        }
        while (updatedTotalScore.length < 9) {
          updatedTotalScore.push(0);
        }
        updatedTotalComments.reverse();
        updatedTotalScore.reverse();
        console.log(updatedTotalComments);
        console.log(updatedTotalScore);
        setTotalComments(updatedTotalComments);
        setTotalScore(updatedTotalScore);
      } else if (type === "subreddit") {
        lastTenEntries.forEach((index) => {
          let acc = 0;
          Object.keys(index.data[type]).forEach((key) => {
            if (key === "numSubscribers") {
              acc += index.data[type][key];
            }
          });
          updatedTotalReactions.push(acc);
        });

        updatedTotalReactions.reverse();
        while (updatedTotalReactions.length < 9) {
          updatedTotalReactions.push(0);
        }
        updatedTotalReactions.reverse();
        setTotalReactions(updatedTotalReactions);
        console.log(updatedTotalReactions);
      }
    }

    console.log(postData?.length - 1);
  }, [postData]);

  const lastTimestamp = new Date(postData[postData?.length - 1].timestamp);
  //console.log(lastTimestamp);
  const lastHourUTC = lastTimestamp.getUTCHours();
  const lastHourIST = (lastHourUTC + 5 + 30 / 60) % 24;
  const roundedHourIST = Math.ceil(lastHourIST); // Round off to the next whole hour
  console.log(roundedHourIST);

  const hourCategories = Array.from({ length: 9 }, (_, index) => {
    let hour = (roundedHourIST - index * 2 + 24) % 24;
    const amPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format

    return `${hour < 10 ? "0" : ""}${hour}:00 ${amPm}`;
  });

  hourCategories.reverse();
  console.log(hourCategories);

  const getCharted = () => {
    console.log(type);
    return type === "submission"
      ? [
          { name: "Comments", data: totalComments },
          { name: "Score", data: totalScore },
        ]
      : [{ name: "Subscribers", data: totalReactions }];
  };
  const CHART_DATA = [
    {
      year: 2023,
      data: getCharted(),
    },
  ];

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: hourCategories,
    },
  });

  return (
    <Card>
      <CardHeader
        title="Total Reactions"
        //subheader="(+43%) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              "& fieldset": { border: "0 !important" },
              "& select": {
                pl: 1,
                py: 0.5,
                pr: "24px !important",
                typography: "subtitle2",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 0.75,
                bgcolor: "background.neutral",
              },
              "& .MuiNativeSelect-icon": {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart
              type="line"
              series={item.data}
              options={chartOptions}
              height={340}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
