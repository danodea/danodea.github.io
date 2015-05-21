var model = [
  {
    name: "Sun King Brewing",
    address: "135 N College Ave, Indianapolis, IN, 46202",
    lat: 39.7690233,
    lng: -86.14462069999999
  },
  {
    name: "Flat 12 Bierwerks",
    address: "414 Dorman St, Indianapolis, IN, 46202",
    lat: 39.772835,
    lng: -86.138683
  },
  {
    name: "Indiana City Brewing",
    address: "24 Shelby St, Indianapolis, IN, 46202",
    lat: 39.7658254,
    lng: -86.1408132
  },
  {
    name: "Bier Brewery",
    address: "5133 E 65th St, Indianapolis, IN, 46220",
    lat: 39.8756046,
    lng: -86.0828565
  },
  {
    name: "Triton Brewing Company",
    address: "5764 Wheeler Rd, Indianapolis, IN, 46216",
    lat: 39.860189,
    lng: -86.007047
  },
  {
    name: "Upland Brewing Company",
    address: "4842 N College Ave, Indianapolis, IN, 46205",
    lat: 39.8426549,
    lng: -86.14587639999999
  },
  {
    name: "Union Brewing Company",
    address: "622 North Rangeline Road, Carmel, IN, 46032",
    lat: 39.9836059,
    lng: -86.1271129
  },
  {
    name: "Fountain Square Brewery",
    address: "1301 Barth Ave, Indianapolis, IN, 46203",
    lat: 39.749593,
    lng: -86.140525
  },
  {
    name: "Outliers Brewing Company",
    address: "534 North St, Indianapolis, IN, 46204",
    lat: 39.775265,
    lng: -86.14744549999999
  },
  {
    name: "Black Acre Brewing",
    address: "5632 E Washington St, Indianapolis, IN, 46219",
    lat: 39.7709647,
    lng: -86.0709176
  },
  {
    name: "TwoDEEP Brewing Company",
    address: "714 N Capitol Ave, Indianapolis, IN, 46204",
    lat: 39.777248,
    lng: -86.16183699999999
  },
  {
    name: "Tow Yard Brewing Company",
    address: "501 Madison Ave, Indianapolis, IN, 46225",
    lat: 39.759948,
    lng: -86.156913
  }
];


function initGoogleMap() {
  var mapOptions = {
    center: { 
      lat: 39.768403,
      lng: -86.158068
    },
    zoom: 11
  };

  var map = new google.maps.Map(document.getElementById('google_map'), mapOptions);

};

google.maps.event.addDomListener(window, 'load', initGoogleMap);
