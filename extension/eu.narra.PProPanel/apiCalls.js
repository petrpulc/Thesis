var token;
var url = "http://neptun.avc-cvut.cz:8080/";

function getToken() {
  localStorage["token"] = $("#token input").val();
}

function loadProfile() {
  $.ajax({
    method: "GET",
    url: url + "v1/users/me?token=" + localStorage["token"],
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
    url: url + "v1/projects?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayProjects(msg);
    },
    error: function() {
      displayError("Cannot load projects.");
    }
  });
}

function loadProjectLibraries(name) {
  if (!name) {
    $.ajax({
      method: "GET",
      url: url + "v1/libraries/" + "?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        displayLibraries(msg);
      },
      error: function() {
        displayError("Cannot load libraries.");
      }
    });
  }
  else {
    $.ajax({
      method: "GET",
      url: url + "v1/projects/" + name + "?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        displayProjectLibraries(msg);
      },
      error: function() {
        displayError("Cannot load libraries.");
      }
    });
  }
}

function loadLibraryItems(name) {
  $.ajax({
      method: "GET",
      url: url + "v1/libraries/" + name + "/items?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        displayLibraryItems(msg);
      },
      error: function() {
        displayError("Cannot load libraries.");
      }
    });
}

function logout() {
  $.ajax({
    method: "GET",
    url: url + "v1/users/me/signout?token=" + localStorage["token"],
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
    $.ajax({
      method: "GET",
      url: url + "v1/items/" + array[i].replace(/\.[^/.]+$/, "") + "?token=" + localStorage["token"],
      dataType: "json",

      success: function(msg) {
        var param = '$._ext_PPRO.renameFootage("' + msg.item.id + '","' + msg.item.name + '")';
        evalScript(param);
        counter++;
        if (counter == array.length)
          $("#sync i").removeClass("fa-spin"); 
      },
      error: function() {
        counter++;
        if (counter == array.length)
          $("#sync i").removeClass("fa-spin");
      }
    });
  }
}