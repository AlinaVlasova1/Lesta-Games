import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Main from "./pages/Main/Main.tsx";
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
    {
        path: "/main",
        element: <Main/>
    },
    {
        path: '*',
        element: <Main/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
        <RouterProvider router={router}/>
)
