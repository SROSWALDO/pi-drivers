const getAllTeams = require('../controllers/getTeams');

const getTeamsHandler = async(req, res) => {
    try {
        const teams = await getAllTeams();
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({ error: error.message })
        
    }
}

module.exports = getTeamsHandler;