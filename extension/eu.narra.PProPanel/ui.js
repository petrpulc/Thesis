function displayError(text) {

}

function displayUsername(userObject) {
	$("#username").html("Username: " + userObject.user.name);
}

function displayProjects(projectsObject) {
	var project = '';
	for (var i = projectsObject.projects.length - 1; i >= 0; i--) {
		project = project + '<li class="project" id="' + projectsObject.projects[i].name + '"><div><div class="thumbnails">';
		for (var j = projectsObject.projects[i].thumbnails.length - 1; j >= 0; j--) {
			project = project + '<img src="' + projectsObject.projects[i].thumbnails[j] + '" alt="thumbnail"/>';
		}
		project = project + '</div><div id="project_title"><span class="default">' + projectsObject.projects[i].title + '</span></div></div></li>';
	}

	$("#ui_content_projects").append(project);
}

/*function displayProjectLibraries(librariesObject) {
	var libraries = '';
	$("#ui_content h1").html('Project: ' + librariesObject.project.title);
	for (var i = librariesObject.project.libraries.length - 1; i >= 0; i--) {
		libraries = libraries + '<li class="project" id="' + librariesObject.project.libraries[i].id + '"><div><div class="thumbnails">';
		for (var j = librariesObject.project.libraries[i].thumbnails.length - 1; j >= 0; j--) {
			libraries = libraries + '<img src="' + librariesObject.project.libraries[i].thumbnails[j] + '" alt="thumbnail"/>';
		}
		libraries = libraries + '</div><div id="project_title"><span class="default">' + librariesObject.project.libraries[i].name + '</span></div></div></li>';
	}
	content.append(libraries);
}*/
