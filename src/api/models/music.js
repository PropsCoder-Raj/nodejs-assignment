const mongoose = require("mongoose");
const { getMusicData } = require("../util/thirdPartyData");

const musicSchema = new mongoose.Schema({
    albumName: {
        type: String,
        required: [true, "Please provide a music title"],
        unique: true,
    },
    source: {
        type: String,
        required: [true, "Please provide an source"],
    },
    artistNames: {
        type: String,
        required: [true, "Please provide an Album Name"],
    },
    track: {
        type: String,
        required: [true, "Please provide an track"],
    }
}, { timestamps: true });

module.exports = mongoose.model("music", musicSchema);

(async () => {
    try {
        const result = await mongoose.model("music", musicSchema).find();
        if (result.length != 0) {
            console.log("Music Data Founded 😀.");
        } else {
            const data = {
                track: 'Bezos I',
                artist: 'Bo Burnham',
                type: 'track',
                sources: ['spotify']
            };
            const music = await getMusicData(data);
            if (music.status) {
                const data = music.data.tracks.map((element) => {
                    return { source: element.source, albumName: element.data.albumName, artistNames: element.data.artistNames[0], track: element.data.name }
                })
                await mongoose.model("music", musicSchema).insertMany(data);
                console.log("Music Inserted 😀.");
            }
        }
    } catch (error) {
        console.log("music Sections error===>>", error);
    }
}).call();