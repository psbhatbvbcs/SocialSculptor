// @mui
import { alpha, useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function BaseOptionChart() {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: "#637381",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: 22 / 14,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: "#212B36",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: 1.5,
  };

  return {
    // Colors
    colors: ["#00AB55", "#FFE700", "#2D99FF", "#826AF9", "#2CD9C5", "#FF6C40"],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: "#919EAB",
      fontFamily: "Space Grotesk",
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: alpha("#919EAB", 0.24),
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: "#fff",
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: String(13),
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: "#212B36",
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "28%",
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: alpha("#919EAB", 0.16),
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: alpha("#919EAB", 0.24),
        },
        spokes: {
          connectorColors: alpha("#919EAB", 0.24),
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 600,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: 900,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };
}
