var breweries = [
  {
    name: "Sun King Brewing",
    address: "135 N College Ave, Indianapolis, IN, 46202",
    lat: 39.7690233,
    lng: -86.1446207
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
    lng: -86.1458764
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
    lng: -86.1474455
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
    lng: -86.161837
  },
  {
    name: "Tow Yard Brewing Company",
    address: "501 Madison Ave, Indianapolis, IN, 46225",
    lat: 39.759948,
    lng: -86.156913
  },
  {
    name: "New Day Meadery",
    address: "1102 Prospect St, Indianapolis, IN, 46203",
    lat: 39.752579,
    lng: -86.139644 
  },
  {
    name: "Wabash Brewing",
    address: "5328 W 79th St, Indianapolis, IN, 46268",
    lat: 39.8963849,
    lng: -86.25316078 
  },
  {
    name: "Brugge Brasserie",
    address: "1011a E Westfield Blvd, Indianapolis, IN, 46220",
    lat: 39.8705353,
    lng: -86.1411883 
  },
  {
    name: "Books and Brews",
    address: "9402 Uptown Dr, Ste 1400, Indianapolis, IN, 46256",
    lat: 39.9242458,
    lng: -86.0362054
  },
  {
    name: "Thr3e Wise Men Brewing Company",
    address: "1021 Broad Ripple Ave, Indianapolis, IN, 46220",
    lat: 39.8694841,
    lng: -86.1407477
  },
  {
    name: "Chilly Water Brewing Company",
    address: "719 Virginia Ave, Ste 105, Indianapolis, IN, 46203",
    lat: 39.7571583,
    lng:  -86.1457019
  },
];

var Brewery = function(data) {
  var self = this;
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.latLng = new google.maps.LatLng(data.lat, data.lng);

  this.marker = ko.observable(new google.maps.Marker({
      position: this.latLng,
      map: map,
      title: this.name()
  }));

  google.maps.event.addListener(self.marker(), 'click', function() {
    map.setZoom(14);
    map.setCenter(self.marker().getPosition());
    console.log('clicked ' + self.name());
  });

  toggleMarker = function() {
    if (this.marker().map) {
      this.marker().setMap(null);
    } else {
      this.marker().setMap(map);
    }
  }
};

var map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 11,
    center: { 
      lat: 39.768403,
      lng: -86.158068
    }
});

var ViewModel = function() {
  var self = this;

  self.locations = ko.observableArray([]);

  breweries.forEach(function(breweryData) {
    self.locations.push( new Brewery(breweryData) )
  });
}

ko.applyBindings( new ViewModel() );
