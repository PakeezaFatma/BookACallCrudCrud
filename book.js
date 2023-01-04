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
    axios.post("https://crudcrud.com/api/73d5fa9e86af4de3bcf0a9a9a4cf0d3b/appointmentData",obj)
    .then((response) => {
        console.log(response)
    })
    .catch((err) =>{
        console.log(err);
    })
    // localStorage.setItem(obj.email,JSON.stringify(obj))
    
    showNewUserOnScreen( obj )
    
    
    

}
window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStorageKeys = Object.keys(localStorageObj);

    for (let i =0; i<localStorageKeys.length; i++){
        const key = localStorageKeys[i];
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj)
    }
   });




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
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} - ${user.phone}
                                        <button onclick=deleteUser('${user.email}')> Delete User </button>
                                        <button onclick=editUserDetails('${user.email}','${user.name}','${user.phone}')>Edit User </button>
                                        
                                     </li>` 
                                     
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

//Edit User

function editUserDetails(emailId, name, phonenumber){
    document.getElementById('username').value = name;
    document.getElementById('email').value = emailId;
    document.getElementById('phoneNumber').value =phonenumber;

    deleteUser(emailId)
 }    

// deleteUser('abc@gmail.com')

function deleteUser(emailId){
    
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);

}


function removeUserFromScreen(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}