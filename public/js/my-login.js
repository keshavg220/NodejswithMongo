$(function() {
});
function onFailure(error) {
  console.log(error);
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  $.ajax({
    url : '/getParticularItem?email='+profile.getEmail(),
    type : "get",
    success : function(result) {
      console.log(`result`);
      if (result == "user not found") {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        alert("User not present pls register it");
      }
      console.log(result.extraData);
      var extraData = JSON.parse(result.extraData);
      if (extraData.type == "student") {
        window.open("student.html?email="+profile.getEmail(), "_self");
      } else if (extraData.type == "teacher") {
        window.open("teacher.html?email="+profile.getEmail(), "_self");
      } if (extraData.type == "buisness") {
        window.open("buisness.html?email="+profile.getEmail(), "_self");
      }
    }
  });

}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSignIn,
    'onfailure': onFailure
  });
}

