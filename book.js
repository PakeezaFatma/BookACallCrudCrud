function saveToLocalStorage(event)
{
    
    event.preventDefault();//its stoping the unnecessary reloading page

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phoneNumber').value;
    const  date = document.getElementById('date').value;
    

    const obj ={
         name ,
        email ,
        phone ,
        date
    }
    axios.post("https://crudcrud.com/api/65470caa3630427f9c34f14d55ffdc3c/appointmentData",obj)
    .then((response) => {
        console.log(response)
    })
    .catch((err) =>{
        console.log(err);
    })
   
    
    // 

    

    
    // localStorage.setItem(obj.email,JSON.stringify(obj))
    
    showNewUserOnScreen( obj )
    
    
    

}
// window.addEventListener("DOMContentLoaded", () => {
//     const localStorageObj = localStorage;
//     const localStorageKeys = Object.keys(localStorageObj);

//     for (let i =0; i<localStorageKeys.length; i++){
//         const key = localStorageKeys[i];
//         const userDetailsString = localStorageObj[key];
//         const userDetailsObj = JSON.parse(userDetailsString);
//         showNewUserOnScreen(userDetailsObj)
//     }
//    });




function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phoneNumber').value ='';
    document.getElementById('date').value ='';
   
    if(localStorage.getItem(user.email) !== null)
    {
        removeUserFromScreen(user.email)
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} - ${user.phone}
                                        <button onclick=deleteUser('${user._id}')> Delete User </button>
                                        <button onclick=editUserDetails('${user.email}','${user.name}','${user.phone}','${user._id}')>Edit User </button>
                                        
                                     </li>` 
                                     
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/65470caa3630427f9c34f14d55ffdc3c/appointmentData")
    .then((response) =>{
        console.log(response);
        for(var i=0; i < response.data.length;i++)
        {
            showNewUserOnScreen(response.data[i]); 
        }
    })
    .catch((error) =>{
        console.log(error)
    })
      })


// window.addEventListener("DOMContentLoaded",async(event) =>{
//     try{
//         event.preventDefault();
        
//         let get = await axios.get("https://crudcrud.com/api/73d5fa9e86af4de3bcf0a9a9a4cf0d3b/appointmentData");
//         console.log(get);
//     }
//     catch{ (error) =>{
//         console.log(error);
//     }
// }
// } )

//Edit User

function editUserDetails(emailId, name, phonenumber,userId){
    document.getElementById('username').value = name;
    document.getElementById('email').value = emailId;
    document.getElementById('phoneNumber').value =phonenumber;
    axios.put(`https://crudcrud.com/api/65470caa3630427f9c34f14d55ffdc3c/appointmentData/${userId}`)
    .then((response)=>{
        removeUserFromScreen(userId)
    })
    .catch((err) =>{
        console.log(err)
    })
    deleteUser(userId)
 }    

// deleteUser('abc@gmail.com')

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/65470caa3630427f9c34f14d55ffdc3c/appointmentData/${userId}`)
    .then((response)=>{
        removeUserFromScreen(userId)
    })
    .catch((err) =>{
        console.log(err)
    })

    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}


function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}