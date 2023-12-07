require("dotenv").config()
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_accessKeyId,
    secretAccessKey: process.env.AWS_secretAccessKey,
});


exports.uploadImage = async (files) => {
    const date = new Date().getTime();
    const fileContent = fs.readFileSync(files[0].path);

    const params = {
        Bucket: process.env.AWS_bucketName,
        ContentType: files[0].mimetype,
        Key: `uploads/${date}${files[0].filename}`,
        Body: fileContent,
    };

    const data = await s3.upload(params).promise();
    const mediaURL = data.Location;
    return mediaURL;
};

exports.uploadImageBase64 = async (base64) => {
    if (!base64.includes('https') && base64.match(/^data:image\/\w+;base64,/)) {
        let fileName = Date.now() + "_pic.png";
        const imageBuffer = Buffer.from(base64.split(',')[1], 'base64');
        const params = {
            Bucket: process.env.AWS_bucketName,
            Key: `${fileName}`,
            Body: imageBuffer,
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        };
        let data = await s3.upload(params).promise();
        console.log("data", data);
        return { status: true, location: data.Location };
    } else {
        return { status: false };
    }
};
