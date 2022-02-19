import { Book,BookStore } from "../models/book";

const store = new BookStore();

describe("books model",()=>{
    it('shoudl have index method',()=>{
        expect(store.index).toBeDefined;
    })
    
    it('index method shoudl return list of products', async()=>{
        const result = await store.index();
        expect(result).toEqual([]);
    })
})