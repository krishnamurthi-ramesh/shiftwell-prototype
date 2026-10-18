/**
 * Shiftwell — Rules-Based Auto-Approval Engine
 * Enterprise Controller & Policy Simulation Engine
 * Author: Krishna Murthi (HugoHub Candidate Submission)
 */

// ============================================================
// 1. CANONICAL AUDITED DATA PACK (Q3 2026 Shiftwell Portfolio)
// ============================================================

const portfolioAccounts = [
    { name: "UrbanMart", segment: "Retail", locs: 200, arr: "INR 110L", renewal: "Aug 2027", approval: 64, mgrHrs: 3.5, health: "healthy" },
    { name: "FreshBowl", segment: "Restaurants", locs: 120, arr: "INR 84L", renewal: "Jan 2027", approval: 38, mgrHrs: 6.5, health: "at-risk" },
    { name: "CarePoint Clinics", segment: "Healthcare", locs: 40, arr: "INR 60L", renewal: "Dec 2026", approval: 71, mgrHrs: 4.0, health: "at-risk" },
    { name: "QuickKart", segment: "Retail", locs: 90, arr: "INR 48L", renewal: "Jun 2027", approval: 67, mgrHrs: 3.0, health: "healthy" },
    { name: "Spice Route", segment: "Restaurants", locs: 60, arr: "INR 36L", renewal: "Mar 2027", approval: 41, mgrHrs: 6.0, health: "watch" },
    { name: "MedAxis Labs", segment: "Healthcare", locs: 25, arr: "INR 30L", renewal: "Feb 2027", approval: 80, mgrHrs: 2.5, health: "healthy" },
    { name: "FitZone", segment: "Other", locs: 50, arr: "INR 22L", renewal: "Oct 2026", approval: 35, mgrHrs: 5.5, health: "at-risk" },
    { name: "Brew & Co", segment: "Other", locs: 35, arr: "INR 18L", renewal: "Nov 2026", approval: 29, mgrHrs: 7.0, health: "at-risk" }
];

