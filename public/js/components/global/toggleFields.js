function toggleFields() {
  const roleSelect = document.getElementById('items-select');
  const specialtyContainer = document.getElementById('specialty-container');
  const scheduleContainer = document.getElementById('schedule-container');
  const selectedRole = roleSelect.value;

  
  if (selectedRole === 'Doctor' || selectedRole === 'ChiefMedical') {
    specialtyContainer.style.display = 'block';
    scheduleContainer.style.display = 'block';
  } else {
    specialtyContainer.style.display = 'none';
    scheduleContainer.style.display = 'none';
  }
}
