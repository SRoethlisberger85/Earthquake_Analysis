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
            mode: 'markers',
            type: 'scatter'
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

    let data = var1;

    Plotly.newPlot('map', data, layout);
}

// selDataset is ID for dropdown menu in html
d3.selectAll("#selDataset").on("change", getData);

function getData(){

    let dropDownMenu = d3.select("#selDataset");

    let dataset = dropDownMenu.property("value");

    let data = [];

    if (dataset === 'Afghanistan'){
        data = [
            {
                x: eqData['Afghanistan']['year'].map(parseFloat),
                y: eqData['Afghanistan']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Albania'){
        data = [
            {
                x: eqData['Albania']['year'].map(parseFloat),
                y: eqData['Albania']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Algeria'){
        data = [
            {
                x: eqData['Algeria']['year'].map(parseFloat),
                y: eqData['Algeria']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Angola'){
        data = [
            {
                x: eqData['Angola']['year'].map(parseFloat),
                y: eqData['Angola']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Antigua and Barbuda'){
        data = [
            {
                x: eqData['Antigua and Barbuda']['year'].map(parseFloat),
                y: eqData['Antigua and Barbuda']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Argentina'){
        data = [
            {
                x: eqData['Argentina']['year'].map(parseFloat),
                y: eqData['Argentina']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Armenia'){
        data = [
            {
                x: eqData['Armenia']['year'].map(parseFloat),
                y: eqData['Armenia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Australia'){
        data = [
            {
                x: eqData['Australia']['year'].map(parseFloat),
                y: eqData['Australia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Austria'){
        data = [
            {
                x: eqData['Austria']['year'].map(parseFloat),
                y: eqData['Austria']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Azerbaijan'){
        data = [
            {
                x: eqData['Azerbaijan']['year'].map(parseFloat),
                y: eqData['Azerbaijan']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bahamas'){
        data = [
            {
                x: eqData['Bahamas']['year'].map(parseFloat),
                y: eqData['Bahamas']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bangladesh'){
        data = [
            {
                x: eqData['Bangladesh']['year'].map(parseFloat),
                y: eqData['Bangladesh']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Barbados'){
        data = [
            {
                x: eqData['Barbados']['year'].map(parseFloat),
                y: eqData['Barbados']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Belgium'){
        data = [
            {
                x: eqData['Belgium']['year'].map(parseFloat),
                y: eqData['Belgium']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Benin'){
        data = [
            {
                x: eqData['Benin']['year'].map(parseFloat),
                y: eqData['Benin']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bhutan'){
        data = [
            {
                x: eqData['Bhutan']['year'].map(parseFloat),
                y: eqData['Bhutan']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bolivia'){
        data = [
            {
                x: eqData['Bolivia (Plurinational State of)']['year'].map(parseFloat),
                y: eqData['Bolivia (Plurinational State of)']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bosnia and Herzegovina'){
        data = [
            {
                x: eqData['Bosnia and Herzegovina']['year'].map(parseFloat),
                y: eqData['Bosnia and Herzegovina']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Botswana'){
        data = [
            {
                x: eqData['Botswana']['year'].map(parseFloat),
                y: eqData['Botswana']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Brazil'){
        data = [
            {
                x: eqData['Brazil']['year'].map(parseFloat),
                y: eqData['Brazil']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Bulgaria'){
        data = [
            {
                x: eqData['Bulgaria']['year'].map(parseFloat),
                y: eqData['Bulgaria']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Cabo Verde'){
        data = [
            {
                x: eqData['Cabo Verde']['year'].map(parseFloat),
                y: eqData['Cabo Verde']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Cameroon'){
        data = [
            {
                x: eqData['Cameroon']['year'].map(parseFloat),
                y: eqData['Cameroon']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Canada'){
        data = [
            {
                x: eqData['Canada']['year'].map(parseFloat),
                y: eqData['Canada']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'CanCentral African Republicada'){
        data = [
            {
                x: eqData['Central African Republic']['year'].map(parseFloat),
                y: eqData['Central African Republic']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Chile'){
        data = [
            {
                x: eqData['Chile']['year'].map(parseFloat),
                y: eqData['Chile']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'China'){
        data = [
            {
                x: eqData['China']['year'].map(parseFloat),
                y: eqData['China']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Colombia'){
        data = [
            {
                x: eqData['Colombia']['year'].map(parseFloat),
                y: eqData['Colombia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Comoros'){
        data = [
            {
                x: eqData['Comoros']['year'].map(parseFloat),
                y: eqData['Comoros']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Congo'){
        data = [
            {
                x: eqData['Congo']['year'].map(parseFloat),
                y: eqData['Congo']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Costa Rica'){
        data = [
            {
                x: eqData['Costa Rica']['year'].map(parseFloat),
                y: eqData['Costa Rica']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Croatia'){
        data = [
            {
                x: eqData['Croatia']['year'].map(parseFloat),
                y: eqData['Croatia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Cuba'){
        data = [
            {
                x: eqData['Cuba']['year'].map(parseFloat),
                y: eqData['Cuba']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Cyprus'){
        data = [
            {
                x: eqData['Cyprus']['year'].map(parseFloat),
                y: eqData['Cyprus']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Czechia'){
        data = [
            {
                x: eqData['Czechia']['year'].map(parseFloat),
                y: eqData['Czechia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'North Korea'){
        data = [
            {
                x: eqData["Democratic People's Republic of Korea"]['year'].map(parseFloat),
                y: eqData["Democratic People's Republic of Korea"]['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Denmark'){
        data = [
            {
                x: eqData['Denmark']['year'].map(parseFloat),
                y: eqData['Denmark']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Djibouti'){
        data = [
            {
                x: eqData['Djibouti']['year'].map(parseFloat),
                y: eqData['Djibouti']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Dominican Republic'){
        data = [
            {
                x: eqData['Dominican Republic']['year'].map(parseFloat),
                y: eqData['Dominican Republic']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Ecuador'){
        data = [
            {
                x: eqData['Ecuador']['year'].map(parseFloat),
                y: eqData['Ecuador']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Egypt'){
        data = [
            {
                x: eqData['Egypt']['year'].map(parseFloat),
                y: eqData['Egypt']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'El Salvador'){
        data = [
            {
                x: eqData['El Salvador']['year'].map(parseFloat),
                y: eqData['El Salvador']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Equatorial Guinea'){
        data = [
            {
                x: eqData['Equatorial Guinea']['year'].map(parseFloat),
                y: eqData['Equatorial Guinea']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Eritrea'){
        data = [
            {
                x: eqData['Eritrea']['year'].map(parseFloat),
                y: eqData['Eritrea']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Eswatini'){
        data = [
            {
                x: eqData['Eswatini']['year'].map(parseFloat),
                y: eqData['Eswatini']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Ethiopia'){
        data = [
            {
                x: eqData['Ethiopia']['year'].map(parseFloat),
                y: eqData['Ethiopia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Fiji'){
        data = [
            {
                x: eqData['Fiji']['year'].map(parseFloat),
                y: eqData['Fiji']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'France'){
        data = [
            {
                x: eqData['France']['year'].map(parseFloat),
                y: eqData['France']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Gabon'){
        data = [
            {
                x: eqData['Gabon']['year'].map(parseFloat),
                y: eqData['Gabon']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Germany'){
        data = [
            {
                x: eqData['Germany']['year'].map(parseFloat),
                y: eqData['Germany']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Ghana'){
        data = [
            {
                x: eqData['Ghana']['year'].map(parseFloat),
                y: eqData['Ghana']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Greece'){
        data = [
            {
                x: eqData['Greece']['year'].map(parseFloat),
                y: eqData['Greece']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Grenada'){
        data = [
            {
                x: eqData['Grenada']['year'].map(parseFloat),
                y: eqData['Grenada']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Guatemala'){
        data = [
            {
                x: eqData['Guatemala']['year'].map(parseFloat),
                y: eqData['Guatemala']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Guinea'){
        data = [
            {
                x: eqData['Guinea']['year'].map(parseFloat),
                y: eqData['Guinea']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Guyana'){
        data = [
            {
                x: eqData['Guyana']['year'].map(parseFloat),
                y: eqData['Guyana']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Haiti'){
        data = [
            {
                x: eqData['Haiti']['year'].map(parseFloat),
                y: eqData['Haiti']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Honduras'){
        data = [
            {
                x: eqData['Honduras']['year'].map(parseFloat),
                y: eqData['Honduras']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Hungary'){
        data = [
            {
                x: eqData['Hungary']['year'].map(parseFloat),
                y: eqData['Hungary']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Iceland'){
        data = [
            {
                x: eqData['Iceland']['year'].map(parseFloat),
                y: eqData['Iceland']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'India'){
        data = [
            {
                x: eqData['India']['year'].map(parseFloat),
                y: eqData['India']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Indonesia'){
        data = [
            {
                x: eqData['Indonesia']['year'].map(parseFloat),
                y: eqData['Indonesia']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Iran'){
        data = [
            {
                x: eqData['Iran (Islamic Republic of)']['year'].map(parseFloat),
                y: eqData['Iran (Islamic Republic of)']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Iraq'){
        data = [
            {
                x: eqData['Iraq']['year'].map(parseFloat),
                y: eqData['Iraq']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Ireland'){
        data = [
            {
                x: eqData['Ireland']['year'].map(parseFloat),
                y: eqData['Ireland']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Israel'){
        data = [
            {
                x: eqData['Israel']['year'].map(parseFloat),
                y: eqData['Israel']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    } else if (dataset === 'Italy'){
        data = [
            {
                x: eqData['Italy']['year'].map(parseFloat),
                y: eqData['Italy']['rate'].map(parseFloat),
                mode: 'markers',
                type: 'scatter'
            }
        ];
    }

    Plotly.restyle("pie", "values", data); // works for [data] too
}
