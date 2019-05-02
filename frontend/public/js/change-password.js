window.mdc.autoInit();


function verify() {
    $.post("/conta/novasenha/send", {
        password: $("#password").val(),
        cpassword: $("#cpassword").val(),
        url: window.location.href
    }, function (msg) {
        if(msg == true) {
            swal("Sucesso!", "Senha Alterada com sucesso", "success")
                .then(() => {
                    window.location.replace(window.location.origin);
                });
        } else {
            swal("Oppss!", msg, "error");

        }
        
    })
}
