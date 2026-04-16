export default {
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    // Опис секції контактів (UA, PL, EN)
    { name: 'description_ua', title: 'Опис контактів (UA)', type: 'text' },
    { name: 'description_pl', title: 'Opis kontaktów (PL)', type: 'text' },
    { name: 'description_en', title: 'Contact Description (EN)', type: 'text' },
    
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'github', title: 'GitHub URL', type: 'url' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
  ],
}