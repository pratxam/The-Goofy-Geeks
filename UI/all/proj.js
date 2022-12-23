// UTILITY FUNCTION TO LOAD EVENT CARDS
function setCards(data) {
    console.log(data.result);
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
        while(i<result.length){
            console.log(typeof(result[i]));
            htmlString=htmlString+"<div class=\"card-container\">"
            for(var j=0; j<5&&i<result.length; j++,++i){
                const a = result[i];
                console.log(a);
                var ename=a['Ename'];
                console.log(ename);
                var edate=a['Edate'];
                var esumm=a['Esummary'];
                var cname=a['Cname'];
                htmlString=htmlString+"<div class=\"card\">\
                <div class=\"card-title\">"+ename+"</div>\
                <div class=\"club\">"+cname+"</div>\
                <div class=\"card-text\">"+esumm+"</div>\
                <button href=\"#\" onclick=\"toggle()\" type=\"button\" class=\"btn btn-outline-warning\">Know More</button>\
                </div>"
            }
            htmlString=htmlString+"</div><br>"
        }
    }
    document.getElementById("cards").innerHTML = htmlString;
    console.log(htmlString);
    console.log(document.getElementById("cards"));
}

// GET ALL EVENTS ON LOAD
fetch('http://localhost:5000/api/v1/getAllEvents',{method: 'GET'})
.then((data) => (data.json())).then((data) => (setCards(data)));

// SEARCH
document.getElementById("start-input-search").addEventListener("search", (e) => {
    fetch('http://localhost:5000/api/v1/search/'+e.target.value,{method: 'GET'})
    .then((data) => (data.json())).then((data) => (setCards(data)));
})

// FILTER modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

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