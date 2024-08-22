import express from'express';
import cors from'cors';
import mysql from'mysql';
import bcrypt from "bcrypt";
import multer from "multer";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/images', express.static('uploads'));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"cinema"
});

app.use(express.json());
app.use(cors());

// per connection me backend
app.get("/", (req, res) => {
    res.send("<h1>hello this is the backend</h1>");
});

//per users
app.get("/users", (req,res) => {
    const q = "SELECT * FROM user";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req,res) => {
    const q = "INSERT into user (`name`,`surname`,`email`,`password`) VALUES ( ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.password
    ];

    db.query(q, values, (err,data) => {
        if(err) return res.json(err);
        return res.json("user has been created successfully");
    });
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM `user` WHERE `id` = ?";
    
    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching user", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "User not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const q = "UPDATE user SET `name`=?, `surname`=?, `email`=?, `password`=? WHERE id=? ";

    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.password,
        userId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: "Error updating user", details: err });
        return res.json("User updated successfully");
    });
});

app.delete("/users/:id", (req,res) => {
    const userId = req.params.id;
    const q = "DELETE FROM user WHERE id = ?";
    
    db.query(q, [userId], (err,data) => {
        if(err) return res.json(err);
        return res.json("User has been deleted successfully.");
    });
});

//Per Zhanret
//PER CATEGORIES
app.get("/categories", (req,res) => {
    const q = "SELECT * FROM categories";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/categories", (req,res) => {
    const q = "INSERT into categories (`name`) VALUES (?)";
    const values = [
        req.body.name,

    ];
    db.query(q, values,  (err, data) => {
                if(err) return res.json(err);
                return res.json("Category has been created successfully");
            });
});

app.delete("/categories/:id", (req,res) => {
    const Id = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?";
    
    db.query(q, [Id], (err,data) => {
        if(err) return res.json(err);
        return res.json("Category has been deleted successfully.");
    });
});

app.get("/categories/:id", (req, res) => {
    const Id = req.params.id;
    const q = "SELECT * FROM `categories` WHERE `id` = ?";
    
    db.query(q, [Id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching Category", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Category not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/categories/:id", (req,res) => {
    const cid = req.params.id;
    const q = "UPDATE categories SET `name`=? WHERE id=? ";

    const values = [
        req.body.name,
        cid
    ];
    
    db.query(q, values, (err,data) => {
        if(err) return res.status(500).json({ error: "Error updating Category", details: err });
        return res.json("Category has been updated successfully.");
    });
});


//per SALLA
app.get("/Halls", (req,res) => {
    const q = "SELECT * FROM Halls";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/Halls", (req,res) => {
    const q = "INSERT into Halls (`name`) VALUES (?)";
    const values = [
        req.body.name,

    ];
    db.query(q, values,  (err, data) => {
                if(err) return res.json(err);
                return res.json("Hall has been created successfully");
            });
});

app.delete("/Halls/:id", (req,res) => {
    const Id = req.params.id;
    const q = "DELETE FROM Halls WHERE id = ?";
    
    db.query(q, [Id], (err,data) => {
        if(err) return res.json(err);
        return res.json("Hall has been deleted successfully.");
    });
});

app.get("/Halls/:id", (req, res) => {
    const Id = req.params.id;
    const q = "SELECT * FROM `Halls` WHERE `id` = ?";
    
    db.query(q, [Id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching Hall", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Hall not found::)" });
        }
        return res.json(data[0]);
    });
});

app.put("/Halls/:id", (req,res) => {
    const cid = req.params.id;
    const q = "UPDATE Halls SET `name`=? WHERE id=? ";

    const values = [
        req.body.name,
        cid
    ];
    
    db.query(q, values, (err,data) => {
        if(err) return res.status(500).json({ error: "Error updating Hall", details: err });
        return res.json("Hall has been updated successfully.");
    });
});

//per MOVIES

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "_" + Date.now() + Path.extname(file.originalname));
    }
})

const uploadM = multer({ storage: storage });

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Multer error', details: err });
    } else if (err) {
      return res.status(500).json({ error: 'Unknown error', details: err });
    }
    next();
  });

app.get("/movies", (req,res) => {
    const q = "SELECT * FROM movies";
    db.query(q, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/movies", uploadM.single('foto'), (req, res) => {
    const q = "INSERT INTO movies (`emri`,`foto`) VALUES (?, 'foto.jpg')";
    const values = [
        req.body.emri,
    ];
    db.query(q, values,  (err, data) => {
        if (err) return res.status(500).json({ error: "Error creating movie", details: err });
        return res.json("Movies created successfully");
    });
});


app.delete("/movies/:id", (req, res) => {
    const produktId = req.params.id;
    const query = "DELETE FROM movies WHERE id = ?";

    db.query(query, [produktId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Movie has been deleted successfully.");
    });
});

app.put("/movies/:id", (req, res) => {
    const produktId = req.params.id;
    const q = "UPDATE movies SET `emri`=?, `foto`=? WHERE id=? ";

    const values = [
        req.body.emri,
        req.body.foto,
        produktId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: "Error updating movie", details: err });
        return res.json("Movies updated successfully");
    });
});

app.get("/movies/:id", (req, res) => {
    const produktId = req.params.id;
    const q = "SELECT * FROM `movies` WHERE `id` = ?";
    
    db.query(q, [produktId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching movie", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Movies not found" });
        }
        return res.json(data[0]);
    });
});

app.listen(3002, () => {
    console.log("connected to backend!");
});
