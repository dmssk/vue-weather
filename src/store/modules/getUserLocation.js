const apiKey = process.env.VUE_APP_LOCATION_API;

export default {
    actions: {
        async getUserLocation({commit}, payload) {
            const res = await fetch(
                `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${payload.lat}&lon=${payload.lon}&format=json`
            );
            const coords = await res.json();
            commit('addUserLocation', coords);
        },
    }
}