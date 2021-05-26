
const app = Vue.createApp({
    data() {
        return {
            categorie: [
                {
                    title: 'Sports',
                    img: './assets/img/sports.jpg'
                },
                {
                    title: 'Health',
                    img: './assets/img/health.jpg'
                },
                {
                    title: 'Science',
                    img: './assets/img/science.jpg'
                },
                {
                    title: 'Technology',
                    img: './assets/img/tech.jpg'
                },
                {
                    title: 'Politics',
                    img: './assets/img/politics.jpg'
                },
                {
                    title: 'General',
                    img: './assets/img/general.jpg'
                },
                {
                    title: 'Business',
                    img: './assets/img/business.jpg'
                },
                {
                    title: 'Entertainment',
                    img: './assets/img/entertainment.jpg'
                }
            ]
        }
    }
})

app.mount('#cardcat')