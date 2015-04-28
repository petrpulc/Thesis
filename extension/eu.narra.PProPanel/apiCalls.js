var token;
var apiUrl = "http://neptun.avc-cvut.cz:8080/";
var uiUrl = "http://neptun.avc-cvut.cz/";

function getToken() {
  localStorage["token"] = $("#token input").val();
}

function loadProfile() {
  $.ajax({
    method: "GET",
    url: apiUrl + "v1/users/me?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayUsername(msg);
    },
    error: function() {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    }
  });
}

function loadProjects() {
  $.ajax({
    method: "GET",
    url: apiUrl + "v1/projects?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayProjects(msg);
    },
    error: function() {
      displayError("Cannot load projects.");
    }
  });
}

function loadLibraries(name) {
  if (!name)
    var urlPart = "v1/libraries/";
  else
    var urlPart = "v1/projects/" + name;
  
  $.ajax({
    method: "GET",
    url: apiUrl + urlPart + "?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayLibraries(msg);
    },
    error: function() {
      displayError("Cannot load libraries.");
    }
  });
}

function loadLibraryItems(name) {
  $.ajax({
      method: "GET",
      url: apiUrl + "v1/libraries/" + name + "/items?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        displayLibraryItems(msg);
      },
      error: function() {
        displayError("Cannot load items.");
      }
    });
}

function logout() {
  $.ajax({
    method: "GET",
    url: apiUrl + "v1/users/me/signout?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    },
    error: function() {
      displayError("Cannot signout.");
    }
  });
}

function callbackFunction(data) {
  var array = data.split(',');
  var counter = 0;
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].substring(array[i].lastIndexOf('\\') + 1);
    $.ajax({
      method: "GET",
      url: apiUrl + "v1/items/" + array[i].replace(/\.[^/.]+$/, "") + "?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        var param = '$._ext_PPRO.renameFootage("' + msg.item.id + '","' + msg.item.name + '")';
        evalScript(param);
        counter++;
        if (counter == array.length)
          $("#sync i").removeClass("fa-spin"); 
      },
      error: function() {
        displayError("Cannot sync items.");
        counter++;
        if (counter == array.length)
          $("#sync i").removeClass("fa-spin");
      }
    });
  }
}