var Brewery = function(data) {
  var self = this;
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.latLng = ko.observable(new google.maps.LatLng(data.lat, data.lng));
  this.yelpID = ko.observable(data.yelpID);
  this.yelpRatingImg = ko.observable('');
  this.foursquareID = ko.observable(data.foursquareID);

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

  // Create one infowindow object that will be opened at various locations and have its contents changed
  this.infowindow = new google.maps.InfoWindow();
  self.infowindow.setContent("<div id='infowindow'><h2 id='iwName'></h2><div id='iwYelp'><img src='img/yelp-logo.png' alt='The Yelp Logo' /><p>Rating: </p><img id='yelpRating' src='img/loading.gif' /></div><div id='iwFoursquare'><img src ='img/foursquare-logo.png' alt='The Foursquare Logo' /><span id='foursquareRating'><img src='img/loading.gif' /></span></div></div>");

  this.handleClick = function(brewery) {
    map.setZoom(14);
    map.setCenter(brewery.latLng());
    brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ brewery.marker.setAnimation(null); }, 750);
    self.getYelpInfo(brewery);
    self.getFoursquareInfo(brewery);
    self.infowindow.open(map, brewery.marker);
    $('#iwName').text(brewery.name());
  }

  this.getYelpInfo = function(brewery) {
    $('#yelpRating').attr("src", 'img/loading.gif');
    var httpMethod = 'GET';
    var builtURL = 'http://api.yelp.com/v2/business/' + brewery.yelpID();
    var nonceMaker =  function() {
        return (Math.floor(Math.random() * 1e12).toString());
    };

    var parameters = 
        {
            oauth_consumer_key : '6FZQD1_YWvn2MNTmlYBVNQ',
            oauth_token : 'j8iHnHl6tE2kRly_vOnxXZHYQZfIsIXR',
            oauth_nonce : nonceMaker(),
            oauth_timestamp : Math.floor(Date.now()/1000),
            oauth_signature_method : 'HMAC-SHA1',
            oauth_version : '1.0',
            callback: 'callback'
        };

    var consumerSecret = 'Z81s01xE4T2x20quzxj25luAQYM';
    var tokenSecret = 'URYmHl-hsdjCSq3TtzGkO9Hu350';

    var encodedSignature = oauthSignature.generate(httpMethod, builtURL, parameters, consumerSecret, tokenSecret);
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: builtURL,
      data: parameters,
      cache: true,
      dataType: 'jsonp',
      success: function(results) {
        $('#yelpRating').attr("src", results.rating_img_url);
      }
    };
    $.ajax(settings);
  }

  this.getFoursquareInfo = function(brewery) {
    $('#foursquareRating').html('<img src="img/loading.gif" />');
    var d = new Date();
    var foursquareDate = d.getFullYear().toString() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);
    var foursquareClientID = 'YH1RZFX1LIWV00KWMBE4IAMQAMRRIWUY2VBW5ERBQ0O0BWUP';
    var foursquareClientSecret = 'OHZQMS0ZWF0WC0NY5TPTMZLKUSLT2PATBTLSLN2OPMXFIVLB';
    var builtURL = 'https://api.foursquare.com/v2/venues/' + brewery.foursquareID() + '?&client_id=' + foursquareClientID + '&client_secret=' + foursquareClientSecret + '&v=' + foursquareDate;

    var settings = {
      url: builtURL,
      success: function(results) {
        if (results.response.venue.rating) {
          $('#foursquareRating').html('<p>Rating: ' + results.response.venue.rating + ' out of 10 based on ' + results.response.venue.ratingSignals + ' ratings!</p>');
        } else {
          $('#foursquareRating').html('<p>Not enough ratings! Why don\'t you go there, have some beers, and rate it?!</p>')
        };
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('textStatus: ' + textStatus);
        console.log('error: ' + errorThrown);
      }
    };

    $.ajax(settings);

  }
}

ko.applyBindings( new ViewModel() );





