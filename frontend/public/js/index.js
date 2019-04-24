$("#nearby-services-container").one("animationend", function () {
	$(this).css("z-index", "1");
});

$(window).on("resize", function () {
	$("#nearby-services-carousel").flickity("resize");
});

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
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
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