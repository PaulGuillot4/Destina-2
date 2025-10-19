import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json(
        { error: "El mensaje es requerido" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    return Response.json({ text });
  } catch (error) {
    console.error("Error en la API de Gemini:", error);
    return Response.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}