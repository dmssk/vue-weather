const apiKey = 'pk.9d71e74cd4bca102120590fbb46936aa';

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