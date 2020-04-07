const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    // INDEX ALL ONGS ____________________________________________________
    async index (req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    // CREATE NEW ONG ____________________________________________________
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = generateUniqueId();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return res.json({ id });
    }
};