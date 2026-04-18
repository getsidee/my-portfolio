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
            // Створюємо спеціальний пункт для "Мого підходу" (Singleton)
            S.listItem()
              .title('Мій підхід')
              .id('processSingleton')
              .child(
                S.document()
                  .schemaType('process')
                  .documentId('process') // Фіксуємо ID, щоб документ був один
              ),
            
            // Додаємо роздільник
            S.divider(),

            // Додаємо решту схем, крім 'process', щоб вони не дублювалися
            ...S.documentTypeListItems().filter(
              (listItem) => !['process'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})