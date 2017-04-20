/**
 * Created by timi on 2017/4/19.
 */
;(function(){

    var lat,lon,unit,apiUrl,celsius,fahrenheit,arr;

    $.getJSON('http://ipinfo.io', function(data){
        var location = data.loc;
        arr = location.split(',');
        lat = arr[0];
        lon = arr[1];
        unit = 'metric';

        apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
            lat + '&lon=' +
            lon + '&units=' +
            unit + '&appid=8ae95a0698ced7693a3427c0a9ac10cd';


        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (geoWeather) {
                var icon = 'http://i349.photobucket.com/albums/q389/lantarecode/WeatherAppIcons/' + geoWeather.weather[0].icon + '.png';

                celsius = geoWeather.main.temp;

                $('#icon').attr('src',icon);
                $('#city').html(geoWeather.name),
                    $('#country').html(geoWeather.sys.country),
                    $('#temperature').html(celsius),
                    $('#sky').html(geoWeather.weather[0].main)

                $('#unit').on('click', function() {
                    if ($('#unit').text() == 'C') {
                        fahrenheit = round(((celsius * 1.8) + 32), 1);
                        $('#temperature').html(fahrenheit);
                        $('#unit').html('F');
                    } else {
                        celsius = round(((fahrenheit - 32) * .5556), 1);
                        $('#temperature').html(celsius);
                        $('#unit').html('C');
                    }
                });
            }
        });
    });

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

}());