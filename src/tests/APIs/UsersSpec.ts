import { UserStore, User } from "../../models/user";
import supertest from "supertest";
import app from "../../index";
import bcrypt from 'bcrypt';

const request = supertest(app);
const pepper = process.env.BCRYPT_PASSWORD ?? "random_pass";
const saltRounds = process.env.SALT_ROUNDS ?? "10";

describe("Users DB CURD",()=>{
    const store = new UserStore();
    it('DB Create User', async ()=>{
        
        const result = await store.create({
            id: -1,
            firstname: "ahmeddB",
            lastname: "mahmoud",
            password: "12345@Mh"
            });
        expect(typeof(result)).toBe("string"); //cant compare the value as token value is unkown
    })

    it('DB Index Users', async()=>{
        const result = await store.index();
        expect(typeof(result)).toBe("object"); //cant compare the value as pass value is unkown
    })

    it('DB Show User', async()=>{
        const result = await store.show(1);
        expect(result.id).toBe(1); 
    })

    it('DB Update User', async()=>{
        const result = await store.update({
            id: 1,
            firstname: "ahmeddddddDB",
            lastname: "mahmoud",
            password: "12345@Mh"
            });
        const hashedPass = bcrypt.hashSync("12345@Mh" + pepper, parseInt(saltRounds));       
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual("ahmeddddddDB");
        expect(result.lastname).toEqual("mahmoud");
    })

    it('DB Delete User', async()=>{
        const result = await store.delete(1);
        expect(result).toBe("Deleted");
    })
})



describe("Users APIs", ()=>{
    let token: string =''; // using let insted of const to be assigned later;


    it('Create User', async ()=>{
       const result = await request.post("/users")
       .set('Content-Type', 'application/json')
        .send({
        firstname: "ahmedApi",
        lastname: "mahmoud",
        password: "12345@Mh"
        });
        token = result.text;
        expect(result.status).toBe(200);
    });

    it('Index Users', async()=>{
        const result = await request.get('/users');
        
        expect(result.status).toBe(200);
    })

    it('Show User', async()=>{
        const result = await request.get("/users/"+ '4');
        expect(result.status).toBe(200);
    })

    it('Update User', async()=>{
        const result = await request.put("/users/"+"4")
                             .send({"id":4,
                             "firstname": "AHMEDDDAPI",
                             "lastname": "mahmoud",
                             "password": "12345@Mh"
                            }).auth(token, {type: "bearer"});
        expect(result.status).toBe(200);
    })
    
    it('Show User Orders', async()=>{
    const result = await request.get("/users/"+"4"+"/orders")
                            .auth(token, {type: "bearer"});
    expect(result.status).toBe(200);
    })

    // it('Delete User', async()=>{
    //     const result = await request.delete("/users/"+"4")
    //                             .auth(token, {type: "bearer"});
    //     expect(result.status).toBe(200);
    //     })
    
})