const express = require('express');
const router = express.Router();


const items = [
  { title: 'Tarjeta 1', description: 'Descripción de la tarjeta 1' },
  { title: 'Tarjeta 2', description: 'Descripción de la tarjeta 2' },
  { title: 'Tarjeta 3', description: 'Descripción de la tarjeta 3' },
];
const navItems = [
  { path: '/dashboard', icon: '/icons/dashboard.svg', title: 'Dashboard' },
  { path: '/profile', icon: '/icons/profile.svg', title: 'Perfil' },
  { path: '/settings', icon: '/icons/settings.svg', title: 'Configuración' },
];


router.use((req, res, next) => {
  if (!req.session.authenticated) {
    return res.redirect('/login');
  }
  next();
});

router.get('/', (req, res) => {
  res.render('layouts/privateLayout.njk', {
    title: 'Dashboard privado',

    navItems: navItems,
  });
});

module.exports = router;
