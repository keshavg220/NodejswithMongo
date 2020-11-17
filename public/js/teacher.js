$(function() {
	$.ajax({
        url : '/getParticularItem?email='+getUrlParameter('email'),
        type : "get",
        success : function(result) {
            var extraData = JSON.parse(result.extraData);
            $("#studentImage").attr('src', extraData.picture);
            $("#name").text(extraData.name);
            $("#email").text(result.email);
            $("#aboutyou").text(extraData.aboutyou);
            $("#teacherAddress").text(extraData.teacherAddress);
        }
    });
    $.ajax({
        url : '/items',
        type : "get",
        success : function(result) {
            console.log(result);
           for (var i = 0; i<result.length; i++){
               var extraData = JSON.parse(result[i].extraData);
               if (extraData.type == 'student'){
                   appendStudent(result[i]);
               }
               if (extraData.type == 'buisness'){
                   appendBuisness(result[i]);
               }
           }
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

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    window.open("index.html","_self");
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

function appendStudent(data) {
    var extraData = JSON.parse(data.extraData);
    var html = '<div style="margin-top: 8px;"><img src="'+extraData.picture+'" alt="" style="width: auto;height: 100px;vertical-align: top"><div style="display: inline-block;margin-left: 8px;vertical-align: top"><label for="type" style="display: block;margin: 0px;">'+data.email+'</label><label for="type" style="display: block;margin: 0px;">'+extraData.name+'</label><label for="type" id="branch" style="margin: 0px;display: block;">Branch: '+extraData.branch+'</label><label for="type"  style="margin: 0px;">Graduation: '+extraData.graduation+'</label> </div></div>';
    $(".studentList").append(html);
}

function appendBuisness(data) {
    var extraData = JSON.parse(data.extraData);
    var html = '<div style="margin-top: 8px;"><img src="'+extraData.picture+'" alt="" style="width: auto;height: 100px;vertical-align: top"><div style="display: inline-block;margin-left: 8px;vertical-align: top"><label for="type" style="display: block;margin: 0px;">'+data.email+'</label><label for="type" style="display: block;margin: 0px;">'+extraData.name+'</label><label for="type" id="branch" style="margin: 0px;display: table-caption;">Website: '+extraData.website+'</label><label for="type"  style="margin: 0px;">Contact: '+extraData.contactName+'</label> </div></div>';
    $(".buisnessList").append(html);
}