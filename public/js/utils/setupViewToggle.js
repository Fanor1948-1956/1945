// utility.js
export function setupViewToggle(
  cardViewBtn,
  tableViewBtn,
  renderItems,
  currentView,
  items,
  headers,
  currentPage,
  itemsPerPage,
  container,
  itemRenderer
) {
  cardViewBtn.addEventListener('click', () => {
    currentView = 'card';
    renderItems(
      currentView,
      items,
      headers,
      currentPage,
      itemsPerPage,
      container,
      itemRenderer
    );
  });

  tableViewBtn.addEventListener('click', () => {
    currentView = 'table';
    renderItems(
      currentView,
      items,
      headers,
      currentPage,
      itemsPerPage,
      container,
      itemRenderer
    );
  });
}
