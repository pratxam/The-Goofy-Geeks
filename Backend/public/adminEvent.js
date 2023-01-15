let head = document.getElementById("heading");
    let Utoken = localStorage.getItem("token")
    fetch("http://localhost:5000/api/v1/event/getAllEvent", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Utoken}`
        }
    }).then(async (response) => {
        const data = await response.json();
        let events = data.result2;
        head.innerText = data.clubName
        if(events.length === 0 ){
            let mainCard = document.querySelector('.card-container');

            let info = "<h2>No Events to display</h2>"
            mainCard.innerHTML = info

        }
        else{
            events.forEach(element => {
                let main = document.querySelector('.card-container');

                let card = document.createElement("div");
                card.classList = "card"
                
                // card.setAttribute("style","overflow: auto;")

                let info = `
                <div class="card-title">${element.Ename}</div>
                <div class="date">${element.Edate}</div>
                <p class="card-text" style="word-wrap: break-word; max-width:240px;">
                    ${element.Esummary}
                </p>
                <button onclick="del(${element.Eid})" type="button" class="btn btn-out btn-outline-warning">Delete</button>          
                
                `
                card.innerHTML += info
                main.appendChild(card)

            });

        }
    }).catch((error) => {
        alert(error.message)
    })

function del(id) {
    let Utoken = localStorage.getItem("token")
    fetch(`http://localhost:5000/api/v1/event/deleteEvent/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Utoken}`
        }
    }).then(async (response) => {
        if (!response.ok) {
            const error = data;
            return Promise.reject(error);
        }
        const data = await response.json();
        console.log(data);
        window.location.reload()
        
    }).catch((error) => {
        console.log(error)
        alert(error.message)
    })

}

const backHome = ()=>{
    window.location.replace("/")
}