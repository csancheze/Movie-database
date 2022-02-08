const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Hellspawn666#',
    database: 'movie_db'
  },
  console.log(`Connected to the movies_database.`)
);

app.post('/api/add-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
    const params = [body.movie_name];

    console.log(body);

    db.query(sql,params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
    res.json({
        message: "success",
        data:body
        })
    })
})

app.get('/api/movies', (req, res) => {
    const sql = 'SELECT id, movie_name FROM movies';
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

app.delete('/api/movie/:id', (req,res) => {
    const sql = 'DELETE FROM movies WHERE id = ?';
    const params = [req.params.id]

db.query(sql,params, (err,result)=>{    
        if (err) {
            res.statusMessage(400).json({error:res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Movie not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    })
})

app.get('/api/movie-reviews', (req,res) => {
    const sql = 'SELECT movies.movie_name, reviews.review FROM reviews JOIN movies ON reviews.movie_id = movies.id'
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.put('/api/update-review', (req, res) => {
    const sql = ' UPDATE reviews SET review = ? WHERE movie_id = ?';
    const params = [req.body.review, req.body.id];

    db.query(sql,params,(err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Movie not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

db.query('SELECT * FROM movies', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
