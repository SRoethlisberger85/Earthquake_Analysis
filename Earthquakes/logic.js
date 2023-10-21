// document.addEventListener("DOMContentLoaded", function () {
//     // Function to create the Leaflet map
//     const map = L.map('map').setView([0, 0], 2); // Center the map and set zoom level

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     // Function to read and parse the CSV file
//     function readCSV(file) {
//         fetch(file)
//             .then(response => response.text())
//             .then(data => {
//                 const rows = data.trim().split('\n');
//                 const table = document.getElementById('csvTable');

//                 for (let i = 1; i < rows.length; i++) {
//                     const cells = rows[i].split(',');
//                     const latitude = parseFloat(cells[10]);
//                     const longitude = parseFloat(cells[11]);
//                     const deaths = parseInt(cells[14], 10); // Assuming deaths are in the 14th column

//                     if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(deaths)) {
//                         // Calculate the radius of the CircleMarker based on the number of deaths
//                         const radius = Math.sqrt(deaths) * 3; // Adjust the scaling factor as needed

//                         L.circleMarker([latitude, longitude], {
//                             radius: radius,
//                             fill: true,
//                             color: 'red',
//                             fillOpacity: 0.6,
//                         }).addTo(map);
//                     }
//                 }

//                 // Create the table rows and cells
//                 for (let i = 0; i < rows.length; i++) {
//                     let cells = rows[i].split(',');
//                     let row = table.insertRow(i);
//                     cells.forEach(cellText => {
//                         let cell = i === 0 ? document.createElement('th') : document.createElement('td');
//                         cell.textContent = cellText;
//                         row.appendChild(cell);
//                     });
//                 }
//             });
//     }

//     // Call the readCSV function with your CSV file's path
//     readCSV('combined_NGDC_earthquakes.csv');
// });

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

                for (let i = 1; i < rows.length; i++) {
                    const cells = rows[i].split(',');
                    const latitude = parseFloat(cells[10]);
                    const longitude = parseFloat(cells[11]);
                    const deaths = parseInt(cells[15], `0`); // Assuming deaths are in the 14th column

                    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(deaths)) {
                        earthquakes.push({
                            latitude,
                            longitude,
                            deaths,
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

                        if (i > 0 && index === 15) {
                            // Highlight the top 5 earthquakes by changing the color
                            if (earthquakes.findIndex(earthquake => earthquake.deaths === parseInt(cellText)) < 5) {
                                cell.style.backgroundColor = 'green'; // Change the color to red (you can choose any color)
                            }
                        }
                    });
                }

                // Create CircleMarkers for all earthquakes
                for (let i = 0; i < earthquakes.length; i++) {
                    const earthquake = earthquakes[i];
                    const { latitude, longitude, deaths } = earthquake;
                    const radius = Math.sqrt(deaths) * .05; // Adjust the scaling factor as needed

                    L.circleMarker([latitude, longitude], {
                        radius: radius,
                        fill: true,
                        color: 'red',
                        fillOpacity: 0.6,
                    }).addTo(map);
                }
            });
    }

    // Call the readCSV function with your CSV file's path
    readCSV('combined_NGDC_earthquakes.csv');
});