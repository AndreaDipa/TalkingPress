
const app = Vue.createApp({
    data() {
        return {
            categorie: [
                {
                    title: 'Sports',
                    img: './assets/img/sports.jpg',
                    link: 'sports'
                },
                {
                    title: 'Health',
                    img: './assets/img/health.jpg',
                    link: 'health'
                },
                {
                    title: 'Science',
                    img: './assets/img/science.jpg',
                    link: 'science'
                },
                {
                    title: 'Technology',
                    img: './assets/img/tech.jpg',
                    link: 'tech'
                },
                {
                    title: 'Politics',
                    img: './assets/img/politics.jpg',
                    link: 'politics'
                },
                {
                    title: 'General',
                    img: './assets/img/general.jpg',
                    link: 'general'
                },
                {
                    title: 'Business',
                    img: './assets/img/business.jpg',
                    link: 'business'
                },
                {
                    title: 'Entertainment',
                    img: './assets/img/entertainment.jpg',
                    link: 'entertainment'
                },
                {
                    title: 'Food',
                    img: './assets/img/food.jpg',
                    link: 'food'
                },
                {
                    title: 'Travel',
                    img: './assets/img/travel.jpg',
                    link: 'travel'
                }
            ]
        }
    }
})

app.mount('#cardcat')


$(document).ready(() => {
    $.ajax({
        url: '/api/users/me',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#navbarDropdownMenuLink').html(res.username);
        },
        error: function (p) {
            console.log('error ajax username');
        },
    });
});