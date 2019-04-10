const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector(".mdc-snackbar"));

function showSnackBar(message) {
	snackbar.labelText = message;
	snackbar.actionButtonText = "ok";
	snackbar.open();
}

placeholderText = [
	"Que serviço você precisa hoje?",
	"Dentista?",
	"Psicólogo?",
	"Manicure?",
	"Marceneiro?",
	"Fazer uma progressiva?",
	"HelpMyTime agenda pra você!"
];

// Initialize category slider
$(".navigation-menu").flickity({
	cellAlign: "center",
	groupCells: true,
	contain: true,
	pageDots: false
});

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