sidebarOpen = false;
function openSidebar() {
	var sidebarWidth = $("#sidebar-panel").width();
	$("#toggle-sidebar-btn").css("transform", "rotate(180deg)");
	$("#toggle-sidebar-btn i").removeClass("fa-bars").addClass("fa-times");
	if ($(window).width() > 800) {
		$("#main-container").css("margin-left", sidebarWidth);
	} else if ($(window).width() < 800) {
		$("body").css("overflow", "hidden");
		$("#sidebar-overlay").addClass("animated fadeIn faster").show().one("animationend", function() {
			$(this).removeClass("animated fadeIn faster");
		});
	}
	$("#sidebar-panel").css("left", "0");
	sidebarOpen = true;
}

function closeSidebar() {
	var sidebarMaxWidth = $("#sidebar-panel").css("max-width");
	$("#toggle-sidebar-btn").css("transform", "rotate(-180deg)");
	$("#toggle-sidebar-btn i").removeClass("fa-times").addClass("fa-bars");
	if ($(window).width() > 800) {
		$("#main-container").css("margin-left", "0");
	} else if ($(window).width() < 800) {
		$("#sidebar-overlay").addClass("animated fadeOut faster").one("animationend", function() {
			$(this).removeClass("animated fadeOut faster");
			$(this).hide();
		});
		$("body").css("overflow", "visible");
	}
	$("#sidebar-panel").css("left", "-306px");
	sidebarOpen = false;
}

$(document).on("click", "#toggle-sidebar-btn", () => {
	if (sidebarOpen == false) {
		openSidebar();
	} else if (sidebarOpen == true) {
		closeSidebar();
	}
});

$(document).on("click", ".close-sidebar-btn", () => { closeSidebar() });
$(document).on("click", "#sidebar-overlay", () => { closeSidebar() });