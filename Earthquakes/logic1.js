// Load the data.
d3.csv("../earthquake_suicide_df.csv").then(function(data) {

    let eqData = createCountries(data);
    init(eqData);

});

function createCountries(data) {
    eqData = {"Afghanistan":{'year':[], 'mag': [], 'rate': []}}
    country = "Afghanistan"
        
    for (i = 0; i < data.length; i++){
        objCountry = data[i].Location

        if (objCountry == country){
            eqData[objCountry]['year'].push((data[i].year));
            eqData[objCountry]['mag'].push((data[i].mag));
            eqData[objCountry]['rate'].push((data[i]['Suicide Rate (per 100k)']));

        } else {
            eqData[objCountry] = {'year': [], 'mag': [], 'rate': []}
            country = objCountry;
            
            eqData[objCountry]['year'].push((data[i].year));
            eqData[objCountry]['mag'].push((data[i].mag));
            eqData[objCountry]['rate'].push((data[i]['Suicide Rate (per 100k)']));
        }
    }

    return eqData
}

// provides default value to show users. Currently set to line graph
function init(eqData) {

    // console.log(eqData)
    let var1 = [
        {
            x: eqData['Afghanistan']['year'].map(parseFloat),
            y: eqData['Afghanistan']['rate'].map(parseFloat),
            // mode: 'lines+markers',
            // type: 'scatter'
        }
    ];

    console.log(`x-axis: ${var1[0].x}`)
    console.log(`y-axis: ${var1[0].y}`)
    let layout = {
        height: 600,
        width: 800,
        xaxis: {
            range: [1995, 2023]
        },
        yaxis: {
            range: [0, 10]
        }
    };

    let data = [var1];

    Plotly.newPlot('map', data, layout);
}

// // selDataset is ID for dropdown menu in html
// d3.selectAll("#selDataset").on("change", getData);

// function getData(){

//     let dropDownMenu = d3.select("#selDataset");

//     let dataset = dropDownMenu.property("value");

//     let data = [];

//     if (dataset === 'australia'){
//         data = australia;
//     } else if (dataset === 'brazil'){
//         data = brazil;
//     } else if (dataset === 'uk'){
//         data = uk;
//     } else if (dataset === 'mexico'){
//         data = mexico;
//     } else if (dataset === 'singapore'){
//         data = singapore;
//     } else if (dataset === 'southAfrica'){
//         data = southAfrica;
//     }

//     Plotly.restyle("pie", "values", data); // works for [data] too
// }



// // // call default upon startup
// init();