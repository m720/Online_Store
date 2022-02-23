import supertest from "supertest";
import app from "../../index";
import {ProductStore } from "../../models/product";
const request = supertest(app);

describe("Products APIs", async ()=>{
    let token =''; // using let insted of const to be assigned later;
    beforeAll(async ()=>{
    // this step is to get token to use it for authorization
    const result = await request.post("/users")
    .set('Content-Type', 'application/json')
     .send({
     firstname: "ahmed",
     lastname: "mahmoud",
     password: "12345@Mh"
     });
     token = result.text; 
    })
    
    
     it("Create Product", async ()=>{
        const result = await request.post('/products')
        .send({
            name: "book",
            price: 13,
            category: ["groc"]
        }).auth(token, {type: "bearer"});

        expect(result.status).toBe(200);
     });

     it('Index Products', async()=>{
        const result = await request.get('/products');
        
        expect(result.status).toBe(200);
    })

    it('Show Product', async()=>{
        const result = await request.get("/products/"+ '4');

        expect(result.status).toBe(200);
    })

    it('Update Product', async()=>{
        const result = await request.put("/products/"+"4")
                             .send({
                                name: "milk",
                                price: 15,
                                category: ["groc"]
                            }).auth(token, {type: "bearer"});

        expect(result.status).toBe(200);
    })

    it('Delete Product', async()=>{
        const result = await request.delete("/products/"+"4")
                                .auth(token, {type: "bearer"});

        expect(result.status).toBe(200);
        })

})

describe("Products CURD", ()=>{
    const store =new ProductStore();
    let id: number;

    it("DB Create Product",async ()=>{
        const result = await store.create({
        name: "DBproduct",
        price: 19,
        category: ["cat1"],
        id: -1
        });
        id =result.id

        expect(result.name).toEqual("DBproduct");
        expect(result.price).toEqual(19);
    })

    it("DB Index Products", async()=>{
        const result = await store.index();

        expect(typeof(result)).toBe("object")
    })

    it("DB Show Product", async()=>{
        const result = await store.show(id);

        expect(result.name).toEqual("DBproduct");
        expect(result.price).toEqual(19);
    })

    it("DB Upate Product", async ()=>{
        const result = await store.update({
            name: "updatedDBProduct",
            price: 20,
            category: ["cat2"],
            id: id
        });

        expect(result.name).toEqual("updatedDBProduct");
    })

    it("DB Delete Product", async()=>{
        const result = await store.delete(id);

        expect(result).toEqual("Deleted");
    })
})