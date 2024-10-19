import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardWrapper from "./modules/Dashboard/DashboardWrapper";
import AppLayout from "./components/layout/AppLayout";
import ViewNotes from "./modules/ViewNotes/ViewNotes";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";

const PageRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardWrapper />,
        },
        {
          path: "view-class",
          element: <ViewNotes />,
        },
      ],
    },

    // {
    //   path: "/solve-assignment",
    //   element: <SolveAssignmentPage />,
    // },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
