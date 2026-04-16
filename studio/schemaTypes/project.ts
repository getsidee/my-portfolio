export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Назва проєкту (UA, PL, EN)
    { name: 'title_ua', title: 'Назва (UA)', type: 'string' },
    { name: 'title_pl', title: 'Tytuł (PL)', type: 'string' },
    { name: 'title_en', title: 'Title (EN)', type: 'string' },
    
    // Опис проєкту (UA, PL, EN)
    { name: 'description_ua', title: 'Опис (UA)', type: 'text' },
    { name: 'description_pl', title: 'Opis (PL)', type: 'text' },
    { name: 'description_en', title: 'Description (EN)', type: 'text' },
    
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },
    {
      name: 'github',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'accent',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue (Primary)', value: 'primary' },
          { title: 'Green (Emerald)', value: 'emerald' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Pink (Accent)', value: 'accent' },
        ],
      },
    },
  ],
}