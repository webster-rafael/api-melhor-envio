import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Rota para calcular frete
app.post("/calculate-frete", async (req, res) => {
  const { cep, width, height, weight } = req.body;

  const url = "https://melhorenvio.com.br/api/v2/me/shipment/calculate";
  const token = process.env.TOKEN_ACESS;

  const data = {
    from: {
      postal_code: "88330973", // CEP de origem fixo
    },
    to: {
      postal_code: cep, // CEP recebido do cliente
    },
    package: {
      height: height,
      width: width,
      length: 7,
      weight: weight,
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data); // Retorna os dados da resposta para o frontend
  } catch (error) {
    console.error("Erro ao calcular frete:", error);
    res.status(500).json({ error: "Erro ao calcular frete." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
