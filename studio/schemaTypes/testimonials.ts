import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Відгуки',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Список відгуків',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Ім’я клієнта', type: 'string' }),
            defineField({ name: 'position_ua', title: 'Посада/Компанія (UA)', type: 'string' }),
            defineField({ name: 'position_pl', title: 'Stanowisko/Firma (PL)', type: 'string' }),
            defineField({ name: 'position_en', title: 'Position (EN)', type: 'string' }),
            defineField({ name: 'text_ua', title: 'Відгук (UA)', type: 'text' }),
            defineField({ name: 'text_pl', title: 'Opinia (PL)', type: 'text' }),
            defineField({ name: 'text_en', title: 'Review (EN)', type: 'text' }),
            defineField({ 
              name: 'avatar', 
              title: 'Фото клієнта', 
              type: 'image', 
              options: { hotspot: true } 
            }),
            defineField({ 
              name: 'rating', 
              title: 'Рейтинг (1-5)', 
              type: 'number', 
              validation: (Rule) => Rule.min(1).max(5) 
            }),
          ],
        },
      ],
    }),
  ],
})