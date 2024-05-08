import React, { useState } from "react";
import City from "./City";
import Relevance from "./Relevance";
import Topic from "./Topic";
import Country from "./Country";
import Likelihood from "./Likelihood";
import Intensity from "./Intensity";
import EndYear from "./EndYear";
import Sector from "./Sector";


const Chart = () => {
  const [filterCriteria, setFilterCriteria] = useState(null);

  const handleSelection = (component) => {
    setFilterCriteria(component);
  };

  let selectedComponent = null;

  switch (filterCriteria) {
    case "City":
      selectedComponent = <City />;
      break;
    case "Relevance":
      selectedComponent = <Relevance />;
      break;
    case "Topic":
      selectedComponent = <Topic />;
      break;
    case "Country":
      selectedComponent = <Country />;
      break;
    case "Likelihood":
      selectedComponent = <Likelihood />;
      break;
    case "Intensity":
      selectedComponent = <Intensity />;
      break;
    case "EndYear":
      selectedComponent = <EndYear />;
      break;
    case "Sector":
      selectedComponent = <Sector />;
      break;
    default:
      selectedComponent = <City />;
      break;
  }

  return (
    <div>
      <div>
        <label className="text-xl m-2" htmlFor="sector">Sector:</label>
        <select id="sector" onChange={(e) => handleSelection(e.target.value)} className="px-10 py-1 ">
          <option value="">All</option>
          <option>EndYear</option>
          <option>Sector</option>
          <option>City</option>
          <option>Relevance</option>
          <option>Intensity</option>
          <option>Likelihood</option>
          <option>Topic</option>
          <option>Country</option>
        </select>
      </div>
      {selectedComponent}
    </div>
  );
};

export default Chart;
