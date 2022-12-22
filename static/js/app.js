//Data Retrieval
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Function to Initalize Dashboard

d3.json(url).then(function(data) {
  console.log(data);
  let sampleData = data['samples']
  let metaData = data['metadata']
  let names = data['names'];

  let samples = {};
    data['samples'].forEach((sample) => {
        samples[sample.id] = sample;
    });

  let dropdown = d3.select("#selDataset")
  names.forEach(id => {
    dropdown.append("option").text(id).attr("value", id)
  });
    

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

  d3.selectAll("#selDataset").on("change", optionChanged);

  function  optionChanged() {
    let samples = {};
    data['samples'].forEach((sample) => {
        samples[sample.id] = sample;
    });
  
      let selectedValue = this.value;
      let sample = samples[selectedValue];
  
      let otuIDs = sample.otu_ids
      let sampleValues = sample.sample_values
      let otuLabels = sample.otu_labels
  
      let bar_ids = otuIDs.slice(0,10).reverse();
      let bar_values = sampleValues.slice(0,10).reverse();
      let bar_labels = otuLabels.slice(0,10).reverse();
  
      let new_otu = [];
      bar_ids.map(value => {
        new_otu.push(`OTU ${value}`)
      })
  
      let barData = [{
        x: bar_values,
        y: new_otu,
        text: bar_labels, 
        type: 'bar', 
        orientation: 'h'
      }]
  
      Plotly.newPlot("bar", barData)


  }
});








    // let barData = [{
    //   x: sample_values.slice(0,10).reverse(),
    //   y: otuIDs.slice(0,10).reverse(),
    //   text: otuLabels.slice(0,10).reverse(),
    //   type: 'bar',
    //   orientation: 'h'
    // }]

    // Plotly.newPlot('bar', barData)