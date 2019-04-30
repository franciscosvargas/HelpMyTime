$(document).on("click", "#add-to-schedule", () => { openDialogAddSchedule() });
var services = [];

$.get("/dashboard/getlistaservicos", function (resultado) {
	services = resultado;
	console.log(resultado);
});

$(function () {
	// Initialize category slider when less is done loading stylesheets
	less.pageLoadFinished.then(() => {
		$("#schedule-carousel").flickity({
			cellAlign: "center",
			draggable: true,
			freeScroll: true,
			contain: true,
			pageDots: false
		});
		$("#schedule-carousel").flickity("resize");
	});
	// Resizes flickity container whenever the page is resized
	$(window).on("resize", function () {
		$("#schedule-carousel").flickity("resize");
	});

	$("#view-schedule-dialog").on("MDCDialog:closed", () => { $("#view-schedule-dialog").html("") });
});

function openDialogAddSchedule() {
	$("body").append(`
		<div id="add-schedule-dialog" class="mdc-dialog" role="alertdialog" aria-modal="true">
		<div class="mdc-dialog__container">
			<div class="mdc-dialog__surface">
				<h2 class="mdc-dialog__title">Adicionar horário</h2>
					<div class="mdc-dialog__content">
						<form id="add-service-form" action="/dashboard/cadastrar-horario" method="post">
							<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
								<input type="time" name="time" class="mdc-text-field__input" required>
								<label class="mdc-floating-label">Horário:</label>
								<div class="mdc-line-ripple"></div>
							</div>
							<h4 class="form-section-title">Aplicar Horário em:</h4>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=0
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Domingo</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=1
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Segunda-Feira</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=2
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Terça-Feira</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=3
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Quarta-Feira</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=4
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Quinta-Feira</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=5
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Sexta-Feira</label>
								</div><br>
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input type="checkbox" name="days" value=6
											class="mdc-checkbox__native-control">
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59" />
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
									</div>
									<label for="checkbox-1">Sábado</label>
								</div><br>
							<h4 class="form-section-title">Serviços disponíveis nesse horário</h4>
							<div id="services"></div>
						</form>
					</div>
					<footer class="mdc-dialog__actions">
						<button type="reset" form="add-service-forme" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
							<span class="mdc-button__label">Cancelar</span>
						</button>
						<button type="submit" form="add-service-form" class="mdc-button mdc-dialog__button">
							<span class="mdc-button__label">Confirmar</span>
						</button>
					</footer>
				</div>
			</div>
			<div class="mdc-dialog__scrim"></div>
		</div>
	`);

	window.mdc.autoInit(document, () => { });
	addScheduleDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#add-schedule-dialog"));
	addScheduleDialog.open();
	services.forEach(function (item) {
		$("#services").append(`
			<div class="mdc-form-field">
				<div class="mdc-checkbox">
					<input type="checkbox" name="services" value="${item._id}"
						class="mdc-checkbox__native-control">
					<div class="mdc-checkbox__background">
						<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
							<path class="mdc-checkbox__checkmark-path" fill="none"
								d="M1.73,12.91 8.1,19.28 22.79,4.59" />
						</svg>
						<div class="mdc-checkbox__mixedmark"></div>
					</div>
				</div>
				<label for="checkbox-1">${item.name}</label>
			</div><br>
		`);
	});

	$("#add-schedule-dialog").on("MDCDialog:closed", () => { $(this).remove() });
}


function openDialogViewSchedule(id, time, client, phone) {
	$("#view-schedule-dialog").remove();
	$.get("/dashboard/getservicohorario/" + id, function (resultado) {
		$("body").append(`
		<div id="view-schedule-dialog" class="mdc-dialog" role="alertdialog" aria-modal="true">
		<div class="mdc-dialog__container">
			<div class="mdc-dialog__surface">
				<h2 class="mdc-dialog__title">Agendamento</h2>
					<div class="mdc-dialog__content">
						<div><strong>Horário:</strong> ${time}</div>
						<div><strong>Cliente:</strong> ${client}</div>
						<div><strong>Telefone do Cliente:</strong> ${phone}</div>
						<div><strong>Serviço:</strong> ${resultado.name}</div>
						<br>
						<div>*Caso precise desmarcar o horário, solicite reagendamento.</div>
					</div>
					<footer class="mdc-dialog__actions">
						<button onclick="reagendarHorario('${id}')" class="mdc-button mdc-dialog__button" >
							<span class="mdc-button__label">Solicitar Reagendamento</span>
						</button>
						<button id="btnfechar" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="closed">
							<span class="mdc-button__label">fechar</span>
						</button>
					</footer>
				</div>
			</div>
			<div class="mdc-dialog__scrim"></div>
		</div>
	`);


		window.mdc.autoInit(document, () => { });
		viewScheduleDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#view-schedule-dialog"));
		viewScheduleDialog.open();
		$('#btnfechar').focus();

	});

}

function reagendarHorario(id) {

	console.log('Reagendar serviço:' + id);

	$.post("/dashboard/reagendar", {
		id: id
	}, function (msg) {
		let apagar = `#${id}`;
		$(apagar).remove();
		viewScheduleDialog.close();
		swal("Sucesso!", "Horário desmarcado e excluído com sucesso.\nO cliente foi informado via e-mail.", "success");
	})

}