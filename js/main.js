

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

  // Nested if statements to avoid markers flickering on each keystroke
  this.toggleMarker = function(value) {
    if (value === map) {
      if (self.marker.map === null) {
        self.marker.setMap(map)
      }
    } else {
      self.marker.setMap(null)
    }
  }
};

var map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 12,
    center: { 
      lat: 39.845679452282155,
      lng: -86.16081458203126
    }
});

// Create one infowindow object that will be opened at various locations and have its contents changed
var infowindow = new google.maps.InfoWindow();


var ViewModel = function() {
  var self = this;

  this.searchString = ko.observable('');

  // This array will hold all of the brewery objects
  this.locations = ko.observableArray([]);
  breweries.forEach(function(breweryData) {
    self.locations.push( new Brewery(breweryData) )
  });

  // Add a click handler to each marker.  
  // Can maybe be combined into the locations array creator.
  this.locations().forEach(function(brewery) {
    google.maps.event.addListener(brewery.marker, 'click', function() {
      self.handleClick(brewery);
    });
  });

  // Determine which locations to display based on the user's search
  // This is an array, but NOT an _observable_ array
  this.filteredLocations = ko.computed(function() {
    var searchedBreweries = [];
    for (i = 0; i < self.locations().length; i++) {
        if (self.locations()[i].name().toLowerCase().indexOf(self.searchString().toLowerCase()) != -1) {
          searchedBreweries.push(self.locations()[i]);
          self.locations()[i].toggleMarker(map);
        } else {
          self.locations()[i].toggleMarker();
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





