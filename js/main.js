
if("geolocation" in navigator){

    function geo_success(position){
        const find = document.getElementById('controlsForm');

        find.addEventListener('submit', function(e){
            e.preventDefault();
            initialize();
        });
        
        
        
        function initialize() {
            const mapdiv = document.getElementById('map');
            const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude );
            const map = new google.maps.Map(mapdiv, {
                center: pos,
                zoom: 11
            });

            const me = new google.maps.Marker({
                position: pos,
                title: 'You'
            });
            me.setMap(map);
            
            const infowindow = new google.maps.InfoWindow();
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: document.getElementById('radius').value,
                type: [document.getElementById('places').value]
            }, callback);

            

            function callback(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                    for (let i = 0; i < results.length; i++) {
                        addMarker(results[i]);
        
                    }
                }
            }
            function addMarker(place){
                const placeLoc = place.geometry.location;
                const icon = place.icon;
                const marker = new google.maps.Marker({
                    map: map,
                    position: placeLoc,
                    icon: icon
                });

                google.maps.event.addListener(marker, 'click', function(){
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }
            
        }
        
    }

    function geo_error(){
        alert('Position not found.');
    }
    const geo_options = {
        enableHighAccuracy: true,
        maximumAge: 27000,
        timeout: 30000

    }
    let wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

    
    
}else{
    console.log("Geolocation not available");
}
