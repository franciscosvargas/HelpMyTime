function openSidebar() {
	let sidebarWidth =  $("#sidebar-panel").width();
	if ($(window).width() > 800) {
		$("#content-container").css("margin-left", sidebarWidth);
	}
	$("#sidebar-panel").css("left", "0");
}

function closeSidebar() {
	let sidebarWidth =  $("#sidebar-panel").width();
	if ($(window).width() > 800) {
		$("#content-container").css("margin-left", "0");
	}
	$("#sidebar-panel").css("left", -Math.abs(sidebarWidth) - 6);
}

$(document).on("click", "#open-sidebar-btn", () => {openSidebar()});
$(document).on("click", ".close-sidebar-btn", () => {closeSidebar()});

/* js */