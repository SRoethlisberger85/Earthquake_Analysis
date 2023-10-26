function MortalityScript() {
    document.addEventListener("DOMContentLoaded", function () {
        // Function to create the Leaflet map
    const map = L.map('map').setView([0, 0], 2); // Center the map and set zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let earthquakes = []; // Array to store earthquake data
    // Function to read and parse the CSV file
    function readCSV(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n');
                const table = document.getElementById('csvTable');

                for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header
                    const cells = rows[i].split(',');
                    const latitude = parseFloat(cells[10]);
                    const longitude = parseFloat(cells[11]);
                    const injuries = parseInt(cells[15]);
                    const mag = parseFloat(cells[13]);
                    const damage = parseFloat(cells[17]);
                    const deaths = parseInt(cells[15], 10);
                    const description = cells[9]; // Specify the base for parsing

                    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(injuries) && !isNaN(mag) && !isNaN(damage) && !isNaN(deaths)) {
                        earthquakes.push({
                            latitude,
                            longitude,
                            injuries,
                            mag,
                            damage,
                            deaths,
                            description, // Use column 9 for descriptions
                        });
                    }
                }

                createDropdownMenu();
                createCircleMarkers('Deaths', 'Injuries', 'Mag', 'Damage ($Mil)');
            });
        }

    function createDropdownMenu() {
        const select = document.createElement('select');
        select.id = 'dataSelector';

        const options = [
            { value: 'Deaths', text: 'Top 5 Earthquake Deaths'},
            { value: 'Injuries', text: 'Top 5 Earthquake Injuries'},
            { value: 'Mag', text: 'Top 5 Magnitude Earthquakes'},
            { value: 'Damage ($Mil)', text: 'Top 5 Damage Earthquakes'},
        ];
        
        options.forEach(option => {
            const element = document.createElement('option');
            element.value = option.value;
            element.textContent = option.text;
            select.appendChild(element);
        });

        select.addEventListener('change', function (event) {
            const selectedOption = event.target.value;
            createCircleMarkers(selectedOption);
        });

        document.body.appendChild(select);

    }
    
    
    function createCircleMarkers(selectedOption) {
        const updatedEarthquakes = [...earthquakes];

        switch (selectedOption) {
            case 'Deaths':
                updatedEarthquakes.sort((a, b) => b.deaths - a.deaths);
                break;
            case 'Injuries':
                updatedEarthquakes.sort((a, b) => b.injuries - a.injuries);
                break;
            case 'Mag':
                updatedEarthquakes.sort((a, b) => b.mag - a.mag);
                break;
            case 'Damage ($Mil)':
                updatedEarthquakes.sort((a, b) => b.damage - a.damage);
                break;
        }
        map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
                map.removeLayer(layer);
            }
        });
    
        for (let i = 0; i < Math.min(updatedEarthquakes.length, 10); i++) {
            const earthquake = updatedEarthquakes[i];
            const { latitude, longitude, description, injuries, mag, damage, deaths} = earthquake;
            let radius = Math.sqrt(deaths, injuries, mag, damage) * 0.25;
            
            if (selectedOption === 'Mag') {
                radius *= 10
            }
            if (i < 5) {
                radius *= 0.25;
            }
            
            const circle = L.circleMarker([latitude, longitude], {
                radius: radius,
                fill: true,
                color: 'red',
                fillOpacity: 0.6,
            }).addTo(map);

            circle.bindPopup(createPopupContent(earthquake));
        }
    }
            
            // open a popup with Chart.js chart when clicked
    function createPopupContent(earthquake) {
        const { description, injuries, mag, damage, deaths } = earthquake;
        const popupContent = document.createElement('div');
            
        const popupContainer = document.createElement('div');
            
        createBulletGraph(popupContainer, 'Injuries', injuries);
        createBulletGraph(popupContainer, 'Mag', mag);
        createBulletGraph(popupContainer, 'Damage ($Mil)', damage);
        createBulletGraph(popupContainer, 'Deaths', deaths);
            
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
        popupContainer.appendChild(descriptionElement);
            
        popupContent.appendChild(popupContainer);
            
        return popupContent;
    }

    function createBulletGraph(container, label, value) {
        const bulletContainer = document.createElement('div');
        bulletContainer.classList.add('bullet-container');

        Highcharts.chart(bulletContainer, {
            chart: {
                type: 'bullet',
                inverted: true,
                width: 400,
                height: 175,
            },
            title: {
                text: label,
            },
            yAxis: {
                gridLineWidth: 0,
            },
            plotOptions: {
                bullet: {
                    targetOptions: {
                        width: '10%'
                    },
                },
            },
            series: [{
                data: [{
                    y: value,
                    target: 1000,
                }],
            }],
        });

        container.appendChild(bulletContainer);
    }



    readCSV('combined_NGDC_earthquakes.csv');
});

}

