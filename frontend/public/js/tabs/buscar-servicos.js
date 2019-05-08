filterSearchDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector("#filter-search-dialog"));
$(function () {
    $(document).on("click", ".filter-search-btn", function () {
        filterSearchDialog.open();
    });
    less.pageLoadFinished.then(() => {
        //searchContainerHeight = ($(".search-services-container").height() / 2) - 48;
        //$(".search-input-group").css("margin", `${searchContainerHeight}px auto 0`);
    });
    $(document).keypress(function(e) {
        if(e.which == 13) getServices($(".search-input-group input").val());
        if($(".search-input-group input").val() == "") $(".services-body").html("");
    });

    
});

async function getServices(keyword) {
    let services = [];
    await $.get(`getlistapesquisa/${keyword}`, function (resultado) {
        console.log(resultado.length);
        services = resultado;
    });

    $(".services-body").html("");
    services.forEach(function (service) {
        $(".services-body").append(`
            <div class="mdc-card">
                <div class="mdc-card__primary-action" data-mdc-auto-init="MDCRipple">
                    <div class="mdc-card-content">
                        <h2 class="card-content-headline mdc-typography--headline6">${service.name}</h2>
                        <div class="card-content-price">R$${service.price}</div>
                        <h3 class="card-content-author mdc-typography--subtitle2">Por ${service.owner_name}</h3>
                        <p class="card-content-description mdc-typography-body2">
                            ${service.description}
                        </p>
                    </div>
                </div>
                <div class="mdc-card__actions">
                    <div class="mdc-card__action-buttons">
                        <button onclick="window.location='/s/${service._id}';" class="mdc-button mdc-card__action mdc-card__action--button">
                            <span class="mdc-button__label">Visualizar</span>
                        </button>
                    </div>
                    <div class="mdc-card__action-icons">
                        <button class="mdc-icon-button mdc-card__action mdc-card__action--icon" title="Compartilhar">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `)
    });
}