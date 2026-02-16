<template>
  <a class="product-card" href="#">
    <div class="product-card__image-wrap">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="product-card__image"
        loading="lazy"
      >
      <div v-else class="product-card__image product-card__image--placeholder">
        {{ product.name.charAt(0) }}
      </div>
      <button
        type="button"
        class="product-card__favorite"
        aria-label="Добавить в избранное"
      />
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <div class="product-card__prices">
        <span class="product-card__price">{{ product.price }} ₽</span>
        <span class="product-card__price product-card__price--x2">x2 {{ priceX2 }} ₽</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types/api'

const props = defineProps<{
  product: Product
}>()

const priceX2 = computed(() => Math.ceil(props.product.price / 2))
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  background: #f5f5f5;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: #ccc;
}

.product-card__favorite {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: default;
  &::after {
    content: '♡';
    font-size: 1.25rem;
    color: #666;
  }
}

.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.product-card__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.product-card__prices {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: auto;
}

.product-card__price {
  font-weight: 600;
}

.product-card__price--x2 {
  font-size: 0.875rem;
  color: #666;
}
</style>
