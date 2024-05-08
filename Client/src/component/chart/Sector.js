import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useData } from "../../API/FetchAPI";

const Sector = () => {
  const data = useData();

  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);

      const width = 1200;
      const height = 600;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      svg.attr("width", width).attr("height", height);

      const sectors = Array.from(new Set(data.map((d) => d.sector)));
      const sectorCounts = sectors.map((sector) => ({
        sector: sector,
        count: data.filter((d) => d.sector === sector).length,
      }));

      const x = d3
        .scaleBand()
        .domain(sectors)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(sectorCounts, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const line = d3
        .line()
        .x((d) => x(d.sector) + x.bandwidth() / 2)
        .y((d) => y(d.count));

      svg
        .append("path")
        .datum(sectorCounts)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      svg
        .selectAll(".dot")
        .data(sectorCounts)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => x(d.sector) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.count))
        .attr("r", 5)
        .attr("fill", "steelblue");

      svg
        .selectAll(".sector-label")
        .data(sectorCounts)
        .enter()
        .append("text")
        .attr("class", "sector-label")
        .attr("x", (d) => x(d.sector) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.count) - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text((d) => d.sector);

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Sector;
