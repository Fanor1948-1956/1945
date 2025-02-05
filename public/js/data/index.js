export const cardsData = [
  { title: 'Tarjeta 1', formHTML: '<p>Contenido del formulario 1</p>' },
  { title: 'Tarjeta 2', formHTML: '<p>Contenido del formulario 2</p>' },
  { title: 'Tarjeta 3', formHTML: '<p>Contenido del formulario 3</p>' },
  { title: 'Tarjeta 4', formHTML: '<p>Contenido del formulario 4</p>' },
];

export const cardsDataMedia = [
  {
    title: 'Generales',
    content: '<p>Serviicos a tu alcance</p>',
    media: {
      type: 'image', // Si es imagen, usa una URL de imagen real
      src: 'https://www.w3schools.com/html/img_girl.jpg',
      alt: 'Imagen de servicios médicos',
    },
  },
  {
    title: 'Por Especialidad',
    content: '<p>Especialidades médicas en línea</p>',
    media: {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  },
  {
    title: 'Por Médico',
    content: '<p>Esta tarjeta no tiene contenido multimedia.</p>',
    media: null, // ❗ Especifica que NO hay contenido multimedia
  },
];


export const cardsDataMediaSpeciality = [
  {
    title: 'Generales',
    content: '<p>Serviicos a tu alcance</p>',
    media: {
      type: 'image', // Si es imagen, usa una URL de imagen real
      src: 'https://www.w3schools.com/html/img_girl.jpg',
      alt: 'Imagen de servicios médicos',
    },
  },
  {
    title: 'Por Especialidad',
    content: '<p>Especialidades médicas en línea</p>',
    media: {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  },
  {
    title: 'Por Médico',
    content: '<p>Esta tarjeta no tiene contenido multimedia.</p>',
    media: null, // ❗ Especifica que NO hay contenido multimedia
  },
];
