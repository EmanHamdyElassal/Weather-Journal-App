
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e36adcbdaba9200bd98e956086a53ed9';

document.getElementById('generate').addEventListener('click', performAction); 
function performAction(e) {
  const zipCode = document.getElementById('zip').value; 
  const content = document.getElementById('feelings').value; 
  getdatafromServer(baseUrl, zipCode, apiKey)
  .then(function(data){
    console.log(data);

    postData('/add', {date: newDate, temp: data.main.temp, content})
  })
  .then(()=> updateUI())
};

const postData = async ( url = '', data = {})=>{
  console.log('Async POST Request response successful');
  console.log(data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json', 
    },        
    body: JSON.stringify(data)
  });
    try {
      const newData = await res.json();
      console.log(newData);
      return newData;
    }
    catch(error) {
      console.log("error", error);
    }
}


// Get data from API
const getdatafromServer = async (baseUrl, zip, key)=>{ 
  const res = await fetch(baseUrl+zip+key); 
  console.log('Async GET Request response successful');
  console.log(res);
  try {
    // Transform into JSON
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
}



const updateUI = async ()=>{
  const res = await fetch('/all');
  console.log('Update UI Async GET Request response successful');
  console.log(res);
  try {
    const allData = await res.json();
    console.log(allData)
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData.temp}`;
    document.getElementById('content').innerHTML =  `I feel: ${allData.content}`;
    return allData;
  }
  catch(error) {
    console.log('error', error);
  }
}

