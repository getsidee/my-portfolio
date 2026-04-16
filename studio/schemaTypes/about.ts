export default {
  name: 'about',
  title: 'About Me Section',
  type: 'document',
  fields: [
    // Заголовки секції для різних мов
    { name: 'title_ua', title: 'Заголовок секції (UA)', type: 'string' },
    { name: 'title_pl', title: 'Tytuł sekcji (PL)', type: 'string' },
    { name: 'title_en', title: 'Section Title (EN)', type: 'string' },
    
    // Біографія для різних мов
    { name: 'bio_ua', title: 'Біографія (UA)', type: 'text' },
    { name: 'bio_pl', title: 'Biografia (PL)', type: 'text' },
    { name: 'bio_en', title: 'Biography (EN)', type: 'text' },
    
    { 
      name: 'skills', 
      title: 'Skills List', 
      type: 'array', 
      of: [{ type: 'string' }],
      description: 'Технології (React, Node.js тощо) — спільні для всіх мов'
    },
  ],
}