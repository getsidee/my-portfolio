import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio-admin',

  projectId: '6pwbz48s',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            // Singleton: Мій підхід
            S.listItem()
              .title('Мій підхід')
              .id('processSingleton')
              .child(
                S.document()
                  .schemaType('process')
                  .documentId('process')
              ),

            // Singleton: Послуги
            S.listItem()
              .title('Послуги')
              .id('servicesSingleton')
              .child(
                S.document()
                  .schemaType('services')
                  .documentId('services')
              ),

            // Singleton: Відгуки (ДОДАНО СЮДИ)
            S.listItem()
              .title('Відгуки')
              .id('testimonialsSingleton')
              .child(
                S.document()
                  .schemaType('testimonials')
                  .documentId('testimonials') // Фронтенд шукає саме цей ID
              ),
            
            S.divider(),

            // Додаємо 'testimonials' у фільтр, щоб не було дублів
            ...S.documentTypeListItems().filter(
              (listItem) => !['process', 'services', 'testimonials'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})