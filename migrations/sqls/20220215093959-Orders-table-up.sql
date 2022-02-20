CREATE TABLE Orders (id SERIAL PRIMARY KEY,
                    userId INTEGER,
                    CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users (id),
                    status BOOLEAN,
                    OrderProducts INTEGER
                    );