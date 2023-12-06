import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import appReducer from "./store/appSlice";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const AppWrapper = () => {
  const [queryClient] = useState(new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWrapper />);
