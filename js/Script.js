function load() {
    getPrice();
}

function calc() {
    var x = document.getElementById("numb").value;
    try {
        if(x == "")  throw "empty";
        if(isNaN(x)) throw "not a number";
        var result = x / rate;
        document.getElementById("result").innerHTML = result + " " + "Bitcoins";
    }
    catch(err) {
        document.getElementById("result").innerHTML = "Input is " + err;
    }
}

function reset() {
    document.getElementById("numb").value =  null;
}

var getRateRequest = new XMLHttpRequest();
var rate;

function getRate()
{
    getRateRequest.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json' , true);
    getRateRequest.onload = function () {

        var data = JSON.parse(this.response);
            var rateS = data.bpi.EUR.rate.replace(",", "");
            rate = parseFloat(rateS);
            calc()
    };
    getRateRequest.send();
}

var priceRequest = new XMLHttpRequest();
var dataList = [];
var dataString;
var dailyPrice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dailyDate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function getPrice()
{
    priceRequest.open('GET', 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=eur' , true);
    priceRequest.onload = function () {

        var data = JSON.parse(this.response);
        dataString = JSON.stringify(data.bpi);
            for (var i = 0; i < 31; i++) {
                    dataString = dataString.replace(":", " ",);
                    dataString = dataString.replace('"', "",);
                    dataString = dataString.replace('"', "",);
                    dataString = dataString.replace("{", "",);
                    dataString = dataString.replace("}", "",);
                    dataList = dataString.split(",")
                }
            for (var j = 0; j < 31; j++) {
                var temp = dataList[j].toString();
                dailyDate[j] = temp.slice(0, 10);
                dailyPrice[j] = temp.slice(11, 21);
            }
        window.myChart.update();
    };
    priceRequest.send();
}


