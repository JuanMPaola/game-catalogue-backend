const { Videogame } = require('../db')
const { postHandler } = require('../handlres/postHandler')

const postVideogame = async (req, res) => {
    try {
        const { name, background_image, description, rating, realesed, platforms, genres} = req.body;

        if (!name || !description) res.status(400).json({ message: "Faltan datos" })

        console.log(genres, platforms)

        const pe = await Videogame.findOne({ where: { name } })
        if (pe) return res.status(400).json({ message: "Videogame already exists" })

        if (name && description) {
            const juego = postHandler({name, description, realesed, background_image, rating, platforms, genres});
            res.status(200).json({juego})
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = { postVideogame }