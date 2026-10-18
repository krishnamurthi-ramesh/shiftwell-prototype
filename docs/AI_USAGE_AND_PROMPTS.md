# AI Usage Disclosure & Prompt Audit Trail

**Candidate:** Krishna Murthi  
**Role:** Product Management Intern Case Study (2027) — Shiftwell  
**Employer:** Hubspark  
**Repository:** [github.com/krishnamurthi-ramesh/shiftwell-prototype](https://github.com/krishnamurthi-ramesh/shiftwell-prototype)

---

## 1. AI Tools Utilized & Division of Scope

In compliance with the official case rules (*"AI tools are allowed and encouraged. Tell us which ones you used and for what"*), two primary AI toolsets were utilized during the preparation of this submission:

### A. Claude 3.5 Sonnet & Claude 3.7 Sonnet (via Google Antigravity IDE)
* **Quantitative Diagnostic & Correlation Analysis:**
  * Aggregated portfolio swap volume ($10,160$ monthly swaps across the 8 active enterprise accounts).
  * Analyzed the approval latency threshold ($<24\text{h}$) across healthy accounts ($70\%$), at-risk accounts ($34\%$), and historical churned accounts ($28.7\%$).
  * Calculated WhatsApp Business API messaging costs ($\text{INR } 0.35/\text{ping} \times 2\text{--}3\text{ pings} \times 10,160\text{ swaps} \times 12\text{ months} = \text{INR } 85,344\text{--}\text{INR } 1,28,016/\text{year}$).
* **Full-Stack Working Prototype Development:**
  * Implemented an interactive simulation engine in HTML5, CSS3, and vanilla JavaScript without heavy external framework bloat.
  * Built live policy toggles for Role Matching, 48-Hour Overtime Escalation, Certificate Expiry Hard-Blocking, and Auto-Approval.
  * Structured interactive case-study scenarios (FreshBowl auto-approval, CarePoint BLS lapse block, UrbanMart overtime escalation, Brew & Co high manager load).
* **LaTeX Source Drafting & Typesetting:**
  * Formatted the rigorous 4-page executive memo adhering strictly to the word and page count constraints.

### B. ChatGPT (GPT-4o)
* **Document Review & Critical Stress-Testing:**
  * Reviewed memo drafts for unsupported or premature claims (e.g., qualifying that auto-approval is targeted at up to 75% subject to pilot validation, rather than an unproven guarantee).
  * Caught mathematical reconciliation mismatches (e.g., reconciling FreshBowl manager hours saved to $65\% \times 6.5\text{ hrs} \approx 4.2\text{ hrs/week}$, and reconciling $25\text{--}30\text{ nightly swaps}$ to $6\text{--}8\text{ exceptions/night}$ at $25\%$ manual rate).
  * Refined churn attribution (distinguishing StyleHub's macro budget cuts from operational approval friction in TandooriTown, GreenLeaf, and PawsCare).
* **FigJam Flowchart Refinement:**
  * Validated the dual-path state machine logic in FigJam ([Node 9:69](https://www.figma.com/board/OJXSOr8Sc4iL8QuREGRVgK/Bilateral-Swap-Policy-Engine-Flow?node-id=9-69)), ensuring certificate validity checks intercept both pre-shift roster publishing and real-time bilateral swap requests.

---

## 2. Key Prompts & Iterative Inquiry Summary

### Prompt Set 1: Data Diagnostic & Churn Pattern Analysis
```text
Analyze the Shiftwell customer churn data pack and customer interview transcripts.
1. What distinguishes healthy accounts from churned accounts?
2. What was the exact reason for StyleHub's departure versus TandooriTown, GreenLeaf, and PawsCare?
3. Calculate total monthly swap volume across all 8 active accounts and estimate recurring WhatsApp API costs.
```
**Outcome:** Uncovered that swap approval speed is the primary operational churn predictor ($28.7\%$ non-budget churn average vs. $70\%$ healthy accounts). Confirmed StyleHub ($60\%$) churned due to macro corporate budget cuts, not operational friction.

### Prompt Set 2: Sizing & Strategic Prioritization
```text
Evaluate the Sales Head's Q4 proposal (WhatsApp: 3 sprints, Overtime: 2 sprints, Certificates: 1 sprint) against engineering capacity (6 sprints total, 2 engineers, 1 designer).
Propose an alternative platform architecture that solves the root problem while preserving contingency.
```
**Outcome:** Identified the 100% capacity trap. Proposed a 4-sprint Rules-Based Auto-Approval Engine (Core Engine: 3 sprints, Certificate Module: 1 sprint) that covers all three customer requirements and reserves 2 sprints ($33\%$) for QA and pilot hardening.

### Prompt Set 3: Mathematical Reconciliation & Defensibility Audit
```text
Review the memo for numerical consistency:
1. FreshBowl manager workload: 25-30 requests nightly vs. manual review volume.
2. Manager hours saved: baseline 6.5 hrs/week with a 65% reduction.
3. Word count check on Deliverable 2 (Sales Head Reply) and Deliverable 4 (Build Note) against strict 200-word caps.
```
**Outcome:** Reconciled nightly peak exceptions to $6\text{--}8$ ($25\%$ manual review of $25\text{--}30$ requests) and weekly manager savings to $\sim 4.2$ hours ($65\% \times 6.5\text{ hrs}$). Constrained Deliverable 2 to 190 words and Deliverable 4 to 182 words.

---

## 3. Candidate Accountability

In accordance with academic and professional standards:
* All strategic priorities, architectural design decisions, trade-off selections, and operational assumptions were established, verified, and defended by the candidate.
* Every metric cited in the submission has been independently verified against the raw case study data pack and is prepared for direct verbal defense during the interview.
