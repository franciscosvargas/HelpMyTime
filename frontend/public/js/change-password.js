$(document).on("input", ".change-password-form input", function () {
	var isValid = true;
	$(".change-password-form input").each(function () {
		if (!$(this).val() || $(".change-password-form input[name='repeat-password']").val() !== $(".change-password-form input[name='new-password']").val() || $(this).val().length < 8) {
			isValid = false;
		}
	});
	if (isValid == false) {
		$(".change-password-form [type='submit']").attr("disabled", "true");
	} else if (isValid == true) {
		$(".change-password-form [type='submit']").removeAttr("disabled");
	}
});