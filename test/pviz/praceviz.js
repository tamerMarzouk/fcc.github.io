looker.plugins.visualizations.add({
  options: {
    duration: {
      type: "number",
      label: "Animation time",
      display: "range",
      max: 30000,
      min: 100,
      step: 100,
      default: 5000,
    },
    axiscolor: {
      type: 'string',
      label: 'Axis Color',
      display: 'color',
      default: 'blue',
    }
  },
  create: function (element, config) {
    var css = element.innerHTML = `
        <style>
          .tmm_main{
            /* Vertical centering*/
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }

        </style>
      `;
    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    const width = element.clientWidth
    const height = element.clientHeight
    const w = width - 100;
    const h = height - 20;

    console.log(`Starting with width:${w}, height:${h}`);

    container.className = "tmm_main";
    var chart = d3.select('.tmm_main');
    chart.selectAll('svg').remove();


    var svg = chart.append('svg')
      .attr("preserveAspectRatio", "xMinYMin")
      .attr('width', '800px')
      .attr('height', '600px')


    // let mycontainer=container.getBoundingClientRect();
    //  svg.attr('width',mycontainer.width+'px');
    // svg.attr('height',mycontainer.height+'px');


    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));
    this._svg = svg;
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Grab the first cell of the data.
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0 || queryResponse.fields.measures.length == 0) {
      this.addError({ title: "No Dimensions or Measures", message: "This chart requires 1 dimension for participants and 1 measure with data as a pivot table for years or time." });
      return;
    }
    measure0 = queryResponse.fields.dimensions[0].name;
    measure1 = queryResponse.fields.measures[0].name;
    //clear the svg of all elements
    this._svg.selectAll('*').remove();
    dataSet = data;
    calcYears();
    prepareData();
    myconf.duration = config.duration;
    myconf.axiscolor = config.axiscolor;
    myconf.allowAnimation = true;
    drawChart(this._svg);
    // Always call done to indicate a visualization has finished rendering.
    done()
  }
})

//   //@author Tamer Marzouk
//   //@ for peagsus-oe
var participants = [];
var colorScale;
var currentYear = 0;
var years = [];
var yearsIndex = 0;
var fixedData;
var measure0;
var measure1;
const myconf = {
  duration: 10000,
  axiscolor: 'blue',
  allowAnimation: true,
}

function calcYears() {
  //console.log(dataSet[0][measure1])
  years = Object.keys(dataSet[0][measure1]);
  //console.log(years);
  years = years.filter(key => {
    if (!isNaN(parseInt(key))) {
      return 1;
    }
    return 0;
  });
  console.log(years)
  currentYear = d3.min(years);
}



function prepareData() {
  //get participants
  participants = [];

  dataSet.forEach(d => {
    if (participants.indexOf(d[measure0]) > -1) { return; }
    participants.push(d[measure0])
  })
  console.log(participants);
  colorScale = d3.scaleOrdinal().domain(participants).range(["#ff31dc", "#3d21c9", "#c0f1ff",

    "#a528de",

    "#1942e9",
    "#baed00",
    "#0127b2",
    "#abff4b",
    "#d72ee5",
    "#00cb44",
    "#ea1ada",
    "#79cd00",
    "#d855ff",
    "#40b300",

    "#67ff81",
    "#5c00a5",
    "#fff134",
    "#6563ff",
    "#f8ff58",
    "#aa5dff",
    "#87b100",
    "#1073ff",
    "#e2ff70",
    "#3a0074",
    "#00de7b",
    "#ff1dbe",
    "#01b04f",
    "#af00a5",
    "#389000",
    "#dd6dff",
    "#b2ff90",
    "#69007e",
    "#ffe966",
    "#7771ff",
    "#ffd450",
    "#0166dc",
    "#b8a000",
    "#0146af",
    "#ffb23e",
    "#017ded",
    "#d60000",
    "#47ffe6",
    "#ef013f",
    "#02e2b5",
    "#e80099",
    "#007010",
    "#ff7bff",
    "#005e1f",
    "#ff369b",
    "#02b984",
    "#b60089",
    "#00eada",
    "#ff313a",
    "#01c1ff",
    "#ff512a",
    "#01b1fb",
    "#e35c00",
    "#0285d6",
    "#ff9c34",
    "#001160",
    "#fffc92",
    "#17003d",
    "#baffb8",
    "#920081",
    "#979300",
    "#c082ff",
    "#a48c00",
    "#8b8dff",
    "#cb8f00",
    "#002f80",
    "#ff703b",
    "#01c8d6",
    "#bb0020",
    "#99ffff",
    "#dc0052",
    "#00b69b",
    "#9c0066",
    "#a8ffd6",
    "#54005c",
    "#fff3b1",
    "#080036",
    "#f2ffd6",
    "#42004c",
    "#c4ffef",
    "#8c0d00",
    "#70e6ff",
    "#8b0026",
    "#00b0d0",
    "#ff7053",
    "#004e96",
    "#b17300",
    "#929eff",
    "#737800",
    "#f398ff",
    "#243a00",
    "#ff7fdc",
    "#008867",
    "#ff67b6",
    "#007e6d",
    "#ff6469",
    "#0183bd",
    "#ff9e60",
    "#00376e",
    "#ffb373",
    "#00193b",
    "#ffe7c0",
    "#240024",
    "#fff6e4",
    "#110006",
    "#f8efff",
    "#200013",

    "#a70050",
    "#9bd6ff",
    "#641f00",
    "#99b2ff",
    "#8a6100",
    "#edafff",
    "#675600",
    "#ff9bef",
    "#191d00",
    "#ffb6e8",
    "#002526",
    "#ff758e",
    "#006d6d",
    "#ff87aa",
    "#004142",
    "#ffb38d",
    "#002d41",
    "#ffcbab",
    "#37001b",
    "#d3deff",
    "#2e0a00",
    "#d7cdff",
    "#8a4c00",
    "#b7bdff",
    "#443e00",
    "#ffdce1",
    "#241200",
    "#ffc0b2",
    "#004c5f",
    "#ffa7b7",
    "#3c2a00",
    "#0078a1",
    "#6f0023",
    "#008599",
    "#610034",
    "#371a00",
    "#511900"]);


}


