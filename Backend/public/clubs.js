var clubId = new URL(window.location.href).pathname.split('/')[2];  
fetch('http://localhost:5000/api/v1/getClub/'+clubId,{method: 'GET'})
.then((data) => (data.json())).then((data) => {
    result=data.result[0];
    console.log(result);
    htmlString = "<div class=\"title\">\
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
            <a href=\""+result['Cwebsite']+"\">"+result['Cwebsite']+"</a>\
        </div>\
        </div>"
        document.getElementById("clubDetails").innerHTML=htmlString;
    }
)