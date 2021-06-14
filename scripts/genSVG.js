const d3 = require("./d3.v7.min.js");
const jsdom = require("jsdom");
const sharp = require("sharp");
const fs = require("fs");
const getDesiredStats = require("./gen.js");

const {JSDOM} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
let body = d3.select(dom.window.document.querySelector("body"));
let svg = body.append("svg").attr("xmlns", "http://www.w3.org/2000/svg");

module.exports = generateStatsSVG = (statsResponse, duration) => {
    const statsData = getDesiredStats(statsResponse).filter((v) => v.value > 0.3);
    const numberOfSamples = statsData.length;
    const margin = 20;
    const width = numberOfSamples * 125 - 2 * margin;
    const height = 300 - 2 * margin;
    const paddingToGraph = duration === 30 ? 4 : 1;
    svg.attr("width", numberOfSamples * 125).attr("height", 315);
    // Set the margins
    const chart = svg.append("g").attr("transform", `translate(${margin}, ${margin})`);
    const colorsList = [
        "#D50657",
        "#049AE6",
        "#F8C41B",
        "#32465B",
        "#E45E42",
        "#007C5A",
        "#FC69FF",
        "#3EC6CF",
        "#620A79"
    ];
    const color = d3.scaleOrdinal(colorsList);
    // Set the X Axis
    const xAxis = d3
        .scaleBand()
        .range([0, width])
        .domain(statsData.map((s) => s.language))
        .padding(0.4);

    // Set the Y Axis
    const yAxis = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(statsData, (s) => s.value) + paddingToGraph]);

    chart
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "15px")
        .style("font-family", "monospace")
        .style("font-weight", "300")
        .call(d3.axisBottom(xAxis));

    chart
        .selectAll()
        .data(statsData)
        .enter()
        .append("text")
        .attr("class", "header")
        .style("font-size", "30px")
        .style("fill", "#444")
        .attr("x", "230")
        .attr("y", "30")
        .text("My past week in coding");

    chart
        .selectAll()
        .data(statsData)
        .enter()
        .append("rect")
        .attr("x", (s) => xAxis(s.language))
        .attr("y", (s) => yAxis(s.value))
        .attr("height", (s) => height - yAxis(s.value))
        .attr("width", xAxis.bandwidth())
        .attr("fill", (_d, i) => color(parseFloat(i)));

    chart
        .selectAll()
        .data(statsData)
        .enter()
        .append("text")
        .attr("class", "labels")
        .style("fill", "#444")
        .attr("x", function (d) {
            return xAxis(d.language);
        })
        .attr("y", function (d) {
            return yAxis(d.value) - 20;
        })
        .text(function (d) {
            return d.label;
        });

    fs.writeFileSync("src/images/wakatime.svg", body.html());
    sharp("src/images/wakatime.svg")
        .png()
        .toFile("src/images/wakatime.png")
        .then(() => {
            fs.rmSync("src/images/wakatime.svg");
        })
        .catch((err) => {
            console.log(err);
        });
};
