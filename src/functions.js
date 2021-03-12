export function isLoggedIn(){
    if (!localStorage.getItem("user")) {
        alert ("Please, do the log in in order to access to this page")
        window.location.href = '/access'
    }
}



