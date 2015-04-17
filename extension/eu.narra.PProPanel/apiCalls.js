var token;

function getToken() {
  localStorage["token"] = $("#token").val();
}

function loadProfile() {
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/users/me?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayUsername(msg);
    },
    error: function() {
      displayError("Cannot load profile.");
    }
  });
}

function loadProjects() {
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/projects?token=" + localStorage["token"],
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
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/projects/" + name + "?token=" + localStorage["token"],
    dataType: "json",

    success: function(msg) {
      displayProjectLibraries(msg);
    },
    error: function() {
      displayError("Cannot load libraries.");
    }
  });
}

function logout() {
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/users/me/signout?token=" + localStorage["token"],
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