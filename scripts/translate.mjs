import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carica le variabili dal file .env
dotenv.config({ path: path.join(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API Key mancante nel file .env!");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const localesDir = path.join(__dirname, "../src/data/locales");
const itJsonPath = path.join(localesDir, "it.json");

if (!fs.existsSync(itJsonPath)) {
  console.error("Il file it.json sorgente non esiste!");
  process.exit(1);
}

const itContent = JSON.parse(fs.readFileSync(itJsonPath, "utf-8"));

const languages = {
  en: "English",
  fr: "French",
  de: "German",
  es: "Spanish"
};

async function translateLocale(langCode, langName) {
  console.log(`Avvio traduzione in corso per: ${langName} (${langCode})...`);
  
  const prompt = `Translate the values of this JSON object from Italian to ${langName}. 
  CRITICAL RULES:
  - Keep all the keys exactly the same. Do not translate the keys, only translate the text values.
  - Keep values like numbers (e.g., "28+") or phone numbers or emails unchanged.
  - The tone must be premium, professional, and elegant, suitable for a luxury nautical plexiglass manufacturing and maritime engineering company website.
  - Return only the translated JSON object matching the exact structure.
  
  JSON to translate:
  ${JSON.stringify(itContent, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: prompt }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Risposta vuota dall'API di Gemini");
    
    // Converte e verifica la correttezza del formato JSON
    const translatedJson = JSON.parse(text.trim());
    
    const outputPath = path.join(localesDir, `${langCode}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(translatedJson, null, 2), "utf-8");
    console.log(`Salvata con successo la traduzione in: ${langCode}.json`);
  } catch (error) {
    console.error(`Errore durante la traduzione in ${langCode}:`, error.message);
  }
}

async function main() {
  for (const [code, name] of Object.entries(languages)) {
    await translateLocale(code, name);
    // Attendi 2 secondi tra le traduzioni per evitare limiti di RPM della quota Free
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log("Traduzioni completate con successo!");
}

main();
