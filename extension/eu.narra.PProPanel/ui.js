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
			project = project + '<li style="background-image: url(' + "./payloads/test.jpg" +');"' /*projectsObject.projects[i].thumbnails[j]*/  + '"></li>';
		}
		project = project + '</ul><div id="project_title"><span class="default">' + projectsObject.projects[i].title + '</span></div></div></li>';
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
		for (var j = librariesObject.project.libraries[i].thumbnails.length - 1; j >= 0; j--) {
			libraries = libraries + '<li style="background-image: url(' + "./payloads/test.jpg" +');"' /*librariesObject.project.libraries[i].thumbnails[j]*/  + '"></li>'
		}
		libraries = libraries + '</ul><div id="project_title"><span class="default">' + librariesObject.project.libraries[i].name + '</span></div></div></li>';
	}
	$("#ui_content_projects").append(libraries);
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
		for (var j = librariesObject.libraries[i].thumbnails.length - 1; j >= 0; j--) {
			libraries = libraries + '<li style="background-image: url(' + "./payloads/test.jpg" +');"' /*librariesObject.libraries[i].thumbnails[j]*/  + '"></li>'
		}
		libraries = libraries + '</ul><div id="project_title"><span class="default">' + librariesObject.libraries[i].name + '</span></div></div></li>';
	}
	$("#ui_content_projects").append(libraries);
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

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}