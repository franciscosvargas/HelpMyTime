$("#search").keypress(function() {
    getServices($(this).val());
  });
    


async function getServices(keyword) {
    let services = [];
    await $.get(`/dashboard/getlistapesquisa/${keyword}`, function (resultado) {
        services = resultado;
    });

    $('.services-container').empty();
    services.forEach(function (service) {
        $('.services-container').append(`
            <div class="mdc-card">
                <div class="mdc-card__primary-action" data-mdc-auto-init="MDCRipple">
                    <div class="mdc-card-content">
                        
                        <h2 class="card-content-headline mdc-typography--headline6">${service.name}</h2>
                        <div class="card-content-price">R$${service.price}</div>
                        <h3 class="card-content-author mdc-typography--subtitle2">${service.owner}</h3>
                        <p class="card-content-description mdc-typography-body2">
                            ${service.description}
                        </p>
                        <div class="mdc-chip">
                            <div class="mdc-chip__text">${service.category}</div>
                        </div>
                    </div>
                </div>
                <div class="mdc-card__actions">
                    <div class="mdc-card__action-buttons">
                        <button class="mdc-button mdc-card__action mdc-card__action--button">
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