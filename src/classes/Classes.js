export const classesModule = (() => {

    const Day = class Day {
        /**
         * Representing a day
         * @param date - the date of the day.
         * @param weatherShortcut - the weather of the day (shortcut).
         * @param temperature - the temperature of the day (min - max).
         * @param windSpeed - the speed of the wind.
         */
        constructor(date, weatherShortcut, temperature, windSpeed) {
            this.date = getDate(date.toString());
            this.weather = getWeather(weatherShortcut) ;
            this.temperature = temperature;
            this.windSpeed = getWindSpeed(windSpeed)
        }
    }
    //------------------------------------
    const Location = class Location {
        /**
         * Representing a location.
         * @param name - The input name of the location.
         * @param latitude - the latitude of the location.
         * @param longitude - the longitude of the location.
         */
        constructor(name, latitude, longitude) {
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
            this.listDays = []
        }

        /**
         * Add a new day.
         * @param day - the day to add.
         */
        add_day(day) {
            this.listDays.push(day)
        }
    }

    /**
     * Convert a day to human reading and return it.
     * For example: turn 20220413 to Fri Apr 13 2022.
     * @param dateStr - the date as a string (like "20220413")
     * @returns {string} - the readable human format date.
     */
    function getDate(dateStr) {
        let y = dateStr.substr(0, 4),
            m = dateStr.substr(4, 2) - 1,
            d = dateStr.substr(6, 8);

        return new Date(y, m, d).toDateString()
    }

    function getWeather(weatherShortcut) {
        if (weatherDictionary.weather[weatherShortcut] !== undefined)
            return weatherDictionary.weather[weatherShortcut] + " (" + weatherShortcut + ")"
        return weatherShortcut
    }

    function getWindSpeed(windSpeed) {
        if (weatherDictionary.weather[windSpeed] !== undefined)
            return weatherDictionary.winSpeed[windSpeed]
        return windSpeed
    }

    return {
        Day: Day,
        Location: Location,
    }
})();


export const weatherDictionary = {

    weather: {
        clear: 'Total cloud cover less than 20%',
        pcloudy: 'Total cloud cover between 20% - 60%',
        mcloudy: 'Total cloud cover between 60% - 80%',
        cloudy: 'Total cloud cover over 80%',
        humid: 'Relative humidity over 90% with total cloud cover less than 60%',
        lightrain: 'Precipitation rate less than 4mm/hr with total cloud cover more than 80%',
        oshower: 'Precipitation rate less than 4mm/hr with total cloud cover between 60%-80%',
        ishower: 'Precipitation rate less than 4mm/hr with total cloud cover less than 60%',
        lightsnow: 'Precipitation rate less than 4mm/hr',
        rain: 'Precipitation rate over 4mm/hr',
        snow: 'Precipitation rate over 4mm/hr',
        rainsnow: 'Precipitation type to be ice pellets or freezing rain',
        ts: 'Lifted Index less than -5',
        tsrain: 'Lifted Index less than -5 with rain'
    },

    winSpeed: {
        1: 'No wind',
        2: '0.3-3.4m/s (light)',
        3: '3.4-8.0m/s (moderate)',
        4: '8.0-10.8m/s (fresh)',
        5: '10.8-17.2m/s (strong)',
        6: '17.2-24.5m/s (gale)',
        7: '24.5-32.6m/s (storm)',
        8: 'Over 32.6m/s (hurricane)'
    }
};