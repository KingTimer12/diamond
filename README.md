<p align="center">
  <a href="" rel="noopener">
 <img width=600px height=250px src="https://c4.wallpaperflare.com/wallpaper/346/359/601/anime-houseki-no-kuni-diamond-houseki-no-kuni-wallpaper-preview.jpg" alt="Diamond Tool"></a>
</p>

<h3 align="center">Diamond Tool</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/KingTimer12/diamond.svg)](https://github.com/KingTimer12/diamond/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KingTimer12/diamond.svg)](https://github.com/KingTimer12/diamond/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Diamond Tool tem como objetivo facilitar a criação de APIs Rest usando uma biblioteca recente chamada Fastify. O nome foi baseado no personagem Diamond de Houseki no Kuni, a ferramenta em si não nem nenhuma referência ao personagem além de seu nome.
    <br> 
</p>

## Sumário

- [Sobre](#about)
- [Começando](#getting_started)
- [Tecnologias](#built_using)
- [Autores](#authors)

## Sobre <a name = "about"></a>

Trazer facilidade é o principal foco da ferramenta. Nela há hooks que podem ser usados em qualquer arquivo, além de necessitar poucas linhas de código para sua inicilização. De início, o seu paradigma principal é orientação a objeto. Tenho planos para torna-la também flexível para outros tipos de paradigma, mas isso são planos futuros.

Como que funciona essa facilidade? Além dos hooks, há classes customizáveis que veem de uma classe abstrata. As routas já vem com uma classe base muito bem formulado, contudo, se desejar fazer uma de sua maneira ou para casos específicos, ela é totalmente usável e customizável. Isso vale principalmente para os controladores que não apresentam uma classe base, mas uma classe vazia e você definirá a classe base dela.

## Começando <a name = "getting_started"></a>

### Prerequisites

Se seu objetivo for ajudar em algo, é necessário ter **Git**, **Node** e um gerenciador de pacotes de sua preferência, por exemplo: **pnpm**

Caso só queira usar a ferramenta, então é necessário ter um projeto e executar o comando de instalação, por exemplo:
```
pnpm install diamond
```

### Instalando

1. Clone o projeto:
```git
git clone https://github.com/KingTimer12/diamond.git
```
2. Entre na pasta usando: `cd diamond`
3. Instale todas as dependências usando seu gerenciador de pacotes, exemplo:
```
pnpm install
```
4. Use o script `build:dev` para buildar e testar usando o examples.
```
pnpm build:dev
```

## Teconologias <a name = "built_using"></a>

- [Prisma](https://www.prisma.io/) - Database Framework
- [Fastify](https://fastify.dev/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## Autores <a name = "authors"></a>

- [@Aaron King](https://github.com/KingTimer12) - Ideia & programador principal