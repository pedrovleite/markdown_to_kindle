# MD → EPUB Converter — Deploy & Monetization Guide

## 1. Publicar no GitHub Pages

### 1.1 Criar repositório no GitHub

1. Vai a [github.com/new](https://github.com/new)
2. Nome do repo: `markdown_to_kindle`
3. Visibility: **Public** (obrigatório para GitHub Pages no plano gratuito)
4. **NÃO** inicializes com README (o código já existe local)
5. Clica **Create repository**

### 1.2 Push do código

Abre o terminal na pasta do projeto e corre:

```bash
cd c:\dev\mine\markdown_to_kindle

git init
git add index.html md_to_epub.html
git commit -m "Initial commit: MD to EPUB converter"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/markdown_to_kindle.git
git push -u origin main
```

> ⚠️ Substitui `SEU_USERNAME` pelo teu username do GitHub.

### 1.3 Ativar GitHub Pages

1. No GitHub, vai ao teu repo → **Settings** → **Pages**
2. Em **Source**, seleciona: **Deploy from a branch**
3. Branch: **main** → Pasta: **/ (root)**
4. Clica **Save**
5. Espera ~1 minuto

O teu site ficará disponível em:

```
https://SEU_USERNAME.github.io/markdown_to_kindle/
```

### 1.4 Atualizar URL canónico

Depois de publicado, abre `md_to_epub.html` e atualiza esta linha:

```html
<link rel="canonical" href="https://SEU_USERNAME.github.io/markdown_to_kindle/" />
```

Faz commit e push das alterações:

```bash
git add md_to_epub.html
git commit -m "Update canonical URL"
git push
```

---

## 2. Configurar Google AdSense

### 2.1 Criar conta AdSense

1. Vai a [adsense.google.com](https://adsense.google.com)
2. Clica **Get started**
3. Insere o URL do teu site: `https://SEU_USERNAME.github.io`
4. Preenche os dados (país, moeda, etc.)
5. Aceita os termos

### 2.2 Verificar propriedade do site

O Google vai pedir para verificares que és dono do site. Escolhe uma das opções:

- **Meta tag** (mais fácil) — copia a meta tag e adiciona-a ao `<head>` do `md_to_epub.html`
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

### 2.3 Aguardar aprovação

- A aprovação demora normalmente **1 a 3 dias**
- Recebes um email do Google quando for aprovado
- Enquanto não for aprovado, os anúncios não aparecem (é normal)

### 2.4 Criar Ad Unit

Depois de aprovado:

1. No AdSense, vai a **Ads** → **By ad unit** → **Display ads**
2. Dá um nome ao ad unit (ex: `banner-top`)
3. Tipo recomendado: **Horizontal** ou tamanho fixo **728×90 (Leaderboard)**
4. Clica **Create**
5. O Google dá-te dois valores:
   - `data-ad-client` → ex: `ca-pub-1234567890123456`
   - `data-ad-slot` → ex: `9876543210`

### 2.5 Inserir os valores no código

Abre `md_to_epub.html` e substitui os placeholders em **2 locais**:

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

### 2.6 Deploy final

```bash
git add md_to_epub.html
git commit -m "Add AdSense credentials"
git push
```

---

## 3. Checklist Final

- [ ] Repo criado no GitHub (público)
- [ ] `git push` feito com `index.html` e `md_to_epub.html`
- [ ] **(Opção A)** GitHub Pages ativado (Settings → Pages → main branch)
- [ ] **(Opção B)** Cloudflare Pages configurado com deploy automático
- [ ] Domínio custom comprado e ligado (se aplicável)
- [ ] Site acessível no URL final
- [ ] URL canónico atualizado no HTML
- [ ] Conta AdSense criada
- [ ] Site verificado no AdSense (meta tag ou ads.txt)
- [ ] Aprovação do AdSense recebida por email
- [ ] Ad unit criado (728×90 Leaderboard)
- [ ] `ca-pub-XXXXXXXX` substituído pelo teu Publisher ID (2 locais)
- [ ] `YYYYYYYY` substituído pelo teu Ad Slot ID (1 local)
- [ ] Push final feito

---

## 4. Alternativa Recomendada: Cloudflare Pages + Domínio Custom

> **Recomendado** em vez do GitHub Pages se queres um domínio próprio (ex: `mdtoepub.com`).
> Cloudflare Pages é grátis, mais rápido (CDN global), e o setup de domínio é automático.

### 4.1 Comparação de plataformas gratuitas

| Plataforma | CDN Global | Deploy automático | Domínio custom grátis | Nota |
|---|---|---|---|---|
| **Cloudflare Pages** ⭐ | ✅ Ultra-rápido | ✅ via Git | ✅ SSL incluído | DNS integrado se domínio na Cloudflare |
| **Netlify** | ✅ | ✅ via Git / Drag & drop | ✅ SSL incluído | Preview deploys, forms grátis |
| **Vercel** | ✅ | ✅ via Git | ✅ SSL incluído | Analytics grátis |
| **GitHub Pages** | ✅ | ✅ via Git | ✅ SSL incluído | Mais limitado, requer repo público |

### 4.2 Comprar o domínio na Cloudflare (mais barato)

1. Vai a [dash.cloudflare.com](https://dash.cloudflare.com) e cria conta (ou faz login)
2. No menu lateral, clica em **Domain Registration** → **Register Domains**
3. Pesquisa `mdtoepub.com` (ou alternativas: `md2epub.com`, `markdownepub.com`, `markdowntoepub.com`)
4. Compra o domínio (~$10/ano) — a Cloudflare vende **ao preço de custo**, sem markup
5. O DNS fica automaticamente configurado na Cloudflare

### 4.3 Criar o projeto no Cloudflare Pages

1. No dashboard Cloudflare, vai a **Workers & Pages** → **Create** → **Pages**
2. Clica **Connect to Git**
3. Autoriza o GitHub e seleciona o repo `markdown_to_kindle`
4. Configurações de build:
   - **Production branch**: `main`
   - **Build command**: *(deixa vazio — é um site estático)*
   - **Build output directory**: `/` *(ou deixa vazio)*
5. Clica **Save and Deploy**
6. Espera ~30 segundos — o site fica disponível em `https://markdown-to-kindle.pages.dev`

### 4.4 Ligar o domínio custom

1. No Cloudflare Pages, vai ao teu projeto → **Custom domains**
2. Clica **Set up a custom domain**
3. Insere `mdtoepub.com`
4. Como o domínio já está na Cloudflare, o DNS configura-se **automaticamente** (zero configuração manual!)
5. Adiciona também `www.mdtoepub.com` (opcional, redireciona para o principal)
6. O SSL/HTTPS fica ativo automaticamente

### 4.5 Atualizar URL canónico

Abre `md_to_epub.html` e atualiza:

```html
<link rel="canonical" href="https://mdtoepub.com/" />
```

```bash
git add md_to_epub.html
git commit -m "Update canonical URL to custom domain"
git push
```

> O Cloudflare Pages faz deploy automático a cada `git push` — não precisas de fazer mais nada.

### 4.6 Atualizar AdSense (se já configurado)

Se já tens AdSense configurado, adiciona o novo domínio:

1. No AdSense, vai a **Sites** → **Add site** → insere `mdtoepub.com`
2. Verifica o site (meta tag ou `ads.txt`)
3. O `ads.txt` pode ser adicionado diretamente ao repo:

```bash
git add ads.txt
git commit -m "Add ads.txt for new domain"
git push
```

---

## 5. Domínio Personalizado com GitHub Pages (Alternativa)

Se preferires ficar com GitHub Pages e apenas adicionar um domínio custom:

1. Compra o domínio (Namecheap, Cloudflare, etc.)
2. No GitHub: Settings → Pages → Custom domain → insere o domínio → Save
3. No registar de domínio, adiciona estes DNS records:
   - **A records** a apontar para os IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** de `www` a apontar para `SEU_USERNAME.github.io`
4. Ativa **Enforce HTTPS** no GitHub Pages
5. Atualiza o URL canónico e o site no AdSense

---

## 6. Dicas de Monetização

- **Auto ads**: No AdSense, podes ativar "Auto ads" para o Google colocar anúncios automaticamente — mas para esta app single-page, o banner manual é mais limpo
- **Tráfego**: Partilha o link no Reddit (r/kindle, r/markdown, r/ebooks), Product Hunt, Hacker News
- **Receita esperada**: Com ~1000 visitas/dia podes esperar ~$1-5/dia em AdSense (depende muito do nicho e geografia)
- **Alternativas ao AdSense**: Carbon Ads (mais elegante, focado em devs), BuySellAds, ou links de afiliado Amazon para Kindle
