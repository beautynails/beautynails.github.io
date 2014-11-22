// Closes the sidebar menu
$("#menu-close").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    $('[data-href]').each(function () {
        $.ajax({
            url: $(this).data('href'),
            type: 'get',
            success: function (data) {
                $('#' + $(this).data('target')).html(data);
            }.bind(this)
        });
    });
    if (typeof google !== 'undefined') {
        google.maps.event.addDomListener(window, 'load', initialize);
    }
});

function initialize() {
    if (typeof google === 'undefined') {
        return;
    }
    var mapOptions = {
        center: {lat: 50.0670863, lng: 19.9139926},
        zoom: 18,
        styles: [
            {
                stylers: [
                    {hue: "#ff00ff"},
                    {saturation: -20}
                ]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {lightness: 100},
                    {visibility: "simplified"}
                ]
            }, {
                featureType: "road",
                elementType: "labels"
            }
        ]
    };
    var contentString = '<div class="info-window">' +
        '<img src="images/logo.jpg">' +
        '<div id="body">' + $('.contact-information').html() +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({position: mapOptions.center, map: map});
    setTimeout(function () {
        infowindow.open(map, marker);
    }, 1000);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}
