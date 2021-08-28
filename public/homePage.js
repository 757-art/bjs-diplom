const exit = new LogoutButton();

exit.action = function(){
    ApiConnector.logout((response) => {
        if(response.success === true) {
            location.reload();  
        }
    });
}