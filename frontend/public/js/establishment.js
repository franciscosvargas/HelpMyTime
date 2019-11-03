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
	console.log(target)
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



$(document).on("click", "[data-tab]", async (e) => {
	fetchServiceInformation($(e.target).closest("[data-service-id]").data("service-id"));
	openTab(e.target, $(e.target).closest("[data-tab]").data("tab"));

});

function fetchServiceInformation(service) {
	$.get(`/getserviceinformation?service=${service}`,
		function (resultado) {
			console.log(resultado)
			$('.schedule-headline').html(resultado.name);
			$('.schedule-description').html(resultado.description);

			$(".week-day").html("");
			$("#monday").html(`<div class="day-name">Seg</div>`);
			$("#tuesday").html(`<div class="day-name">Ter</div>`);
			$("#wednesday").html(`<div class="day-name">Qua</div>`);
			$("#thursday").html(`<div class="day-name">Qui</div>`);
			$("#friday").html(`<div class="day-name">Sex</div>`);
			
			resultado.horary.monday.forEach(element => {
				if (!element.haveClient)
					$("#monday").append(`<div onclick="schedule('${element._id}', '${service}')" class="schedule-hour available-hour">${element.time}</div>`)
			});
			resultado.horary.tuesday.forEach(element => {
				if (!element.haveClient)
					$("#tuesday").append(`<div onclick="schedule('${element._id}', '${service}')" class="schedule-hour available-hour">${element.time}</div>`)
			});

			resultado.horary.wednesday.forEach(element => {
				if (!element.haveClient)
					$("#wednesday").append(`<div onclick="schedule('${element._id}', '${service}')" class="schedule-hour available-hour">${element.time}</div>`)
			});

			resultado.horary.thursday.forEach(element => {
				if (!element.haveClient)
					$("#thursday").append(`<div onclick="schedule('${element._id}', '${service}')" class="schedule-hour available-hour">${element.time}</div>`)
			});

			resultado.horary.friday.forEach(element => {
				if (!element.haveClient)
					$("#friday").append(`<div onclick="schedule('${element._id}', '${service}')" class="schedule-hour available-hour">${element.time}</div>`)
			});
		});
}

function schedule(id, service) {
	if(logged){
		swal({
			title: "Deseja agendar?",
			text: "Tem certeza que deseja agendar este horário?",
			buttons: ["Cancelar", "Agendar"],
			dangerMode: true,
		  })
		  .then(confirm => {
			if (confirm) {
				$.post("/dashboard/makeschedule", {
					id: id,
					service: service
				});
			} 
		  });
	} else{
		openLoginContainer();
	}
}