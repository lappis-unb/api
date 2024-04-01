
## API - Aplicação Backend Rest Api

Aplicação backend REST API com NodeJS, em Javascript, usando Express e MongoDB



## Referência

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Documentação da API

### Endpoints disponíveis


| API - Método   | Endpoint: - Exemplo usando a VM Lappis (IP:Porta 164.41.98.12:6380)     | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|  `GET` Motor de Busca| `http://164.41.98.12:6380/propostas/busca/saude%2004-10-2023/3` | Todas propostas que possuem o termo 'saude' na data '04/10/2023' no processo participativo 3.|
| `GET` Propostas | `http://164.41.98.12:6380/propostas` | Todas propostas (100 - paginação *) |
| `GET` | `http://164.41.98.12:6380/propostas/total` | Número total de propostas|
| `GET` | `http://164.41.98.12:6380/propostas/totalEvento/3` | Total de propostas, votos e id do evento 3|
| `GET` | `http://164.41.98.12:6380/propostas/totalCategoria` | Total de propostas, votos e id de todas as categorias|
| `GET` | `http://164.41.98.12:6380/propostas/totalCategoriaEvento/confjuv4` | Total de propostas, votos e id das categorias do evento 'confjuv4'|
| `GET` | `http://164.41.98.12:6380/propostas/totalDataEvento/confjuv4` | Total de propostas, votos e id das datas do evento 'confjuv4'|
| `GET` | `http://164.41.98.12:6380/propostas/totalDatas` | Total de propostas e votos por data|
| `GET` | `http://164.41.98.12:6380/propostas/propostasData` | Propostas por data de publicação|
| `GET` | `http://164.41.98.12:6380/propostas/categoria/20` | Propostas da categoria cujo ID é 20|
| `GET` | `http://164.41.98.12:6380/propostas/categoriaName/Outros` | Propostas da categoria cujo Nome é 'Outros'|
| `GET` | `http://164.41.98.12:6380/propostas/deate/1/5` | As propostas de 1 até 5|
| `GET` | `http://164.41.98.12:6380/propostas/6540b4ef2e100633ecac30e0` | Proposta cujo campo _id é igual a "6540b4ef2e100633ecac30e0"|
| `GET` | `http://164.41.98.12:6380/propostas/id/1` | Proposta cujo campo id é igual a '1'|
| `POST` | `http://164.41.98.12:6380/propostas/create` | Proposta novo registro - jason enviado no body|
| `POST` | `http://164.41.98.12:6380/propostas/create` | Proposta novo registro - json enviado no body|
| `GET`  | `http://164.41.98.12:6380/propostas/logs/:id` | Proposta - registros de atualizações da proposta|
| `POST` | `http://164.41.98.12:6380/propostas/update` | Proposta - atualiza dados da proposta e grava log|
| `POST` | `http://164.41.98.12:6380/propostas/updatevoto` | Proposta - registra voto e dados relacionados|
| `GET` | `http://164.41.98.12:6380/propostas/propostavotos/:proposta_id` | Proposta - busca registros de votos|
| `POST` | `http://164.41.98.12:6380/propostas/statusvoto` | Proposta - atualiza quantidade de votos na proposta|
| `POST` | `http://164.41.98.12:6380/propostas/status` | Proposta - atualiza o estado da proposta|
| `POST` | `http://164.41.98.12:6380/propostas/commnents` | Proposta - atualiza a quantidade de comentarios da proposta|
| `GET` Comentários | `http://164.41.98.12:6380/propostacomentarios` | Todos os comentários (1000 - paginação *) |
| `GET` | `http://164.41.98.12:6380/propostacomentarios/total` | Número total de comentários|
| `GET` | `http://164.41.98.12:6380/propostacomentarios/6540b5072e100633ecac5ae1` | Comentário cujo campo _id é igual a "6540b5072e100633ecac5ae1"|
| `GET` | `http://164.41.98.12:6380/propostacomentarios/id/1` | Comentário cujo campo id é igual a '1'|
| `GET` | `http://164.41.98.12:6380/propostacomentarios/proposta/11622` | Comentários da proposta 11622|
| `POST` | `http://164.41.98.12:6380/propostacomentarios/create` | Comentário novo registro - json enviado no body|
| `GET` Moderação | `http://164.41.98.12:6380/propostamoderacao` | Todos os comentários (1000 - paginação *) |
| `GET` | `http://164.41.98.12:6380/propostamoderacao/total` | Termos moderados em propostas|
| `GET` | `http://164.41.98.12:6380/propostamoderacao/65bfbe1afe159b854e9dcec9` | Moderação cujo campo _id é igual a "65bfbe1afe159b854e9dcec9"|
| `GET` | `http://164.41.98.12:6380/propostamoderacao/propostaid/65bfbdf8fe159b854e9dcebc` | Moderações proposta 65bfbdf8fe159b854e9dcebc|
| `POST` | `http://164.41.98.12:6380/propostamoderacao/create` | Moderação novo registro - json enviado no body|
| `GET` Termo Moderado | `http://164.41.98.12:6380/moderacoes` | Todos os Termos Moderados (1000 - paginação *) |
| `GET` | `http://164.41.98.12:6380/moderacoes/total` | Termos moderados em propostas|
| `GET` | `http://164.41.98.12:6380/moderacoes/id/1` | Termo Moderador cujo campo id é igual a "1"|
| `POST` | `http://164.41.98.12:6380/moderacoes/atualiza` | A partir do Termo Moderador, identifica todas as propostas que o possuem |
| `POST` | `http://164.41.98.12:6380/moderacoes/create` | Termo Moderador novo registro - json enviado no body|




## Apêndice

Collection (Insomnia_2024-03-30.json) - requisições usando Insomnia

| VM - Lappis | IP:Porta 164.41.98.12:6380)   |                            |
| :---------- | :--------- | :---------------------------------- |
| Localhost   | (IP:Porta localhost:4040)     | |




## Demonstração

Insira um gif ou um link de alguma demonstração


## Deploy

Para fazer o deploy desse projeto rode

```bash
  npm run deploy
```


## Documentação

[Documentação](https://link-da-documentação)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`NODE_ENV`=development

`SERVER_PORT`=4040

`DB_HOST=DB`
`DB_PORT=27018`
`DB_NAME=http_app`
`DB_USER=nodeauth`
`DB_PASS=nodeauth`

//# Configurações da API do Matomo

`MATOMO_URL` = 'https://ew.dataprev.gov.br/'
`MATOMO_ID_SITE` = 18
`MATOMO_TOKEN` = ...

## Funcionalidades

- Temas dark e light
- Preview em tempo real
- Modo tela cheia
- Multiplataforma


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Relacionados

Projeto relacionado - aplicação cliente

[App-Web](http://164.41.98.12:1883)


## Roadmap

- Melhorar o suporte de navegadores

- Adicionar mais integrações


## Rodando localmente

Clone o projeto

```bash
  git clone https://gitlab.com/lappis-unb/decidimbr/api.git
```

Entre no diretório do projeto

```bash
  cd api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start   ou   node app.js
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Suporte

Para suporte, mande um email para fake@fake.com ou entre em nosso canal do Slack.


## Stack utilizada

**Front-end:** React, Redux, TailwindCSS

**Back-end:** Node, Express


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Uso/Exemplos

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```





# API

## Redigir documentação da API

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/lappis-unb/decidimbr/api.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/lappis-unb/decidimbr/api/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
