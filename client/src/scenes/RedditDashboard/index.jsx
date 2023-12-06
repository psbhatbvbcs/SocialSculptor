import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { StyledDashboard } from "components/BackgroundBox";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "components/CustomButton";
import { api } from "api/axiosMy";
import { toastEnd, toastStart } from "components/toastLoading";
import toast from "react-hot-toast";
import { setReddit } from "store/appSlice";
import { OpenInNew } from "@mui/icons-material";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  color: "primary",
  fontWeight: "bold",
  margin: theme.spacing(0, 0, 1, 4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
}));

const RedditDashboard = () => {
  const { mode, reddit } = useSelector((state) => state.app);

  const [redditUrl, setRedditUrl] = useState("");
  const [subreddit, setSubreddit] = useState("");

  const [expanded, setExpanded] = React.useState(false);

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const server = useSelector((state) => state.app.server);

  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const postRedditUrl = async () => {
    toastStart("Tracking the URL...");
    try {
      const response = await api.post(
        "/v01/reddit/url",
        { redditUrl },
        { withCredentials: true }
      );
      toastEnd();
      toast.success(response.data.message);
      console.log(response.data);
      setRedditUrl("");
      fetchReddit();
    } catch (error) {
      toastEnd();
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(
          "Network Error. The backend server is offline. Contact the admins or try again later."
        );
      } else {
        toast.error("Unknown Error. Contact the admins or try again later.");
      }
    }
  };

  const postSubreddit = async () => {
    toastStart("Tracking the Subreddit...");
    try {
      const response = await api.post(
        "/v01/reddit/subreddit",
        { subreddit },
        { withCredentials: true }
      );
      toastEnd();
      toast.success(response.data.message);
      setSubreddit("");
      console.log(response.data);
      fetchReddit();
    } catch (error) {
      toastEnd();
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(
          "Network Error. The backend server is offline. Contact the admins or try again later."
        );
      } else {
        toast.error("Unknown Error. Contact the admins or try again later.");
      }
    }
  };

  const clipString = (inputString, maxLength) => {
    if (inputString.length > maxLength) {
      return inputString.slice(0, maxLength) + "...";
    }
    return inputString;
  };

  useEffect(() => {
    document.title = "Social Sculptor | Reddit";
    fetchReddit();
  }, []);

  const fetchReddit = async () => {
    try {
      const { data } = await api.get("/v01/reddit/tracking", {
        withCredentials: true,
      });

      dispatch(setReddit(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reddit);
  //
  return (
    <StyledDashboard color={mode === "light" ? "black" : "white"}>
      <Title>Reddit Insights</Title>
      <Typography ml={4} variant="h4">
        Use the different options to get insights of your choice!
      </Typography>

      <Box
        m={isNonMobile ? "3rem 2rem" : "1rem 0rem"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Accordion
            sx={{ width: "80vw", bgcolor: "rgba(0,0,0,0.15)" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box width={"100%"} display={"flex"} alignItems={"center"}>
                <Typography
                  sx={{
                    fontSize: "25px",
                    width: "33%",
                    flexShrink: 0,
                    fontFamily: "Space Grotesk",
                  }}
                >
                  Reddit Post Tracker
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Click to paste the url of the reddit post you want to track
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20px"}
              >
                <Typography>Paste the URL here:</Typography>
                <TextField
                  sx={{ width: "400px" }}
                  id="redditurl"
                  label="URL"
                  variant="outlined"
                  value={redditUrl}
                  onChange={(e) => setRedditUrl(e.target.value)}
                />

                <CustomButton
                  backgroundColor="#0F1B4C"
                  color="#fff"
                  buttonText="Track"
                  heroBtn={true}
                  onClickFun={postRedditUrl}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: "80vw", bgcolor: "rgba(0,0,0,0.15)" }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Box width={"100%"} display={"flex"} alignItems={"center"}>
                <Typography
                  sx={{ fontSize: "25px", width: "33%", flexShrink: 0 }}
                >
                  Subreddit Tracker
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Click to enter the subreddit name you want to track
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20px"}
              >
                <Typography>Paste the URL here:</Typography>
                <TextField
                  sx={{ width: "400px" }}
                  id="subreddit"
                  label="Name of Subreddit"
                  variant="outlined"
                  value={subreddit}
                  onChange={(e) => setSubreddit(e.target.value)}
                />
                <CustomButton
                  backgroundColor="#0F1B4C"
                  color="#fff"
                  buttonText="Track"
                  heroBtn={true}
                  onClickFun={postSubreddit}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        {reddit && reddit?.length > 0 ? (
          <>
            <Title sx={{ mt: "2rem", ml: "0" }}>Currently Tracking</Title>
            <Box mt={"3rem"}>
              <Grid container spacing={3}>
                <Box
                  width={"100%"}
                  pl={"2rem"}
                  display={"flex"}
                  flexDirection={isNonMobile ? "row" : "column"}
                  gap={"1rem"}
                >
                  {reddit?.map((type) => (
                    <Grid
                      key={type._id}
                      item
                      xs={12}
                      md={4}
                      sx={{
                        boxShadow: "0 12px 8px rgba(0, 0, 0, 0.1)",
                        ":hover": {
                          cursor: "pointer",
                          boxShadow: "8px 14px 15px rgba(0, 0, 0, 0.2)",
                          transition: "box-shadow 0.3s ease-in-out",
                        },
                      }}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 3,
                          bgcolor: "wheat",
                          height: "100%",
                        }}
                        onClick={() =>
                          navigate(`/reddit-type-dashboard/post/${type?._id}`)
                        }
                      >
                        <Box
                          sx={{ flexGrow: 1, fontFamily: "Space Grotesk" }}
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"10px"}
                          height={"100%"}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontFamily: "inherit" }}
                          >
                            Type: {type?.type}
                          </Typography>
                          <Typography
                            variant="h3"
                            sx={{ fontFamily: "inherit" }}
                          >
                            {clipString(type?.name || type?.name, 50)}
                          </Typography>
                        </Box>
                        <OpenInNew />
                      </Card>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </StyledDashboard>
  );
};

export default RedditDashboard;
