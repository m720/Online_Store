CREATE TABLE Products (id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    price FLOAT,
                    category TEXT[]
                    );