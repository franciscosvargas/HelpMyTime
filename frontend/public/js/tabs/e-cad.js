$(document).ready(function () {
	$("#phone-number").mask("(00) 0000-00009");
	// Preview the uploaded logo
	$(document).on("change", ".upload-logo-wrapper input[type='file']", function () {
		$(".upload-logo-preview").show();
		$(".upload-logo-preview").attr("src", window.URL.createObjectURL(this.files[0]));
	});

	actualDataStep = 1
	$(`.register-form-step[data-step-number='${actualDataStep}']`).css("display", "flex");

	// Changes the progress label accordingly to the current form step
	$("#progress-counter-container .progress-counter-label").text($(`.register-form-step[data-step-number='${actualDataStep}']`).data("step-label"));

	// Verifies if is there any empty input
	$(document).on(`focus input blur", ".register-form-step[data-step-number='${actualDataStep}'] :input:not(button)`, function () {
		emptyFieldsQty = 0;
		$.each($(`.register-form-step[data-step-number='${actualDataStep}'] :input:not(button)`), function () {
			if (!$(this).val()) {
				emptyFieldsQty++;
			}
		});
		if (emptyFieldsQty == 0) {
			$(".business-features-footer button.form-next-step").removeAttr("disabled");
		} else {
			$(".business-features-footer button.form-next-step").attr("disabled", "true");
		}
	});

	// Goes a step further
	function formNextStep() {
		// Animates the actual panel with slideOutLeft
		$(`.register-form-step[data-step-number='${actualDataStep}']`).addClass("animated slideOutLeft faster").one("animationend", function () {
			// Removes the animation classes from the panel and then hide
			$(this).removeClass("animated slideOutLeft faster")
			$(this).hide();
			actualDataStep++;

			// Activates the current progress circle
			$("#register-business-form #progress-counter-container .progress-bar li").eq(actualDataStep - 1).addClass("active");

			// Changes the progress label accordingly to the current form step
			$("#progress-counter-container .progress-counter-label").text($(`.register-form-step[data-step-number='${actualDataStep}']`).data("step-label"));

			// Animates the new panel with slideInRight
			$(`.register-form-step[data-step-number='${actualDataStep}']`).show().addClass("animated slideInRight faster").one("animationend", function () {
				$(this).removeClass("animated slideInRight faster")
			});
		});
	}

	// Goes a step back
	function formPreviousStep() {
		// Animates the current panel with slideOutRight
		$(`.register-form-step[data-step-number='${actualDataStep}']`).addClass("animated slideOutRight faster").one("animationend", function () {
			// Removes the animation classes from the panel and then hide
			$(this).removeClass("animated slideOutRight faster");
			$(this).hide();

			// Activates the current progress circle
			$("#register-business-form #progress-counter-container .progress-bar li").eq(actualDataStep - 1).removeClass("active");

			// Changes the progress label accordingly to the current form step
			$("#progress-counter-container .progress-counter-label").text($(`.register-form-step[data-step-number='${actualDataStep}']`).data("step-label"));

			actualDataStep--;
			// Animates the new panel with slideInLeft
			$(`.register-form-step[data-step-number='${actualDataStep}']`).show().addClass("animated slideInLeft faster").one("animationend", function () {
				$(this).removeClass("animated slideInRight faster");
			});
		});
	}
	
	$("#cep").blur(function() {
		const cep = {};
		if (cep != ""){
			cep.digits = $(this).val().replace(/\D/g, '');
			$.getJSON("https://viacep.com.br/ws/"+ cep.digits +"/json/?callback=?", function(dados) {
				if (!("erro" in dados)) {
					$("#address").val(dados.logradouro +", "+ dados.bairro);
					$("#uf-city").val(dados.localidade + "/" + dados.uf);
					$("#div-uf-city").css("display", "block");
					$("#uf-city").focus();
				} else {
					$("#cep-div").addClass("mdc-text-field--invalid");
					$("#cep").focus();
				}
            });
		}
	});
	

	if ($(`.business-features-footer .form-next-step`).length) {
		$(document).on("click", `.form-next-step`, () => { formNextStep() });
	}
	if ($(`.business-features-footer .form-previous-step`).length) {
		$(document).on("click", `.form-previous-step`, () => { formPreviousStep() });
	}

	// Prevent form submission by pressing ENTER
	$(window).keydown(function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			if (
				$(`.register-form-step[data-step-number='${actualDataStep}'] .business-features-footer button.form-next-step:disabled`).length < 1 &&
				$(`.register-form-step[data-step-number='${actualDataStep}']`).hasClass("animated") == false
			) {
				formNextStep();
			}
			return false;
		}
	});

	$(document).on("change", $("[data-step-number='3'] input[type='checkbox']"), function () {
		if ($(".register-form-step[data-step-number='3'] input[type='checkbox']:checked").length > 0) {
			$(".register-form-step[data-step-number='3'] .payment-method-footer button[type='submit']").removeAttr("disabled");
		} else {
			$(".register-form-step[data-step-number='3'] .payment-method-footer button[type='submit']").attr("disabled", "true");
		}
	});

	
	placeholderText = [
		"Garanta hoje mesmo a visibilidade que sua empresa precisa!",
		"Interaja em tempo real com seus clientes",
		"O HelpMyTime facilita o gerenciamento do seu empreendimento",
		"Agende, consulte e publique facilmente seus horários de atendimento"
	];

	// Typewriter effect
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function typewriter(array) {
		for (var y = 0; y < array.length; y++) {
			var placeholder = "";
			for (var i = 0; i < array[y].length; i++) {
				placeholder += array[y].charAt(i);
				$("#header-container .container-subtitle").html(placeholder);
				// Pause between letters
				await sleep(50);
			}
			// Pause between words
			await sleep(2000);
		}
		// Pause between loops
		await sleep(3000);
		typewriter(placeholderText);
	}
	typewriter(placeholderText);
	
});
