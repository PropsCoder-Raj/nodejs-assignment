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

exports.getNewsData = async (category) => {
    const options = {
        method: 'GET',
        url: 'https://newsi-api.p.rapidapi.com/api/category',
        params: {
          category: category,
          language: 'en',
          country: 'us',
          sort: 'top',
          page: '1',
          limit: '20'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'newsi-api.p.rapidapi.com'
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

exports.getMusicData = async (data) => {
    const options = {
        method: 'POST',
        url: 'https://musicapi13.p.rapidapi.com/public/search',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'musicapi13.p.rapidapi.com'
        },
        data: data
      };
      

    try {
        const response = await axios.request(options);
        return { status: true, message: "Data Founded", data: response.data };
    } catch (error) {
        console.error(error);
        return { status: false, message: error.message };
    }
}

exports.getRecipeData = async () => {
    const options = {
        method: 'GET',
        url: 'https://food-recipes-with-images.p.rapidapi.com/',
        params: {q: 'chicken soup'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
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

exports.getMoviesData = async () => {

    let options = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: 'https://www.omdbapi.com/?i=tt3896198&apikey=13361862',
        headers: { }
    };
      

    try {
        const response = await axios.request(options);
        return { status: true, message: "Data Founded", data: response.data };
    } catch (error) {
        console.error(error);
        return { status: false, message: error.message };
    }
}