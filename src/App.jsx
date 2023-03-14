import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Watch from "./components/Watch";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </>
  );
}

export default App;
