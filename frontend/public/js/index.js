getLocation();

function getLocation() {
	navigator.geolocation.getCurrentPosition(getServicesByLocation, showError, {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 100
	});
}

async function getServicesByLocation(position) {
	await $.get(`/getservicesbylocation?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
		function (resultado) {
			console.log(resultado)
			if (resultado.length != 0) {
				resultado.forEach(element => {
					$("#nearby-services-carousel").flickity("append", $(`
						<div class="mdc-card">
							<div id="$${element.id}" class="mdc-card__primary-action" data-mdc-auto-init="MDCRipple">
								<div class="card-content">
									<div class="price-tag">R$${element.price}</div>
									<h2 class="mdc-typography--headline6">${element.name}</h2>
									<h3 class="mdc-typography--subtitle2">por ${element.owner_name}</h3>
									<p class="mdc-typography--body2">${element.description}</p>
								</div>
							</div>
							<div class="mdc-card__actions">
								<div class="mdc-card__action-buttons">
									<button class="mdc-button" onclick="window.location.href='e/${element.owner_slug}'" mdc-card__action mdc-card__action--button">
										<span class="mdc-button__label">Visualizar</span>
									</button>
								</div>
								
							</div>
						</div>
					`));
				});
				$("#subtitle").html("Serviços encontrados na sua região");
				$("#progressbar").css("display", "none");
				$("#nearby-services-carousel").flickity("resize");
			}
		});
}

function showError(error) {
	getServicesByLocation({
		coords: {
			latitude: -23.554894,
			longitude: -46.633582
		}
	})
}

$(document).keypress(function(e) {
	if(e.which == 13) window.location.href=`/s?term=${$("#search").val()}`;
	if($(".search-input-group input").val() == "") $(".services-body").html("");
});

$("#nearby-services-container").one("animationend", function () {
	$(this).css("z-index", "1");
});

$(document).on("click", ".header-tab", function () {
	var tab = $(this).data("tab");
	// Avoid clicking on the same tab twice
	if ($(this).hasClass("active")) {
		return false;
	} else {
		$(".header-tab").removeClass("active");
		$(this).addClass("active");
		$(".container-body").hide();
		$(`#${tab}-tab`).css("display", "flex");
	}
});

/* $(document).on("click", ".share-btn", function () {
	if (navigator.share) {
		navigator.share({
			title: "HelpMyTime",
			text: "Confira esse anúncio no HelpMyTime!",
			url: "https://example.com",
		})
			.then(() => console.log("Compartilhado com sucesso!"))
			.catch((error) => console.log("Erro ao compartilhar"));
	}
}) */

placeholderText = [
	"Que serviço você precisa hoje?",
	"Dentista?",
	"Psicólogo?",
	"Manicure?",
	"Marceneiro?",
	"Fazer uma progressiva?",
	"HelpMyTime agenda pra você!"
];

// Typewriter effect
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
async function typewriter(array) {
	for (var y = 0; y < array.length; y++) {
		var placeholder = "";
		for (var i = 0; i < array[y].length; i++) {
			placeholder += array[y].charAt(i);
			$(".input-group-input").attr("placeholder", placeholder);
			// Pause between letters
			await sleep(50);
		}
		// Pause between words
		await sleep(1000)
	}
	// Pause between loops
	await sleep(3000);
	typewriter(placeholderText);
}
typewriter(placeholderText);