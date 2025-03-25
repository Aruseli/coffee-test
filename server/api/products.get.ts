import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Product } from '~/types';

export default defineEventHandler(async () => {
  try {
    // Чтение файла с продуктами
    const productsPath = resolve('./server/api/products.json');
    const productsData = readFileSync(productsPath, 'utf-8');
    const products: Product[] = JSON.parse(productsData);
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении данных о продуктах'
    });
  }
});
