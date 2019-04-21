editNameDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#edit-name-dialog"));
editEmailDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#edit-email-dialog"));
editPasswordDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#edit-password-dialog"));

$(document).on("click", ".edit-name-btn", () => { editNameDialog.open() });
$(document).on("click", ".edit-email-btn", () => { editEmailDialog.open() });
$(document).on("click", ".edit-password-btn", () => { editPasswordDialog.open() });