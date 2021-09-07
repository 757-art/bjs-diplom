const exit = new LogoutButton();

exit.action = function(){
    ApiConnector.logout((response) => {
        if(response.success) {
            location.reload();  
        }
    });
}

ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const board = new RatesBoard();

stock = data => {
   ApiConnector.getStocks(response => {
    if (response.success) {
        board.clearTable(data);
        board.fillTable(response.data);
    }
   }); 
}
stock();
setInterval(stock(), 60000);

const money = new MoneyManager();

money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success,'Пополнение прошло успешно');
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}

money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success,'Конвертирование прошло успешно');
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}

money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success,'Отправка прошла успешно');
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}

const widgets = new FavoritesWidget();

widgets.favouritesTableBody = data => {
    ApiConnector.getFavourites(response => {
        console.log(response)
        if (response.success) {
            widgets.clearTable();
            widgets.fillTable(response.data);
            widgets.updateUsersList(response.data);
        }
    });
}

widgets.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            widgets.clearTable();
            widgets.fillTable(response.data);
       updateUsersList();
        } else { 
            widgets.setMessage(response.success, response.error);
        }
    });
}

widgets.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            widgets.clearTable();
            widgets.fillTable(response.data);
            updateUsersList();    
        }else { 
            widgets.setMessage(response.success, response.error);
        }
    });
}