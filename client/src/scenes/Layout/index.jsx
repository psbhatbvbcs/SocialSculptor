import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { themeSettings } from "../../theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { api } from "../../api/axiosMy";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "store/appSlice";

const Layout = () => {
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isNonMobile ? true : false
  );

  const dispatch = useDispatch();
  const server = useSelector((state) => state.app.server);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const mode = useSelector((state) => state.app.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // useEffect(() => {
  //   api
  //     .get(`/v01/users/getuser/me`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       dispatch(setUser(res.data.user));
  //       dispatch(setIsAuthenticated(true));
  //     })
  //     .catch((error) => {
  //       dispatch(setUser({}));
  //       dispatch(setIsAuthenticated(false));
  //     });
  // }, [isAuthenticated, server, dispatch]);

  // if (!isAuthenticated) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        display={isNonMobile ? "flex" : "block"}
        width={"100%"}
        height={"100%"}
      >
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Box flexGrow={1}>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
