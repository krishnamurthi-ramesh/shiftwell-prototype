/**
 * Shiftwell — Smart Swap Rules Engine Prototype
 * Interactive Controller & Simulation Runner
 */

// ==========================================
// 1. DATA MODELS & INITIAL STATE
// ==========================================

const accountsData = [
    { name: "FreshBowl", segment: "Restaurants", locs: 85, arr: "₹84L", renewal: "Nov 2026", approval: 28, mgrHrs: 6.2, health: "at-risk" },
    { name: "CarePoint", segment: "Clinics", locs: 45, arr: "₹60L", renewal: "Dec 2026", approval: 19, mgrHrs: 7.1, health: "at-risk" },
    { name: "QuickBite", segment: "Restaurants", locs: 60, arr: "₹52L", renewal: "Feb 2027", approval: 72, mgrHrs: 2.8, health: "healthy" },
    { name: "RetailPlus", segment: "Retail", locs: 50, arr: "₹45L", renewal: "Jan 2027", approval: 68, mgrHrs: 3.2, health: "healthy" },
    { name: "MediCare", segment: "Clinics", locs: 35, arr: "₹42L", renewal: "Mar 2027", approval: 65, mgrHrs: 3.5, health: "healthy" },
    { name: "FitZone", segment: "Gyms", locs: 30, arr: "₹22L", renewal: "Nov 2026", approval: 38, mgrHrs: 5.4, health: "at-risk" },
    { name: "UrbanMart", segment: "Retail", locs: 25, arr: "₹20L", renewal: "Jan 2027", approval: 54, mgrHrs: 4.1, health: "watch" },
    { name: "Brew&Co", segment: "Cafes", locs: 20, arr: "₹18L", renewal: "Dec 2026", approval: 35, mgrHrs: 5.7, health: "at-risk" }
];

