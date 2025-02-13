export function generateMockItems(totalItems = 10) {
  console.log('totalItems: ', totalItems);
  const mockItems = [];
  for (let i = 0; i < totalItems; i++) {
    mockItems.push({
      avatarUrl: 'https://www.w3schools.com/html/img_girl.jpg',
      name: `Item ${i + 1}`,
      description: `Descripción para el item ${i + 1}`,
      date: `2025-02-05`,
    });
  }
  return mockItems;
}
