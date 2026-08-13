import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Hardware scan and recommendation endpoint via Gemini AI
app.post("/api/ai-optimize", async (req, res) => {
  try {
    const { specs, installedGames } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: true,
        aiGenerated: false,
        summary: "Análise realizada com o motor nativo Palorni. Adicione a chave GEMINI_API_KEY para relatórios avançados por inteligência artificial.",
        recommendations: [
          "Defina Win32PrioritySeparation para 38 (Prioridade de Primeiro Plano)",
          "Desative o Core Parking e C-States para desempenho constante em jogos",
          "Ajuste SvcHostSplitThreshold com base no total de RAM detectado",
          "Desative a aceleração de ponteiro do mouse para precisão 1:1"
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Você é o especialista de otimização de sistema do Palorni System Optimizer para Windows.
Analise a seguinte configuração de hardware e jogos do usuário:

Hardware:
- CPU: ${specs?.cpu || 'Não detectado'}
- GPU: ${specs?.gpu || 'Não detectado'}
- RAM: ${specs?.ram || '16GB'}
- Disco: ${specs?.driveType || 'SSD NVMe'}
- Sistema: ${specs?.os || 'Windows 11'}

Jogos Instalados:
${installedGames && installedGames.length > 0 ? installedGames.map((g: any) => `- ${g.name} (${g.genre})`).join('\n') : 'Nenhum jogo selecionado'}

Forneça um relatório em Português (do Brasil) formatado com marcações claras:
1. **Diagnóstico do Sistema**: Breve resumo do equilíbrio do hardware (gargalos, pontos fortes).
2. **3 Otimizações Críticas Recomendadas**: Ajustes de registro/energia/rede mais impactantes.
3. **Dicas Específicas para os Jogos Detectados**: Configurações de QoS, GPU e perfil de energia recomendados para os jogos listados.

Mantenha o tom profissional, direto e empolgante da Palorni Tweaks.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      aiGenerated: true,
      analysis: response.text || "Relatório gerado com sucesso.",
    });
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    res.status(500).json({
      success: false,
      error: "Falha ao gerar recomendações por IA. Utilizando recomendador nativo Palorni.",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Palorni Optimizer Server running on http://localhost:${PORT}`);
  });
}

startServer();
