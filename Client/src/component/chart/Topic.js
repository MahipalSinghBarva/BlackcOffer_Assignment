import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useData } from "../../API/FetchAPI";


const Topic = () => {
//   const [data, setData] = useState([]);
  const svgRef = useRef();
  const chartRef = useRef();
  const [panOffset, setPanOffset] = useState(0);
    const data = useData()
  

  useEffect(() => {
    if (data.length > 0) {
      const width = 1000;
      const height = 500;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map(d => d.topic))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.intensity)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);

      const chart = svg.append("g").attr("ref", chartRef);

      chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      chart.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.topic))
        .attr("y", d => y(d.intensity))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.intensity))
        .attr("fill", "steelblue");

    
      const zoom = d3.zoom()
        .scaleExtent([1, 1])
        .on("zoom", zoomed);

      svg.call(zoom);

      function zoomed(event) {
        const { transform } = event;
        setPanOffset(transform.x);
        chart.attr("transform", `translate(${transform.x}, 0)`);
        chart.select(".x-axis").call(xAxis.scale(transform.rescaleX(x)));
      }
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}>
        <g transform={`translate(${panOffset}, 0)`} />
      </svg>
    </div>
  );
};

export default Topic;
