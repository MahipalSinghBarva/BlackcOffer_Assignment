import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarSidebar from "./component/navbar/NavbarSidebar";
import Chart from "./component/chart/Chart";
import Intensity from "./component/chart/Intensity";
import EndYear from "./component/chart/EndYear";
import Likelihood from "./component/chart/Likelihood";
import Sector from "./component/chart/Sector";
import Country from "./component/chart/Country";
import Relevance from "./component/chart/Relevance";
import City from "./component/chart/City";
import Topic from "./component/chart/Topic";

function App() {
  return (
    <BrowserRouter>
      <NavbarSidebar />
      <div className="ml-96 mt-16">
        <Routes>
          <Route path="/dashboard" element={<Chart />} />
          <Route path="/intensity" element={<Intensity />} />
          <Route path="/year" element={<EndYear />} />
          <Route path="/likelihood" element={<Likelihood />} />
          <Route path="/sector" element={<Sector />} />
          <Route path="/country" element={<Country />} />
          <Route path="/relevance" element={<Relevance />} />
          <Route path="/city" element={<City />} />
          <Route path="/topic" element={<Topic />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
