import type { Product, ProductsResponse } from '~/types/api'

const API_BASE = 'https://test-task-api.tapir.ws'

export function useProducts() {
  async function fetchProducts(page: number = 1, limit: number = 10): Promise<ProductsResponse> {
    const url = `${API_BASE}/products?page=${page}&limit=${limit}`
    const response = await $fetch<ProductsResponse | Product[]>(url)

    if (Array.isArray(response)) {
      return { products: response, page, limit }
    }
    return response
  }

  return { fetchProducts }
}
