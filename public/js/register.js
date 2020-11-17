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
  extraJson["picture"] = profile.getImageUrl();
  extraJson["type"] = $("#type").val();
  if ($("#type").val() == "student") {
    extraJson["name"] = $("#name").val();
    extraJson["aboutyou"] = $("#aboutyou").val();
    extraJson["branch"] = $("#branch").val();
    extraJson["graduation"] = $("#graduation").val();
  }  else if ($("#type").val() == "teacher") {
    extraJson["name"] = $("#teacherName").val();
    extraJson["aboutyou"] = $("#aboutteacher").val();
    extraJson["teacherAddress"] = $("#teacherAddress").val();
  } else if ($("#type").val() == "buisness") {
    extraJson["name"] = $("#buisnessName").val();
    extraJson["website"] = $("#website").val();
    extraJson["contactName"] = $("#contactName").val();
    extraJson["buisnessAddress"] = $("#buisnessAddress").val();
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
      if (result!= "Success") {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        alert(result);
      } else {
        alert("User created successfully");
         if (extraJson.type == "student") {
        window.open("student.html?email="+profile.getEmail(), "_self");
      } else if (extraJson.type == "teacher") {
        window.open("teacher.html?email="+profile.getEmail(), "_self");
      } if (extraJson.type == "buisness") {
        window.open("buisness.html?email="+profile.getEmail(), "_self");
      }
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