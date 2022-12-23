//Data Promise
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Fetch Data from URL
d3.json(url).then(function(data) {
  console.log(data);
  let sampleData = data['samples'];

  let samples = {};
    data['samples'].forEach((sample) => {
        samples[sample.id] = sample;
    });
  
  let metaData = {};
  data['metadata'].forEach((m) => {
    metaData[String(m.id)] = m;
    });

  //Initialze the DropDown
  let names = data['names'];
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
  });

  let barData = [{
    x: filteredValues, 
    y: yValues,
    text: filteredLabels, 
    type: 'bar',
    orientation: 'h',
    marker: { 
      color: 'rgb(52, 128, 235)'
      }
  }];

  let barLayout = {
    title: `<b>Top 10 OTUs for ID: 940</b>`
  };
  
  Plotly.newPlot("bar", barData, barLayout);

  //Initial Bubble Chart 

  let bubbleID = initData.otu_ids
  let bubbleValues = initData.sample_values
  let bubbleLabels = initData.otu_labels

  let bubbleData = [{
    x: bubbleID,
    y: bubbleValues,
    mode: 'markers',
    marker: {
      color: bubbleID,
      size: bubbleValues, 
      colorscale: 'Earth'
    },
    text: bubbleLabels
  }]; 

  let bubbleLayout = {
    title: `<b> Summary of All OTUs for ID: 940</b>`
  };

  Plotly.newPlot('bubble', bubbleData, bubbleLayout);


  //Function for DemoBox
  function displayMetadata(metaData) {
    let panelBodyElement = d3.select(".panel-body");
    panelBodyElement.html('');
    Object.entries(metaData).forEach(([key, value]) => {
      console.log(`${key} ${value}`);
      panelBodyElement.append("p").text(`${key}: ${value}`)
    });
  }

  //Display Initial Demobox
  displayMetadata(metaData['940']);

  //Event Listener for Dropdown
  d3.selectAll("#selDataset").on("change", optionChanged);

  //Function for Changes in the Dropdown
  function  optionChanged() {
    let selectedValue = this.value;
    let sample = samples[selectedValue];
    let otuIDs = sample.otu_ids;
    let sampleValues = sample.sample_values;
    let otuLabels = sample.otu_labels;

    //New Bar Chart
    let barIDs = otuIDs.slice(0,10).reverse();
    let barValues = sampleValues.slice(0,10).reverse();
    let barLabels = otuLabels.slice(0,10).reverse();
  
    let newOtu = [];
    barIDs.map(value => {
      newOtu.push(`OTU ${value}`)
    });
    
    let barData = [{
      x: barValues,
      y: newOtu,
      text: barLabels, 
      type: 'bar', 
      orientation: 'h', 
      marker: {
        color: 'rgb(52, 128, 235)'
      }
    }];
        
    let barLayout = {
      title: `<b>Top 10 OTUs for ID: ${selectedValue}</b>`
    };
    
    //New Bubble Chart

    let bubbleData = [{
      x: otuIDs, 
      y: sampleValues,
      mode: 'markers',
      marker: {
        color: otuIDs, 
        size: sampleValues, 
        colorscale: 'Earth'
      },
      text: otuLabels
    }];

    let bubbleLayout = {
      title: `<b> Summary of All OTUs for ID: ${selectedValue}</b>`
    };
  
      //Display the data and charts for the selected value
      Plotly.newPlot('bubble', bubbleData, bubbleLayout)
      Plotly.newPlot("bar", barData, barLayout)
      displayMetadata(metaData[selectedValue]);
  }
});