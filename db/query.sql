SELECT movies.movie_name, reviews.review
FROM movies
JOIN reviews ON movies.movie_name = reviews.movie_id;
