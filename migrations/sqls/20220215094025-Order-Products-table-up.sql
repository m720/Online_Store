CREATE TABLE Order_Products (id SERIAL PRIMARY KEY,
                    orderId INTEGER,
                    CONSTRAINT FK_orderId FOREIGN Key(id) REFERENCES orders(id), 
                    productId INTEGER[],
                    quantity INTEGER[]
                    );