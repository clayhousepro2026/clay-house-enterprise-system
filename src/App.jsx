import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { FileText, Users, FolderKanban, ReceiptText, Search, Plus, Download, BarChart3 } from "lucide-react";
import "./style.css";

const COMPANY = {
  name: "CLAY HOUSE",
  legal: "CLAY HOUSE Productions (Pvt) Ltd",
  division: "Creative Intelligence Studio",
  tagline: "Making Tomorrow Feel Real.",
  address: "15, 16D Dharmapala Mawatha, Sri Jayawardenepura Kotte 10200, Sri Lanka",
  phone: "+94 77 414 8441",
  email: "clayhousepro@gmail.com",
  bank: "Pan Asia Banking Corporation PLC",
  branch: "Thalawathugoda Branch",
  accountName: "Clay House Productions (Pvt) Ltd",
  accountNo: "106811100615"
};

const docs = [
  {type:"Invoice", code:"CH-INV-2026-0001", client:"Showtown Entertainment", project:"Unilever Foods & Home Care AVs", amount:100000, status:"Due"},
  {type:"Quotation", code:"CH-QTN-2026-0001", client:"Sample Client", project:"Creative Campaign", amount:250000, status:"Draft"},
  {type:"Estimate", code:"CH-EST-2026-0001", client:"Sample Client", project:"AI Content Engine", amount:500000, status:"Draft"}
];

function money(v){ return "LKR " + Number(v).toLocaleString("en-LK", {minimumFractionDigits:2}); }

function App(){
  const [active,setActive] = useState("dashboard");
  const total = docs.reduce((s,d)=>s+d.amount,0);

  return <main>
    <aside className="sidebar">
      <div className="mark"><div className="logo">CH</div><div><b>{COMPANY.name}</b><span>ONE</span></div></div>
      <nav>
        <button onClick={()=>setActive("dashboard")} className={active==="dashboard"?"on":""}><BarChart3/> Dashboard</button>
        <button onClick={()=>setActive("documents")} className={active==="documents"?"on":""}><FileText/> Documents</button>
        <button onClick={()=>setActive("invoice")} className={active==="invoice"?"on":""}><ReceiptText/> Invoice</button>
        <button><Users/> Clients</button>
        <button><FolderKanban/> Projects</button>
      </nav>
      <p className="tag">One Brand. One System. One Standard.</p>
    </aside>

    <section className="content">
      <header>
        <div>
          <h1>CLAY HOUSE ONE</h1>
          <p>Business Operating System for documents, clients, projects and finance.</p>
        </div>
        <div className="search"><Search size={16}/><input placeholder="Search documents..." /></div>
      </header>

      {active==="dashboard" && <section>
        <div className="cards">
          <div className="card"><span>Total Documents</span><b>{docs.length}</b></div>
          <div className="card"><span>Outstanding</span><b>{money(100000)}</b></div>
          <div className="card"><span>Total Pipeline</span><b>{money(total)}</b></div>
          <div className="card gradient"><span>Next Code</span><b>CH-INV-2026-0002</b></div>
        </div>
        <h2>Recent Documents</h2>
        <DocTable docs={docs}/>
      </section>}

      {active==="documents" && <section>
        <div className="row"><h2>Corporate Documents</h2><button className="primary"><Plus size={16}/> New Document</button></div>
        <DocTable docs={docs}/>
      </section>}

      {active==="invoice" && <Invoice />}
    </section>
  </main>
}

function DocTable({docs}){
  return <table className="doc-table">
    <thead><tr><th>Code</th><th>Type</th><th>Client</th><th>Project</th><th>Status</th><th>Amount</th></tr></thead>
    <tbody>{docs.map(d=><tr key={d.code}><td>{d.code}</td><td>{d.type}</td><td>{d.client}</td><td>{d.project}</td><td><span className="pill">{d.status}</span></td><td>{money(d.amount)}</td></tr>)}</tbody>
  </table>
}

function Invoice(){
  return <section className="invoice-wrap">
    <div className="invoice-actions"><button className="primary" onClick={()=>window.print()}><Download size={16}/> Print / Save PDF</button></div>
    <div className="invoice">
      <div className="topbar"></div>
      <div className="inv-head">
        <div>
          <h1>{COMPANY.name}</h1>
          <p>{COMPANY.division}<br/>{COMPANY.tagline}</p>
        </div>
        <div className="inv-title">INVOICE</div>
      </div>

      <div className="grid2">
        <div>
          <h3>Bill To</h3>
          <p><b>Showtown Entertainment</b><br/>Colombo, Sri Lanka</p>
        </div>
        <div className="meta">
          <p><b>Invoice No:</b> CH-INV-2026-0001</p>
          <p><b>Invoice Date:</b> 28 June 2026</p>
          <p><b>Due Date:</b> 12 July 2026</p>
          <p><b>Currency:</b> LKR</p>
        </div>
      </div>

      <h3>Project</h3>
      <p><b>Video Post-Production Services - Unilever Foods & Home Care AVs</b></p>

      <table>
        <thead><tr><th>No.</th><th>Description</th><th>Studio Days</th><th>Rate</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>01</td><td><b>Food Solutions AV</b><br/>Video post-production, editing, graphics, colour, audio, final export</td><td>1.5</td><td>{money(40000)}</td><td>{money(60000)}</td></tr>
          <tr><td>02</td><td><b>Home Care AV</b><br/>Video post-production, editing, graphics, colour, audio, final export</td><td>1.0</td><td>{money(40000)}</td><td>{money(40000)}</td></tr>
        </tbody>
      </table>

      <div className="summary">
        <div><b>Studio Day Standard</b><br/>1 studio day = 12 hours. Total duration: 2.5 studio days / 30 hours.</div>
        <div className="totals">
          <p><span>Subtotal</span><b>{money(100000)}</b></p>
          <p><span>VAT</span><b>-</b></p>
          <p className="grand"><span>Grand Total</span><b>{money(100000)}</b></p>
        </div>
      </div>

      <div className="grid2 lower">
        <div>
          <h3>Payment Details</h3>
          <p><b>Account Name:</b> {COMPANY.accountName}<br/>
          <b>Bank:</b> {COMPANY.bank}<br/>
          <b>Branch:</b> {COMPANY.branch}<br/>
          <b>Account Number:</b> {COMPANY.accountNo}</p>
        </div>
        <div>
          <h3>Terms</h3>
          <p>Payment due within <b>14 days</b> from the invoice date. Please include the invoice number as payment reference.</p>
          <div className="sign">Dilantha Perera<br/><span>Founder & Director</span></div>
        </div>
      </div>

      <footer>{COMPANY.legal} - {COMPANY.address} - {COMPANY.phone} - {COMPANY.email}</footer>
    </div>
  </section>
}

createRoot(document.getElementById("root")).render(<App/>);