const scenarios = {
    "freshbowl-pass": {
        account: "FreshBowl",
        accountTag: "Restaurants · 85 Locations",
        requester: {
            name: "Rahul Sharma",
            role: "Line Cook (Grill / Hot Prep)",
            store: "Store #12 · Indiranagar",
            avatar: "👨‍🍳",
            hours: 36,
            certs: ["FSSAI Level 2", "Grill Qualified", "HACCP Safety"]
        },
        acceptor: {
            name: "Arjun Verma",
            role: "Line Cook (Grill / Hot Prep)",
            store: "Store #04 · Koramangala",
            avatar: "🍳",
            hours: 32,
            certs: ["FSSAI Level 2", "Grill Qualified", "Food Prep Basic"]
        },
        shift: {
            date: "Saturday, Oct 24, 2026",
            time: "16:00 – 23:00 (7 hrs)",
            station: "Hot Line Cook · Station A",
            hourlyRate: "₹210/hr",
            urgency: "Standard (3 days in advance)"
        },
        expectedRules: {
            role: { pass: true, label: "Role & Skill Match", desc: "Both staff hold verified Line Cook qualification & Grill certification." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Arjun's weekly hours: 32h + 7h = 39h (Threshold limit is 48h). 9h safety buffer." },
            cert: { pass: true, label: "Certificate Validity", desc: "FSSAI Level 2 active & verified until Dec 2027 (420 days remaining)." },
            auto: { pass: true, label: "Auto-Approve Decision", desc: "All 3 validation conditions satisfied. Instant confirmation dispatched." }
        },
        verdict: {
            type: "approved",
            title: "Swap Auto-Approved Instantly",
            desc: "The rules engine verified qualifications, overtime compliance, and active FSSAI credentials in 140ms. Both schedules updated automatically.",
            metrics: [
                { label: "Execution Time", val: "140ms", old: "14 hrs avg" },
                { label: "Manager Touchpoint", val: "Zero (Digest Only)", old: "Manual Review Required" },
                { label: "Compliance Risk", val: "0.0%", old: "Unmonitored" }
            ]
        }
    },
    "carepoint-fail": {
        account: "CarePoint",
        accountTag: "Healthcare · 45 Clinics",
        requester: {
            name: "Dr. Ananya Sen",
            role: "Staff Nurse (ICU Ward)",
            store: "Clinic #03 · Jayanagar",
            avatar: "👩‍⚕️",
            hours: 34,
            certs: ["BLS Certified", "ACLS Advanced", "ICU Critical Care"]
        },
        acceptor: {
            name: "Kavita Nair",
            role: "Junior Nurse (General Ward)",
            store: "Clinic #08 · Malleshwaram",
            avatar: "🩺",
            hours: 30,
            certs: ["BLS (Expired 12d ago)", "Basic Nursing", "Phlebotomy"]
        },
        shift: {
            date: "Sunday, Oct 25, 2026",
            time: "20:00 – 08:00 (12 hrs night)",
            station: "Critical Care / ICU Night Shift",
            hourlyRate: "₹420/hr",
            urgency: "Urgent (Tomorrow night)"
        },
        expectedRules: {
            role: { pass: true, label: "Role & Skill Match", desc: "Registered Nurse credentials verified for inpatient clinical care." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Kavita's hours: 30h + 12h = 42h (within 48h statutory maximum)." },
            cert: { pass: false, label: "Certificate Validity — FAILED", desc: "Mandatory Basic Life Support (BLS) certification expired 12 days ago on Oct 5, 2026." },
            auto: { pass: false, label: "Auto-Approve Decision", desc: "Evaluation blocked due to mandatory healthcare compliance violation." }
        },
        verdict: {
            type: "blocked",
            title: "Swap Blocked — Compliance Violation",
            desc: "CarePoint regulatory policy strictly requires an active Basic Life Support (BLS) certification for ICU shifts. Kavita's certificate is expired. The swap is blocked to safeguard patient safety and eliminate regulatory penalties.",
            metrics: [
                { label: "Decision", val: "Blocked at Engine", old: "Unnoticed in Spreadsheets" },
                { label: "Regulatory Penalty Prevented", val: "₹5,00,000", old: "High Audit Exposure" },
                { label: "Action Taken", val: "Prompt sent to renew BLS cert", old: "None" }
            ]
        }
    },
    "urbanmart-escalate": {
        account: "UrbanMart",
        accountTag: "Retail · 25 Superstores",
        requester: {
            name: "Sunil Mehra",
            role: "Checkout Lead / Cashier",
            store: "Hypermarket #14 · Whitefield",
            avatar: "🧑‍💼",
            hours: 40,
            certs: ["POS Terminal L2", "Cash Handling L3", "Customer Ops"]
        },
        acceptor: {
            name: "Vikram Seth",
            role: "Senior Cashier",
            store: "Hypermarket #14 · Whitefield",
            avatar: "🛒",
            hours: 44,
            certs: ["POS Terminal L2", "Cash Handling L3"]
        },
        shift: {
            date: "Sunday, Oct 25, 2026",
            time: "10:00 – 19:00 (9 hrs)",
            station: "Express Checkout Registers 1-4",
            hourlyRate: "₹180/hr (1.5x OT: ₹270/hr)",
            urgency: "Standard (48 hrs in advance)"
        },
        expectedRules: {
            role: { pass: true, label: "Role & Skill Match", desc: "Both employees verified for POS Terminal L2 and high-velocity cash registers." },
            overtime: { pass: "escalate", label: "Overtime Threshold — BREACH", desc: "Vikram's current hours: 44h + 9h shift = 53h (Exceeds weekly limit of 48h by 5.0 hours)." },
            cert: { pass: true, label: "Certificate Validity", desc: "All retail and loss prevention certifications valid." },
            auto: { pass: "escalate", label: "Escalated for Regional Sign-Off", desc: "Labor compliance rule triggered. High-overtime cost shift routed to Regional Manager." }
        },
        verdict: {
            type: "escalated",
            title: "Escalated to Regional Manager",
            desc: "This swap pushes Vikram to 53 weekly hours (5 hours of overtime at 1.5x pay rate, estimated ₹1,350 extra labor cost). Automatically routed to Regional Manager Rajesh K. with priority decision buttons.",
            metrics: [
                { label: "Overtime Excess", val: "5.0 hrs (₹1,350 OT cost)", old: "Hidden until payroll" },
                { label: "Approval Route", val: "Regional Mgr Push Alert", old: "Lost in WhatsApp chat" },
                { label: "Resolution Target", val: "< 2 hours", old: "36+ hours" }
            ]
        }
    },
    "freshbowl-overtime": {
        account: "FreshBowl",
        accountTag: "Restaurants · 85 Locations",
        requester: {
            name: "Pooja Hegde",
            role: "Prep Cook (Pantry & Salads)",
            store: "Store #18 · Whitefield",
            avatar: "👩‍🍳",
            hours: 38,
            certs: ["FSSAI Level 1", "Knife Skills Cert"]
        },
        acceptor: {
            name: "Dev Patel",
            role: "Prep Cook (Pantry & Salads)",
            store: "Store #18 · Whitefield",
            avatar: "🥗",
            hours: 43,
            certs: ["FSSAI Level 1", "Knife Skills Cert"]
        },
        shift: {
            date: "Friday, Oct 23, 2026",
            time: "15:00 – 22:00 (7 hrs)",
            station: "Cold Prep & Assembly Line",
            hourlyRate: "₹190/hr",
            urgency: "Urgent (Same day)"
        },
        expectedRules: {
            role: { pass: true, label: "Role & Skill Match", desc: "Both staff certified for cold prep and kitchen sanitation protocols." },
            overtime: { pass: "escalate", label: "Overtime Warning — 50 hrs Total", desc: "Dev's weekly total: 43h + 7h = 50h. Crosses 48h threshold by 2 hours." },
            cert: { pass: true, label: "Certificate Validity", desc: "FSSAI Level 1 active for both cooks." },
            auto: { pass: "escalate", label: "Routed to Location Store Manager", desc: "Tier 1 overtime breach (<=3 hrs over). Escalate to Store Manager Rohit G." }
        },
        verdict: {
            type: "escalated",
            title: "Escalated to Location Store Manager",
            desc: "Swap involves a minor 2-hour overtime breach. Since the breach is under 4 hours, it is routed directly to the Location Store Manager Rohit G. with 1-click mobile authorization.",
            metrics: [
                { label: "Escalation Level", val: "Store Manager", old: "HQ Email" },
                { label: "Projected Overtime Cost", val: "₹570", old: "Untracked" },
                { label: "SLA", val: "45 Minutes", old: "18 Hours" }
            ]
        }
    },
    "carepoint-pass": {
        account: "CarePoint",
        accountTag: "Healthcare · 45 Clinics",
        requester: {
            name: "Meera Krishnan",
            role: "Registered Nurse (ICU Ward)",
            store: "Clinic #01 · Indiranagar",
            avatar: "👩‍⚕️",
            hours: 32,
            certs: ["BLS Certified", "ACLS Advanced", "ICU Critical Care"]
        },
        acceptor: {
            name: "Sanjay Rao",
            role: "Registered Nurse (ICU Ward)",
            store: "Clinic #01 · Indiranagar",
            avatar: "👨‍⚕️",
            hours: 28,
            certs: ["BLS Certified", "ACLS Advanced", "Emergency Response"]
        },
        shift: {
            date: "Tuesday, Oct 27, 2026",
            time: "07:00 – 15:00 (8 hrs morning)",
            station: "ICU Ward Bed 1-6",
            hourlyRate: "₹400/hr",
            urgency: "Planned (5 days ahead)"
        },
        expectedRules: {
            role: { pass: true, label: "Role & Skill Match", desc: "Both nurses have identical ICU qualification band and skill matrix." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Sanjay's hours: 28h + 8h = 36h (12 hours remaining under 48h cap)." },
            cert: { pass: true, label: "Certificate Validity", desc: "All BLS and ACLS certificates verified valid through 2027." },
            auto: { pass: true, label: "Auto-Approve Decision", desc: "Strict healthcare compliance fully satisfied. Instant auto-approval." }
        },
        verdict: {
            type: "approved",
            title: "Healthcare Swap Auto-Approved",
            desc: "All clinical skills, certifications (BLS/ACLS), and staff fatigue limits passed verification without human intervention. Zero patient care disruption.",
            metrics: [
                { label: "Compliance Status", val: "100% Compliant", old: "Manual Nurse Call" },
                { label: "Resolution Time", val: "180ms", old: "22 Hours" },
                { label: "Shift Coverage", val: "Guaranteed", old: "30% Dropouts" }
            ]
        }
    }
};

const impactAccounts = [
    {
        name: "FreshBowl",
        segment: "Restaurants (85 locations)",
        arr: "₹84L ARR",
        risk: "At Risk (Nov 2026)",
        badge: "Highest Priority",
        badgeColor: "rose",
        rows: [
            { label: "Swap Approval <24h", before: "28%", after: "82%" },
            { label: "Store Manager Time", before: "6.2 hrs/wk", after: "1.8 hrs/wk" },
            { label: "Shift Dropout Rate", before: "19%", after: "3.5%" },
            { label: "Contract Renewal", before: "Exit Imminent", after: "Retained (₹84L saved)" }
        ]
    },
    {
        name: "CarePoint",
        segment: "Healthcare (45 clinics)",
        arr: "₹60L ARR",
        risk: "At Risk (Dec 2026)",
        badge: "Compliance Risk",
        badgeColor: "rose",
        rows: [
            { label: "Swap Approval <24h", before: "19%", after: "76%" },
            { label: "Expired Cert Breaches", before: "14 / month", after: "0 (Engine blocked)" },
            { label: "Nurse Supervisor Time", before: "7.1 hrs/wk", after: "2.1 hrs/wk" },
            { label: "Contract Renewal", before: "Churn Threat", after: "Retained (₹60L saved)" }
        ]
    },
    {
        name: "FitZone & Brew&Co",
        segment: "Gyms & Cafes (50 locations)",
        arr: "₹40L Combined ARR",
        risk: "At Risk (Nov/Dec 2026)",
        badge: "Fast Turnaround",
        badgeColor: "amber",
        rows: [
            { label: "Avg Approval <24h", before: "36.5%", after: "78%" },
            { label: "Manager Weekly Time", before: "5.5 hrs/wk", after: "1.6 hrs/wk" },
            { label: "Staff Satisfaction", before: "52 / 100", after: "88 / 100" },
            { label: "Combined ARR", before: "₹40L at Risk", after: "₹40L Secured" }
        ]
    }
];

// Active Rules Configuration State
let rulesState = {
    role: { active: true, match: "skill", action: "send_to_manager" },
    overtime: { active: true, maxHours: 48, escalate: "regional" },
    cert: { active: true, scope: "all", warnDays: 30 },
    auto: { active: true, notify: "digest", audit: "full" }
};

let isSimRunning = false;

// ==========================================
// 2. DOM INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderAccountsTable();
    renderApprovalChart();
    renderImpactCards();
    loadScenario();
});

// ==========================================
// 3. NAVIGATION LOGIC
// ==========================================

function initNavigation() {
    const navButtons = document.querySelectorAll(".g-header__nav-item");
    const panels = document.querySelectorAll(".panel");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            navButtons.forEach(b => {
                b.classList.remove("active");
                b.removeAttribute("aria-current");
            });
            panels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            btn.setAttribute("aria-current", "page");

            const activePanel = document.getElementById(`panel-${targetTab}`);
            if (activePanel) {
                activePanel.classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });
}

