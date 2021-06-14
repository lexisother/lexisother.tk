const axios = require("axios");
const genSVG = require("./genSVG.js");

const apiUrl = (key, duration = 30) =>
    `https://wakatime.com/api/v1/users/current/stats/last_${duration}_days?api_key=${key}`;

module.exports = initProcess = () => {
    const WAKATIME_API_KEY = process.env.INPUT_WAKATIME_API_KEY;
    const duration = 30;
    if (WAKATIME_API_KEY) {
        axios
            .get(apiUrl(WAKATIME_API_KEY, duration))
            .then((res) => {
                genSVG(res.data, duration);
            })
            .catch((err) => {
                return new Error(err);
            });
    } else {
        console.log("No WakaTime API key found.")
    }
};
