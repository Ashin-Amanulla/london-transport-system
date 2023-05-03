const axios = require('axios'); //axios is used to make HTTP requests in NodeJs with the API




const getAllData= async () =>{

    try {
        
  

 // Here we are requesting data related to tube, tram, elizabeth-line, dlr and overground seperately beacuse 
        // thats how their api is designed. After getting the data individually , we club hem and send it to front end as a single file for our convinience.
        // while sending we only took required data (not sending other details that we get from the api) 

        const data = [];  // we club all requested data in this array

        let url1 = 'https://api.tfl.gov.uk/Line/Mode/tube/Status'
        const response = await axios.get(url1);
        const tubeData = response.data;
        data.push(...tubeData) //pushing tube related data into data array

        let url2 = 'https://api.tfl.gov.uk/Line/Mode/dlr/Status'
        const response2 = await axios.get(url2);
        const dlrData = response2.data;
        data.push(...dlrData) //pushing dlr related data into data array


        let url3 = 'https://api.tfl.gov.uk/Line/Mode/elizabeth-line/Status'
        const response3 = await axios.get(url3);
        const elizaData = response3.data;
        data.push(...elizaData) //pushing elizabeth train related data into data array


        let url4 = 'https://api.tfl.gov.uk/Line/Mode/overground/Status'
        const response4 = await axios.get(url4);
        const overgroundData = response4.data;
        data.push(...overgroundData) //pushing overground rail related data into data array

        let url5 = 'https://api.tfl.gov.uk/Line/Mode/tram/Status'
        const response5 = await axios.get(url5);
        const tramData = response5.data;
        data.push(...tramData) //pushing tram related data into data array


        const lines = data.map(line => ({  // before sending data to front end we select the data we require, ignoring others.
            name: line.name,
            modeName: line.modeName,
            lineStatuses: line.lineStatuses,
            lineId: line.id

        }));

        return lines

    } catch (error) {
        console.log(error);
        throw new Error('Server error: ' + error.message)
    }

    }

    module.exports = getAllData;