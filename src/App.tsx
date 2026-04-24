import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Level from "./components/Level";
import Game from "./components/Game";
import NextLevel from "./components/NextLevel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index />
            <Route element={<Level />} path="level/:level" />
            <Route element={<NextLevel />} path="/next/:level" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
