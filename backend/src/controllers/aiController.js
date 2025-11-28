import axios from "axios";

const OPENROUTER_API = process.env.OPENROUTER_BASE_URL;

const headers = {
  "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
};

// ✅ Summarization Endpoint
export const summarizeText = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const response = await axios.post(
      `${OPENROUTER_API}/chat/completions`,
      {
        model: "mistralai/mistral-7b-instruct", // free-tier model
        messages: [
          { role: "system", content: "You are a helpful AI that summarizes text concisely." },
          { role: "user", content: `Summarize this text:\n${text}` },
        ],
      },
      { headers }
    );

    const summary = response.data.choices?.[0]?.message?.content || "No summary generated";
    res.json({ summary });
  } catch (err) {
    console.error("Summarization error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error || "Failed to summarize text.",
    });
  }
};

// ✅ Chat Endpoint
export const chatWithAI = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(
      `${OPENROUTER_API}/chat/completions`,
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a friendly AI assistant." },
          { role: "user", content: message },
        ],
      },
      { headers }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response generated";
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error || "Failed to get AI response.",
    });
  }
};
