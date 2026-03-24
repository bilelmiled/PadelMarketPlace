import Home from "./pages/Home";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Publish from "./pages/Publish";
import AdminRoute from "./components/AdminRoute";
import ProductByCategory from "./pages/ProductByCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/productByCat/:cat",
        element:<ProductByCategory/>
      },
      {
        path: "/publish",
        element: (
          <AdminRoute>
            <Publish />
          </AdminRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
