function openMenu() {
	// Disables body overflow
	$("body").css("overflow", "hidden");

	// Animates both the fab button and the menu button
	$("#menu-btn ,#open-menu-fab .mdc-fab__icon").css("transform", "rotate(180deg)");
	// Switch the classes of both the fab button and the menu button
	$("#menu-btn i, #open-menu-fab i").removeClass("fa-bars").addClass("fa-times");

	// Animates the menu panel
	if ($(window).width() <= 480) {
		$("#menu-container").addClass("animated slideInUp fast").css("display", "flex").one("animationend", function () {
			$(this).removeClass("animated slideInUp fast");
		});
	} else if ($(window).width() > 480) {
		$("#menu-container").addClass("animated slideInLeft fast").css("display", "flex").one("animationend", function () {
			$(this).removeClass("animated slideInLeft fast");
		});
	}
}

function closeMenu() {
	// Enables body overflow
	$("body").css("overflow", "visible");

	// Animates both the fab button and the menu button
	$("#menu-btn, #open-menu-fab .mdc-fab__icon").css("transform", "rotate(-180deg)");
	// Switch the classes of both the fab button and the menu button
	$("#menu-btn i, #open-menu-fab i").removeClass("fa-times").addClass("fa-bars");

	// Animates the menu panel
	if ($(window).width() <= 480) {
		$("#menu-container").addClass("animated slideOutDown fast").one("animationend", function () {
			$(this).removeClass("animated slideOutDown fast");
			$(this).hide();
		});
	} else if ($(window).width() > 480) {
		$("#menu-container").addClass("animated slideOutLeft fast").one("animationend", function () {
			$(this).removeClass("animated slideOutLeft fast");
			$(this).hide();
		});
	}
}

function toggleMenu() {
	if ($("#menu-container").css("display") == "none") {
		openMenu();
	} else if ($("#menu-container").css("display") == "flex") {
		closeMenu();
	}
}
$(function () {
	$(document).on("click", "#menu-btn", () => { toggleMenu() });
	$(document).on("click", "#open-menu-fab", () => { toggleMenu() });
	$(document).on("click", "#menu-container", function (e) {
		if ($(e.target).attr("id") == "menu-container") { 
			closeMenu();
		}
	});
	// Adjust the dashboard header title to the actual screen width
	$(window).on("resize", function () {
		$(".dashboard-header .dashboard-header-title").css("max-width", "100%");
	});
});