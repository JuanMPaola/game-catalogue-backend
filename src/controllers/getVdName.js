const axios = require('axios');
const { Videogame } = require('../db');
const URL = "https://api.rawg.io/api/games?search=";
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getVdName = async (req, res) => {
  const { name } = req.query;
  try {
    let allGames = [];

    const juegosDb = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      }
    });

    if (juegosDb) {
      allGames = juegosDb.map((game) => (game));
    }

    const response = await axios.get(`${URL}${name}&key=${API_KEY}`);
    const data = response.data;
    let apiGames = [];

    if (data.results && data.results.length > 0) {
      data.results.forEach(juego => {
        apiGames.push(juego);
      });
      allGames = [...allGames, ...apiGames].slice(0,100);
    }

    if (allGames.length > 0) return res.status(200).json(allGames);
    else return res.status(404).send('Not Found');
      
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getVdName };


/* const axios = require('axios');
const { API_KEY } = process.env;
const BASE_URL = 'https://api.rawg.io/api/games';

const getVdName = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        search: name,
        key: API_KEY,
      },
    });

    const data = response.data;

    if (data.results && data.results.length > 0) {
      const primerJuego = data.results[0];
      const juego = {
        id: primerJuego.id,
        name: primerJuego.name,
        description: primerJuego.description,
      };
      return res.status(200).json(juego);
    } else {
      return res.status(404).send('Not Found');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getVdName }; */

/* const {name} = req.query;
    try {
        const {data} = await axios(https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        if(data.results && data.results.length > 0){
            const first15Results = data.results.slice(0,16);
            const videogame = first15Results.map(game =>({
                id: game.id,
                name: game.name,
                description: game.description
            }));
            return res.status(200).json(videogame)
        }else{
            const dbVideogame = await findOne({where:{name}})
            if(dbVideogame){
                return res.status(200).json({
                    id: dbVideogame.id,
                    name: dbVideogame.name,
                    description: dbVideogame.description
                })
            }else{
                res.status(404).send("Videojuego no encontrado")
            }
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }` */
