window.mdc.autoInit();

function showSnackBar(message){
	const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
	snackbar.labelText = message;
	snackbar.actionButtonText = "ok";
	snackbar.open();
}