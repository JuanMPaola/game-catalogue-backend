const axios = require('axios');
const URL = "https://api.rawg.io/api/games";
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
let PAGE = 1;

const getVideogame = async (req, res) => {
    try {
        let allGames = [];
        allGames = await Videogame.findAll({include:{model: Genre}})

        while (PAGE < 6) {
            let { data } = await axios(`${URL}?key=${API_KEY}&page=${PAGE}`)
            allGames = [...allGames, ...data.results];
            PAGE++;
        }
        PAGE =1;

        if (!allGames) return res.status(404).send("Not found")

        if (allGames) return res.status(200).json(allGames)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getVideogame }