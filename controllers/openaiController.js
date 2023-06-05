const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const numberOfImages = 3; // Number of images to generate

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: numberOfImages,
      size: imageSize,
    });

    const imageUrls = response.data.data.map((imageData) => imageData.url);

    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The images could not be generated',
    });
  }
};

module.exports = { generateImage };


module.exports = { generateImage };