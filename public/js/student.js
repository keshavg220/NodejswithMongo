$(function() {
	$.ajax({
    url : '/getParticularItem?email='+getUrlParameter('email'),
    type : "get",
    success : function(result) {
      var extraData = JSON.parse(result.extraData);
      $("#studentImage").attr('src', '')
      console.log(result.extraData);
    }
  });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function onFailure(error) {
  console.log(error);
}

function onSignIn(googleUser) {
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