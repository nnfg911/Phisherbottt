const axios = require('axios');

module.exports = async (req, res) => {
    const name = req.query.username;
    try {
        const response = await axios(`https://api.mojang.com/users/profiles/minecraft/${name}` , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        const uuid = response.data.id;
        const username = response.data.name;
        if (!uuid) {
            res.status(404);
            return res.send({});
        }
        res.status(200);
        return res.send({ username: username, uuid: uuid });
      } catch (error) {
        console.log(error);
        res.status(400);
        return res.send({});
      }
};