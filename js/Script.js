var getRateRequest = new XMLHttpRequest();
var rate;

function getRate()
{
    getRateRequest.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json' , true);

    getRateRequest.onload = function () {

        var data = JSON.parse(this.response);
            // rate.push(data.bpi.EUR.rate);
            var rateS = data.bpi.EUR.rate.replace(",", "");
            rate = parseFloat(rateS);
            calc()
    };
    getRateRequest.send();
}
function calc() {
    var x = document.getElementById("numb").value;
    var result = x / rate;
    var resultText = result + "Bitcions";
    document.getElementById("result").innerHTML = resultText;
}

var PriceRequest = new XMLHttpRequest();
var PriceList=[];

function getPrice()
{
    PriceRequest.open('GET', 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=eur\n' , true);
    PriceRequest.onload = function () {

        var data = JSON.parse(this.response);
        // console.log("in function");
        for (var i = 0; i < data.bpi.length; i++) {
            //console.log(data.results[i].route);
            PriceList.push(data.bpi[i]);
            console.log("log: " + PriceList[i]);
            console.log("characters list Size: "+PriceList.length);
        }
        //populateBusRouteForm();
    };
    PriceRequest.send();
}

getPrice();