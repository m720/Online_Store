import supertest from "supertest";
import app from "../../index";
import { Order, OrderStore } from "../../models/order";
const request = supertest(app);


describe("Order APIs",()=>{

    let token =''; // using let insted of const to be assigned later;
    beforeAll(async ()=>{
    // this step is to get token to use it for authorization
    console.log("this is create Order API");
    
    const result = await request.post("/users")
    .set('Content-Type', 'application/json')
     .send({
     firstname: "ahmed",
     lastname: "mahmoud",
     password: "12345@Mh"
     });
     token = result.text;      

    await request.post('/products')
     .send({
        name: "DBbook",
        price: 13,
        category: ["groc"] 
     }).auth(token, {type: "bearer"});

     await request.post('/products')
     .send({
        name: "DBmilk",
        price: 13,
        category: ["groc"] 
     }).auth(token, {type: "bearer"});
     await request.post('/products')
     .send({
        name: "DBcacke",
        price: 25,
        category: ["groc"] 
     }).auth(token, {type: "bearer"});


    });

    it('Create Order', async ()=>{
        
        const result = await request.post("/orders")
        .set('Content-Type', 'application/json')
         .send({
            user_id: 1,
            status: 0,
            productsIds: [2,1],
            quantities: [2,1]
        }).auth(token, {type: "bearer"});
         
         expect(result.status).toBe(200);
     });

     it('Index Orders', async()=>{
        const result = await request.get('/orders');
        
        expect(result.status).toBe(200);
    })

    it('Show Order', async()=>{
        const result = await request.get("/orders/"+ '1');
        expect(result.status).toBe(200);
    })

    it('Update Order', async()=>{
        const result = await request.put("/orders/"+"1")
                             .send({
                               status:1
                            }).auth(token, {type: "bearer"});
        expect(result.status).toBe(200);
    })

    it('Delete Order', async()=>{
        const result = await request.delete("/orders/"+"1")
                                .auth(token, {type: "bearer"});
        expect(result.status).toBe(200);
        })
    
});

describe("Orders CURD",()=>{
    const store = new OrderStore();
    let DBorderProducts: number;
    let DBorderid: number;
    it("DB Create Order", async()=>{
        const result = await store.create({
            id:-1,
            user_id: 1,
            status: false,
            orderproducts: -1
        },[2,1],[2,1]);
        DBorderid = result.id;
        DBorderProducts = result.orderproducts;
        expect(result.user_id).toEqual(1);
    })

    it("DB index Orders",async ()=>{
        const result = await store.index();
        expect(typeof(result)).toBe("object");
    })

    it("DB Show Order", async()=>{
        const result = await store.show(DBorderid);
        expect(result.orderproducts).toBe(DBorderProducts);
    })

    it("DB Update Order",async () => {
        const result = await store.update(DBorderid, true);
        expect(result.orderproducts).toBe(DBorderProducts);
    })

    it("DB delete Orders", async ()=>{
        const result = await store.delete(DBorderid);
        expect(result).toBe("Deleted");
    })

})