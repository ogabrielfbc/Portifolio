/*
  CONFIGURAÇÃO DO PORTFÓLIO
  1. Configure os dados do EmailJS abaixo para ativar os dois e-mails.
  2. O formulário guarda as mensagens no navegador (LocalStorage).
  3. O armazenamento local é demonstrativo e não substitui um servidor.
*/

const CONFIGURACAO_EMAIL = {
  ativa: true,
  chavePublica: "kSY0xUPw6bbHB3iAz",
  idServico: "service_1eid35n",
  modeloNotificacao: "template_hvcb1se",
  modeloConfirmacao: "template_yy2a0qo"
};

const CHAVE_MENSAGENS = "portfolio_gabriel_mensagens";
const CHAVE_INICIALIZACAO = "portfolio_gabriel_dados_iniciais";

function obterMensagens() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_MENSAGENS)) || [];
  } catch (erro) {
    console.error("Não foi possível ler as mensagens:", erro);
    return [];
  }
}

function salvarMensagens(mensagens) {
  localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
}

function criarMensagensDeTeste() {
  if (localStorage.getItem(CHAVE_INICIALIZACAO)) return;

  const mensagensAtuais = obterMensagens();

  if (mensagensAtuais.length === 0) {
    const exemplos = [
      ["Mariana Costa", "mariana.exemplo@email.com", "Oportunidade", "Gostei do seu portfólio. Podemos conversar sobre uma oportunidade?"],
      ["Lucas Almeida", "lucas.exemplo@email.com", "Projeto", "Tenho uma ideia de projeto e gostaria de trocar experiências."],
      ["Ana Souza", "ana.exemplo@email.com", "Dúvida", "Quais tecnologias você está estudando atualmente?"],
      ["Pedro Santos", "pedro.exemplo@email.com", "Parceria", "Vamos conversar sobre desenvolvimento web?"],
      ["Beatriz Lima", "beatriz.exemplo@email.com", "Feedback", "Seu projeto ficou interessante. Parabéns!"],
      ["Rafael Oliveira", "rafael.exemplo@email.com", "Contato", "Gostaria de conhecer melhor seus projetos."],
      ["Julia Ferreira", "julia.exemplo@email.com", "Tecnologia", "Você já trabalhou com JavaScript?"],
      ["Enzo Rodrigues", "enzo.exemplo@email.com", "Projeto", "Podemos conversar sobre uma ideia de aplicação?"],
      ["Camila Martins", "camila.exemplo@email.com", "Oportunidade", "Estou entrando em contato para falar de uma oportunidade."],
      ["Bruno Pereira", "bruno.exemplo@email.com", "Dúvida", "Como começou a estudar programação?"],
      ["Larissa Gomes", "larissa.exemplo@email.com", "Feedback", "Gostei da organização da página."],
      ["Felipe Ribeiro", "felipe.exemplo@email.com", "Parceria", "Tenho interesse em colaborar em um projeto."],
      ["Isabela Carvalho", "isabela.exemplo@email.com", "Contato", "Gostaria de conversar com você."],
      ["Gustavo Nunes", "gustavo.exemplo@email.com", "Tecnologia", "Qual linguagem você mais utiliza nos seus projetos?"],
      ["Manuela Barbosa", "manuela.exemplo@email.com", "Projeto", "Seu projeto de loja virtual chamou minha atenção."],
      ["Daniel Costa", "daniel.exemplo@email.com", "Oportunidade", "Podemos marcar uma conversa?"],
      ["Sofia Mendes", "sofia.exemplo@email.com", "Dúvida", "Você pretende estudar desenvolvimento de software?"],
      ["Vitor Araújo", "vitor.exemplo@email.com", "Feedback", "Parabéns pelo desenvolvimento do portfólio."],
      ["Eduarda Rocha", "eduarda.exemplo@email.com", "Contato", "Encontrei seu site e gostaria de saber mais."],
      ["Thiago Martins", "thiago.exemplo@email.com", "Parceria", "Vamos trocar conhecimentos sobre programação?"]
    ];

    const registros = exemplos.map((item, indice) => ({
      id: Date.now() + indice,
      nome: item[0],
      email: item[1],
      assunto: item[2],
      mensagem: item[3],
      data: new Date(Date.now() - indice * 3600000).toISOString(),
      status: indice % 3 === 0 ? "Nova" : "Lida",
      teste: true
    }));

    salvarMensagens(registros);
  }

  localStorage.setItem(CHAVE_INICIALIZACAO, "sim");
}

async function enviarEmails(dados) {
  if (!CONFIGURACAO_EMAIL.ativa) {
    return { enviado: false, motivo: "nao_configurado" };
  }

  if (!window.emailjs) {
    throw new Error("A biblioteca de e-mail não foi carregada.");
  }

  emailjs.init({ publicKey: CONFIGURACAO_EMAIL.chavePublica });

  const parametros = {
    nome: dados.nome,
    email: dados.email,
    assunto: dados.assunto,
    mensagem: dados.mensagem,
    data: new Date(dados.data).toLocaleString("pt-BR")
  };

  // Modelo 1: notificação enviada ao responsável pelo portfólio.
  await emailjs.send(
    CONFIGURACAO_EMAIL.idServico,
    CONFIGURACAO_EMAIL.modeloNotificacao,
    parametros
  );

  // Modelo 2: confirmação enviada ao visitante.
  await emailjs.send(
    CONFIGURACAO_EMAIL.idServico,
    CONFIGURACAO_EMAIL.modeloConfirmacao,
    parametros
  );

  return { enviado: true };
}

document.addEventListener("DOMContentLoaded", () => {
  criarMensagensDeTeste();

  const ano = document.getElementById("anoAtual");
  if (ano) ano.textContent = new Date().getFullYear();

  const formulario = document.getElementById("formContato");
  if (!formulario) return;

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = document.getElementById("botaoEnviar");
    const status = document.getElementById("statusFormulario");

    const dados = {
      id: Date.now(),
      nome: formulario.nome.value.trim(),
      email: formulario.email.value.trim(),
      assunto: formulario.assunto.value.trim(),
      mensagem: formulario.mensagem.value.trim(),
      data: new Date().toISOString(),
      status: "Nova",
      teste: false
    };

    if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) {
      status.textContent = "Preencha todos os campos.";
      status.className = "form-status error";
      return;
    }

    const mensagens = obterMensagens();
    mensagens.unshift(dados);
    salvarMensagens(mensagens);

    botao.disabled = true;
    botao.innerHTML = 'Enviando... <i class="bi bi-hourglass-split"></i>';

    try {
      const resultado = await enviarEmails(dados);

      if (resultado.enviado) {
        status.textContent = "Mensagem salva e e-mails enviados com sucesso!";
      } else {
        status.textContent = "Mensagem salva neste navegador. O envio de e-mails ainda precisa ser configurado.";
      }

      status.className = "form-status success";
      formulario.reset();
    } catch (erro) {
      console.error("Erro no envio de e-mails:", erro);
      console.log("Status:", erro.status);
      console.log("Detalhes:", erro.text);
      status.textContent = "Mensagem salva, mas não foi possível enviar os e-mails. Verifique a configuração do serviço.";
      status.className = "form-status error";
    } finally {
      botao.disabled = false;
      botao.innerHTML = 'Enviar mensagem <i class="bi bi-send"></i>';
    }
  });
});