// Presets & Scenarios
const simulationScenarios = {
    "freshbowl-pass": {
        tenant: "freshbowl",
        account: "FreshBowl",
        accountTag: "Restaurants · 120 Locations",
        requester: {
            name: "Rahul Sharma",
            initials: "RS",
            role: "Line Cook (Grill & Sauté)",
            store: "Store #104 · Downtown Hub",
            hours: 36,
            certs: ["Station Certified: Hot Line", "FSSAI Level 2"]
        },
        acceptor: {
            name: "Arjun Verma",
            initials: "AV",
            role: "Line Cook (Grill & Sauté)",
            store: "Store #104 · Downtown Hub",
            hours: 32,
            certs: ["Station Certified: Hot Line", "FSSAI Level 2"]
        },
        shift: {
            date: "Saturday, Oct 24, 2026",
            time: "16:00 – 23:00 (7.0 hrs)",
            station: "Grill Station A",
            hourlyRate: "INR 210/hr",
            urgency: "Standard (3 days advance notice)"
        },
        ruleExpectations: {
            role: { pass: true, label: "Role & Station Match", desc: "Both cooks possess verified Station Certification for Hot Line & Grill." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Acceptor projected weekly hours: 32h + 7h = 39h (Threshold limit is 48h). 9h safety buffer." },
            cert: { pass: true, label: "Certificate Validity", desc: "FSSAI Food Handler registration active through Dec 2027 (420 days remaining)." }
        },
        verdict: {
            status: "approved",
            title: "Swap Auto-Approved in 142ms",
            desc: "The rules engine verified station qualifications, labor hour caps, and food safety credentials with zero human friction. Shift schedules updated in database.",
            code: "STATUS_AUTO_APPROVED",
            metrics: {
                latency: "142ms",
                managerLoad: "0 min (Daily summary only)",
                compliance: "100% Compliant"
            }
        }
    },
    "carepoint-fail": {
        tenant: "carepoint",
        account: "CarePoint Clinics",
        accountTag: "Healthcare · 40 Clinics",
        requester: {
            name: "Dr. Ananya Sen",
            initials: "AS",
            role: "Staff Nurse (ICU Inpatient)",
            store: "West Wing Clinic #03",
            hours: 34,
            certs: ["BLS Certified", "ACLS Advanced", "ICU Critical Care"]
        },
        acceptor: {
            name: "Kavita Nair",
            initials: "KN",
            role: "Junior Nurse (General Ward)",
            store: "East Wing Clinic #08",
            hours: 30,
            certs: ["BLS Lapsed (Expired 12d ago)", "Basic Nursing License"]
        },
        shift: {
            date: "Sunday, Oct 25, 2026",
            time: "20:00 – 08:00 (12.0 hrs Night Shift)",
            station: "Critical Care / ICU Ward",
            hourlyRate: "INR 420/hr",
            urgency: "Urgent (Tomorrow night)"
        },
        ruleExpectations: {
            role: { pass: true, label: "Role & Qualification", desc: "Staff nurse clinical matrix satisfied for inpatient shift." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Acceptor projected weekly hours: 30h + 12h = 42h (Within 48h statutory maximum)." },
            cert: { pass: false, label: "Certificate Validity — HARD BLOCK", desc: "Mandatory Basic Life Support (BLS) certification expired 12 days ago on Oct 5, 2026." }
        },
        verdict: {
            status: "blocked",
            title: "Swap Blocked: Mandatory Certificate Expired",
            desc: "CarePoint regulatory policy strictly prohibits uncertified personnel from ICU coverage. The swap is blocked to safeguard patient safety and eliminate regulatory fine exposure.",
            code: "ERR_BLS_CERTIFICATE_EXPIRED",
            metrics: {
                latency: "88ms",
                regulatoryFineAvoided: "INR 5,00,000",
                compliance: "Audit Violation Prevented"
            }
        }
    },
    "urbanmart-escalate": {
        tenant: "urbanmart",
        account: "UrbanMart",
        accountTag: "Retail · 200 Locations",
        requester: {
            name: "Sunil Mehra",
            initials: "SM",
            role: "Senior Cashier / Checkout Lead",
            store: "Hypermarket #14 · Whitefield",
            hours: 40,
            certs: ["POS Terminal Level 2", "Cash Handling L3"]
        },
        acceptor: {
            name: "Vikram Seth",
            initials: "VS",
            role: "Senior Cashier",
            store: "Hypermarket #14 · Whitefield",
            hours: 44,
            certs: ["POS Terminal Level 2", "Cash Handling L3"]
        },
        shift: {
            date: "Sunday, Oct 25, 2026",
            time: "10:00 – 19:00 (9.0 hrs)",
            station: "Express Checkout Registers 1-4",
            hourlyRate: "INR 180/hr (1.5x OT: INR 270/hr)",
            urgency: "Standard (48 hrs notice)"
        },
        ruleExpectations: {
            role: { pass: true, label: "Role & Skill Match", desc: "Both employees verified for high-velocity registers." },
            overtime: { pass: "escalate", label: "Overtime Threshold — BREACH (53h)", desc: "Acceptor current: 44h + 9h = 53h. Exceeds weekly statutory limit of 48h by 5.0 hours." },
            cert: { pass: true, label: "Certificate Validity", desc: "All retail and loss-prevention certifications current." }
        },
        verdict: {
            status: "escalated",
            title: "Escalated: Regional Manager Overtime Sign-Off",
            desc: "Swap pushes Vikram to 53 weekly hours (5 hours of overtime at 1.5x pay rate, projected INR 1,350 extra labor expense). Routed to Regional Operations Manager with 1-click authorization.",
            code: "WARN_OVERTIME_CAP_EXCEEDED",
            metrics: {
                latency: "115ms",
                projectedOtCost: "INR 1,350",
                escalationTarget: "Regional Manager Rajesh K."
            }
        }
    },
    "freshbowl-overtime": {
        tenant: "freshbowl",
        account: "FreshBowl",
        accountTag: "Restaurants · 120 Locations",
        requester: {
            name: "Pooja Hegde",
            initials: "PH",
            role: "Station Cook (Pantry & Salads)",
            store: "Store #18 · Whitefield",
            hours: 38,
            certs: ["Station Certified: Cold Prep", "FSSAI Level 1"]
        },
        acceptor: {
            name: "Dev Patel",
            initials: "DP",
            role: "Station Cook (Pantry & Salads)",
            store: "Store #18 · Whitefield",
            hours: 43,
            certs: ["Station Certified: Cold Prep", "FSSAI Level 1"]
        },
        shift: {
            date: "Friday, Oct 23, 2026",
            time: "15:00 – 22:00 (7.0 hrs)",
            station: "Cold Prep & Assembly Line",
            hourlyRate: "INR 190/hr",
            urgency: "Urgent (Same day)"
        },
        ruleExpectations: {
            role: { pass: true, label: "Role & Station Match", desc: "Both cooks verified for cold assembly station." },
            overtime: { pass: "escalate", label: "Overtime Threshold — 50h Total", desc: "Acceptor weekly total: 43h + 7h = 50h (2 hours over 48h standard cap)." },
            cert: { pass: true, label: "Certificate Validity", desc: "FSSAI active for both cooks." }
        },
        verdict: {
            status: "escalated",
            title: "Escalated: Location Store Manager Overtime Sign-Off",
            desc: "Swap involves a minor 2-hour overtime breach. Policy routes directly to Store Manager Rohit G. with single-click mobile authorization.",
            code: "WARN_STORE_MGR_OT_ESCALATION",
            metrics: {
                latency: "94ms",
                projectedOtCost: "INR 570",
                escalationTarget: "Store Manager Rohit G."
            }
        }
    },
    "carepoint-pass": {
        tenant: "carepoint",
        account: "CarePoint Clinics",
        accountTag: "Healthcare · 40 Clinics",
        requester: {
            name: "Meera Krishnan",
            initials: "MK",
            role: "Registered Nurse (ICU Ward)",
            store: "Indiranagar Clinic #01",
            hours: 32,
            certs: ["BLS Active (exp Dec 2027)", "Nursing Council Reg", "ACLS Cert"]
        },
        acceptor: {
            name: "Sanjay Rao",
            initials: "SR",
            role: "Registered Nurse (ICU Ward)",
            store: "Indiranagar Clinic #01",
            hours: 28,
            certs: ["BLS Active (exp Aug 2027)", "Nursing Council Reg", "ACLS Cert"]
        },
        shift: {
            date: "Tuesday, Oct 27, 2026",
            time: "07:00 – 15:00 (8.0 hrs)",
            station: "ICU Ward Beds 1-6",
            hourlyRate: "INR 400/hr",
            urgency: "Planned (5 days ahead)"
        },
        ruleExpectations: {
            role: { pass: true, label: "Role & Qualification", desc: "Both nurses hold verified ICU specialization credentials." },
            overtime: { pass: true, label: "Overtime Threshold", desc: "Acceptor weekly hours: 28h + 8h = 36h (12 hours buffer under 48h cap)." },
            cert: { pass: true, label: "Certificate Validity", desc: "All BLS, ACLS, and Nursing Council credentials fully active and verified." }
        },
        verdict: {
            status: "approved",
            title: "Healthcare Swap Auto-Approved in 178ms",
            desc: "Strict clinical qualifications, healthcare credentials, and staff fatigue rest limits fully satisfied without human delay.",
            code: "STATUS_HEALTHCARE_AUTO_APPROVED",
            metrics: {
                latency: "178ms",
                managerLoad: "0 min (Logged to compliance ledger)",
                compliance: "100% Certified"
            }
        }
    }
};

// Impact Data Pack
const accountImpactMatrix = [
    {
        name: "FreshBowl",
        segment: "Restaurants (120 locations)",
        arr: "INR 84L ARR",
        risk: "At Risk (Jan 2027 Renewal)",
        badge: "Highest ARR At Risk",
        badgeColor: "rose",
        rows: [
            { label: "Swap Approval <24h", before: "38%", after: "82% (+44%)" },
            { label: "Manager Scheduling Load", before: "6.5 hrs/wk", after: "1.8 hrs/wk (-72%)" },
            { label: "Frontline Shift Dropouts", before: "18.5%", after: "2.8% (-85%)" },
            { label: "Renewal ARR Secured", before: "Imminent Churn", after: "INR 84L Retained" }
        ]
    },
    {
        name: "CarePoint Clinics",
        segment: "Healthcare (40 clinics)",
        arr: "INR 60L ARR",
        risk: "At Risk (Dec 2026 Renewal)",
        badge: "Regulatory Risk",
        badgeColor: "rose",
        rows: [
            { label: "Swap Approval <24h", before: "71%", after: "88% (+17%)" },
            { label: "Expired Cert Shifts", before: "2 shifts flagged", after: "0 (Engine hard-blocked)" },
            { label: "Audit Fine Liability", before: "Severe Exposure", after: "INR 0 Exposure" },
            { label: "Renewal ARR Secured", before: "Non-Renewal Stance", after: "INR 60L Retained" }
        ]
    },
    {
        name: "UrbanMart",
        segment: "Retail (200 locations)",
        arr: "INR 110L ARR",
        risk: "Healthy (Aug 2027 Renewal)",
        badge: "Largest Account",
        badgeColor: "blue",
        rows: [
            { label: "Overtime Hours Enforced", before: "Untracked until payroll", after: "Strict 48h cap with sign-off" },
            { label: "Regional Manager Visibility", before: "Fragmented emails", after: "1-Click cost-projection alert" },
            { label: "Retention Runway", before: "VP HR considering options", after: "Secured through Aug 2027" },
            { label: "Portfolio Status", before: "Flagship Account", after: "Expansion Anchor" }
        ]
    }
];

// Active State
let activeRules = {
    role: { active: true, match: "skill", action: "send_to_manager" },
    overtime: { active: true, maxHours: 48, escalate: "regional" },
    cert: { active: true, scope: "all", warnDays: 30 },
    auto: { active: true, notify: "digest", audit: "full" }
};

let currentScenarioData = null;
let currentOutcomeVerdict = null;
let isExecuting = false;

// ============================================================
// 2. INITIALIZATION & NAVIGATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderAccountsTable("all");
    renderApprovalChart();
    renderImpactCards();
    loadScenario();
});

