import React, { useState, useEffect } from "react";
import "./App.css";

const DOCS_MARKDOWN = `# InfraLang — Developer Preview

**File extension:** .infra

InfraLang is a hybrid infrastructure language for scripting proxies, vaults, and automation.

## Quick Start

\`\`\`bash
npm install -g infralang
infra run hello.infra
\`\`\`

## Examples

\`\`\`infra
print "Hello Infra!"
\`\`\`

\`\`\`infra
proxy "dev" {
  listen 9090
  block "*.ads.*"
}
\`\`\`
`;

function CodeBlock({ children }) {
  return (
    <pre className="code-block">{children}</pre>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("features");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      
      const sections = ["features", "docs", "examples", "download"];
      const scrollPosition = scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="background-particles"></div>
      
      {/* Navigation Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-brand">
            <img src="logo-removebg-preview2.png" alt="InfraLang Logo" className="logo" />
            <div>
              <h1 className="header-title">InfraLang</h1>
              <p className="header-subtitle">The hybrid infrastructure language — .infra</p>
            </div>
          </div>
          <nav className="nav">
            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#docs" className={`nav-link ${activeSection === 'docs' ? 'active' : ''}`}>Docs</a>
            <a href="#examples" className={`nav-link ${activeSection === 'examples' ? 'active' : ''}`}>Examples</a>
            <a href="#download" className="btn-primary">Get Started</a>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Design infra, run infra.</h1>
          <p className="hero-subtitle">
            InfraLang is a small, readable language for scripting network proxies, vaults, and local automations.
            Write declarative configs that call powerful Node.js primitives.
          </p>
          
          <div className="hero-cta">
            <a href="#download" className="btn-hero-primary">Get Started</a>
            <a href="#docs" className="btn-hero-secondary">View Documentation</a>
          </div>
          
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon">⚡</span>
              <span className="hero-feature-text">Lightweight Runtime</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🔒</span>
              <span className="hero-feature-text">Built-in Security</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🔧</span>
              <span className="hero-feature-text">Extensible Modules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="content-container">
          <div className="main-content">
            {/* Features Section */}
            <div id="features" className="card">
              <h2 className="card-title">Core Features</h2>
              <p className="card-description">
                InfraLang provides everything you need to manage infrastructure as code with simplicity and power.
              </p>

              <div className="feature-grid">
                <div className="feature-card">
                  <h3 className="feature-title">Declarative</h3>
                  <p className="feature-description">Simple, config-first primitives for infra tasks.</p>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Scriptable</h3>
                  <p className="feature-description">Add logic, loops, and functions on top of configs.</p>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Secure</h3>
                  <p className="feature-description">Built-in vault primitives and sandboxed system calls.</p>
                </div>
                <div className="feature-card">
                  <h3 className="feature-title">Extensible</h3>
                  <p className="feature-description">Modules can be added via Node packages (@infra/*).</p>
                </div>
              </div>

              <div className="code-block">
                <h4 style={{color: 'var(--primary)', marginBottom: '1rem', fontWeight: '600'}}>Quick Example</h4>
                <CodeBlock>{`proxy "dev" {
  listen 9090
  block "*.ads.*"
}

vault "default" {
  master "supersecure"
  add "github" = "ghp_xxx"
}`}</CodeBlock>
              </div>
            </div>

            {/* Why Section */}
            <div className="card mt-6">
              <h3 className="card-title">Why .infra?</h3>
              <p className="card-description">
                You want a single language to define, inspect, and automate the infra that surrounds your applications — 
                proxies, vaults, tunnels, and local helpers. InfraLang is intentionally small, readable, and directly 
                mappable to Node.js runtime actions.
              </p>
            </div>

            {/* Documentation Section */}
            <div id="docs" className="card mt-6">
              <h2 className="card-title">Documentation (Preview)</h2>
              <p className="card-description">
                Below is the developer preview docs. Use these examples to get started.
              </p>

              <div className="feature-grid">
                <div>
                  <h4 style={{color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '600'}}>Basics</h4>
                  <CodeBlock>{`print "Hello Infra!"
let x = 5
print x + 3`}</CodeBlock>
                </div>
                <div>
                  <h4 style={{color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '600'}}>Proxy & Vault</h4>
                  <CodeBlock>{`proxy "dev" {
  listen 8080
  block "*.ads.*"
}

vault "default" {
  master "mypassword"
  add "github" = "token"
}`}</CodeBlock>
                </div>
              </div>

              <div style={{marginTop: '2rem'}}>
                <h4 style={{color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '600'}}>Full docs (markdown)</h4>
                <div style={{background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem'}}>
                  <pre style={{whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>{DOCS_MARKDOWN}</pre>
                </div>
              </div>
            </div>

            {/* Examples Section */}
            <div id="examples" className="card mt-6">
              <h2 className="card-title">Examples</h2>
              <p className="card-description">
                Copy-paste these into ".infra" files and run them with the runtime.
              </p>

              <div className="feature-grid">
                <div>
                  <h4 style={{color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '600'}}>Proxy Quickstart</h4>
                  <CodeBlock>{`proxy "quick" {
  listen 9090
  log true
  block "*.ads.*"
}
print "Quick proxy running at :9090"`}</CodeBlock>
                </div>

                <div>
                  <h4 style={{color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '600'}}>Vault Quickstart</h4>
                  <CodeBlock>{`vault "tokens" {
  master "localpw"
  add "aws" = "AKIA..."
  save
}`}</CodeBlock>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div id="download" className="card mt-6">
              <h2 className="card-title">Download & Run</h2>
              <p className="card-description">
                Run locally or install globally via npm (when published).
              </p>
              <CodeBlock>{`# local dev
git clone https://github.com/Distro527/InfraLang.git
cd infra-lang
npm install
npm run dev

# once packaged
npm install -g infralang
infra run example.infra`}</CodeBlock>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-card">
              <h4 className="sidebar-title">Get started</h4>
              <p className="sidebar-description">
                Install the runtime and run your first script.
              </p>
              <CodeBlock>{`npm install -g infralang
infra run hello.infra`}</CodeBlock>

              <div style={{marginTop: '1.5rem'}}>
                <a href="#download" className="btn-block">Download Runtime</a>
              </div>

              <div style={{marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                <div className="mb-2"><strong>Repo:</strong> <a style={{color: 'var(--secondary)', textDecoration: 'none'}} href="#">github.com/yourname/infra-lang</a></div>
                <div><strong>License:</strong> MIT</div>
              </div>
            </div>

            <div className="sidebar-card mt-6">
              <h5 className="sidebar-title">Contact / Chat</h5>
              <p className="sidebar-description">
                Join the discussion on GitHub or Discord for collaboration.
              </p>
            </div>
          </aside>

          {/* Footer */}
          <footer className="footer text-center">
            <p>Built by Distro.527 — <span style={{color: 'var(--text-secondary)'}}>InfraHybrid / InfraLang</span></p>
          </footer>
        </div>
      </section>
    </div>
  );
}