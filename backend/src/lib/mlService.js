import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

const analyzeMessage = async (text) => {
  try {
    const response = await axios.post(ML_SERVICE_URL, {
      text,
    });

    return response.data;

  } catch (error) {
    console.error("ML Service Error:", error.message);

    // Fail-safe fallback (never crash chat)
    return {
      toxic_score: 0,
      spam_score: 0,
      smart_replies: [],
    };
  }
};

export default analyzeMessage;