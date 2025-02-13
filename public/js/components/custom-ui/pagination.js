// 📌 Función de paginación dinámica
export function customPaginationUi(container, items, renderFunction, itemsPerPage = 12) {
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  function renderPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    const modalBody = document.querySelector('.customModal-body');
    modalBody.innerHTML = '';
    modalBody.appendChild(renderFunction(paginatedItems));

    updatePaginationUI();
  }

  function updatePaginationUI() {
    paginationContainer.innerHTML = '';

    paginationContainer.appendChild(
      createButton('««', () => renderPage(1), currentPage === 1)
    );
    paginationContainer.appendChild(
      createButton('«', () => renderPage(currentPage - 1), currentPage === 1)
    );

    const pageButtons = getPageButtons();
    pageButtons.forEach((btn) => paginationContainer.appendChild(btn));

    paginationContainer.appendChild(
      createButton(
        '»',
        () => renderPage(currentPage + 1),
        currentPage === totalPages
      )
    );
    paginationContainer.appendChild(
      createButton(
        '»»',
        () => renderPage(totalPages),
        currentPage === totalPages
      )
    );
  }

  function getPageButtons() {
    const buttons = [];
    const maxVisiblePages = 5;
    const firstPages = [1, 2];
    const lastPages = [totalPages - 1, totalPages];
    const surroundingPages = [
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ].filter((p) => p > 1 && p < totalPages);

    const pagesToShow = [
      ...firstPages,
      '...',
      ...surroundingPages,
      '...',
      ...lastPages,
    ];

    let lastAdded = null;
    pagesToShow.forEach((p) => {
      if (p !== lastAdded) {
        buttons.push(p === '...' ? createEllipsis() : createPageButton(p));
        lastAdded = p;
      }
    });

    return buttons;
  }

  function createButton(text, onClick, disabled = false) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.className = 'pagination-btn';
    button.disabled = disabled;
    button.onclick = onClick;
    return button;
  }

  function createPageButton(page) {
    const button = createButton(page, () => renderPage(page));
    if (page === currentPage) button.classList.add('active');
    return button;
  }

  function createEllipsis() {
    const span = document.createElement('span');
    span.innerHTML = '...';
    span.className = 'pagination-ellipsis';
    return span;
  }

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';
  container.appendChild(paginationContainer);

  renderPage(1); // Activa la primera página por defecto
}
