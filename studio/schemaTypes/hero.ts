export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    // Поля для Ролі (UA, PL, EN)
    { name: 'role_ua', title: 'Subtitle (UA)', type: 'string' },
    { name: 'role_pl', title: 'Subtitle (PL)', type: 'string' },
    { name: 'role_en', title: 'Subtitle (EN)', type: 'string' },
    
    { name: 'name', title: 'Full Name', type: 'string' },
    
    // Поля для Опису (UA, PL, EN)
    { name: 'description_ua', title: 'Hero Description (UA)', type: 'text' },
    { name: 'description_pl', title: 'Hero Description (PL)', type: 'text' },
    { name: 'description_en', title: 'Hero Description (EN)', type: 'text' },
    
    { name: 'github', title: 'GitHub URL', type: 'url' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'email', title: 'Email Address', type: 'string' },
  ],
}