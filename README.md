# Portfólio — Gabriel Batista

<<<<<<< HEAD
Olá! Meu nome é Gabriel Batista e sou estudante do Ensino Médio Técnico em Tecnologia da Informação.

Este repositório contém meu portfólio pessoal, desenvolvido para apresentar meus conhecimentos, projetos e minha evolução na área de tecnologia.

## Sobre o projeto

O portfólio foi desenvolvido para apresentar minhas habilidades e projetos de forma organizada, moderna e responsiva.

## Tecnologias utilizadas
=======
Projeto acadêmico de portfólio dinâmico desenvolvido com HTML5, CSS3, JavaScript, Bootstrap 5 e LocalStorage.

## 1. Como executar

1. Extraia a pasta `portfolio-gabriel`.
2. Abra `index.html` no navegador ou utilize a extensão Live Server do VS Code.
3. Para abrir a área administrativa, acesse `admin.html`.

Não é necessário instalar Node.js, Java, Spring Boot ou banco de dados para executar a versão demonstrativa.

## 2. Personalização obrigatória

Antes de entregar:

- Substitua `assets/img/perfil.jpg` pela sua foto.
- Atualize os links do GitHub e LinkedIn no `index.html`.
- Substitua os links genéricos dos projetos pelos repositórios verdadeiros.
- Revise os textos para que representem fielmente sua experiência.
- Atualize os dados de contato.
- Troque a senha de demonstração em `admin.js`.

## 3. Armazenamento e painel administrativo

O formulário grava as mensagens em `localStorage`, em formato JSON, no navegador utilizado. Na primeira inicialização, `script.js` cria automaticamente 20 registros fictícios para demonstração.

O painel `admin.html` permite consultar, pesquisar, filtrar, criar, editar, alterar status e excluir registros.

**Limitação importante:** LocalStorage não é compartilhado entre visitantes, navegadores ou dispositivos. Portanto, uma mensagem enviada por outra pessoa não aparece automaticamente no painel do administrador em outro dispositivo. Para isso, é necessário um backend ou serviço externo de armazenamento.

A senha do painel também fica no JavaScript e não oferece segurança real. O painel é demonstrativo e não deve armazenar dados sensíveis em produção.

## 4. Integração de e-mails com EmailJS

A integração foi preparada com EmailJS para enviar:
1. Uma notificação ao responsável pelo portfólio.
2. Uma confirmação para a pessoa que preencheu o formulário.

Para ativar:

1. Crie uma conta em https://www.emailjs.com/.
2. Configure um serviço de e-mail.
3. Crie um modelo para a notificação ao responsável e outro para a confirmação ao visitante.
4. Nos dois modelos, utilize as variáveis `{{nome}}`, `{{email}}`, `{{assunto}}`, `{{mensagem}}` e `{{data}}`.
5. Copie a chave pública, o ID do serviço e os IDs dos dois modelos.
6. Preencha `CONFIGURACAO_EMAIL` no início de `script.js` e altere `ativa: false` para `ativa: true`.
7. Teste com endereços de e-mail autorizados no serviço.

A chave pública do EmailJS pode ser usada no navegador conforme o modelo de integração do serviço, mas configure limites e proteções contra spam no painel EmailJS. Não coloque senhas de e-mail ou chaves privadas no JavaScript.

## 5. Acesso administrativo

Arquivo: `admin.html`

Senha inicial de demonstração: `troque-esta-senha`

Altere `SENHA_ADMIN` em `admin.js` antes de apresentar o trabalho. Como a senha está no código do navegador, isso não é autenticação segura para um site público.

## 6. Tecnologias utilizadas
>>>>>>> da61f07 (Corrige estrutura do portfolio)

- HTML5
- CSS3
- JavaScript
<<<<<<< HEAD
- Bootstrap
- EmailJS

## Projetos apresentados

- **NEXUS TECH:** projeto de e-commerce.
- **GymTracker:** projeto de acompanhamento de treinos.
- **AtacaTudo:** sistema de gerenciamento de estoque.
- **Sistema de Reservas:** aplicação para gerenciamento de reservas de laboratórios.

## Acesse meu portfólio

<<<<<<< HEAD
[Visualizar portfólio](https://ogabrielfbc.github.io/Port
=======
- Bootstrap 5
- Bootstrap Icons
- LocalStorage API
- EmailJS (integração opcional)

## 7. Estrutura

```text
portfolio-gabriel/
├── index.html
├── style.css
├── script.js
├── admin.html
├── admin.css
├── admin.js
├── README.md
└── assets/
    └── img/
        └── projetos/
```

## 8. Observação para a apresentação

Explique que a versão entregue demonstra armazenamento local e gerenciamento CRUD no navegador. Para centralizar mensagens de diferentes visitantes e administrar dados reais com segurança, seria necessário um backend ou serviço externo. Não apresente o LocalStorage como banco de dados compartilhado.
>>>>>>> da61f07 (Corrige estrutura do portfolio)
=======
[Visualizar portfólio](https://ogabrielfbc.github.io/Portifolio/)

## Contato

- GitHub: https://github.com/ogabrielfbc

---

Desenvolvido por Gabriel Batista.
>>>>>>> origin/main