function switchTab(target) {
    const tabs = document.querySelectorAll(".app-nav__tab");
    const panels = document.querySelectorAll(".panel");

    tabs.forEach(t => {
        t.classList.remove("active");
        t.removeAttribute("aria-current");
    });
    panels.forEach(p => p.classList.remove("active"));

    const activeTab = document.getElementById(`tab-btn-${target}`) || Array.from(tabs).find(t => t.getAttribute("data-tab") === target);
    if (activeTab) {
        activeTab.classList.add("active");
        activeTab.setAttribute("aria-current", "page");
    }

    const activePanel = document.getElementById(`panel-${target}`);
    if (activePanel) {
        activePanel.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function initNavigation() {
    const tabs = document.querySelectorAll(".app-nav__tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");
            switchTab(target);
        });
    });
}

// ============================================================
// 3. TENANT CONTEXT SWITCHER
// ============================================================

function handleTenantChange(tenantKey) {
    const scenarioSelect = document.getElementById("scenario-select");
    
    if (tenantKey === "freshbowl") {
        activeRules.role.match = "skill";
        activeRules.role.action = "send_to_manager";
        activeRules.overtime.maxHours = 48;
        activeRules.cert.scope = "all";
        if (scenarioSelect) scenarioSelect.value = "freshbowl-pass";
        showToast("Switched Tenant: FreshBowl · Applied Restaurant Station Policy");
    } else if (tenantKey === "carepoint") {
        activeRules.role.match = "role";
        activeRules.overtime.maxHours = 48;
        activeRules.cert.scope = "all";
        activeRules.cert.warnDays = 30;
        if (scenarioSelect) scenarioSelect.value = "carepoint-fail";
        showToast("Switched Tenant: CarePoint Clinics · Applied Strict Clinical Credential Policy");
    } else if (tenantKey === "urbanmart") {
        activeRules.role.match = "role";
        activeRules.overtime.maxHours = 48;
        activeRules.overtime.escalate = "regional";
        if (scenarioSelect) scenarioSelect.value = "urbanmart-escalate";
        showToast("Switched Tenant: UrbanMart · Applied 48h Overtime Cap & Regional Escalation");
    } else if (tenantKey === "fitzone" || tenantKey === "brewco") {
        activeRules.overtime.maxHours = 48;
        if (scenarioSelect) scenarioSelect.value = "freshbowl-pass";
        showToast("Switched Tenant: " + tenantKey.toUpperCase() + " · Loaded Account Profile");
    } else {
        resetRules();
        if (scenarioSelect) scenarioSelect.value = "freshbowl-pass";
        showToast("Switched to Global Enterprise Policy Default");
    }

    syncRulesUi();
    loadScenario();
}

