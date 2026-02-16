<template>
  <div class="layout">
    <header class="header">
      <div class="header__container">
        <a class="header__logo" href="#">Логотип</a>
        <nav class="header__nav">
          <a class="header__link" href="#">Каталог</a>
          <a class="header__link" href="#">Доставка</a>
          <a class="header__link" href="#">Оплата</a>
          <a class="header__link" href="#">Контакты</a>
        </nav>
        <button
          type="button"
          class="header__burger"
          aria-label="Меню"
        >
          <span class="header__burger-line" />
          <span class="header__burger-line" />
          <span class="header__burger-line" />
        </button>
      </div>
    </header>
    <main class="layout__main">
      <slot />
    </main>
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__grid">
          <div class="footer__col">
            <a class="footer__link" href="#">Каталог</a>
            <a class="footer__link" href="#">Доставка</a>
            <a class="footer__link" href="#">Оплата</a>
          </div>
          <div class="footer__col">
            <a class="footer__link" href="#">Контакты</a>
            <a class="footer__link" href="#">О компании</a>
          </div>
        </div>
        <p class="footer__copy">&copy; {{ new Date().getFullYear() }} Магазин</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
}

.header {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.header__logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.header__nav {
  display: none;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }

  .header__burger {
    display: none;
  }
}

.header__link {
  transition: opacity 0.2s;
}

.header__link:hover {
  opacity: 0.7;
}

.header__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.header__burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #1a1a1a;
}

.footer {
  background: #f5f5f5;
  margin-top: auto;
  padding: 2rem 1.5rem;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__link {
  transition: opacity 0.2s;
}

.footer__link:hover {
  opacity: 0.7;
}

.footer__copy {
  font-size: 0.875rem;
  color: #666;
}
</style>
