import project from './project'
import about from './about'
import hero from './hero'
import contact from './contact'
import experience from './experience'
import process from './process'
import services from './services'
import testimonials from './testimonials' // 1. Імпортуємо схему відгуків

// 2. Додаємо її в масив
export const schemaTypes = [
  hero, 
  about, 
  project, 
  contact, 
  experience, 
  process, 
  services, 
  testimonials // <--- Додано сюди
]