function syncRulesUi() {
    const chkRole = document.getElementById("chk-rule-role");
    const chkOt = document.getElementById("chk-rule-overtime");
    const chkCert = document.getElementById("chk-rule-cert");
    const chkAuto = document.getElementById("chk-rule-auto");

    if (chkRole) chkRole.checked = activeRules.role.active;
    if (chkOt) chkOt.checked = activeRules.overtime.active;
    if (chkCert) chkCert.checked = activeRules.cert.active;
    if (chkAuto) chkAuto.checked = activeRules.auto.active;

    const optMatch = document.getElementById("cfg-role-match");
    if (optMatch) optMatch.value = activeRules.role.match;
    const optHours = document.getElementById("cfg-ot-hours");
    if (optHours) optHours.value = activeRules.overtime.maxHours;
    const optEscalate = document.getElementById("cfg-ot-escalate");
    if (optEscalate) optEscalate.value = activeRules.overtime.escalate;
    const optCertScope = document.getElementById("cfg-cert-scope");
    if (optCertScope) optCertScope.value = activeRules.cert.scope;

    ["role", "overtime", "cert", "auto"].forEach(key => {
        const box = document.getElementById(`rule-${key}`);
        const stage = document.getElementById(`pipe-${key}`);
        if (activeRules[key].active) {
            if (box) box.classList.remove("rule-box--disabled");
            if (stage) stage.classList.remove("pipeline-stage--disabled");
        } else {
            if (box) box.classList.add("rule-box--disabled");
            if (stage) stage.classList.add("pipeline-stage--disabled");
        }
    });
}

// ============================================================
// 4. RULES MANAGEMENT
// ============================================================

function handleRuleToggle(ruleKey, checked) {
    if (!activeRules[ruleKey]) return;
    activeRules[ruleKey].active = checked;

    const box = document.getElementById(`rule-${ruleKey}`);
    const stage = document.getElementById(`pipe-${ruleKey}`);

    if (checked) {
        if (box) box.classList.remove("rule-box--disabled");
        if (stage) stage.classList.remove("pipeline-stage--disabled");
    } else {
        if (box) box.classList.add("rule-box--disabled");
        if (stage) stage.classList.add("pipeline-stage--disabled");
    }

    showToast(`Rule ${ruleKey.toUpperCase()} ${checked ? "Enabled" : "Disabled"}`);
}

function saveRules() {
    activeRules.role.match = document.getElementById("cfg-role-match")?.value || "skill";
    activeRules.role.action = document.getElementById("cfg-role-action")?.value || "send_to_manager";
    activeRules.overtime.maxHours = parseInt(document.getElementById("cfg-ot-hours")?.value || "48", 10);
    activeRules.overtime.escalate = document.getElementById("cfg-ot-escalate")?.value || "regional";
    activeRules.cert.scope = document.getElementById("cfg-cert-scope")?.value || "all";
    activeRules.cert.warnDays = parseInt(document.getElementById("cfg-cert-warn")?.value || "30", 10);
    activeRules.auto.notify = document.getElementById("cfg-auto-notify")?.value || "digest";
    activeRules.auto.audit = document.getElementById("cfg-auto-audit")?.value || "full";

    showToast("Active policy updated and verified!");
}

