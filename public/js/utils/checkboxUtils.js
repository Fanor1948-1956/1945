// js/utils/checkboxUtils.js

export const toggleCheckboxes = (containerId, assignedIds) => {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]`
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = assignedIds.includes(checkbox.value);
  });
};
