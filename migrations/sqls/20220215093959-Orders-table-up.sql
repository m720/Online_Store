CREATE TABLE Orders (id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
                    status BOOLEAN,
                    OrderProducts INTEGER
                    );
