export default {
  name: 'process',
  title: 'My Approach (Process)',
  type: 'document',
  fields: [
    // Головний заголовок секції
    { name: 'mainTitle_ua', title: 'Заголовок секції (UA)', type: 'string', initialValue: 'Мій підхід' },
    { name: 'mainTitle_pl', title: 'Nagłówek sekcji (PL)', type: 'string', initialValue: 'Moje podejście' },
    { name: 'mainTitle_en', title: 'Main Title (EN)', type: 'string', initialValue: 'My Approach' },

    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            // Заголовок етапу
            { name: 'title_ua', title: 'Назва етапу (UA)', type: 'string' },
            { name: 'title_pl', title: 'Tytuł kroku (PL)', type: 'string' },
            { name: 'title_en', title: 'Step Title (EN)', type: 'string' },

            // Опис етапу
            { name: 'description_ua', title: 'Опис етапу (UA)', type: 'text' },
            { name: 'description_pl', title: 'Opis kroku (PL)', type: 'text' },
            { name: 'description_en', title: 'Description (EN)', type: 'text' },

            // Іконка
            { 
              name: 'icon', 
              title: 'Icon Type', 
              type: 'string', 
              options: { 
                list: [
                  { title: 'Idea (Lightbulb)', value: 'lightbulb' },
                  { title: 'Design (Palette)', value: 'palette' },
                  { title: 'Development (Code)', value: 'code' },
                  { title: 'Launch (Rocket)', value: 'rocket' },
                ] 
              } 
            },
          ],
          preview: {
            select: {
              title: 'title_ua',
              subtitle: 'description_ua'
            }
          }
        }
      ]
    }
  ],
}