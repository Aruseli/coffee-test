import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { User } from '~/types';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    
    // Чтение файла с пользователями
    const usersPath = resolve('./users.json');
    const usersData = readFileSync(usersPath, 'utf-8');
    const users: User[] = JSON.parse(usersData);
    
    // Поиск пользователя
    // В комментариях в users.json указаны реальные пароли, а в passphrase хранятся хэши
    const user = users.find(u => {
      // Проверяем логин
      const usernameMatch = u.credentials.username === username;
      
      // Извлекаем пароль из комментария
      let realPassword = '';
      if (u._comment) {
        const passwordMatch = u._comment.match(/паролем '(.+?)'/i);
        if (passwordMatch && passwordMatch[1]) {
          realPassword = passwordMatch[1];
        }
      }
      
      return usernameMatch && realPassword === password;
    });
    
    if (user) {
      return {
        success: true,
        username: user.credentials.username,
        name: user.name,
        surname: user.surname
      };
    }
    
    return {
      success: false,
      message: 'Неверные учетные данные'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Ошибка сервера при аутентификации'
    };
  }
});
