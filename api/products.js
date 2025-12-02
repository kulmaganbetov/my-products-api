// export default function handler(req, res)
import products from '../data/products.json';

export default function handler(req, res) {
  const { q, category, brand, limit } = req.query;

  let result = products;

  // Поиск по названию ИЛИ ТОЧНОЕ СОВПАДЕНИЕ ПО SKU
  if (q) {
    const qLower = q.toLowerCase();
    result = result.filter(p =>
      // 1. Точное совпадение SKU (наивысший приоритет)
      p.sku.toLowerCase() === qLower ||
      // 2. Поиск по названию
      p.name.toLowerCase().includes(qLower)
    );
  }

  // Фильтр по category
  if (category) {
    result = result.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Фильтр по бренду
  if (brand) {
    result = result.filter(p =>
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Ограничение результатов
  const maxItems = parseInt(limit || 50);
  result = result.slice(0, maxItems);

  res.status(200).json(result);
}
