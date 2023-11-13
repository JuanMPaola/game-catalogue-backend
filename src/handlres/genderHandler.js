const { Genre } = require('../db')

const genderHandler = (genders) => {
    const nombres = [];
    const ids = [];
    for (let i = 0; i < genders.length; i++) {
        Genre.findOrCreate({where: {id: genders[i].id, name: genders[i].name}})
    }
}

module.exports = { genderHandler }