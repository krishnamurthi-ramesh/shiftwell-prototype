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

| Churned Account | Segment | ARR Lost | Churn Date | Approval Speed (<24h) | Primary Exit Reason |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **GreenLeaf Fresh** | Organic Grocery | INR 55L | Q3 2026 | **31%** | Lost to competitor **RotaPro** due to automatic qualified swap approvals. |
| **TandooriTown** | Casual Dining | INR 25L | Q1 2026 | **24%** | Manager message overload, Friday night shift dropouts, high staff turnover. |
| **PawsCare** | Pet Care / Vet | INR 15L | Q2 2026 | **31%** | Unresolved swap bottlenecks leading to operational chaos. |
| **HISTORICAL TOTAL** | **--** | **INR 95L** | **--** | **Avg 28.7%** | **100% of churned accounts had approval speed < 35%** |

### The 35% Approval Speed Churn Inflection Point
The empirical data demonstrates an unmistakable threshold:
- Every account with approval speed $\ge 60\%$ renewed consistently without executive escalation.
- Every account with approval speed $< 35\%$ either churned or is currently in active renewal jeopardy.

```
Approval Speed vs. Churn Risk:
[========================================] 80% (MedAxis) - Healthy
[==================================] 71% (CarePoint) - Healthy (Regulatory Risk only)
[===============================] 67% (QuickKart) - Healthy
[==============================] 64% (UrbanMart) - Healthy
---------------------- 50% Portfolio Average ----------------------
[===================] 41% (Spice Route) - Watchlist
---------------------- 35% CHURN DANGER THRESHOLD -----------------
[=================] 38% (FreshBowl) - AT RISK (Jan 2027)
[================] 35% (FitZone) - AT RISK (Oct 2026)
[============== ] 31% (GreenLeaf - CHURNED TO ROTAPRO)
[============== ] 31% (PawsCare - CHURNED)
[=============  ] 29% (Brew & Co) - AT RISK (Nov 2026)
[===========    ] 24% (TandooriTown - CHURNED)
```

---

## 3. Unit Economics of WhatsApp vs. In-Engine Auto-Approval

Sales recommended building custom WhatsApp Business API integrations for FreshBowl. A financial model reveals why this is economically destructive:

### WhatsApp Business API Cost Model:
- **Total Portfolio Monthly Swaps:** 9,160 swaps / month
- **Frontline WhatsApp Messages per Swap Cycle:**
  1. Swap Request Notification to Colleague (Template message)
  2. Escalation Notification to Store Manager (Template message)
  3. Confirmation / Resolution Ping to both parties (Session/Template message)
  - **Average Messages per Swap:** 2.4 to 3.0 messages
- **Meta WhatsApp Business API Pricing (India/Regional Enterprise):** ~INR 0.35 per template message
- **Monthly Variable Vendor Expense:**
  $$9,160 \times 2.4 \times \text{INR } 0.35 = \text{INR } 7,694 \text{ / month}$$
  $$9,160 \times 3.0 \times \text{INR } 0.35 = \text{INR } 9,618 \text{ / month}$$
- **Annual Recurring Overhead:** **INR 92,300 to INR 1,15,400 per year** in variable third-party costs.

### Operational Flaw:
Sending 30 WhatsApp notifications per night to an overworked store manager does not resolve the bottleneck. The manager still has to manually review, mentally verify station training, and manually click approve. Delays persist.

### In-Engine Auto-Approval Economics:
- **Marginal Cost per Swap:** **INR 0.00** (Executed asynchronously in local server worker queue).
- **Execution Latency:** **< 200 milliseconds**.
- **Manager Overhead Reduction:** Resolves ~75% of routine swaps instantly, eliminating ~65% of manager workload (~1,920 frontline hours/week recovered across 620 locations).
