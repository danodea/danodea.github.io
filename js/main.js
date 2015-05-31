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

  this.centerMapOnMarker = function() {
    map.setZoom(14);
    map.setCenter(self.marker().getPosition());
    console.log('clicked ' + self.name())
  };

  google.maps.event.addListener(self.marker(), 'click', function() {
    self.centerMapOnMarker();
  });
  
};

var map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 12,
    center: { 
      lat: 39.845679452282155,
      lng: -86.16081458203126
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
