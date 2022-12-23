// import axios from 'axios';
// function fetchdata(e){
//     e.preventDefault();9
//     const res=axios.get("localhost:5000/api/v1/getAllEvents")
//     console.log(res.json()0);
// }
// fetchdata;
fetch('http://localhost:5000/api/v1/getAllEvents',{method: 'GET'})
.then((data) => (data.json())).then((data) => console.log(data));
// fetch('localhost:5000/api/v1/getAllEvents',{method: 'GET'})
//   .then((response) => response.json())
//   .then((data) => console.log(data));