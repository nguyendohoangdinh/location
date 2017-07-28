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
          // marker.setVisible(true);
        // $(".main-box").append("place.name").append("address");
        // var mapauto = new google.maps.LatLngBounds();
        //   place.forEach(function(places) {
        //   if (!place.geometry) {
        //     return;
        //   }
        //   // Create a marker for each place.
        //   markers.push(new google.maps.Marker({
        //     map: map,
        //     title: place.name,
        //     animation: google.maps.Animation.BOUNCE,
        //     position: place.geometry.location
        //   }));
        //   name = place.name;
        //   address = place.formatted_address;
        //   if (place.geometry.viewport) {
        //     // Only geocodes have viewport.
        //     bounds.union(place.geometry.viewport);
        //   } else {
        //     bounds.extend(place.geometry.location);
        //   }
        // });
        // map.fitBounds(mapauto);
        
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



//   var map = new google.maps.Map(document.getElementById('googleMap'), {
//     zoom: 7,
//     center: new google.maps.LatLng(13.09546, 109.32094),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//   var infowindow = new google.maps.InfoWindow();
//   var markers, i;

//   for (i = 0; i < locations.length; i++) {
//     markers = new google.maps.Marker({
//       position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//       map: map,
//       animation: google.maps.Animation.BOUNCE

//     });

//     google.maps.event.addListener(markers, 'click', (function(marker, i) {
//       return function() {
//         infowindow.setContent(locations[i][0]);
//         infowindow.open(map, markers);
//       }
//     })(markers, i));
//   }

 

//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];

//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         title: place.name,
//         animation: google.maps.Animation.BOUNCE,
//         position: place.geometry.location
//       }));
//       name = place.name;
//       address = place.formatted_address;
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });

//     map.fitBounds(bounds);
//     var html1 = "", html3 = "",html2 = "";
//         html1 += "<div class='location-detail'>";
//         html1 += "<div class='row'>";
//         html1 += "<div class='col-md-7 name-location'>";
//         html2 += " </div>";
//         html2 += "<div class='col-md-7 address-location col-md-offset-1'>";
//         html3 += "</div>";
//         html3 += "<div class='col-md-6 see-map col-md-offset-2'>";
//         html3 += " <p>See Location</p><span><i>01</i></span>";
//         html3 += "</div>";
//         html3 += "</div>";
//         html3 += "</div>";
//     $("div.location-info").append(html1 + "<p>" + name + "</p>" + html2 + "<p>" + address + "</p>" + html3);
//   });
// }