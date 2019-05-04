const credentials = {
    brand: "",
    token: "",
    hash: ""
};

function initializePayment() {

    $.get("/dashboard/getsession", async (resultado) => {
        await PagSeguroDirectPayment.setSessionId(resultado);
        await getHash();
    });

    $("body").append(`
        <div id="dialog"  class="mdc-dialog" role="alertdialog" aria-modal="true">
        <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface">
                <p style="margin: 10px auto 0 auto; ">Ambiente protegido por:</p>
                <img style="width: 150px; height: 120px; margin: auto;"src="https://meetportugaltours.com/wp-content/uploads/2018/02/logo-pagseguro.png"></img>
                
                <div class="mdc-dialog__content" >
                    <form action="/adherence" method="POST" id="paymentinfo">
                        <h3 class="mdc-dialog__subtitle">Dados Pessoais</h3>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pname" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Nome Completo</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="email" name="pemail" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Email</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pphone" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Telefone</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pcpf" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">CPF</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <h3 class="mdc-dialog__subtitle">Endereço</h3>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="paddress" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Endereço</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pnumber" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Número</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pbairro" class="mdc-text-field__input"  required>
                            <label class="mdc-floating-label">Bairro</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pcomplement" class="mdc-text-field__input"required>
                            <label class="mdc-floating-label">Complemento</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pcity" class="mdc-text-field__input"  required>
                            <label class="mdc-floating-label">Cidade</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="puf" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Estado/UF (ex: SP)</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="number" name="pcep" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">CEP (somente números)</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <h3 class="mdc-dialog__subtitle">Cartão de Crédito</h3>
                        <div id="bandeira"></div>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="number" onblur="getBrand(this.value)" name="pcardnumber" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Número do cartão de crédito</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="number" name="pcvv" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Código de Segurança</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>

                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="number" name="pmonth" class="mdc-text-field__input"  required>
                            <label class="mdc-floating-label">Mês de Vencimento: (ex: 02)</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="number" onblur="getToken();" name="pyear" class="mdc-text-field__input"  required>
                            <label class="mdc-floating-label">Ano de Vencimento: (ex: 2026)</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pownername" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Nome impresso no cartão</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="date" name="pbirthday" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Data nascimento do propietário do cartão</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pphone2" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">Telefone do propietário do cartão</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div class="mdc-text-field" style="width: 100%;" data-mdc-auto-init="MDCTextField">
                            <input type="text" name="pcpf2" class="mdc-text-field__input" required>
                            <label class="mdc-floating-label">CPF do propietário do cartão</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                        <br><br>
                        <div>Ao clicar em pagar você autoriza a cobrança<br> mensal de <strong>R$9.99</strong> referente a <strong>Plano Empresarial</strong>.</div>
                                
                    </form>
                        </div>
                        <footer class="mdc-dialog__actions">
                            <button onclick="window.location='/dashboard/buscar-servicos';" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="closed" >
                                <span class="mdc-button__label">Cancelar</span>
                            </button>
                            <button onclick="fetchPayment()" id="btnpagar"  class="mdc-button mdc-dialog__button" >
                                <span class="mdc-button__label">Pagar</span>
                            </button>
                        </footer>
                    </div>
                
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
    `);

    /* Métodos de gerenciamento do dialog. */
    window.mdc.autoInit(document, () => { });
    dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#dialog"));
    dialog.open();
    $('#btnpagar').focus();
}

function getBrand(cardnumber) {
    PagSeguroDirectPayment.getBrand({
        cardBin: cardnumber.substring(0, 6),
        success: function (response) {
            credentials.brand = response.brand.name;
        }
    });
}

function getToken() {
    PagSeguroDirectPayment.createCardToken({
        cardNumber: $("[name=pcardnumber]").val(),
        brand: credentials.brand,
        cvv: $("[name=pcvv]").val(),
        expirationMonth: $("[name=pmonth]").val(),
        expirationYear: $("[name=pyear]").val(),
        success: async function (response) {
            credentials.token = response.card.token;
        }
    });
}

function getHash() {
    PagSeguroDirectPayment.onSenderHashReady(function (response) {
        if (response.status == 'error') {
            console.log(response.message);
            return false;
        }
        console.log(response.senderHash);
        credentials.hash = response.senderHash;
    });
}

async function fetchPayment() {

    if (credentials.brand == null) {
        await getBrand($("[name=pcardnumber]").val());
        await getToken();
    }

    if (credentials.token == null) {
        getToken();
    }

    const data = {
        "plan": "312409959F9FDDE444959F9C950201D7",
        "sender": {
            "name": $("[name=pname]").val(),
            "email": $("[name=pemail]").val(),
            "hash": credentials.hash,
            "phone": {
                "areaCode": $("[name=pphone]").val().substring(0, 2),
                "number": $("[name=pphone]").val().substring(2, 11)
            },
            "address": {
                "street": $("[name=paddress]").val(),
                "number": $("[name=pnumber]").val(),
                "complement": $("[name=pcomplement]").val(),
                "district": $("[name=pbairro]").val(),
                "city": $("[name=pcity]").val(),
                "state": $("[name=puf]").val(),
                "country": "BRA",
                "postalCode": $("[name=pcep]").val()
            },
            "documents": [{
                "type": "CPF",
                "value": $("[name=pcpf]").val()
            }]
        },
        "paymentMethod": {
            "type": "CREDITCARD",
            "creditCard": {
                "token": credentials.token,
                "holder": {
                    "name": $("[name=pownername]").val(),
                    "birthDate": $("[name=pbirthday]").val().split('-').reverse().join('/'),
                    "documents": [{
                        "type": "CPF",
                        "value": $("[name=pcpf2]").val()
                    }],
                    "phone": {
                        "areaCode": $("[name=pphone2]").val().substring(0, 2),
                        "number": $("[name=pphone2]").val().substring(2, 11)
                    }
                },
            }
        }

    }

    $.ajax({
        url: '/dashboard/adherence',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            console.log(msg);
        }
    });

    document.location.reload(true);



}


