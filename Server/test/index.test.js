const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 932,
    name:'Camilo',
    species:'Human',
    origin: {
        name:'Earth (C-137)'
    },
    image: 'image.jpg',
    gender : 'Female',
    status: 'Alive'
};

describe('test de RUTAS',() =>{
    describe("GET /rickandmorty/character/:id", () =>{
        it("Responde con status: 200",async () =>{
            await request.get('/rickandmorty/character/1').expect(200)
        });
        it("Responde un objeto con las propiedades: 'id', 'name','species', 'gender', 'status', 'origin' e 'imagen'", async () => {
            const response = await request.get('/rickandmorty/character/1');
            
            for(const prop in character){
                expect(response.body).toHaveProperty(prop)
            }
        });
        it('Si hay un error responde con status: 500',async () =>{
            const response = await request.get('/rickandmorty/character/231314h');
            expect(response.statusCode).toBe(500)
        });
    });
    
    const access = { access : true }

    describe("GET /rickandmorty/login", () => {
        it("Responde con un objeto con la propiedad access en true si la informacion del usuario es valida", async () =>{
            const response = await request.get('/rickandmorty/login?email=camilocabezasg@gmail.com&password=Camilo123')
            expect(response.body).toEqual(access)
        });
        it("Responde con un objeto con la propiedad access en false si la informacion del usuario no es valida", async () =>{
            const response = await request.get('/rickandmorty/login?email=camilocabezasg@gmail.com&password=Camilo123fafa')
            access.access =  false;
            expect(response.body).toEqual(access)
        });

        describe('POST /rickandmorty/fav',() => {
            it("Debe guardar el personaje en favoritos", async () => {
                const response =  await request.post('/rickandmorty/fav')
                .send(character);
                expect(response.body).toContainEqual(character)
            })

            it("Debe agregar personajes a favoritos sin eliminar los que ya estaban", async () => {
                character.id = 1923,
                character.name = ' Ft37'
                const response = await request.post('/rickandmorty/fav')
                .send(character)
                expect(response.body.length).toBe(2)
            });
        });

        describe('DELETE /rickandmorty/fav/:id', ()=>{
            it("Si el ID solicitado no existe, deberia retornar un arreglo con todos los favoritos", async ()=> {
                const response = await request.delete('/rickandmorty/fav/2')
                expect(response.body.length).toBe(2)
            })
        })
    })
})
