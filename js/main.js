

var Brewery = function(data) {
  var self = this;
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.latLng = ko.observable(new google.maps.LatLng(data.lat, data.lng));

  this.marker = new google.maps.Marker({
      position: this.latLng(),
      map: null,
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

  this.searchString = ko.observable('');
  this.locations = ko.observableArray([]);

  breweries.forEach(function(breweryData) {
    self.locations.push( new Brewery(breweryData) )
  });

  this.locations().forEach(function(brewery) {
    google.maps.event.addListener(brewery.marker, 'click', function() {
      self.handleClick(brewery);
    });
  });

  this.filteredLocations = ko.computed(function() {
    var searchedBreweries = [];
    for (i = 0; i < self.locations().length; i++) {
        if (self.locations()[i].name().toLowerCase().indexOf(self.searchString().toLowerCase()) != -1) {
          searchedBreweries.push(self.locations()[i]);
          self.locations()[i].marker.setMap(map);
        } else {
          self.locations()[i].marker.setMap(null);
        }
    }
    return searchedBreweries.sort(function (l, r) { return l.name() > r.name() ? 1 : -1 });
  })

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





