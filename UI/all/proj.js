fetch('http://localhost:5000/api/v1/getAllEvents',{method: 'GET'})
.then((data) => (data.json())).then(
    (data) => {
        console.log(data.result);
        const result = data.result;
        var i=0;
        htmlString="";
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
        document.getElementById("cards").innerHTML = htmlString;
        console.log(htmlString);
        console.log(document.getElementById("cards"));
    }
);
