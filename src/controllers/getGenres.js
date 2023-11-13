const axios = require('axios')
const URL = "https://api.rawg.io/api/genres"
require('dotenv').config();
const { API_KEY } = process.env

const { genderHandler } = require("../handlres/genderHandler")

const getGenres = async (req, res) => {
    try {
        const { data } = await axios(`${URL}?key=${API_KEY}`)
        const genres = data.results
        if (!data) {
            res.status(404).send("Not found")
        } else {
            genderHandler(genres)
            return res.status(200).json(genres)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getGenres }