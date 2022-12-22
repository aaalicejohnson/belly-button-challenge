//Data Retrieval
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Function to Initalize Dashboard
function init () {
  d3.json(url).then(function(data) {
    console.log(data);
    let sampleData = data['samples']
    let metaData = data['metadata']
    

    // Inital BarChart
    let initData = sampleData[0];
    console.log(initData);

    let filteredIDs = initData.otu_ids.slice(0,10).reverse()
    let filteredLabels = initData.otu_labels.slice(0,10).reverse()
    let filteredValues = initData.sample_values.slice(0,10).reverse()
  

    let yValues = [];
    filteredIDs.forEach(value => {
      yValues.push(`OTU ${value}`)
    }
    )

    //console.log(yValues);

    let barData = [{
      x: filteredValues, 
      y: yValues,
      text: filteredLabels, 
      type: 'bar',
      orientation: 'h'
    }];
  
    Plotly.newPlot("bar", barData);

  });
};

init();

//Function for changes in the dropdown

d3.selectAll("#selDataset").on("change", getData);


function getData () {
  let dropdown = d3.select("#selDataset")
  d3.json(url).then(function(data) {
    console.log(data);
    let names = data['names'];
    let barData = [];
    names.forEach(id => {
      dropdown.append("option").text(id).attr("value", id)
    });
    
    
    
  });
}


getData();

    // let barData = [{
    //   x: sample_values.slice(0,10).reverse(),
    //   y: otuIDs.slice(0,10).reverse(),
    //   text: otuLabels.slice(0,10).reverse(),
    //   type: 'bar',
    //   orientation: 'h'
    // }]

    // Plotly.newPlot('bar', barData)