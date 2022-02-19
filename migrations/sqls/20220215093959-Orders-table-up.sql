CREATE TABLE Orders (id SERIAL PRIMARY KEY,
                    FOREIGN KEY (userId) REFERENCES users(id),
                    status BOOLEAN,
                    OrderProducts INTEGER[]
                    );