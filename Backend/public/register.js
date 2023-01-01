var eventId = new URL(window.location.href).pathname.split('/')[2];  
console.log(eventId);
fetch('http://localhost:5000/api/v1/register/'+eventId,{method: 'GET'})
.then((data) => (data.json())).then((data) => {
        result=data.result[0];
        console.log(result);
        htmlString="<h1>"+result['Ename']+"</h1>\
        <p style=\"font-weight:800\">Date: </p> "+result['Edate'].split('T')[0]+"<br>\
        <p style=\"font-weight:800\">Description: </p> <br>"+result['Edescription']+"<br>\
       <p style=\"font-weight:800\">Registration Link:</p>\
        <a href="+result['Rlink']+">"+result['Rlink']+"</a>\
        <br><br><label style=\"font-weight:100\"><input type=\"checkbox\" name=\"css\" value=\"css\"> Check this box to track your registration for this event. You can view all your event registrations in the Registrations tab in the home page. </label>"
        document.getElementById("eventInfo").innerHTML=htmlString
        htmlString1="<img src="+result['Ephoto']+" style=\"width:450px; height:450px;\">"
        document.getElementById("image").innerHTML=htmlString1;
    }
)