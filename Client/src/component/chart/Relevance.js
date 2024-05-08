import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useData } from "../../API/FetchAPI";

const Relevance = () => {
  const data = useData();

  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);

      const width = 500;
      const height = 500;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      svg.attr("width", width).attr("height", height);

      const relevanceCounts = d3.rollup(
        data,
        (v) => v.length,
        (d) => d.relevance
      );

      const x = d3
        .scaleBand()
        .domain(Array.from(relevanceCounts.keys()))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(Array.from(relevanceCounts.values()))])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll("rect")
        .data(Array.from(relevanceCounts.entries()))
        .join("rect")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d[1]))
        .attr("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Relevance;
