# Shiftwell — Rules-Based Auto-Approval Engine

> **HugoHub / Hubspark Product Management Intern Case Study Submission (2026–2027)**  
> **Candidate:** Krishna Murthi  
> **Submission Document:** [Shiftwell_Product_Intern_Case_Study_Submission.pdf](./Shiftwell_Product_Intern_Case_Study_Submission.pdf) (4-page executive LaTeX memo)

---

## 🚀 Live Prototype & Deployment

- **Live Deployed Prototype**: **[https://elaborate-parfait-1cc881.netlify.app/](https://elaborate-parfait-1cc881.netlify.app/)**
- **GitHub Repository**: [krishnamurthi-ramesh/shiftwell-prototype](https://github.com/krishnamurthi-ramesh/shiftwell-prototype)
- **UI Architecture**: Semantic HTML5, Figma-Grade Dark B2B SaaS Design System (Linear & Stripe aesthetic, deep slate surfaces, zero cartoon emojis or AI glow artifacts), Vanilla JavaScript Controller (100% static, zero build step, sub-millisecond execution).
- **Hosting**: Netlify Production Edge (`publish = "prototype"`)

---

## 📌 Executive Summary & Root-Cause Diagnosis

Across Shiftwell's active portfolio (8 enterprise accounts, 620 locations, INR 4.08 Cr ARR) and churned accounts over the past 12 months, **Swap Approval Speed (<24 hours) is the single leading indicator of retention and churn**:
- **Healthy Accounts** (UrbanMart, QuickKart, MedAxis Labs): Average **70%** of swaps resolved in <24 hours.
- **At-Risk Accounts** (FreshBowl, CarePoint, FitZone, Brew & Co): Average only **34%** of swaps resolved in <24 hours.
- **Churned Accounts** (TandooriTown 24%, GreenLeaf 31%, PawsCare 31%): Averaged **28.7%** prior to churn.

Every single account lost in the past 12 months had approval speeds under 35%. GreenLeaf's exit interview confirms the root cause:
> *"Honestly it wasn't WhatsApp. Our managers couldn't keep up with approvals, and RotaPro let swaps go through automatically if the person was trained."*

WhatsApp merely relocates an unmanageable queue from mobile app to chat; it does nothing to clear it.

---

## 🎯 The Strategic Recommendation: Build the Rules-Based Engine

Instead of 3 bespoke one-offs consuming 100% of engineering capacity (6/6 sprints) with zero buffer:
- **Build a Universal Rules-Based Auto-Approval Engine in 4 Sprints**:
  - **Core Rules Engine**: 3 sprints (evaluates role/station qualification, 48h overtime threshold, and instant auto-approval).
  - **Clinical Certificate Module**: 1 sprint (enforces mandatory licenses for CarePoint Clinics).
  - **Contingency Buffer**: 2 full sprints preserved for integration testing, edge cases, and pilot rollouts.
- **Total Capacity Consumed**: 4 / 6 Sprints (33% safety buffer preserved).
- **Defer WhatsApp to Q1 2027**: Re-evaluate strictly as an escalation notification channel once 75% of routine swaps are auto-resolved.

---

## 💻 Enterprise Prototype Architecture

### 1. ⚙️ Tenant-Aware Policy Configurator
- **Tenant Context Switcher**: Switch between **FreshBowl** (120 locs), **CarePoint Clinics** (40 locs), **UrbanMart** (200 locs), and **Global Default** to see policies adapt dynamically.
- **Rule Matrix**:
  - `RULE-01-ROLE-MATCH`: Role tag + station qualification verification.
  - `RULE-02-OVERTIME-CAP`: 48-hour statutory weekly limit with automated regional manager escalation.
  - `RULE-03-CERT-VALIDITY`: Hard-block for lapsed clinical credentials (BLS, Nursing Council).
  - `RULE-04-AUTO-APPROVE`: <200ms automated resolution with daily digest summaries.

### 2. ⚡ Live Swap Simulator & Custom Sandbox
- **5 Canonical Case Study Scenarios**:
  - **FreshBowl Line Cook Swap**: All rules pass $\rightarrow$ Auto-Approved in 142ms.
  - **CarePoint Expired BLS Nurse**: Regulatory violation $\rightarrow$ Hard-Blocked in 88ms.
  - **UrbanMart Overtime Breach (53h)**: Pushes staff to 53 hrs $\rightarrow$ Escalated to Regional Manager with cost projection.
  - **FreshBowl Station Cook Overtime**: Minor breach $\rightarrow$ Escalated to Store Manager.
  - **CarePoint Validated ICU Nurse**: Full compliance $\rightarrow$ Auto-Approved in 178ms.
- **Interactive Custom Sandbox**: Configure custom role match, hours, and credential status live to test arbitrary policy edge cases.
- **Multi-View Decision Inspector**:
  - **Verdict Summary**: Key decision code, latency metrics, and compliance status.
  - **Frontline Mobile View**: Native smartphone card preview showing instant auto-approval.
  - **Manager Action Desk**: Zero-interruption digest or 1-click authorization desk.
  - **JSON Audit Ledger**: Full trace payload with cryptographic IDs, rule results, and timestamps.

### 3. 📊 Portfolio Health & Churn Correlation Matrix
- Audited portfolio data table covering all 8 accounts (UrbanMart INR 110L, FreshBowl INR 84L, CarePoint INR 60L, QuickKart INR 48L, Spice Route INR 36L, MedAxis INR 30L, FitZone INR 22L, Brew & Co INR 18L).
- Interactive horizontal bar chart visualizing the 35% churn inflection threshold.
- Historical post-mortem records for GreenLeaf, TandooriTown, and PawsCare.

### 4. 📈 Strategic ROI & Sprint Planning
- Sprint capacity comparison: 100% capacity risk (Sales request) vs 4 sprints + 2 buffer (Our plan).
- Financial economics: INR 38,000–INR 1,15,400/yr saved on WhatsApp API costs + 65% manager workload reduction (~1,920 frontline hours/week recovered across 620 locations).

---

## 🛠 Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/krishnamurthi-ramesh/shiftwell-prototype.git

# Serve locally
cd shiftwell-prototype
python -m http.server 8080 --directory prototype
```
Open `http://localhost:8080` in any modern web browser.

---

## 📄 License & Case Study Attribution
Prepared by **Krishna Murthi** for the **HugoHub / Hubspark Product Management Intern Selection (2026–2027)**.
