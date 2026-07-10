import { categoryRepository } from "@/repositories/category.repository";

export const categoryService = {
  async getAll() {
    return categoryRepository.findAll();
  },
};
