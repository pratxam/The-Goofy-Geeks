const Uemail = document.getElementById("email")
const Upassword = document.getElementById("password")
    
const submitForm=
    ()=>{
        if (Uemail.value.length===0||Upassword.value.length===0) {
        alert("Please provide all values")
        }
        else{
        let inputObj = {
        password: Upassword.value,
        email: Uemail.value,
        
        }

        fetch("http://localhost:5000/api/v1/auth/signUp",{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputObj)
        }).then((response) =>{
            if(!response.ok){
                alert(data['msg']);
                const error = response.data;
                    return Promise.reject(error);
            }
            else{
                // console.log(response);
                window.location.replace("/login");                
            }            
        }).catch((error)=>{console.log(error)})
    }
}
