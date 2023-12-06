import { Box, Card, Stack, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fNumber, fCurrency, fPercent } from "../../utils/formatNumber";
import Iconify from "components/Iconify";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const IconWrapperStyle = styled("div")(({}) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: "#54D62C",
  backgroundColor: alpha("#54D62C", 0.16),
}));

const AppWidgetSummary = ({
  title,
  percent,
  total,
  chartColor,
  chartDataOk,
}) => {
  // const theme = useTheme();
  const { mode } = useSelector((state) => state.app);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(chartDataOk);
  }, [chartDataOk]);

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
      theme: mode === "dark" ? "dark" : "light",
    },
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        boxShadow: "0 12px 8px rgba(0, 0, 0, 0.1)",
        ":hover": {
          cursor: "pointer",
          boxShadow: "8px 14px 15px rgba(0, 0, 0, 0.2)",
          transition: "box-shadow 0.3s ease-in-out",
        },
        bgcolor: mode === "dark" ? "rgba(0,0,0,0.45)" : "#fff",
        border: mode === "dark" ? "1px solid #fff" : "1px solid #000",
      }}
    >
      <Box sx={{ flexGrow: 1, fontFamily: "Space Grotesk" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: "inherit" }}>
          {title}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 1, fontFamily: "inherit" }}
        >
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: "error.main",
                bgcolor: alpha("#FF4842", 0.16),
              }),
            }}
          >
            <Iconify
              width={16}
              height={16}
              icon={
                percent >= 0 ? "eva:trending-up-fill" : "eva:trending-down-fill"
              }
            />
          </IconWrapperStyle>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ fontFamily: "inherit" }}
          >
            {percent > 0 && "+"}
            {/* {fPercent(percent)} */}
            {percent} in the last 2 hours
          </Typography>
        </Stack>

        <Typography variant="h3" sx={{ fontFamily: "inherit" }}>
          {fNumber(total)}
        </Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={[{ data: data }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
};

export default AppWidgetSummary;
