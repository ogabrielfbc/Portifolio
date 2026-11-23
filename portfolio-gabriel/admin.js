/*
  Painel acadêmico demonstrativo.
  A senha abaixo fica visível no JavaScript do navegador.
  Não use este modelo como autenticação real de produção.
*/
const SENHA_ADMIN = "troque-esta-senha";
const CHAVE_MENSAGENS = "portfolio_gabriel_mensagens";
const CHAVE_INICIALIZACAO = "portfolio_gabriel_dados_iniciais";

const elemento = (id) => document.getElementById(id);

function lerMensagens() {
  try { return JSON.parse(localStorage.getItem(CHAVE_MENSAGENS)) || []; }
  catch { return []; }
}
function gravarMensagens(mensagens) {
  localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
}
function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[caractere]);
}
function dataFormatada(data) {
  const valor = new Date(data);
  return Number.isNaN(valor.getTime()) ? "Data não informada" : valor.toLocaleString("pt-BR");
}

function abrirPainel() {
  elemento("telaLogin").hidden = true;
  elemento("painel").hidden = false;
  atualizarPainel();
}
function sairPainel() {
  elemento("painel").hidden = true;
  elemento("telaLogin").hidden = false;
  elemento("senhaAdmin").value = "";
}

function atualizarPainel() {
  const mensagens = lerMensagens();
  elemento("totalMensagens").textContent = mensagens.length;
  elemento("totalNovas").textContent = mensagens.filter(m => m.status === "Nova").length;
  elemento("totalReais").textContent = mensagens.filter(m => !m.teste).length;

  const busca = elemento("pesquisa").value.trim().toLowerCase();
  const status = elemento("filtroStatus").value;
  const origem = elemento("filtroOrigem").value;

  const filtradas = mensagens.filter(m => {
    const texto = `${m.nome} ${m.email} ${m.assunto} ${m.mensagem}`.toLowerCase();
    const combinaBusca = texto.includes(busca);
    const combinaStatus = !status || m.status === status;
    const combinaOrigem = !origem || (origem === "teste" ? m.teste : !m.teste);
    return combinaBusca && combinaStatus && combinaOrigem;
  });

  const lista = elemento("listaMensagens");
  if (!filtradas.length) {
    lista.innerHTML = '<div class="empty-state"><i class="bi bi-inbox"></i>Nenhuma mensagem encontrada.</div>';
    return;
  }

  lista.innerHTML = filtradas.map(m => `
    <article class="message-card">
      <div class="message-head">
        <div>
          <div class="message-name">${escapar(m.nome)} ${m.teste ? '<span class="badge-demo">DEMONSTRAÇÃO</span>' : ""}</div>
          <div class="message-email">${escapar(m.email)}</div>
        </div>
        <div><span class="badge-status">${escapar(m.status || "Nova")}</span><div class="message-date mt-2">${escapar(dataFormatada(m.data))}</div></div>
      </div>
      <div class="message-subject">${escapar(m.assunto)}</div>
      <div class="message-text">${escapar(m.mensagem)}</div>
      <div class="message-actions">
        <button class="action-btn" data-acao="editar" data-id="${Number(m.id)}"><i class="bi bi-pencil"></i> Editar</button>
        <button class="action-btn" data-acao="status" data-id="${Number(m.id)}"><i class="bi bi-check2"></i> Marcar como lida</button>
        <button class="action-btn danger" data-acao="excluir" data-id="${Number(m.id)}"><i class="bi bi-trash"></i> Excluir</button>
      </div>
    </article>
  `).join("");
}

function mostrarEditor(mensagem = null) {
  elemento("formularioRegistro").hidden = false;
  elemento("tituloEditor").textContent = mensagem ? "Editar mensagem" : "Adicionar mensagem";
  elemento("registroId").value = mensagem?.id || "";
  elemento("registroNome").value = mensagem?.nome || "";
  elemento("registroEmail").value = mensagem?.email || "";
  elemento("registroAssunto").value = mensagem?.assunto || "";
  elemento("registroMensagem").value = mensagem?.mensagem || "";
  elemento("registroStatus").value = mensagem?.status || "Nova";
  elemento("formularioRegistro").scrollIntoView({ behavior: "smooth", block: "center" });
}
function esconderEditor() {
  elemento("formularioRegistro").hidden = true;
  elemento("formRegistro").reset();
  elemento("registroId").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Se o visitante abrir diretamente admin.html antes do index, inicializa os dados de demonstração.
  if (!localStorage.getItem(CHAVE_INICIALIZACAO)) {
    localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify([]));
    localStorage.setItem(CHAVE_INICIALIZACAO, "sim");
  }

  elemento("formLogin").addEventListener("submit", evento => {
    evento.preventDefault();
    if (elemento("senhaAdmin").value === SENHA_ADMIN) {
      elemento("erroLogin").textContent = "";
      abrirPainel();
    } else {
      elemento("erroLogin").textContent = "Senha incorreta.";
    }
  });

  elemento("botaoSair").addEventListener("click", sairPainel);
  elemento("botaoNova").addEventListener("click", () => mostrarEditor());
  elemento("botaoCancelar").addEventListener("click", esconderEditor);
  elemento("pesquisa").addEventListener("input", atualizarPainel);
  elemento("filtroStatus").addEventListener("change", atualizarPainel);
  elemento("filtroOrigem").addEventListener("change", atualizarPainel);

  elemento("formRegistro").addEventListener("submit", evento => {
    evento.preventDefault();
    const mensagens = lerMensagens();
    const id = elemento("registroId").value;
    const dados = {
      id: id ? Number(id) : Date.now(),
      nome: elemento("registroNome").value.trim(),
      email: elemento("registroEmail").value.trim(),
      assunto: elemento("registroAssunto").value.trim(),
      mensagem: elemento("registroMensagem").value.trim(),
      status: elemento("registroStatus").value,
      data: new Date().toISOString(),
      teste: false
    };

    const indice = mensagens.findIndex(m => String(m.id) === String(id));
    if (indice >= 0) mensagens[indice] = { ...mensagens[indice], ...dados };
    else mensagens.unshift(dados);

    gravarMensagens(mensagens);
    esconderEditor();
    atualizarPainel();
  });

  elemento("listaMensagens").addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;
    const mensagens = lerMensagens();
    const mensagem = mensagens.find(m => Number(m.id) === id);
    if (!mensagem) return;

    if (acao === "editar") mostrarEditor(mensagem);
    if (acao === "status") {
      mensagem.status = mensagem.status === "Nova" ? "Lida" : "Nova";
      gravarMensagens(mensagens);
      atualizarPainel();
    }
    if (acao === "excluir" && confirm("Deseja excluir esta mensagem?")) {
      gravarMensagens(mensagens.filter(m => Number(m.id) !== id));
      atualizarPainel();
    }
  });
});
