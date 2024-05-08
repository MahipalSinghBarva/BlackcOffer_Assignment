import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useData } from "../../API/FetchAPI";

const EmdYear = () => {
  const data = useData();

  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);

      const width = 1200;
      const height = 600;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      svg.attr("width", width).attr("height", height);
      const endYears = data.map((d) => d.end_year);
      const x = d3
        .scaleBand()
        .domain(endYears)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.end_year))
        .attr("y", (d) => y(d.intensity))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d.intensity))
        .attr("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div className="md:w-32 lg:w-48">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EmdYear;
