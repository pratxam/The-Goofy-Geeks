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
fetch('http://localhost:5000/api/v1/getAllEventsforuser',{method: 'GET'})
.then((data) => (data.json())).then((data) => (setCards(data)));