export async function translateText(text: string): Promise<string> {
  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "ar",
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data.translations.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
}