function SuicideScript() {
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
            type: 'scatter',
            yaxis: 'y2'
        }

    let layout = {
        title: {text: 'Haiti'},
        xaxis: {
            text: 'Year',
            range: [1995, 2023]},
        yaxis: {text:'Suicides per year (per 100k)'},
        yaxis2: {
            title: 'Earthquake Magnitude',
            overlaying: 'y',
            side: 'right'
        },
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
            name: 'Earthquake Magnitude',
            mode: 'markers',
            type: 'scatter',
            yaxis: 'y2'
        }
    ];

    let layout = {
        title: {text: `Suicides and Earthquakes in ${dataset} by Year`},
        xaxis: {
            title: 'Year', 
            range: [1995, 2023]},
        yaxis: {title:'Suicides per year (per 100k)'},
        yaxis2: {
            title: 'Earthquake Magnitude',
            overlaying: 'y',
            side: 'right'
        },
        height: 800,
        width: 1500,
    };

    Plotly.newPlot("map", data, layout);
}
}


function GDPScript() {
    function parseCSVData(d) {
        return {
            date: d3.timeParse("%Y")(d.TIME),
            gdp: +d.Value,
            country: d.LOCATION,
            measure: d.MEASURE
        };
    }
    
    function parseEarthquakeData(d) {
        return {
            date: new Date(+d.Year, d.Month - 1, d.Day, d.Hour, d.Minute, d.Second),
            lat: +d.Latitude,
            long: +d.Longitude,
            magnitude: +d.Mag
        };
    }
    
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);
    
    d3.csv("combined_NGDC_earthquakes.csv", parseEarthquakeData).then(function(earthquakeData) {
        const significantEarthquakes = earthquakeData.filter(d => d.magnitude >= 6.4);
        significantEarthquakes.forEach(point => {
            L.circleMarker([point.lat, point.long], {
                radius: 2,
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).bindPopup(`Magnitude: ${point.magnitude}<br>Location: ${point.lat}, ${point.long}`)
              .addTo(map);
        });
    });
    
    function getUniqueCountries(data) {
        const countries = new Set();
        data.forEach(d => countries.add(d.country));
        return Array.from(countries).sort();
    }
    
    function createDropdown(countries) {
        const select = document.createElement('select');
        select.id = 'countrySelector';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            select.appendChild(option);
        });
        document.getElementById('dropdownContainer').appendChild(select);
        select.addEventListener('change', function() {
            updateChart(this.value);
        });
    }
    
    function createChartForCountry(data, countryCode) {
        const filteredGdpData = data.filter(row => row.country === countryCode && row.measure === 'USD_CAP');
        const svg = d3.select("#chartContainer").append("svg")
            .attr("width", 960)
            .attr("height", 500);
        const margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const x = d3.scaleTime().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([height, 0]);
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.gdp));
        x.domain(d3.extent(filteredGdpData, d => d.date));
        y.domain(d3.extent(filteredGdpData, d => d.gdp));
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        g.append("g")
            .call(d3.axisLeft(y));
        g.append("path")
            .datum(filteredGdpData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }
    
    function updateChart(countryCode) {
        d3.csv("worldgdpdata.csv", parseCSVData).then(function(data) {
            d3.select("#chartContainer").selectAll("svg").remove();
            createChartForCountry(data, countryCode);
        });
    }
    
    d3.csv("worldgdpdata.csv", parseCSVData).then(function(data) {
        const countries = getUniqueCountries(data);
        createDropdown(countries);
        updateChart(countries[0]);
    });


}

function executeScript(scriptName) {
    switch (scriptName) {
    case 'logic':
        MortalityScript();
        break;
    case 'logic1':
        SuicideScript();
        break;
    case 'logic2':
        GDPScript();
        break;
    default:
        console.error('Script not found');
    }
}

document.getElementById('scriptSelector').addEventListener('change', function () {
    const selectedScript = this.value;
    executeScript(selectedScript);

});