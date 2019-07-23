looker.plugins.visualizations.add({
    create: function(element, config) {
        var css = element.innerHTML = `
        <style>
          .main {
            // Vertical centering
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
  container.className = "tmm_main";
  var chart=d3.select('.tmm_main');
  chart.selectAll('svg').remove();
  var svg=chart.append('svg')
  .attr("preserveAspectRatio", "xMinYMin")
  .attr('width','800px')
  .attr('height','600px')
  let mycontainer=chart.node().getBoundingClientRect();
   svg.attr('width',mycontainer.width+'px');
  svg.attr('height',mycontainer.height+'px');
  
 let w=mycontainer.width;
  let h=mycontainer.height;
  // Create an element to contain the text.
  this._textElement = container.appendChild(document.createElement("div"));
   this._svg=svg;
    },
    updateAsync: function(data, element, config, queryResponse, details, done) {
         // Grab the first cell of the data.
         this.clearErrors();
         console.log(element);
         console.log(queryResponse.fields)
         measure0=queryResponse.fields.dimensions[0].name;
         measure1=queryResponse.fields.measures[0].name;
    // var firstRow = data[0];
    // var firstCell = firstRow[queryResponse.fields.dimensions[0].name];
    //     console.log(firstRow);
    //     console.log(queryResponse.fields.dimensions);
    // // Insert the data into the page.
    // this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);
     dataSet=data;
     calcYears();
     prepareData();
     drawChart(this._svg);
   // Always call done to indicate a visualization has finished rendering.
    done()
    }
  })

//   //@author Tamer Marzouk
//   //@ for peagsus-oe
var participants=[];
var colorScale;
var currentYear=0;
var years=[];
var yearsIndex=0;
var interval=1;
var fixedData;
var measure0;
var measure1;

function calcYears(){
  //console.log(dataSet[0][measure1])
  years=Object.keys(dataSet[0][measure1]);
  //console.log(years);
  years=years.filter(key=>{
    if(!isNaN(parseInt(key))){
      return 1;
    }
    return 0;
  });
  console.log(years)
  currentYear=d3.min(years);
}



function prepareData(){
  //get participants
  dataSet.forEach(d=>{
    participants.push(d[measure0])
  })
  console.log(participants);
  colorScale=d3.scaleOrdinal().domain(participants).range(["#ff31dc","#3d21c9","#c0f1ff",

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


var overallMin=0;
var overallMax=0;
function calcMaxValues(dataset){
  var maxValues=[];
var minValues=[];
  for(let i=0;i<years.length-1;i++){
    let myyear=years[i];
    let minmax=d3.extent(dataset,d=>d[measure1][myyear].value);
    console.log('Year:',years[i], ', minimum:',minmax[0],', maximum:',minmax[1])  
    maxValues.push(minmax[1]);
    minValues.push(minmax[0])
  }
  overallMax=d3.max(maxValues);
  overallMin=d3.min(minValues);
  console.log(overallMin,overallMax);
}

 var widthScale;
function prepareChart(w,h){
 widthScale=d3.scaleLinear().domain([overallMax,overallMin]).range([w,0]);
  // console.log(widthScale(overallMin))
  // console.log(widthScale(overallMax))
}

function sortDataSet(){
   //sort data by GDP
  dataSet=dataSet.sort((a,b,i)=>{
    //console.log(a,b)
    return b[measure1][currentYear].value-a[measure1][currentYear].value;
  })
}
function drawChart(svg){
  

  var chart=d3.select('.tmm_main');
 
  let container=chart.node().getBoundingClientRect();
  
  
 let w=container.width;
  let h=container.height;
     console.log(`width:${w}, height:${h}`);
  calcMaxValues(dataSet);
  prepareChart(w,h)
 // console.log(yScale(maxGDP))
 // console.log(widthScale(minGDP))
 sortDataSet();
  
svg
  .append('text')
  .attr('fill','green')
  .attr('x',160)
  .attr('y',20)
  .attr('class','year')
  .text('Year = '+currentYear)
  //replay
    svg
  .append('text')
  .attr('fill','blue')
  .attr('x',450)
  .attr('y',20)

  .attr('class','button')
  .text('Replay')
  .on('click',o=>{
     //  if(interval==null) return;
     // interval=null;
     
      d3.select('svg').remove();
      yearsIndex=0;
      currentYear=years[yearsIndex];
      interval=1;
      drawChart(svg);
})
  
  
  var mysvg=svg.selectAll('rect')
      .data(dataSet)
  .enter()
 var group= mysvg.append('g')
  group.append('rect')
  .attr('x',130)
  .attr('y',(d,i)=>i*20+50)
  .attr('key',(d,i)=>i)
  .attr('width',(d)=>widthScale(parseFloat(d[measure1][currentYear].value)))
  .attr('height',12)
  .attr('fill',d=>colorScale(d[measure0].value))
   .on('click',o=>{
  console.log(o['Country Code'])
})
  group.append('title')
  .attr('class','title')
.attr('key',(d,i)=>i)
    .text(d=>d[measure0].value+' '+d[measure1][currentYear].value)
  group.append('text')
  .attr('x',20)
  .attr('y',(d,i)=>i*20+60)
  .attr('key',(d,i)=>i)
  .attr('font-size',10)
  .attr('fill','black')
  .attr('class','participant')
  .text(d=>d[measure0].value)
   group.append('text')
  .attr('x',d=>150+widthScale(d[measure1][currentYear].value))
  .attr('y',(d,i)=>i*20+60)
   .attr('key',(d,i)=>i)
  .attr('font-size',10)
  .attr('fill','black')
  .style('stroke','red')
  .style('stroke-width','0.3px')
  .attr('class','value')
  .text(d=>parseInt(d[measure1][currentYear].value))

  
 setTimeout(()=> transition(svg,group,widthScale),1000);
}

function transition(svg,group,widthScale){
  if(interval==null){
    return;//stop repeating the transition 
  }
    yearsIndex++;
    if(yearsIndex>years.length-1){
       interval=null;
       //console.log(currentYear)
 return;
  }

  currentYear=years[yearsIndex];
  console.log(currentYear);
  //sort for currentYear
sortDataSet();
  
  let dur=2000;
  let del=100;
 // d3.transition().duration(11000).delay(12000).each(()=>{
  let myTrans=d3.transition().ease(d3.easeLinear).duration(dur)//.delay((d,i)=>i*del);
  
  svg.selectAll('.year').transition(myTrans).text('Year = '+currentYear)
  
     group.selectAll('.title').transition(myTrans).text(d=>{
   console.log(currentYear)
   return d[measure0].value+' '+d[measure1][currentYear].value;
 })
 group.selectAll('.value').transition(myTrans).attr('x',d=>150+widthScale(d[measure1][currentYear].value))
  .attr('y',(d,i,t)=>{
  let newIndex=dataSet.indexOf(d)
   return newIndex*20+60;
 }).text(d=>{
   console.log(currentYear)
   return d[measure1][currentYear].rendered
 })
   
 group.selectAll('.participant').transition(myTrans).attr('y',(d,i,t)=>{
 let newIndex=dataSet.indexOf(d)
   return newIndex*20+60
 })
  group.selectAll('rect').transition(myTrans).attr('width',d=>widthScale(d[measure1][currentYear].value))
     .attr('y',(d,i,t)=>{
       let newIndex=dataSet.indexOf(d)
     
    return newIndex*20+50;
  })
  
  
    
//  })
myTrans.on('end',()=>{
    console.log(' calling transition!:',yearsIndex)
    setTimeout(()=>{transition(svg,group,widthScale)},1000*yearsIndex)
  });
}