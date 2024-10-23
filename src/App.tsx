import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from ".";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
