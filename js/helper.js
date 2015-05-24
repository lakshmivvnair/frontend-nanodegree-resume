/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name" class="text-upper">%data%</h1>';
var HTMLheaderRole = '<span class="cyan-text">%data%</span><hr>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="cyan-text">%contact%</span><span class="yellow-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="cyan-text">mobile</span><span class="yellow-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="cyan-text">email</span><span class="yellow-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="cyan-text">twitter</span><span class="yellow-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="cyan-text">github</span><span class="yellow-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="cyan-text">blog</span><span class="yellow-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="cyan-text">location</span><span class="yellow-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="yellow-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text date-location">%data%</div>';
var HTMLworkLocation = '<div class="location-text date-location">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text date-location">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text date-location">%data%</div>';
var HTMLschoolLocation = '<div class="location-text date-location">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text date-location">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

var HTMLnavName = '<li class="flex-item"><a href="%url%"><span>%data%</span></a></li>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  // Hide 'back to Top' Navigation menu option
  $('#navMenu').find('.flex-item').last().hide();
  // $('button').click(function() {
  //   var iName = inName() || function(){};
  //   $('#name').html(iName);
  // });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;
  var workDone = {};
  var markerArray = [];
  var count = 0;
  var formattedInfoLocation;

  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);
    formattedInfoLocation = bio.contacts.location;
    formattedInfoLocation = formattedInfoLocation.slice(0, formattedInfoLocation.indexOf(','));
    workDone[formattedInfoLocation] = "Current Location";

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
      formattedInfoLocation = education.schools[school].location;
      formattedInfoLocation = formattedInfoLocation.slice(0, formattedInfoLocation.indexOf(','));
      workDone[formattedInfoLocation] = "Attended : " + education.schools[school].name;
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
      formattedInfoLocation = work.jobs[job].location;
      formattedInfoLocation = formattedInfoLocation.slice(0, formattedInfoLocation.indexOf(','));
      workDone[formattedInfoLocation] = "Worked : " + work.jobs[job].employer;
    }
    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // custom string in HTML format for infoWindow
    formattedInfoLocation = name;
    formattedInfoLocation = formattedInfoLocation.slice(0, formattedInfoLocation.indexOf(','));
    var infoWindowMessage = '<div>'+
      '<h2>' + name + '</h2>'+
      '<div>'+
      '<p>' + workDone[formattedInfoLocation] + '</p></div></div>';

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    marker.infoWindow = new google.maps.InfoWindow({
      content: infoWindowMessage
    });


    //Adding to marker array created to close infoWindows correctly on click
    markerArray[count++] = marker;

    /*
    Adding on click event to
      - Call closeInfoWindow() to close any other open InfoWindows
      - Open new infoWindow
    */
    google.maps.event.addListener(marker, 'click', function() {
      closeInfoWindow();
      marker.infoWindow.open(map,marker);
    });


    //Adding on click event to Close all open InfoWindows when user clicks anywhere on map
    google.maps.event.addListener(map, 'click', function() {
        marker.infoWindow.close();
        marker.open = false;
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  closeInfoWindow() will close all open infoWindows.
  */
  function closeInfoWindow() {
    for(var i in markerArray){
      markerArray[i].infoWindow.close();
    }
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});


/*
  To fix the navigation div on scroll
  And to show the 'Back to Top' link
*/
$(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
          $('#navMenu').addClass('stick');
          $('#navMenu').find('.flex-item').last().show();
      } else {
          $('#navMenu').removeClass('stick');
          $('#navMenu').find('.flex-item').last().hide();
      }
  });
