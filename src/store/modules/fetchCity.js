const apiKey = '911e2e8e5f29e41f5b9b1aed0aa2b816';

export default {
    actions: {
        async fetchCity({commit}, city = 'Zhytomyr') {
            const res = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
            );
            const forecast = await res.json();

            if(forecast.cod === '404') {
                commit('cityNotFound')
            } else {
                commit('updateForecasts', forecast)
            }
        }
    },
}