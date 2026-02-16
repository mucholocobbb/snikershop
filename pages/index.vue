<template>
  <div class="hero">
    <div class="hero__container">
      <h1 class="hero__title">Главная страница</h1>
      <p class="hero__text">Добро пожаловать в магазин</p>
      <NuxtLink class="hero__btn" to="/catalog">В каталог</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.hero__container {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.hero__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 0.5rem;
}

.hero__text {
  color: #666;
  margin-bottom: 1.5rem;
}

.hero__btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #1a1a1a;
  color: #fff;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;
}

.hero__btn:hover {
  background: #333;
}
</style>
