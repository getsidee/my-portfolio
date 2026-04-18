export default {
  name: 'services',
  title: 'Послуги',
  type: 'document',
  fields: [
    {
      name: 'mainTitle_ua',
      title: 'Заголовок секції (UA)',
      type: 'string',
      initialValue: 'Послуги',
    },
    {
      name: 'mainTitle_pl',
      title: 'Nagłówek sekcji (PL)',
      type: 'string',
      initialValue: 'Usługi',
    },
    {
      name: 'mainTitle_en',
      title: 'Main Title (EN)',
      type: 'string',
      initialValue: 'Services',
    },
    {
      name: 'items',
      title: 'Список послуг',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title_ua', title: 'Назва (UA)', type: 'string' },
            { name: 'title_pl', title: 'Tytuł (PL)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            { name: 'desc_ua', title: 'Опис (UA)', type: 'text' },
            { name: 'desc_pl', title: 'Opis (PL)', type: 'text' },
            { name: 'desc_en', title: 'Description (EN)', type: 'text' },
            {
              name: 'icon',
              title: 'Іконка',
              type: 'string',
              options: {
                list: [
                  { title: 'Landing Page (Layout)', value: 'Layout' },
                  { title: 'Business Site (Globe)', value: 'Globe' },
                  { title: 'Animations (Zap)', value: 'Zap' },
                  { title: 'Personal/Blog (User)', value: 'UserCircle' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}