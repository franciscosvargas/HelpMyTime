window.mdc.autoInit();

// jQuery plugins
$.fn.isAfter = function (sel) {
	return this.prevAll().filter(sel).length !== 0;
};

$.fn.isBefore = function (sel) {
	return this.nextAll().filter(sel).length !== 0;
};

isOpenTabRunning = false;

function openTab(target, tabToOpen) {
	var actualTab = $(".tab:visible");
	var tabToOpen = `#${tabToOpen}-tab`;

	if (isOpenTabRunning == false) {
		isOpenTabRunning = true;

		if ($(target).hasClass("mdc-bottom-navigation__list-item") == true) {
			// Highlight the current bottom navigation item
			$(".mdc-bottom-navigation__list-item").removeClass("mdc-bottom-navigation__list-item--activated");
			$(target).addClass("mdc-bottom-navigation__list-item--activated");
			isOpenTabRunning = false;
		}

		if ($(window).width() < 768) {
			// Slides out the actual tab
			$("html, body").css("overflow-x", "hidden");
			if ($(actualTab).isBefore(tabToOpen)) {
				$(actualTab).addClass("slideOutLeft").one("animationend", function () {
					$(this).removeClass("slideOutLeft");
					$(".tab").hide();
					// Slide in the new tab
					$(tabToOpen).addClass("slideInRight").show().one("animationend", function () {
						$(this).remove("slideInRight");
						$("html, body").css("overflow-x", "visible");
						isOpenTabRunning = false;
					});
				});
			} else if ($(actualTab).isAfter(tabToOpen)) {
				$(actualTab).addClass("slideOutRight").one("animationend", function () {
					$(this).removeClass("slideOutRight");
					$(".tab").hide();
					// Slide in the new tab
					$(tabToOpen).addClass("slideInLeft").show().one("animationend", function () {
						$(this).remove("slideInLeft");
						$("html, body").css("overflow-x", "visible");
						isOpenTabRunning = false;
					});
				});
			}
		} else {
			// Fades out the actual tab
			$(actualTab).addClass("fadeOut").one("animationend", function () {
				$(this).removeClass("fadeOut");
				$(this).hide();
				// Fade in the new tab
				$(tabToOpen).addClass("fadeIn").show().one("animationend", function () {
					$(this).removeClass("fadeIn");
					isOpenTabRunning = false;
				});
			})
		}
	}
}
$(document).on("click", "[data-tab]", (e) => {
	openTab(e.target, $(e.target).closest("[data-tab]").data("tab"))
});