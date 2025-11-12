# 🧠 InfraLang

**The hybrid infrastructure language — `.infra`**

InfraLang is a small, readable scripting language built for developers who want to automate local infrastructure tasks — like proxies, vaults, and automation — using clean, declarative syntax powered by Node.js.

---

## 🚀 Features

- **Declarative:** Simple, config-first primitives for infra tasks  
- **Scriptable:** Add logic, loops, and functions on top of configs  
- **Secure:** Built-in vaults and sandboxed system calls  
- **Extensible:** Modules can be added via Node packages (`@infra/*`)

---

## 📦 Installation

Once published to npm:

```bash
npm install -g infralang
```

Run a script:

```bash
infra run hello.infra
```

---

## 🧩 Quick Example

```infra
proxy "dev" {
  listen 9090
  block "*.ads.*"
}

vault "default" {
  master "supersecure"
  add "github" = "ghp_xxx"
}
```

---

## 💡 Why `.infra`?

You want a single language to define, inspect, and automate the infra that surrounds your apps — proxies, vaults, tunnels, and local helpers.  
InfraLang is intentionally small, readable, and directly mappable to Node.js runtime actions.

---

## 📘 Example Scripts

### Hello World
```infra
print "Hello Infra!"
```

### Proxy Config
```infra
proxy "quick" {
  listen 9090
  log true
  block "*.ads.*"
}
print "Quick proxy running at :9090"
```

### Vault Setup
```infra
vault "tokens" {
  master "localpw"
  add "aws" = "AKIA..."
  save
}
```

---

## 🧱 Project Structure

```
InfraLang/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── ...
├── public/
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🧰 Development

To run locally:

```bash
npm install
npm run dev
```

Then open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🌐 Deploy (GitHub Pages)

To deploy your site:

1. In your project root, install GitHub Pages:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these lines to your `package.json`:
   ```json
   "homepage": "https://distro527.github.io/InfraLang",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Then deploy:
   ```bash
   npm run deploy
   ```

Your site will be live at  
➡️ **https://distro527.github.io/InfraLang**

---

## 🧠 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **Runtime (planned):** Node.js-based parser and executor  
- **Docs:** Markdown-first architecture with extensible API examples

---

## 🧾 License

MIT License © 2025 [Distro.527](https://github.com/Distro527)

---

## 💬 Community

- **Repo:** [github.com/Distro527/InfraLang](https://github.com/Distro527/InfraLang)  
- **Discord:** Coming soon  
- **Contact:** Open an issue or pull request to collaborate

---

Built by **Distro.527** — *InfraHybrid / InfraLang Project*
