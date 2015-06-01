var Brewery = function(data) {
  var self = this;
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.latLng = ko.observable(new google.maps.LatLng(data.lat, data.lng));
  this.visible = ko.observable(true);

  this.marker = new google.maps.Marker({
      position: this.latLng(),
      map: map,
      title: this.name()
  });
};

var map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 12,
    center: { 
      lat: 39.845679452282155,
      lng: -86.16081458203126
    }
});

var infowindow = new google.maps.InfoWindow();

var ViewModel = function() {
  var self = this;

  self.locations = ko.observableArray([]);

  breweries.forEach(function(breweryData) {
    self.locations.push( new Brewery(breweryData) )
  });

  self.locations().forEach(function(brewery) {
    google.maps.event.addListener(brewery.marker, 'click', function() {
      self.handleClick(brewery);
    });
  });
  
  this.handleClick = function(brewery) {
    map.setZoom(14);
    map.setCenter(brewery.latLng());
    console.log('clicked ' + brewery.name());
    brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ brewery.marker.setAnimation(null); }, 750);
    infowindow.open(map, brewery.marker);
    infowindow.setContent(brewery.name());
  }
}

ko.applyBindings( new ViewModel() );