function resetRules() {
    activeRules = {
        role: { active: true, match: "skill", action: "send_to_manager" },
        overtime: { active: true, maxHours: 48, escalate: "regional" },
        cert: { active: true, scope: "all", warnDays: 30 },
        auto: { active: true, notify: "digest", audit: "full" }
    };
    syncRulesUi();
    showToast("Policy reset to factory enterprise defaults");
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.innerText = msg;
    toast.classList.add("show");
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

// ============================================================
// 5. SIMULATION LOGIC
// ============================================================

function loadScenario() {
    if (isExecuting) return;
    const select = document.getElementById("scenario-select");
    if (!select) return;

    const val = select.value;
    const customControls = document.getElementById("custom-sandbox-controls");

    if (val === "custom") {
        if (customControls) customControls.style.display = "block";
        loadCustomScenario();
        return;
    } else {
        if (customControls) customControls.style.display = "none";
    }

    const scen = simulationScenarios[val];
    if (!scen) return;
    currentScenarioData = scen;

    // Set Tenant Tag
    const tag = document.getElementById("sim-account-tag");
    if (tag) tag.innerText = scen.accountTag;

    // Render Participants
    const participantsContainer = document.getElementById("sim-participants");
    if (participantsContainer) {
        participantsContainer.innerHTML = `
            <div class="participant-block">
                <div class="participant-avatar">${scen.requester.initials}</div>
                <div class="participant-details">
                    <div class="participant-details__head">
                        <span class="participant-details__name">${scen.requester.name}</span>
                        <span class="mono-badge">REQUESTER</span>
                    </div>
                    <div class="participant-details__role">${scen.requester.role} · ${scen.requester.store}</div>
                    <div class="participant-chips">
                        <span class="chip chip--amber">Current: ${scen.requester.hours} hrs/wk</span>
                        ${scen.requester.certs.map(c => `<span class="chip chip--emerald">${c}</span>`).join("")}
                    </div>
                </div>
            </div>

            <div class="swap-connector">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4-4 4 4M12 10l-4 4-4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>REQUESTING SWAP WITH</span>
            </div>

            <div class="participant-block">
                <div class="participant-avatar">${scen.acceptor.initials}</div>
                <div class="participant-details">
                    <div class="participant-details__head">
                        <span class="participant-details__name">${scen.acceptor.name}</span>
                        <span class="mono-badge">CANDIDATE</span>
                    </div>
                    <div class="participant-details__role">${scen.acceptor.role} · ${scen.acceptor.store}</div>
                    <div class="participant-chips">
                        <span class="chip chip--amber">Current: ${scen.acceptor.hours} hrs/wk</span>
                        ${scen.acceptor.certs.map(c => {
                            const isBad = c.toLowerCase().includes("lapsed") || c.toLowerCase().includes("expired");
                            return `<span class="chip ${isBad ? "chip--rose" : "chip--emerald"}">${c}</span>`;
                        }).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    // Render Shift Details
    const shiftContainer = document.getElementById("sim-shift-details");
    if (shiftContainer) {
        shiftContainer.innerHTML = `
            <div class="param-table">
                <div class="param-row">
                    <span class="param-row__label">Target Date:</span>
                    <span class="param-row__val">${scen.shift.date}</span>
                </div>
                <div class="param-row">
                    <span class="param-row__label">Shift Hours:</span>
                    <span class="param-row__val mono">${scen.shift.time}</span>
                </div>
                <div class="param-row">
                    <span class="param-row__label">Station / Role:</span>
                    <span class="param-row__val">${scen.shift.station}</span>
                </div>
                <div class="param-row">
                    <span class="param-row__label">Base Rate:</span>
                    <span class="param-row__val mono">${scen.shift.hourlyRate}</span>
                </div>
                <div class="param-row">
                    <span class="param-row__label">Advance Notice:</span>
                    <span class="param-row__val">${scen.shift.urgency}</span>
                </div>
            </div>
        `;
    }

    // Reset right side
    resetTraceUi();
}

function loadCustomScenario() {
    const segment = document.getElementById("custom-segment")?.value || "restaurant";
    const roleMatch = document.getElementById("custom-role-match")?.value === "true";
    const hours = parseInt(document.getElementById("custom-hours")?.value || "38", 10);
    const certValid = document.getElementById("custom-cert-status")?.value === "valid";

    const customScen = {
        tenant: "custom",
        account: segment === "healthcare" ? "CarePoint Clinics" : segment === "retail" ? "UrbanMart" : "FreshBowl",
        accountTag: "Custom Interactive Sandbox Tester",
        requester: {
            name: "Custom Requester",
            initials: "CR",
            role: segment === "healthcare" ? "Staff Nurse" : "Station Lead",
            store: "Location #01",
            hours: 32,
            certs: [segment === "healthcare" ? "BLS Active" : "Level 2 Certified"]
        },
        acceptor: {
            name: "Custom Candidate",
            initials: "CC",
            role: roleMatch ? (segment === "healthcare" ? "Staff Nurse" : "Station Lead") : "General Floater (Uncertified)",
            store: "Location #01",
            hours: hours,
            certs: [certValid ? "Active Verified Credential" : "Credential Lapsed / Expired"]
        },
        shift: {
            date: "Tomorrow",
            time: "08:00 – 16:00 (8.0 hrs)",
            station: segment === "healthcare" ? "Clinical Unit" : "Service Station",
            hourlyRate: "Standard Tier",
            urgency: "Test Execution"
        },
        ruleExpectations: {
            role: {
                pass: roleMatch,
                label: "Role & Station Match",
                desc: roleMatch ? "Candidate qualifications verified for target shift." : "Candidate lacks station certification for this shift."
            },
            overtime: {
                pass: (hours + 8) > activeRules.overtime.maxHours ? "escalate" : true,
                label: "Overtime Threshold",
                desc: `Projected hours: ${hours}h + 8h = ${hours + 8}h (Active Cap: ${activeRules.overtime.maxHours}h).`
            },
            cert: {
                pass: certValid,
                label: "Certificate Validity",
                desc: certValid ? "All mandatory credentials active." : "Critical certificate expired; non-compliant coverage."
            }
        },
        verdict: null
    };

    // Calculate dynamic verdict
    if (activeRules.cert.active && !certValid) {
        customScen.verdict = {
            status: "blocked",
            title: "Swap Hard-Blocked: Expired Certificate",
            desc: "The candidate's mandatory credential is expired. Shift blocked by regulatory compliance rule.",
            code: "ERR_CUSTOM_CERT_EXPIRED",
            metrics: { latency: "92ms", compliance: "Blocked Violation", managerLoad: "Zero Action" }
        };
    } else if (activeRules.overtime.active && (hours + 8) > activeRules.overtime.maxHours) {
        customScen.verdict = {
            status: "escalated",
            title: "Swap Escalated: Overtime Cap Breached",
            desc: `Projected total of ${hours + 8} hours exceeds weekly cap of ${activeRules.overtime.maxHours}h. Routed to ${activeRules.overtime.escalate} manager.`,
            code: "WARN_CUSTOM_OVERTIME_CAP",
            metrics: { latency: "110ms", compliance: "Escalated to Manager", overtimeHours: `${(hours + 8) - activeRules.overtime.maxHours}h over cap` }
        };
    } else if (activeRules.role.active && !roleMatch) {
        customScen.verdict = {
            status: "escalated",
            title: "Swap Escalated: Qualification Mismatch",
            desc: "Candidate lacks verified station training. Routed to store manager for manual discretion.",
            code: "WARN_CUSTOM_SKILL_MISMATCH",
            metrics: { latency: "128ms", compliance: "Manual Approval Required", managerLoad: "Store Manager Review" }
        };
    } else {
        customScen.verdict = {
            status: "approved",
            title: "Swap Auto-Approved in 148ms",
            desc: "All active rules passed. Shift swap confirmed with zero human latency.",
            code: "STATUS_CUSTOM_AUTO_APPROVED",
            metrics: { latency: "148ms", compliance: "100% Verified", managerLoad: "Zero Action" }
        };
    }

    currentScenarioData = customScen;

    // Render Participants
    const participantsContainer = document.getElementById("sim-participants");
    if (participantsContainer) {
        participantsContainer.innerHTML = `
            <div class="participant-block">
                <div class="participant-avatar">CR</div>
                <div class="participant-details">
                    <div class="participant-details__head">
                        <span class="participant-details__name">Custom Requester</span>
                        <span class="mono-badge">REQUESTER</span>
                    </div>
                    <div class="participant-details__role">${customScen.requester.role}</div>
                </div>
            </div>
            <div class="swap-connector">
                <span>SWAPPING WITH</span>
            </div>
            <div class="participant-block">
                <div class="participant-avatar">CC</div>
                <div class="participant-details">
                    <div class="participant-details__head">
                        <span class="participant-details__name">Custom Candidate</span>
                        <span class="mono-badge">CANDIDATE</span>
                    </div>
                    <div class="participant-details__role">${customScen.acceptor.role}</div>
                    <div class="participant-chips">
                        <span class="chip ${hours > 40 ? 'chip--amber' : 'chip--emerald'}">Hours: ${hours}h</span>
                        <span class="chip ${certValid ? 'chip--emerald' : 'chip--rose'}">${certValid ? 'Cert Valid' : 'Cert Lapsed'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    resetTraceUi();
}

function resetTraceUi() {
    const flowContainer = document.getElementById("sim-flow-container");
    if (flowContainer) {
        flowContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="#334155" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div class="empty-state__text">Click <strong>"Execute Engine Pipeline"</strong> to evaluate this swap against active policy rules.</div>
            </div>
        `;
    }

    const outcomePanel = document.getElementById("sim-outcome-panel");
    if (outcomePanel) outcomePanel.style.display = "none";

    const statusBadge = document.getElementById("sim-status-badge");
    if (statusBadge) {
        statusBadge.className = "trace-badge";
        statusBadge.innerText = "AWAITING EXECUTION";
    }

    const latencyPill = document.getElementById("sim-latency-pill");
    if (latencyPill) latencyPill.innerHTML = `<span class="mono-badge">TRACE: READY</span>`;
}

function executeSimulation() {
    if (isExecuting) return;
    const select = document.getElementById("scenario-select");
    if (select.value === "custom") loadCustomScenario();

    const scen = currentScenarioData;
    if (!scen) return;

    isExecuting = true;
    const runBtn = document.getElementById("btn-run-sim");
    const runBtnBottom = document.getElementById("btn-run-sim-bottom");
    const statusBadge = document.getElementById("sim-status-badge");
    const latencyPill = document.getElementById("sim-latency-pill");
    const flowContainer = document.getElementById("sim-flow-container");
    const outcomePanel = document.getElementById("sim-outcome-panel");

    [runBtn, runBtnBottom].forEach(b => {
        if (b) {
            b.disabled = true;
            b.innerHTML = `Evaluating Policy Pipeline...`;
        }
    });

    if (statusBadge) {
        statusBadge.className = "trace-badge trace-badge--running";
        statusBadge.innerText = "EXECUTING PIPELINE";
    }

    if (outcomePanel) outcomePanel.style.display = "none";

    // Build Execution Steps
    const steps = [];

    // Step 0: Ingestion
    steps.push({
        name: "INGESTION & PRE-VALIDATION",
        ms: "14ms",
        iconClass: "exec-step__icon--ingress",
        icon: "OK",
        title: "Swap Request Ingested & Schema Validated",
        desc: `Received bilateral shift swap payload for ${scen.account}. Validated staff IDs and cryptographic timestamp.`
    });

    // Step 1: Role Match Rule
    if (activeRules.role.active) {
        const pass = scen.ruleExpectations.role.pass;
        steps.push({
            name: "RULE-01-ROLE-MATCH",
            ms: "28ms",
            iconClass: pass ? "exec-step__icon--pass" : "exec-step__icon--warn",
            icon: pass ? "✓" : "!",
            title: "Rule 1: Role & Station Qualification Check",
            desc: scen.ruleExpectations.role.desc
        });
    }

    // Step 2: Overtime Rule
    if (activeRules.overtime.active) {
        const pass = scen.ruleExpectations.overtime.pass;
        const isEscalate = pass === "escalate";
        steps.push({
            name: "RULE-02-OVERTIME-CAP",
            ms: "42ms",
            iconClass: pass === true ? "exec-step__icon--pass" : "exec-step__icon--warn",
            icon: pass === true ? "✓" : "!",
            title: "Rule 2: Cumulative Weekly Hours Check",
            desc: scen.ruleExpectations.overtime.desc
        });
    }

    // Step 3: Certificate Rule
    if (activeRules.cert.active) {
        const pass = scen.ruleExpectations.cert.pass;
        steps.push({
            name: "RULE-03-CERT-VALIDITY",
            ms: "36ms",
            iconClass: pass ? "exec-step__icon--pass" : "exec-step__icon--fail",
            icon: pass ? "✓" : "✕",
            title: "Rule 3: Clinical & Regulatory Credential Check",
            desc: scen.ruleExpectations.cert.desc
        });
    }

    // Render Steps
    flowContainer.innerHTML = `<div class="execution-log">` + steps.map((s, idx) => `
        <div class="exec-step" id="step-${idx}">
            <div class="exec-step__icon ${s.iconClass}">${s.icon}</div>
            <div class="exec-step__content">
                <div class="exec-step__top">
                    <span class="exec-step__title">${s.title}</span>
                    <span class="exec-step__ms mono">${s.ms}</span>
                </div>
                <div class="exec-step__desc">${s.desc}</div>
            </div>
        </div>
    `).join("") + `</div>`;

    // Staggered reveal
    let delay = 180;
    steps.forEach((step, idx) => {
        setTimeout(() => {
            const el = document.getElementById(`step-${idx}`);
            if (el) el.classList.add("visible");
        }, delay);
        delay += 380;
    });

    // Final outcome reveal
    setTimeout(() => {
        isExecuting = false;
        [runBtn, runBtnBottom].forEach(b => {
            if (b) {
                b.disabled = false;
                b.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5v11l9-5.5-9-5.5z" fill="currentColor"/></svg>
                    Re-Execute Engine Pipeline
                `;
            }
        });
        if (statusBadge) {
            statusBadge.className = "trace-badge trace-badge--done";
            statusBadge.innerText = "EXECUTION COMPLETE";
        }
        if (latencyPill) {
            latencyPill.innerHTML = `<span class="mono-badge">TOTAL LATENCY: ${scen.verdict.metrics.latency}</span>`;
        }

        currentOutcomeVerdict = scen.verdict;
        renderOutcomePanel(scen);
    }, delay + 200);
}

