import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: {
          // Navbar
          nav_about: "O mnie",
          nav_projects: "Projekty",
          nav_experience: "Doświadczenie",
          nav_process: "Podejście", // ДОДАНО
          nav_contact: "Kontakt",
          // Hero
          hero_student: "Student I roku",
          hero_description: "Jestem studentem Uniwersytetu Ekonomicznego w Poznaniu na kierunku Informatyka i analityka danych. Moje wcześniejsze doświadczenia zawodowe nauczyły mnie świetnej organizacji pracy i komunikacji. Obecnie w pełni skupiam się na technologiach: koduję w Pythonie i technologiach webowych (HTML/CSS), uczę się Javy i tworzę estetyczne projekty graficzne.",
          hero_more: "Dowiedz się więcej",
          // About
          about_text_1: "Cześć, jestem Bohdan! 🚀\n\nStudiuję Informatykę i analitykę danych na UEP w Poznaniu. Pasjonuję się nowymi technologiami i analityką. Posiadam praktyczne umiejętności z zakresu front-endu (HTML/CSS), podstaw Pythona i Javy, a także montażu oraz obróbki graficznej (Adobe).",
          about_text_2: "Pasjonuję się czystym kodem, wydajnością i doświadczeniem użytkownika.",
          download_cv: "Pobierz CV",
          skills_frontend: "Frontend",
          skills_backend: "Backend",
          skills_tools: "Narzędzia",
          // Projects
          proj_title_1: "Platforma E-Commerce",
          proj_desc_1: "W pełni funkcjonalny sklep internetowy z koszykiem, płatnościami i panelem administracyjnym.",
          proj_title_2: "Menedżer Zadań",
          proj_desc_2: "Tablica Kanban do zarządzania zadaniami z drag-and-drop w czasie rzeczywistym.",
          proj_title_3: "Aplikacja Pogodowa",
          proj_desc_3: "Aplikacja prognozy pogody z geolokalizacją i pięknymi animacjami.",
          proj_title_4: "Blog CMS",
          proj_desc_4: "System zarządzania treścią z edytorem markdown i optymalizacją SEO.",
          // Experience
          exp_role_1: "Senior Frontend Developer",
          exp_period_1: "2022 — obecnie",
          exp_desc_1: "Tworzenie i utrzymanie aplikacji klienckich w React i TypeScript. Mentoring junior developerów.",
          exp_role_2: "Fullstack Developer",
          exp_period_2: "2020 — 2022",
          exp_desc_2: "Budowanie MVP od zera: frontend na Next.js, backend na Node.js, deploy na AWS.",
          exp_role_3: "Junior Developer",
          exp_period_3: "2019 — 2020",
          exp_desc_3: "Tworzenie stron landing page, integracja API, praca z CMS WordPress.",
          // Contact
          contact_description: "Chcesz omówić projekt lub po prostu się przywitać? Napisz do mnie — zawsze chętnie poznaję nowych ludzi i ciekawe wyzwania.",
          contact_placeholder_name: "Twoje imię",
          contact_placeholder_email: "Email",
          contact_placeholder_message: "Wiadomość",
          contact_button_send: "Wyślij",
          contact_status_sending: "Wysyłanie...",
          contact_status_success: "Wiadomość wysłana pomyślnie!",
          contact_status_error: "Błąd podczas wysyłania. Spróbuj ponownie.",
          contact_status_something_wrong: "Coś poszło nie tak...",
          // Footer
          footer_rights: "Wszelkie prawa zastrzeżone.",
          footer_built_with: "Zbudowane z",
          footer_and: "i"
        }
      },
      ua: {
        translation: {
          nav_about: "Про мене",
          nav_projects: "Проєкти",
          nav_experience: "Досвід",
          nav_process: "Підхід", // ДОДАНО
          nav_contact: "Контакти",
          hero_student: "Студент I курсу",
          hero_description: "Я студент Познанського економічного університету за спеціальністю «Інформатика та аналітика даних». Мій попередній професійний досвід навчив мене чудовій організації праці та комунікації. Зараз я повністю зосереджений на технологіях: програмую на Python та веб-технологіях (HTML/CSS), вивчаю Java та створюю естетичні графічні проєкти.",
          hero_more: "Дізнатися більше",
          about_text_1: "Привіт, я Богдан! 🚀\n\nНавчаюся на спеціальності «Інформатика та аналітика даних» в UEP у Познані. Захоплююся новими технологіями та аналітикою. Маю практичні навички у фронтенді (HTML/CSS), основи Python та Java, а також займаюся монтажем та графічною обробкою (Adobe).",
          about_text_2: "Я ціную чистий код, продуктивність та якісний користувацький досвід.",
          download_cv: "Завантажити CV",
          skills_frontend: "Фронтенд",
          skills_backend: "Бекенд",
          skills_tools: "Інструменти",
          proj_title_1: "E-Commerce Платформа",
          proj_desc_1: "Повнофункціональний інтернет-магазин з кошиком, платежами та панеллю адміністратора.",
          proj_title_2: "Менеджер Завдань",
          proj_desc_2: "Канбан-дошка для управління завданнями з drag-and-drop у реальному часі.",
          proj_title_3: "Додаток Погоди",
          proj_desc_3: "Прогноз погоди з геолокацією та красивими анімаціями.",
          proj_title_4: "Blog CMS",
          proj_desc_4: "Система управління контентом з markdown-редактором та SEO-оптимізацією.",
          exp_role_1: "Senior Frontend Розробник",
          exp_period_1: "2022 — зараз",
          exp_desc_1: "Розробка та підтримка клієнтських додатків на React та TypeScript. Менторство джуніор розробників.",
          exp_role_2: "Fullstack Розробник",
          exp_period_2: "2020 — 2022",
          exp_desc_2: "Створення MVP з нуля: фронтенд на Next.js, бекенд на Node.js, деплой на AWS.",
          exp_role_3: "Junior Розробник",
          exp_period_3: "2019 — 2020",
          exp_desc_3: "Створення лендінгів, інтеграція API, робота з CMS WordPress.",
          contact_description: "Хочете обговорити проєкт чи просто привітатися? Напишіть мені — завжди радий новим знайомствам та цікавим викликам.",
          contact_placeholder_name: "Ваше ім'я",
          contact_placeholder_email: "Email",
          contact_placeholder_message: "Повідомлення",
          contact_button_send: "Надіслати",
          contact_status_sending: "Надсилання...",
          contact_status_success: "Повідомлення успішно надіслано!",
          contact_status_error: "Помилка при надсиланні. Спробуйте ще раз.",
          contact_status_something_wrong: "Щось пішло не так...",
          footer_rights: "Усі права захищені.",
          footer_built_with: "Зроблено з",
          footer_and: "та"
        }
      },
      en: {
        translation: {
          nav_about: "About me",
          nav_projects: "Projects",
          nav_experience: "Experience",
          nav_process: "Approach", // ДОДАНО
          nav_contact: "Contact",
          hero_student: "1st year student",
          hero_description: "I am a student at the Poznań University of Economics and Business, majoring in Informatics and Data Analytics. My previous professional experience has taught me great work organization and communication. Currently, I am fully focused on technologies: coding in Python and web technologies (HTML/CSS), learning Java, and creating aesthetic graphic designs.",
          hero_more: "Learn more",
          about_text_1: "Hi, I'm Bohdan! 🚀\n\nI study Informatics and Data Analytics at UEP in Poznań. I am passionate about new technologies and analytics. I have practical skills in front-end (HTML/CSS), basics of Python and Java, as well as video editing and graphic processing (Adobe).",
          about_text_2: "I am passionate about clean code, performance, and user experience.",
          download_cv: "Download CV",
          skills_frontend: "Frontend",
          skills_backend: "Backend",
          skills_tools: "Tools",
          proj_title_1: "E-Commerce Platform",
          proj_desc_1: "Fully functional online store with shopping cart, payments, and admin panel.",
          proj_title_2: "Task Manager",
          proj_desc_2: "Kanban board for task management with real-time drag-and-drop.",
          proj_title_3: "Weather App",
          proj_desc_3: "Weather forecast app with geolocation and beautiful animations.",
          proj_title_4: "Blog CMS",
          proj_desc_4: "Content management system with markdown editor and SEO optimization.",
          exp_role_1: "Senior Frontend Developer",
          exp_period_1: "2022 — present",
          exp_desc_1: "Developing and maintaining client applications in React and TypeScript. Mentoring junior developers.",
          exp_role_2: "Fullstack Developer",
          exp_period_2: "2020 — 2022",
          exp_desc_2: "Building MVPs from scratch: frontend on Next.js, backend on Node.js, deploy on AWS.",
          exp_role_3: "Junior Developer",
          exp_period_3: "2019 — 2020",
          exp_desc_3: "Creating landing pages, API integration, working with CMS WordPress.",
          contact_description: "Want to discuss a project or just say hi? Write to me — I'm always happy to meet new people and interesting challenges.",
          contact_placeholder_name: "Your name",
          contact_placeholder_email: "Email",
          contact_placeholder_message: "Message",
          contact_button_send: "Send",
          contact_status_sending: "Sending...",
          contact_status_success: "Message sent successfully!",
          contact_status_error: "Error sending message. Please try again.",
          contact_status_something_wrong: "Something went wrong...",
          footer_rights: "All rights reserved.",
          footer_built_with: "Built with",
          footer_and: "and"
        }
      }
    },
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;