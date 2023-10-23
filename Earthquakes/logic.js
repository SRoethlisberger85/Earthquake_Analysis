document.addEventListener("DOMContentLoaded", function () {
    // Function to create the Leaflet map
    const map = L.map('map').setView([0, 0], 2); // Center the map and set zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Function to read and parse the CSV file
    function readCSV(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n');
                const table = document.getElementById('csvTable');

                const earthquakes = []; // Array to store earthquake data

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

                // Sort the earthquakes by deaths in descending order
                earthquakes.sort((a, b) => b.deaths - a.deaths);

                // Create the table rows and cells
                for (let i = 0; i < rows.length; i++) {
                    let cells = rows[i].split(',');
                    let row = table.insertRow(i);
                    cells.forEach((cellText, index) => {
                        let cell = i === 0 ? document.createElement('th') : document.createElement('td');
                        cell.textContent = cellText;
                        row.appendChild(cell);

                        if (i > 0 && index === 5) {
                            // Highlight the top 5
                            if (i <= 5) {
                                cell.style.backgroundColor = 'red';
                            }
                        }
                    });
                }

                // Create CircleMarkers with descriptions
                for (let i = 0; i < earthquakes.length; i++) {
                    const earthquake = earthquakes[i];
                    const { latitude, longitude, description, injuries, mag, damage, deaths } = earthquake;
                    let radius = Math.sqrt(deaths) * 0.25;

                    if (i < 5) {
                        radius *= .25;
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
            });
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