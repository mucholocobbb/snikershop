# Nuxt Shop

Nuxt 4 + TypeScript приложение: главная страница и каталог товаров с SSR.

## Стек

- Nuxt 4, Vue, TypeScript
- SCSS, БЭМ, grid/flex

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Сборка

```bash
npm run build
npm run preview
```

## API

Товары: `https://test-task-api.tapir.ws/products?page=1&limit=10`

## Страницы

- **/** — главная, кнопка «В каталог» ведёт в каталог
- **/catalog** — каталог (SSR первой страницы, «Показать ещё», обработка ошибок и «Повторить»)
