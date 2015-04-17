var statusMessage;
var statusBar;
var wrapper;
var content;
var projectsJsonObject;
var librariesJsonObject = new Array();

function showProgressBar() {
  $("#progress").show();
}

function hideProgressBar() {
	$("#progress").hide();
}

function updateStatus(text, value) {
  statusMessage.html(text);
  statusBar.progressbar({value: value});
}

function displayError(text) {

}

function displayUsername(userObject) {
	$("#username").html("Username: " + userObject.user.name);
}

function displayProjects(projectsObject) {
	clearContent();
	var project = '';
	for (var i = projectsObject.projects.length - 1; i >= 0; i--) {
		project = project + '<li class="project" id="' + projectsObject.projects[i].name + '"><div><div class="thumbnails">';
		for (var j = projectsObject.projects[i].thumbnails.length - 1; j >= 0; j--) {
			project = project + '<img src="' + projectsObject.projects[i].thumbnails[j] + '" alt="thumbnail"/>';
		}
		project = project + '</div><div id="project_title"><span class="default">' + projectsObject.projects[i].title + '</span></div></div></li>';
		
	}

	content.append(project);

	$(".project").on("click",function() {
    var name = this.id;
    loadProjectLibraries(name);
  });
}

function displayProjectLibraries(librariesObject) {
	var libraries = '';
	clearContent();
	$("#ui_content h1").html('Project: ' + librariesObject.project.title);
	for (var i = librariesObject.project.libraries.length - 1; i >= 0; i--) {
		libraries = libraries + '<li class="project" id="' + librariesObject.project.libraries[i].id + '"><div><div class="thumbnails">';
		for (var j = librariesObject.project.libraries[i].thumbnails.length - 1; j >= 0; j--) {
			libraries = libraries + '<img src="' + librariesObject.project.libraries[i].thumbnails[j] + '" alt="thumbnail"/>';
		}
		libraries = libraries + '</div><div id="project_title"><span class="default">' + librariesObject.project.libraries[i].name + '</span></div></div></li>';
	}
	content.append(libraries);
}

function loadItems() {
	loadProfile();
	loadProjects();
}

function initPlugin() {
	$("html").removeClass('reset');
  $("body").removeClass('reset');
	wrapper = $(".wrapper");
	statusBar = $("#bar");
	statusMessage = $("#progress div span");
	wrapper.html('<div id="login_logo" class="row"><img src="payloads/narra.png" alt="narra logo"></div><div id="login_note" class="default row">Press Login button to log into Narra.</div><div id="login_button" class="row"><button>Login</button></div><input id="token" type="text">');
	statusBar.progressbar();
	hideProgressBar();

	$("#login_button button").on("click", function(e){
    initUI();
  });
}

function initLayout() {
	wrapper.html('<div class="row" id="ui_user"><span id="username" class="default"></span><span class="center"><img src="payloads/narra.png" alt="narra logo"></span><span class="right"><button id="logout">Logout</button></span></div><hr><div class="row" id="ui_content"><h1 class="default">Projects:</h1><ul id="ui_content_projects"></ul></div>');
	content = $("#ui_content_projects");

	$("#logout").on("click", function(e) {
    logout();
  });
}

function initUI() {
	getToken();
  showProgressBar();
  clearWrapper();
  initLayout();
  loadItems();  
}

function clearWrapper() {
  wrapper.empty();
  $("html").addClass('reset');
  $("body").addClass('reset');
}

function clearContent() {
	content.empty();
}
