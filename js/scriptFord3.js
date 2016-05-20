function multiLine(urbanPts, ruralPts) {
  var width = 1000,
      height = 500,
      padding = 100;
  //Create the SVG Viewport selection
  var svgContainer = d3.select("body").append("svg")
               .attr("width", width)
               .attr("height", height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scale.linear()
   .domain([1960, 2015])
   .range([0, 800]);
  //Create the Axis
  var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svgContainer.append("g").attr("transform", "translate(100," + (height - padding +10) + ")").call(xAxis);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scale.linear()
   .domain([100, 0])
   .range([0, 400]);
  //Create the Axis
  var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var yAxisGroup = svgContainer.append("g").attr("transform", "translate("+padding+",10)").call(yAxis);

  // Define 'div' for tooltips
  var div = d3.select("body")
  .append("div")  // declare the tooltip div
  .attr("class", "tooltip")              // apply the 'tooltip' class
  .style("opacity", 0);                  // set the opacity to nil

  svgContainer.append("text")
          .attr("class", "yaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Population (%)");

  svgContainer.append("text")
          .attr("class", "xaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-40)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Year");

  svgContainer.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-20)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Urban-Blue & Rural-Red");

  var lineFunctionForUrban = d3.svg.line()
                          .x(function(d) { return 100+(d.Year-1960)*(800/55); })
                          .y(function(d) { return (400-d.Value*4)+10; })
                          .interpolate("linear");

//The line SVG Path we draw
  var lineGraphUrban = svgContainer.append("path")
                            .attr("d", lineFunctionForUrban(urbanPts))
                            .attr("stroke", "blue")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");

  var lineFunctionForRural = d3.svg.line()
                          .x(function(d) { return 100+(d.Year-1960)*(800/55); })
                          .y(function(d) { return (400-d.Value*4)+10; })
                          .interpolate("linear");

//The line SVG Path we draw
  var lineGraphRural = svgContainer.append("path")
                            .attr("d", lineFunctionForRural(ruralPts))
                            .attr("stroke", "red")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");

  svgContainer.selectAll("circle")
      .data(jsonPts)
      .enter().append("circle")
      .attr("cx", function(d) { return 100+(d.Year-1960)*(800/55); })
      .attr("cy", function(d) { return (400-d.Value*4)+10; })
      .attr("r", 3)
      .style("fill", "Black");
}




//stack bar 

function stackedbar(rects) {
 var width = 1400,
      height = 600,
      padding = 250;
  //Create the SVG Viewport selection
  var svgContainer = d3.select("body").append("svg")
               .attr("width", width)
               .attr("height", height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scale.linear()
   .domain([1960, 2015])
   .range([0, 900]);
  //Create the Axis
  var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svgContainer.append("g").attr("transform", "translate(250," + (height - padding +10 + 150) + ")").call(xAxis);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scale.linear()
   .domain([4000000000, 0])
   .range([0, 600]);
  //Create the Axis
  var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var yAxisGroup = svgContainer.append("g").attr("transform", "translate("+padding+",10)").call(yAxis);

  
  svgContainer.append("text")
          .attr("class", "yaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Population");

  svgContainer.append("text")
          .attr("class", "xaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-40)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("CountryName");

  svgContainer.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-20)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Asian countries Urban/Rural population");

  svgContainer.selectAll("rect")
      .data(rects)
      .enter().append("rect")
      .attr("x", function(d) { return 250+((parseInt(d.Year)-1960)*(900/55)); })
      .attr("width", (900/55))
      .attr("y", function(d) { return 600-((d.Total/4000000000)*600)+10; })
      .attr("height", function(d) { return (parseInt(d.Value)/4000000000)*600; })
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .style("fill", function(d) { return d.Color; })
      ;
}