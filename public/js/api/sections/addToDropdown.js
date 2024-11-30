// js/dropdown.js
import { generateRandomClinicIcon } from '../../utils/icons.js'
import { saveSections } from './storage.js' // Asegura que `saveSections` esté importado

// Inicializa el dropdown
export function initializeDropdown (dropdownId, triggerButtonId) {
  const dropdown = document.getElementById(dropdownId)
  const triggerButton = document.getElementById(triggerButtonId)

  triggerButton.addEventListener('click', () => {
    dropdown.style.display =
      dropdown.style.display === 'none' ? 'block' : 'none'
  })
}

// Agrega un ítem al dropdown
export function addToDropdown (sectionId, title) {
  const li = document.createElement('li')
  const icon = generateRandomClinicIcon(title)
  li.innerHTML = `
    <button data-id="${sectionId}" class="buttonIcon" onclick="toggleVisibility('${sectionId}')">
      ${icon}
    </button>
    <span>${title}</span>
  `
  document.getElementById('dropdownList').appendChild(li)
}
