import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MainPage from "./pages/MainPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import { ConfigProvider, theme } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
