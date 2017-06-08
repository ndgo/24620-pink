function initMap() {
  var e = {
    lat: 59.9387942,
    lng: 30.3230833
  }
    , t = {
    lat: 59.939794,
    lng: 30.3230833
  }
    , n = {
    zoom: 15,
    center: t
  }
    , i = new google.maps.Map(document.getElementById("map"), n)
    , o = {
    url: "img/icon-map-marker.svg",
    size: new google.maps.Size(100, 100),
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20),
    optimized: !1,
    zIndex: 1
  }
    , a = new google.maps.Marker({
    position: e,
    map: i,
    icon: o,
    title: "HTML Academy"
  });
  google.maps.event.addDomListener(window, "resize", function () {
    var e = i.getCenter();
    google.maps.event.trigger(i, "resize"),
      i.setCenter(e)
  }),
    a.setMap(i)
}
