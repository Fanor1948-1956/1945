
export function validateFormData(formData, requiredFields) {
  for (let field of requiredFields) {
    if (!formData[field]) {
      return { valid: false, message: `El campo ${field} es obligatorio.` };
    }
  }
  return { valid: true, message: '' };
}