// ==========================================
// 4. RULES MANAGEMENT
// ==========================================

function handleRuleToggle(ruleKey, checked) {
    if (!rulesState[ruleKey]) return;
    rulesState[ruleKey].active = checked;

    const card = document.getElementById(`rule-${ruleKey}`);
    if (card) {
        if (checked) {
            card.classList.add("rule-card--active");
        } else {
            card.classList.remove("rule-card--active");
        }
    }

    // Update pipeline visual
    const pipeNode = document.getElementById(`pipe-${ruleKey}`);
    if (pipeNode) {
        if (checked) {
            pipeNode.classList.remove("pipeline__node--disabled");
        } else {
            pipeNode.classList.add("pipeline__node--disabled");
        }
    }

    showToast(`Rule "${ruleKey.toUpperCase()}" ${checked ? "Enabled" : "Disabled"}`);
}

function saveRules() {
    rulesState.role.match = document.getElementById("cfg-role-match")?.value || "skill";
    rulesState.role.action = document.getElementById("cfg-role-action")?.value || "send_to_manager";
    rulesState.overtime.maxHours = parseInt(document.getElementById("cfg-ot-hours")?.value || "48", 10);
    rulesState.overtime.escalate = document.getElementById("cfg-ot-escalate")?.value || "regional";
    rulesState.cert.scope = document.getElementById("cfg-cert-scope")?.value || "all";
    rulesState.cert.warnDays = parseInt(document.getElementById("cfg-cert-warn")?.value || "30", 10);
    rulesState.auto.notify = document.getElementById("cfg-auto-notify")?.value || "digest";
    rulesState.auto.audit = document.getElementById("cfg-auto-audit")?.value || "full";

    showToast("Rules configuration saved to active policy!");
}

