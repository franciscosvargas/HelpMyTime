window.mdc.autoInit();
previousTab = "";
actualTab = "";

function openLoginContainer() {
	$("body").css("overflow", "hidden");
	$("#login-container").addClass("animated fadeIn faster").show().one("animationend", function() {
		$(this).removeClass("animated fadeIn faster");
	});
	$("#login-panel").addClass("animated slideInUp faster").css("display", "flex").one("animationend", function() {
		$(this).removeClass("animated slideInUp faster");
		actualTab = "#login-panel";
	});
}

function goBackContainer() {
	$(actualTab).addClass("animated slideOutRight faster").one("animationend", function() {
		$(actualTab).hide().removeClass("animated slideOutRight faster");
		actualTab = `#${$(".panel:visible").attr("id")}`;
		previousTab = "";
	});
}

function closeLoginContainer() {
	$("body").css("overflow", "visible");
	$(".panel:visible").addClass("animated slideOutDown faster").one("animationend", function() {
		$(this).hide();
		$(this).removeClass("animated slideOutDown faster");
	});
	$("#login-container").addClass("animated fadeOut faster").one("animationend", function() {
		$(this).hide();
		$(this).removeClass("animated fadeOut faster");
	});
}

function openPanel(panel) {
	$(panel).addClass("animated slideInRight faster").css("display", "flex").one("animationend", function() {
		previousTab = actualTab;
		actualTab = panel;
		$(panel).removeClass("animated slideInRight faster");
	});
}

function openTab(tabToOpen) {
	var actualTab = `#${$(".register-tab:visible").attr("id")}`;
	if ($(actualTab).prev(tabToOpen).length > 0) {
		$(actualTab).addClass("animated slideOutRight faster").one("animationend", () => {
			$(actualTab).removeClass("animated slideOutRight faster");
			$(actualTab).hide();
		});
		$(tabToOpen).addClass("animated slideInLeft faster").show().one("animationend", () => {
			$(this).removeClass("animated slideInLeft faster")
		});
	} else if ($(actualTab).next(tabToOpen).length > 0) {
		$(actualTab).addClass("animated slideOutLeft faster").one("animationend", () => {
			$(actualTab).removeClass("animated slideOutLeft faster");
			$(actualTab).hide();
		});
		$(tabToOpen).addClass("animated slideInRight faster").show().one("animationend", () => {
			$(this).removeClass("animated slideInRight faster")
		});
	}
}

function validateCPF(cpf) {
	var soma;
	var resto;
	soma = 0;

	if (
		cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999"
	) return false;

	// Validates the first digit
	for (i=1; i<=9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11))  resto = 0;
	if (resto != parseInt(cpf.substring(9, 10))) return false;

	soma = 0;
	// Validates the second digit
	for (i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
	resto = (soma * 10) % 11;

	if ((resto == 10) || (resto == 11))  resto = 0;
	if (resto != parseInt(cpf.substring(10, 11))) return false;
	return true;
}

function validateRegisterForm() {
	
console.log('testando');
	if ($(".register-form").find("input").parent().hasClass("mdc-text-field--invalid") == true || $(".register-form").find("input").val().trim() == "") {
		console.log("Verifique se todos os campos estão devidamente preenchidos!");
		$(".register-btn").attr("disabled", "true");
		return false;
	}
	if (validateCPF($("[name='cpf']").val()) == false) {
		console.log("CPF inválido!");
		$(".register-btn").attr("disabled", "true");
		return false;
	}
	if ($(".register-form").find("input[name='password']").val().length < 8) {
		console.log("A senha deve ter no mínimo 8 caracteres");
		$(".register-btn").attr("disabled", "true");
		return false;
	}
	if ($(".register-form").find("input[name='password']").val() !== $(".register-form").find("input[name='repeatpassword']").val()) {
		console.log("As senhas devem ser iguais!");
		$(".register-btn").attr("disabled", "true");
		return false;
	}
	$(".register-btn").removeAttr("disabled");
}

function validateResetPasswordForm() {
	if ($("#reset-password-form").find("input").parent().hasClass("mdc-text-field--invalid") == true || $("#reset-password-form").find("input").val().trim() == "") {
		console.log("Verifique se todos os campos estão devidamente preenchidos!");
		$(".confirm-password-reset-btn").attr("disabled", "true");
	} else {
		$(".confirm-password-reset-btn").removeAttr("disabled");
	}
}

$("#register-user-tab").show();
$(document).on("click", "#register-panel .mdc-tab", (e) => { openTab(`#${$(e.target).closest("[data-tab]").data("tab")}-tab`) });
$(document).on("click", "#open-login", (e) => { openLoginContainer() });
$(document).on("click", ".back-btn", (e) => { goBackContainer() });
$(document).on("click", ".close-panel-btn", (e) => { closeLoginContainer() });
$(document).on("click", ".create-account-btn", (e) => { openPanel("#register-panel") });
$(document).on("click", ".reset-password-btn", (e) => { openPanel("#reset-password-panel") });
$(document).on("input focus blur change", () => { validateRegisterForm() });
$(document).on("input focus blur", "#reset-password-form input", () => { validateResetPasswordForm() });