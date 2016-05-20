var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var ASIAN_COUNTRIES = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam"];

var instream = fs.ReadStream('../csv/Indicators.csv');
var outstream1 = fs.WriteStream('urban_population.json');
outstream1.readable = true;
outstream1.writable = true;
var outstream3 = fs.WriteStream('asian_rural_population.json');
outstream3.readable = true;
outstream3.writable = true;
var headers = [];
var count1 = 0, count3=0;
var countryIndex, indicatorCodeIndex,year,value;

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

rl.on('line', function(line) {
  if(count1==0) {
    headers=line.split(",");
    countryIndex = headers.indexOf("CountryName");
    year = headers.indexOf("Year");
    value = headers.indexOf("Value");
    indicatorCodeIndex = headers.indexOf("IndicatorCode");
    outstream1.write("[");
    outstream3.write("[");
    count1++;
      count3++;
  }
  else {
    var isInAsia = false;
    var currentline = line.replace('"Population,','"Population').replace('"Population ,','"Population').split(",");
    //India,IND,Urban population growth (annual %),SP.URB.GROW,1960,2.3379079247220598
    //China,CHN,"Population, total",SP.POP.TOTL,1960,667070000.0
    if(currentline[countryIndex]==="India" && (currentline[indicatorCodeIndex]==="SP.RUR.TOTL.ZS" || currentline[indicatorCodeIndex]==="SP.URB.TOTL.IN.ZS")) {
      currentline = [currentline[countryIndex],currentline[year],currentline[value],currentline[indicatorCodeIndex]];
      count1 = writeToFile(currentline,outstream1,count1);
    } else if(isInAsia = inAsia(currentline[countryIndex])) {
          if(currentline[indicatorCodeIndex]==="SP.RUR.TOTL" || currentline[indicatorCodeIndex]==="SP.URB.TOTL"){
          count3=writeToFile(currentline,outstream3,count3)
        }       
    }
  }
}).on('close', () => {
  console.log(count1+" "+count3);
  console.log(ASIAN_COUNTRIES.length);
  outstream1.write("]");
  outstream3.write("]");
});

function inAsia(currentCountry){
  for (var i = 0; i < ASIAN_COUNTRIES.length; i++) {
    if(currentCountry === ASIAN_COUNTRIES[i]){
      return true;
    }
  }
  return false;
}
function writeToFile(currentline,outstream,count) {
  var obj = {};
  for(var i=0;i<currentline.length;i++){
    obj[headers[i]] = currentline[i];
  }

  if(count==1) {
    outstream.write(JSON.stringify(obj));
  } else {
    outstream.write(","+JSON.stringify(obj));
  }

  count++;
  return count;
}
