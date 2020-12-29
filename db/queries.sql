/* All categories */
SELECT * FROM categories;

/* Categories with at least one offer  */
SELECT
  categories.name,
  offers_categories.category_id
FROM
  offers_categories
  INNER JOIN categories
    ON offers_categories.category_id = categories.id
GROUP BY
  categories.name,
  offers_categories.category_id
HAVING count(offers_categories) > 1;

/* Categories with offer count */
SELECT
  categories.name,
  offers_categories.category_id,
  count(offers_categories.offer_id) as "offers_count"
FROM
  offers_categories
  INNER JOIN  categories
    ON offers_categories.category_id = categories.id
GROUP BY
  categories.name,
  offers_categories.category_id;
