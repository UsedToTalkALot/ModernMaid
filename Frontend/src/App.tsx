import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Applicents from "./pages/Applicents.tsx";
import ApliedPosts from "./pages/AppliedPosts.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import MaidLogin from "./pages/maidLogin.tsx";
import MyPosts from "./pages/MyPosts.tsx";
import Post from "./pages/Post.tsx";
import Profile from "./pages/Profile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/applicents", element: <Applicents /> },
    { path: "/appliedposts", element: <ApliedPosts /> },
    { path: "/modernmaid", element: <Dashboard /> },
    { path: "/maidlogin", element: <MaidLogin /> },
    { path: "/myposts", element: <MyPosts /> },
    { path: "/post", element: <Post /> },
    { path: "/profile", element: <Profile /> },
]);

const queryClient = new QueryClient();
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    );
}
export default App;