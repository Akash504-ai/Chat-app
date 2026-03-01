import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

const analyzeMessage = async (text) => {
  try {
    console.log("Calling ML:", ML_SERVICE_URL);

    const response = await axios.post(
      ML_SERVICE_URL,
      { text },
      { timeout: 60000 }
    );

    console.log("ML RESPONSE:", response.data);

    return response.data;

  } catch (error) {
    console.error("🔥 FULL ML ERROR:", error);
    return {
      toxic_score: 0,
      spam_score: 0,
      smart_replies: [],
    };
  }
};

export default analyzeMessage;