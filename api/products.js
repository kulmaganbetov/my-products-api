// export default function handler(req, res)
import products from '../data/products.json';

export default function handler(req, res) {
  // НОВОЕ: Добавляем min_credit и max_credit
  const { q, category, brand, limit, min_credit, max_credit } = req.query;

  let result = products;

  // 1. Поиск по названию ИЛИ ТОЧНОЕ СОВПАДЕНИЕ ПО SKU
  if (q) {
    const qLower = q.toLowerCase();
    result = result.filter(p =>
      // 1. Точное совпадение SKU (наивысший приоритет)
      p.sku.toLowerCase() === qLower ||
      // 2. Поиск по названию
      p.name.toLowerCase().includes(qLower)
    );
  }

  // 2. Фильтр по category
  if (category) {
    result = result.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 3. Фильтр по бренду
  if (brand) {
    result = result.filter(p =>
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // 4. НОВОЕ: ФИЛЬТРАЦИЯ ПО ЦЕНЕ (Credit)
  if (min_credit || max_credit) {
    const min = parseFloat(min_credit || 0);
    const max = parseFloat(max_credit || Infinity);

    result = result.filter(p => {
      // Преобразуем цену из строки в число (на всякий случай)
      const creditPrice = parseFloat(p.credit || p.price || 0); 
      
      // Фильтруем по диапазону
      return creditPrice >= min && creditPrice <= max;
    });
  }

  // 5. Ограничение результатов
  const maxItems = parseInt(limit || 50);
  result = result.slice(0, maxItems);

  res.status(200).json(result);
}
