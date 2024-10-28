import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Detailpage from "./pages/Detailpage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="detail/:id" element={<Detailpage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
