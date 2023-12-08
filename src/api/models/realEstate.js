const mongoose = require("mongoose");
const { getEstateData } = require("../util/thirdPartyData");

const estateSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Please provide a Estate location"],
  },
  type: {
    type: String,
    required: [true, "Please provide a Estate type"],
  },
  addresstype: {
    type: String,
    required: [true, "Please provide a Estate addresstype"],
  },
  eclass: {
    type: String,
    required: [true, "Please provide a Estate class"],
  },
  osm_id: {
    type: Number,
    required: [true, "Please provide a Estate osm id"],
  }
}, { timestamps: true });

module.exports = mongoose.model("estate", estateSchema);

(async () => {
    try {
        const result = await mongoose.model("estate", estateSchema).find();
        if (result.length != 0) {
            console.log("Movies Data Founded 😀.");
        } else {
            const estate = await getEstateData('Pune');
            if (estate.status) {
                const data = estate.data.map((element) => {
                    return { location: element.name, type: element.type, addresstype: element.addresstype, eclass: element.class, osm_id: element.osm_id }
                });
                await mongoose.model("estate", estateSchema).insertMany(data);
                console.log("Estate Inserted 😀."); 
            }
        }
    } catch (error) {
        console.log("Estate Sections error===>>", error);
    }
}).call();