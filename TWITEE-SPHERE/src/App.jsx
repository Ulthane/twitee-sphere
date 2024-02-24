import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthGuard from "./utils/AuthGuard.jsx";
import LoginPage from "./pages/registerPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

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
              <AuthGuard>
                <Home />
              </AuthGuard>
            </Suspense>
          ), // <Suspense>{user ? <RegisterPage /> : <Home />}</Suspense>,
        },
        // {
        //   path: "/RegisterPage",
        //   element: (
        //     <Suspense>
        //       <RegisterPage />
        //     </Suspense>
        //   ),
        // },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
