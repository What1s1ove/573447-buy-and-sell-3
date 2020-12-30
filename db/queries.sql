/* All categories */
SELECT * FROM categories;

/* Categories with at least one offer  */
SELECT * FROM categories WHERE id IN
(
  SELECT category_id FROM offers_categories
);

/* Categories with offer count */
SELECT
  categories.name,
  offers_categories.category_id,
  count(offers_categories.offer_id) AS "offers_count"
FROM
  offers_categories
  INNER JOIN categories
    ON offers_categories.category_id = categories.id
GROUP BY
  offers_categories.category_id,
  categories.name;

/* All Offers */
SELECT
  offers.id,
  offers.title,
  offers.sum,
  offers.description,
  offer_types.name AS "offer_type",
  offers.created_date,
  concat(users.first_name, ' ', users.last_name) AS "user_full_name",
  users.email,
  count(comments.offer_id) AS "comments_count",
  (
 		SELECT
 			string_agg(categories.name, ', ') AS "categories"
 		FROM offers_categories
 		LEFT JOIN categories
 			ON offers_categories.category_id = categories.id
			AND offers_categories.offer_id = offers.id
	)
FROM
  offers
  INNER JOIN offer_types
    ON offers.type_id = offer_types.id
  INNER JOIN users
    ON offers.user_id = users.id
  INNER JOIN comments
    ON offers.id = comments.offer_id
GROUP BY
  offers.id,
  offer_types.name,
  users.first_name,
  users.last_name,
  users.email
ORDER BY offers.created_date DESC;

