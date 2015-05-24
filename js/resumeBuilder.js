/*
JSON data for Interactive Resume
*/
var bio = {
    'name' : 'Lakshmi Vineeth',
    'role' : 'Web Developer',
    'contacts' : {
        'mobile' : '+974-12345678',
        'email' : 'lakshmivvnair@gmail.com',
        'twitter' : '@lakshmivineeth2',
        'github' : 'lakshmivvnair',
        'location' : 'Doha, Qatar'
    },
    'welcomeMsg' : 'Welcome to Project - Interactive Resume',
    'skills' : ['HTML', 'CSS', 'JavaScript', 'jQuery', 'iOS', 'Android'],
    'bioPic' : 'images/fry.jpg',
    'display' : function () {
      var formattedName = HTMLheaderName.replace('%data%', bio.name);
      var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
      var formattedImage = HTMLbioPic.replace('%data%', bio.bioPic);
      var formattedWelcomeMsg = HTMLwelcomeMsg.replace('%data%', bio.welcomeMsg);

      $('#header').prepend(formattedRole)
                  .prepend(formattedName)
                  .append(formattedImage)
                  .append(formattedWelcomeMsg);

      // Prepare contact HTML
      var formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
      var formattedEmail = HTMLemail.replace('%data%', bio.contacts.email);
      var formattedTwitter = HTMLtwitter.replace('%data%', bio.contacts.twitter);
      var formattedGithub= HTMLgithub.replace('%data%', bio.contacts.github);
      var formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location);

      var allContacts = formattedMobile + formattedEmail + formattedTwitter + formattedGithub + formattedLocation;
      $('#topContacts').append(allContacts);

      // Prepare Skills HTML
      if (bio.skills.length > 0) {
          $('#header').append(HTMLskillsStart);
          var formattedSkill;
          var index = 0;
          while (index < bio.skills.length) {
              formattedSkill = HTMLskills.replace('%data%', bio.skills[index]);
              $('#skills').append(formattedSkill);
              index = index + 1;
          }
      };

      // Append contact info to footer
      $('#footerContacts:last').append(formattedMobile)
                               .append(formattedEmail)
                               .append(formattedTwitter)
                               .append(formattedGithub);
  }
};

var education = {
    'schools' : [
        {
            'name' : 'Anjuman College of Engineering',
            'location' : 'Nagpur, India',
            'degree' : 'BE',
            'majors' : 'Computer Science',
            'dates' : '2005-2008',
            'url' : '#'
        }
    ],
    'online_courses' :[
        {
            'title' : 'Front-End Web Developer Nanodegree',
            'school' : 'Udacity',
            'dates' : 'April, 2015',
            'url' : 'https://www.udacity.com/'
        },
        {
            'title' : 'iOS Developer Nanodegree',
            'school' : 'Udacity',
            'dates' : 'April 2015',
            'url' : 'https://www.udacity.com/'
        }
    ],
    'display' : function () {
        for(var school in education.schools){
          $('#education').append(HTMLschoolStart);

          var formattedSchoolName = HTMLschoolName.replace('%data%',education.schools[school].name);
          var formattedSchoolDegree = HTMLschoolDegree.replace('%data%',education.schools[school].degree);
          var formattedSchoolDates = HTMLschoolDates.replace('%data%',education.schools[school].dates);
          var formattedSchoolLocation = HTMLschoolLocation.replace('%data%',education.schools[school].location);
          var formattedSchoolMajor = HTMLschoolMajor.replace('%data%',education.schools[school].majors);

          var finalSchool = formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedSchoolLocation + formattedSchoolMajor;
          $('.education-entry:last').append(finalSchool);
        }

        $('#education').append(HTMLonlineClasses);

        for(var course in education.online_courses) {
          $('#education').append(HTMLschoolStart);

          var formattedOnlineTitle = HTMLonlineTitle.replace('%data%',education.online_courses[course].title);
          var formattedOnlineSchool = HTMLonlineSchool.replace('%data%',education.online_courses[course].school);
          var formattedOnlineDates = HTMLonlineDates.replace('%data%',education.online_courses[course].dates);
          var formattedOnlineURL = HTMLonlineURL.replace('%data%',education.online_courses[course].url);

          var finalCourse = formattedOnlineTitle + formattedOnlineSchool + formattedOnlineDates + formattedOnlineURL;
          $('.education-entry:last').append(finalCourse);
        }
    }
};

var work = {
    'jobs' : [
        {
            'employer' : 'Market on Mobile',
            'title' : 'Developer',
            'location' : 'Mumbai, India',
            'dates' : 'Feb 2012 - Present',
            'desciption' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
            'employer' : 'Infosys Ltd.',
            'title' : 'Systems Engineer',
            'location' : 'Pune, India',
            'dates' : 'Nov 2008 - September 2011',
            'desciption' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        }
    ],
    'display' : function () {
    for (var job in work.jobs) {

        $('#workExperience').append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace('%data%',work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace('%data%', work.jobs[job].title);
        var formattedDate = HTMLworkDates.replace('%data%', work.jobs[job].dates);
        var formattedLocation = HTMLworkLocation.replace('%data%', work.jobs[job].location);
        var formattedDescription = HTMLworkDescription.replace
        ('%data%', work.jobs[job].desciption);

        var formattedEmployerTitle = formattedEmployer + formattedTitle + formattedLocation + formattedDate + formattedDescription;

        $('.work-entry:last').append(formattedEmployerTitle);
    }
}
};

var projects = {
    'projects' : [
        {
            'title' : 'Sample Project',
            'dates' : 'May 2015',
            'desciption' :  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            'images' : ['images/fry.jpg', 'images/fry.jpg']
        }
    ],
    'display' : function () {
    for (proj in projects.projects) {
        $('#projects').append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace('%data%', projects.projects[proj].title);
        $('.project-entry:last').append(formattedTitle);

        var formattedDate = HTMLprojectDates.replace('%data%', projects.projects[proj].dates);
        $('.project-entry:last').append(formattedDate);

        var formattedDescription = HTMLprojectDescription.replace('%data%', projects.projects[proj].desciption);
        $('.project-entry:last').append(formattedDescription);

        if (projects.projects[proj].images.length > 0) {
            for(image in projects.projects[proj].images) {
                var formattedImage = HTMLprojectImage.replace('%data%', projects.projects[proj].images[image]);
            $('.project-entry:last').append(formattedImage);
            }
        }
    }
  }
};

// To show Navigation Bar below header
var navigation = {
    'navMenu' : [
        {
          'name' : 'Work Experience',
          'url' : '#workExperience'
        },
        {
          'name' : 'Education',
          'url' : '#education'
        },
        {
          'name' : 'Projects',
          'url' : '#projects'
        },
        {
          'name' : 'Location',
          'url' : '#mapDiv'
        },
        {
          'name' : 'Back to Top',
          'url' : '#main'
        }
    ],
    'display' : function () {
      var formattedNavigation;
      for (nav in navigation.navMenu){
          formattedNavigation = HTMLnavName.replace('%data%', navigation.navMenu[nav].name);
          formattedNavigation = formattedNavigation.replace('%url%', navigation.navMenu[nav].url);
          $('#navMenu:last').append(formattedNavigation);
      }
    }

};

// Display header and bio info
bio.display();

// Display Navigation Links
navigation.display();

// Display work experience details
work.display();

// Display projects
projects.display();

// Display school and online courses
education.display();

$('#mapDiv').append(googleMap);