var widthScale = null;
var xAxis;
var w;
var h;
var axiscolor = blue;
function updateAxis(dataset, w, h) {

  let minmax = d3.extent(dataset, d => d[measure1][currentYear].value);

  if (widthScale == null) {
    widthScale = d3.scaleLinear().domain(minmax).range([30, w - 200]);
  } else {
    widthScale.domain(minmax);
  }
  console.log(`currentYear:${currentYear}, width:${w}, height:${h}`, minmax, widthScale(minmax[0]), widthScale(minmax[1]))
  xAxis = d3.axisTop().scale(widthScale)
    .tickSize(h)
}

function customXAxis(g) {
  let axiscolor = myconf.axiscolor;
  g.call(xAxis);
  g.select(".domain").remove();
  g.selectAll(".tick").attr('color', axiscolor);
  g.selectAll(".tick:first-of-type line").attr("stroke", axiscolor).attr("stroke-dasharray", "3,5");
  g.selectAll(".tick:not(:first-of-type) line").attr("stroke", axiscolor).attr("stroke-dasharray", "1,9");
  g.selectAll(".tick text").attr("x", 4).attr("dy", -4);

}

function sortDataSet() {
  //sort data by GDP
  dataSet = dataSet.sort((a, b, i) => {
    //console.log(a,b)
    return b[measure1][currentYear].value - a[measure1][currentYear].value;
  })
}
function drawChart(svg) {


  var chart = d3.select('.tmm_main');

  let container = chart.node().getBoundingClientRect();


  let w =800;// container.width;
  let h =600;// container.height;
  console.log(`-----inside draw chart width:${w}, height:${h}`);
  console.log(svg.node().getBBox());
  // calcMaxValues(dataSet);
  // prepareChart(w,h)
  // console.log(yScale(maxGDP))
  // console.log(widthScale(minGDP))
  sortDataSet();

  svg
    .append('text')
    .attr('fill', 'green')
    .attr('x', 160)
    .attr('y', 20)
    .attr('class', 'year')
    .text('Year = ' + currentYear)
    .on('click', () => {
      if (myconf.allowAnimation) {
        myconf.allowAnimation = false;
      } else {
        myconf.allowAnimation = true;
      }
      console.log('==PAUSED==', myconf.allowAnimation);
    })
  //replay
  svg
    .append('text')
    .attr('fill', 'blue')
    .attr('x', 450)
    .attr('y', 20)

    .attr('class', 'button')
    .text('Replay')
    .on('click', o => {

      svg.selectAll('*').remove();
      yearsIndex = 0;
      currentYear = years[yearsIndex];
      myconf.allowAnimation = true;
      drawChart(svg);
    })

  //draw axis
  console.log(`---drawing axis -width, height- ${w} ,  ${h}`);
  updateAxis(dataSet, w, h);
  svg.append("g")
    .attr('class', 'custom-axis')
    .attr("transform", "translate(0," + (h + 50) + ")")
    .attr('fill',myconf.axiscolor)
    .call(customXAxis);


  var mysvg = svg.selectAll('rect')
    .data(dataSet)
    .enter()
  var group = mysvg.append('g')
  group.append('rect')
    .attr('x', 30)
    .attr('y', (d, i) => i * 20 + 50)
    .attr('key', (d, i) => i)
    .attr('width', (d) => widthScale(parseFloat(d[measure1][currentYear].value)) - 30)
    .attr('height', 12)
    .attr('fill', d => colorScale(d[measure0].value))
    .on('click', o => {
      console.log(o)
    })
  group.append('title')
    .attr('class', 'title')
    .attr('key', (d, i) => i)
    .text(d => d[measure0].value + ' ' + d[measure1][currentYear].value)
  group.append('text')
    // .attr('x',20)
    // .attr('y',(d,i)=>i*20+60)
    .attr('x', d => 10 + widthScale(d[measure1][currentYear].value))
    .attr('y', (d, i) => i * 20 + 60)
    .attr('key', (d, i) => i)
    .attr('font-size', 10)
    .attr('fill', 'black')
    .attr('class', 'participant')
    .text(d => d[measure0].value)
  group.append('text')
    .attr('x', d => 50 + widthScale(d[measure1][currentYear].value))
    .attr('y', (d, i) => i * 20 + 60)
    .attr('key', (d, i) => i)
    .attr('font-size', 10)
    .attr('fill', 'black')
    .style('stroke', 'green')
    .style('stroke-width', '0.3px')
    .attr('class', 'value')
    .attr('data-val', d => d[measure1][currentYear].value)
    .text(d => parseInt(d[measure1][currentYear].value))


  setTimeout(() => transition(svg, group), 1000);
}

