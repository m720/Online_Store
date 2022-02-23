CREATE TABLE Order_Products (id SERIAL PRIMARY KEY,
                    order_id INTEGER NOT NULL,
                    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
                    product_id INTEGER[],
                    quantity INTEGER[]
                    );
                