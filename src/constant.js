import axios from "axios";


export const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
  params: {
    bl_lat: '34.749434',
    bl_lng: '25.727065',
    tr_lat: '42.105284',
    tr_lng: '44.535659',
    limit: '300'
  },
  headers: {
    'X-RapidAPI-Key': '78d7909bd1msh9c59cb67b90942cp1c229djsna02622d49002',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }

};
export const options2 = {  headers: {
  'X-RapidAPI-Key': '78d7909bd1msh9c59cb67b90942cp1c229djsna02622d49002',
  'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
}}
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }
