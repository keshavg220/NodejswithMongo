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
      var extraData = JSON.parse(extraData);
      if (extraData.type == "student") {

      } else if (extraData.type == "teacher") {

      } if (extraData.type == "buisness") {

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

