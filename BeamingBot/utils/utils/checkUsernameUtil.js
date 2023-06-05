const axios = require('axios');

module.exports = async (name) => {
    try {
        const response = await axios(`https://api.mojang.com/users/profiles/minecraft/${name}` , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        if (!response.data.id) {
            return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    }