
const { response } = require('express');

const URL = 'https://rickandmortyapi.com/api/character/'
const axios = require('axios');



const getCharById = async(req, res) => {
    try {
        const { id } = req.params;

        const { data } = await axios.get(`${URL}/${id}`)
        const { status, name, species, origin, image, gender} = data 

        if(name){
            const character =  {
                id ,
                name,
                status,
                species,
                origin :origin.name,
                image,
                gender
            }
            
            return res.status(200).json(character)
        }
        
        if(!name) throw Error(`Faltan datos del personaje con el ID: ${id}`)

    } catch (error) {
        return error.message.includes('ID')
        ? res.status(404).send(error.message)
        : res.status(500).send(error.response.data.error)
    } 

}


module.exports = {
    getCharById
};
