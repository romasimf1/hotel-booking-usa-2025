# 🏨 Hotel Booking Site

Простой сайт для бронирования отелей с интеграцией Cloudflare, EmailJS и ElevenLabs AI ассистента.

## ✨ Возможности

- 📋 Просмотр 10 различных отелей
- 🏨 Детальная информация о каждом отеле
- 📝 Форма бронирования с валидацией
- 📧 Отправка заявок через EmailJS
- 🤖 AI ассистент от ElevenLabs
- 📱 Адаптивный дизайн
- ☁️ Развертывание на Cloudflare Pages/Workers

## 🚀 Быстрый запуск

### 1. Клонирование репозитория
```bash
git clone <your-repo-url>
cd hotel-booking-site
```

### 2. Настройка API ключей

#### EmailJS
1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте сервис (Gmail, Outlook и т.д.)
3. Создайте email шаблон для бронирований
4. Получите ключи: Service ID, Template ID, Public Key

#### ElevenLabs AI
1. Зарегистрируйтесь на [ElevenLabs](https://elevenlabs.io/)
2. Создайте AI агента в Conversational AI
3. Получите Agent ID

### 3. Настройка переменных окружения

Откройте файл `script.js` и замените плейсхолдеры:

```javascript
// EmailJS ключи
emailjs.init("ВАШ_EMAILJS_PUBLIC_KEY");

await emailjs.send(
    'ВАШ_EMAILJS_SERVICE_ID',
    'ВАШ_EMAILJS_TEMPLATE_ID',
    bookingData
);

// ElevenLabs Agent ID
convaiWidget.setAttribute('agent-id', 'ВАШ_ELEVENLABS_AGENT_ID');
```

### 4. Развертывание на Cloudflare

#### Вариант 1: Cloudflare Pages (рекомендуется для статического сайта)
```bash
# Установите Wrangler CLI
npm install -g wrangler

# Авторизуйтесь
wrangler auth login

# Разверните на Pages
wrangler pages deploy . --name hotel-booking-site
```

#### Вариант 2: Cloudflare Workers (для API)
```bash
# Создайте Worker
wrangler dev

# Разверните
wrangler deploy
```

## 📁 Структура проекта

```
hotel-booking-site/
├── index.html          # Главная страница
├── styles.css          # Стили
├── script.js           # JavaScript логика
├── wrangler.toml       # Конфигурация Cloudflare
├── api/
│   ├── hotels.js       # API для отелей
│   └── bookings.js     # API для бронирований
└── README.md           # Документация
```

## 🎨 Кастомизация

### Добавление новых отелей
Откройте `script.js` и добавьте новый объект в массив `hotels`:

```javascript
{
    id: 11,
    name: "Новый Отель",
    location: "Город, Страна",
    description: "Описание отеля...",
    image: "ссылка_на_изображение",
    price: "от XXXX ₽/ночь",
    features: ["Wi-Fi", "Парковка"],
    rating: 4.5
}
```

### Настройка EmailJS шаблона
Создайте шаблон в EmailJS со следующими переменными:
- `{{guest_name}}` - Имя гостя
- `{{guest_email}}` - Email гостя
- `{{guest_phone}}` - Телефон гостя
- `{{check_in}}` - Дата заезда
- `{{check_out}}` - Дата выезда
- `{{guests}}` - Количество гостей
- `{{hotel_name}}` - Название отеля
- `{{booking_date}}` - Дата бронирования

## 🔧 API Endpoints

### Получение отелей
```
GET /api/hotels
GET /api/hotels?location=Москва
GET /api/hotels?minPrice=10000&maxPrice=20000
```

### Создание бронирования
```
POST /api/bookings
Content-Type: application/json

{
    "guest_name": "Иван Иванов",
    "guest_email": "ivan@example.com",
    "guest_phone": "+7 (999) 123-45-67",
    "check_in": "2024-01-15",
    "check_out": "2024-01-20",
    "guests": "2",
    "hotel_id": "1",
    "hotel_name": "Grand Palace Hotel"
}
```

## 📱 Адаптивность

Сайт полностью адаптивен и корректно отображается на:
- 📱 Мобильных устройствах
- 📟 Планшетах
- 💻 Настольных компьютерах

## 🛠️ Технологии

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Cloudflare Workers
- **Email:** EmailJS
- **AI:** ElevenLabs Conversational AI
- **Deployment:** Cloudflare Pages

## 📞 Поддержка

Если у вас возникли вопросы или проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все API ключи настроены корректно
3. Проверьте логи Cloudflare Workers

## 📄 Лицензия

Этот проект предназначен для образовательных целей.
