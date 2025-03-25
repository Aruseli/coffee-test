# Coffee Shop Web Application

Веб-приложение для управления кофейными продуктами с аутентификацией пользователей и фильтрацией данных.

## Функциональность

- **Аутентификация пользователей**: Вход в систему с использованием логина и пароля
- **Защищенные маршруты**: Доступ к странице аккаунта только для авторизованных пользователей
- **Сохранение сессии**: Сессия пользователя сохраняется при обновлении страницы
- **Таблица продуктов**: Отображение списка кофейных продуктов и аксессуаров
- **Фильтрация данных**: Возможность фильтрации по дате создания и категории продуктов

## Технологии

- **Nuxt 3**: Современный фреймворк для разработки Vue.js приложений
- **Pinia**: Хранилище состояния для управления данными приложения
- **SCSS**: Препроцессор CSS для стилизации компонентов
- **TypeScript**: Типизация кода для повышения качества и поддержки
- **Nuxt UI**: Библиотека компонентов для создания пользовательского интерфейса

## Процесс развёртывания на PROD сервере

### 1. Подготовка проекта к деплою

```bash
# Установка зависимостей
npm install

# Сборка проекта для production
npm run build
```

### 2. Настройка сервера

1. **Подготовка сервера**:
   - Установка Node.js (версия 18+)
   - Установка Nginx в качестве прокси-сервера
   - Настройка SSL-сертификатов (Let's Encrypt)

2. **Настройка Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Перенаправление на HTTPS
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       # SSL настройки
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       # Проксирование запросов к Nuxt приложению
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### 3. Деплой приложения

1. **Использование PM2 для управления процессами**:
   ```bash
   # Установка PM2 глобально
   npm install -g pm2
   
   # Запуск приложения
   pm2 start .output/server/index.mjs --name coffee-shop
   
   # Настройка автозапуска
   pm2 startup
   pm2 save
   ```

2. **Настройка CI/CD с использованием GitHub Actions**:
   - Создание workflow файла `.github/workflows/deploy.yml`
   - Настройка автоматического деплоя при пуше в main ветку
   - Использование SSH для подключения к серверу и обновления приложения

3. **Мониторинг и логирование**:
   - Настройка PM2 для логирования
   - Интеграция с сервисами мониторинга (например, Sentry)
   - Настройка уведомлений о сбоях

## Реализованные функции и обоснование

### 1. Аутентификация пользователей
Реализована с использованием Pinia store для управления состоянием авторизации. Данные пользователей хранятся в JSON файле, а пароли извлекаются из комментариев к пользователям. В реальном проекте следует использовать хеширование паролей и более безопасное хранение.

### 2. Сохранение сессии
Для сохранения сессии при обновлении страницы используется localStorage. Это обеспечивает сохранение состояния авторизации пользователя между сессиями браузера. В production-окружении можно заменить на более безопасные механизмы, такие как HTTP-only cookies.

### 3. Таблица продуктов с фильтрацией
Реализована таблица с возможностью фильтрации по дате создания и категории. Для управления состоянием фильтров используется Pinia store, что позволяет сохранять состояние фильтров между переходами по страницам.

### 4. Адаптивный дизайн
Приложение адаптировано для различных устройств с использованием SCSS и медиа-запросов. Компоненты UI оптимизированы для отображения как на десктопных, так и на мобильных устройствах.

### 5. Типизация данных
Использование TypeScript позволяет обеспечить типобезопасность кода, что снижает количество ошибок во время разработки и упрощает поддержку приложения в будущем.

## Запуск проекта для разработки

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

Сервер разработки будет доступен по адресу `http://localhost:3000`.
