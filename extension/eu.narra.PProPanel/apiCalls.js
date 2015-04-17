var token;

function getToken() {
  token = $("#token").val();
}

function loadProfile() {
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/users/me?token=" + token,
    dataType: "json",

    beforeSend: function() {
      updateStatus("Loading profile...", 0);
    },

    success: function(msg) {
      displayUsername(msg);
      updateStatus("Loading projects...", 20);
    },
    error: function() {
      displayError("Cannot load profile.");
    }
  });
}

function loadProjects() {
  if (projectsJsonObject) {
    displayProjects(projectsJsonObject);
    hideProgressBar();
  }
  else {
    $.ajax({
      method: "GET",
      url: "http://api.narra.eu/v1/projects?token=" + token,
      dataType: "json",

      success: function(msg) {
        projectsJsonObject = msg;
        displayProjects(msg);
        hideProgressBar();
      },
      error: function() {
        displayError("Cannot load projects.");
      }
    });
  }
}

function loadProjectLibraries(name) {
  if (librariesJsonObject[name])
    displayProjectLibraries(librariesJsonObject[name]);
  else {
    $.ajax({
      method: "GET",
      url: "http://api.narra.eu/v1/projects/" + name + "?token=" + token,
      dataType: "json",

      success: function(msg) {
        librariesJsonObject[name] = msg;
        displayProjectLibraries(msg);
      },
      error: function() {
        displayError("Cannot load libraries.");
      }
    });
  }
}

function logout() {
  $.ajax({
    method: "GET",
    url: "http://api.narra.eu/v1/users/me/signout?token=" + token,
    dataType: "json",

    success: function(msg) {
      clearWrapper();
      initPlugin();
    },
    error: function() {
      displayError("Cannot signout.");
    }
  });
}