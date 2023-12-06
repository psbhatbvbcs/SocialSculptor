import "./App.css";
import {
  createBrowserRouter,
  useRoutes,
  Route,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./scenes/Layout";
import Landing from "scenes/Landing";
import RegisterPage from "scenes/Register";
import ForgotPassword from "scenes/ForgotPassword";
import VerifyEmail from "scenes/VerifyEmail";
import ResetPassword from "scenes/ResetPassword";
import LoginPage from "scenes/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "scenes/Dashboard";
import RedditDashboard from "scenes/RedditDashboard";
import FacebookDashboard from "scenes/FacebookDashboard";
import FacebookPostAnalysis from "scenes/FacebookPostAnalysis";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { setIsAuthenticated, setUser } from "store/appSlice";
import { api } from "api/axiosMy";
import RedditType from "scenes/RedditType";
import YoutubeDashboard from "scenes/YoutubeDashboard";
import { element } from "prop-types";
import YoutubeById from "scenes/YoutubeById";

const normalRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-email/:userRole/:userId/:tokenId",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <div>Oops, route not found</div>,
  },
]);

const protectedRoutes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "/reddit-dashboard",
        element: <RedditDashboard />,
      },
      {
        path: "/reddit-type-dashboard/post/:redditId",
        element: <RedditType />,
      },
      {
        path: "/facebook-dashboard",
        element: <FacebookDashboard />,
      },
      {
        path: "/facebook-dashboard/post/:postId",
        element: <FacebookPostAnalysis />,
      },
      { path: "/youtube-dashboard", element: <YoutubeDashboard /> },
      { path: "/youtube-type-dashboard/post/:ID", element: <YoutubeById /> },
    ],
  },
  {
    path: "*",
    element: <div>Oops, go back</div>,
  },
]);

const App = () => {
  const { user } = useSelector((state) => state.app);
  const isUserLoggedIn = Boolean(Object.values(user).length);

  const dispatch = useDispatch();
  const server = useSelector((state) => state.app.server);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const mode = useSelector((state) => state.app.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    api
      .get(`/v01/users/getuser/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
        dispatch(setIsAuthenticated(true));
      })
      .catch((error) => {
        dispatch(setUser({}));
        dispatch(setIsAuthenticated(false));
      });
  }, [isAuthenticated, server, dispatch]);

  const routing = () => {
    if (isUserLoggedIn) {
      return protectedRoutes;
    } else {
      return normalRoutes;
    }
  };

  return <RouterProvider router={routing()} />;
};

export default App;
