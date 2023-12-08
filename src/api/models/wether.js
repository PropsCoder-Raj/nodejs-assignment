const mongoose = require("mongoose");
const { getWetherData } = require("../util/thirdPartyData");

const wetherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Please provide a Wether location"],
  },
  region: {
    type: String,
    required: [true, "Please provide a Wether region"],
  },
  temp_c: {
    type: Number,
    required: [true, "Please provide a Wether temp c"],
  },
  temp_f: {
    type: Number,
    required: [true, "Please provide a Wether temp f"],
  },
  wind_degree: {
    type: Number,
    required: [true, "Please provide a Wether wind degree"],
  }
}, { timestamps: true });

module.exports = mongoose.model("wether", wetherSchema);

(async () => {
    try {
        const result = await mongoose.model("wether", wetherSchema).find();
        if (result.length != 0) {
            console.log("Wether Data Founded 😀.");
        } else {
            const wether = await getWetherData('Pune');
            if (wether.status) {
                const data = wether.data;
                await mongoose.model("wether", wetherSchema).create({
                    location: data.location.name,
                    region: data.location.region,
                    temp_c: data.current.temp_c,
                    temp_f: data.current.temp_f,
                    wind_degree: data.current.wind_degree
                });
                console.log("Wether Inserted 😀.");
            }
        }
    } catch (error) {
        console.log("Wether Sections error===>>", error);
    }
}).call();