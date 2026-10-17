# Shiftwell — Smart Swap Auto-Approval Engine

> **HugoHub / Hubspark Product Intern Case Study (2026–2027)**  
> An intelligent, rules-based auto-approval engine for shift swaps that protects at-risk ARR, slashes manager administrative overhead by ~65%, and eliminates compliance vulnerabilities.

---

## 🚀 Live Prototype & Deployment

- **GitHub Repository**: [krishnamurthi-ramesh/shiftwell-prototype](https://github.com/krishnamurthi-ramesh/shiftwell-prototype)
- **Tech Stack**: Semantic HTML5, Vanilla CSS Design System (Figma-grade tokens, dark SaaS aesthetic), Vanilla JavaScript Controller (Zero build step, 100% static)
- **Deployment Ready**: Optimized for Netlify (`publish = "prototype"` in `netlify.toml`)

---

## 📌 Problem & Strategic Context

Shiftwell's portfolio data reveals that **swap approval speed is the single greatest predictor of customer retention and churn**:
- Accounts with **>60%** swaps approved within 24h are **Healthy** (UrbanMart, QuickKart, MedAxis).
- Accounts with **<40%** swaps approved within 24h are **At Risk** or have **Churned** (FreshBowl 28%, CarePoint 19%, FitZone 38%, Brew&Co 35%).
- Root cause: **Manual manager bottlenecks**. Store managers spend 5–7 hours/week approving routine swaps without checking details, causing delays of 12–24+ hours.

### The Solution: Shiftwell Smart Swap Engine
Instead of building one-off custom features (e.g. WhatsApp integration for 3 sprints), Shiftwell builds a **universal, configurable rules engine (~4 sprints)**:
1. **Auto-Approves** trained-staff swaps instantly when conditions match.
2. **Escalates** overtime breaches to Regional or Store Managers with 1-click approvals.
3. **Blocks** compliance breaches (e.g., lapsed healthcare certifications like BLS/ACLS).

---

## ✨ Prototype Features

### 1. ⚙️ Rules Configuration Panel
- **Role & Skill Match**: Match by role tag, skill matrix, or station qualification.
- **Overtime Threshold**: Configurable weekly hour cap (e.g., 48 hrs) with automated escalation routing.
- **Certificate Validity**: Real-time validation against required licenses with expiration warning thresholds.
- **Auto-Approve Decisioning**: Instant auto-approval with daily manager digest and complete audit trail.
- **Visual Evaluation Pipeline**: Real-time visual flow showing the status of each rule in the processing pipeline.

### 2. ⚡ Real-Time Swap Simulation
Interactive simulator testing real scenarios against the engine:
- **FreshBowl — Cook Swap (Auto-Approve ✅)**: Line cook bilateral swap; verified in 140ms.
- **CarePoint — Expired BLS Nurse (Blocked 🛑)**: Catches lapsed certification; eliminates regulatory fines.
- **UrbanMart — Overtime Breach (Escalate ⚠️)**: Swapper reaches 53 hrs; automatically escalated to Regional Manager with OT cost calculation.
- **FreshBowl — Near Overtime (Escalate ⚠️)**: Tier-1 breach routed to Location Store Manager.
- **CarePoint — Valid ICU Nurse (Auto-Approve ✅)**: Validated clinical qualification; zero disruption.

### 3. 📊 Account Health Dashboard
- Portfolio KPI overview (Total ARR ₹4.08 Cr, Active Accounts, Monthly Swaps, Avg Approval Rate).
- Active accounts data table with progress bars, health status pills, and manager time tracking.
- Interactive horizontal bar chart visualizing the churn danger threshold (<40%).
- Post-mortem analysis on churned accounts (GreenLeaf, TandooriTown, StyleHub, PawsCare).

### 4. 📈 Projected Q4 Impact
- **₹1.84 Cr At-Risk ARR Protected** (FreshBowl ₹84L, CarePoint ₹60L, FitZone ₹22L, Brew&Co ₹18L).
- **~65% Manager Time Reduction** (from 4.75 hrs/wk down to ~1.7 hrs/wk).
- **Instant Resolution for 75% of Swaps**.
- **Sprint Roadmap**: 3 sprints core engine + 1 sprint cert module + 2 sprints buffer/QA.

---

## 💻 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/krishnamurthi-ramesh/shiftwell-prototype.git
   ```
2. Open `prototype/index.html` in any web browser:
   - On Windows: double-click `prototype/index.html` or open in Chrome/Edge.
   - Or use VS Code Live Server / Python HTTP server:
     ```bash
     cd prototype
     python -m http.server 8000
     ```
   - Visit `http://localhost:8000`

---

## 🌐 Deploy to Netlify

### Option A: Via GitHub (Recommended)
1. In Netlify, click **Add new site** > **Import an existing project** > **GitHub**.
2. Select `shiftwell-prototype`.
3. Set **Publish directory** to `prototype` (or leave as configured in `netlify.toml`).
4. Click **Deploy site**.

### Option B: Via Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `prototype` folder.
3. Your site is live instantly!

---

## 📄 License & Attribution
Prepared for the **HugoHub / Hubspark Product Intern Selection Process (2026–2027)** by **Krishna Murthi**.
