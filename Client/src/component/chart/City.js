import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useData } from "../../API/FetchAPI";

const City = () => {
  const data = useData();

  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const cities = Array.from(new Set(data.map((d) => d.country)));
      const sectors = Array.from(new Set(data.map((d) => d.sector)));
      const groupedData = cities.map((country) => ({
        country,
        sectors: sectors.map((sector) => ({
          sector,
          count: data.filter(
            (d) => d.country === country && d.sector === sector
          ).length,
        })),
      }));

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 1000 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x0 = d3
        .scaleBand()
        .domain(cities)
        .rangeRound([0, width])
        .paddingInner(0.1);

      const x1 = d3
        .scaleBand()
        .domain(sectors)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(groupedData, (d) => d3.max(d.sectors, (s) => s.count)),
        ])
        .nice()
        .rangeRound([height, 0]);

      const color = d3.scaleOrdinal().range(d3.schemeCategory10);

      svg
        .selectAll(".country")
        .data(groupedData)
        .enter()
        .append("g")
        .attr("class", "country")
        .attr("transform", (d) => `translate(${x0(d.country)},0)`)
        .selectAll("rect")
        .data((d) => d.sectors)
        .enter()
        .append("rect")
        .attr("x", (d) => x1(d.sector))
        .attr("y", (d) => y(d.count))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => height - y(d.count))
        .attr("fill", (d) => color(d.sector));

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0));

      svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

      const legend = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(sectors)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      legend
        .append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text((d) => d);
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default City;
