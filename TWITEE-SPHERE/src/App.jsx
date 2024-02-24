import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

function App() {
  const Main = lazy(() => import("./Layout/Main.jsx"));
  const Home = lazy(() => import("./pages/Home.jsx"));
  const RegisterPage = lazy(() => import("./pages/registerPage/RegisterPage"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense>
          <Main />
        </Suspense>
      ),
      // errorElement: (
      //   <Suspense>
      //     <Error />
      //   </Suspense>
      // ),
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/RegisterPage",
          element: (
            <Suspense>
              <RegisterPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
