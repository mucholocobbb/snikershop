<template>
  <div class="catalog">
    <div class="catalog__container">
      <h1 class="catalog__title">Каталог товаров</h1>
      <div v-if="products.length" class="catalog__grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <p v-else-if="pending" class="catalog__loading">Загрузка...</p>
      <p v-else-if="!initialLoadError && !error && !products.length" class="catalog__empty">Товаров пока нет</p>

      <div v-if="products.length && !error && !initialLoadError" class="catalog__actions">
        <template v-if="loadingMore">
          <p class="catalog__loading">Загрузка...</p>
        </template>
        <template v-else-if="hasNextPage">
          <button
            type="button"
            class="catalog__btn-more"
            @click="loadMore"
          >
            Показать ещё
          </button>
        </template>
      </div>

      <div v-if="error || initialLoadError" class="catalog__error">
        <p class="catalog__error-text">Произошла ошибка, попробуйте позже</p>
        <button
          type="button"
          class="catalog__btn-retry"
          @click="retry"
        >
          Повторить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductsResponse } from '~/types/api'

const LIMIT = 10
const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string

const products = ref<Product[]>([])
const currentPage = ref(1)
const hasNextPage = ref(true)
const loadingMore = ref(false)
const error = ref(false)

const { data: initialData, pending, error: asyncError, refresh } = await useAsyncData(
  'catalog-products',
  () => $fetch<ProductsResponse | Product[]>(`${apiBase}/products?page=1&limit=${LIMIT}`),
  { server: true }
)

const initialLoadError = computed(() => !!asyncError.value)

function normalizeResponse(data: ProductsResponse | Product[]): Product[] {
  return Array.isArray(data) ? data : (data?.products ?? [])
}

function hasMore(data: ProductsResponse | Product[], limit: number): boolean {
  const list = normalizeResponse(data)
  return list.length >= limit
}

watch(initialData, (data) => {
  if (data) {
    products.value = normalizeResponse(data)
    hasNextPage.value = hasMore(data, LIMIT)
    error.value = false
  }
}, { immediate: true })

async function loadMore() {
  if (loadingMore.value || !hasNextPage.value) return
  loadingMore.value = true
  error.value = false
  const nextPage = currentPage.value + 1
  try {
    const data = await $fetch<ProductsResponse | Product[]>(
      `${apiBase}/products?page=${nextPage}&limit=${LIMIT}`
    )
    const list = normalizeResponse(data)
    products.value = [...products.value, ...list]
    currentPage.value = nextPage
    hasNextPage.value = hasMore(data, LIMIT)
  } catch {
    error.value = true
  } finally {
    loadingMore.value = false
  }
}

async function retry() {
  if (initialLoadError.value) {
    error.value = false
    await refresh()
    return
  }
  error.value = false
  loadingMore.value = true
  const page = currentPage.value + 1
  try {
    const data = await $fetch<ProductsResponse | Product[]>(
      `${apiBase}/products?page=${page}&limit=${LIMIT}`
    )
    const list = normalizeResponse(data)
    products.value = [...products.value, ...list]
    currentPage.value = page
    hasNextPage.value = hasMore(data, LIMIT)
  } catch {
    error.value = true
  } finally {
    loadingMore.value = false
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  padding: 2rem 0;
}

.catalog__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.catalog__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 1.5rem;
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.catalog__empty {
  color: #666;
  padding: 2rem;
}

.catalog__actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.catalog__loading {
  color: #666;
}

.catalog__btn-more {
  padding: 0.75rem 2rem;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.catalog__btn-more:hover {
  background: #333;
}

.catalog__error {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fef2f2;
  border-radius: 8px;
  text-align: center;
}

.catalog__error-text {
  margin-bottom: 1rem;
  color: #991b1b;
}

.catalog__btn-retry {
  padding: 0.5rem 1.25rem;
  background: #991b1b;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}

.catalog__btn-retry:hover {
  background: #b91c1c;
}
</style>
