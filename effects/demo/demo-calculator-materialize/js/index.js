/**
 * Created by timi on 2017/5/5.
 */
$(document).ready(function () {
    Materialize.toast("Hello World! This is a calculator using materialize", 2000 );
    var scr = $('.result'),
        res = 0,
        op = "",
        disp = true;
    $('main').on('click','button',function () {
        let input = $(this).text();
        let scrtxt = $('.result').text();

        switch (input){
            case "C":
                scr.text(0);
                disp = true;
                $("button:first").text("AC");
                Materialize.toast("Clear!", 2000 );
                break;
            case "AC":
                res = 0;
                op = "";
                disp = true;
                scr.text("0");
                Materialize.toast("Clear All!", 2000 );
                break;
            case "%":
                scr.text(parseFloat(scrtxt,10)/100 + "");
                disp = true;
                break;
            case "+/-":
                scr.text(-parseFloat(scrtxt,10) + "");
                break;

            case "+":
                updateResult(parseFloat(scrtxt),"+");
                break;
            case "-":
                updateResult(parseFloat(scrtxt), "-");
                break;
            case "*":
                updateResult(parseFloat(scrtxt), "*");
                break;
            case "\u00f7":
                updateResult(parseFloat(scrtxt), "/");
                break;
            case "=":
                updateResult(parseFloat(scrtxt), "=");
                Materialize.toast("the result is: "+ res, 2000 );
                break;

            default:
                if (scrtxt.length >= 15){
                    Materialize.toast("Sorry! I can't hold so many numbers.", 2000 );
                    break;
                }
                if (disp){
                    scr.text(input);
                    disp = false;
                }
                else {
                    scr.text(scrtxt + input);
                }
                $("button:first").text("C");

        }
    });

    function updateResult(num, opr) {
        disp = true;
        switch (op){
            case "+":
                res += num;
                break;
            case "-":
                res -= num;
                break;
            case "*":
                res *= num;
                break;
            case "/":
                res /= num;
                break;
            default:
                res = num === 0 ? res: num;
                break;
        }
        op = opr == "=" ? "" : opr;
        let scrtxt = res + "";
        scr.text((scrtxt.length>15)?scrtxt.substr(0,14):scrtxt);
    }

});


