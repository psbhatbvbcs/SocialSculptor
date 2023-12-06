import { Card, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useTheme, styled, alpha } from "@mui/material/styles";

import { fNumber } from "../../utils/formatNumber";
//
import { BaseOptionChart } from "../chart/index";
import { merge } from "lodash";
import { useSelector } from "react-redux";

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({}) => ({
  height: CHART_HEIGHT,
  marginTop: "1rem",
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${alpha("#919EAB", 0.24)}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default function AppCurrentYoutube({ CHART_DATA, type }) {
  const { mode } = useSelector((state) => state.app);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      "#C8FACD",
      "#5BE584",
      "#00AB55",
      "#007B55",
      "#005249",
      "#D6E4FF",
      "#84A9FF",
      "#3366FF",
    ],
    labels:
      type === "channel"
        ? ["Subscribers", "Views", "Videos"]
        : ["Likes","Views", "Comments"],
    stroke: { colors: [mode === "light" ? "#fff" : "#212B36"] },
    legend: { floating: true, horizontalAlign: "center" },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            value: {
              formatter: (val) => fNumber(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Current Reactions" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="donut"
          series={CHART_DATA || [1, 2]}
          options={chartOptions}
          height={280}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
