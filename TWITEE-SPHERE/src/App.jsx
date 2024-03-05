import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthGuard from "./utils/AuthGuard.jsx";

function App() {
  const Main = lazy(() => import("./Layout/Main.jsx"));
  const Home = lazy(() => import("./pages/Home.jsx"));
  const RegisterPage = lazy(() => import("./pages/registerPage/RegisterPage"));
  const LoginPage = lazy(() => import("./pages/registerPage/LoginPage"));
  const FollowFeed = lazy(() => import("./pages/FollowFeed.jsx"));
  const FavoriteFeed = lazy(() => import("./pages/FavoriteFeed.jsx"));
  const CommunityPage = lazy(() => import("./pages/CommunityPage.jsx"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense>
          <LoginPage />
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
    {
      path: "/main",
      element: (
        <Suspense>
          <AuthGuard>
            <Main />
          </AuthGuard>
        </Suspense>
      ),
      // errorElement: (
      //   <Suspense>
      //     <Error />
      //   </Suspense>
      // ),
      children: [
        {
          path: "/main/home",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/main/followfeed",
          element: (
            <Suspense>
              <FollowFeed />
            </Suspense>
          ),
        },
        {
          path: "/main/favoritefeed",
          element: (
            <Suspense>
              <FavoriteFeed />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/community",
      element: (
        <Suspense>
          <AuthGuard>
            <CommunityPage />
          </AuthGuard>
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