function resetRules() {
    rulesState = {
        role: { active: true, match: "skill", action: "send_to_manager" },
        overtime: { active: true, maxHours: 48, escalate: "regional" },
        cert: { active: true, scope: "all", warnDays: 30 },
        auto: { active: true, notify: "digest", audit: "full" }
    };

    // Reset switches
    document.querySelectorAll(".rule-card input[type='checkbox']").forEach(ch => ch.checked = true);
    document.querySelectorAll(".rule-card").forEach(c => c.classList.add("rule-card--active"));
    document.querySelectorAll(".pipeline__node").forEach(n => n.classList.remove("pipeline__node--disabled"));

    // Reset inputs
    if (document.getElementById("cfg-role-match")) document.getElementById("cfg-role-match").value = "skill";
    if (document.getElementById("cfg-role-action")) document.getElementById("cfg-role-action").value = "send_to_manager";
    if (document.getElementById("cfg-ot-hours")) document.getElementById("cfg-ot-hours").value = "48";
    if (document.getElementById("cfg-ot-escalate")) document.getElementById("cfg-ot-escalate").value = "regional";
    if (document.getElementById("cfg-cert-scope")) document.getElementById("cfg-cert-scope").value = "all";
    if (document.getElementById("cfg-cert-warn")) document.getElementById("cfg-cert-warn").value = "30";
    if (document.getElementById("cfg-auto-notify")) document.getElementById("cfg-auto-notify").value = "digest";
    if (document.getElementById("cfg-auto-audit")) document.getElementById("cfg-auto-audit").value = "full";

    showToast("Rules reset to factory defaults");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.classList.add("show");

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

// ==========================================
// 5. SIMULATION SYSTEM
// ==========================================

function loadScenario() {
    if (isSimRunning) return;
    const select = document.getElementById("scenario-select");
    if (!select) return;

    const key = select.value;
    const scen = scenarios[key];
    if (!scen) return;

    // Badge
    const badge = document.getElementById("sim-account-badge");
    if (badge) badge.innerText = scen.account;

    // Participants
    const participantsContainer = document.getElementById("sim-participants");
    if (participantsContainer) {
        participantsContainer.innerHTML = `
            <div class="participant">
                <div class="participant__avatar">${scen.requester.avatar}</div>
                <div class="participant__info">
                    <div class="participant__name">${scen.requester.name} <span class="chip chip--slate">Requester</span></div>
                    <div class="participant__role">${scen.requester.role} · ${scen.requester.store}</div>
                    <div class="participant__chips">
                        <span class="chip chip--sky">Weekly: ${scen.requester.hours} hrs</span>
                        ${scen.requester.certs.map(c => `<span class="chip chip--emerald">${c}</span>`).join("")}
                    </div>
                </div>
            </div>

            <div class="swap-arrow">
                <span>Wants to swap shift with</span>
            </div>

            <div class="participant">
                <div class="participant__avatar">${scen.acceptor.avatar}</div>
                <div class="participant__info">
                    <div class="participant__name">${scen.acceptor.name} <span class="chip chip--indigo">Acceptor</span></div>
                    <div class="participant__role">${scen.acceptor.role} · ${scen.acceptor.store}</div>
                    <div class="participant__chips">
                        <span class="chip chip--amber">Weekly: ${scen.acceptor.hours} hrs</span>
                        ${scen.acceptor.certs.map(c => {
                            const isExpired = c.toLowerCase().includes("expired");
                            return `<span class="chip ${isExpired ? "chip--rose" : "chip--emerald"}">${c}</span>`;
                        }).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    // Shift Details
    const shiftDetailsContainer = document.getElementById("sim-shift-details");
    if (shiftDetailsContainer) {
        shiftDetailsContainer.innerHTML = `
            <div class="detail-row">
                <span class="detail-row__label">Target Shift</span>
                <span class="detail-row__value">${scen.shift.date}</span>
            </div>
            <div class="detail-row">
                <span class="detail-row__label">Shift Hours</span>
                <span class="detail-row__value">${scen.shift.time}</span>
            </div>
            <div class="detail-row">
                <span class="detail-row__label">Station / Unit</span>
                <span class="detail-row__value">${scen.shift.station}</span>
            </div>
            <div class="detail-row">
                <span class="detail-row__label">Base Pay</span>
                <span class="detail-row__value">${scen.shift.hourlyRate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-row__label">Notice Period</span>
                <span class="detail-row__value">${scen.shift.urgency}</span>
            </div>
        `;
    }

    // Reset right side
    const flowContainer = document.getElementById("sim-flow");
    if (flowContainer) {
        flowContainer.innerHTML = `
            <div class="flow__empty">
                <div class="flow__empty-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="1.5" opacity="0.3"/><path d="M18 24h12M30 20l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>
                </div>
                <p>Click <strong>"Run Through Rules Engine"</strong> to evaluate this swap against the active rules pipeline.</p>
            </div>
        `;
    }

    const outcomeCard = document.getElementById("sim-outcome");
    if (outcomeCard) {
        outcomeCard.className = "outcome";
        outcomeCard.innerHTML = "";
    }

    const statusBadge = document.getElementById("sim-status-badge");
    if (statusBadge) {
        statusBadge.className = "card__badge card__badge--ghost";
        statusBadge.innerText = "Ready to Run";
    }
}

function runSim() {
    if (isSimRunning) return;
    const select = document.getElementById("scenario-select");
    const scen = scenarios[select.value];
    if (!scen) return;

    isSimRunning = true;
    const runBtn = document.getElementById("btn-run");
    const statusBadge = document.getElementById("sim-status-badge");
    const flowContainer = document.getElementById("sim-flow");
    const outcomeCard = document.getElementById("sim-outcome");

    if (runBtn) {
        runBtn.disabled = true;
        runBtn.innerHTML = `<span class="spinner"></span> Evaluating Rules Engine...`;
    }

    if (statusBadge) {
        statusBadge.className = "card__badge chip--amber";
        statusBadge.innerText = "Evaluating...";
    }

    if (outcomeCard) {
        outcomeCard.className = "outcome";
        outcomeCard.innerHTML = "";
    }

    // Build steps dynamically based on active rules
    const steps = [];

    // Step 0: Ingestion
    steps.push({
        name: "Swap Request Ingestion",
        dotClass: "flow-step__dot--start",
        dotIcon: "📨",
        title: "Swap Request Ingested",
        desc: `Received bilateral shift swap between ${scen.requester.name} and ${scen.acceptor.name} at ${scen.account}. Validated request syntax and time stamp.`,
        badgeText: "INGESTED",
        badgeClass: "badge--skip"
    });

    // Step 1: Role Rule
    if (rulesState.role.active) {
        const ruleEval = scen.expectedRules.role;
        steps.push({
            name: "Role & Skill Check",
            dotClass: ruleEval.pass ? "flow-step__dot--pass" : "flow-step__dot--fail",
            dotIcon: ruleEval.pass ? "✓" : "✕",
            title: "Rule 1: Role & Skill Match",
            desc: ruleEval.desc,
            badgeText: ruleEval.pass ? "PASSED" : "FAILED",
            badgeClass: ruleEval.pass ? "badge--pass" : "badge--fail"
        });
    } else {
        steps.push({
            name: "Role & Skill Check",
            dotClass: "flow-step__dot--skip",
            dotIcon: "—",
            title: "Rule 1: Role & Skill Match",
            desc: "Rule disabled in current configuration. Check bypassed.",
            badgeText: "SKIPPED",
            badgeClass: "badge--skip"
        });
    }

    // Step 2: Overtime Rule
    if (rulesState.overtime.active) {
        const ruleEval = scen.expectedRules.overtime;
        const isEscalate = ruleEval.pass === "escalate";
        const isPass = ruleEval.pass === true;
        steps.push({
            name: "Overtime Threshold Check",
            dotClass: isPass ? "flow-step__dot--pass" : isEscalate ? "flow-step__dot--escalate" : "flow-step__dot--fail",
            dotIcon: isPass ? "✓" : isEscalate ? "⚠️" : "✕",
            title: "Rule 2: Overtime Threshold",
            desc: ruleEval.desc,
            badgeText: isPass ? "PASSED" : isEscalate ? "ESCALATE TRIGGERED" : "FAILED",
            badgeClass: isPass ? "badge--pass" : isEscalate ? "badge--escalate" : "badge--fail"
        });
    } else {
        steps.push({
            name: "Overtime Threshold Check",
            dotClass: "flow-step__dot--skip",
            dotIcon: "—",
            title: "Rule 2: Overtime Threshold",
            desc: "Rule disabled in current configuration. Check bypassed.",
            badgeText: "SKIPPED",
            badgeClass: "badge--skip"
        });
    }

    // Step 3: Certificate Rule
    if (rulesState.cert.active) {
        const ruleEval = scen.expectedRules.cert;
        steps.push({
            name: "Certificate Validity Check",
            dotClass: ruleEval.pass ? "flow-step__dot--pass" : "flow-step__dot--fail",
            dotIcon: ruleEval.pass ? "✓" : "🛑",
            title: "Rule 3: Certificate Validity",
            desc: ruleEval.desc,
            badgeText: ruleEval.pass ? "PASSED" : "BLOCKED",
            badgeClass: ruleEval.pass ? "badge--pass" : "badge--fail"
        });
    } else {
        steps.push({
            name: "Certificate Validity Check",
            dotClass: "flow-step__dot--skip",
            dotIcon: "—",
            title: "Rule 3: Certificate Validity",
            desc: "Rule disabled in current configuration. Check bypassed.",
            badgeText: "SKIPPED",
            badgeClass: "badge--skip"
        });
    }

    // Render step shells
    flowContainer.innerHTML = `<div class="flow__steps">` + steps.map((s, idx) => `
        <div class="flow-step" id="flow-step-${idx}">
            <div class="flow-step__rail">
                <div class="flow-step__dot ${s.dotClass}">${s.dotIcon}</div>
                ${idx < steps.length - 1 ? `<div class="flow-step__line" id="flow-line-${idx}"></div>` : ""}
            </div>
            <div class="flow-step__content">
                <div class="flow-step__title">${s.title}</div>
                <div class="flow-step__desc">${s.desc}</div>
                <span class="flow-step__badge ${s.badgeClass}">${s.badgeText}</span>
            </div>
        </div>
    `).join("") + `</div>`;

    // Staggered reveal
    let delay = 200;
    steps.forEach((step, idx) => {
        setTimeout(() => {
            const el = document.getElementById(`flow-step-${idx}`);
            if (el) el.classList.add("visible");
            const line = document.getElementById(`flow-line-${idx - 1}`);
            if (line) line.classList.add("flow-step__line--pass");
        }, delay);
        delay += 420;
    });

    // Reveal final outcome
    setTimeout(() => {
        revealOutcome(scen);
        isSimRunning = false;
        if (runBtn) {
            runBtn.disabled = false;
            runBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2v12l10-6L4 2z" fill="currentColor"/></svg>
                Re-Run Rules Engine
            `;
        }
        if (statusBadge) {
            statusBadge.className = "card__badge chip--emerald";
            statusBadge.innerText = "Completed";
        }
    }, delay + 250);
}

