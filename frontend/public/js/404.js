var fonts = [
	"BioRhyme Expanded",
	"Wendy One",
	"Lobster",
	"Gugi",
	"ZCOOL KuaiLe",
	"Open Sans"
];

function randomizeFonts() {
	$.each($(".headline-container span"), function() {
		randomFont = Math.ceil(Math.random() * fonts.length);
		$(this).css("font-family", fonts[randomFont]);
	});
}

$(function() {
	setInterval(randomizeFonts, 1000);
});