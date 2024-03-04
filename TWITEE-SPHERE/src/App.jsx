import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthGuard from "./utils/AuthGuard.jsx";

function App() {
  const Main = lazy(() => import("./Layout/Main.jsx"));
  const CommunityMain = lazy(() => import("./Layout/CommunityMain.jsx"));
  const Home = lazy(() => import("./pages/Home.jsx"));
  const RegisterPage = lazy(() => import("./pages/registerPage/RegisterPage"));
  const LoginPage = lazy(() => import("./pages/registerPage/LoginPage"));
  const FollowFeed = lazy(() => import("./pages/FollowFeed.jsx"));
  const FavoriteFeed = lazy(() => import("./pages/FavoriteFeed.jsx"));
  const Community = lazy(() => import("./pages/Community.jsx"));

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
      path: "/communityMain",
      element: (
        <Suspense>
          <AuthGuard>
            <CommunityMain />
          </AuthGuard>
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