function revealOutcome(scen) {
    const outcomeCard = document.getElementById("sim-outcome");
    if (!outcomeCard) return;

    const verdict = scen.verdict;
    const outcomeTypeClass = 
        verdict.type === "approved" ? "outcome--approved" :
        verdict.type === "blocked" ? "outcome--blocked" : "outcome--escalated";

    const outcomeIcon = 
        verdict.type === "approved" ? "✅" :
        verdict.type === "blocked" ? "🛑" : "⚠️";

    outcomeCard.className = `outcome show ${outcomeTypeClass}`;
    outcomeCard.innerHTML = `
        <div class="outcome__title">
            <span>${outcomeIcon}</span>
            <span>${verdict.title}</span>
        </div>
        <div class="outcome__desc">${verdict.desc}</div>
        <div class="outcome__meta">
            ${verdict.metrics.map(m => `
                <div class="outcome__meta-item">
                    <span class="outcome__meta-label">${m.label}:</span>
                    <span class="outcome__meta-value">${m.val}</span>
                    ${m.old ? `<span class="outcome__meta-old">Prev: ${m.old}</span>` : ""}
                </div>
            `).join("")}
        </div>
    `;

    // Scroll smoothly to outcome
    outcomeCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ==========================================
// 6. DASHBOARD TAB POPULATION
// ==========================================

function renderAccountsTable() {
    const tbody = document.getElementById("tbl-accounts");
    if (!tbody) return;

    tbody.innerHTML = accountsData.map(acc => {
        const healthClass = 
            acc.health === "healthy" ? "health--healthy" :
            acc.health === "at-risk" ? "health--at-risk" : "health--watch";

        const healthLabel = 
            acc.health === "healthy" ? "Healthy" :
            acc.health === "at-risk" ? "At Risk" : "Watchlist";

        const progressFillClass = 
            acc.approval >= 60 ? "table-progress__fill--good" :
            acc.approval >= 40 ? "table-progress__fill--mid" : "table-progress__fill--bad";

        return `
            <tr>
                <td class="text-medium">${acc.name}</td>
                <td>${acc.segment}</td>
                <td class="text-right">${acc.locs}</td>
                <td class="text-right text-medium">${acc.arr}</td>
                <td><span class="chip ${acc.health === 'at-risk' ? 'chip--rose' : 'chip--slate'}">${acc.renewal}</span></td>
                <td>
                    <div class="table-progress">
                        <div class="table-progress__bar">
                            <div class="table-progress__fill ${progressFillClass}" style="width: ${acc.approval}%"></div>
                        </div>
                        <span class="text-medium text-sm">${acc.approval}%</span>
                    </div>
                </td>
                <td class="text-right ${acc.mgrHrs > 5.0 ? 'text-danger text-medium' : ''}">${acc.mgrHrs}h</td>
                <td><span class="health ${healthClass}">${healthLabel}</span></td>
            </tr>
        `;
    }).join("");
}

function renderApprovalChart() {
    const chartContainer = document.getElementById("chart-approval");
    if (!chartContainer) return;

    chartContainer.innerHTML = `
        <div class="hbar">
            ${accountsData.map(acc => {
                const colorClass = 
                    acc.approval >= 60 ? "hbar__fill--emerald" :
                    acc.approval >= 40 ? "hbar__fill--amber" : "hbar__fill--rose";

                return `
                    <div class="hbar__row">
                        <div class="hbar__label" title="${acc.name} (${acc.segment})">${acc.name}</div>
                        <div class="hbar__track">
                            <div class="hbar__fill ${colorClass}" style="width: ${acc.approval}%">${acc.approval}%</div>
                        </div>
                        <span class="chip ${acc.health === 'at-risk' ? 'chip--rose' : 'chip--slate'}" style="font-size:10px">${acc.health}</span>
                    </div>
                `;
            }).join("")}
        </div>
        <div style="margin-top:14px; font-size:11px; color:var(--text-3); display:flex; justify-content:space-between; align-items:center;">
            <span>⚠️ Red bars (<40%) correlate 100% with ARR churn risk</span>
            <span style="color:var(--emerald); font-weight:600;">Benchmark: >60%</span>
        </div>
    `;
}

// ==========================================
// 7. IMPACT TAB POPULATION
// ==========================================

function renderImpactCards() {
    const grid = document.getElementById("impact-grid");
    if (!grid) return;

    grid.innerHTML = impactAccounts.map(acc => `
        <div class="impact-card">
            <div class="impact-card__header">
                <div>
                    <div class="impact-card__name">${acc.name}</div>
                    <div class="impact-card__arr">${acc.segment} · <strong style="color:var(--text-1)">${acc.arr}</strong></div>
                </div>
                <span class="chip chip--${acc.badgeColor}">${acc.badge}</span>
            </div>
            <div class="impact-card__body">
                ${acc.rows.map(r => `
                    <div class="ba-row">
                        <span class="ba-row__label">${r.label}</span>
                        <span class="ba-row__before">${r.before}</span>
                        <span class="ba-row__arrow">→</span>
                        <span class="ba-row__after">${r.after}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");
}
