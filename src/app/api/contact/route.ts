import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, product } = body;

    // Read configured recipient email from locales settings
    let recipientEmail = 'info@frallicciardi.it';
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const locales = JSON.parse(fileData);
      recipientEmail = locales.azienda?.contact_email || locales.azienda?.email || recipientEmail;
    } catch (e) {
      console.error("Error reading recipient email:", e);
    }

    console.log(`Nuovo messaggio ricevuto per il destinatario ${recipientEmail}:`, { name, email, message, product });

    // In a real scenario, here we would send an email or save to DB
    return NextResponse.json({
      success: true,
      message: "Messaggio inviato correttamente! Ti risponderemo a breve."
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Errore durante l'invio del messaggio."
    }, { status: 500 });
  }
}
