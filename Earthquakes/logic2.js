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
