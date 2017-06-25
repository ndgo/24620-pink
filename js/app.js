function initMap() {
  var position = new google.maps.LatLng(59.93632276, 30.32106467);
  var mapParams = {
    zoom: 16,
    center: position,
    disableDefaultUI: !0,
    zoomControl: !0,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scrollwheel: !1
  };
  map = new google.maps.Map(document.getElementById("map"), mapParams);
  new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 13,
      fillOpacity: 100,
      fillColor: "#d22856",
      strokeWeight: 10,
      strokeColor: "white"
    }
  });
  google.maps.event.addDomListener(window, "resize", function () {
    map.setCenter(position)
  })
}
