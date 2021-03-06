$(function () {
	var categorias = [];
	$.get("/categorias/lista-categorias", function (resultado) {
		categorias = resultado;
	})

	$(document).on("click", ".add-service", () => {
		openDialog();
	});

	// Sets the name of each row
	$.each($(".mdc-table tr td"), function () {
		$(this).attr("data-label", $(this).closest("table").children("thead").find("th").eq($(this).index()).html());
	});

	$("#show-services tr td:last-child").on("click", function () {
		var id = this.id;
		$.get("/dashboard/getservico/" + id, function (resultado) {
			openDialogEdit(resultado);
		});
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

	function openDialog() {
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
									<select id="categories" class="mdc-select__native-control" name="category" required>
										<option value="" disabled selected></option>
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
		dialogSupport();
	}


	function openDialogEdit(service) {
		console.log(service);
		$("body").append(`
			<div id="add-service-dialog" class="mdc-dialog" role="alertdialog" aria-modal="true">
				<div class="mdc-dialog__container">
					<div class="mdc-dialog__surface">
						<h2 class="mdc-dialog__title">Adicionar serviço</h2>
						<div class="mdc-dialog__content">
							<form id="add-service-form" action="/dashboard/atualizar-servico" method="post">
								<input type="hidden" name="id" value="${service._id}" class="mdc-text-field__input" required>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="text" name="name" value="${service.name}" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Nome do serviço</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-select" data-mdc-auto-init="MDCSelect">
									<i class="mdc-select__dropdown-icon"></i>
									<select id="categories" class="mdc-select__native-control" name="category" required>
										<option selected>${service.category}</option>
									</select>
									<label class="mdc-floating-label">Categoria</label>
									<div class="mdc-line-ripple"></div>
								</div>
								<div class="mdc-text-field mdc-text-field--textarea" data-mdc-auto-init="MDCTextField">
									<textarea name="description"  class="mdc-text-field__input" required>${service.description}</textarea>
									<div class="mdc-notched-outline">
										<div class="mdc-notched-outline__leading"></div>
										<div class="mdc-notched-outline__notch">
											<label for="textarea" class="mdc-floating-label">Descrição do serviço</label>
										</div>
										<div class="mdc-notched-outline__trailing"></div>
									</div>
								</div>
								<div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
									<input type="number" value="${service.price}" step="any" name="price" class="mdc-text-field__input" required>
									<label class="mdc-floating-label">Preço (em reais)</label>
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
		dialogSupport();
	}

	function dialogSupport() {
		window.mdc.autoInit(document, () => { });
		addServiceDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#add-service-dialog"));
		addServiceDialog.open();

		categorias.forEach(function (item) {
			$("#categories").append("<option>" + item.name + "</option>");
		});
		$("#add-service-dialog").on("MDCDialog:closed", function (e) {
			$(this).remove();
		})
	}
})