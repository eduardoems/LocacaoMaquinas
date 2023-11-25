# Crud Firebase com Google Auth 🐱‍🏍

>> Projeto criado Pelos alunos:
    Eduardo de Moraes Souza, 
    Gustavo Machado de Oliveira Cruz, 
    Julia Casallit.
    Projeto proposto: Fazer um projeto com banco de dados noSql, com autenticação da conta google. onde assim que inserido a informação no banco de dados retornar na tela em forma de lista algundados.

    ## 💬 Contato

Eduardo de Moraes <br>
<a href="https://www.linkedin.com/in/eduardo-de-moraes-souza-b224586b/" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>


## 📋 Instruções

- [ ] Inicialmente clone o projeto; 
- [ ] Acesse https://firebase.google.com e crie um novo projeto Web.
- [ ] Edite o arquivo firebase.js e cole nele as informações de conexão apresentadas pelo Firebase.
- [ ] Acesse Realtime Database e em regras, informe que apenas usuários autenticados terão direito de acesso (escrita e leitura) aos dados:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

- [ ] Abra o arquivo index.html no seu navegador, crie um novo usuário e navegue pelo seu CRUD! (ou se preferir, instale o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code, clique com o botão direito dentro do arquivo index.html e selecione Open with Live Server)

## 💬 Contato

Prof. Ms. Ricardo Leme <br>
<a href="https://www.linkedin.com/in/ricardo-leme/" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
<a href="mailto:ricardo.leme@fatec.sp.gov.br" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white">
</a>

## 📝 Licença

Esse projeto está sob a licença Apache. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
---
Made with 💜, HTML, CSS and only Vanilla JS. 