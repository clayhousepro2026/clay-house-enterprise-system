import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BarChart3, Brain, BriefcaseBusiness, CalendarDays, Clapperboard, Database, FileText, FolderKanban, Landmark, LayoutDashboard, Library, LockKeyhole, Megaphone, ReceiptText, Search, Sparkles, Users } from "lucide-react";
import "./style.css";

const COMPANY = {
  name: "CLAY HOUSE",
  app: "CLAY HOUSE ONE",
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

const modules = [
  {id:"dashboard", name:"Command", icon:LayoutDashboard, note:"CEO dashboard and daily business overview"},
  {id:"business", name:"Business", icon:BriefcaseBusiness, note:"Clients, projects, team, calendar and approvals"},
  {id:"finance", name:"Finance", icon:Landmark, note:"Invoices, quotations, estimates, receipts and revenue"},
  {id:"production", name:"Production", icon:Clapperboard, note:"Briefs, call sheets, shot lists, crew and delivery"},
  {id:"creative", name:"Creative", icon:Sparkles, note:"Brand assets, design system and prompt library"},
  {id:"clay", name:"CLAY Intelligence", icon:Brain, note:"Signals, forecasts, decisions, outcomes and learning"},
  {id:"knowledge", name:"Knowledge", icon:Library, note:"Projects, case studies, research and archive"},
  {id:"analytics", name:"Analytics", icon:BarChart3, note:"Revenue, pipeline, profitability and utilization"}
];

const clients = [
  {name:"Showtown Entertainment", type:"Agency / Entertainment", status:"Active", value:100000},
  {name:"Unilever Foods", type:"Corporate Brand", status:"Project", value:60000},
  {name:"Unilever Home Care", type:"Corporate Brand", status:"Project", value:40000}
];

const projects = [
  {code:"CH-PRJ-2026-0001", name:"Unilever Foods and Home Care AVs", client:"Showtown Entertainment", stage:"Delivered", due:"2026-06-28"},
  {code:"CH-PRJ-2026-0002", name:"CLAY HOUSE Document System", client:"Internal", stage:"Building", due:"2026-07-15"},
  {code:"CH-PRJ-2026-0003", name:"AI Content Engine", client:"Pipeline", stage:"Proposal", due:"2026-07-30"}
];

const documents = [
  {type:"Invoice", code:"CH-INV-2026-0001", client:"Showtown Entertainment", project:"Unilever Foods and Home Care AVs", amount:100000, status:"Due"},
  {type:"Quotation", code:"CH-QTN-2026-0001", client:"Sample Client", project:"Creative Campaign", amount:250000, status:"Draft"},
  {type:"Estimate", code:"CH-EST-2026-0001", client:"Sample Client", project:"AI Content Engine", amount:500000, status:"Draft"},
  {type:"Proposal", code:"CH-PRO-2026-0001", client:"Internal", project:"CLAY HOUSE Enterprise System", amount:0, status:"System"}
];

const financeCards = ["Invoices", "Quotations", "Estimates", "Receipts", "Purchase Orders", "Statements", "Expenses", "Revenue Dashboard"];
const productionCards = ["Creative Brief", "Storyboard", "Shot List", "Call Sheet", "Equipment", "Crew", "Deliverables", "Revision Tracker"];
const clayCards = ["Signal Register", "Forecast Register", "Decision Register", "Outcome Register", "Learning Register", "Research Database", "Trend Analysis", "Market Intelligence"];
const aiAgents = ["CLAY CEO", "CLAY Finance", "CLAY Designer", "CLAY Editor", "CLAY Research", "CLAY Marketing", "CLAY Production", "CLAY Sales"];

function money(v){ return "LKR " + Number(v).toLocaleString("en-LK", {minimumFractionDigits:2}); }

function App(){
  const [active,setActive] = useState("dashboard");
  const pipeline = useMemo(()=>documents.reduce((s,d)=>s+d.amount,0),[]);
  const outstanding = documents.filter(d=>d.status==="Due").reduce((s,d)=>s+d.amount,0);

  return <main>
    <aside className="sidebar">
      <div className="mark"><div className="logo">CH</div><div><b>{COMPANY.name}</b><span>ONE PLATFORM</span></div></div>
      <nav>{modules.map(m=>{const Icon=m.icon;return <button key={m.id} onClick={()=>setActive(m.id)} className={active===m.id?"on":""}><Icon size={18}/> {m.name}</button>})}</nav>
      <div className="secure"><LockKeyhole size={14}/> Enterprise Edition v1.0</div>
      <p className="tag">One Brand. One System. One Standard.</p>
    </aside>

    <section className="content">
      <header>
        <div>
          <h1>{COMPANY.app}</h1>
          <p>{COMPANY.division}. {COMPANY.tagline}</p>
        </div>
        <div className="search"><Search size={16}/><input placeholder="Search clients, projects, documents..." /></div>
      </header>

      {active==="dashboard" && <Dashboard pipeline={pipeline} outstanding={outstanding}/>}      
      {active==="business" && <Business/>}
      {active==="finance" && <ModuleGrid title="Finance System" subtitle="Generate, track and manage every business document." items={financeCards} icon={ReceiptText}/>} 
      {active==="production" && <ModuleGrid title="Production System" subtitle="Run pre-production, production, post-production and delivery." items={productionCards} icon={Clapperboard}/>} 
      {active==="creative" && <ModuleGrid title="Creative System" subtitle="Manage brand assets, templates, prompts and design standards." items={["Brand Assets","Logo Library","Design System","Presentation Builder","AI Prompt Library","Campaign Concepts","Style Guides","Media Library"]} icon={Sparkles}/>} 
      {active==="clay" && <ModuleGrid title="CLAY Intelligence" subtitle="The strategic intelligence layer for decisions, forecasting and learning." items={clayCards} icon={Brain}/>} 
      {active==="knowledge" && <Knowledge/>}
      {active==="analytics" && <Analytics pipeline={pipeline} outstanding={outstanding}/>} 
    </section>
  </main>
}

function Dashboard({pipeline,outstanding}){
  return <section>
    <div className="hero">
      <div>
        <span className="eyebrow">Enterprise Operating System</span>
        <h2>Run CLAY HOUSE from one command center.</h2>
        <p>Clients, projects, finance, production, creative assets, CLAY Intelligence and AI agents in one premium platform.</p>
      </div>
      <div className="hero-card"><b>Next Document</b><span>CH-INV-2026-0002</span></div>
    </div>
    <div className="cards">
      <Metric label="Clients" value={clients.length}/>
      <Metric label="Active Projects" value={projects.length}/>
      <Metric label="Outstanding" value={money(outstanding)}/>
      <Metric label="Pipeline" value={money(pipeline)} accent/>
    </div>
    <div className="split">
      <Panel title="Recent Documents"><DocTable docs={documents}/></Panel>
      <Panel title="AI Department Agents"><div className="agent-list">{aiAgents.map(a=><span key={a}>{a}</span>)}</div></Panel>
    </div>
  </section>
}

function Business(){
  return <section>
    <div className="row"><div><h2>Business System</h2><p>Clients, projects, team, calendar and operational status.</p></div></div>
    <div className="cards compact"><Metric label="Clients" value="03"/><Metric label="Projects" value="03"/><Metric label="Calendar" value="Live"/><Metric label="Approvals" value="02" accent/></div>
    <div className="split">
      <Panel title="Clients"><SimpleTable rows={clients} columns={["name","type","status","value"]}/></Panel>
      <Panel title="Projects"><SimpleTable rows={projects} columns={["code","name","client","stage","due"]}/></Panel>
    </div>
  </section>
}

function Knowledge(){
  return <section>
    <div className="row"><div><h2>Knowledge Base</h2><p>Searchable institutional memory for documents, projects, research and production learning.</p></div></div>
    <div className="knowledge-grid">
      {[
        [Database,"Project Archive","Every completed project and reference file."],
        [FileText,"Document Library","Invoices, proposals, reports, briefs and contracts."],
        [Megaphone,"Case Studies","Success stories, campaigns and client outcomes."],
        [Brain,"Research Library","Signals, trends, market intelligence and forecasts."],
        [CalendarDays,"Meeting Notes","Client decisions and next actions."],
        [FolderKanban,"Asset Library","Videos, photos, logos, templates and exports."]
      ].map(([Icon,title,note])=><div className="knowledge-card" key={title}><Icon/><b>{title}</b><p>{note}</p></div>)}
    </div>
  </section>
}

function Analytics({pipeline,outstanding}){
  return <section>
    <h2>Analytics</h2><p>CEO overview for revenue, projects, utilization and growth.</p>
    <div className="cards"><Metric label="Revenue Pipeline" value={money(pipeline)} accent/><Metric label="Outstanding" value={money(outstanding)}/><Metric label="Utilization" value="74%"/><Metric label="Growth Forecast" value="High"/></div>
    <Panel title="Strategic Readout"><p className="readout">CLAY HOUSE ONE is structured to become a production, finance, client and intelligence platform. Version 1.0 focuses on core business visibility. Version 2.0 should connect Supabase authentication, database, storage and PDF generation.</p></Panel>
  </section>
}

function ModuleGrid({title,subtitle,items,icon:Icon}){
  return <section>
    <h2>{title}</h2><p>{subtitle}</p>
    <div className="module-grid">{items.map(item=><div className="module-card" key={item}><Icon/><b>{item}</b><span>Planned module</span></div>)}</div>
  </section>
}

function Invoice(){ return null; }
function Metric({label,value,accent}){return <div className={accent?"card gradient":"card"}><span>{label}</span><b>{value}</b></div>}
function Panel({title,children}){return <div className="panel"><h3>{title}</h3>{children}</div>}
function DocTable({docs}){return <table className="doc-table"><thead><tr><th>Code</th><th>Type</th><th>Client</th><th>Project</th><th>Status</th><th>Amount</th></tr></thead><tbody>{docs.map(d=><tr key={d.code}><td>{d.code}</td><td>{d.type}</td><td>{d.client}</td><td>{d.project}</td><td><span className="pill">{d.status}</span></td><td>{money(d.amount)}</td></tr>)}</tbody></table>}
function SimpleTable({rows,columns}){return <table className="doc-table"><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{columns.map(c=><td key={c}>{c==="value"?money(r[c]):r[c]}</td>)}</tr>)}</tbody></table>}

createRoot(document.getElementById("root")).render(<App/>);