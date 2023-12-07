require("dotenv").config()
const axios = require('axios');

exports.getBlogPosts = async () => {
    const options = {
        method: 'GET',
        url: 'https://blogsapi.p.rapidapi.com/',
        params: {
            ordering: '-date_published'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'blogsapi.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return { status: true, message: "Data Founded", data: response.data };
    } catch (error) {
        console.error(error);
        return { status: false, message: error.message };
    }
}