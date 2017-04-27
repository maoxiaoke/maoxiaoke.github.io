/**
 * Created by timi on 2017/4/27.
 */
var app = angular.module('WikiApp',['ngAnimate']);

app.controller('MainCtrl', function ($scope,$http,$timeout) {
    var form = $('form'),
        close = $('.eks'),
        input = $('input'),
        search = $('#search'),
        help = $('#help');

    close.on ('click',function () {
        form.toggleClass('open');
        help.toggleClass('hide');
    })
});