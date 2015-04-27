function displayError(text) {

}

function displayUsername(userObject) {
	$("#username").html("Username: " + userObject.user.name);
}

function displayProjects(projectsObject) {
	var project = '';
	for (var i = projectsObject.projects.length - 1; i >= 0; i--) {
		project = project + '<li class="project" id="' + projectsObject.projects[i].name + '"><div><ul class="thumbnails">';
		for (var j = projectsObject.projects[i].thumbnails.length - 1; j >= 0; j--) {
			project = project + '<li style="background-image: url(\'' + projectsObject.projects[i].thumbnails[j] +'\');"></li>';
		}
		project = project + '</ul><div class="project_title"><span class="default">' + projectsObject.projects[i].title + '</span></div></div></li>';
	}

	$("#ui_content_projects").append(project);

	$(".project").on("click", function(e) {
    var name = $(this).attr('id');
    window.location.href = "libraries.html?name=" + name;
  });
}

function displayProjectLibraries(librariesObject) {
	var libraries = '';
	$("#ui_content h1").html('Project: ' + librariesObject.project.title);
	for (var i = librariesObject.project.libraries.length - 1; i >= 0; i--) {
		libraries = libraries + '<li class="project" id="' + librariesObject.project.libraries[i].id + '"><div><input type="checkbox" name="libraries" value="' + librariesObject.project.libraries[i].id + '"/><ul class="thumbnails">';
		if (librariesObject.project.libraries[i].thumbnails) {
			for (var j = librariesObject.project.libraries[i].thumbnails.length - 1; j >= 0; j--) {
				libraries = libraries + '<li style="background-image: url(\'' + librariesObject.project.libraries[i].thumbnails[j] +'\');"></li>'
			}
		}
		libraries = libraries + '</ul><div class="project_title"><span class="default">' + librariesObject.project.libraries[i].name + '</span></div></div></li>';
	}
	$("#ui_content_projects").append(libraries);
	$(".thumbnails").on("click", function(e) {
    var name = $(this).parent().parent().attr('id');
    window.location.href = "items.html?name=" + name;
  });
	$(".project input").change(
    function(){
        if ($(this).is(':checked')) {
            $("#elemnum").html(function(i, val) { return +val+1 });
        }
        else {
        	$("#elemnum").html(function(i, val) { return +val-1 });
        }
    });
}

function displayLibraries(librariesObject) {
	var libraries = '';
	for (var i = librariesObject.libraries.length - 1; i >= 0; i--) {
		libraries = libraries + '<li class="project" id="' + librariesObject.libraries[i].id + '"><div><input type="checkbox" name="libraries" value="' + librariesObject.libraries[i].id + '"/><ul class="thumbnails">';
		if (librariesObject.libraries[i].thumbnails) {	
			for (var j = librariesObject.libraries[i].thumbnails.length - 1; j >= 0; j--) {
				libraries = libraries + '<li style="background-image: url(\'' + librariesObject.libraries[i].thumbnails[j] +'\');"></li>'
			}
		}
		libraries = libraries + '</ul><div class="project_title"><span class="default">' + librariesObject.libraries[i].name + '</span></div></div></li>';
	}
	$("#ui_content_projects").append(libraries);
	$(".thumbnails").on("click", function(e) {
    var name = $(this).parent().parent().attr('id');
    window.location.href = "items.html?name=" + name;
  });
	$(".project input").change(
    function(){
      if ($(this).is(':checked')) {
        $("#elemnum").html(function(i, val) { return +val+1 });
      }
      else {
      	$("#elemnum").html(function(i, val) { return +val-1 });
      }
    });
}

function displayLibraryItems(itemsObject) {
	var items = '';
	for (var i = itemsObject.items.length - 1; i >= 0; i--) {
		items = items + '<li class="item" id="' + itemsObject.items[i].id + '"><div class="item_wrapper"><input type="checkbox" name="items" value="' + itemsObject.items[i].id + '"/><ul class="thumbnails">';
		items = items + '<li style="background-image: url(\'' + itemsObject.items[i].thumbnails[0] +'\');"></li>'
		items = items + '</ul><div class="item_title"><span class="default">' + itemsObject.items[i].name + '</span></div></div></li>';
	}
	$("#ui_content_projects").append(items);
	$(".thumbnails").on("dblclick", function(e) {
    var name = $(this).parent().parent().attr('id');
    window.location.href = "items.html?name=" + name;
  });
	$(".item input").change(
    function() {
      if ($(this).is(':checked')) {
        $("#elemnum").html(function(i, val) { return +val+1 });
      }
      else {
      	$("#elemnum").html(function(i, val) { return +val-1 });
      }
  	}
  );
}


function getURLParameter(url, name) {
  return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

