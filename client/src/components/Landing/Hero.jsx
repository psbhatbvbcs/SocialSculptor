import React from "react";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import NavbarL from "components/Landing/NavbarL";
import CustomButton from "../CustomButton";
import heroImg from "components/Landing/assets/juicy-hands-with-gadgets.gif";
import { ArrowDownwardSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(0),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "58px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container sx={{ paddingBottom: "20px" }}>
        <NavbarL />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to SocialSculptor
            </Typography>
            <Title variant="h1">
              Analyse your social handles better with SocialSculptor!
            </Title>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#5A6473",
                my: 4,
              }}
            >
              Your one stop destination to gather insights about different
              social handles at one place!
            </Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="Sign Up"
              heroBtn={true}
              onClickFun={() => navigate("/signup")}
            />
          </Box>

          <Box
            sx={{
              flex: "1",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
        
       
      </Container>
    </Box>
  );
};

export default Landing;
