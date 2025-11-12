/*
InfraLang Website (single-file React component)
Preview: This file is a React component that can be used with Vite + React + Tailwind.

Quick local run instructions (inside the canvas file):
1. npm create vite@latest infra-site -- --template react
2. cd infra-site
3. Install Tailwind per Tailwind docs (or use CDN for quick preview)
4. Replace src/App.jsx with this component, then run `npm install` and `npm run dev`.

This component uses Tailwind utility classes. The project scaffold and Tailwind setup are described in the top comment of this file.
*/

import React from "react";

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
    <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-auto text-sm">{children}</pre>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">IN</div>
          <div>
            <h1 className="text-2xl font-extrabold">InfraLang</h1>
            <p className="text-sm text-slate-500">The hybrid infrastructure language — .infra</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <a href="#features" className="text-sm hover:underline">Features</a>
          <a href="#docs" className="text-sm hover:underline">Docs</a>
          <a href="#examples" className="text-sm hover:underline">Examples</a>
          <a href="#download" className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Get Started</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-3xl font-extrabold">Design infra, run infra.</h2>
            <p className="mt-3 text-slate-600">InfraLang is a small, readable language for scripting network proxies, vaults, and local automations. Write declarative configs that call powerful Node.js primitives.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Declarative</h3>
                <p className="text-sm text-slate-500">Simple, config-first primitives for infra tasks.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Scriptable</h3>
                <p className="text-sm text-slate-500">Add logic, loops, and functions on top of configs.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-slate-500">Built-in vault primitives and sandboxed system calls.</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-semibold">Extensible</h3>
                <p className="text-sm text-slate-500">Modules can be added via Node packages (\@infra/*).</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Quick example</h4>
              <CodeBlock>
{`proxy "dev" {
  listen 9090
  block "*.ads.*"
}

vault "default" {
  master "supersecure"
  add "github" = "ghp_xxx"
}
`}
              </CodeBlock>
            </div>

          </div>

          <div className="mt-6 bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold">Why .infra?</h3>
            <p className="mt-2 text-slate-600">You want a single language to define, inspect, and automate the infra that surrounds your applications — proxies, vaults, tunnels, and local helpers. InfraLang is intentionally small, readable, and directly mappable to Node.js runtime actions.</p>
          </div>
        </section>

        <aside>
          <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
            <h4 className="font-bold">Get started</h4>
            <p className="text-sm text-slate-500 mt-2">Install the runtime and run your first script.</p>
            <CodeBlock>{`npm install -g infralang
infra run hello.infra`}</CodeBlock>

            <div className="mt-4">
              <a href="#download" className="block w-full text-center px-4 py-2 rounded-md bg-indigo-600 text-white">Download Runtime</a>
            </div>

            <div className="mt-6 border-t pt-4 text-sm text-slate-500">
              <div className="mb-2"><strong>Repo:</strong> <a className="text-indigo-600 hover:underline" href="#">github.com/yourname/infra-lang</a></div>
              <div><strong>License:</strong> MIT</div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow p-4">
            <h5 className="font-semibold">Contact / Chat</h5>
            <p className="text-sm text-slate-500 mt-2">Join the discussion on GitHub or Discord for collaboration.</p>
          </div>
        </aside>

        <section id="docs" className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow p-8 mt-6">
            <h2 className="text-2xl font-extrabold">Documentation (Preview)</h2>
            <p className="text-sm text-slate-500 mt-2">Below is the developer preview docs. Use these examples to get started.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Basics</h4>
                <CodeBlock>{`print "Hello Infra!"
let x = 5
print x + 3`}</CodeBlock>
              </div>
              <div>
                <h4 className="font-semibold">Proxy & Vault</h4>
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

            <div className="mt-6">
              <h4 className="font-semibold">Full docs (markdown)</h4>
              <div className="mt-3 border rounded-md p-4">
                <pre className="whitespace-pre-wrap text-sm text-slate-700">{DOCS_MARKDOWN}</pre>
              </div>
            </div>

          </div>
        </section>

        <section id="examples" className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow p-8 mt-6">
            <h2 className="text-2xl font-extrabold">Examples</h2>
            <p className="text-sm text-slate-500 mt-2">Copy-paste these into ".infra" files and run them with the runtime.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Proxy Quickstart</h4>
                <CodeBlock>{`proxy "quick" {
  listen 9090
  log true
  block "*.ads.*"
}
print "Quick proxy running at :9090"`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-semibold">Vault Quickstart</h4>
                <CodeBlock>{`vault "tokens" {
  master "localpw"
  add "aws" = "AKIA..."
  save
}
`}</CodeBlock>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow p-8 mt-6">
            <h2 className="text-2xl font-extrabold">Download & Run</h2>
            <p className="text-sm text-slate-500 mt-2">Run locally or install globally via npm (when published).</p>
            <CodeBlock>{`# local dev
git clone https://github.com/yourname/infra-lang.git
cd infra-lang
npm install
npm run dev

# once packaged
a npm install -g infralang
infra run example.infra`}</CodeBlock>
          </div>
        </section>

        <footer className="lg:col-span-3 mt-12 text-center text-sm text-slate-500 pb-12">
          <p>Built by Distro.527 — <span className="text-slate-400">InfraHybrid / InfraLang</span></p>
        </footer>

      </main>
    </div>
  );
}