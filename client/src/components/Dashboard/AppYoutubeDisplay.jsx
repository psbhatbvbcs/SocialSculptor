import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box, TextField } from "@mui/material";
// components
import { BaseOptionChart } from "../chart/index";

// ----------------------------------------------------------------------

export default function AppYoutubeDisplay({ postData, type }) {
  const [seriesData, setSeriesData] = useState(2023);
  const [totalSubscribers, setTotalSubscribers] = useState([]);
  const [totalViews, setTotalViews] = useState([]);
  const [totalVideos, setTotalVideos] = useState([]);
  const [totalLikes, setTotalLikes] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  //console.log(postData);

  useEffect(() => {
    // Perform calculations based on postData and update state
    if (postData && postData[0].data) {
      const lastTenEntries = Object.keys(postData[0].data).length
        ? postData?.slice(-10)
        : [];

      console.log(lastTenEntries);

      let updatedTotalSubscribers = [];
      let updatedTotalViews = [];
      let updatedTotalVideos = [];
      let updatedTotalComments = [];
      let updatedTotalLikes = [];

      if (type === "channel") {
        lastTenEntries.forEach((index) => {
          let acc = 0;
          let acc1 = 0;
          let acc2 = 0;
          Object.keys(index.data[type]).forEach((key) => {
            if (key === "subscribers") {
              acc += index.data[type][key];
            } else if (key === "views") {
              acc1 += index.data[type][key];
            } else if (key === "videos") {
              acc2 += index.data[type][key];
            }
          });

          updatedTotalSubscribers.push(acc);
          updatedTotalViews.push(acc1);
          updatedTotalVideos.push(acc2);
        });

        updatedTotalSubscribers.reverse();
        updatedTotalViews.reverse();
        updatedTotalVideos.reverse();

        while (updatedTotalSubscribers.length < 9) {
          updatedTotalSubscribers.push(0);
        }
        while (updatedTotalViews.length < 9) {
          updatedTotalViews.push(0);
        }
        while (updatedTotalVideos.length < 9) {
          updatedTotalVideos.push(0);
        }
        updatedTotalSubscribers.reverse();
        updatedTotalViews.reverse();
        updatedTotalVideos.reverse();

        setTotalSubscribers(updatedTotalSubscribers);
        setTotalViews(updatedTotalViews);
        setTotalVideos(updatedTotalVideos);
      } else if (type === "video") {
        console.log("bideeeeeeeeeeeeeeeeeeeee");
        lastTenEntries.forEach((index) => {
          let acc = 0;
          let acc1 = 0;
          let acc2 = 0;
          Object.keys(index.data[type]).forEach((key) => {
            if (key === "views") {
              acc += index.data[type][key];
            } else if (key === "comments") {
              acc1 += index.data[type][key];
            } else if (key === "likes") {
              acc2 += index.data[type][key];
            }
          });
          updatedTotalViews.push(acc);
          updatedTotalComments.push(acc1);
          updatedTotalLikes.push(acc2);
        });

        updatedTotalViews.reverse();
        updatedTotalComments.reverse();
        updatedTotalLikes.reverse();
        while (updatedTotalViews.length < 9) {
          updatedTotalViews.push(0);
        }
        while (updatedTotalComments.length < 9) {
          updatedTotalComments.push(0);
        }
        while (updatedTotalLikes.length < 9) {
          updatedTotalLikes.push(0);
        }
        updatedTotalViews.reverse();
        updatedTotalComments.reverse();
        updatedTotalLikes.reverse();

        setTotalViews(updatedTotalViews);
        setTotalComments(updatedTotalComments);
        setTotalLikes(updatedTotalLikes);
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
    return type === "channel"
      ? [
          { name: "Subscribers", data: totalSubscribers },
          { name: "Views", data: totalViews },
          { name: "Videos", data: totalVideos },
        ]
      : [
          { name: "Likes", data: totalLikes },
          { name: "Views", data: totalViews },
          { name: "Comments", data: totalComments },
        ];
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
