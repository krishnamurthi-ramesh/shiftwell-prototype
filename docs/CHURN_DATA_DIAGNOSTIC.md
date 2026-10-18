# Quantitative Churn Diagnostic & Unit Economic Analysis

> **Portfolio Diagnostic & Financial Risk Modeling**  
> **Prepared for:** Shiftwell Leadership & Product Strategy  
> **Author:** Krishna Murthi (Product Management Intern Candidate)

---

## 1. Portfolio Health Overview (Q3 2026 Audit)

| Account Name | Segment | Locations | ARR | Renewal Date | Swap Approval Speed (<24h) | Manager Workload (hrs/wk) | Health Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **UrbanMart** | Retail | 200 | INR 110L | Aug 2027 | 64% | 3.5h | **Healthy** (Flagship account) |
| **FreshBowl** | Restaurants | 120 | INR 84L | Jan 2027 | 38% | 6.5h | **At Risk** (Approval Gridlock) |
| **CarePoint Clinics** | Healthcare | 40 | INR 60L | Dec 2026 | 71% | 4.0h | **At Risk** (Regulatory Audit Exposure) |
| **QuickKart** | Retail | 90 | INR 48L | Jun 2027 | 67% | 3.0h | **Healthy** |
| **Spice Route** | Restaurants | 60 | INR 36L | Mar 2027 | 41% | 6.0h | **Watchlist** |
| **MedAxis Labs** | Healthcare | 25 | INR 30L | Feb 2027 | 80% | 2.5h | **Healthy** |
| **FitZone** | Gyms | 50 | INR 22L | Oct 2026 | 35% | 5.5h | **At Risk** (Approval Gridlock) |
| **Brew & Co** | Cafes | 35 | INR 18L | Nov 2026 | 29% | 7.0h | **At Risk** (Approval Gridlock) |
| **TOTAL ACTIVE (8)** | **--** | **620** | **INR 408L** | **--** | **Avg 53.1%** | **Avg 4.75h** | **INR 184L At Risk (45.1%)** |

---

## 2. Historical Churn Analysis (Last 12 Months)

| Churned Account | Segment | Locations | ARR Lost | Reason Recorded by Sales | Swaps Approved (<24h) |
| :--- | :--- | :---: | :---: | :--- | :---: |
| **StyleHub** | Retail | 70 | INR 30L | Budget cuts | **60%** |
| **TandooriTown** | Restaurants | 45 | INR 25L | Price (Manager approval overload & shift dropouts) | **22%** |
| **GreenLeaf Salads** | Restaurants | 30 | INR 16L | Moved to RotaPro (auto-approvals for qualified staff) | **31%** |
| **PawsCare Vets** | Clinics | 15 | INR 9L | Went back to spreadsheets (approval bottlenecks) | **33%** |
| **HISTORICAL TOTAL** | **--** | **160** | **INR 80L** | **3 of 4 accounts lost to operational friction** | **Avg 36.5% (28.7% Non-Budget)** |

### The 35% Approval Speed Churn Inflection Point
The empirical data demonstrates an unmistakable threshold:
- Accounts with approval speed $\ge 60\%$ (MedAxis 80%, CarePoint 71%, QuickKart 67%, UrbanMart 64%, StyleHub 60%) renewed or operated stably, with StyleHub churning solely due to macroeconomic budget reductions.
- **100% of accounts lost to product dissatisfaction, workflow bottlenecks, and competitor switching** (TandooriTown 22%, GreenLeaf 31%, PawsCare 33%) suffered from approval speeds below 35%.

```
Approval Speed vs. Churn Risk:
[========================================] 80% (MedAxis) - Healthy
[==================================] 71% (CarePoint) - Healthy (Regulatory Risk only)
[===============================] 67% (QuickKart) - Healthy
[==============================] 64% (UrbanMart) - Healthy
[==============================] 60% (StyleHub - CHURNED DUE TO BUDGET CUTS)
---------------------- 50% Portfolio Average ----------------------
[===================] 41% (Spice Route) - Watchlist
---------------------- 35% OPERATIONAL CHURN THRESHOLD ------------
[=================] 38% (FreshBowl) - AT RISK (Jan 2027)
[================] 35% (FitZone) - AT RISK (Oct 2026)
[============== ] 33% (PawsCare - CHURNED TO SPREADSHEETS)
[============== ] 31% (GreenLeaf - CHURNED TO ROTAPRO AUTO-APPROVAL)
[=============  ] 29% (Brew & Co) - AT RISK (Nov 2026)
[===========    ] 22% (TandooriTown - CHURNED)
```

---

## 3. Unit Economics of WhatsApp vs. In-Engine Auto-Approval

Sales recommended building custom WhatsApp Business API integrations for FreshBowl. A financial model reveals why this is economically destructive:

### WhatsApp Business API Cost Model:
- **Total Portfolio Monthly Swaps:** 10,160 swaps / month across 8 active accounts
- **Frontline WhatsApp Messages per Swap Cycle:**
  1. Swap Request Notification to Colleague (Template message)
  2. Escalation Notification to Store Manager (Template message)
  3. Confirmation / Resolution Ping to both parties (Session/Template message)
  - **Average Messages per Swap:** 2.0 to 3.0 messages
- **Meta WhatsApp Business API Pricing (India Enterprise):** ~INR 0.35 per template message
- **Monthly Variable Vendor Expense:**
  $$10,160 \times 2.0 \times \text{INR } 0.35 = \text{INR } 7,112 \text{ / month}$$
  $$10,160 \times 3.0 \times \text{INR } 0.35 = \text{INR } 10,668 \text{ / month}$$
- **Annual Recurring Overhead:** **INR 85,300 to INR 1,28,000 per year** in variable third-party vendor surcharges (or INR 24,360 to INR 36,540/yr for FreshBowl alone).

### Operational Flaw:
Sending 30 WhatsApp notifications per night to an overworked store manager does not resolve the bottleneck. The manager still has to manually review, mentally verify station training, and manually click approve. Delays persist.

### In-Engine Auto-Approval Economics:
- **Marginal Cost per Swap:** **INR 0.00** (Executed asynchronously in local server worker queue).
- **Execution Latency:** **< 200 milliseconds**.
- **Manager Overhead Reduction:** Resolves ~75% of routine swaps instantly, eliminating ~65% of manager workload (~1,920 frontline hours/week recovered across 620 locations).
