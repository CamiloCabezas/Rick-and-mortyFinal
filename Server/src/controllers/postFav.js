const { Favorite } = require('../DB_connection');

const postFav = async (req, res) => {
    try {
        const { name, origin, status, image, species, gender } = req.body;

        if(!name || !origin || !status || !image || !species || !gender){
            return res.status(401).send('Faltan datos')
        }
    
        const [character, created] = await Favorite.findOrCreate({
            where:{
                name: name
            },
            defaults:{
                origin: origin,
                status: status,
                image: image,
                species: species,
                gender: gender,
            }
        })   

        const allCharacter = await Favorite.findAll();

        return res.status(200).json(allCharacter)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = postFav