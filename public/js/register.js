var flag = false;
$(function() {
});
function onFailure(error) {
  console.log(error);
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  if (!flag) {
    return
  }
  var extraJson = {};
  extraJson["picture"] = profile.getEmail();

  if ($("#type").val() == "student") {
    extraJson["name"] = $("#name").val();
    extraJson["aboutyou"] = $("#aboutyou").val();
    extraJson["branch"] = $("#branch").val();
    extraJson["graduation"] = $("#graduation").val();
  }  else if ($("#type").val() == "teacher") {
  } else if ($("#type").val() == "buisness") {
  }
  var formData = {
    email : profile.getEmail(),
    extraData : JSON.stringify(extraJson)
  }
  console.log(JSON.stringify(formData));
  $.ajax({
    url : '/item',
    type : "POST",
    data : JSON.stringify(formData),
    contentType: "application/json; charset=utf-8",
    success : function(result) {
      console.log(result);

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

function openParticularForm() {
  flag =true;
  $(".firstPage").css("display", "none");
  $(".googleSignIn").css("display", "block");
  if ($("#type").val() == "student") {
    $(".studentForm").css("display", "block");
    $(".registerTitle").text("Register as Student");
  }else if ($("#type").val() == "teacher") {
    $(".teachersForm").css("display", "block");
    $(".registerTitle").text("Register as Teacher");
  } else if ($("#type").val() == "buisness") {
    $(".buisnessForm").css("display", "block");
    $(".registerTitle").text("Register as Buisness");
  }
  
}