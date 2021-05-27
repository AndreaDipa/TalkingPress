$(document).ready(() => {
    let tit, desc;
    const sPageURL = window.location.search.substring(1);
    const cat = sPageURL.split('=')[1]; 

    $.ajax({
        url: '/api/users/me',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#hellouser').html(res.username);
        },
        error: function (p) {
            console.log('error ajax username');
        },
    });

    $.ajax({
        url: '/api/users/me',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#textstories').html(res.events);
        },
        error: function (p) {
            console.log('error ajax username');
        },
    });
})