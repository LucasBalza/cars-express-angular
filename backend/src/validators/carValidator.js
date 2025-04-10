const validateCarData = (data) => {
  const errors = [];

  if (!data.brand || typeof data.brand !== 'string' || data.brand.trim() === '') {
    errors.push('La marque est requise');
  }

  if (!data.model || typeof data.model !== 'string' || data.model.trim() === '') {
    errors.push('Le modèle est requis');
  }

  if (!data.year || typeof data.year !== 'number' || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
    errors.push('L\'année doit être comprise entre 1900 et l\'année prochaine');
  }

  if (!data.color || typeof data.color !== 'string' || data.color.trim() === '') {
    errors.push('La couleur est requise');
  }

  if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
    errors.push('Le prix doit être supérieur à 0');
  }

  return errors;
};

module.exports = {
  validateCarData
}; 