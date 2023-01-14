
const Ename = document.getElementById("name")
const Evenue = document.getElementById("venue")
const Ephoto = document.getElementById("photo")
const date = document.getElementById("date")
const link = document.getElementById("link")
const summary = document.getElementById("summary")
const description = document.getElementById("description")

const btn = document.getElementById("submit-btn")
const submitForm=()=>{
  if (Ename.value.length===0||date.value.length===0||link.value.length===0||summary.value.length===0||description.value.length===0|| Evenue.value.length===0 || Ephoto.value.length===0) {
    alert("Please provide all values")
  }
  else{
  let inputObj = {
    name: Ename.value,
    date: date.value,
    description: description.value,
    link: link.value,
    summary: summary.value,
    venue: Evenue.value,
    photo: Ephoto.value

  }
  let Utoken = localStorage.getItem("token") 

  fetch("http://localhost:5000/api/v1/event/createEvent",{
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Utoken}`
    },
    body: JSON.stringify(inputObj)
  }).then(async(response)=>{
    if(!response.ok){
    const error = data;
        return Promise.reject(error);
}
    const data = await response.json();
    console.log(data);
    window.location.replace("/adminEvent")
  }).catch((error)=>{
    console.log(error)
  })
}
}

