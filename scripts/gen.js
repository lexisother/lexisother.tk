module.exports = getDesiredStats = (statsDataResponse) => {
    const statsData = [];
    // eslint-disable-next-line array-callback-return
    statsDataResponse.data.languages.map(({name, digital, text}) => {
        if (digital !== "0:00" && name !== "Other") {
            statsData.push({
                language: name,
                value: Number(digital.replace(":", ".")),
                label: text
            });
        }
    });

    return statsData;
};
