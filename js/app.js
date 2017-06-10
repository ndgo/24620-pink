function initMap() {
  var position = {
    lat: 59.9387942,
    lng: 30.3230833
  };
  var center = {
    lat: 59.939794,
    lng: 30.3230833
  };
  var centerParameters = {
    zoom: 15,
    center: center
  };
  var map = new google.maps.Map(document.getElementById("map"), centerParameters);
  var icon = {
    url: "img/icon-map-marker.svg",
    size: new google.maps.Size(100, 100),
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20),
    optimized: false,
    zIndex: 1
  };
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: "HTML Academy"
  });
  google.maps.event.addDomListener(window, "resize", function () {
    var e = map.getCenter();
    google.maps.event.trigger(map, "resize"),
      map.setCenter(e)
  });
  marker.setMap(map)
}