function renderOutcomePanel(scen) {
    const outcomePanel = document.getElementById("sim-outcome-panel");
    if (!outcomePanel) return;
    outcomePanel.style.display = "block";
    switchOutcomeTab("verdict");
    outcomePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function switchOutcomeTab(tabName) {
    const tabs = document.querySelectorAll(".outcome-tab");
    tabs.forEach(t => t.classList.remove("active"));
    const activeTabBtn = Array.from(tabs).find(t => t.getAttribute("onclick").includes(tabName));
    if (activeTabBtn) activeTabBtn.classList.add("active");

    const content = document.getElementById("outcome-content");
    if (!content || !currentScenarioData) return;

    const scen = currentScenarioData;
    const v = scen.verdict;

    if (tabName === "verdict") {
        const bannerClass = 
            v.status === "approved" ? "verdict-banner--approved" :
            v.status === "blocked" ? "verdict-banner--blocked" : "verdict-banner--escalated";

        content.innerHTML = `
            <div class="verdict-banner ${bannerClass}">
                <div class="verdict-banner__title">${v.title}</div>
                <div class="verdict-banner__desc">${v.desc}</div>
            </div>
            <div class="verdict-metrics-row">
                <div class="verdict-stat">
                    <span class="verdict-stat__label">POLICY DECISION CODE</span>
                    <span class="verdict-stat__value mono" style="font-size:12px;">${v.code}</span>
                </div>
                <div class="verdict-stat">
                    <span class="verdict-stat__label">EXECUTION LATENCY</span>
                    <span class="verdict-stat__value mono">${v.metrics.latency} (p95)</span>
                </div>
                <div class="verdict-stat">
                    <span class="verdict-stat__label">MANAGER ADMINISTRATIVE LOAD</span>
                    <span class="verdict-stat__value">${v.metrics.managerLoad || "Escalated for Action"}</span>
                </div>
            </div>
        `;
    } else if (tabName === "frontline") {
        content.innerHTML = `
            <div class="mobile-frame">
                <div class="mobile-notch"></div>
                <div class="mobile-card">
                    <div class="mobile-header">
                        <span>SHIFTWELL MOBILE</span>
                        <span class="mono">JUST NOW</span>
                    </div>
                    ${v.status === "approved" ? `
                        <div class="mobile-badge-pass">AUTO-APPROVED (INSTANT)</div>
                        <div class="mobile-shift-title">Shift Swap Confirmed!</div>
                        <div class="mobile-shift-time">${scen.shift.date} · ${scen.shift.time}</div>
                        <p style="font-size:12px; color:#cbd5e1; line-height:1.4;">
                            Your shift swap with <strong>${scen.acceptor.name}</strong> was validated by Shiftwell's Rules Engine in <strong style="color:#10b981">${v.metrics.latency}</strong>. Your roster has been updated automatically.
                        </p>
                    ` : v.status === "blocked" ? `
                        <div class="mobile-badge-pass" style="background:rgba(239,68,68,0.2); color:#ef4444;">SWAP BLOCKED</div>
                        <div class="mobile-shift-title">Regulatory Compliance Block</div>
                        <div class="mobile-shift-time">${scen.shift.date} · ${scen.shift.time}</div>
                        <p style="font-size:12px; color:#cbd5e1; line-height:1.4;">
                            Cannot complete swap. <strong>${scen.acceptor.name}</strong> has a lapsed credential (${scen.acceptor.certs[0]}). Please select another qualified colleague.
                        </p>
                    ` : `
                        <div class="mobile-badge-pass" style="background:rgba(245,158,11,0.2); color:#f59e0b;">SUBMITTED FOR SIGN-OFF</div>
                        <div class="mobile-shift-title">Routed for Manager Approval</div>
                        <div class="mobile-shift-time">${scen.shift.date} · ${scen.shift.time}</div>
                        <p style="font-size:12px; color:#cbd5e1; line-height:1.4;">
                            This swap causes overtime hours. Automatically routed to your Operations Manager with instant push notification.
                        </p>
                    `}
                </div>
            </div>
        `;
    } else if (tabName === "manager") {
        if (v.status === "approved") {
            content.innerHTML = `
                <div class="escalation-box">
                    <div class="escalation-head">
                        <span style="font-size:13px; font-weight:700; color:var(--emerald);">Zero Store Manager Touchpoint Required</span>
                        <span class="mono-badge">DAILY DIGEST EMAIL</span>
                    </div>
                    <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">
                        This routine bilateral swap passed all station qualification, overtime, and credential criteria. The Store Manager was <strong>not interrupted</strong> with alerts or messages. A summary will appear in the 11:00 PM automated digest email.
                    </p>
                </div>
            `;
        } else if (v.status === "blocked") {
            content.innerHTML = `
                <div class="escalation-box">
                    <div class="escalation-head">
                        <span style="font-size:13px; font-weight:700; color:var(--rose);">Automated Regulatory Safeguard Activated</span>
                        <span class="mono-badge">AUDIT PROTECTED</span>
                    </div>
                    <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">
                        The engine intercepted an uncredentialed coverage attempt before it reached hospital wards. Clinic supervisors are spared audit liability, and an automated SMS has been dispatched to <strong>${scen.acceptor.name}</strong> with a direct renewal link for their BLS license.
                    </p>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div class="escalation-box">
                    <div class="escalation-head">
                        <span style="font-size:13px; font-weight:700; color:var(--amber);">High-Overtime Exception Action Required</span>
                        <span class="mono-badge">REGIONAL DESK</span>
                    </div>
                    <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:12px;">
                        <strong>Vikram Seth</strong> will reach <strong>53 weekly hours</strong> (+5.0h OT at 1.5x pay rate, projected extra expense: <strong>INR 1,350</strong>).
                    </p>
                    <div class="escalation-actions">
                        <button class="btn btn--primary" style="background:#059669; border-color:#10b981;" onclick="showToast('Overtime Authorized by Regional Desk')">Authorize Overtime (1-Click)</button>
                        <button class="btn btn--subtle" onclick="showToast('Swap Declined: Routed to Standby Staff')">Decline &amp; Route to Standby</button>
                    </div>
                </div>
            `;
        }
    } else if (tabName === "audit") {
        const auditLogPayload = {
            trace_id: "trc_" + Math.random().toString(36).substring(2, 10),
            timestamp: new Date().toISOString(),
            tenant_id: scen.tenant,
            account_name: scen.account,
            event_type: "SHIFT_SWAP_EVALUATION",
            policy_version: "2.4.0",
            participants: {
                requester: { id: "usr_8192", name: scen.requester.name, current_hours: scen.requester.hours },
                candidate: { id: "usr_4031", name: scen.acceptor.name, current_hours: scen.acceptor.hours }
            },
            pipeline_results: {
                rule_01_role_match: { enabled: activeRules.role.active, status: scen.ruleExpectations.role.pass ? "PASS" : "FAIL" },
                rule_02_overtime_cap: { enabled: activeRules.overtime.active, max_hours: activeRules.overtime.maxHours, status: scen.ruleExpectations.overtime.pass === true ? "PASS" : "ESCALATE" },
                rule_03_cert_validity: { enabled: activeRules.cert.active, status: scen.ruleExpectations.cert.pass ? "PASS" : "FAIL" }
            },
            final_resolution: {
                decision: v.status.toUpperCase(),
                decision_code: v.code,
                execution_latency_ms: parseInt(v.metrics.latency, 10) || 140,
                manager_action: v.status === "approved" ? "DIGEST_ONLY" : "INTERVENTION_REQUIRED"
            }
        };

        content.innerHTML = `
            <div class="json-viewer"><pre>${JSON.stringify(auditLogPayload, null, 2)}</pre></div>
        `;
    }
}

// ============================================================
// 6. DASHBOARD TAB POPULATION
// ============================================================

function filterAccounts(segment) {
    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach(p => p.classList.remove("active"));
    const activePill = Array.from(pills).find(p => p.getAttribute("onclick").includes(segment));
    if (activePill) activePill.classList.add("active");

    renderAccountsTable(segment);
}

function renderAccountsTable(segmentFilter) {
    const tbody = document.getElementById("tbl-accounts-body");
    if (!tbody) return;

    const filtered = segmentFilter === "all" 
        ? portfolioAccounts 
        : portfolioAccounts.filter(a => a.segment === segmentFilter);

    tbody.innerHTML = filtered.map(acc => {
        const fillClass = acc.approval >= 60 ? "bar-progress__fill--good" : acc.approval >= 40 ? "bar-progress__fill--mid" : "bar-progress__fill--bad";
        const statusClass = acc.health === "healthy" ? "status-pill--healthy" : acc.health === "at-risk" ? "status-pill--risk" : "status-pill--watch";
        const statusText = acc.health === "healthy" ? "Healthy" : acc.health === "at-risk" ? "At Risk" : "Watchlist";

        return `
            <tr>
                <td style="font-weight:700;">${acc.name}</td>
                <td>${acc.segment}</td>
                <td class="text-right mono">${acc.locs}</td>
                <td class="text-right mono" style="font-weight:700;">${acc.arr}</td>
                <td><span class="sys-tag sys-tag--neutral mono">${acc.renewal}</span></td>
                <td>
                    <div class="bar-progress">
                        <div class="bar-progress__track">
                            <div class="bar-progress__fill ${fillClass}" style="width: ${acc.approval}%"></div>
                        </div>
                        <span class="mono" style="font-weight:700; font-size:12px;">${acc.approval}%</span>
                    </div>
                </td>
                <td class="text-right mono ${acc.mgrHrs >= 5.5 ? 'text-danger' : ''}">${acc.mgrHrs}h</td>
                <td><span class="status-pill ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    }).join("");
}

function renderApprovalChart() {
    const container = document.getElementById("approval-chart-container");
    if (!container) return;

    container.innerHTML = `
        <div class="hbar-chart">
            ${portfolioAccounts.map(acc => {
                const fillBg = acc.approval >= 60 ? "#059669" : acc.approval >= 40 ? "#d97706" : "#dc2626";
                return `
                    <div class="hbar-item">
                        <span class="hbar-label">${acc.name} (${acc.approval}%)</span>
                        <div class="hbar-track">
                            <div class="hbar-fill" style="width: ${acc.approval}%; background: ${fillBg};">
                                ${acc.approval}%
                            </div>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
        <div style="margin-top:14px; font-size:12px; color:var(--text-muted); display:flex; justify-content:space-between;">
            <span><strong style="color:var(--rose);">Under 35% Approval:</strong> 100% Churn Correlation</span>
            <span><strong style="color:var(--emerald);">Healthy Benchmark:</strong> &gt; 60%</span>
        </div>
    `;
}

// ============================================================
// 7. STRATEGIC IMPACT TAB POPULATION
// ============================================================

function renderImpactCards() {
    const container = document.getElementById("impact-cards-container");
    if (!container) return;

    container.innerHTML = accountImpactMatrix.map(item => `
        <div class="impact-card">
            <div class="impact-card__header">
                <div>
                    <div class="impact-card__name">${item.name}</div>
                    <div class="impact-card__arr">${item.segment} · <strong style="color:var(--text-primary);">${item.arr}</strong></div>
                </div>
                <span class="sys-tag sys-tag--${item.badgeColor}">${item.badge}</span>
            </div>
            <div class="impact-card__body">
                ${item.rows.map(r => `
                    <div class="impact-row">
                        <span class="impact-row__label">${r.label}:</span>
                        <span class="impact-row__change">${r.before} → <strong style="color:var(--emerald);">${r.after}</strong></span>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");
}
