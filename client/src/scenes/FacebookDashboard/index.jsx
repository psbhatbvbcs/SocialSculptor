import {
  Facebook,
  OpenInBrowser,
  OpenInFull,
  OpenInNew,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { api } from "api/axiosMy";
import axios from "axios";
import { StyledDashboard } from "components/BackgroundBox";
import CustomButton from "components/CustomButton";
import AppWidgetSummary from "components/Dashboard/AppWidgetSummary";
import React, { useEffect, useState } from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "store/appSlice";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  color: "primary",
  fontWeight: "bold",
  margin: theme.spacing(0, 0, 1, 4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
}));

const FacebookDashboard = () => {
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { posts } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

  async function handleSuccess(response) {
    try {
      const result = await api.post("/v01/facebook/facebookLogin", {
        userId: response.authResponse.userID,
        accessToken: response.authResponse.accessToken,
      });
      let accessTkn = response.authResponse.accessToken;
      let userID = response.authResponse.userID;

      localStorage.setItem(
        "facebookAuth",
        `{"userId": "${userID}", "accessToken":"${accessTkn}", "createdAt": "${Date.now()}"}`
      );

      setUserId(userID);
      setAccessToken(accessTkn);

      console.log(userId, accessToken);
    } catch (error) {
      console.log("HI", error);
    }
  }

  function handleError(error) {
    console.log(error);
  }

  const getPosts = async () => {
    let fuserId = localStorage.getItem("userId") || userId;
    let fAccessToken = localStorage.getItem("accessToken") || accessToken;

    try {
      const response = await api.get(
        `/v01/facebook/getFacebookPosts/${userId}/${accessToken}`
      );

      console.log(response.data);

      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const clipString = (inputString, maxLength) => {
    if (inputString.length > maxLength) {
      return inputString.slice(0, maxLength) + "...";
    }
    return inputString;
  };

  useEffect(() => {
    if (localStorage.getItem("facebookAuth")) {
      let facebookAuth = JSON.parse(localStorage.getItem("facebookAuth"));
      if (parseInt(facebookAuth.createdAt, 10) + 1000 * 60 * 60 < Date.now()) {
        localStorage.removeItem("facebookAuth");
        setUserId("");
        setAccessToken("");
      } else {
        setUserId(facebookAuth.userId);
        setAccessToken(facebookAuth.accessToken);
        console.log(posts);
      }
      console.log(parseInt(facebookAuth.createdAt, 10));
    }

    console.log(userId, accessToken);
  }, []);

  return (
    <>
      <StyledDashboard>
        <Title>Facebook Insights</Title>
        <Typography ml={4} variant="h4">
          Use the different options to get insights of your choice!
        </Typography>
        {!userId && !accessToken ? (
          <Box m={isNonMobile ? "3rem 2rem" : "1rem 0rem"} display={"flex"}>
            {" "}
            <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}>
              <LoginButton
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
                style={{
                  width: "250px",
                  fontSize: "18px",
                  fontFamily: "Space Grotesk",
                  borderRadius: "20px",
                  border: "solid 1px rgba(0,0,0,0.4)",
                  padding: "15px",
                  cursor: "pointer", // Set cursor to pointer by default
                  backgroundColor: "lightblue",
                  transition: "background-color 0.3s", // Add smooth transition for visual effect
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)")
                } // Change background color on hover
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "lightblue")
                } // Revert to the initial background color when not hovering
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Facebook /> Login via Facebook
                </Box>
              </LoginButton>
            </FacebookProvider>
          </Box>
        ) : (
          <>
            {!posts.length ? (
              <Box m={isNonMobile ? "3rem 2rem" : "1rem 0rem"} display={"flex"}>
                {" "}
                <CustomButton
                  backgroundColor="#0F1B4C"
                  color="#fff"
                  buttonText="Get my posts"
                  heroBtn={true}
                  onClickFun={getPosts}
                />
              </Box>
            ) : (
              <Box m={isNonMobile ? "3rem 0rem" : "1rem 0rem"}>
                <Title>Your latest posts:</Title>
                <Typography ml={4} mb={4} variant="h4">
                  (Displaying maximum of 5 posts due to API constraints)
                </Typography>
                <Box p={isNonMobile ? "3rem 2rem" : "1rem 0rem"}>
                  <Grid container spacing={3}>
                    <Box
                      width={"100%"}
                      pl={"2rem"}
                      display={"flex"}
                      flexDirection={isNonMobile ? "row" : "column"}
                      gap={"1rem"}
                    >
                      {posts?.map((post) => (
                        <Grid
                          key={post.id}
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
                              height: "100%",
                              bgcolor: "wheat",
                            }}
                            onClick={() =>
                              navigate(`/facebook-dashboard/post/${post?.id}`)
                            }
                          >
                            <Box
                              sx={{ flexGrow: 1, fontFamily: "Space Grotesk" }}
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ fontFamily: "inherit" }}
                              >
                                {clipString(post?.message, 50)}
                              </Typography>
                            </Box>
                            <OpenInNew />
                          </Card>
                        </Grid>
                      ))}
                    </Box>
                  </Grid>
                </Box>
              </Box>
            )}
          </>
        )}
      </StyledDashboard>
    </>
  );
};

export default FacebookDashboard;
