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
  
  // Create an element to contain the text.
  this._textElement = container.appendChild(document.createElement("div"));

    },
    updateAsync: function(data, element, config, queryResponse, details, done) {
         // Grab the first cell of the data.
         this.clearErrors();
         console.log(data);
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];
        console.log(firstRow);
        console.log(queryResponse.fields.dimensions);
    // Insert the data into the page.
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);
     dataSet=data;
      calcYears();
      prepareData();
      drawChart();
   // Always call done to indicate a visualization has finished rendering.
    done()
    }
  })

//   //Copyright Tamer Marzouk
// let CSVDataURL='https://tamermarzouk.github.io/data/valueaddedperindustry.csv';
// const participantFieldName="Industry";
// var dataSet=[];
// d3.csv(CSVDataURL).then(data=>{
//   console.log('Data loaded',data.length);
//   dataSet=data;
//   calcYears();
//   prepareData();
//   drawChart();
// });



var currentYear=0;
var years=[];
var yearsIndex=0;
var interval=1;

function calcYears(){
  years=Object.keys(dataSet[0]);
  years=years.filter(key=>{
    if(!isNaN(parseInt(key))){
      return 1;
    }
    return 0;
  });
  //console.log(years)
  currentYear=d3.min(years);
}

var participants=[];
var colorScale;

function prepareData(){
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

var maxValues=[];
var minValues=[];
var overallMin=0;
var overallMax=0;
function calcMaxValues(dataset){
  for(let i=0;i<years.length-1;i++){
    let myyear=years[i];
    let minmax=d3.extent(dataset,d=>d[myyear]?parseFloat(d[myyear]):0);
    
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
}
function drawChart(){
  
  let h=800;
  let w=800;
  var chart=d3.select('.tmm_main');
  var svg=chart.append('svg')
  .attr('width',w+250)
  .attr('height',h);
 participants=dataSet.map(d=>{
    return d[participantFieldName.trim()];
  });
    
  calcMaxValues(dataSet);
  prepareChart(w,h)
  //sort data by GDP
  dataSet=dataSet.sort((a,b,i)=>{
    return b[currentYear]-a[currentYear];
  })
  
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
      drawChart();
})
  
  
  var mysvg=svg.selectAll('rect')
      .data(dataSet)
  .enter()
 var group= mysvg.append('g')
  group.append('rect')
  .attr('x',130)
  .attr('y',(d,i)=>i*20+50)
  .attr('key',(d,i)=>i)
  .attr('width',(d)=>widthScale(!isNaN(parseFloat(d[currentYear]))?parseFloat(d[currentYear]):0))
  .attr('height',12)
  .attr('fill',d=>colorScale(d[participantFieldName]))
   .on('click',o=>{
  console.log(o['Country Code'])
})
  group.append('title')
  .attr('class','title')
.attr('key',(d,i)=>i)
    .text(d=>d[participantFieldName]+' '+d[currentYear])
  group.append('text')
  .attr('x',20)
  .attr('y',(d,i)=>i*20+60)
  .attr('key',(d,i)=>i)
  .attr('font-size',10)
  .attr('fill','black')
  .attr('class','participant')
  .text(d=>d[participantFieldName])
   group.append('text')
  .attr('x',d=>150+widthScale(parseInt(d[currentYear])))
  .attr('y',(d,i)=>i*20+60)
   .attr('key',(d,i)=>i)
  .attr('font-size',10)
  .attr('fill','black')
  .style('stroke','red')
  .style('stroke-width','0.3px')
  .attr('class','value')
  .text(d=>parseInt(d[currentYear]))

  
  transition(svg,group,widthScale);
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
 dataSet=dataSet.sort((a,b)=>{
    return b[currentYear]-a[currentYear];
  });
  
  let dur=1500;
  let del=100;
 // d3.transition().duration(11000).delay(12000).each(()=>{
  let myTrans=d3.transition().ease(d3.easeLinear).duration(dur)//.delay((d,i)=>i*del);
  
  svg.selectAll('.year').transition(myTrans).text('Year = '+currentYear)
  
     group.selectAll('.title').transition(myTrans).text(d=>{
   console.log(currentYear)
   return d[participantFieldName]+' '+d[currentYear];
 })
 group.selectAll('.value').transition(myTrans).attr('x',d=>150+widthScale(parseInt(d[currentYear])))
  .attr('y',(d,i,t)=>{
  let newIndex=dataSet.indexOf(d)
   return newIndex*20+60;
 }).text(d=>{
   console.log(currentYear)
   return parseInt(d[currentYear])
 })
   
 group.selectAll('.participant').transition(myTrans).attr('y',(d,i,t)=>{
 let newIndex=dataSet.indexOf(d)
   return newIndex*20+60
 })
  group.selectAll('rect').transition(myTrans).attr('width',d=>widthScale(!isNaN(parseFloat(d[currentYear]))?parseFloat(d[currentYear]):0))
     .attr('y',(d,i,t)=>{
       let newIndex=dataSet.indexOf(d)
     
    return newIndex*20+50;
  })
  
  
    
//  })
myTrans.on('end',()=>{
    console.log(' calling transition!:',yearsIndex)
    setTimeout(()=>{transition(svg,group,widthScale)},100*yearsIndex)
  });
}


