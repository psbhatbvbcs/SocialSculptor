import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box, TextField } from "@mui/material";
// components
import { BaseOptionChart } from "../chart/index";

// ----------------------------------------------------------------------
 
export default function AppAreaInstalled({ postData }) {
  const [seriesData, setSeriesData] = useState(2023);
  const [totalReactions, setTotalReactions] = useState([]);
  console.log(postData);

  useEffect(() => {
    // Perform calculations based on postData and update state
    if (postData) {
      const lastTenEntries = Object.keys(postData).length
        ? postData?.data.slice(-10)
        : [];

      let updatedTotalReactions = [];
      lastTenEntries.forEach((index) => {
        let acc = 0;
        Object.keys(index).forEach((key) => {
          if (key !== "_id") {
            acc += index[key].count;
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
    }
  }, [postData]);

  //console.log("hey", totalReactions);
  // Extract the timestamp from the last data entry
  const lastTimestamp = new Date(postData.updatedAt);
  //console.log(lastTimestamp);
  const lastHourUTC = lastTimestamp.getUTCHours();
  const lastHourIST = (lastHourUTC + 5 + 30 / 60) % 24;
  const roundedHourIST = Math.ceil(lastHourIST); // Round off to the next whole hour
  //console.log(roundedHourIST);

  const hourCategories = Array.from({ length: 9 }, (_, index) => {
    let hour = (roundedHourIST - index * 2 + 24) % 24;
    const amPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format

    return `${hour < 10 ? "0" : ""}${hour}:00 ${amPm}`;
  });

  hourCategories.reverse();
  //console.log(hourCategories);

  const CHART_DATA = [
    {
      year: 2023,
      data: [{ name: "Reactions", data: totalReactions }],
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
