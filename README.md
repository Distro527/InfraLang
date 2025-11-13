# ⚙️ InfraHub

**InfraHub** — The runtime for the InfraLang language.  
Run `.infra` files with simplicity, power, and speed.

---

## 🚀 What is InfraHub?

InfraHub is the official runtime for **InfraLang**, a lightweight scripting language designed for simplicity and expressiveness.  
It lets you execute `.infra` scripts directly in your terminal.

---

## 🧩 Features

- ⚡ Run `.infra` files instantly  
- 🧠 Smart runtime handling  
- 🪶 Lightweight — minimal dependencies  
- 🔧 CLI support with `infra` command  
- 🌐 Extensible architecture for future modules  

---

## 💻 Installation

```bash
npm install -g infrahub
```

Once installed, you can run InfraLang files anywhere.

---

## 🧠 Usage

Create a file called `hello.infra`:

```infra
print("Hello Infra!")
print("Value of 5:", 5)
```

Run it using:

```bash
infra run hello.infra
```

Output:
```
Hello Infra!
Value of 5: 5
```

---

## 📦 Project Structure

```
InfraLang/
├── runtime/
│   ├── cli.js
│   ├── index.js
│   └── parser.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── assets/
│       └── react.svg
├── package.json
├── README.md
└── hello.infra
```

---

## 🧰 Commands

| Command | Description |
|----------|-------------|
| `infra run <file>` | Run an InfraLang file |
| `infra version` | Show InfraHub version |
| `infra help` | Show CLI help |

---

## 🧩 Dependencies

InfraHub uses:
- **chalk** — for colored terminal output  
- **commander** — for CLI handling  
- **fs-extra** — for filesystem utilities  
- **react** / **react-dom** — for frontend (InfraLang site)

---

## 🤝 Contributing

Want to contribute to InfraHub?  
We welcome pull requests and suggestions!

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/new-feature`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature/new-feature`)  
5. Open a Pull Request  

Before submitting, make sure:
- Code passes lint checks  
- You’ve updated relevant docs  
- Your feature aligns with InfraLang’s simplicity philosophy  

---

## 🗺️ Roadmap

✅ v0.2.0 — Core runtime improvements  
🔄 v0.3.0 — Parser expansion (variables, conditionals)  
🚀 v0.4.0 — Infra package manager (IPM)  
🧠 v0.5.0 — Infra standard library  
🌐 v1.0.0 — Stable release & documentation site  

---

## 👨‍💻 Maintainer

**InfraHub** is developed and maintained by  
**Distro.527** — a coder passionate about Node.js and lightweight systems.  

---

## 🌟 Support

If you like InfraHub:
- ⭐ Star the repo on GitHub  
- 🐛 Report issues or bugs  
- 💬 Share feedback or ideas  

---

## 🧠 About InfraLang

InfraLang is a conceptual interpreted language aiming to make learning and scripting easier.  
It’s designed around:
- Minimal setup  
- Readable syntax  
- Extensible runtime through InfraHub  

More updates coming soon!
