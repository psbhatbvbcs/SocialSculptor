import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import redditIcon from "components/Landing/assets/reddit.png";
import facebookIcon from "components/Landing/assets/facebook.png";
import youtubeIcon from "components/Landing/assets/youtube.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import { Instagram, LinkedIn } from "@mui/icons-material";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "primary",
  fontWeight: "bold",
  fontFamily: "space grotesk",
  textAlign: "center",
  padding: "3rem 0rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.06)", // Transparent background
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Background shadow
  transition: "background-color 0.3s ease", // Smooth transition for hover effect
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.12)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
}));

const GuidesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0",
    flexDirection: "column",
  },
}));

const GuideBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.10)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
  padding: "15px",
  borderRadius: "15px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const onlineUsers = useSelector((state) => state.app.onlineUsers);
  const mode = useSelector((state) => state.app.mode);
  const server = useSelector((state) => state.app.server);

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SocialSculptor | Dashboard";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "yshift"}>
      <StyledDashboard>
        <Box
          display={"flex"}
          flexDirection={isNonMobile ? "row" : "column"}
          justifyContent={"space-evenly"}
        >
          <Box width={"100%"}>
            <Container>
              <Title>Welcome to SocialSculptor!</Title>
              <Divider orientation={"horizontal"} flexItem />
              <Box
                display={"flex"}
                gap={"5px"}
                width={"100%"}
                borderRadius={"20px"}
                flexDirection={isNonMobile ? "row" : "column"}
                justifyContent={"space-evenly"}
              >
                <StyledBox justifyContent={"center"} height={"fit-content"}>
                  <GuidesBox>
                    <GuideBox onClick={() => navigate("/reddit-dashboard")}>
                      <img src={redditIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Reddit
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          Track Subreddits and Posts
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>

                    <GuideBox onClick={() => navigate("/facebook-dashboard")}>
                      <img src={facebookIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Facebook
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          Track Posts
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>
                    <GuideBox onClick={() => navigate("/youtube-dashboard")}>
                      <img src={youtubeIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Youtube
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          Track Channels and Videos
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>
                  </GuidesBox>
                </StyledBox>
              </Box>
              <Box
                display={"flex"}
                gap={"10px"}
                width={"100%"}
                borderRadius={"20px"}
                my={"10px"}
                flexDirection={isNonMobile ? "row" : "column"}
                justifyContent={"space-evenly"}
              >
                <StyledBox height={"300px"}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    fontWeight="bold"
                  >
                    SocialSculptor was brought to you by
                  </Typography>
                  <Box width={"100%"} display={"flex"}>
                    <Box
                      mt={"15px"}
                      display={"flex"}
                      gap={"5px"}
                      width={"100%"}
                      py={"10px"}
                      borderRadius={"20px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.10)", // Darker background on hover
                          cursor: "pointer", // Change the mouse icon
                        },
                      }}
                    >
                      <Avatar
                        src={`${server}/public/files/KLE Technological University/CSE/profilePics/pranavbhat.png`}
                        sx={{ width: "100px", height: "100px" }}
                      />
                      <Typography
                        variant="h4"
                        fontFamily={"Space Grotesk"}
                        fontWeight={600}
                      >
                        Pranav Bhat
                      </Typography>
                      <Stack direction={"row"} spacing={1}>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.linkedin.com/in/mr-pranav-bhat/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <LinkedIn />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.instagram.com/mr._.bhat/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <Instagram />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="body2"
                        textAlign={"center"}
                        fontFamily={"Space Grotesk"}
                      >
                        5th Sem, CSE
                        <br />
                        KLE Technological University
                      </Typography>
                    </Box>
                  </Box>
                </StyledBox>
              </Box>
            </Container>
          </Box>
        </Box>
      </StyledDashboard>
    </StyleSheetManager>
  );
};

export default Dashboard;
