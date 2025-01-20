import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Main from "./pages/Main/Main.tsx";
import {UiResource} from "./UiResource.ts";
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
    {
        path: UiResource.Main,
        element: <Main/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
        <RouterProvider router={router}/>
)
