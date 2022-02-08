SELECT movies.movie_name, reviews.review
FROM reviews
JOIN movies ON reviews.movie_id = movies.id;

