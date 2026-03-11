# MD → EPUB Converter — Deploy & Monetization Guide

## 1. Criar repositório no GitHub

1. Vai a [github.com/new](https://github.com/new)
2. Nome do repo: `markdown_to_kindle`
3. Visibility: **Public**
4. **NÃO** inicializes com README (o código já existe local)
5. Clica **Create repository**

### 1.1 Push do código

Abre o terminal na pasta do projeto e corre:

```bash
cd c:\dev\mine\markdown_to_kindle

git init
git add index.html robots.txt sitemap.xml
git commit -m "Initial commit: MD to EPUB converter"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/markdown_to_kindle.git
git push -u origin main
```

> ⚠️ Substitui `SEU_USERNAME` pelo teu username do GitHub.

---

## 2. Deploy no Cloudflare Pages

### 2.1 Criar o projeto no Cloudflare Pages

1. Vai a [dash.cloudflare.com](https://dash.cloudflare.com) e faz login
2. No menu lateral, vai a **Workers & Pages** → **Create** → **Pages**
3. Clica **Connect to Git**
4. Autoriza o GitHub e seleciona o repo `markdown_to_kindle`
5. Configurações de build:
   - **Production branch**: `main`
   - **Build command**: *(deixa vazio — é um site estático)*
   - **Build output directory**: `/` *(ou deixa vazio)*
6. Clica **Save and Deploy**
7. Espera ~30 segundos — o site fica disponível em `https://markdown-to-kindle.pages.dev`

### 2.2 Ligar o domínio `mdtoepub.com`

1. No Cloudflare Pages, vai ao teu projeto → **Custom domains**
2. Clica **Set up a custom domain**
3. Insere `mdtoepub.com`
4. Como o domínio já está na Cloudflare, o DNS configura-se **automaticamente** (zero configuração manual!)
5. Adiciona também `www.mdtoepub.com` (opcional, redireciona para o principal)
6. O SSL/HTTPS fica ativo automaticamente

### 2.3 Atualizar URL canónico

Abre `index.html` e confirma que esta linha está presente:

```html
<link rel="canonical" href="https://mdtoepub.com/" />
```

Faz commit e push:

```bash
git add index.html
git commit -m "Update canonical URL to mdtoepub.com"
git push
```

> O Cloudflare Pages faz deploy automático a cada `git push` — não precisas de fazer mais nada.

---

## 3. Configurar Google AdSense

### 3.1 Criar conta AdSense

1. Vai a [adsense.google.com](https://adsense.google.com)
2. Clica **Get started**
3. Insere o URL do teu site: `https://mdtoepub.com`
4. Preenche os dados (país, moeda, etc.)
5. Aceita os termos

### 3.2 Verificar propriedade do site

O Google vai pedir para verificares que és dono do site. Escolhe uma das opções:

- **Meta tag** (mais fácil) — copia a meta tag e adiciona-a ao `<head>` do `index.html`
- **ads.txt** — cria um ficheiro `ads.txt` na root do repo com o conteúdo que o Google te der

Exemplo de `ads.txt`:

```
google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0
```

```bash
# Se usares ads.txt:
git add ads.txt
git commit -m "Add ads.txt for AdSense verification"
git push
```

### 3.3 Aguardar aprovação

- A aprovação demora normalmente **1 a 3 dias**
- Recebes um email do Google quando for aprovado
- Enquanto não for aprovado, os anúncios não aparecem (é normal)

### 3.4 Criar Ad Unit

Depois de aprovado:

1. No AdSense, vai a **Ads** → **By ad unit** → **Display ads**
2. Dá um nome ao ad unit (ex: `banner-top`)
3. Tipo recomendado: **Horizontal** ou tamanho fixo **728×90 (Leaderboard)**
4. Clica **Create**
5. O Google dá-te dois valores:
   - `data-ad-client` → ex: `ca-pub-1234567890123456`
   - `data-ad-slot` → ex: `9876543210`

### 3.5 Inserir os valores no código

Abre `index.html` e substitui os placeholders em **2 locais**:

#### Local 1 — Script no `<head>` (linha ~33)

```html
<!-- ANTES -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>

<!-- DEPOIS -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
```

#### Local 2 — Ad unit no banner (dentro do `<body>`)

```html
<!-- ANTES -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="YYYYYYYY"></ins>

<!-- DEPOIS -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-1234567890123456"
     data-ad-slot="9876543210"></ins>
```

### 3.6 Deploy final

```bash
git add index.html
git commit -m "Add AdSense credentials"
git push
```

---

## 4. Aparecer no Google (SEO & Indexação)

### 4.1 Google Search Console (OBRIGATÓRIO)

1. Vai a [search.google.com/search-console](https://search.google.com/search-console)
2. Clica **Add property** → escolhe **URL prefix** → insere `https://mdtoepub.com`
3. Verificação — escolhe **DNS verification**:
   - O Google dá-te um TXT record para adicionar
   - No Cloudflare → **DNS** → **Add Record** → tipo **TXT** → cola o valor
   - Volta ao Search Console e clica **Verify**
4. Depois de verificado:
   - Vai a **Sitemaps** → insere `https://mdtoepub.com/sitemap.xml` → **Submit**
   - Vai a **URL Inspection** → insere `https://mdtoepub.com/` → **Request Indexing**

> ⚡ Isto faz o Google indexar o site em **24-48 horas** em vez de semanas.

### 4.2 Bing Webmaster Tools

1. Vai a [bing.com/webmasters](https://www.bing.com/webmasters)
2. Clica **Import from Google Search Console** (mais rápido)
3. Ou adiciona manualmente e submete o sitemap

### 4.3 Criar og-image.png

O ficheiro `og-image.svg` já está no repo. Converte-o para PNG (1200×630):

1. Abre `og-image.svg` no browser
2. Faz screenshot ou usa uma ferramenta online (ex: [svgtopng.com](https://svgtopng.com))
3. Guarda como `og-image.png` na root do projeto
4. Faz push:

```bash
git add og-image.png
git commit -m "Add OG image for social sharing"
git push
```

### 4.4 Divulgar para gerar backlinks

Publica o link nestas comunidades (o Google valoriza tráfego e backlinks):

- **Reddit**: r/kindle, r/markdown, r/ebooks, r/selfpublish, r/freetools
- **Product Hunt**: [producthunt.com](https://www.producthunt.com) — agenda um launch
- **Hacker News**: [news.ycombinator.com](https://news.ycombinator.com) — Show HN post
- **Dev.to / Hashnode**: escreve um artigo sobre a ferramenta
- **Twitter/X**: partilha com hashtags #markdown #epub #kindle #opensource

---

## 5. Checklist Final

- [ ] Repo criado no GitHub
- [ ] `git push` feito com todos os ficheiros
- [ ] Cloudflare Pages configurado com deploy automático
- [ ] Domínio `mdtoepub.com` ligado ao projeto Cloudflare Pages
- [ ] Site acessível em `https://mdtoepub.com`
- [ ] URL canónico atualizado no HTML
- [ ] Google Search Console verificado (DNS TXT record)
- [ ] Sitemap submetido no Search Console
- [ ] Indexação pedida no Search Console
- [ ] Bing Webmaster Tools configurado
- [ ] og-image.png criado e no repo
- [ ] Conta AdSense criada com URL `https://mdtoepub.com`
- [ ] Site verificado no AdSense (meta tag ou ads.txt)
- [ ] Aprovação do AdSense recebida por email
- [ ] Ad unit criado (728×90 Leaderboard)
- [ ] `ca-pub-XXXXXXXX` substituído pelo teu Publisher ID (2 locais)
- [ ] `YYYYYYYY` substituído pelo teu Ad Slot ID (1 local)
- [ ] Push final feito
- [ ] Site partilhado em pelo menos 2-3 comunidades

---

## 5. Dicas de Monetização

- **Auto ads**: No AdSense, podes ativar "Auto ads" para o Google colocar anúncios automaticamente — mas para esta app single-page, o banner manual é mais limpo
- **Tráfego**: Partilha o link no Reddit (r/kindle, r/markdown, r/ebooks), Product Hunt, Hacker News
- **Receita esperada**: Com ~1000 visitas/dia podes esperar ~$1-5/dia em AdSense (depende muito do nicho e geografia)
- **Alternativas ao AdSense**: Carbon Ads (mais elegante, focado em devs), BuySellAds, ou links de afiliado Amazon para Kindle
