
const app = Vue.createApp({
    data() {
        return {
            tweets: null
        }
    },
    created() {
        var self = this;
        const sPageURL = window.location.search.substring(1);
        const cat = sPageURL.split('=')[1];
        $.ajax({
            url: `/twitter/tweets/${cat}`,
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                self.tweets= res;
            },
            error: function() { console.log('error ajax') },    
        });
    }
})

app.mount('#tweet-vue')