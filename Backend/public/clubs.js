var clubId = new URL(window.location.href).pathname.split('/')[2];  
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
fetch('http://localhost:5000/api/v1/getClub/'+clubId,{method: 'GET'})
.then((data) => (data.json())).then((data) => {
    result=data.result[0];
    console.log(result);
    htmlString = "<div class=\"title\" style=\"display: flex; flex-direction: column;\">\
        <img class=\"new-image\" src=\"https://nmamit.nitte.edu.in/img/dep/cs/club/finiteloop.jpg\" height=\"73px\" style=\"border-radius: 67px\"/>\
        <h1>"+result['Cname']+"</h1>\
        </div>\
        <div class=\"all\">\
        <div class=\"a1\">\
            <h3>PRESIDENT : </h3>\
            <p>"+result['Cpresident']+"</p>\
        </div>\
        <div class=\"a2\">\
            <h3>CLUB TYPE :</h3>\
            <p>"+result['Ctype']+"</p>\
        </div>\
        <div class=\"a3\">\
            <h3>SUMMARY : </h3>\
            <p>"+result['Csummary']+"</p>\
        </div>\
        <div class=\"a4\">\
            <h3>DESCRIPTION : </h3>\
            <p>"+result['Cdescription']+"</p>\
        </div>\
        <div class=\"a5\">\
            <h3>NUMBER OF MEMBERS : </h3>\
            <p>"+result['No_of_members']+"</p>\
        </div>\
        <div class=\"a6\">\
            <h3>WEBSITE : </h3>\
            <a href=\""+result['Cwebsite']+"\" style=\"color: yellow; text-decoration: none;\" class=\"underline\">"+result['Cwebsite']+"</a>\
        </div>\
        </div>"
        document.getElementById("clubDetails").innerHTML=htmlString;
    }
)
fetch('http://localhost:5000/api/v1/getEventsByCLubs/'+clubId,{method: 'GET'})
.then((data) => (data.json())).then((data) => (setCards(data)))