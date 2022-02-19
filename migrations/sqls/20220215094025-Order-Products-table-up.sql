CREATE TABLE Order_Products (id SERIAL PRIMARY KEY,
                    FOREIGN Key(orderId) REFERENCES Orders(id) , 
                    productId INTEGER[],
                    quantity INTEGER[]
                    );