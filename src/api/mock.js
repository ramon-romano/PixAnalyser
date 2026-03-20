const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pickReceiverProfile = (destinationKeyValue) => {
  const key = String(destinationKeyValue ?? "").trim();
  const digits = key.replace(/\D/g, "");

  const isLikelyCpf = digits.length === 11;
  const isLikelyCnpj = digits.length === 14;

  const taxIdNumber =
    (isLikelyCpf || isLikelyCnpj) && digits ? digits : "12345678900";

  const isSuspicious = /000$/.test(digits) || /@fraude\.com$/i.test(key);

  return {
    taxIdNumber,
    receiverName: isSuspicious ? "Conta Suspeita" : "Fulano de Tal",
    destinationBank: isSuspicious ? "Banco Desconhecido" : "Banco Exemplo",
    balance: isSuspicious ? 87.12 : 12345.67,
    confidenceScore: isSuspicious ? 0.42 : 0.92,
    riskLevel: isSuspicious ? "HIGH" : "LOW",
  };
};

const ok = (body) => ({
  data: {
    statusCodeValue: 200,
    body,
  },
});

export const buscarDadosDaChavePix = async (destinationKeyValue, originClientId) => {
  const profile = pickReceiverProfile(destinationKeyValue);
  await sleep(350);

  return ok({
    originClientId,
    originClientName: "Cliente Origem (Mock)",
    destinationKeyValue,
    receiverName: profile.receiverName,
    taxIdNumber: profile.taxIdNumber,
    destinationBank: profile.destinationBank,
    balance: profile.balance,
    createdAt: new Date().toISOString(),
  });
};

export const consultarAvaliacaoIA = async (
  destinationKeyValue,
  originClientId,
  amount,
  description
) => {
  const profile = pickReceiverProfile(destinationKeyValue);
  await sleep(450);

  return ok({
    aiAnalyze: {
      confidenceScore: profile.confidenceScore,
      riskLevel: profile.riskLevel,
      reasons:
        profile.riskLevel === "HIGH"
          ? ["Chave com padrão suspeito (termina em 000)."]
          : ["Nenhum indicador de risco relevante encontrado."],
    },
    transactionInformation: {
      originClientId,
      destinationKeyValue,
      receiverName: profile.receiverName,
      amount,
      description,
    },
  });
};

export const realizarTransferenciaPix = async (
  destinationKeyValue,
  originClientId,
  amount,
  description
) => {
  await sleep(600);

  return ok({
    message: "Transferência Pix realizada (Mock).",
    transactionId: `MOCK-${Date.now()}`,
    destinationKeyValue,
    originClientId,
    amount,
    description,
    createdAt: new Date().toISOString(),
  });
};