function transition(svg, group) {
  console.log('-----Starting transition ', myconf.allowAnimation);
  if (!myconf.allowAnimation) {
    return;//stop repeating the transition 
  }
  yearsIndex++;
  if (yearsIndex > years.length - 1) {
    myconf.allowAnimation = false;
    console.log('Reached end of animation-->',currentYear)
    return;
  }

  currentYear = years[yearsIndex];
  console.log(currentYear);
  //sort for currentYear
  sortDataSet();

  let dur = myconf.duration;
  let del = 100;
  // d3.transition().duration(11000).delay(12000).each(()=>{
  let myTrans = d3.transition().ease(d3.easeLinear).duration(dur)

  //update Axis
  updateAxis(dataSet, w, h);
  svg.selectAll('.custom-axis').transition(myTrans).call(customXAxis).on("start", function () {
    //remove the domain path during transition
    svg.select(".custom-axis .domain").remove();
  });

  svg.selectAll('.year').transition(myTrans).text('Year = ' + currentYear)

  group.selectAll('.title').transition(myTrans).text(d => {
    console.log(currentYear)
    return d[measure0].value + ' ' + d[measure1][currentYear].value;
  })

  group.selectAll('.value').transition(myTrans).attr('x', d => 150 + widthScale(d[measure1][currentYear].value))
    .attr('y', (d, i, t) => {
      let newIndex = dataSet.indexOf(d)
      return newIndex * 20 + 60;
    })

  group.selectAll('.value').transition(myTrans).tween("text", (d, i, o) => {
    var obj = d3.select(o[i]);
    let oldText = obj.attr('data-val');
    var inter = d3.interpolate(oldText, d[measure1][currentYear].value)
    return (t) => {
      obj.text(inter(t));
    }
  })

  group.selectAll('.participant').transition(myTrans).attr('x', d => 50 + widthScale(d[measure1][currentYear].value))
    .attr('y', (d, i, t) => {
      let newIndex = dataSet.indexOf(d)
      return newIndex * 20 + 60
    })
  group.selectAll('rect').transition(myTrans).attr('width', d => widthScale(d[measure1][currentYear].value) - 30)
    .attr('y', (d, i, t) => {
      let newIndex = dataSet.indexOf(d)

      return newIndex * 20 + 50;
    })




  myTrans.on('end', () => {
    console.log(' calling transition!:', yearsIndex)
    setTimeout(() => { transition(svg, group) }, 1000 * yearsIndex)
  });
}