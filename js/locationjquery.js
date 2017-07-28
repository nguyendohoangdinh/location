function initAutocomplete() {
  var locations = [
      ['344 2/9 VNPT', 16.0419474, 108.2205205, 4],
      ['Hue', 16.4510667, 107.5111445, 3],
      ['Quang Tri', 16.7337667, 106.3919151, 2],
      ['Quang Ngai', 15.1544339, 108.771635, 1],
    ];
    var name, address;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: new google.maps.LatLng(17.0419474, 108.2205205),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var autocomplete = new google.maps.places.Autocomplete(input);
        console.log(autocomplete);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          // console.log(place);
          name = place.name;
          console.log(name);
          address = place.formatted_address;
          console.log(address);
          var box1="",box2="",box="";

          $("div.main-box").append("<div class='table-list row'>"+'<div class="col-sm-9 name">'+ '<span>'+name+'</span>'+'</div>'+'<div class="col-sm-10 address">'+'<span>'+address+'</span>'+'</div>'+'<div class="col-sm-5 see">'+'<span>See Location</span><span>01</span>'+'</div>'+'</div>' );
          if (!place.geometry) {
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
          marker.setPlace({
           placeId: place.place_id,
            location: place.geometry.location
          });
        
      });

}

$(document).ready(function(){
  $('#myModal').on('shown.bs.modal', function (e) {
      $('.modal-backdrop').css('z-index','1');
  });
  $('.input-search').keypress(function (e) {
   var key = e.which;
   if(key == 13)  // the enter key code
    {
      $('#myModal').modal('hide');  
    }
  }); 
});