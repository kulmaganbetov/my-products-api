import products from '../data/products.json';

export default function handler(req, res) {
  const { q, category, brand, limit } = req.query;

  let result = products;

  // Поиск по названию
  if (q) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase())
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
