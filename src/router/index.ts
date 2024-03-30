import Form from "@/view/form";
import Home from "@/view/home";
import MainView from "@/view/MainView";
import Users from "@/view/users";
import UserList from "@/view/users/UserList";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        Component: MainView,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "/users",
                Component: Users,
                children: [
                    {
                        path: "/users",
                        Component: UserList
                    },
                    {
                        path: "/users/register",
                        Component: Form
                    }

                ]
            }
        ]
    },


]);

export default router;