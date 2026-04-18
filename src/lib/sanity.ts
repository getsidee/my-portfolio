import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"; // 1. Імпортуємо білдер

export const client = createClient({
  projectId: "6pwbz48s", 
  dataset: "production",
  useCdn: false, // Змінено на false для швидкого оновлення контенту
  apiVersion: "2024-04-15",
});

// 2. Ініціалізуємо білдер
const builder = imageUrlBuilder(client);

// 3. Експортуємо функцію для генерації URL зображень
export function urlFor(source: any) {
  return builder.image(source);
}