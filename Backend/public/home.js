// UTILITY FUNCTION TO LOAD EVENT CARDS
function setCards(data) {
    const result = data.result;
    var i=0;
    htmlString="";
    if(result.length == 0) {
        htmlString = "<div class='card-body text-center'>" +
            "<div class='card-title'>" +
            "<h5 class='card-title-text'>No events found</h5>" +
            "</div>" +
            "</div>";
    }
    else {
        htmlString=htmlString+"<div class=\"card-container\">"
        while(i<result.length){            
            for(var j=0; j<5&&i<result.length; j++,++i){
                const a = result[i];
                var ename=a['Ename'];
                var edate=a['Edate'].split('T')[0];
                var esumm=a['Esummary'];
                var cname=a['Cname'];
                htmlString=htmlString+"<div class=\"card\">\
                <div class=\"card-title\">"+ename+"</div>\
                <a href=\"http://localhost:5000/clubs/"+a['C_id']+"\" type=\"button\" class=\"btn\">"+cname+"</a>\
                <div class=\"card-text\">"+esumm+"</div>\
                <div class=\"card-text\"> Date: "+edate+"</div>\
                <a href=\"http://localhost:5000/register/"+a['Eid']+"\" type=\"button\" class=\"btn btn-outline-warning\">Know More</a>\
                </div>"
            }
        }
        htmlString=htmlString+"</div>"
    }
    document.getElementById("cards").innerHTML = htmlString;
}
function setCheckbox(data) {
    console.log(data);
    const result = data.result;
    var htmlString="";
    for(var i=0; i<result.length; i++) {
        const a = result[i];
        var cname=a['Cname'];
        var cid=a['Cid'];
        var checked = a['selected'] ? "checked" : "";
        htmlString+="<input type=\"checkbox\" name=\"choice\" id=\"cb" + i + "\" value=\""+cid+"\"" + checked + "/><label for=\"cb" + i + "\">"+cname+"</label>"
    }
    document.getElementById("allcheckbox").innerHTML = htmlString;
}
// GET ALL EVENTS ON LOAD
fetch('http://localhost:5000/api/v1/getAllEvents',{method: 'GET'})
.then((data) => (data.json())).then((data) => (setCards(data)));

// SEARCH
document.getElementById("start-input-search").addEventListener("search", (e) => {
    fetch('http://localhost:5000/api/v1/search/'+e.target.value,{method: 'GET'})
    .then((data) => (data.json())).then((data) => (setCards(data)));
})

//SORT
document.getElementById("sort").addEventListener("change",(e) => {
    console.log(e.target.value);
fetch('http://localhost:5000/api/v1/getAllEvents/'+e.target.value,{method: 'GET'})
.then((data) => (data.json())).then((data) => (setCards(data)))});

//FILTER
document.getElementById("myBtn").addEventListener("click",(e) => {
    modal.style.display = "block";
    fetch('http://localhost:5000/api/v1/getAllClubs/',{method: 'GET'})
    .then((data) => (data.json())).then((data) => {
        var checkedBoxes = JSON.parse(sessionStorage.getItem("checkedBoxes"));
        const result = data.result;
        for(var i=0; i<result.length; i++) {
            if(checkedBoxes != null && checkedBoxes.includes(result[i]['Cid'].toString())) {
                result[i].selected=true;
            }
            else {
                result[i].selected=false;
            }
        }
        setCheckbox(data)
    })    
});

// FILTER modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('filterSubmit').onclick = function() {
    var filterString=""
    var markedCheckbox = document.getElementsByName('choice');
    var checkedBoxes = []
    for (var checkbox of markedCheckbox) {
      if (checkbox.checked) {
        filterString+=checkbox.value +",";
        checkedBoxes.push(checkbox.value)
      }
    }
    sessionStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxes));
    console.log(filterString);
    fetch('http://localhost:5000/api/v1/getEventsByClubs/'+filterString.slice(0,-1),{method: 'GET'})
    .then((data) => (data.json())).then((data) => (setCards(data)))
    modal.style.display = "none";
  }
