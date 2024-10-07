export async function translateText(text: string): Promise<string> {
  const apiKey = "6ec26f6702msh9e24c40d55e04bfp150710jsn90665979a964"; // Replace with your API key
  const endpoint =
    "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

  const params = new URLSearchParams({
    from: "en",
    to: "ar",
    textType: "plain",
  });

  try {
    const response = await fetch(`${endpoint}&${params.toString()}`, {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: text }]),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch translation");
    }

    const data: { translations: { to: string; text: string }[] }[] =
      await response.json();
    const arabicTranslation = data[0].translations.find(
      (translation) => translation.to === "ar"
    )?.text;

    console.log("Translated Text:", arabicTranslation);
    return arabicTranslation || "";
  } catch (error) {
    console.error("Error during translation:", error);
    throw error;
  }
}
