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
                    const injuries = parseInt(cells[17]);
                    const mag = parseFloat(cells[13]);
                    const damage = parseFloat(cells[17]);
                    const deaths = parseInt(cells[15], 10); // Specify the base for parsing

                    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(injuries) && !isNaN(mag) && !isNaN(damage) && !isNaN(deaths)) {
                        earthquakes.push({
                            latitude,
                            longitude,
                            injuries,
                            mag,
                            damage,
                            deaths,
                            description: cells[9], // Use column 9 for descriptions
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
    
        for (let i = 0; i < Math.min(updatedEarthquakes.length, 5); i++) {
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
            
            // open a popup with Chart.js chart when clicked
            circle.on('click', function () {
                // popup with a Chart.js chart
                const popup = L.popup()
                    .setLatLng(circle.getLatLng())
                    .openOn(map);

                const popupContainer = document.createElement('div');

                createBulletGraph(popupContainer, 'Injuries', injuries);
                createBulletGraph(popupContainer, 'Mag', mag);
                createBulletGraph(popupContainer, 'Damage ($Mil)', damage);
                createBulletGraph(popupContainer, 'Deaths', deaths);

                const descriptionElement = document.createElement('p');
                descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;

                popupContainer.appendChild(descriptionElement);
                popup.setContent(popupContainer);
            });
        }
            
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