let eqData;

// Load the data.
d3.csv("../earthquake_suicide_df.csv").then(function(data) {

    createCountries(data);
    init();

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

}

// provides default value to show users
function init() {

    console.log(eqData)
    let var1 = {
            x: eqData['Haiti']['year'].map(parseFloat),
            y: eqData['Haiti']['rate'].map(parseFloat),
            name: 'Suicides per Year (per 100k)'
        };
    let var2 = {
            x: eqData['Haiti']['year'].map(parseFloat),
            y: eqData['Haiti']['mag'].map(parseFloat),
            name: 'Earthquakes',
            mode: 'markers',
            type: 'scatter'
        }

    let layout = {
        title: {text: 'Haiti'},
        xaxis: {text: 'Year'},
        yaxis: {text:'Suicides per year (per 100k)'},
        height: 500,
        width: 800,
        xaxis: {
            range: [1995, 2023]
        },
        yaxis: {
            range: [0, 20]
        }
    };

    let data = [var1, var2];

    Plotly.newPlot('map', data, layout);

}

// selDataset is ID for dropdown menu in html
d3.selectAll("#selDataset").on("change", getData);

function getData(){

    let dropDownMenu = d3.select("#selDataset");

    let dataset = dropDownMenu.property("value");

    countryData = eqData[dataset]
    years = countryData['year'].map(parseFloat)
    rates = countryData['rate'].map(parseFloat)
    mags = countryData['mag'].map(parseFloat)

    let data = [
        {
            x: years,
            y: rates,
            name: 'Suicides per Year (per 100k)'
        },
        {
            x: years,
            y: mags,
            mode: 'markers',
            type: 'scatter',
            name: 'Earthquakes on Richter Scale'
        }
    ];

    let layout = {
        title: {text: dataset},
        xaxis: {text: 'Year'},
        yaxis: {text:'Suicides per year (per 100k)'},
        height: 500,
        width: 800,
        xaxis: {
            range: [1995, 2023]
        },
        yaxis: {
            range: [0, 20]
        }
    };

    Plotly.newPlot("map", data, layout);
}