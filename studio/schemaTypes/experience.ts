export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    // Роль/Посада
    { name: 'role_ua', title: 'Роль/Посада (UA)', type: 'string' },
    { name: 'role_pl', title: 'Rola/Stanowisko (PL)', type: 'string' },
    { name: 'role_en', title: 'Role/Position (EN)', type: 'string' },
    
    { name: 'company', title: 'Company', type: 'string' }, // Назва компанії зазвичай однакова
    
    // Період
    { name: 'period_ua', title: 'Період (UA)', type: 'string', description: 'напр. 2023 - Тепер' },
    { name: 'period_pl', title: 'Okres (PL)', type: 'string', description: 'np. 2023 - Obecnie' },
    { name: 'period_en', title: 'Period (EN)', type: 'string', description: 'e.g. 2023 - Present' },

    // Опис
    { name: 'description_ua', title: 'Опис (UA)', type: 'text' },
    { name: 'description_pl', title: 'Opis (PL)', type: 'text' },
    { name: 'description_en', title: 'Description (EN)', type: 'text' },

    {
      name: 'color',
      title: 'Dot Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'bg-primary' },
          { title: 'Green', value: 'bg-emerald' },
          { title: 'Amber', value: 'bg-amber' },
          { title: 'Rose', value: 'bg-rose' },
        ],
      },
    },
    { name: 'order', title: 'Order Number', type: 'number' },
  ],
}