window.mdc.autoInit(document, () => { });

$(function () {
	$(document).on("click", ".add-service-btn", () => {
		$("body").append(`
			<div id="add-service-dialog" class="mdc-dialog" role="alertdialog" aria-modal="true">
				<div class="mdc-dialog__container">
					<div class="mdc-dialog__surface">
						<h2 class="mdc-dialog__title">Adicionar serviço</h2>
						<div class="mdc-dialog__content">
							<form id="add-service-form" action="/dashboard/cadastrar-servico" method="post">
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="text" name="name" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Nome do serviço</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-select" data-mdc-auto-init="MDCSelect">
									<i class="mdc-select__dropdown-icon"></i>
									<select class="mdc-select__native-control" name="category" required>
										<option value="" disabled selected></option>
										<option value="categoria1">Categoria 1</option>
										<option value="categoria2">Categoria 2</option>
										<option value="categoria3">Categoria 3</option>
									</select>
									<label class="mdc-floating-label">Categoria</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-text-field mdc-text-field--textarea" data-mdc-auto-init="MDCTextField">
									<textarea name="description" class="mdc-text-field__input" required></textarea>
									<div class="mdc-notched-outline">
										<div class="mdc-notched-outline__leading"></div>
										<div class="mdc-notched-outline__notch">
											<label for="textarea" class="mdc-floating-label">Descrição do serviço</label>
										</div>
										<div class="mdc-notched-outline__trailing"></div>
									</div>
								</div>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="number" step="any" name="price" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Preço (em reais)</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="number" step="any" name="duration" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Duração do atendimento</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<h4 class="form-section-title">Horário de atendimento</h4>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="time" name="start_time" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Inicio do atendimento</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="time" name="end_time" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Término do atendimento</label>
									<div class="mdc-line-ripple"></div>
								</div>
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
		addServiceDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#add-service-dialog"));
		addServiceDialog.open();

		$("#add-service-dialog").on("MDCDialog:closed", function (e) {
			$(this).remove();
		})
	});

	// Sets the name of each row
	$.each($(".mdc-table tr td"), function () {
		$(this).attr("data-label", $(this).closest("table").children("thead").find("th").eq($(this).index()).html());
	});

	// Expand/collpases rows
	$(document).on("click", ".toggle-table-row", (e) => {
		if ($(e.target).closest("tr").children("[data-label]:not(:first-child)").css("display") == "none") {
			$(e.target).closest("tr").children("[data-label]:not(:first-child)").css("display", "flex");
			$(e.target).closest(".toggle-table-row").addClass("toggled-table-row");
		} else if ($(e.target).closest("tr").children("[data-label]:not(:first-child)").css("display") == "flex") {
			$(e.target).closest("tr").children("[data-label]:not(:first-child)").css("display", "none");
			$(e.target).closest(".toggle-table-row").removeClass("toggled-table-row");
		}
	});

	// Adjust table layout on resize
	$(window).on("resize", () => {
		if ($(window).width() >= 800) {
			$("[data-label]:not(:first-child)").removeAttr("style");
			$(".toggle-table-row").removeClass("mdc-icon-button--on");
		}
	});
})