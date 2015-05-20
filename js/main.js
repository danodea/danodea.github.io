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
