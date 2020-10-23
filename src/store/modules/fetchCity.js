const apiKey = process.env.VUE_APP_WEATHER_API;

export default {
    actions: {
        async fetchCity({commit}, city = 'Zhytomyr') {
            const res = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
            );
            const forecast = await res.json();

            if(forecast.cod === '404') {
                commit('cityNotFound');
            } else {
                commit('updateForecasts', forecast);
            }
        }
    },
}