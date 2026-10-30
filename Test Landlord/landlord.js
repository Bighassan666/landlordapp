/* ============================================================================
   LANDLORD — landlord.js   (combined file)
   Parts are in the order the app is built and loaded. Search for "PART 03" etc. to jump.

   PART 01  CORE APP                     (was app.js)
   PART 02  MARKETPLACE                  (was market.js)
   PART 03  LISTINGS                     (was listings.js)
   PART 04  FEATURES                     (was features.js)
   PART 05  PUBLIC SITE EXTRAS           (was extras.js)
   PART 06  VERIFICATION                 (was verify.js)
   PART 07  PAGES & SITE CONTENT         (was pages.js)
   PART 08  PWA / INSTALL                (was pwa.js)
   ============================================================================ */


/* ============================================================================
   PART 01 of 08  >>>  app.js
   CORE APP
   Icons, auth, storage, SMS and main UI/router. The foundation everything else builds on.
   (original file: app.js)
   ============================================================================ */

/* ---------------------------------------------------------------- SECTION 1 of 5 — icons.js ---------------------------------------------------------------- */

const ICON_PATHS = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  owners: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  hardhat: '<path d="M2 18h20"/><path d="M4 18v-3a8 8 0 0 1 16 0v3"/><path d="M12 5V3"/><path d="M6 12h12v3H6z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  mappin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  chevron: '<polyline points="9 18 15 12 9 6"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
};

function icon(name, size) {
  size = size || 16;
  const path = ICON_PATHS[name] || "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lw-icon">${path}</svg>`;
}

/* ---------------------------------------------------------------- SECTION 2 of 5 — auth.js ---------------------------------------------------------------- */

const ACCOUNTS_KEY = "landlord_accounts_v1";
const SESSION_KEY = "landlord_session_v1";

const Auth = {
  accounts: [],
  session: null, // { accountId } | null

  load() {
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      this.accounts = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("LANDLORD: could not read accounts, starting fresh.", e);
      this.accounts = [];
    }
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      this.session = raw ? JSON.parse(raw) : null;
    } catch (e) {
      this.session = null;
    }
  },

  saveAccounts() {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(this.accounts));
  },

  saveSession() {
    if (this.session) localStorage.setItem(SESSION_KEY, JSON.stringify(this.session));
    else localStorage.removeItem(SESSION_KEY);
  },

  uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  },

  randomSaltHex() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  },

  async hash(password, saltHex) {
    const enc = new TextEncoder();
    const data = enc.encode(saltHex + ":" + password);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  },

  findByEmail(email, role) {
    const e = (email || "").trim().toLowerCase();
    return this.accounts.find((a) => a.email.toLowerCase() === e && (!role || a.role === role));
  },

  findById(id) {
    return this.accounts.find((a) => a.id === id);
  },

  managerExists() {
    return this.accounts.some((a) => a.role === "manager");
  },

  // role: 'manager' | 'saas' | 'owner'
  // extra: { businessName } for saas, { phone } for owner
  async signup({ role, name, email, password, extra }) {
    if (this.findByEmail(email)) {
      throw new Error("An account with that email already exists.");
    }
    const salt = this.randomSaltHex();
    const passwordHash = await this.hash(password, salt);
    const account = Object.assign(
      {
        id: this.uid(),
        role,
        name,
        email: (email || "").trim(),
        passwordSalt: salt,
        passwordHash,
        // Where this account's operational data (properties, tenants, etc.) lives.
        // manager/saas accounts own their own namespace from day one.
        // owner accounts start unlinked — a manager links them to a namespace
        // and an owner record from the Owners page.
        dataNamespace: role === "owner" || role === "tenant" ? null : "acct_" + this.uid(),
        ownerId: null,
      },
      extra || {}
    );
    this.accounts.push(account);
    this.saveAccounts();
    return account;
  },

  async login({ email, password, role }) {
    const account = this.findByEmail(email);
    if (!account) throw new Error("No account found with that email. Sign up first.");
    if (account.role !== role) {
      const portalNames = { manager: "Manager", saas: "SaaS Partner", owner: "Property Owner", tenant: "Tenant", staff: "Team Member" };
      throw new Error(`That email is registered as a ${portalNames[account.role]} account. Use the ${portalNames[account.role]} login instead.`);
    }
    const computed = await this.hash(password, account.passwordSalt);
    if (computed !== account.passwordHash) throw new Error("Incorrect password.");
    this.session = { accountId: account.id };
    this.saveSession();
    return account;
  },

  logout() {
    this.session = null;
    this.saveSession();
  },

  currentAccount() {
    if (!this.session) return null;
    return this.findById(this.session.accountId) || null;
  },

  // Update name/email/role-specific extra fields (businessName, phone) for the
  // currently logged-in account. Email must stay globally unique.
  updateProfile(accountId, { name, email, extra }) {
    const account = this.findById(accountId);
    if (!account) throw new Error("Account not found.");
    const newEmail = (email || "").trim();
    if (newEmail.toLowerCase() !== account.email.toLowerCase()) {
      const clash = this.findByEmail(newEmail);
      if (clash && clash.id !== accountId) throw new Error("That email is already in use by another account.");
    }
    account.name = name;
    account.email = newEmail;
    if (extra) Object.assign(account, extra);
    this.saveAccounts();
    return account;
  },

  async changePassword(accountId, currentPassword, newPassword) {
    const account = this.findById(accountId);
    if (!account) throw new Error("Account not found.");
    const computed = await this.hash(currentPassword, account.passwordSalt);
    if (computed !== account.passwordHash) throw new Error("Current password is incorrect.");
    const salt = this.randomSaltHex();
    account.passwordSalt = salt;
    account.passwordHash = await this.hash(newPassword, salt);
    this.saveAccounts();
    return account;
  },

  // Manager/SaaS side: link a pending (unlinked) owner signup to a real
  // owner record in this manager's own data, by the owner's portal email.
  linkOwnerAccount(email, ownerId, managerDataNamespace) {
    const account = this.findByEmail(email, "owner");
    if (!account) throw new Error("No owner signup found with that email yet.");
    if (account.dataNamespace) throw new Error("That portal account is already linked to a property.");
    account.dataNamespace = managerDataNamespace;
    account.ownerId = ownerId;
    this.saveAccounts();
    return account;
  },

  unlinkOwnerAccount(ownerId) {
    const account = this.accounts.find((a) => a.role === "owner" && a.ownerId === ownerId);
    if (!account) return;
    account.dataNamespace = null;
    account.ownerId = null;
    this.saveAccounts();
  },

  ownerAccountFor(ownerId) {
    return this.accounts.find((a) => a.role === "owner" && a.ownerId === ownerId) || null;
  },
};

/* ------------------------------- SECTION 3 of 5 — storage.js------------------------- */

// The active storage key depends on which account is logged in — each
// manager/SaaS account gets its own isolated slice of localStorage, and an
// owner account reads (read-only, enforced in ui.js) from the same slice
// as the manager who manages their property.
function activeStorageKey() {
  const account = typeof Auth !== "undefined" ? Auth.currentAccount() : null;
  const ns = account && account.dataNamespace;
  return ns ? "landlord_data_v1:" + ns : "landlord_data_v1";
}

function emptyData() {
  return {
    owners: [],      // the real house/land/construction owners you manage on behalf of
    properties: [],  // houses, plots, construction sites
    rooms: [],
    tenants: [],
    utilities: [],
    expenses: [],
    materials: [],
    messages: [],    // log of SMS/messages sent to tenants
    payments: [],    // online rent payments made by tenants
    settings: {
      smsProvider: "",   // e.g. "arkesel", "mnotify", "hubtel", "custom"
      apiUrl: "",
      apiKey: "",
      senderId: "LANDLORD",
    },
  };
}

const Store = {
  data: null,
  readOnly: false, // set true for an owner-portal session — blocks writes at the data layer too, not just the UI

  load() {
    let parsed = null;
    try {
      const raw = localStorage.getItem(activeStorageKey());
      parsed = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("LANDLORD: could not read saved data, starting fresh.", e);
    }
    // Merge onto a fresh template so older saves never crash on missing keys.
    this.data = Object.assign(emptyData(), parsed || {});
    this.data.settings = Object.assign(emptyData().settings, (parsed && parsed.settings) || {});
    return this.data;
  },

  save() {
    try {
      localStorage.setItem(activeStorageKey(), JSON.stringify(this.data));
      setSaveStatus("All changes saved");
    } catch (e) {
      console.error("LANDLORD: could not save data.", e);
      setSaveStatus("Could not save (storage full or blocked)");
    }
  },

  uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  },

  add(collection, item) {
    if (this.readOnly) { console.warn("LANDLORD: write blocked — read-only owner session."); return null; }
    const record = Object.assign({ id: this.uid() }, item);
    this.data[collection].push(record);
    this.save();
    return record;
  },

  update(collection, id, patch) {
    if (this.readOnly) { console.warn("LANDLORD: write blocked — read-only owner session."); return; }
    this.data[collection] = this.data[collection].map((it) =>
      it.id === id ? Object.assign({}, it, patch) : it
    );
    this.save();
  },

  remove(collection, id) {
    if (this.readOnly) { console.warn("LANDLORD: write blocked — read-only owner session."); return; }
    this.data[collection] = this.data[collection].filter((it) => it.id !== id);
    this.save();
  },

  removeWhere(collection, predicate) {
    if (this.readOnly) { console.warn("LANDLORD: write blocked — read-only owner session."); return; }
    this.data[collection] = this.data[collection].filter((it) => !predicate(it));
    this.save();
  },

  get(collection) {
    return this.data[collection];
  },

  find(collection, id) {
    return this.data[collection].find((it) => it.id === id);
  },

  updateSettings(patch) {
    this.data.settings = Object.assign({}, this.data.settings, patch);
    this.save();
  },
};

function setSaveStatus(text) {
  const el = document.getElementById("saveStatus");
  if (el) el.textContent = text;
}

/* ---------------------------- formatters ------------------------------- */

function GHS(n) {
  const num = Number(n) || 0;
  return (
    "GHS " +
    num.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysUntil(d) {
  if (!d) return null;
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((dt - now) / 86400000);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* -------------------------------------------- SECTION 4 of 5 — sms.js ------------------------ */

const SMS = {
  templates: {
    rentReminder: {
      label: "Rent reminder",
      body:
        "Hello Mr. Hassan, this is a reminder that your rent of {{amount}} for {{room}} at {{property}} is due on {{dueDate}}. Kindly make payment at your earliest convenience. Thank you.",
    },
    overdueNotice: {
      label: "Overdue rent",
      body:
        "Hello Mr. Hassan, your rent of {{amount}} for {{room}} at {{property}} was due on {{dueDate}} and is now overdue. Please settle it as soon as possible or contact us to discuss. Thank you.",
    },
    billNotice: {
      label: "Utility bill notice",
      body:
        "Hello Mr. Hassan, a {{billType}} bill of {{amount}} for {{property}} is due on {{dueDate}}. Please help settle it promptly to avoid disconnection.",
    },
    general: {
      label: "General notice",
      body: "Hello Mr. Hassan, ",
    },
  },

  fillTemplate(body, fields) {
    return String(body).replace(/{{\s*(\w+)\s*}}/g, (match, key) =>
      fields[key] !== undefined && fields[key] !== null ? String(fields[key]) : ""
    );
  },

  // Opens the device's native SMS composer with the message pre-filled.
  // The user still has to press send on their phone — this app never
  // sends anything invisibly through this path.
  openNativeSms(phone, body) {
    const cleaned = (phone || "").replace(/[^\d+]/g, "");
    if (!cleaned) return false;
    const url = `sms:${cleaned}?&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
    return true;
  },

  
  async sendViaGateway(settings, phone, body) {
    if (!settings.apiUrl) {
      throw new Error("No SMS gateway URL configured. Add one under Messaging \u2192 Gateway settings.");
    }
    const res = await fetch(settings.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(settings.apiKey ? { Authorization: `Bearer ${settings.apiKey}` } : {}),
      },
      body: JSON.stringify({
        provider: settings.smsProvider,
        sender: settings.senderId,
        to: phone,
        message: body,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Gateway responded ${res.status}: ${text || "no details"}`);
    }
    return res.json().catch(() => ({}));
  },
};

/* ------------------------------- SECTION 5 of 5 — ui.js--------------------------------- */
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "owners", label: "Owners", icon: "owners" },
  { key: "properties", label: "Properties", icon: "building" },
  { key: "tenants", label: "Rooms & tenants", icon: "users" },
  { key: "payments", label: "Payments", icon: "card" },
  { key: "utilities", label: "Utilities & bills", icon: "zap" },
  { key: "construction", label: "Construction", icon: "hardhat" },
  { key: "messaging", label: "Messaging", icon: "mail" },
  { key: "directions", label: "Directions", icon: "mappin" },
  { key: "profile", label: "Profile", icon: "settings" },
];

const State = {
  page: "dashboard",
  scope: "all", // selected property filter on tenants/utilities/construction pages
  subtab: { tenants: "rooms", construction: "expenses" },
  editing: {}, // e.g. editing.property = 'new' | <id> | null
  photoBuffer: { property: [], expenseReceipt: null }, // photos attached in the currently open form, before it's saved
  messaging: {
    propertyFilter: "all",
    statusFilter: "all", // all | unpaid | overdue
    selected: new Set(),
    template: "rentReminder",
    customBody: "",
    lastResult: "",
  },
  auth: {
    screen: "market", // market | tenant | roleSelect | manager | saas | owner
    mode: "login", // login | signup (manager decides this itself, see renderManagerAuth)
    error: "",
    busy: false,
    profileSaved: false,
  },
  ownerLinkError: "",
  ownerView: "portal", // portal | profile — which screen a logged-in owner is looking at
};

     
/* ---------------------------- small view helpers ------------------------------- */

function statCard(label, value, tone) {
  return `<div class="lw-stat">
    <div class="lw-stat-label">${escapeHtml(label)}</div>
    <div class="lw-stat-value ${tone || ""}">${value}</div>
  </div>`;
}

function panel(title, bodyHtml, rightHtml) {
  return `<div class="lw-panel">
    ${title ? `<div class="lw-panel-title"><span>${title}</span>${rightHtml || ""}</div>` : ""}
    ${bodyHtml}
  </div>`;
}

function badge(kind, text) {
  return `<span class="lw-badge ${kind}">${escapeHtml(text)}</span>`;
}

function emptyRow(colspan, text) {
  return `<tr><td colspan="${colspan}" class="lw-empty">${escapeHtml(text)}</td></tr>`;
}

function pageHeader(title, desc, actionHtml) {
  // desc is intentionally unused — page headers show just the title now, no subtext.
  return `<div class="lw-header">
    <h2>${title}</h2>
    ${actionHtml || ""}
  </div>`;
}

function ownerName(id) {
  const o = Store.find("owners", id);
  return o ? o.name : "\u2014";
}

function propertyName(id) {
  const p = Store.find("properties", id);
  return p ? p.name : "\u2014";
}

/* ------------ photo handling (properties + expense receipts) ------------------------------- */

function resizeImageFile(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * (maxDim / width));
            width = maxDim;
          } else {
            width = Math.round(width * (maxDim / height));
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality || 0.72));
      };
      img.onerror = () => reject(new Error("Could not read that image."));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

function renderPhotoThumbs(photos, kind) {
  if (!photos || photos.length === 0) {
    return `<div style="font-size:11px;color:var(--ink-soft);margin-top:4px;">No photos added yet.</div>`;
  }
  return `<div class="lw-photo-thumbs">${photos
    .map(
      (src, i) => `<div class="lw-thumb-wrap">
        <img class="lw-thumb" src="${src}" />
        <button type="button" class="lw-thumb-remove" data-action="remove-${kind}-photo" data-index="${i}" title="Remove">${icon("x", 11)}</button>
      </div>`
    )
    .join("")}</div>`;
}

function renderReceiptPreview(src) {
  if (!src) return `<div style="font-size:11px;color:var(--ink-soft);margin-top:4px;">No receipt attached yet.</div>`;
  return `<div class="lw-thumb-wrap" style="margin-top:6px;">
    <img class="lw-thumb" src="${src}" />
    <button type="button" class="lw-thumb-remove" data-action="remove-expense-receipt" title="Remove">${icon("x", 11)}</button>
  </div>`;
}

function openLightbox(src) {
  let overlay = document.getElementById("lwLightbox");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "lwLightbox";
    overlay.className = "lw-lightbox";
    overlay.innerHTML = '<img id="lwLightboxImg" alt="Full-size photo" />';
    overlay.addEventListener("click", () => overlay.classList.remove("open"));
    document.body.appendChild(overlay);
  }
  document.getElementById("lwLightboxImg").src = src;
  overlay.classList.add("open");
}

/* ---------------------------- init / render loop ------------------------------- */

function init() {
  Auth.load();
  render();
  attachDelegatedEvents();
}

function render() {
  const appEl = document.getElementById("app");
  const account = Auth.currentAccount();

  if (!account) {
    if (State.auth.screen === "market") {
      appEl.className = "mk-shell";
      appEl.innerHTML = renderMarketPublic();
      return;
    }
    appEl.className = "lw-auth-shell";
    appEl.innerHTML = renderAuthScreen();
    return;
  }

  // Tenants live in their own portal: my home, bills & notices, payments, browse.
  if (account.role === "tenant") {
    Store.readOnly = true;
    appEl.className = "lw-root";
    appEl.innerHTML = renderTenantShell(account);
    document.getElementById("main").innerHTML = renderTenantPage(account);
    return;
  }

  // A logged-in owner who hasn't been linked to a property yet sees the
  // "ask your manager" screen — checked directly off the account, not a
  // one-time flag, so it's still correct after a page reload.
  if (account.role === "owner" && !account.dataNamespace) {
    appEl.className = "lw-auth-shell";
    appEl.innerHTML = renderOwnerPendingScreen();
    return;
  }

  // Logged in and linked: load this account's data slice, set read-only
  // for owners, then either the full app (manager/SaaS) or the Owner Portal.
  Store.readOnly = account.role === "owner";
  Store.load();

  if (account.role === "owner") {
    appEl.className = "lw-root";
    appEl.innerHTML = renderOwnerShell();
    document.getElementById("main").innerHTML =
      State.ownerView === "profile" ? renderProfilePage() : renderOwnerPortal(account);
    return;
  }

  appEl.className = "lw-root";
  appEl.innerHTML = renderAppShell(account);
  document.getElementById("nav").innerHTML = renderNav();
  document.getElementById("main").innerHTML = renderPage();
}

function renderAppShell(account) {
  return `
    <aside class="lw-sidebar">
      <div class="lw-brand">
        <div class="lw-brand-mark">
          <img class="lw-brand-logo" src="icon.png" alt="LANDLORD logo" />
          <h1>LANDLORD</h1>
        </div>
        <div class="lw-brand-sub">${accountBadgeText(account)}</div>
      </div>
      <nav class="lw-nav" id="nav"></nav>
              <div class="lw-sidebar-foot">
        <div id="saveStatus">All changes saved</div>
        <div class="lw-account-row">
          <span title="${escapeHtml(account.email)}">${escapeHtml(account.name)}</span>
          <button class="lw-btn ghost small" data-action="logout">Log out</button>
        </div>
        <div class="lw-copyright">&copy; Big Family Tech, 2026. All rights reserved.</div>
      </div>
      </div>
    </aside>
    <main class="lw-main" id="main"></main>
  `;
}

function renderOwnerShell() {
  const account = Auth.currentAccount();
  return `
    <aside class="lw-sidebar">
      <div class="lw-brand">
        <div class="lw-brand-mark">
          <img class="lw-brand-logo" src="icon.png" alt="LANDLORD logo" />
          <h1>LANDLORD</h1>
        </div>
        <div class="lw-brand-sub">owner portal \u00b7 read-only</div>
      </div>
      <nav class="lw-nav">
        <div class="lw-nav-item ${State.ownerView === "portal" ? "active" : ""}" data-action="owner-view" data-view="portal">
          ${icon("mappin", 16)}<span>Your property</span>
        </div>
        <div class="lw-nav-item ${State.ownerView === "profile" ? "active" : ""}" data-action="owner-view" data-view="profile">
          ${icon("settings", 16)}<span>Profile</span>
        </div>
      </nav>
      <div class="lw-sidebar-foot" style="margin-top:auto;">
        <div class="lw-account-row">
          <span title="${escapeHtml(account.email)}">${escapeHtml(account.name)}</span>
          <button class="lw-btn ghost small" data-action="logout">Log out</button>
        </div>
      </div>
    </aside>
    <main class="lw-main" id="main"></main>
  `;
}

function accountBadgeText(account) {
  if (account.role === "manager") return "manager \u00b7 full access";
  if (account.role === "saas") return escapeHtml(account.businessName || "agent") + " \u00b7 full access";
  return "";
}
const NAV_IMG = {
  dashboard:     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop",
  owners:        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop",
  properties:    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&h=80&fit=crop",
  tenants:       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=80&h=80&fit=crop",
  payments:      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop",
  utilities:     "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=80&h=80&fit=crop",
  construction:  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=80&h=80&fit=crop",
  messaging:     "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=80&h=80&fit=crop",
  directions:    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=80&h=80&fit=crop",
  profile:       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
  listings:      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=80&h=80&fit=crop",
  notifications: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=80&h=80&fit=crop",
  leases:        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=80&h=80&fit=crop",
  maintenance:   "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=80&h=80&fit=crop",
  inspections:   "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=80&h=80&fit=crop",
  documents:     "https://images.unsplash.com/photo-1568667256549-094345857637?w=80&h=80&fit=crop",
  finance:       "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop",
  team:          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop",
};

function renderNav() {
  return NAV.map((n) => {
    const img = NAV_IMG[n.key];
    const iconHtml = img
      ? `<img src="${img}" alt="" class="lw-nav-img" loading="lazy" />`
      : icon(n.icon, 16);
    return `<div class="lw-nav-item ${State.page === n.key ? "active" : ""}" data-action="nav" data-page="${n.key}">
      ${iconHtml}<span>${n.label}</span>
    </div>`;
  }).join("");
}

function renderPage() {
  switch (State.page) {
    case "dashboard":
      return renderDashboard();
    case "owners":
      return renderOwners();
    case "properties":
      return renderProperties();
    case "tenants":
      return renderTenantsPage();
    case "payments":
      return renderPaymentsPage();
    case "utilities":
      return renderUtilitiesPage();
    case "construction":
      return renderConstructionPage();
    case "messaging":
      return renderMessagingPage();
    case "directions":
      return renderDirectionsPage();
    case "profile":
      return renderProfilePage();
    default:
      return "";
  }
}

/* ---------------------------- Dashboard ------------------------------- */

/* ----------------- Auth screens (role select, login, signup) ------------------------------- */

const ROLE_META = {
  manager: {
    title: "Manager",
    blurb: "Full access to every property, tenant, bill and expense you manage.",
  },
  saas: {
    title: "SaaS Partner",
    blurb: "You're an agent managing your own portfolio of properties on LANDLORD, separate from everyone else's.",
  },
  owner: {
    title: "Property Owner",
    blurb: "You own a house, plot or site that someone else manages for you. Log in to see it and your tenants, bills and expenses.",
  },
};

function renderAuthScreen() {
  switch (State.auth.screen) {
    case "manager":
      return renderManagerAuth();
    case "saas":
      return renderRoleAuthForm("saas");
    case "owner":
      return renderRoleAuthForm("owner");
    case "tenant":
      return renderRoleAuthForm("tenant");
    default:
      return renderRoleSelect();
  }
}

function authShellWrap(inner) {
  return `<div class="lw-auth-center">
    <div class="lw-auth-brand">
      <img class="lw-brand-logo" src="icon.png" alt="LANDLORD logo" />
      <h1>LANDLORD</h1>
    </div>
    ${inner}
  </div>`;
}

function renderRoleSelect() {
  const cards = Object.entries(ROLE_META)
    .filter(([role]) => role !== "tenant")
    .map(
      ([role, meta]) => `<div class="lw-role-card" data-action="auth-choose-role" data-role="${role}">
      <div class="lw-role-title">${meta.title}</div>
      <p>${meta.blurb}</p>
      <span class="lw-btn primary small">Continue ${icon("chevron", 13)}</span>
    </div>`
    )
    .join("");
  return authShellWrap(`
    <button type="button" class="lw-auth-back" data-mk="home">${icon("chevron", 13)} Back to available homes</button>
    <p class="lw-auth-sub">Remote property, tenancy &amp; construction management. Choose how you're signing in.</p>
    <div class="lw-role-grid">${cards}</div>
  `);
}

function renderManagerAuth() {
  const isFirstRun = !Auth.managerExists();
  const err = State.auth.error ? `<div class="lw-auth-error">${escapeHtml(State.auth.error)}</div>` : "";

  if (isFirstRun) {
    return authShellWrap(`
      <button type="button" class="lw-auth-back" data-action="auth-back">${icon("chevron", 13)} Back</button>
      <h2 class="lw-auth-title">Create your manager account</h2>
      <p class="lw-auth-sub">This is the one account with full access to everything \u2014 set it up once.</p>
      ${err}
      <form class="lw-auth-form" data-form="manager-signup">
        <div class="lw-field"><label>Your name</label><input name="name" required /></div>
        <div class="lw-field"><label>Email</label><input type="email" name="email" required /></div>
        <div class="lw-field"><label>Password</label><input type="password" name="password" minlength="6" required /></div>
        <div class="lw-field"><label>Confirm password</label><input type="password" name="confirmPassword" minlength="6" required /></div>
        <button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Creating\u2026" : "Create account"}</button>
      </form>
    `);
  }

  return authShellWrap(`
    <button type="button" class="lw-auth-back" data-action="auth-back">${icon("chevron", 13)} Back</button>
    <h2 class="lw-auth-title">Manager login</h2>
    <p class="lw-auth-sub">Full access to every property, tenant, bill and expense.</p>
    ${err}
    <form class="lw-auth-form" data-form="manager-login">
      <div class="lw-field"><label>Email</label><input type="email" name="email" required /></div>
      <div class="lw-field"><label>Password</label><input type="password" name="password" required /></div>
      <button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Logging in\u2026" : "Log in"}</button>
    </form>
  `);
}

function renderRoleAuthForm(role) {
  const meta = ROLE_META[role];
  const mode = State.auth.mode;
  const err = State.auth.error ? `<div class="lw-auth-error">${escapeHtml(State.auth.error)}</div>` : "";

  const signupExtraFields =
    role === "saas"
      ? `<div class="lw-field"><label>Business / agent name</label><input name="businessName" placeholder="e.g. your own agency name" /></div>`
      : `<div class="lw-field"><label>Phone</label><input name="phone" placeholder="024..." /></div>`;

  const signupNote =
    role === "owner"
      ? `<p class="lw-auth-note">After you sign up, tell your property manager the email you used \u2014 they'll link your account to your property from their Owners page.</p>`
      : "";

  const form =
    mode === "signup"
      ? `<form class="lw-auth-form" data-form="${role}-signup">
          <div class="lw-field"><label>Your name</label><input name="name" required /></div>
          <div class="lw-field"><label>Email</label><input type="email" name="email" required /></div>
          ${signupExtraFields}
          <div class="lw-field"><label>Password</label><input type="password" name="password" minlength="6" required /></div>
          <div class="lw-field"><label>Confirm password</label><input type="password" name="confirmPassword" minlength="6" required /></div>
          ${signupNote}
          <button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Creating\u2026" : "Sign up"}</button>
        </form>`
      : `<form class="lw-auth-form" data-form="${role}-login">
          <div class="lw-field"><label>Email</label><input type="email" name="email" required /></div>
          <div class="lw-field"><label>Password</label><input type="password" name="password" required /></div>
          <button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Logging in\u2026" : "Log in"}</button>
        </form>`;

  return authShellWrap(`
    <button type="button" class="lw-auth-back" data-action="auth-back">${icon("chevron", 13)} Back</button>
    <h2 class="lw-auth-title">${meta.title} ${mode === "signup" ? "sign up" : "login"}</h2>
    <p class="lw-auth-sub">${meta.blurb}</p>
    ${err}
    ${form}
    <button type="button" class="lw-auth-toggle" data-action="auth-toggle-mode">
      ${mode === "signup" ? "Already have an account? Log in" : "New here? Sign up"}
    </button>
  `);
}

function renderOwnerPendingScreen() {
  const account = Auth.currentAccount();
  return authShellWrap(`
    <h2 class="lw-auth-title">Account created</h2>
    <p class="lw-auth-sub">
      Hi ${escapeHtml(account ? account.name : "")}, your owner account is set up but not yet linked to a property.
      Share this email with your property manager \u2014 <b>${escapeHtml(account ? account.email : "")}</b> \u2014
      and ask them to link it from their Owners page. Once they do, log back in here to see your property.
    </p>
    <button type="button" class="lw-btn primary" data-action="logout">Log out</button>
  `);
}

function renderDashboard() {
  const properties = Store.get("properties");
  const rooms = Store.get("rooms");
  const tenants = Store.get("tenants");
  const utilities = Store.get("utilities");
  const expenses = Store.get("expenses");
  const owners = Store.get("owners");

  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancyRate = rooms.length ? Math.round((occupied / rooms.length) * 100) : 0;
  const outstanding = utilities.filter((u) => u.status !== "paid").reduce((s, u) => s + Number(u.amount || 0), 0);
  const constructionTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  const rentCollected = tenants
    .filter((t) => t.paymentStatus === "paid")
    .reduce((s, t) => s + Number(t.rentAmount || 0), 0);
  const managementIncome = properties.reduce((sum, p) => {
    const feePct = Number(p.managementFeePercent || 0);
    if (!feePct) return sum;
    const propRent = tenants
      .filter((t) => t.propertyId === p.id && t.paymentStatus === "paid")
      .reduce((s, t) => s + Number(t.rentAmount || 0), 0);
    return sum + (propRent * feePct) / 100;
  }, 0);

  const upcoming = tenants
    .map((t) => Object.assign({}, t, { d: daysUntil(t.rentDue) }))
    .filter((t) => t.d !== null && t.d <= 7)
    .sort((a, b) => a.d - b.d)
    .slice(0, 6);

  const recentExpenses = expenses.slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 5);

  const upcomingRows = upcoming.length
    ? upcoming
        .map(
          (t) => `<tr>
        <td>${escapeHtml(t.name)}</td>
        <td>${escapeHtml(propertyName(t.propertyId))}</td>
        <td>${t.d < 0 ? badge("overdue", Math.abs(t.d) + "d overdue") : t.d === 0 ? badge("unpaid", "Due today") : "in " + t.d + "d"}</td>
        <td>${GHS(t.rentAmount)}</td>
      </tr>`
        )
        .join("")
    : emptyRow(4, "Nothing due this week.");

  const expenseRows = recentExpenses.length
    ? recentExpenses
        .map(
          (e) => `<tr><td>${fmtDate(e.date)}</td><td>${escapeHtml(e.description || e.category)}</td><td>${GHS(e.amount)}</td></tr>`
        )
        .join("")
    : emptyRow(3, "No expenses logged yet.");

  const propertyCards = properties.length
    ? `<div class="lw-prop-grid">${properties
        .map((p) => {
          const pRooms = rooms.filter((r) => r.propertyId === p.id);
          const pOcc = pRooms.filter((r) => r.status === "occupied").length;
          return `<div class="lw-prop-card">
          <div class="lw-prop-type">${escapeHtml(p.type)}</div>
          <h3>${escapeHtml(p.name)}</h3>
          <div class="lw-prop-addr">${icon("mappin", 13)} ${escapeHtml(p.address || "No address set")}</div>
          <div class="lw-prop-metrics">
            <div><b>${pRooms.length}</b>rooms</div>
            <div><b>${pOcc}</b>occupied</div>
            <div><b>${escapeHtml(ownerName(p.ownerId))}</b>owner</div>
          </div>
        </div>`;
        })
        .join("")}</div>`
    : `<div class="lw-empty">No properties yet. Go to the Properties tab to add your first house, plot or site.</div>`;

  return `
    ${pageHeader("Dashboard", "Everything I manage; houses, sites, tenants and owners.")}
    <div class="lw-stats">
      ${statCard("Properties", properties.length, "blue")}
      ${statCard("Owners represented", owners.length, "")}
      ${statCard("Occupancy rate", occupancyRate + "%", "moss")}
      ${statCard("Bills outstanding", GHS(outstanding), "accent")}
      ${statCard("Construction spend", GHS(constructionTotal), "blue")}
      ${statCard("Est. management income", GHS(managementIncome), "moss")}
    </div>
    <div class="lw-two-col">
      ${panel(
        "Rent due within 7 days",
        `<table class="lw-table"><thead><tr><th>Tenant</th><th>Property</th><th>Due</th><th>Amount</th></tr></thead><tbody>${upcomingRows}</tbody></table>`,
        `<span class="lw-btn ghost small" data-action="nav" data-page="tenants">Manage ${icon("chevron", 14)}</span>`
      )}
      ${panel(
        "Recent construction expenses",
        `<table class="lw-table"><thead><tr><th>Date</th><th>Item</th><th>Amount</th></tr></thead><tbody>${expenseRows}</tbody></table>`,
        `<span class="lw-btn ghost small" data-action="nav" data-page="construction">Manage ${icon("chevron", 14)}</span>`
      )}
    </div>
    ${panel("Your properties", propertyCards, `<span class="lw-btn ghost small" data-action="nav" data-page="properties">Manage ${icon("chevron", 14)}</span>`)}
  `;
}

/* ---------------------------- Owners ------------------------------- */

function renderOwners() {
  const owners = Store.get("owners");
  const properties = Store.get("properties");
  const editing = State.editing.owner;

  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const o = editing === "new" ? {} : Store.find("owners", editing) || {};
    formHtml = `<form class="lw-form" data-form="owner" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Owner name</label><input name="name" value="${escapeHtml(o.name || "")}" placeholder="e.g. Hassan Yakubu" required /></div>
      <div class="lw-field"><label>Phone</label><input name="phone" value="${escapeHtml(o.phone || "")}" placeholder="024..." /></div>
      <div class="lw-field"><label>Location</label><input name="location" value="${escapeHtml(o.location || "")}" placeholder="Where the owner is based e.g Tamale" /></div>
      <div class="lw-field" style="grid-column:1/-1"><label>Notes</label><textarea name="notes" placeholder="Agreement terms, contact preferences...">${escapeHtml(o.notes || "")}</textarea></div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Add owner" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="owner">${icon("x", 14)} Cancel</button>
      </div>
    </form>
    ${editing !== "new" ? renderOwnerPortalLink(editing) : `<p style="font-size:12px;color:var(--ink-soft);margin:-8px 0 16px 0;">Save this owner first, then come back to link their portal login.</p>`}`;
  }

  const rows = owners.length
    ? owners
        .map((o) => {
          const count = properties.filter((p) => p.ownerId === o.id).length;
          const portalAccount = Auth.ownerAccountFor(o.id);
          return `<tr>
        <td>${escapeHtml(o.name)}</td>
        <td>${escapeHtml(o.phone || "\u2014")}</td>
        <td>${escapeHtml(o.location || "\u2014")}</td>
        <td>${count}</td>
        <td>${portalAccount ? badge("paid", "linked") : badge("vacant", "no login")}</td>
        <td>
          <div class="lw-table-actions">
            <button class="lw-btn ghost small" data-action="edit-owner" data-id="${o.id}">${icon("pencil", 13)}</button>
            <button class="lw-btn ghost small" data-action="delete-owner" data-id="${o.id}">${icon("trash", 13)}</button>
          </div>
        </td>
      </tr>`;
        })
        .join("")
    : emptyRow(6, "No owners added yet.");

  return `
    ${pageHeader(
      "Owners",
      "The real house, land and construction owners represented. Every property belongs to one of these.",
      `<button class="lw-btn primary" data-action="add-owner">${icon("plus", 15)} Add owner</button>`
    )}
    ${formHtml}
    ${panel(`Owners (${owners.length})`, `<table class="lw-table"><thead><tr><th>Name</th><th>Phone</th><th>Location</th><th>Properties</th><th>Portal</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

function renderOwnerPortalLink(ownerId) {
  const portalAccount = Auth.ownerAccountFor(ownerId);
  if (portalAccount) {
    return `<div class="lw-panel" style="margin-top:-8px;">
      <div class="lw-panel-title"><span>Portal access</span></div>
      <p style="font-size:13px;margin:0 0 10px 0;">Linked to <b>${escapeHtml(portalAccount.email)}</b> \u2014 this owner can log in and see this property, read-only.</p>
      <button type="button" class="lw-btn small" data-action="unlink-owner-portal" data-id="${ownerId}">Unlink portal access</button>
    </div>`;
  }
  return `<div class="lw-panel" style="margin-top:-8px;">
    <div class="lw-panel-title"><span>Portal access</span></div>
    <p style="font-size:13px;margin:0 0 10px 0;">Not linked yet. Once the owner has signed up on the Property Owner portal, enter the email they used to link them here.</p>
    ${State.ownerLinkError ? `<div class="lw-auth-error" style="margin-bottom:10px;">${escapeHtml(State.ownerLinkError)}</div>` : ""}
    <form class="lw-form" style="margin-bottom:0;" data-form="link-owner" data-id="${ownerId}">
      <div class="lw-field"><label>Owner's portal email</label><input type="email" name="portalEmail" required /></div>
      <div class="lw-form-actions"><button type="submit" class="lw-btn primary small">Link account</button></div>
    </form>
  </div>`;
}

/* ---------------------------- Properties ------------------------------- */

function renderProperties() {
  const properties = Store.get("properties");
  const owners = Store.get("owners");
  const rooms = Store.get("rooms");
  const expenses = Store.get("expenses");
  const editing = State.editing.property;

  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const p = editing === "new" ? {} : Store.find("properties", editing) || {};
    const ownerOptions = owners
      .map((o) => `<option value="${o.id}" ${p.ownerId === o.id ? "selected" : ""}>${escapeHtml(o.name)}</option>`)
      .join("");
    formHtml = `<form class="lw-form" data-form="property" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Name</label><input name="name" value="${escapeHtml(p.name || "")}" placeholder="e.g. Banvum Bagliga House 1" required /></div>
      <div class="lw-field"><label>Owner</label>
        <select name="ownerId" required>
          <option value="">Select...</option>
          ${ownerOptions}
        </select>
      </div>
      <div class="lw-field"><label>Type</label>
        <select name="type">
          <option value="house" ${p.type === "house" ? "selected" : ""}>House</option>
          <option value="plot" ${p.type === "plot" ? "selected" : ""}>Plot / land</option>
          <option value="construction" ${p.type === "construction" ? "selected" : ""}>Under construction</option>
          <option value="commercial" ${p.type === "commercial" ? "selected" : ""}>Commercial</option>
        </select>
      </div>
      <div class="lw-field"><label>Status</label>
        <select name="status">
          <option value="active" ${p.status === "active" ? "selected" : ""}>Active</option>
          <option value="building" ${p.status === "building" ? "selected" : ""}>Building</option>
          <option value="planning" ${p.status === "planning" ? "selected" : ""}>Planning</option>
          <option value="on hold" ${p.status === "on hold" ? "selected" : ""}>On hold</option>
        </select>
      </div>
      <div class="lw-field"><label>Management fee (%)</label><input type="number" min="0" max="100" step="0.5" name="managementFeePercent" value="${escapeHtml(p.managementFeePercent || "")}" placeholder="e.g. 10" /></div>
      <div class="lw-field" style="grid-column:span 2"><label>Address</label><input name="address" value="${escapeHtml(p.address || "")}" placeholder="e.g. Kanvili, Tamale, Northern Region" /></div>
      <div class="lw-field"><label>Latitude (optional)</label><input name="lat" value="${escapeHtml(p.lat || "")}" placeholder="9.4008" /></div>
      <div class="lw-field"><label>Longitude (optional)</label><input name="lng" value="${escapeHtml(p.lng || "")}" placeholder="-0.8393" /></div>
      <div class="lw-field" style="grid-column:1/-1"><label>Notes</label><textarea name="notes" placeholder="Caretaker contact, gate code, anything worth remembering.">${escapeHtml(p.notes || "")}</textarea></div>
      <div class="lw-field" style="grid-column:1/-1">
        <label>Photos of the property</label>
        <input type="file" accept="image/*" multiple data-action="property-photos-input" />
        <div class="lw-photo-thumbs" id="propertyPhotoThumbs">${renderPhotoThumbs(State.photoBuffer.property, "property")}</div>
      </div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Add property" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="property">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }

  const cardsHtml = properties.length
    ? `<div class="lw-prop-grid">${properties
        .map((p) => {
          const pRooms = rooms.filter((r) => r.propertyId === p.id);
          const pOcc = pRooms.filter((r) => r.status === "occupied").length;
          const pSpend = expenses.filter((e) => e.propertyId === p.id).reduce((s, e) => s + Number(e.amount || 0), 0);
          return `<div class="lw-prop-card">
          ${p.photos && p.photos.length ? `<img class="lw-card-cover lw-thumb" src="${p.photos[0]}" />` : ""}
          <div class="lw-prop-type">${escapeHtml(p.type)}</div>
          <h3>${escapeHtml(p.name)}</h3>
          <div class="lw-prop-addr">${icon("mappin", 13)} ${escapeHtml(p.address || "No address set")}</div>
          <div style="font-size:12px;color:var(--ink-soft);margin-bottom:6px;">Owner: ${escapeHtml(ownerName(p.ownerId))}${p.managementFeePercent ? " \u00b7 " + p.managementFeePercent + "% fee" : ""}</div>
          ${p.notes ? `<div style="font-size:12px;color:var(--ink-soft);margin-bottom:8px;">${escapeHtml(p.notes)}</div>` : ""}
          ${p.photos && p.photos.length > 1 ? `<div class="lw-photo-thumbs">${p.photos.slice(1).map((src) => `<img class="lw-thumb lw-table-thumb" src="${src}" />`).join("")}</div>` : ""}
          <div class="lw-prop-metrics">
            <div><b>${pRooms.length}</b>rooms</div>
            <div><b>${pOcc}</b>occupied</div>
            <div><b>${GHS(pSpend)}</b>spent</div>
          </div>
          <div class="lw-prop-actions">
            <button class="lw-btn small" data-action="edit-property" data-id="${p.id}">${icon("pencil", 13)} Edit</button>
            ${p.address || (p.lat && p.lng) ? `<button class="lw-btn small" data-action="get-directions" data-id="${p.id}">${icon("navigation", 13)} Directions</button>` : ""}
            <button class="lw-btn small" data-action="delete-property" data-id="${p.id}">${icon("trash", 13)} Delete</button>
          </div>
        </div>`;
        })
        .join("")}</div>`
    : `<div class="lw-empty">No properties yet. Add your first house, plot, or construction site above.</div>`;

  return `
    ${pageHeader(
      "Properties",
      "Houses, plots and construction sites under management, each one linked to its real owner.",
      `<button class="lw-btn primary" data-action="add-property">${icon("plus", 15)} Add property</button>`
    )}
    ${formHtml}
    ${owners.length === 0 && editing === undefined ? `<div class="lw-panel"><div class="lw-empty">Add an owner first (Owners tab) so you can assign properties to them.</div></div>` : cardsHtml}
  `;
}

/* ---------------------------- shared: property scope selector ------------------------------- */

function propertyScopeSelector(pageKey) {
  const properties = Store.get("properties");
  const options = properties.map((p) => `<option value="${p.id}" ${State.scope === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
  return `<div class="lw-property-select">
    <label>Property</label>
    <select data-action="set-scope">
      <option value="all" ${State.scope === "all" ? "selected" : ""}>All properties</option>
      ${options}
    </select>
  </div>`;
}

function scopedList(list) {
  return State.scope === "all" ? list : list.filter((x) => x.propertyId === State.scope);
}

function targetPropertyIdForNewRecord() {
  const properties = Store.get("properties");
  return State.scope === "all" ? (properties[0] ? properties[0].id : "") : State.scope;
}

/* ---------------------------- Rooms & tenants ------------------------------- */

function renderTenantsPage() {
  const properties = Store.get("properties");
  if (properties.length === 0) {
    return pageHeader("Rooms & tenants", "Track every room, who is renting it, and when rent is next due.") +
      `<div class="lw-panel"><div class="lw-empty">Add a property first, from the Properties tab.</div></div>`;
  }
  const sub = State.subtab.tenants;
  return `
    ${pageHeader("Rooms & tenants", "Track every room, who is renting it, and when rent is next due.")}
    ${propertyScopeSelector()}
    <div class="lw-subtabs">
      <div class="lw-subtab ${sub === "rooms" ? "active" : ""}" data-action="set-subtab" data-page="tenants" data-tab="rooms">Rooms</div>
      <div class="lw-subtab ${sub === "tenants" ? "active" : ""}" data-action="set-subtab" data-page="tenants" data-tab="tenants">Tenants</div>
    </div>
    ${sub === "rooms" ? renderRoomsSubtab() : renderTenantsSubtab()}
  `;
}

function renderRoomsSubtab() {
  const rooms = scopedList(Store.get("rooms"));
  const tenants = Store.get("tenants");
  const properties = Store.get("properties");
  const editing = State.editing.room;
  const tenantByRoom = {};
  tenants.forEach((t) => { tenantByRoom[t.roomId] = t; });

  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const r = editing === "new" ? { propertyId: targetPropertyIdForNewRecord(), status: "vacant" } : Store.find("rooms", editing) || {};
    const propOptions = properties.map((p) => `<option value="${p.id}" ${r.propertyId === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
    formHtml = `<form class="lw-form" data-form="room" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Property</label><select name="propertyId" required><option value="">Select...</option>${propOptions}</select></div>
      <div class="lw-field"><label>Room number / name</label><input name="roomNumber" value="${escapeHtml(r.roomNumber || "")}" placeholder="e.g. Room 3" required /></div>
      <div class="lw-field"><label>Rent (GHS / month)</label><input type="number" min="0" name="rentAmount" value="${escapeHtml(r.rentAmount || "")}" /></div>
      <div class="lw-field"><label>Status</label>
        <select name="status">
          <option value="vacant" ${r.status === "vacant" ? "selected" : ""}>Vacant</option>
          <option value="occupied" ${r.status === "occupied" ? "selected" : ""}>Occupied</option>
        </select>
      </div>
      <div class="lw-field"><label>Public listing</label><select name="listed"><option value="yes" ${r.listed !== "no" ? "selected" : ""}>Show on marketplace when vacant</option><option value="no" ${r.listed === "no" ? "selected" : ""}>Don't list publicly</option></select></div>
      <div class="lw-field" style="grid-column:1/-1"><label>Description (shown to renters)</label><textarea name="description" placeholder="Size, water/electricity, nearby landmarks...">${escapeHtml(r.description || "")}</textarea></div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Add room" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="room">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }

  const rows = rooms.length
    ? rooms
        .map((r) => {
          const t = tenantByRoom[r.id];
          return `<tr>
        <td>${escapeHtml(r.roomNumber)}</td>
        ${State.scope === "all" ? `<td>${escapeHtml(propertyName(r.propertyId))}</td>` : ""}
        <td>${GHS(r.rentAmount)}</td>
        <td>${badge(r.status, r.status)}</td>
        <td>${t ? escapeHtml(t.name) : "\u2014"}</td>
        <td><div class="lw-table-actions">
          <button class="lw-btn ghost small" data-action="edit-room" data-id="${r.id}">${icon("pencil", 13)}</button>
          <button class="lw-btn ghost small" data-action="delete-room" data-id="${r.id}">${icon("trash", 13)}</button>
        </div></td>
      </tr>`;
        })
        .join("")
    : emptyRow(6, "No rooms added yet.");

  return `
    <div class="lw-header" style="margin-bottom:12px;"><div></div><button class="lw-btn primary" data-action="add-room">${icon("plus", 15)} Add room</button></div>
    ${formHtml}
    ${panel(`Rooms (${rooms.length})`, `<table class="lw-table"><thead><tr><th>Room</th>${State.scope === "all" ? "<th>Property</th>" : ""}<th>Rent</th><th>Status</th><th>Tenant</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

function renderTenantsSubtab() {
  const tenants = scopedList(Store.get("tenants"));
  const rooms = Store.get("rooms");
  const properties = Store.get("properties");
  const editing = State.editing.tenant;
  const roomById = {};
  rooms.forEach((r) => { roomById[r.id] = r; });

  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const t = editing === "new"
      ? { propertyId: targetPropertyIdForNewRecord(), rentStart: todayISO(), rentDue: todayISO(), paymentStatus: "unpaid" }
      : Store.find("tenants", editing) || {};
    const propOptions = properties.map((p) => `<option value="${p.id}" ${t.propertyId === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
    const roomsForProperty = rooms.filter((r) => r.propertyId === t.propertyId);
    const roomOptions = roomsForProperty.map((r) => `<option value="${r.id}" ${t.roomId === r.id ? "selected" : ""}>${escapeHtml(r.roomNumber)}</option>`).join("");
    formHtml = `<form class="lw-form" data-form="tenant" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Property</label><select name="propertyId" id="tenantFormProperty" required><option value="">Select...</option>${propOptions}</select></div>
      <div class="lw-field"><label>Room</label><select name="roomId" id="tenantFormRoom" required><option value="">Select...</option>${roomOptions}</select></div>
      <div class="lw-field"><label>Tenant name</label><input name="name" value="${escapeHtml(t.name || "")}" required /></div>
      <div class="lw-field"><label>Phone (for SMS)</label><input name="phone" value="${escapeHtml(t.phone || "")}" placeholder="024..." /></div>
      <div class="lw-field"><label>Rent (GHS)</label><input type="number" min="0" name="rentAmount" value="${escapeHtml(t.rentAmount || "")}" /></div>
      <div class="lw-field"><label>Tenancy start</label><input type="date" name="rentStart" value="${escapeHtml(t.rentStart || "")}" /></div>
      <div class="lw-field"><label>Next rent due</label><input type="date" name="rentDue" value="${escapeHtml(t.rentDue || "")}" /></div>
      <div class="lw-field"><label>Payment status</label>
        <select name="paymentStatus">
          <option value="paid" ${t.paymentStatus === "paid" ? "selected" : ""}>Paid</option>
          <option value="unpaid" ${t.paymentStatus === "unpaid" ? "selected" : ""}>Unpaid</option>
        </select>
      </div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Add tenant" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="tenant">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }

  const rows = tenants.length
    ? tenants
        .map((t) => {
          const room = roomById[t.roomId];
          const d = daysUntil(t.rentDue);
          return `<tr>
        <td>${escapeHtml(t.name)}${t.phone ? `<div style="font-size:11px;color:var(--ink-soft);">${escapeHtml(t.phone)}</div>` : ""}</td>
        ${State.scope === "all" ? `<td>${escapeHtml(propertyName(t.propertyId))}</td>` : ""}
        <td>${room ? escapeHtml(room.roomNumber) : "\u2014"}</td>
        <td>${GHS(t.rentAmount)}</td>
        <td>${fmtDate(t.rentDue)}${d !== null && d < 0 ? `<div>${badge("overdue", Math.abs(d) + "d overdue")}</div>` : ""}</td>
        <td>${badge(t.paymentStatus, t.paymentStatus)}</td>
        <td><div class="lw-table-actions">
          <button class="lw-btn ghost small" data-action="edit-tenant" data-id="${t.id}">${icon("pencil", 13)}</button>
          <button class="lw-btn ghost small" data-action="delete-tenant" data-id="${t.id}">${icon("trash", 13)}</button>
        </div></td>
      </tr>`;
        })
        .join("")
    : emptyRow(7, "No tenants recorded yet.");

  return `
    <div class="lw-header" style="margin-bottom:12px;"><div></div><button class="lw-btn primary" data-action="add-tenant">${icon("plus", 15)} Add tenant</button></div>
    ${formHtml}
    ${panel(`Tenants (${tenants.length})`, `<table class="lw-table"><thead><tr><th>Name</th>${State.scope === "all" ? "<th>Property</th>" : ""}<th>Room</th><th>Rent</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

/* ---------------------------- Utilities & bills ------------------------------- */

function renderUtilitiesPage() {
  const properties = Store.get("properties");
  if (properties.length === 0) {
    return pageHeader("Utilities & bills", "Log electricity, water, waste and other recurring bills.") +
      `<div class="lw-panel"><div class="lw-empty">Add a property first, from the Properties tab.</div></div>`;
  }
  const utilities = scopedList(Store.get("utilities"));
  const editing = State.editing.utility;

  const totalDue = utilities.filter((u) => u.status !== "paid").reduce((s, u) => s + Number(u.amount || 0), 0);
  const totalPaid = utilities.filter((u) => u.status === "paid").reduce((s, u) => s + Number(u.amount || 0), 0);

  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const u = editing === "new"
      ? { propertyId: targetPropertyIdForNewRecord(), type: "electricity", billDate: todayISO(), dueDate: todayISO(), status: "unpaid" }
      : Store.find("utilities", editing) || {};
    const propOptions = properties.map((p) => `<option value="${p.id}" ${u.propertyId === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
    formHtml = `<form class="lw-form" data-form="utility" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Property</label><select name="propertyId" required><option value="">Select...</option>${propOptions}</select></div>
      <div class="lw-field"><label>Type</label>
        <select name="type">
          ${["electricity", "water", "waste", "internet", "security", "other"].map((v) => `<option value="${v}" ${u.type === v ? "selected" : ""}>${v[0].toUpperCase() + v.slice(1)}</option>`).join("")}
        </select>
      </div>
      <div class="lw-field"><label>Amount (GHS)</label><input type="number" min="0" name="amount" value="${escapeHtml(u.amount || "")}" required /></div>
      <div class="lw-field"><label>Bill date</label><input type="date" name="billDate" value="${escapeHtml(u.billDate || "")}" /></div>
      <div class="lw-field"><label>Due date</label><input type="date" name="dueDate" value="${escapeHtml(u.dueDate || "")}" /></div>
      <div class="lw-field"><label>Status</label>
        <select name="status">
          <option value="unpaid" ${u.status === "unpaid" ? "selected" : ""}>Unpaid</option>
          <option value="paid" ${u.status === "paid" ? "selected" : ""}>Paid</option>
        </select>
      </div>
      <div class="lw-field" style="grid-column:1/-1"><label>Notes</label><input name="notes" value="${escapeHtml(u.notes || "")}" placeholder="Meter number, account reference..." /></div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Log bill" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="utility">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }

  const rows = utilities.length
    ? utilities
        .slice()
        .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
        .map((u) => {
          const d = daysUntil(u.dueDate);
          const overdue = u.status !== "paid" && d !== null && d < 0;
          return `<tr>
        <td style="text-transform:capitalize;">${escapeHtml(u.type)}</td>
        ${State.scope === "all" ? `<td>${escapeHtml(propertyName(u.propertyId))}</td>` : ""}
        <td>${GHS(u.amount)}</td>
        <td>${fmtDate(u.dueDate)}</td>
        <td>${overdue ? badge("overdue", "Overdue") : badge(u.status, u.status)}</td>
        <td><div class="lw-table-actions">
          ${u.status !== "paid" ? `<button class="lw-btn ghost small" title="Mark paid" data-action="mark-paid" data-id="${u.id}">${icon("check", 13)}</button>` : ""}
          <button class="lw-btn ghost small" data-action="edit-utility" data-id="${u.id}">${icon("pencil", 13)}</button>
          <button class="lw-btn ghost small" data-action="delete-utility" data-id="${u.id}">${icon("trash", 13)}</button>
        </div></td>
      </tr>`;
        })
        .join("")
    : emptyRow(6, "No bills logged yet.");

  return `
    ${pageHeader("Utilities & bills", "Log electricity, water, waste and other recurring bills, and track what's outstanding.")}
    ${propertyScopeSelector()}
    <div class="lw-stats" style="margin-bottom:16px;">
      ${statCard("Outstanding", GHS(totalDue), "accent")}
      ${statCard("Paid to date", GHS(totalPaid), "moss")}
      ${statCard("Bills logged", utilities.length, "")}
    </div>
    <div class="lw-header" style="margin-bottom:12px;"><div></div><button class="lw-btn primary" data-action="add-utility">${icon("plus", 15)} Log a bill</button></div>
    ${formHtml}
    ${panel(`Bills (${utilities.length})`, `<table class="lw-table"><thead><tr><th>Type</th>${State.scope === "all" ? "<th>Property</th>" : ""}<th>Amount</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

/* ---------------------------- Construction & materials ------------------------------- */

function renderConstructionPage() {
  const properties = Store.get("properties");
  if (properties.length === 0) {
    return pageHeader("Construction & materials", "Track build expenses and materials on site.") +
      `<div class="lw-panel"><div class="lw-empty">Add a property first, from the Properties tab.</div></div>`;
  }
  const sub = State.subtab.construction;
  const expenses = scopedList(Store.get("expenses"));
  const totalSpend = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const byCategory = {};
  expenses.forEach((e) => { byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount || 0); });
  const categoryCards = Object.entries(byCategory).slice(0, 3).map(([cat, amt]) => statCard(cat, GHS(amt), "")).join("");

  return `
    ${pageHeader("Construction & materials", "Track build expenses, categories of spend, and materials on site \u2014 even from abroad.")}
    ${propertyScopeSelector()}
    <div class="lw-stats" style="margin-bottom:16px;">${statCard("Total construction spend", GHS(totalSpend), "accent")}${categoryCards}</div>
    <div class="lw-subtabs">
      <div class="lw-subtab ${sub === "expenses" ? "active" : ""}" data-action="set-subtab" data-page="construction" data-tab="expenses">Expenses</div>
      <div class="lw-subtab ${sub === "materials" ? "active" : ""}" data-action="set-subtab" data-page="construction" data-tab="materials">Materials on site</div>
    </div>
    ${sub === "expenses" ? renderExpensesSubtab(expenses) : renderMaterialsSubtab()}
  `;
}

function renderExpensesSubtab(expenses) {
  const properties = Store.get("properties");
  const editing = State.editing.expense;
  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const e = editing === "new" ? { propertyId: targetPropertyIdForNewRecord(), category: "materials", date: todayISO() } : Store.find("expenses", editing) || {};
    const propOptions = properties.map((p) => `<option value="${p.id}" ${e.propertyId === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
    formHtml = `<form class="lw-form" data-form="expense" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Property</label><select name="propertyId" required><option value="">Select...</option>${propOptions}</select></div>
      <div class="lw-field"><label>Category</label>
        <select name="category">
          ${["materials", "labor", "transport", "permits", "equipment", "other"].map((v) => `<option value="${v}" ${e.category === v ? "selected" : ""}>${v[0].toUpperCase() + v.slice(1)}</option>`).join("")}
        </select>
      </div>
      <div class="lw-field"><label>Amount (GHS)</label><input type="number" min="0" name="amount" value="${escapeHtml(e.amount || "")}" required /></div>
      <div class="lw-field"><label>Date</label><input type="date" name="date" value="${escapeHtml(e.date || "")}" /></div>
      <div class="lw-field" style="grid-column:1/-1"><label>Description</label><input name="description" value="${escapeHtml(e.description || "")}" placeholder="e.g. 200 bags of cement, Zoomlion collection..." /></div>
      <div class="lw-field" style="grid-column:1/-1">
        <label>Invoice / receipt photo</label>
        <input type="file" accept="image/*" data-action="expense-receipt-input" />
        <div id="expenseReceiptPreview">${renderReceiptPreview(State.photoBuffer.expenseReceipt)}</div>
      </div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Log expense" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="expense">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }
  const rows = expenses.length
    ? expenses.slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).map((e) => `<tr>
        <td>${fmtDate(e.date)}</td>
        ${State.scope === "all" ? `<td>${escapeHtml(propertyName(e.propertyId))}</td>` : ""}
        <td style="text-transform:capitalize;">${escapeHtml(e.category)}</td>
        <td>${escapeHtml(e.description || "\u2014")}</td>
        <td>${GHS(e.amount)}</td>
        <td>${e.receipt ? `<img class="lw-thumb lw-table-thumb" src="${e.receipt}" title="Click to view receipt" />` : "\u2014"}</td>
        <td><div class="lw-table-actions"><button class="lw-btn ghost small" data-action="delete-expense" data-id="${e.id}">${icon("trash", 13)}</button></div></td>
      </tr>`).join("")
    : emptyRow(7, "No expenses logged yet.");

  return `
    <div class="lw-header" style="margin-bottom:12px;"><div></div><button class="lw-btn primary" data-action="add-expense">${icon("plus", 15)} Log expense</button></div>
    ${formHtml}
    ${panel(`Expenses (${expenses.length})`, `<table class="lw-table"><thead><tr><th>Date</th>${State.scope === "all" ? "<th>Property</th>" : ""}<th>Category</th><th>Description</th><th>Amount</th><th>Receipt</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

function renderMaterialsSubtab() {
  const materials = scopedList(Store.get("materials"));
  const properties = Store.get("properties");
  const editing = State.editing.material;
  let formHtml = "";
  if (editing !== undefined && editing !== null) {
    const m = editing === "new" ? { propertyId: targetPropertyIdForNewRecord(), unit: "bags", dateAdded: todayISO() } : Store.find("materials", editing) || {};
    const propOptions = properties.map((p) => `<option value="${p.id}" ${m.propertyId === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
    formHtml = `<form class="lw-form" data-form="material" data-id="${editing === "new" ? "" : editing}">
      <div class="lw-field"><label>Property</label><select name="propertyId" required><option value="">Select...</option>${propOptions}</select></div>
      <div class="lw-field"><label>Material</label><input name="name" value="${escapeHtml(m.name || "")}" placeholder="e.g. Cement" required /></div>
      <div class="lw-field"><label>Quantity</label><input type="number" min="0" name="quantity" value="${escapeHtml(m.quantity || "")}" /></div>
      <div class="lw-field"><label>Unit</label>
        <select name="unit">
          ${["bags", "blocks", "pieces", "tons", "rods", "litres", "trips"].map((v) => `<option value="${v}" ${m.unit === v ? "selected" : ""}>${v[0].toUpperCase() + v.slice(1)}</option>`).join("")}
        </select>
      </div>
      <div class="lw-field"><label>Unit cost (GHS)</label><input type="number" min="0" name="unitCost" value="${escapeHtml(m.unitCost || "")}" /></div>
      <div class="lw-field"><label>Supplier</label><input name="supplier" value="${escapeHtml(m.supplier || "")}" /></div>
      <div class="lw-form-actions">
        <button type="submit" class="lw-btn primary">${editing === "new" ? "Add material" : "Save changes"}</button>
        <button type="button" class="lw-btn" data-action="cancel-form" data-entity="material">${icon("x", 14)} Cancel</button>
      </div>
    </form>`;
  }
  const rows = materials.length
    ? materials.map((m) => `<tr>
        <td>${escapeHtml(m.name)}</td>
        ${State.scope === "all" ? `<td>${escapeHtml(propertyName(m.propertyId))}</td>` : ""}
        <td>${escapeHtml(m.quantity)} ${escapeHtml(m.unit)}</td>
        <td>${GHS(m.unitCost)}</td>
        <td>${GHS(Number(m.quantity || 0) * Number(m.unitCost || 0))}</td>
        <td>${escapeHtml(m.supplier || "\u2014")}</td>
        <td><div class="lw-table-actions">
          <button class="lw-btn ghost small" data-action="edit-material" data-id="${m.id}">${icon("pencil", 13)}</button>
          <button class="lw-btn ghost small" data-action="delete-material" data-id="${m.id}">${icon("trash", 13)}</button>
        </div></td>
      </tr>`).join("")
    : emptyRow(7, "No materials recorded yet.");

  return `
    <div class="lw-header" style="margin-bottom:12px;"><div></div><button class="lw-btn primary" data-action="add-material">${icon("plus", 15)} Add material</button></div>
    ${formHtml}
    ${panel(`Materials (${materials.length})`, `<table class="lw-table"><thead><tr><th>Material</th>${State.scope === "all" ? "<th>Property</th>" : ""}<th>Quantity</th><th>Unit cost</th><th>Total value</th><th>Supplier</th><th></th></tr></thead><tbody>${rows}</tbody></table>`)}
  `;
}

/* ---------------------------- Directions ------------------------------- */

function renderDirectionsPage() {
  const properties = Store.get("properties");
  const cards = properties.length
    ? `<div class="lw-prop-grid">${properties
        .map(
          (p) => `<div class="lw-prop-card">
        ${p.photos && p.photos.length ? `<img class="lw-card-cover lw-thumb" src="${p.photos[0]}" />` : ""}
        <div class="lw-prop-type">${escapeHtml(p.type)}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="lw-map-block">
          ${icon("mappin", 18)}
          <div style="font-size:13px;margin-top:4px;">${escapeHtml(p.address || "No address on file")}</div>
          ${p.lat && p.lng ? `<div class="lw-coord lw-mono">${escapeHtml(p.lat)}, ${escapeHtml(p.lng)}</div>` : ""}
        </div>
        <div class="lw-prop-actions">
          <button class="lw-btn primary small" ${!p.address && !(p.lat && p.lng) ? "disabled" : ""} data-action="get-directions" data-id="${p.id}">${icon("navigation", 13)} Get directions</button>
        </div>
      </div>`
        )
        .join("")}</div>`
    : `<div class="lw-empty">Add a property with an address to see it here.</div>`;

  return `
    ${pageHeader("Directions", "Get real turn-by-turn directions to any plot or house, straight from your phone.")}
    ${panel(null, cards)}
    ${panel("Why no embedded map", `<div style="font-size:12.5px;color:var(--ink-soft);display:flex;gap:8px;align-items:flex-start;">${icon("alert", 16)}<span>"Get directions" opens Google Maps with real, live navigation to the address or coordinates you saved.</span></div>`)}
  `;
}

function openDirections(propertyId) {
  const p = Store.find("properties", propertyId);
  if (!p) return;
  const dest = p.lat && p.lng ? `${p.lat},${p.lng}` : p.address;
  if (!dest) return;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`, "_blank");
}

/* ---------------------------- Profile ------------------------------- */

function renderProfilePage() {
  const account = Auth.currentAccount();
  if (!account) return "";
  const err = State.auth.error ? `<div class="lw-auth-error">${escapeHtml(State.auth.error)}</div>` : "";
  const okMsg = State.auth.profileSaved ? `<div class="lw-auth-success">Saved.</div>` : "";

  const extraField =
    account.role === "saas"
      ? `<div class="lw-field"><label>Business / agent name</label><input name="businessName" value="${escapeHtml(account.businessName || "")}" /></div>`
      : account.role === "owner" || account.role === "tenant"
      ? `<div class="lw-field"><label>Phone</label><input name="phone" value="${escapeHtml(account.phone || "")}" placeholder="024..." /></div>`
      : "";

  return `
    ${pageHeader("Profile")}
    ${panel(
      "Account details",
      `${err}${okMsg}
      <form class="lw-form" data-form="profile-info">
        <div class="lw-field"><label>Name</label><input name="name" value="${escapeHtml(account.name)}" required /></div>
        <div class="lw-field"><label>Email</label><input type="email" name="email" value="${escapeHtml(account.email)}" required /></div>
        ${extraField}
        <div class="lw-form-actions"><button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Saving\u2026" : "Save changes"}</button></div>
      </form>`
    )}
    ${panel(
      "Change password",
      `<form class="lw-form" data-form="change-password">
        <div class="lw-field"><label>Current password</label><input type="password" name="currentPassword" required /></div>
        <div class="lw-field"><label>New password</label><input type="password" name="newPassword" minlength="6" required /></div>
        <div class="lw-field"><label>Confirm new password</label><input type="password" name="confirmPassword" minlength="6" required /></div>
        <div class="lw-form-actions"><button type="submit" class="lw-btn primary" ${State.auth.busy ? "disabled" : ""}>${State.auth.busy ? "Updating\u2026" : "Update password"}</button></div>
      </form>`
    )}
    ${panel(
      "Account type",
      `<p style="font-size:13px;margin:0;color:var(--ink-soft);">${accountRoleDescription(account)}</p>`
    )}
  `;
}

function accountRoleDescription(account) {
  if (account.role === "manager") return "You're the Manager \u2014 full access to every property, tenant, bill and expense.";
  if (account.role === "saas") return "You're a SaaS Partner \u2014 your own portfolio, completely separate from other agents on LANDLORD.";
  if (account.role === "tenant") return "You're a Tenant \u2014 see your home, rent notices, bills and payment receipts.";
  if (account.role === "owner") return "You're a Property Owner \u2014 a read-only view of the property linked to your account.";
  return "";
}



function renderOwnerPortal(account) {
  const owner = Store.find("owners", account.ownerId);
  if (!owner) {
    return `${pageHeader("Your property", "")}${panel(null, `<div class="lw-empty">This account isn't linked to a property yet. Ask your property manager to link it from their Owners page.</div>`)}`;
  }

  const properties = Store.get("properties").filter((p) => p.ownerId === owner.id);
  const propertyIds = properties.map((p) => p.id);
  const rooms = Store.get("rooms").filter((r) => propertyIds.includes(r.propertyId));
  const tenants = Store.get("tenants").filter((t) => propertyIds.includes(t.propertyId));
  const utilities = Store.get("utilities").filter((u) => propertyIds.includes(u.propertyId));
  const expenses = Store.get("expenses").filter((e) => propertyIds.includes(e.propertyId));
  const materials = Store.get("materials").filter((m) => propertyIds.includes(m.propertyId));

  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const outstandingBills = utilities.filter((u) => u.status !== "paid").reduce((s, u) => s + Number(u.amount || 0), 0);
  const constructionTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  const propertyCards = properties.length
    ? `<div class="lw-prop-grid">${properties
        .map((p) => {
          const pRooms = rooms.filter((r) => r.propertyId === p.id);
          const pOcc = pRooms.filter((r) => r.status === "occupied").length;
          return `<div class="lw-prop-card">
            ${p.photos && p.photos.length ? `<img class="lw-card-cover lw-thumb" src="${p.photos[0]}" />` : ""}
            <div class="lw-prop-type">${escapeHtml(p.type)}</div>
            <h3>${escapeHtml(p.name)}</h3>
            <div class="lw-prop-addr">${icon("mappin", 13)} ${escapeHtml(p.address || "No address set")}</div>
            <div class="lw-prop-metrics">
              <div><b>${pRooms.length}</b>rooms</div>
              <div><b>${pOcc}</b>occupied</div>
              <div><b style="text-transform:capitalize;">${escapeHtml(p.status)}</b>status</div>
            </div>
            ${p.photos && p.photos.length > 1 ? `<div class="lw-photo-thumbs">${p.photos.slice(1).map((src) => `<img class="lw-thumb lw-table-thumb" src="${src}" />`).join("")}</div>` : ""}
          </div>`;
        })
        .join("")}</div>`
    : `<div class="lw-empty">No properties linked yet.</div>`;

  const tenantRows = tenants.length
    ? tenants
        .map((t) => {
          const room = rooms.find((r) => r.id === t.roomId);
          const d = daysUntil(t.rentDue);
          return `<tr>
        <td>${escapeHtml(t.name)}</td>
        <td>${room ? escapeHtml(room.roomNumber) : "\u2014"}</td>
        <td>${GHS(t.rentAmount)}</td>
        <td>${fmtDate(t.rentDue)}${d !== null && d < 0 ? `<div>${badge("overdue", Math.abs(d) + "d overdue")}</div>` : ""}</td>
        <td>${badge(t.paymentStatus, t.paymentStatus)}</td>
      </tr>`;
        })
        .join("")
    : emptyRow(5, "No tenants recorded yet.");

  const billRows = utilities.length
    ? utilities
        .slice()
        .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
        .map(
          (u) => `<tr>
        <td style="text-transform:capitalize;">${escapeHtml(u.type)}</td>
        <td>${GHS(u.amount)}</td>
        <td>${fmtDate(u.dueDate)}</td>
        <td>${badge(u.status, u.status)}</td>
      </tr>`
        )
        .join("")
    : emptyRow(4, "No bills logged yet.");

  const expenseRows = expenses.length
    ? expenses
        .slice()
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
        .map(
          (e) => `<tr>
        <td>${fmtDate(e.date)}</td>
        <td style="text-transform:capitalize;">${escapeHtml(e.category)}</td>
        <td>${escapeHtml(e.description || "\u2014")}</td>
        <td>${GHS(e.amount)}</td>
        <td>${e.receipt ? `<img class="lw-thumb lw-table-thumb" src="${e.receipt}" />` : "\u2014"}</td>
      </tr>`
        )
        .join("")
    : emptyRow(5, "No construction expenses logged yet.");

  const materialRows = materials.length
    ? materials
        .map(
          (m) => `<tr>
        <td>${escapeHtml(m.name)}</td>
        <td>${escapeHtml(m.quantity)} ${escapeHtml(m.unit)}</td>
        <td>${GHS(m.unitCost)}</td>
        <td>${GHS(Number(m.quantity || 0) * Number(m.unitCost || 0))}</td>
        <td>${escapeHtml(m.supplier || "\u2014")}</td>
      </tr>`
        )
        .join("")
    : emptyRow(5, "No materials recorded yet.");

  return `
    ${pageHeader("Your property", `Welcome, ${escapeHtml(owner.name)} \u2014 here's everything on your account, updated as your manager logs it. This view is read-only.`)}
    <div class="lw-stats">
      ${statCard("Your properties", properties.length, "blue")}
      ${statCard("Rooms occupied", `${occupied} / ${rooms.length}`, "moss")}
      ${statCard("Bills outstanding", GHS(outstandingBills), "accent")}
      ${statCard("Construction spend", GHS(constructionTotal), "blue")}
    </div>
    ${panel("Your properties", propertyCards)}
    ${panel(`Tenants (${tenants.length})`, `<table class="lw-table"><thead><tr><th>Name</th><th>Room</th><th>Rent</th><th>Due</th><th>Status</th></tr></thead><tbody>${tenantRows}</tbody></table>`)}
    ${panel(`Utility bills (${utilities.length})`, `<table class="lw-table"><thead><tr><th>Type</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>${billRows}</tbody></table>`)}
    ${panel(`Construction expenses (${expenses.length})`, `<table class="lw-table"><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Receipt</th></tr></thead><tbody>${expenseRows}</tbody></table>`)}
    ${panel(`Materials on site (${materials.length})`, `<table class="lw-table"><thead><tr><th>Material</th><th>Quantity</th><th>Unit cost</th><th>Total value</th><th>Supplier</th></tr></thead><tbody>${materialRows}</tbody></table>`)}
  `;
}

/* ---------------------------- Messaging (SMS) ------------------------------- */

function messagingFilteredTenants() {
  const tenants = Store.get("tenants");
  const m = State.messaging;
  return tenants.filter((t) => {
    if (m.propertyFilter !== "all" && t.propertyId !== m.propertyFilter) return false;
    if (m.statusFilter === "unpaid" && t.paymentStatus !== "unpaid") return false;
    if (m.statusFilter === "overdue") {
      const d = daysUntil(t.rentDue);
      if (!(t.paymentStatus !== "paid" && d !== null && d < 0)) return false;
    }
    if (m.statusFilter === "paid" && t.paymentStatus !== "paid") return false;
    return !!t.phone;
  });
}

function fieldsForTenant(t) {
  const room = Store.find("rooms", t.roomId);
  const property = Store.find("properties", t.propertyId);
  return {
    name: t.name || "",
    amount: GHS(t.rentAmount),
    dueDate: fmtDate(t.rentDue),
    room: room ? room.roomNumber : "",
    property: property ? property.name : "",
    billType: "utility",
  };
}

function renderMessagingPage() {
  const properties = Store.get("properties");
  const tenants = Store.get("tenants");
  const m = State.messaging;
  const settings = Store.data.settings;

  if (tenants.length === 0) {
    return pageHeader("Messaging", "Send SMS bills, rent reminders and notices to your tenants.") +
      `<div class="lw-panel"><div class="lw-empty">Add tenants first (Rooms & tenants tab), including their phone numbers.</div></div>`;
  }

  const templateKey = m.template;
  const templateBody = m.customBody || SMS.templates[templateKey].body;
  const visible = messagingFilteredTenants();

  const noPhoneCount = tenants.filter((t) => (m.propertyFilter === "all" || t.propertyId === m.propertyFilter) && !t.phone).length;

  const propOptions = properties.map((p) => `<option value="${p.id}" ${m.propertyFilter === p.id ? "selected" : ""}>${escapeHtml(p.name)}</option>`).join("");
  const templateOptions = Object.entries(SMS.templates).map(([key, tpl]) => `<option value="${key}" ${templateKey === key ? "selected" : ""}>${tpl.label}</option>`).join("");

  const rows = visible.length
    ? visible
        .map((t) => {
          const filled = SMS.fillTemplate(templateBody, fieldsForTenant(t));
          const checked = m.selected.has(t.id) ? "checked" : "";
          return `<tr>
        <td><input type="checkbox" data-action="toggle-tenant-select" data-id="${t.id}" ${checked} /></td>
        <td>${escapeHtml(t.name)}</td>
        <td>${escapeHtml(t.phone)}</td>
        <td>${escapeHtml(propertyName(t.propertyId))}</td>
        <td>${badge(t.paymentStatus, t.paymentStatus)}</td>
        <td style="max-width:260px;font-size:12px;color:var(--ink-soft);">${escapeHtml(filled)}</td>
        <td><button class="lw-btn ghost small" data-action="send-native-sms" data-id="${t.id}">${icon("phone", 13)} Send</button></td>
      </tr>`;
        })
        .join("")
    : emptyRow(7, "No tenants match this filter, or they have no phone number saved.");

  const messages = Store.get("messages").slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 15);
  const logRows = messages.length
    ? messages.map((msg) => `<tr>
        <td>${fmtDate(msg.date)}</td>
        <td>${escapeHtml(msg.tenantName)}</td>
        <td>${escapeHtml(msg.phone)}</td>
        <td>${escapeHtml(msg.method)}</td>
        <td style="max-width:320px;font-size:12px;color:var(--ink-soft);">${escapeHtml(msg.body)}</td>
      </tr>`).join("")
    : emptyRow(5, "No messages sent yet.");

  return `
    ${pageHeader("Messaging", "Send rent reminders, bill notices and general messages to tenants by SMS.")}

    ${panel(
      "1. Choose recipients",
      `<div class="lw-msg-filters">
        <div class="lw-field"><label>Property</label><select data-action="msg-set-property"><option value="all" ${m.propertyFilter === "all" ? "selected" : ""}>All properties</option>${propOptions}</select></div>
        <div class="lw-field"><label>Status</label>
          <select data-action="msg-set-status">
            <option value="all" ${m.statusFilter === "all" ? "selected" : ""}>All tenants</option>
            <option value="unpaid" ${m.statusFilter === "unpaid" ? "selected" : ""}>Unpaid</option>
            <option value="overdue" ${m.statusFilter === "overdue" ? "selected" : ""}>Overdue only</option>
            <option value="paid" ${m.statusFilter === "paid" ? "selected" : ""}>Paid</option>
          </select>
        </div>
        <button type="button" class="lw-btn small" data-action="msg-select-all">Select all visible</button>
        <button type="button" class="lw-btn small" data-action="msg-clear-selection">Clear selection</button>
      </div>
      ${noPhoneCount > 0 ? `<div style="font-size:12px;color:var(--ink-soft);margin-top:6px;">${noPhoneCount} tenant(s) in this property have no phone number on file, so they won't appear below.</div>` : ""}`
    )}

    ${panel(
      "2. Write the message",
      `<div class="lw-form" style="margin-bottom:0;">
        <div class="lw-field"><label>Template</label><select data-action="msg-set-template">${templateOptions}</select></div>
        <div class="lw-field" style="grid-column:1/-1"><label>Message (edit freely \u2014 {{name}}, {{amount}}, {{dueDate}}, {{room}}, {{property}} are filled in per tenant)</label>
          <textarea data-action="msg-set-body" rows="3">${escapeHtml(templateBody)}</textarea>
        </div>
      </div>`
    )}

    ${panel(
      `3. Recipients (${visible.length})`,
      `<table class="lw-table"><thead><tr><th></th><th>Name</th><th>Phone</th><th>Property</th><th>Rent status</th><th>Preview</th><th></th></tr></thead><tbody>${rows}</tbody></table>`
    )}

    ${panel(
      "4. Send",
      `<p style="font-size:12.5px;color:var(--ink-soft);margin:0 0 10px 0;">
        <b>Send via SMS app</b> opens your phone's own Messages app, one tenant at a time \u2014 works immediately, no setup.
        <b>Send via gateway</b> sends silently in bulk to everyone selected above, through a bulk-SMS provider you configure below.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <button type="button" class="lw-btn primary" data-action="send-gateway-bulk">${icon("send", 15)} Send via gateway to selected (${m.selected.size})</button>
      </div>
      ${m.lastResult ? `<div style="margin-top:10px;font-size:12.5px;">${m.lastResult}</div>` : ""}`
    )}

    ${panel(
      "Gateway settings",
      `<div class="lw-form" style="margin-bottom:0;">
        <div class="lw-field"><label>Provider</label>
          <select data-action="msg-set-provider">
            <option value="" ${!settings.smsProvider ? "selected" : ""}>Select...</option>
            <option value="arkesel" ${settings.smsProvider === "arkesel" ? "selected" : ""}>Arkesel</option>
            <option value="mnotify" ${settings.smsProvider === "mnotify" ? "selected" : ""}>mNotify</option>
            <option value="hubtel" ${settings.smsProvider === "hubtel" ? "selected" : ""}>Hubtel</option>
            <option value="twilio" ${settings.smsProvider === "twilio" ? "selected" : ""}>Twilio</option>
            <option value="custom" ${settings.smsProvider === "custom" ? "selected" : ""}>Custom / other</option>
          </select>
        </div>
        <div class="lw-field"><label>Your backend endpoint URL</label><input data-action="msg-set-apiurl" value="${escapeHtml(settings.apiUrl)}" placeholder="https://your-backend.example.com/send-sms" /></div>
        <div class="lw-field"><label>API key / token</label><input data-action="msg-set-apikey" type="password" value="${escapeHtml(settings.apiKey)}" placeholder="stored only in this browser" /></div>
        <div class="lw-field"><label>Sender ID</label><input data-action="msg-set-senderid" value="${escapeHtml(settings.senderId)}" placeholder="LANDLORD" /></div>
      </div>
      <div style="font-size:12px;color:var(--ink-soft);margin-top:10px;display:flex;gap:8px;">${icon("alert", 15)}<span>Point this at your own backend, not the SMS provider directly \u2014 see README.md, "Setting up real bulk SMS", for why and for a ready-made server file.</span></div>`
    )}

    ${panel(`Message log`, `<table class="lw-table"><thead><tr><th>Date</th><th>Tenant</th><th>Phone</th><th>Method</th><th>Message</th></tr></thead><tbody>${logRows}</tbody></table>`)}
  `;
}

/* ---------------------------- collection map + cascading deletes ------------------------------- */

const COLLECTION_OF = {
  owner: "owners",
  property: "properties",
  room: "rooms",
  tenant: "tenants",
  utility: "utilities",
  expense: "expenses",
  material: "materials",
};

function deleteOwnerCascade(id) {
  const hasProperties = Store.get("properties").some((p) => p.ownerId === id);
  if (hasProperties) {
    alert("This owner still has properties assigned to them. Reassign or delete those properties first.");
    return;
  }
  Auth.unlinkOwnerAccount(id);
  Store.remove("owners", id);
}

function deletePropertyCascade(id) {
  if (!confirm("Delete this property and all its rooms, tenants, bills, expenses and materials?")) return;
  Store.removeWhere("rooms", (r) => r.propertyId === id);
  Store.removeWhere("tenants", (t) => t.propertyId === id);
  Store.removeWhere("utilities", (u) => u.propertyId === id);
  Store.removeWhere("expenses", (e) => e.propertyId === id);
  Store.removeWhere("materials", (m) => m.propertyId === id);
  Store.removeWhere("payments", (p) => p.propertyId === id);
  Store.remove("properties", id);
  if (State.scope === id) State.scope = "all";
}

function deleteRoomCascade(id) {
  if (!confirm("Remove this room and any tenant record linked to it?")) return;
  Store.removeWhere("tenants", (t) => t.roomId === id);
  Store.remove("rooms", id);
}

function deleteTenantCascade(id) {
  const t = Store.find("tenants", id);
  if (!t) return;
  if (!confirm(`Remove tenant ${t.name}? The room will be marked vacant.`)) return;
  Store.remove("tenants", id);
  if (t.roomId) Store.update("rooms", t.roomId, { status: "vacant" });
}

/* ---------------------------- event delegation ------------------------------- */

function attachDelegatedEvents() {
  document.body.addEventListener("click", onClick);
  document.body.addEventListener("submit", onSubmit);
  document.body.addEventListener("change", onChange);
}

function onClick(e) {
  // Clicking any photo thumbnail (property photo or expense receipt) opens it full-size,
  // regardless of whether it also sits inside a data-action element.
  if (e.target.classList && e.target.classList.contains("lw-thumb")) {
    openLightbox(e.target.src);
    return;
  }

  const el = e.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  const id = el.dataset.id;

  switch (action) {
    case "auth-choose-role":
      State.auth.screen = el.dataset.role;
      State.auth.mode = "login";
      State.auth.error = "";
      render();
      break;

    case "auth-back":
      State.auth.screen = State.auth.screen === "tenant" ? "market" : "roleSelect";
      State.auth.error = "";
      render();
      break;

    case "auth-toggle-mode":
      State.auth.mode = State.auth.mode === "signup" ? "login" : "signup";
      State.auth.error = "";
      render();
      break;

    case "logout":
      Auth.logout();
      State.page = "dashboard";
      State.editing = {};
      State.auth = { screen: "market", mode: "login", error: "", busy: false, profileSaved: false };
      State.tenantPage = "home";
      if (State.market) { State.market.sel = null; State.market.book = null; }
      if (typeof mkRenderModal === "function") mkRenderModal();
      State.ownerView = "portal";
      render();
      break;

    case "owner-view":
      State.ownerView = el.dataset.view;
      State.auth.error = "";
      State.auth.profileSaved = false;
      render();
      break;

    case "unlink-owner-portal":
      Auth.unlinkOwnerAccount(id);
      render();
      break;

    case "nav":
      State.page = el.dataset.page;
      State.editing = {};
      State.photoBuffer = { property: [], expenseReceipt: null };
      State.auth.error = "";
      State.auth.profileSaved = false;
      render();
      break;

    case "cancel-form":
      State.editing[el.dataset.entity] = null;
      if (el.dataset.entity === "property") State.photoBuffer.property = [];
      if (el.dataset.entity === "expense") State.photoBuffer.expenseReceipt = null;
      render();
      break;

    case "add-owner":
      State.editing.owner = "new";
      State.ownerLinkError = "";
      render();
      break;
    case "edit-owner":
      State.editing.owner = id;
      State.ownerLinkError = "";
      render();
      break;
    case "delete-owner":
      deleteOwnerCascade(id);
      render();
      break;

    case "add-property":
      State.editing.property = "new";
      State.photoBuffer.property = [];
      render();
      break;
    case "edit-property": {
      State.editing.property = id;
      const existing = Store.find("properties", id);
      State.photoBuffer.property = (existing && existing.photos) ? existing.photos.slice() : [];
      render();
      break;
    }
    case "delete-property":
      deletePropertyCascade(id);
      render();
      break;

    case "remove-property-photo": {
      const idx = Number(el.dataset.index);
      State.photoBuffer.property.splice(idx, 1);
      const thumbs = document.getElementById("propertyPhotoThumbs");
      if (thumbs) thumbs.innerHTML = renderPhotoThumbs(State.photoBuffer.property, "property");
      break;
    }

    case "get-directions":
      openDirections(id);
      break;

    case "add-room":
      State.editing.room = "new";
      render();
      break;
    case "edit-room":
      State.editing.room = id;
      render();
      break;
    case "delete-room":
      deleteRoomCascade(id);
      render();
      break;

    case "add-tenant":
      State.editing.tenant = "new";
      render();
      break;
    case "edit-tenant":
      State.editing.tenant = id;
      render();
      break;
    case "delete-tenant":
      deleteTenantCascade(id);
      render();
      break;

    case "add-utility":
      State.editing.utility = "new";
      render();
      break;
    case "edit-utility":
      State.editing.utility = id;
      render();
      break;
    case "delete-utility":
      Store.remove("utilities", id);
      render();
      break;
    case "mark-paid":
      Store.update("utilities", id, { status: "paid" });
      render();
      break;

    case "add-expense":
      State.editing.expense = "new";
      State.photoBuffer.expenseReceipt = null;
      render();
      break;
    case "remove-expense-receipt": {
      State.photoBuffer.expenseReceipt = null;
      const prev = document.getElementById("expenseReceiptPreview");
      if (prev) prev.innerHTML = renderReceiptPreview(null);
      break;
    }
    case "delete-expense":
      Store.remove("expenses", id);
      render();
      break;

    case "add-material":
      State.editing.material = "new";
      render();
      break;
    case "edit-material":
      State.editing.material = id;
      render();
      break;
    case "delete-material":
      Store.remove("materials", id);
      render();
      break;

    case "set-subtab":
      State.subtab[el.dataset.page] = el.dataset.tab;
      render();
      break;

    case "msg-select-all":
      messagingFilteredTenants().forEach((t) => State.messaging.selected.add(t.id));
      render();
      break;
    case "msg-clear-selection":
      State.messaging.selected.clear();
      render();
      break;

    case "send-native-sms": {
      const t = Store.find("tenants", id);
      if (!t || !t.phone) break;
      const body = SMS.fillTemplate(State.messaging.customBody || SMS.templates[State.messaging.template].body, fieldsForTenant(t));
      const opened = SMS.openNativeSms(t.phone, body);
      if (opened) {
        Store.add("messages", { tenantId: t.id, tenantName: t.name, phone: t.phone, body, method: "device SMS app", date: todayISO() });
        render();
      }
      break;
    }

    case "send-gateway-bulk": {
      sendGatewayBulk();
      break;
    }
  }
}

const AUTH_FORM_TYPES = new Set([
  "manager-signup",
  "manager-login",
  "saas-signup",
  "saas-login",
  "owner-signup",
  "owner-login",
  "tenant-signup",
  "tenant-login",
  "link-owner",
]);

const PROFILE_FORM_TYPES = new Set(["profile-info", "change-password"]);

function onSubmit(e) {
  const form = e.target.closest("form[data-form]");
  if (!form) return;
  e.preventDefault();
  const entity = form.dataset.form;

  if (AUTH_FORM_TYPES.has(entity)) {
    handleAuthSubmit(entity, form);
    return;
  }

  if (PROFILE_FORM_TYPES.has(entity)) {
    handleProfileSubmit(entity, form);
    return;
  }

  const collection = COLLECTION_OF[entity];
  const id = form.dataset.id;
  const payload = Object.fromEntries(new FormData(form).entries());

  if (entity === "property") payload.photos = State.photoBuffer.property.slice();
  if (entity === "expense" && !id) payload.receipt = State.photoBuffer.expenseReceipt || "";

  if (id) {
    Store.update(collection, id, payload);
  } else {
    const record = Store.add(collection, payload);
    if (entity === "tenant" && payload.roomId) {
      Store.update("rooms", payload.roomId, { status: "occupied" });
    }
  }
  if (entity === "property") State.photoBuffer.property = [];
  if (entity === "expense") State.photoBuffer.expenseReceipt = null;
  State.editing[entity] = null;
  render();
}

async function handleAuthSubmit(formType, form) {
  const data = Object.fromEntries(new FormData(form).entries());
  State.auth.error = "";
  State.auth.busy = true;
  render();

  try {
    if (formType === "manager-signup") {
      if (data.password !== data.confirmPassword) throw new Error("Passwords don't match.");
      await Auth.signup({ role: "manager", name: data.name, email: data.email, password: data.password });
      await Auth.login({ email: data.email, password: data.password, role: "manager" });
    } else if (formType === "manager-login") {
      await Auth.login({ email: data.email, password: data.password, role: "manager" });
    } else if (formType === "saas-signup") {
      if (data.password !== data.confirmPassword) throw new Error("Passwords don't match.");
      await Auth.signup({
        role: "saas",
        name: data.name,
        email: data.email,
        password: data.password,
        extra: { businessName: data.businessName || "" },
      });
      await Auth.login({ email: data.email, password: data.password, role: "saas" });
    } else if (formType === "saas-login") {
      await Auth.login({ email: data.email, password: data.password, role: "saas" });
    } else if (formType === "owner-signup") {
      if (data.password !== data.confirmPassword) throw new Error("Passwords don't match.");
      await Auth.signup({
        role: "owner",
        name: data.name,
        email: data.email,
        password: data.password,
        extra: { phone: data.phone || "" },
      });
      await Auth.login({ email: data.email, password: data.password, role: "owner" });
    } else if (formType === "owner-login") {
      await Auth.login({ email: data.email, password: data.password, role: "owner" });
    } else if (formType === "tenant-signup") {
      if (data.password !== data.confirmPassword) throw new Error("Passwords don't match.");
      await Auth.signup({ role: "tenant", name: data.name, email: data.email, password: data.password, extra: { phone: data.phone || "", tenancies: [] } });
      await Auth.login({ email: data.email, password: data.password, role: "tenant" });
      State.tenantPage = "home";
    } else if (formType === "tenant-login") {
      await Auth.login({ email: data.email, password: data.password, role: "tenant" });
      State.tenantPage = "home";
    } else if (formType === "link-owner") {
      const ownerId = form.dataset.id;
      const account = Auth.currentAccount();
      Auth.linkOwnerAccount(data.portalEmail, ownerId, account.dataNamespace);
      State.ownerLinkError = "";
    }
    State.auth.busy = false;
    render();
  } catch (err) {
    State.auth.busy = false;
    if (formType === "link-owner") {
      State.ownerLinkError = err.message || "Something went wrong.";
    } else {
      State.auth.error = err.message || "Something went wrong.";
    }
    render();
  }
}

async function handleProfileSubmit(formType, form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const account = Auth.currentAccount();
  if (!account) return;

  State.auth.error = "";
  State.auth.profileSaved = false;
  State.auth.busy = true;
  render();

  try {
    if (formType === "profile-info") {
      const extra =
        account.role === "saas"
          ? { businessName: data.businessName || "" }
          : account.role === "owner" || account.role === "tenant"
          ? { phone: data.phone || "" }
          : undefined;
      Auth.updateProfile(account.id, { name: data.name, email: data.email, extra });
    } else if (formType === "change-password") {
      if (data.newPassword !== data.confirmPassword) throw new Error("New passwords don't match.");
      await Auth.changePassword(account.id, data.currentPassword, data.newPassword);
    }
    State.auth.busy = false;
    State.auth.profileSaved = true;
    render();
  } catch (err) {
    State.auth.busy = false;
    State.auth.error = err.message || "Something went wrong.";
    render();
  }
}

function onChange(e) {
  const el = e.target;
  const action = el.dataset && el.dataset.action;
  if (!action) return;

  switch (action) {
    case "property-photos-input": {
      const files = Array.from(el.files || []);
      el.value = ""; // allow re-selecting the same file again later
      if (files.length === 0) break;
      Promise.all(files.map((f) => resizeImageFile(f, 900, 0.72)))
        .then((dataUrls) => {
          State.photoBuffer.property = State.photoBuffer.property.concat(dataUrls);
          const thumbs = document.getElementById("propertyPhotoThumbs");
          if (thumbs) thumbs.innerHTML = renderPhotoThumbs(State.photoBuffer.property, "property");
        })
        .catch((err) => {
          console.error("Could not add photo(s):", err);
          alert("One of those photos couldn't be read. Try a different file.");
        });
      break;
    }

    case "expense-receipt-input": {
      const file = el.files && el.files[0];
      el.value = "";
      if (!file) break;
      resizeImageFile(file, 1100, 0.75)
        .then((dataUrl) => {
          State.photoBuffer.expenseReceipt = dataUrl;
          const prev = document.getElementById("expenseReceiptPreview");
          if (prev) prev.innerHTML = renderReceiptPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Could not add receipt photo:", err);
          alert("That photo couldn't be read. Try a different file.");
        });
      break;
    }

    case "set-scope":
      State.scope = el.value;
      State.editing = {};
      render();
      break;

    case "msg-set-property":
      State.messaging.propertyFilter = el.value;
      render();
      break;
    case "msg-set-status":
      State.messaging.statusFilter = el.value;
      render();
      break;
    case "toggle-tenant-select":
      if (el.checked) State.messaging.selected.add(el.dataset.id);
      else State.messaging.selected.delete(el.dataset.id);
      break; // no full re-render needed, checkbox already reflects its own state
    case "msg-set-template":
      State.messaging.template = el.value;
      State.messaging.customBody = "";
      render();
      break;
    case "msg-set-body":
      State.messaging.customBody = el.value;
      render();
      break;

    case "msg-set-provider":
      Store.updateSettings({ smsProvider: el.value });
      break;
    case "msg-set-apiurl":
      Store.updateSettings({ apiUrl: el.value });
      break;
    case "msg-set-apikey":
      Store.updateSettings({ apiKey: el.value });
      break;
    case "msg-set-senderid":
      Store.updateSettings({ senderId: el.value });
      break;

    // Tenant form: property changes narrow down the room dropdown in place,
    // without re-rendering the whole form (which would lose other typed fields).
    case undefined:
      if (el.id === "tenantFormProperty") {
        const roomSelect = document.getElementById("tenantFormRoom");
        if (roomSelect) {
          const rooms = Store.get("rooms").filter((r) => r.propertyId === el.value);
          roomSelect.innerHTML =
            '<option value="">Select...</option>' +
            rooms.map((r) => `<option value="${r.id}">${escapeHtml(r.roomNumber)}</option>`).join("");
        }
      }
      break;
  }
}

async function sendGatewayBulk() {
  const settings = Store.data.settings;
  const ids = Array.from(State.messaging.selected);
  if (ids.length === 0) {
    State.messaging.lastResult = "Select at least one tenant first.";
    render();
    return;
  }
  if (!settings.apiUrl) {
    State.messaging.lastResult = "Add your backend endpoint URL under Gateway settings before sending in bulk.";
    render();
    return;
  }
  State.messaging.lastResult = "Sending...";
  render();

  let sent = 0;
  let failed = 0;
  for (const id of ids) {
    const t = Store.find("tenants", id);
    if (!t || !t.phone) { failed++; continue; }
    const body = SMS.fillTemplate(State.messaging.customBody || SMS.templates[State.messaging.template].body, fieldsForTenant(t));
    try {
      await SMS.sendViaGateway(settings, t.phone, body);
      Store.add("messages", { tenantId: t.id, tenantName: t.name, phone: t.phone, body, method: "gateway (" + (settings.smsProvider || "custom") + ")", date: todayISO() });
      sent++;
    } catch (err) {
      failed++;
      console.error("SMS gateway send failed for", t.name, err);
    }
  }
  State.messaging.lastResult = `Sent ${sent} message(s)${failed ? `, ${failed} failed \u2014 check the browser console and your gateway settings` : ""}.`;
  render();
}



/* ---------------------------- boot ------------------------------- */

document.addEventListener("DOMContentLoaded", init);


/* ============================================================================
   PART 02 of 08  >>>  market.js
   MARKETPLACE
   Public listings homepage, tenant accounts, booking + payment, tenant portal, manager Payments page.
   (original file: market.js)
   ============================================================================ */

/* ======================================================================
   LANDLORD — market.js
   Public listings homepage, tenant accounts, booking + payment,
   tenant portal (bills, rent notices, receipts), manager Payments page.
   Loaded after app.js; hooks into its State / Auth / Store / render().
   ====================================================================== */

Object.assign(ICON_PATHS, {
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/>',
  receipt: '<path d="M4 2v20l3-2 2 2 3-2 3 2 2-2 3 2V2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/>',
});
Object.assign(ROLE_META, {
  tenant: { title: "Tenant", blurb: "Rent a place, then keep your bills, rent notices and receipts in one spot." },
});

State.market = { q: "", price: "all", sort: "new", sel: null, img: 0, book: null };
State.tenantPage = "home";

/* ---------------- demo payment provider ----------------
   Replace Pay.process with a real call (Paystack, Hubtel, Flutterwave...)
   that runs on YOUR backend. Until then payments are SIMULATED. */
const PAY_DEMO = true;
const Pay = {
  methods: ["MTN MoMo", "Telecel Cash", "AirtelTigo Money", "Card"],
  process() {
    return new Promise((res) => setTimeout(() => res({ ref: "LL-" + Date.now().toString(36).toUpperCase() }), 1900));
  },
};

/* ---------------- helpers ---------------- */
const mkMoney = (n) => "GHS " + (Number(n) || 0).toLocaleString("en-GH", { maximumFractionDigits: 2 });
const mkISO = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
function addMonth(iso) {
  const d = new Date((iso || todayISO()) + "T00:00:00");
  const day = d.getDate();
  d.setMonth(d.getMonth() + 1);
  if (d.getDate() !== day) d.setDate(0);
  return mkISO(d);
}
const mkNsKey = (ns) => "landlord_data_v1:" + ns;
function mkReadNs(ns) {
  let parsed = null;
  try { parsed = JSON.parse(localStorage.getItem(mkNsKey(ns)) || "null"); } catch (e) {}
  return Object.assign(emptyData(), parsed || {});
}
const mkWriteNs = (ns, data) => localStorage.setItem(mkNsKey(ns), JSON.stringify(data));

function mkListings() {
  const out = [];
  const seen = new Set();
  Auth.accounts.forEach((a) => {
    if (!a.dataNamespace || (a.role !== "manager" && a.role !== "saas") || seen.has(a.dataNamespace)) return;
    seen.add(a.dataNamespace);
    const d = mkReadNs(a.dataNamespace);
    d.rooms.forEach((r) => {
      if (r.status !== "vacant" || r.listed === "no") return;
      const prop = d.properties.find((p) => p.id === r.propertyId);
      if (!prop) return;
      out.push({ key: a.dataNamespace + "|" + r.id, ns: a.dataNamespace, room: r, prop, agent: a.businessName || a.name });
    });
  });
  return out;
}
const mkFind = (key) => mkListings().find((l) => l.key === key);
const mkPhotos = (l) => (l.prop.photos && l.prop.photos.length ? l.prop.photos : []);
const mkImg = (l, cls) => {
  const p = mkPhotos(l);
  return p.length ? `<img class="${cls}" src="${p[0]}" alt="" loading="lazy">` : `<div class="${cls} mk-ph">${icon("home", 38)}</div>`;
};

function mkFiltered() {
  const m = State.market;
  const q = m.q.trim().toLowerCase();
  let list = mkListings().filter((l) => {
    const rent = Number(l.room.rentAmount) || 0;
    if (m.price === "lt500" && rent >= 500) return false;
    if (m.price === "500-1000" && (rent < 500 || rent > 1000)) return false;
    if (m.price === "gt1000" && rent <= 1000) return false;
    return !q || [l.prop.name, l.prop.address, l.room.roomNumber, l.prop.type].join(" ").toLowerCase().includes(q);
  });
  if (m.sort === "low") list.sort((a, b) => a.room.rentAmount - b.room.rentAmount);
  if (m.sort === "high") list.sort((a, b) => b.room.rentAmount - a.room.rentAmount);
  return list;
}

/* ---------------- public pages ---------------- */
function mkCard(l, i) {
  return `<article class="mk-card" data-mk="open" data-key="${l.key}" style="--i:${Math.min(i, 8)}">
    <div class="mk-card-img">${mkImg(l, "mk-img")}<span class="mk-price">${mkMoney(l.room.rentAmount)}<small>/ month</small></span></div>
    <div class="mk-card-body">
      <div class="mk-eyebrow">${escapeHtml(l.prop.type)} · available</div>
      <h3>${escapeHtml(l.room.roomNumber)} — ${escapeHtml(l.prop.name)}</h3>
      <div class="mk-loc">${icon("mappin", 14)} ${escapeHtml(l.prop.address || "Location on request")}</div>
    </div></article>`;
}

function mkGridHtml() {
  const list = mkFiltered();
  if (!list.length)
    return `<div class="mk-empty"><h3>Nothing matches just yet</h3><p>Try a different search or price range — new rooms are listed all the time.</p></div>`;
  return list.map(mkCard).join("");
}

function mkBrowse() {
  const m = State.market;
  if (m.sel) {
    const l = mkFind(m.sel);
    if (l) return mkDetail(l);
    m.sel = null;
  }
  const sel = (v, cur, t) => `<option value="${v}" ${cur === v ? "selected" : ""}>${t}</option>`;
  return `
    <section class="mk-hero">
      <div class="mk-eyebrow">Now letting</div>
      <h1>Find a place that feels like <em>home</em>.</h1>
      <p>Browse available rooms, apartments and houses. Tap one you love, book it and pay.</p>
    </section>
    <div class="mk-search">
      <label>${icon("search", 18)}<input data-mk="q" placeholder="Search by area, property or room" value="${escapeHtml(m.q)}" autocomplete="off"></label>
      <select data-mk="price" aria-label="Price">
        ${sel("all", m.price, "Any price")}${sel("lt500", m.price, "Under GHS 500")}${sel("500-1000", m.price, "GHS 500 – 1,000")}${sel("gt1000", m.price, "Over GHS 1,000")}
      </select>
      <select data-mk="sort" aria-label="Sort">
        ${sel("new", m.sort, "Newest")}${sel("low", m.sort, "Price: low to high")}${sel("high", m.sort, "Price: high to low")}
      </select>
    </div>
    <section class="mk-section">
      <div class="mk-section-head">
        <div><div class="mk-eyebrow">Available to rent</div><h2>Homes ready for you</h2></div>
        <div class="mk-count" id="mkCount">${mkFiltered().length} available</div>
      </div>
      <div class="mk-grid" id="mkGrid">${mkGridHtml()}</div>
    </section>`;
}

function mkDetail(l) {
  const ph = mkPhotos(l);
  const main = ph.length ? `<img class="mk-img" id="mkMain" src="${ph[Math.min(State.market.img, ph.length - 1)]}" alt="">` : `<div class="mk-img mk-ph" style="min-height:320px">${icon("home", 52)}</div>`;
  const thumbs = ph.length > 1
    ? `<div class="mk-thumbs">${ph.map((s, i) => `<button class="${i === State.market.img ? "on" : ""}" data-mk="img" data-i="${i}"><img src="${s}" alt=""></button>`).join("")}</div>` : "";
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(l.prop.address || l.prop.name);
  return `
  <section class="mk-section mk-detail">
    <button class="mk-back" data-mk="back">${icon("chevron", 14)} All homes</button>
    <div class="mk-detail-grid">
      <div>
        <div class="mk-gallery-main" data-mk="zoom">${main}</div>${thumbs}
        <div class="mk-eyebrow" style="margin-top:34px">${escapeHtml(l.prop.type)}</div>
        <h1>${escapeHtml(l.room.roomNumber)} — ${escapeHtml(l.prop.name)}</h1>
        <div class="mk-loc">${icon("mappin", 15)} ${escapeHtml(l.prop.address || "Location on request")}
          &nbsp;·&nbsp;<a href="${maps}" target="_blank" rel="noopener" style="color:var(--rust-dark)">View on map</a></div>
        <div class="mk-facts">
          <div><span>Rent</span><b>${mkMoney(l.room.rentAmount)} / mo</b></div>
          <div><span>Type</span><b>${escapeHtml(l.prop.type)}</b></div>
          <div><span>Listed by</span><b>${escapeHtml(l.agent)}</b></div>
          <div><span>Status</span><b>Available now</b></div>
        </div>
        <div class="mk-desc">${escapeHtml(l.room.description || l.prop.notes || "A well-kept place, ready for you to move in. Book it now to secure it.")}</div>
      </div>
      <aside class="mk-book">
        <div class="amt">${mkMoney(l.room.rentAmount)} <small>/ month</small></div>
        <p>Pay your first month's rent to book. The room is reserved for you immediately, and your rent notices and bills will appear in your tenant account.</p>
        <button class="mk-cta" data-mk="book" data-key="${l.key}">Book this room</button>
      </aside>
    </div>
  </section>`;
}

const mkFooter = () => `<footer class="mk-footer">&copy; Big Family Tech, 2026. All rights reserved.</footer>`;

function renderMarketPublic() {
  return `<header class="mk-nav">
      <div class="mk-brand"><img src="icon.png" alt="">LANDLORD</div>
      <div class="mk-nav-r"><button class="mk-link" data-mk="staff">Landlords &amp; agents</button><button class="mk-pill" data-mk="signin">Tenant sign in</button></div>
    </header>${mkBrowse()}${mkFooter()}`;
}

/* ---------------- booking / payment modal ---------------- */
function mkRenderModal() {
  let root = document.getElementById("mkModal");
  if (!root) { root = document.createElement("div"); root.id = "mkModal"; document.body.appendChild(root); }
  const b = State.market.book;
  if (!b) { root.className = ""; root.innerHTML = ""; return; }
  root.className = "mk-modal";
  root.innerHTML = `<div class="mk-backdrop" data-mk="close"></div>
    <div class="mk-sheet" role="dialog" aria-modal="true"><button class="mk-x" data-mk="close" aria-label="Close">${icon("x", 16)}</button>${mkSheet(b)}</div>`;
}

function mkSheet(b) {
  const err = b.err ? `<div class="mk-err">${escapeHtml(b.err)}</div>` : "";
  const sum = `<div class="mk-sum"><div>${escapeHtml(b.title)}<br><span style="color:var(--ink-soft)">${escapeHtml(b.sub || "")}</span></div><b>${mkMoney(b.amount)}</b></div>`;
  const demo = PAY_DEMO ? `<div class="mk-demo"><b>Demo mode:</b> this checkout is simulated — no real money is charged yet.</div>` : "";

  if (b.step === "auth") {
    const su = b.authMode === "signup";
    return `<div class="mk-eyebrow">Step 1 of 3</div><h2>${su ? "Create your tenant account" : "Welcome back"}</h2>${sum}${err}
      <form data-mkform="auth">
        ${su ? `<div class="lw-field"><label>Full name</label><input name="name" required></div>` : ""}
        <div class="lw-field"><label>Email</label><input type="email" name="email" required></div>
        ${su ? `<div class="lw-field"><label>Phone</label><input name="phone" placeholder="024..." required></div>` : ""}
        <div class="lw-field"><label>Password</label><input type="password" name="password" minlength="6" required></div>
        ${su ? `<div class="lw-field"><label>Confirm password</label><input type="password" name="confirm" minlength="6" required></div>` : ""}
        <button class="mk-cta" type="submit">${su ? "Create account & continue" : "Sign in & continue"}</button>
      </form>
      <button class="mk-switch" data-mk="authmode">${su ? "Already have an account? Sign in" : "New here? Create an account"}</button>`;
  }
  if (b.step === "details") {
    return `<div class="mk-eyebrow">Step 2 of 3</div><h2>Your details</h2>${sum}${err}
      <form data-mkform="details">
        <div class="lw-field"><label>Full name</label><input name="name" value="${escapeHtml(b.f.name || "")}" required></div>
        <div class="lw-field"><label>Phone</label><input name="phone" value="${escapeHtml(b.f.phone || "")}" placeholder="024..." required></div>
        <div class="lw-field"><label>Move-in date</label><input type="date" name="moveIn" min="${todayISO()}" value="${escapeHtml(b.f.moveIn || todayISO())}" required></div>
        <button class="mk-cta" type="submit">Continue to payment</button>
      </form>`;
  }
  if (b.step === "pay") {
    const card = b.method === "Card";
    return `<div class="mk-eyebrow">${b.mode === "book" ? "Step 3 of 3" : "Pay rent"}</div><h2>Payment</h2>${sum}${demo}${err}
      <form data-mkform="pay" id="mkPayForm">
        <div class="mk-methods">${Pay.methods.map((m) => `<button type="button" class="mk-method ${b.method === m ? "on" : ""}" data-mk="method" data-v="${m}">${m}</button>`).join("")}</div>
        <div class="lw-field"><label>${card ? "Card number" : "Mobile money number"}</label>
          <input name="acct" value="${escapeHtml(b.acct || "")}" inputmode="numeric" required minlength="${card ? 12 : 10}" placeholder="${card ? "0000 0000 0000 0000" : "024 000 0000"}"></div>
        <button class="mk-cta" type="submit">Pay ${mkMoney(b.amount)}</button>
      </form>
      <p class="mk-note">${b.mode === "book" ? "Your room is reserved the moment payment succeeds." : "A receipt is saved to your account."}</p>`;
  }
  if (b.step === "processing")
    return `<div class="mk-center"><div class="mk-spin"></div><h2>Processing payment…</h2><p class="mk-note">Please don't close this window.</p></div>`;
  return `<div class="mk-center"><div class="mk-check">${icon("check", 34)}</div>
    <h2>${b.mode === "book" ? "You're a tenant!" : "Rent paid"}</h2>
    <p class="mk-note" style="font-size:13.5px">${escapeHtml(b.title)} · ${mkMoney(b.amount)}<br>Reference <b>${escapeHtml(b.ref)}</b></p>
    <button class="mk-cta" style="margin-top:22px" data-mk="finish">Go to my home</button></div>`;
}

/* ---------------- tenant data + portal ---------------- */
function mkTenancies(acct) {
  return (acct.tenancies || []).map((t, i) => {
    const d = mkReadNs(t.ns);
    const tn = d.tenants.find((x) => x.id === t.tenantId);
    if (!tn) return null;
    const prop = d.properties.find((p) => p.id === tn.propertyId) || {};
    return {
      i, ns: t.ns, tn, prop,
      room: d.rooms.find((r) => r.id === tn.roomId) || {},
      bills: d.utilities.filter((u) => u.propertyId === prop.id),
      pays: d.payments.filter((p) => p.tenantId === tn.id),
      msgs: d.messages.filter((m) => m.tenantId === tn.id),
    };
  }).filter(Boolean);
}

function mkRentState(tn) {
  const d = daysUntil(tn.rentDue);
  if (tn.paymentStatus !== "paid" || (d !== null && d <= 0))
    return d !== null && d < 0 ? { k: "overdue", t: Math.abs(d) + " days overdue", pay: true } : { k: "unpaid", t: d === 0 ? "Due today" : "Rent due", pay: true };
  if (d !== null && d <= 7) return { k: "unpaid", t: "Due in " + d + " day" + (d === 1 ? "" : "s"), pay: true };
  return { k: "paid", t: "Paid · next due " + fmtDate(tn.rentDue), pay: false };
}

function renderTenantShell(account) {
  const items = [["home", "My home", "home"], ["bills", "Bills & notices", "bell"], ["payments", "Payments", "receipt"], ["browse", "Browse homes", "search"], ["profile", "Profile", "settings"]];
  return `<aside class="lw-sidebar">
      <div class="lw-brand"><div class="lw-brand-mark"><img class="lw-brand-logo" src="icon.png" alt=""><h1>LANDLORD</h1></div><div class="lw-brand-sub">tenant account</div></div>
      <nav class="lw-nav">${items.map(([k, label, ic]) => `<div class="lw-nav-item ${State.tenantPage === k ? "active" : ""}" data-mk="tnav" data-page="${k}">${icon(ic, 16)}<span>${label}</span></div>`).join("")}</nav>
      <div class="lw-sidebar-foot"><div class="lw-account-row"><span title="${escapeHtml(account.email)}">${escapeHtml(account.name)}</span><button class="lw-btn ghost small" data-action="logout">Log out</button></div>
      <div class="lw-copyright">&copy; Big Family Tech, 2026. All rights reserved.</div></div>
    </aside><main class="lw-main" id="main"></main>`;
}

function renderTenantPage(account) {
  const p = State.tenantPage;
  if (p === "browse") return `<div class="mk-embed">${mkBrowse()}</div>`;
  if (p === "profile") return renderProfilePage();
  const ts = mkTenancies(account);
  if (p === "bills") return mkTenantBills(ts);
  if (p === "payments") return mkTenantPayments(ts);
  return mkTenantHome(ts, account);
}

function mkTenantHome(ts, account) {
  if (!ts.length)
    return `${pageHeader("Welcome, " + escapeHtml(account.name.split(" ")[0]))}${panel(null, `<div class="lw-empty" style="padding:50px 10px"><div style="font-family:var(--serif);font-size:28px;color:var(--ink);margin-bottom:8px">You're not renting yet</div>Find a home you love and book it in minutes.<br><br><button class="lw-btn primary" data-mk="tnav" data-page="browse">Browse available homes</button></div>`)}`;
  return pageHeader("My home") + ts.map((t) => {
    const s = mkRentState(t.tn);
    const cover = t.prop.photos && t.prop.photos.length ? `<img class="mk-img" src="${t.prop.photos[0]}" alt="">` : `<div class="mk-img mk-ph">${icon("home", 44)}</div>`;
    return `<div class="mk-home-card">${cover}<div class="mk-home-body">
      <div class="mk-eyebrow">${escapeHtml(t.prop.type || "home")}</div>
      <h3>${escapeHtml(t.room.roomNumber || "Room")} — ${escapeHtml(t.prop.name || "")}</h3>
      <div class="mk-loc">${icon("mappin", 14)} ${escapeHtml(t.prop.address || "")}</div>
      <div class="mk-rentrow"><div><span>Monthly rent</span><b>${mkMoney(t.tn.rentAmount)}</b></div><div><span>Next due</span><b>${fmtDate(t.tn.rentDue)}</b></div><div><span>Status</span>${badge(s.k, s.t)}</div></div>
      ${s.pay ? `<button class="lw-btn primary" data-mk="payrent" data-i="${t.i}">${icon("card", 14)} Pay rent</button>` : `<span style="color:var(--moss);font-size:13px">${icon("check", 14)} You're all paid up</span>`}
    </div></div>`;
  }).join("");
}

function mkTenantBills(ts) {
  if (!ts.length) return pageHeader("Bills & notices") + panel(null, `<div class="lw-empty">Once you've booked a home, your rent notices and bills appear here.</div>`);
  return pageHeader("Bills & notices") + ts.map((t) => {
    const s = mkRentState(t.tn);
    const notices = [];
    if (s.pay) notices.push({ k: s.k, ic: "alert", title: "Rent: " + s.t, body: `${mkMoney(t.tn.rentAmount)} for ${t.room.roomNumber || "your room"} is due on ${fmtDate(t.tn.rentDue)}.`, date: t.tn.rentDue });
    t.bills.filter((b) => b.status !== "paid").forEach((b) => notices.push({ k: "unpaid", ic: "zap", title: `${b.type[0].toUpperCase() + b.type.slice(1)} bill`, body: `${mkMoney(b.amount)} due ${fmtDate(b.dueDate)}.`, date: b.dueDate }));
    t.msgs.slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).forEach((m) => notices.push({ k: "", ic: "mail", title: "Message from your landlord", body: m.body, date: m.date }));
    const nHtml = notices.length ? notices.map((n) => `<div class="mk-notice ${n.k}"><div class="mk-n-ico">${icon(n.ic, 17)}</div><div><b>${escapeHtml(n.title)}</b><p>${escapeHtml(n.body)}</p><span>${fmtDate(n.date)}</span></div></div>`).join("") : `<div class="lw-empty">No notices — you're all caught up.</div>`;
    const rows = t.bills.length ? t.bills.slice().sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || "")).map((b) => `<tr><td style="text-transform:capitalize">${escapeHtml(b.type)}</td><td>${mkMoney(b.amount)}</td><td>${fmtDate(b.dueDate)}</td><td>${badge(b.status, b.status)}</td></tr>`).join("") : emptyRow(4, "No bills logged for this property.");
    return `${panel("Rent notices · " + escapeHtml(t.prop.name || ""), nHtml)}${panel("Utility bills · " + escapeHtml(t.prop.name || ""), `<table class="lw-table"><thead><tr><th>Type</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`)}`;
  }).join("");
}

function mkTenantPayments(ts) {
  const all = ts.flatMap((t) => t.pays.map((p) => Object.assign({ place: (t.room.roomNumber || "") + " · " + (t.prop.name || "") }, p))).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const rows = all.length ? all.map((p) => `<tr><td>${fmtDate(p.date)}</td><td>${escapeHtml(p.place)}</td><td style="text-transform:capitalize">${escapeHtml(p.kind)}</td><td>${escapeHtml(p.method)}</td><td class="lw-mono" style="font-size:12px">${escapeHtml(p.ref)}</td><td>${mkMoney(p.amount)}</td></tr>`).join("") : emptyRow(6, "No payments yet.");
  return pageHeader("Payments") + panel("Receipts", `<table class="lw-table"><thead><tr><th>Date</th><th>For</th><th>Type</th><th>Method</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>`);
}

/* ---------------- manager: Payments page ---------------- */
function renderPaymentsPage() {
  const pays = Store.get("payments").slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const total = pays.reduce((s, p) => s + Number(p.amount || 0), 0);
  const rows = pays.length ? pays.map((p) => {
    const t = Store.find("tenants", p.tenantId), r = Store.find("rooms", p.roomId);
    return `<tr><td>${fmtDate(p.date)}</td><td>${escapeHtml(t ? t.name : "—")}</td><td>${escapeHtml(propertyName(p.propertyId))}${r ? " · " + escapeHtml(r.roomNumber) : ""}</td><td style="text-transform:capitalize">${escapeHtml(p.kind)}</td><td>${escapeHtml(p.method)}</td><td class="lw-mono" style="font-size:12px">${escapeHtml(p.ref)}</td><td>${GHS(p.amount)}</td></tr>`;
  }).join("") : emptyRow(7, "No online payments yet. They appear here when tenants book or pay rent in the app.");
  return `${pageHeader("Payments")}<div class="lw-stats">${statCard("Collected online", GHS(total), "moss")}${statCard("Payments", pays.length, "")}</div>
    ${panel("Tenant payments", `<table class="lw-table"><thead><tr><th>Date</th><th>Tenant</th><th>Property</th><th>Type</th><th>Method</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>`)}`;
}

/* ---------------- commits (write into the manager's data slice) ---------------- */
function mkCommitBooking(l, acct, f, pay) {
  const d = mkReadNs(l.ns);
  const room = d.rooms.find((r) => r.id === l.room.id);
  if (!room || room.status !== "vacant") throw new Error("Sorry — this room was just taken. Please choose another.");
  const tid = Store.uid();
  d.tenants.push({ id: tid, propertyId: l.prop.id, roomId: room.id, name: f.name, phone: f.phone, email: acct.email, rentAmount: room.rentAmount, rentStart: f.moveIn, rentDue: addMonth(f.moveIn), paymentStatus: "paid", accountId: acct.id, source: "marketplace" });
  room.status = "occupied";
  d.payments.push({ id: Store.uid(), tenantId: tid, propertyId: l.prop.id, roomId: room.id, accountId: acct.id, amount: Number(room.rentAmount) || 0, method: pay.method, ref: pay.ref, date: todayISO(), kind: "first month rent" });
  mkWriteNs(l.ns, d);
  acct.tenancies = (acct.tenancies || []).concat([{ ns: l.ns, tenantId: tid }]);
  acct.phone = f.phone;
  Auth.saveAccounts();
}

function mkCommitRent(t, acct, pay) {
  const d = mkReadNs(t.ns);
  const tn = d.tenants.find((x) => x.id === t.tn.id);
  if (!tn) throw new Error("Your tenancy could not be found.");
  tn.paymentStatus = "paid";
  tn.rentDue = addMonth(tn.rentDue);
  d.payments.push({ id: Store.uid(), tenantId: tn.id, propertyId: tn.propertyId, roomId: tn.roomId, accountId: acct.id, amount: Number(tn.rentAmount) || 0, method: pay.method, ref: pay.ref, date: todayISO(), kind: "rent" });
  mkWriteNs(t.ns, d);
}

/* ---------------- events ---------------- */
function mkCapture() {
  const b = State.market.book, f = document.getElementById("mkPayForm");
  if (b && f) b.acct = f.elements.acct.value;
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-mk]");
  if (!el) return;
  const m = State.market, act = el.dataset.mk;
  const acct = Auth.currentAccount();
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  switch (act) {
    case "home": State.auth.screen = "market"; m.sel = null; render(); break;
    case "staff": State.auth.screen = "roleSelect"; State.auth.error = ""; render(); break;
    case "signin": State.auth.screen = "tenant"; State.auth.mode = "login"; State.auth.error = ""; render(); break;
    case "open": m.sel = el.dataset.key; m.img = 0; render(); top(); break;
    case "back": m.sel = null; render(); top(); break;
    case "tnav": State.tenantPage = el.dataset.page; if (el.dataset.page === "browse") m.sel = null; render(); break;
    case "img": {
      m.img = Number(el.dataset.i);
      const l = mkFind(m.sel), main = document.getElementById("mkMain");
      if (l && main) main.src = mkPhotos(l)[m.img];
      document.querySelectorAll(".mk-thumbs button").forEach((b, i) => b.classList.toggle("on", i === m.img));
      break;
    }
    case "zoom": { const i = document.getElementById("mkMain"); if (i) openLightbox(i.src); break; }
    case "book": {
      const l = mkFind(el.dataset.key);
      if (!l) break;
      const isTenant = acct && acct.role === "tenant";
      m.book = { mode: "book", key: l.key, step: isTenant ? "details" : "auth", authMode: "signup", method: Pay.methods[0], amount: Number(l.room.rentAmount) || 0, title: `${l.room.roomNumber} — ${l.prop.name}`, sub: "First month's rent", f: isTenant ? { name: acct.name, phone: acct.phone || "" } : {} };
      mkRenderModal();
      break;
    }
    case "payrent": {
      const t = mkTenancies(acct).find((x) => x.i === Number(el.dataset.i));
      if (!t) break;
      m.book = { mode: "rent", idx: t.i, step: "pay", method: Pay.methods[0], amount: Number(t.tn.rentAmount) || 0, title: `${t.room.roomNumber || "Room"} — ${t.prop.name || ""}`, sub: "Monthly rent", f: {} };
      mkRenderModal();
      break;
    }
    case "authmode": m.book.authMode = m.book.authMode === "signup" ? "login" : "signup"; m.book.err = ""; mkRenderModal(); break;
    case "method": mkCapture(); m.book.method = el.dataset.v; mkRenderModal(); break;
    case "close": if (m.book && m.book.step !== "processing") { m.book = null; mkRenderModal(); } break;
    case "finish": m.book = null; State.tenantPage = "home"; m.sel = null; mkRenderModal(); render(); top(); break;
  }
});

document.addEventListener("input", (e) => {
  if (e.target.dataset.mk !== "q") return;
  State.market.q = e.target.value;
  mkRefreshGrid();
});
document.addEventListener("change", (e) => {
  const k = e.target.dataset && e.target.dataset.mk;
  if (k === "price" || k === "sort") { State.market[k] = e.target.value; mkRefreshGrid(); }
});
function mkRefreshGrid() {
  const g = document.getElementById("mkGrid"), c = document.getElementById("mkCount");
  if (g) g.innerHTML = mkGridHtml();
  if (c) c.textContent = mkFiltered().length + " available";
}

document.addEventListener("submit", async (e) => {
  const form = e.target.closest("form[data-mkform]");
  if (!form) return;
  e.preventDefault();
  const m = State.market, b = m.book;
  if (!b) return;
  const data = Object.fromEntries(new FormData(form).entries());
  b.err = "";
  const kind = form.dataset.mkform;

  if (kind === "auth") {
    try {
      if (b.authMode === "signup") {
        if (data.password !== data.confirm) throw new Error("Passwords don't match.");
        await Auth.signup({ role: "tenant", name: data.name, email: data.email, password: data.password, extra: { phone: data.phone || "", tenancies: [] } });
      }
      const acct = await Auth.login({ email: data.email, password: data.password, role: "tenant" });
      b.step = "details";
      b.f = { name: acct.name, phone: acct.phone || "" };
      State.tenantPage = "browse";
      render();
    } catch (err) { b.err = err.message || "Something went wrong."; }
    mkRenderModal();
    return;
  }

  if (kind === "details") { b.f = data; b.step = "pay"; mkRenderModal(); return; }

  if (kind === "pay") {
    b.acct = data.acct;
    b.step = "processing";
    mkRenderModal();
    try {
      const acct = Auth.currentAccount();
      const pay = Object.assign({ method: b.method }, await Pay.process({ amount: b.amount, method: b.method, account: data.acct }));
      if (b.mode === "book") {
        const l = mkFind(b.key);
        if (!l) throw new Error("Sorry — this room was just taken. Please choose another.");
        mkCommitBooking(l, acct, b.f, pay);
      } else {
        mkCommitRent(mkTenancies(acct).find((x) => x.i === b.idx), acct, pay);
      }
      b.ref = pay.ref;
      b.step = "done";
    } catch (err) { b.err = err.message || "Payment failed."; b.step = "pay"; }
    mkRenderModal();
  }
});


/* ============================================================================
   PART 03 of 08  >>>  listings.js
   LISTINGS
   Managers / partners post rooms, houses, land for rent or sale with photos.
   (original file: listings.js)
   ============================================================================ */

/* ======================================================================
   LANDLORD — listings.js  (load AFTER market.js)
   Lets managers and SaaS partners post rooms / houses / land FOR RENT or
   FOR SALE with price, location and photos. They appear on the public
   homepage next to the rooms the app already lists.
   ====================================================================== */
Object.assign(ICON_PATHS, {
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
});
const LS_CATS = ["Single room", "Chamber & hall", "Self-contained", "Apartment", "House", "Land / plot", "Shop / commercial"];
State.ls = { editing: null, photos: [] };
State.market.purpose = "all";

/* ---- data + navigation ---- */
const _lsEmpty = emptyData;
emptyData = function () { return Object.assign(_lsEmpty(), { listings: [] }); };
NAV.splice(3, 0, { key: "listings", label: "Listings", icon: "tag" });
const _lsPage = renderPage;
renderPage = function () { return State.page === "listings" ? renderListingsPage() : _lsPage(); };

/* ---- manager / SaaS partner page ---- */
const lsMoney = (L) => mkMoney(L.price) + (L.purpose === "rent" ? `<small> / ${L.period === "year" ? "year" : "month"}</small>` : "");
const lsImg = (L) => (L.photos && L.photos.length ? `<img src="${L.photos[0]}" alt="" loading="lazy">` : `<div class="ls-ph">${icon("home", 34)}</div>`);

function renderListingsPage() {
  if (State.ls.editing) return lsForm();
  const all = Store.get("listings").slice().reverse(), ro = Store.readOnly;
  const live = all.filter((x) => x.status === "active");
  const add = ro ? "" : `<button class="lw-btn primary" data-ls="new">${icon("plus", 14)} Add listing</button>`;
  const cards = all.map((L) => `<article class="ls-card ${L.status === "active" ? "" : "off"}">
      <div class="ls-cimg">${lsImg(L)}<span class="ls-tag ${L.purpose}">For ${L.purpose}</span>${L.status === "active" ? "" : `<span class="ls-tag off">${L.purpose === "sale" ? "Sold" : "Taken"}</span>`}</div>
      <div class="ls-cbody"><div class="ls-cat">${escapeHtml(L.category)}</div><h3>${escapeHtml(L.title)}</h3>
        <p class="ls-loc">${icon("mappin", 13)} ${escapeHtml(L.location)}</p><div class="ls-price">${lsMoney(L)}</div>
        ${ro ? "" : `<div class="ls-actions"><button class="lw-btn small" data-ls="edit" data-id="${L.id}">Edit</button>
          <button class="lw-btn small" data-ls="toggle" data-id="${L.id}">${L.status === "active" ? (L.purpose === "sale" ? "Mark sold" : "Mark taken") : "Relist"}</button>
          <button class="lw-btn small ghost" data-ls="del" data-id="${L.id}">Delete</button></div>`}</div></article>`).join("");
  return pageHeader("Listings", "Post rooms, houses and land for rent or sale. Live listings appear on the public homepage with your price, location and photos.", add) +
    `<div class="lw-stats">${statCard("Live listings", live.length, "")}${statCard("For rent", live.filter((x) => x.purpose === "rent").length, "moss")}${statCard("For sale", live.filter((x) => x.purpose === "sale").length, "")}</div>` +
    (all.length ? `<div class="ls-grid">${cards}</div>` : panel(null, `<div class="lw-empty" style="padding:48px 10px"><div style="font-family:var(--serif);font-size:28px;margin-bottom:8px">No listings yet</div>Add your first room, house or plot. It goes live on the homepage immediately.${ro ? "" : `<br><br><button class="lw-btn primary" data-ls="new">${icon("plus", 14)} Add listing</button>`}</div>`));
}

function lsThumbs() {
  const p = State.ls.photos;
  return p.length ? `<div class="lw-photo-thumbs">${p.map((s, i) => `<div class="lw-thumb-wrap"><img class="lw-thumb" src="${s}" alt=""><button type="button" class="lw-thumb-remove" data-ls="rmphoto" data-i="${i}" title="Remove">${icon("x", 11)}</button></div>`).join("")}</div>` : `<div style="font-size:11px;color:var(--ink-soft);margin-top:4px">No photos yet. Listings with photos get far more interest.</div>`;
}

function lsForm() {
  const id = State.ls.editing, L = id === "new" ? { purpose: "rent", period: "month", category: LS_CATS[0], phone: (Auth.currentAccount() || {}).phone || "" } : Store.find("listings", id) || {};
  const opt = (v, cur) => `<option ${v === cur ? "selected" : ""}>${v}</option>`;
  const body = `<form data-lsform="1" class="ls-form">
    <div class="lw-field"><label>Listing title</label><input name="title" required maxlength="80" placeholder="e.g. Spacious self-contained near Tamale Central" value="${escapeHtml(L.title || "")}"></div>
    <div class="ls-row"><div class="lw-field"><label>For</label><select name="purpose" data-ls="purposesel"><option value="rent" ${L.purpose === "rent" ? "selected" : ""}>Rent</option><option value="sale" ${L.purpose === "sale" ? "selected" : ""}>Sale</option></select></div>
      <div class="lw-field"><label>Type</label><select name="category">${LS_CATS.map((c) => opt(c, L.category)).join("")}</select></div></div>
    <div class="ls-row"><div class="lw-field"><label>Price (GHS)</label><input name="price" type="number" min="1" step="any" required value="${L.price || ""}"></div>
      <div class="lw-field" id="lsPeriod" style="${L.purpose === "sale" ? "display:none" : ""}"><label>Rent is paid</label><select name="period"><option value="month" ${L.period !== "year" ? "selected" : ""}>Per month</option><option value="year" ${L.period === "year" ? "selected" : ""}>Per year</option></select></div></div>
    <div class="lw-field"><label>Location</label><input name="location" required placeholder="Area, town, landmark" value="${escapeHtml(L.location || "")}"></div>
    <div class="lw-field"><label>Contact phone (buyers and tenants call or WhatsApp this number)</label><input name="phone" inputmode="tel" required placeholder="024 000 0000" value="${escapeHtml(L.phone || "")}"></div>
    <div class="lw-field"><label>Description</label><textarea name="description" rows="4" placeholder="Size, features, water and electricity, documents for land, terms...">${escapeHtml(L.description || "")}</textarea></div>
    <div class="lw-field"><label>Photos</label><input type="file" accept="image/*" multiple data-ls="photoinput"><div id="lsThumbs">${lsThumbs()}</div></div>
    <div class="ls-btns"><button class="lw-btn primary" type="submit">${id === "new" ? "Publish listing" : "Save changes"}</button><button class="lw-btn" type="button" data-ls="cancel">Cancel</button></div></form>`;
  return pageHeader(id === "new" ? "New listing" : "Edit listing", "Add the price and location exactly as you want people to see them.") + panel(null, body);
}

/* ---- events ---- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-ls]");
  if (!el || el.tagName === "INPUT" || el.tagName === "SELECT") return;
  const a = el.dataset.ls, id = el.dataset.id, ls = State.ls;
  if (a === "new") { ls.editing = "new"; ls.photos = []; }
  else if (a === "edit") { ls.editing = id; ls.photos = (Store.find("listings", id).photos || []).slice(); }
  else if (a === "cancel") { ls.editing = null; }
  else if (a === "toggle") { const L = Store.find("listings", id); Store.update("listings", id, { status: L.status === "active" ? "closed" : "active" }); }
  else if (a === "del") { if (!confirm("Delete this listing?")) return; Store.remove("listings", id); }
  else if (a === "rmphoto") { ls.photos.splice(Number(el.dataset.i), 1); document.getElementById("lsThumbs").innerHTML = lsThumbs(); return; }
  else if (a === "purpose") { State.market.purpose = el.dataset.v; State.market.sel = null; }
  else return;
  render();
  if (a === "new" || a === "edit") window.scrollTo({ top: 0 });
});
document.addEventListener("change", (e) => {
  const t = e.target;
  if (!t.dataset || !t.dataset.ls) return;
  if (t.dataset.ls === "purposesel") document.getElementById("lsPeriod").style.display = t.value === "sale" ? "none" : "";
  if (t.dataset.ls === "photoinput") {
    const files = Array.from(t.files || []); t.value = "";
    Promise.all(files.map((f) => resizeImageFile(f, 900, 0.72))).then((u) => { State.ls.photos = State.ls.photos.concat(u); document.getElementById("lsThumbs").innerHTML = lsThumbs(); })
      .catch(() => alert("One of those photos couldn't be read. Try a different file."));
  }
});
document.addEventListener("submit", (e) => {
  const f = e.target.closest("form[data-lsform]");
  if (!f) return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f).entries());
  const rec = { title: d.title.trim(), purpose: d.purpose, category: d.category, price: Number(d.price) || 0, period: d.purpose === "rent" ? d.period : "", location: d.location.trim(), phone: d.phone.trim(), description: d.description.trim(), photos: State.ls.photos.slice() };
  if (State.ls.editing === "new") Store.add("listings", Object.assign(rec, { status: "active", createdAt: new Date().toISOString() }));
  else Store.update("listings", State.ls.editing, rec);
  State.ls.editing = null;
  render();
}, true);

/* ---- public marketplace: merge listings with the rooms the app already shows ---- */
function lsPublic() {
  const out = [], seen = new Set();
  Auth.accounts.forEach((a) => {
    if (!a.dataNamespace || (a.role !== "manager" && a.role !== "saas") || seen.has(a.dataNamespace)) return;
    seen.add(a.dataNamespace);
    (mkReadNs(a.dataNamespace).listings || []).forEach((L) => {
      if (L.status !== "active") return;
      out.push({ key: a.dataNamespace + "|" + L.id, ns: a.dataNamespace, kind: "listing", L, purpose: L.purpose, price: Number(L.price) || 0, agent: a.businessName || a.name,
        room: { id: L.id, roomNumber: L.title, rentAmount: L.price, description: L.description },
        prop: { name: L.category, type: L.category, address: L.location, photos: L.photos || [], notes: L.description } });
    });
  });
  return out;
}
const _lsList = mkListings;
mkListings = function () {
  return _lsList().map((l) => Object.assign(l, { purpose: "rent", price: Number(l.room.rentAmount) || 0 })).concat(lsPublic());
};
mkFiltered = function () {
  const m = State.market, q = m.q.trim().toLowerCase();
  const list = mkListings().filter((l) => {
    if (m.purpose !== "all" && l.purpose !== m.purpose) return false;
    if (l.purpose === "rent") {
      if (m.price === "lt500" && l.price >= 500) return false;
      if (m.price === "500-1000" && (l.price < 500 || l.price > 1000)) return false;
      if (m.price === "gt1000" && l.price <= 1000) return false;
    }
    return !q || [l.prop.name, l.prop.address, l.room.roomNumber, l.prop.type].join(" ").toLowerCase().includes(q);
  });
  if (m.sort === "low") list.sort((a, b) => a.price - b.price);
  if (m.sort === "high") list.sort((a, b) => b.price - a.price);
  if (m.sort === "new") list.sort((a, b) => ((b.L && b.L.createdAt) || "").localeCompare((a.L && a.L.createdAt) || ""));
  return list;
};
const _lsCard = mkCard;
mkCard = function (l, i) {
  if (l.kind !== "listing") return _lsCard(l, i).replace("· available", "· for rent");
  return `<article class="mk-card" data-mk="open" data-key="${l.key}" style="--i:${Math.min(i, 8)}">
    <div class="mk-card-img">${mkImg(l, "mk-img")}<span class="mk-badge ${l.purpose}">For ${l.purpose}</span><span class="mk-price">${lsMoney(l.L)}</span></div>
    <div class="mk-card-body"><div class="mk-eyebrow">${escapeHtml(l.L.category)}</div><h3>${escapeHtml(l.L.title)}</h3>
    <div class="mk-loc">${icon("mappin", 14)} ${escapeHtml(l.L.location)}</div></div></article>`;
};
const _lsDetail = mkDetail;
mkDetail = function (l) {
  if (l.kind !== "listing") return _lsDetail(l);
  const L = l.L, ph = mkPhotos(l), ix = Math.min(State.market.img, Math.max(ph.length - 1, 0));
  const main = ph.length ? `<img class="mk-img" id="mkMain" src="${ph[ix]}" alt="">` : `<div class="mk-img mk-ph" style="min-height:320px">${icon("home", 52)}</div>`;
  const thumbs = ph.length > 1 ? `<div class="mk-thumbs">${ph.map((s, i) => `<button class="${i === ix ? "on" : ""}" data-mk="img" data-i="${i}"><img src="${s}" alt=""></button>`).join("")}</div>` : "";
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(L.location);
  let n = String(L.phone || "").replace(/\D/g, ""); if (n.startsWith("0")) n = "233" + n.slice(1);
  const msg = encodeURIComponent(`Hello, I'm interested in "${L.title}" (${mkMoney(L.price)}) listed on LANDLORD.`);
  const contact = n ? `<a class="mk-cta" href="tel:+${n}">${icon("phone", 15)} Call ${escapeHtml(l.agent)}</a><a class="mk-cta ghost" target="_blank" rel="noopener" href="https://wa.me/${n}?text=${msg}">Message on WhatsApp</a>` : `<p class="mk-note">The agent hasn't added a phone number yet.</p>`;
  return `<section class="mk-section mk-detail"><button class="mk-back" data-mk="back">${icon("chevron", 14)} All homes</button>
    <div class="mk-detail-grid"><div><div class="mk-gallery-main" data-mk="zoom">${main}</div>${thumbs}
      <div class="mk-eyebrow" style="margin-top:34px">${escapeHtml(L.category)} · for ${L.purpose}</div><h1>${escapeHtml(L.title)}</h1>
      <div class="mk-loc">${icon("mappin", 15)} ${escapeHtml(L.location)} &nbsp;·&nbsp;<a href="${maps}" target="_blank" rel="noopener" style="color:var(--rust-dark)">View on map</a></div>
      <div class="mk-facts"><div><span>${L.purpose === "sale" ? "Price" : "Rent"}</span><b>${mkMoney(L.price)}${L.purpose === "rent" ? " / " + (L.period === "year" ? "yr" : "mo") : ""}</b></div><div><span>Type</span><b>${escapeHtml(L.category)}</b></div><div><span>Listed by</span><b>${escapeHtml(l.agent)}</b></div><div><span>Status</span><b>Available</b></div></div>
      <div class="mk-desc">${escapeHtml(L.description || "Contact the agent for full details and to arrange a viewing.")}</div></div>
    <aside class="mk-book"><div class="amt">${mkMoney(L.price)} <small>${L.purpose === "sale" ? "asking price" : "/ " + (L.period === "year" ? "year" : "month")}</small></div>
      <p>${L.purpose === "sale" ? "Speak to the agent to arrange a viewing and agree the sale." : "Speak to the agent to arrange a viewing and move in."}</p>${contact}</aside></div></section>`;
};
const _lsBrowse = mkBrowse;
mkBrowse = function () {
  const h = _lsBrowse();
  if (h.indexOf('class="mk-hero"') < 0) return h;
  const cur = State.market.purpose || "all";
  const chips = `<div class="mk-chips">${[["all", "All homes"], ["rent", "For rent"], ["sale", "For sale"]].map(([v, t]) => `<button class="mk-chip ${cur === v ? "on" : ""}" data-ls="purpose" data-v="${v}">${t}</button>`).join("")}</div>`;
  return h.replace('<section class="mk-section">', chips + '<section class="mk-section">').replace("Available to rent", "Available now");
};


/* ============================================================================
   PART 04 of 08  >>>  features.js
   FEATURES
   Maintenance, rent tracking, leases, inspections, notifications, financial dashboard, team roles.
   (original file: features.js)
   ============================================================================ */

/* ======================================================================
   LANDLORD — features.js  (load AFTER listings.js)
   Maintenance, rent tracking, tenant portal extras, leases & documents,
   inspections, notifications, financial dashboard, team roles & access.
   ====================================================================== */
(function () {
  "use strict";
  Object.assign(ICON_PATHS, {
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 14l2 2 4-4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  });

  /* ---- data ---- */
  const _e = emptyData;
  emptyData = function () { return Object.assign(_e(), { maintenance: [], leases: [], documents: [], inspections: [] }); };

  /* ---- roles & access (enforced in this browser; see README) ---- */
  const ROLES = {
    accountant: { label: "Accountant", pages: ["dashboard", "notifications", "payments", "finance", "utilities", "construction", "profile"] },
    caretaker: { label: "Caretaker", pages: ["dashboard", "notifications", "maintenance", "inspections", "directions", "profile"] },
    agent: { label: "Leasing agent", pages: ["dashboard", "notifications", "properties", "listings", "tenants", "leases", "documents", "maintenance", "messaging", "directions", "profile"] },
    viewer: { label: "View only", ro: true, pages: ["dashboard", "notifications", "properties", "tenants", "payments", "finance", "maintenance", "leases", "inspections", "utilities", "construction", "profile"] },
  };
  Object.assign(ROLE_META, { staff: { title: "Team member", blurb: "You work with a landlord or agent. Log in with the details they gave you." } });
  const me = () => Auth.currentAccount() || {};
  const canSee = (k) => { const a = me(); if (a.role !== "staff") return true; const r = ROLES[a.staffRole]; return !!r && r.pages.includes(k); };
  const _sl = Store.load;
  Store.load = function () { const d = _sl.call(this), a = me(); if (a.role === "staff" && (ROLES[a.staffRole] || {}).ro) this.readOnly = true; return d; };
  const _ab = accountBadgeText;
  accountBadgeText = function (a) { return a.role === "staff" ? "team \u00b7 " + ((ROLES[a.staffRole] || {}).label || "") : _ab(a); };
  const _ras = renderAuthScreen;
  renderAuthScreen = function () { return State.auth.screen === "staff" ? renderRoleAuthForm("staff") : _ras(); };
  const _raf = renderRoleAuthForm;
  renderRoleAuthForm = function (r) {
    if (r !== "staff") return _raf(r);
    State.auth.mode = "login";
    return _raf(r).replace(/<button type="button" class="lw-auth-toggle"[\s\S]*?<\/button>/, "");
  };
  AUTH_FORM_TYPES.add("staff-login");
  const _has = handleAuthSubmit;
  handleAuthSubmit = async function (t, f) {
    if (t !== "staff-login") return _has(t, f);
    const d = Object.fromEntries(new FormData(f).entries());
    State.auth.error = ""; State.auth.busy = true; render();
    try { await Auth.login({ email: d.email, password: d.password, role: "staff" }); } catch (x) { State.auth.error = x.message; }
    State.auth.busy = false; render();
  };
  const _ard = accountRoleDescription;
  accountRoleDescription = function (a) { return a.role === "staff" ? "You're a team member (" + ((ROLES[a.staffRole] || {}).label || "") + ") \u2014 you see the pages your role allows." : _ard(a); };

  /* ---- tiny helpers ---- */
  const FX = { ed: {}, file: null, err: "", range: 6 };
  const COL = { maint: "maintenance", lease: "leases", doc: "documents", insp: "inspections" };
  const $ = escapeHtml, ro = () => Store.readOnly, cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : "");
  const tnm = (id) => { const t = Store.find("tenants", id); return t ? t.name : "\u2014"; };
  const roomOf = (id) => { const r = Store.find("rooms", id); return r ? r.roomNumber : ""; };
  const sel = (n, o, cur, req) => `<select name="${n}" ${req ? "required" : ""}>${o.map((x) => { const [v, t] = Array.isArray(x) ? x : [x, cap(String(x))]; return `<option value="${$(v)}" ${String(v) === String(cur) ? "selected" : ""}>${$(t)}</option>`; }).join("")}</select>`;
  const fld = (l, h, full) => `<div class="lw-field" ${full ? 'style="grid-column:1/-1"' : ""}><label>${l}</label>${h}</div>`;
  const inp = (n, v, t, x) => `<input name="${n}" type="${t || "text"}" value="${$(v == null ? "" : v)}" ${x || ""}>`;
  const propOpts = () => [["", "Select\u2026"]].concat(Store.get("properties").map((p) => [p.id, p.name]));
  const tenOpts = (none) => [["", none || "Select\u2026"]].concat(Store.get("tenants").map((t) => [t.id, t.name + " \u00b7 " + propertyName(t.propertyId)]));
  const form = (k, e, f, label) => `<form class="lw-form" data-fxform="${k}" data-id="${e === "new" ? "" : e}">${f.join("")}<div class="lw-form-actions"><button class="lw-btn primary" type="submit">${label}</button><button class="lw-btn" type="button" data-fx="cancel" data-k="${k}">${icon("x", 14)} Cancel</button></div></form>`;
  const acts = (k, id, x) => (ro() ? "" : `<div class="lw-table-actions">${x || ""}<button class="lw-btn ghost small" data-fx="edit" data-k="${k}" data-id="${id}" title="Edit">${icon("pencil", 13)}</button><button class="lw-btn ghost small" data-fx="del" data-k="${k}" data-id="${id}" title="Delete">${icon("trash", 13)}</button></div>`);
  const tbl = (h, rows, n) => `<table class="lw-table"><thead><tr>${h.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows || emptyRow(h.length, n)}</tbody></table>`;
  const frame = (k, title, add, f, body, stats) => pageHeader(title, "", ro() || !add ? "" : `<button class="lw-btn primary" data-fx="add" data-k="${k}">${icon("plus", 15)} ${add}</button>`) + (stats ? `<div class="lw-stats">${stats}</div>` : "") + (FX.ed[k] ? f : "") + body;
  const printBtn = (a, id) => `<button class="lw-btn ghost small" data-fx="${a}" data-id="${id}" title="Print">${icon("receipt", 13)}</button>`;
  function printDoc(t, h) {
    const w = window.open("", "_blank");
    if (!w) { alert("Allow pop-ups to print this."); return; }
    w.document.write(`<!doctype html><title>${$(t)}</title><style>body{font:15px/1.6 Georgia,serif;color:#111;max-width:720px;margin:40px auto;padding:0 20px}h1{font-size:26px}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ccc;padding:8px;text-align:left}</style>${h}`);
    w.document.close(); w.focus(); setTimeout(() => w.print(), 300);
  }

  /* ---- maintenance ---- */
  const PRI = { urgent: "overdue", high: "unpaid", medium: "planning", low: "building" }, ST = { open: "unpaid", "in progress": "planning", resolved: "paid" };
  function pgMaint() {
    const L = Store.get("maintenance").slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")), e = FX.ed.maint; let f = "";
    if (e) {
      const m = e === "new" ? { priority: "medium", status: "open" } : Store.find("maintenance", e) || {};
      f = form("maint", e, [fld("Issue", inp("title", m.title, "text", "required"), 1), fld("Property", sel("propertyId", propOpts(), m.propertyId, 1)), fld("Room / spot", inp("where", m.where)), fld("Priority", sel("priority", Object.keys(PRI), m.priority)), fld("Status", sel("status", Object.keys(ST), m.status)), fld("Assigned to", inp("assignee", m.assignee)), fld("Cost (GHS)", inp("cost", m.cost, "number", 'min="0" step="any"')), fld("Notes", `<textarea name="notes">${$(m.notes)}</textarea>`, 1)], e === "new" ? "Log request" : "Save changes");
    }
    const rows = L.map((m) => `<tr><td><b>${$(m.title)}</b><div class="fx-sub">${$(m.where || "")}${m.source === "tenant" ? " \u00b7 from tenant" : ""}</div></td><td>${$(propertyName(m.propertyId))}</td><td>${badge(PRI[m.priority] || "planning", m.priority)}</td><td>${badge(ST[m.status] || "unpaid", m.status)}</td><td>${m.cost ? GHS(m.cost) : "\u2014"}</td><td>${fmtDate(m.date)}</td><td>${acts("maint", m.id, m.status !== "resolved" && !ro() ? `<button class="lw-btn ghost small" data-fx="adv" data-id="${m.id}" title="Move to next stage">${icon("check", 13)}</button>` : "")}</td></tr>`).join("");
    const o = L.filter((m) => m.status !== "resolved");
    return frame("maint", "Maintenance", "New request", f, panel(`Requests (${L.length})`, tbl(["Issue", "Property", "Priority", "Status", "Cost", "Logged", ""], rows, "No maintenance requests yet.")),
      statCard("Open", o.length, "accent") + statCard("Urgent", o.filter((m) => m.priority === "urgent").length, "") + statCard("Resolved", L.length - o.length, "moss") + statCard("Repair cost", GHS(L.reduce((s, m) => s + (+m.cost || 0), 0)), "blue"));
  }

  /* ---- leases ---- */
  const lstate = (l) => { const d = daysUntil(l.end); return d === null ? ["planning", "No end date"] : d < 0 ? ["overdue", "Expired"] : d <= 60 ? ["unpaid", "Ends in " + d + "d"] : ["paid", "Active"]; };
  function pgLease() {
    const L = Store.get("leases"), e = FX.ed.lease; let f = "";
    if (e) {
      const l = e === "new" ? { start: todayISO() } : Store.find("leases", e) || {};
      f = form("lease", e, [fld("Tenant", sel("tenantId", tenOpts(), l.tenantId, 1)), fld("Deposit (GHS)", inp("deposit", l.deposit, "number", 'min="0" step="any"')), fld("Start date", inp("start", l.start, "date", "required")), fld("End date", inp("end", l.end, "date", "required")), fld("Terms", `<textarea name="terms" placeholder="Notice period, rules, what the rent covers\u2026">${$(l.terms)}</textarea>`, 1)], e === "new" ? "Save lease" : "Save changes");
    }
    const rows = L.map((l) => { const t = Store.find("tenants", l.tenantId) || {}, s = lstate(l); return `<tr><td>${$(tnm(l.tenantId))}</td><td>${$(propertyName(t.propertyId))} \u00b7 ${$(roomOf(t.roomId))}</td><td>${fmtDate(l.start)} \u2192 ${fmtDate(l.end)}</td><td>${l.deposit ? GHS(l.deposit) : "\u2014"}</td><td>${badge(s[0], s[1])}</td><td>${acts("lease", l.id, printBtn("plead", l.id))}</td></tr>`; }).join("");
    return frame("lease", "Leases", "Add lease", f, panel(`Leases (${L.length})`, tbl(["Tenant", "Home", "Period", "Deposit", "Status", ""], rows, "No leases yet. Add one for each tenant.")),
      statCard("Active", L.filter((l) => lstate(l)[0] === "paid").length, "moss") + statCard("Ending soon", L.filter((l) => lstate(l)[0] === "unpaid").length, "accent") + statCard("Expired", L.filter((l) => lstate(l)[0] === "overdue").length, ""));
  }
  function printLease(id) {
    const l = Store.find("leases", id), t = Store.find("tenants", l.tenantId) || {}, p = Store.find("properties", t.propertyId) || {}, a = me();
    printDoc("Tenancy agreement", `<h1>Tenancy agreement</h1><p>Made between <b>${$(a.businessName || a.name)}</b> (landlord or agent) and <b>${$(t.name)}</b> (tenant) for <b>${$(roomOf(t.roomId) || "the room")}</b> at <b>${$(p.name)}</b>${p.address ? ", " + $(p.address) : ""}.</p><table><tr><td>Rent</td><td>${GHS(t.rentAmount)} per month</td></tr><tr><td>Starts</td><td>${fmtDate(l.start)}</td></tr><tr><td>Ends</td><td>${fmtDate(l.end)}</td></tr><tr><td>Deposit</td><td>${GHS(l.deposit)}</td></tr></table><h3>Terms</h3><p style="white-space:pre-line">${$(l.terms || "As agreed between the parties.")}</p><br><br><p>Landlord: ____________________ &nbsp;&nbsp; Tenant: ____________________</p>`);
  }

  /* ---- documents ---- */
  function pgDocs() {
    const D = Store.get("documents").slice().reverse(), e = FX.ed.doc; let f = "";
    if (e) {
      const d = e === "new" ? { shared: "yes" } : Store.find("documents", e) || {};
      f = form("doc", e, [fld("Title", inp("title", d.title, "text", "required"), 1), fld("Category", sel("category", ["Lease", "ID", "Receipt", "Notice", "Other"], d.category)), fld("Tenant (optional)", sel("tenantId", tenOpts("Not linked"), d.tenantId)), fld("Visible to that tenant", sel("shared", [["yes", "Yes"], ["no", "No"]], d.shared)), fld("File (max 1.5 MB)", `<input type="file" data-fx="docfile"><div class="fx-file" id="fxFile">${$(FX.file ? FX.file.name : d.name || "No file chosen")}</div>`)], e === "new" ? "Save document" : "Save changes");
    }
    const rows = D.map((d) => `<tr><td><b>${$(d.title)}</b></td><td>${$(d.category)}</td><td>${d.tenantId ? $(tnm(d.tenantId)) : "\u2014"}${d.tenantId && d.shared === "no" ? " (private)" : ""}</td><td>${fmtDate(d.date)}</td><td><a class="lw-btn ghost small" download="${$(d.name || "document")}" href="${d.data || "#"}">Download</a></td><td>${acts("doc", d.id)}</td></tr>`).join("");
    return frame("doc", "Documents", "Upload document", f, panel(`Documents (${D.length})`, tbl(["Title", "Type", "Tenant", "Added", "File", ""], rows, "No documents yet. Store IDs, signed leases and notices here.")));
  }

  /* ---- inspections ---- */
  const IT = ["Walls & paint", "Floor", "Doors & locks", "Windows", "Electrical & lights", "Plumbing & water", "Ceiling & roof", "Cleanliness"], CD = ["Good", "Fair", "Poor", "N/A"];
  const score = (x) => { const v = (x.items || []).filter((c) => c !== "N/A"); return v.length ? Math.round((v.filter((c) => c === "Good").length / v.length) * 100) : 0; };
  function pgInsp() {
    const L = Store.get("inspections").slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")), e = FX.ed.insp; let f = "";
    if (e) {
      const x = e === "new" ? { date: todayISO(), type: "Routine", items: [] } : Store.find("inspections", e) || { items: [] };
      f = form("insp", e, [fld("Room", sel("roomId", [["", "Select\u2026"]].concat(Store.get("rooms").map((r) => [r.id, r.roomNumber + " \u00b7 " + propertyName(r.propertyId)])), x.roomId, 1)), fld("Type", sel("type", ["Move-in", "Move-out", "Routine"].map((v) => [v, v]), x.type)), fld("Date", inp("date", x.date, "date", "required"))]
        .concat(IT.map((n, i) => fld(n, sel("i" + i, CD.map((v) => [v, v]), (x.items || [])[i] || "Good"))), [fld("Notes", `<textarea name="notes">${$(x.notes)}</textarea>`, 1)]), e === "new" ? "Save inspection" : "Save changes");
    }
    const rows = L.map((x) => { const s = score(x); return `<tr><td>${fmtDate(x.date)}</td><td>${$(roomOf(x.roomId))} \u00b7 ${$(propertyName((Store.find("rooms", x.roomId) || {}).propertyId))}</td><td>${$(x.type)}</td><td>${badge(s >= 80 ? "paid" : s >= 50 ? "planning" : "unpaid", s + "% good")}</td><td>${acts("insp", x.id, printBtn("pinsp", x.id))}</td></tr>`; }).join("");
    return frame("insp", "Inspections", "New inspection", f, panel(`Inspections (${L.length})`, tbl(["Date", "Room", "Type", "Condition", ""], rows, "No inspections yet. Record one at move-in so move-out is easy to compare.")));
  }
  function printInsp(id) {
    const x = Store.find("inspections", id);
    printDoc("Inspection report", `<h1>${$(x.type)} inspection</h1><p>${$(roomOf(x.roomId))}, ${fmtDate(x.date)} \u2014 ${score(x)}% of checked items in good condition.</p><table>${IT.map((n, i) => `<tr><td>${n}</td><td>${$((x.items || [])[i] || "")}</td></tr>`).join("")}</table><p style="white-space:pre-line">${$(x.notes)}</p>`);
  }

  /* ---- rent tracking (extends Payments) ---- */
  function arrears() {
    const T = Store.get("tenants").map((t) => ({ t, d: daysUntil(t.rentDue) })).filter((x) => x.d !== null && x.d < 0).sort((a, b) => a.d - b.d);
    const rows = T.map(({ t, d }) => `<tr><td>${$(t.name)}</td><td>${$(propertyName(t.propertyId))} \u00b7 ${$(roomOf(t.roomId))}</td><td>${GHS(t.rentAmount)}</td><td>${badge("overdue", -d + "d overdue")}</td><td><div class="lw-table-actions"><button class="lw-btn ghost small" data-fx="go" data-p="messaging">${icon("mail", 13)} Remind</button></div></td></tr>`).join("");
    return panel(`Rent arrears (${T.length})`, tbl(["Tenant", "Home", "Rent", "Late by", ""], rows, "Nobody is behind on rent."));
  }
  function recordForm() {
    if (!FX.ed.pay) return "";
    return form("pay", "new", [fld("Tenant", sel("tenantId", tenOpts(), "", 1)), fld("Amount (GHS)", inp("amount", "", "number", 'min="1" step="any" required')), fld("Method", sel("method", ["Cash", "MTN MoMo", "Telecel Cash", "AirtelTigo Money", "Bank transfer"].map((v) => [v, v]))), fld("Date", inp("date", todayISO(), "date", "required")), fld("Applies to", sel("kind", [["rent", "Monthly rent (moves due date forward)"], ["deposit", "Deposit"], ["other", "Other"]])), fld("Reference", inp("ref", "", "text", 'placeholder="Optional"'))], "Record payment");
  }
  const _pp = renderPaymentsPage;
  renderPaymentsPage = function () {
    const add = ro() ? "" : `<button class="lw-btn primary" data-fx="add" data-k="pay">${icon("plus", 15)} Record payment</button>`;
    return pageHeader("Payments", "", add) + recordForm() + arrears() + _pp().replace(/<div class="lw-header">[\s\S]*?<\/div>/, "");
  };

  /* ---- financial dashboard ---- */
  const monthsBack = (n) => { const a = [], d = new Date(); for (let i = n - 1; i >= 0; i--) { const x = new Date(d.getFullYear(), d.getMonth() - i, 1); a.push(x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0")); } return a; };
  const mlabel = (m) => new Date(m + "-01T00:00:00").toLocaleDateString("en-GB", { month: "short" });
  function money() {
    const k = (d) => (d || "").slice(0, 7);
    return {
      inc: Store.get("payments").map((p) => ({ d: k(p.date), a: +p.amount || 0, p: p.propertyId })),
      exp: [].concat(Store.get("expenses").map((e) => ({ d: k(e.date), a: +e.amount || 0, p: e.propertyId })), Store.get("utilities").filter((u) => u.status === "paid").map((u) => ({ d: k(u.dueDate), a: +u.amount || 0, p: u.propertyId })), Store.get("maintenance").filter((m) => +m.cost).map((m) => ({ d: k(m.date), a: +m.cost, p: m.propertyId }))),
    };
  }
  const sum = (a, f) => a.filter(f).reduce((s, x) => s + x.a, 0);
  function pgFin() {
    const n = FX.range, ms = monthsBack(n), { inc, exp } = money(), inR = (x) => ms.includes(x.d);
    const mi = ms.map((m) => sum(inc, (x) => x.d === m)), me2 = ms.map((m) => sum(exp, (x) => x.d === m)), I = sum(inc, inR), E = sum(exp, inR);
    const T = Store.get("tenants"), expected = T.reduce((s, t) => s + (+t.rentAmount || 0), 0), rate = expected ? Math.min(100, Math.round((mi[n - 1] / expected) * 100)) : 0;
    const late = T.filter((t) => { const d = daysUntil(t.rentDue); return d !== null && d < 0; }).reduce((s, t) => s + (+t.rentAmount || 0), 0);
    const W = 640, H = 220, pad = 24, mx = Math.max(1, ...mi, ...me2), bw = (W - pad * 2) / n, bar = (v) => (v / mx) * (H - 60);
    const svg = `<svg class="fx-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Income and spending by month">${ms.map((m, i) => { const x = pad + i * bw; return `<rect x="${x + bw * 0.12}" y="${H - 30 - bar(mi[i])}" width="${bw * 0.36}" height="${bar(mi[i])}" rx="3" fill="var(--blueprint)"/><rect x="${x + bw * 0.52}" y="${H - 30 - bar(me2[i])}" width="${bw * 0.36}" height="${bar(me2[i])}" rx="3" fill="var(--rust)"/><text x="${x + bw / 2}" y="${H - 10}" text-anchor="middle" font-size="12" fill="var(--ink-soft)">${mlabel(m)}</text>`; }).join("")}</svg><div class="fx-legend"><span><i style="background:var(--blueprint)"></i>Income</span><span><i style="background:var(--rust)"></i>Spending</span></div>`;
    const rows = Store.get("properties").map((p) => { const a = sum(inc, (x) => inR(x) && x.p === p.id), b = sum(exp, (x) => inR(x) && x.p === p.id); return `<tr><td>${$(p.name)}</td><td>${GHS(a)}</td><td>${GHS(b)}</td><td><b style="color:${a - b < 0 ? "var(--rust-dark)" : "var(--moss)"}">${GHS(a - b)}</b></td></tr>`; }).join("");
    const rng = [6, 12].map((v) => `<button class="lw-btn small ${n === v ? "primary" : ""}" data-fx="range" data-n="${v}">${v} months</button>`).join("");
    return pageHeader("Financials", "", `<div class="fx-bar">${rng}<button class="lw-btn small" data-fx="csv">Export CSV</button></div>`) +
      `<div class="lw-stats">${statCard("Income", GHS(I), "moss")}${statCard("Spending", GHS(E), "accent")}${statCard("Net", GHS(I - E), I - E < 0 ? "accent" : "blue")}${statCard("Collected this month", rate + "%", "")}${statCard("Rent in arrears", GHS(late), "accent")}</div>` +
      panel("Income and spending", svg) + panel("By property", tbl(["Property", "Income", "Spending", "Net"], rows, "Add a property to see its results."));
  }
  function csv() {
    const ms = monthsBack(FX.range), { inc, exp } = money();
    const t = "Month,Income,Spending,Net\n" + ms.map((m) => { const a = sum(inc, (x) => x.d === m), b = sum(exp, (x) => x.d === m); return [m, a, b, a - b].join(","); }).join("\n");
    const l = document.createElement("a"); l.href = URL.createObjectURL(new Blob([t], { type: "text/csv" })); l.download = "landlord-financials.csv"; l.click();
  }

  /* ---- notifications ---- */
  function notes() {
    const n = [], dis = Store.data.settings.dismissed || [];
    Store.get("tenants").forEach((t) => { const d = daysUntil(t.rentDue); if (d === null) return; const w = propertyName(t.propertyId) + " \u00b7 " + GHS(t.rentAmount);
      if (d < 0) n.push({ id: "r" + t.id + t.rentDue, s: 0, k: "overdue", ic: "alert", t: `${t.name}'s rent is ${-d} day${d === -1 ? "" : "s"} overdue`, b: w, p: "payments" });
      else if (d <= 7) n.push({ id: "r" + t.id + t.rentDue, s: 2, k: "unpaid", ic: "card", t: `${t.name}'s rent is due ${d ? "in " + d + " days" : "today"}`, b: w, p: "messaging" }); });
    Store.get("utilities").forEach((u) => { if (u.status === "paid") return; const d = daysUntil(u.dueDate); if (d !== null && d <= 7) n.push({ id: "u" + u.id + u.dueDate, s: d < 0 ? 1 : 2, k: d < 0 ? "overdue" : "unpaid", ic: "zap", t: `${cap(u.type)} bill ${d < 0 ? "is overdue" : "is due soon"}`, b: propertyName(u.propertyId) + " \u00b7 " + GHS(u.amount), p: "utilities" }); });
    Store.get("leases").forEach((l) => { const d = daysUntil(l.end); if (d !== null && d <= 60) n.push({ id: "l" + l.id + l.end, s: d < 0 ? 1 : 3, k: d < 0 ? "overdue" : "unpaid", ic: "file", t: `${tnm(l.tenantId)}'s lease ${d < 0 ? "has expired" : "ends in " + d + " days"}`, b: "Review or renew the agreement", p: "leases" }); });
    Store.get("maintenance").forEach((m) => { if (m.status === "open" && (m.priority === "urgent" || m.priority === "high" || m.source === "tenant")) n.push({ id: "m" + m.id, s: m.priority === "urgent" ? 0 : 2, k: m.priority === "urgent" ? "overdue" : "unpaid", ic: "wrench", t: (m.source === "tenant" ? "New tenant request: " : "Open repair: ") + m.title, b: propertyName(m.propertyId), p: "maintenance" }); });
    return n.filter((x) => !dis.includes(x.id)).sort((a, b) => a.s - b.s);
  }
  function pgNotes() {
    const N = notes();
    const list = N.map((x) => `<div class="mk-notice ${x.k}"><div class="mk-n-ico">${icon(x.ic, 17)}</div><div style="flex:1"><b>${$(x.t)}</b><p>${$(x.b)}</p></div><div class="lw-table-actions"><button class="lw-btn ghost small" data-fx="go" data-p="${x.p}">Open</button><button class="lw-btn ghost small" data-fx="dismiss" data-id="${$(x.id)}" title="Dismiss">${icon("x", 13)}</button></div></div>`).join("");
    return pageHeader("Notifications", "", N.length ? `<button class="lw-btn small" data-fx="dismissall">Clear all</button>` : "") + panel(null, list || `<div class="lw-empty" style="padding:44px 10px">Nothing needs your attention right now.</div>`);
  }

  /* ---- team & access ---- */
  function pgTeam() {
    const a = me(), S = Auth.accounts.filter((x) => x.role === "staff" && x.dataNamespace === a.dataNamespace);
    const err = FX.err ? `<div class="lw-auth-error" style="margin-bottom:12px">${$(FX.err)}</div>` : "";
    const f = FX.ed.team ? err + form("team", "new", [fld("Name", inp("name", "", "text", "required")), fld("Email", inp("email", "", "email", "required")), fld("Password (share it with them)", inp("password", "", "text", 'minlength="6" required')), fld("Role", sel("role", Object.keys(ROLES).map((k) => [k, ROLES[k].label])))], "Add team member") : "";
    const rows = S.map((x) => `<tr><td>${$(x.name)}</td><td>${$(x.email)}</td><td>${badge("building", (ROLES[x.staffRole] || {}).label || "")}</td><td><div class="lw-table-actions"><button class="lw-btn ghost small" data-fx="rmstaff" data-id="${x.id}">${icon("trash", 13)}</button></div></td></tr>`).join("");
    const guide = Object.keys(ROLES).map((k) => `<tr><td><b>${ROLES[k].label}</b></td><td>${ROLES[k].pages.filter((p) => !["profile", "notifications", "dashboard"].includes(p)).map(cap).join(", ")}${ROLES[k].ro ? " (cannot edit)" : ""}</td></tr>`).join("");
    return pageHeader("Team & access", "", `<button class="lw-btn primary" data-fx="add" data-k="team">${icon("plus", 15)} Add team member</button>`) + f + panel(`Team (${S.length})`, tbl(["Name", "Email", "Role", ""], rows, "No team members yet.")) + panel("What each role can open", `<table class="lw-table"><tbody>${guide}</tbody></table>`);
  }
  async function addStaff(d) {
    try {
      if (!ROLES[d.role]) throw new Error("Choose a role.");
      const a = await Auth.signup({ role: "staff", name: d.name, email: d.email, password: d.password });
      a.dataNamespace = me().dataNamespace; a.staffRole = d.role; Auth.saveAccounts(); FX.ed.team = null; FX.err = "";
    } catch (x) { FX.err = x.message; }
    render();
  }

  /* ---- tenant portal extras ---- */
  const _ts = renderTenantShell;
  renderTenantShell = function (a) {
    const it = [["maint", "Maintenance", "wrench"], ["docs", "Documents", "file"]].map(([k, l, i]) => `<div class="lw-nav-item ${State.tenantPage === k ? "active" : ""}" data-mk="tnav" data-page="${k}">${icon(i, 16)}<span>${l}</span></div>`).join("");
    return _ts(a).replace("</nav>", it + "</nav>");
  };
  const _tp = renderTenantPage;
  renderTenantPage = function (a) { const p = State.tenantPage; return p === "maint" ? tMaint(a) : p === "docs" ? tDocs(a) : _tp(a); };
  function tMaint(a) {
    const ts = mkTenancies(a);
    if (!ts.length) return pageHeader("Maintenance") + panel(null, `<div class="lw-empty">Book a home first. Then you can report problems here.</div>`);
    const f = `<form class="lw-form" data-fxform="tmaint">${fld("Home", sel("i", ts.map((t) => [t.i, (t.room.roomNumber || "Room") + " \u2014 " + (t.prop.name || "")])))}${fld("Priority", sel("priority", ["low", "medium", "high", "urgent"], "medium"))}${fld("What needs fixing?", inp("title", "", "text", 'required maxlength="90"'), 1)}${fld("Details", `<textarea name="notes" placeholder="Where is it, and since when?"></textarea>`, 1)}<div class="lw-form-actions"><button class="lw-btn primary" type="submit">Send request</button></div></form>`;
    const L = ts.flatMap((t) => mkReadNs(t.ns).maintenance.filter((m) => m.tenantId === t.tn.id)).sort((x, y) => (y.date || "").localeCompare(x.date || ""));
    const rows = L.map((m) => `<tr><td><b>${$(m.title)}</b></td><td>${badge(PRI[m.priority] || "planning", m.priority)}</td><td>${badge(ST[m.status] || "unpaid", m.status)}</td><td>${fmtDate(m.date)}</td></tr>`).join("");
    return pageHeader("Maintenance") + panel("Report a problem", f) + panel("Your requests", tbl(["Issue", "Priority", "Status", "Sent"], rows, "No requests yet."));
  }
  function tenantMaint(d) {
    const t = mkTenancies(me()).find((x) => x.i === +d.i); if (!t) return;
    const db = mkReadNs(t.ns);
    db.maintenance.push({ id: Store.uid(), title: d.title.trim(), notes: d.notes, priority: d.priority, status: "open", date: todayISO(), tenantId: t.tn.id, propertyId: t.tn.propertyId, where: t.room.roomNumber || "", source: "tenant" });
    mkWriteNs(t.ns, db); render();
  }
  function tDocs(a) {
    const ts = mkTenancies(a);
    if (!ts.length) return pageHeader("Documents") + panel(null, `<div class="lw-empty">Your lease and documents appear here once you have a home.</div>`);
    return pageHeader("Documents") + ts.map((t) => {
      const db = mkReadNs(t.ns), ls = db.leases.filter((l) => l.tenantId === t.tn.id), ds = db.documents.filter((x) => x.tenantId === t.tn.id && x.shared !== "no");
      const lr = ls.map((l) => { const s = lstate(l); return `<tr><td>${fmtDate(l.start)} \u2192 ${fmtDate(l.end)}</td><td>${l.deposit ? mkMoney(l.deposit) : "\u2014"}</td><td>${badge(s[0], s[1])}</td></tr>`; }).join("");
      const dr = ds.map((x) => `<tr><td><b>${$(x.title)}</b></td><td>${$(x.category)}</td><td>${fmtDate(x.date)}</td><td><a class="lw-btn ghost small" download="${$(x.name || "document")}" href="${x.data || "#"}">Download</a></td></tr>`).join("");
      const h = (t.room.roomNumber || "Room") + " \u00b7 " + (t.prop.name || "");
      return panel("Lease \u00b7 " + $(h), tbl(["Period", "Deposit", "Status"], lr, "No lease has been added yet.")) + panel("Documents \u00b7 " + $(h), tbl(["Title", "Type", "Added", ""], dr, "Nothing shared with you yet."));
    }).join("");
  }

  /* ---- navigation, pages, access ---- */
  const at = (k, ...it) => NAV.splice(NAV.findIndex((n) => n.key === k) + 1, 0, ...it);
  at("dashboard", { key: "notifications", label: "Notifications", icon: "bell" });
  at("tenants", { key: "leases", label: "Leases", icon: "file" }, { key: "maintenance", label: "Maintenance", icon: "wrench" }, { key: "inspections", label: "Inspections", icon: "clip" }, { key: "documents", label: "Documents", icon: "file" });
  at("payments", { key: "finance", label: "Financials", icon: "chart" });
  at("directions", { key: "team", label: "Team & access", icon: "shield" });
  const PAGES = { notifications: pgNotes, leases: pgLease, maintenance: pgMaint, inspections: pgInsp, documents: pgDocs, finance: pgFin, team: pgTeam };
  const _rp = renderPage;
  renderPage = function () {
    const k = State.page;
    if (!canSee(k)) return pageHeader("No access") + panel(null, `<div class="lw-empty">Your role doesn't include this page.</div>`);
    return PAGES[k] ? PAGES[k]() : _rp();
  };
  const _rn = renderNav;
  renderNav = function () {
    let h = _rn();
    NAV.forEach((n) => { if (!canSee(n.key)) h = h.replace(new RegExp('<div class="lw-nav-item [^"]*" data-action="nav" data-page="' + n.key + '">[\\s\\S]*?</div>'), ""); });
    const c = notes().length;
    return c ? h.replace("<span>Notifications</span>", '<span>Notifications</span><b class="fx-count">' + c + "</b>") : h;
  };

  /* ---- events ---- */
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-action="nav"]')) { FX.ed = {}; FX.err = ""; }
    const el = e.target.closest("[data-fx]");
    if (!el || el.tagName === "INPUT") return;
    const a = el.dataset.fx, k = el.dataset.k, id = el.dataset.id;
    if (a === "add") { FX.ed[k] = "new"; FX.file = null; FX.err = ""; }
    else if (a === "edit") { FX.ed[k] = id; FX.file = null; }
    else if (a === "cancel") FX.ed[k] = null;
    else if (a === "del") { if (!confirm("Delete this record?")) return; Store.remove(COL[k], id); }
    else if (a === "adv") { const m = Store.find("maintenance", id); Store.update("maintenance", id, { status: m.status === "open" ? "in progress" : "resolved" }); }
    else if (a === "plead") { printLease(id); return; }
    else if (a === "pinsp") { printInsp(id); return; }
    else if (a === "go") { State.page = el.dataset.p; State.editing = {}; }
    else if (a === "dismiss") Store.updateSettings({ dismissed: (Store.data.settings.dismissed || []).concat([id]) });
    else if (a === "dismissall") Store.updateSettings({ dismissed: (Store.data.settings.dismissed || []).concat(notes().map((x) => x.id)) });
    else if (a === "range") FX.range = +el.dataset.n;
    else if (a === "csv") { csv(); return; }
    else if (a === "rmstaff") { if (!confirm("Remove this team member?")) return; Auth.accounts = Auth.accounts.filter((x) => x.id !== id); Auth.saveAccounts(); }
    else return;
    render();
  });
  document.addEventListener("change", (e) => {
    if (e.target.dataset.fx !== "docfile") return;
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 1.5 * 1024 * 1024) { alert("That file is over 1.5 MB. Choose a smaller one."); e.target.value = ""; return; }
    const r = new FileReader();
    r.onload = () => { FX.file = { name: f.name, data: r.result }; const n = document.getElementById("fxFile"); if (n) n.textContent = f.name; };
    r.readAsDataURL(f);
  });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("form[data-fxform]"); if (!f) return;
    e.preventDefault();
    const k = f.dataset.fxform, id = f.dataset.id, d = Object.fromEntries(new FormData(f).entries());
    if (k === "tmaint") return tenantMaint(d);
    if (k === "team") return addStaff(d);
    if (k === "pay") {
      const t = Store.find("tenants", d.tenantId); if (!t) return;
      Store.add("payments", { tenantId: t.id, propertyId: t.propertyId, roomId: t.roomId, amount: +d.amount, method: d.method, ref: d.ref || "LL-" + Date.now().toString(36).toUpperCase(), date: d.date, kind: d.kind, source: "manual" });
      if (d.kind === "rent") Store.update("tenants", t.id, { paymentStatus: "paid", rentDue: addMonth(t.rentDue) });
    } else {
      if (k === "insp") { d.items = IT.map((_, i) => d["i" + i]); IT.forEach((_, i) => delete d["i" + i]); }
      if (k === "doc") { if (!FX.file && !id) { alert("Choose a file first."); return; } if (FX.file) { d.name = FX.file.name; d.data = FX.file.data; } d.date = todayISO(); }
      if (k === "maint" && !id) d.date = todayISO();
      if (id) Store.update(COL[k], id, d); else Store.add(COL[k], d);
    }
    FX.ed[k] = null; FX.file = null; render();
  });
})();


/* ============================================================================
   PART 05 of 08  >>>  extras.js
   PUBLIC SITE EXTRAS
   Hero, features strip, testimonials, FAQ, newsletter, footer, chat widget, welcome popup.
   (original file: extras.js)
   ============================================================================ */

/* ============================================================
   LANDLORD — extras.js
   Public-site features: hero, features strip, testimonials, FAQ,
   newsletter, footer, chat widget, welcome popup.
   Loads AFTER features.js.
   ============================================================ */

(function(){
  "use strict";

  /* ---------- 1. ICONS for the feature strip ---------- */
  const X_ICONS = {
    home:   '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    chart:  '<line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    users:  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    bolt:   '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    globe:  '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    phone:  '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail:   '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    x:      '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    check:  '<polyline points="20 6 9 17 4 12"/>',
  };
  const xi = (k, s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s||18}" height="${s||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${X_ICONS[k]||""}</svg>`;

  /* ---------- 2. Public content data ---------- */
  const VALUE_PROPS = [
    { i:"home",   t:"Manage every property", d:"Houses, plots, and construction sites — all in one place with photos, owners, and notes." },
    { i:"users",  t:"Track tenants & rent",  d:"Know who's paid, who's due, and who's late. Send SMS reminders in one tap." },
    { i:"chart",  t:"See your money clearly",d:"Income, spending, and per-property profit — updated live as you log expenses." },
    { i:"shield", t:"Owner portal included", d:"Give owners a read-only login so they can see their property any time, from anywhere." },
  ];

  const TESTIMONIALS = [
    { s:5, q:"I manage 14 houses across Tamale from Accra. LANDLORD replaced three notebooks and two WhatsApp groups.", n:"Ibrahim A.", r:"Property manager, Tamale" },
    { s:5, q:"The owner portal saved me hours every month. My clients finally trust the numbers because they can see them.", n:"Grace O.", r:"Agent, Kumasi" },
    { s:5, q:"Built my house from Canada. Logged every bag of cement, every receipt. No more phone calls to Ghana.", n:"Kofi B.", r:"Diaspora owner" },
  ];

  const FAQS = [
    { q:"Who is LANDLORD for?", a:"Landlords, property managers, agents, and diaspora owners who manage houses, plots, or construction sites in Ghana. Tenants get their own portal too." },
    { q:"Can I use it on my phone?", a:"Yes — LANDLORD is designed mobile-first. Add it to your home screen and it works like a native app, even on slow connections." },
    { q:"How do tenants receive rent reminders?", a:"Two ways: open your phone's Messages app with the reminder pre-filled (works immediately), or send bulk SMS through your own gateway (Arkesel, mNotify, Hubtel, etc.)." },
    { q:"Is my data safe?", a:"Right now everything is stored securely in your own browser — nothing leaves your device unless you send an SMS. A hosted version with encrypted cloud storage is coming." },
    { q:"How much does it cost?", a:"LANDLORD is free during early access. Paid plans for teams and bulk SMS will arrive later — current users keep free access." },
  ];

  /* ---------- 3. HTML blocks ---------- */

  function blockHero(){
    return `
      <section class="lx-hero">
        <div class="lx-eyebrow">Ghana · property, tenancy &amp; construction</div>
        <h1>Every house. Every tenant. <em>Every cedi.</em> One place.</h1>
        <p>LANDLORD helps you run your properties from anywhere in the world — track rent, bills, materials, and construction from your phone, in seconds.</p>
        <div class="lx-ctas">
          <a href="#" class="lx-cta primary" data-lx="cta-signup">
            ${xi("check",16)} Create free account
          </a>
          <a href="#lx-features" class="lx-cta ghost" data-lx="cta-explore">
            Explore features
          </a>
        </div>
      </section>`;
  }

  function blockFeatures(){
    return `
      <section class="lx-features" id="lx-features">
        ${VALUE_PROPS.map(f => `
          <article class="lx-feature">
            <div class="lx-feature-icon">${xi(f.i,22)}</div>
            <h3>${f.t}</h3>
            <p>${f.d}</p>
          </article>`).join("")}
      </section>`;
  }

  function blockTestimonials(){
    return `
      <section class="lx-testimonials">
        <div class="lx-section-head">
          <div class="lx-eyebrow">Loved by landlords</div>
          <h2>Real people. Real properties.</h2>
          <p>From single rooms to multi-site portfolios, LANDLORD keeps managers and owners on the same page.</p>
        </div>
        <div class="lx-testi-grid">
          ${TESTIMONIALS.map(t => `
            <article class="lx-testi">
              <div class="lx-stars">${"★".repeat(t.s)}${"☆".repeat(5-t.s)}</div>
              <p>“${t.q}”</p>
              <div class="lx-testi-who">
                <img class="lx-testi-avatar" loading="lazy" alt=""
                  src="https://i.pravatar.cc/96?u=${encodeURIComponent(t.n)}" />
                <div>
                  <div class="lx-testi-name">${t.n}</div>
                  <div class="lx-testi-role">${t.r}</div>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function blockFaq(){
    return `
      <section class="lx-faq">
        <div class="lx-section-head">
          <div class="lx-eyebrow">FAQ</div>
          <h2>Questions, answered.</h2>
        </div>
        ${FAQS.map((f,i) => `
          <details class="lx-faq-item" ${i===0?"open":""}>
            <summary>${f.q}</summary>
            <p>${f.a}</p>
          </details>`).join("")}
      </section>`;
  }

  function blockNewsletter(){
    return `
      <section class="lx-news">
        <h3>Get landlord tips &amp; updates</h3>
        <p>One short email a month. Product news, rent-collection advice, and diaspora-owner stories.</p>
        <form data-lx="news">
          <input type="email" name="email" placeholder="you@example.com" required />
          <button type="submit">Subscribe</button>
        </form>
        <div class="lx-msg" data-lx="news-msg"></div>
      </section>`;
  }

  function blockFooter(){
    const year = new Date().getFullYear();
    return `
      <footer class="lx-footer">
        <div class="lx-footer-grid">
          <div class="lx-footer-about">
            <div class="lx-footer-brand">
              <img src="icon.png" alt="LANDLORD" />
              LANDLORD
            </div>
            <p>Remote property, tenancy &amp; construction management — built for Ghana, for owners and managers who live anywhere.</p>
            <div class="lx-socials">
              <a href="https://wa.me/233000000000" target="_blank" rel="noopener" title="WhatsApp">${xi("phone",16)}</a>
              <a href="mailto:hello@landlord.app" title="Email">${xi("mail",16)}</a>
              <a href="#" title="Website">${xi("globe",16)}</a>
            </div>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#" data-lx="cta-signup">Sign up free</a>
            <a href="#lx-features">Features</a>
            <a href="#" data-mk="home">Browse homes</a>
            <a href="#" data-mk="signin">Tenant login</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#lx-faq">FAQ</a>
            <a href="mailto:hello@landlord.app">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div>
            <h4>Visit / Contact</h4>
            <div class="lx-footer-addr">${xi("globe",14)}<span>Big Family Tech<br>Tamale, Northern Region<br>Ghana</span></div>
            <div class="lx-footer-addr">${xi("mail",14)}<span>hello@landlord.app</span></div>
            <div class="lx-footer-addr">${xi("phone",14)}<span>+233 (0) 000 000 000</span></div>
          </div>
        </div>
        <div class="lx-footer-bottom">
          <div>&copy; ${year} Big Family Tech. All rights reserved.</div>
          <div>Made in Ghana 🇬🇭</div>
        </div>
      </footer>`;
  }

  function blockChat(){
    return `
      <button class="lx-chat-btn" data-lx="chat-open" aria-label="Open chat">
        <span class="lx-pulse"></span>
        ${xi("mail",22)}
      </button>
      <div class="lx-chat-panel" id="lxChatPanel">
        <div class="lx-chat-head">
          <div class="lx-avatar">${xi("check",18)}</div>
          <div>
            <b>LANDLORD assistant</b>
            <span>● Online · replies instantly</span>
          </div>
          <button class="lx-x" data-lx="chat-close" aria-label="Close">×</button>
        </div>
        <div class="lx-chat-body" id="lxChatBody">
          <div class="lx-msg-b bot">Hi! 👋 I can help with sign-up, pricing, SMS setup, or owner portals. What would you like to know?</div>
        </div>
        <div class="lx-chat-quick" id="lxChatQuick">
          <button data-lx="chat-q" data-q="How do I sign up?">How do I sign up?</button>
          <button data-lx="chat-q" data-q="Is it free?">Is it free?</button>
          <button data-lx="chat-q" data-q="How does SMS work?">How does SMS work?</button>
          <button data-lx="chat-q" data-q="Owner portal?">Owner portal?</button>
        </div>
        <form class="lx-chat-foot" data-lx="chat-form">
          <input name="msg" placeholder="Type a message…" autocomplete="off" />
          <button type="submit" aria-label="Send">${xi("mail",16)}</button>
        </form>
      </div>`;
  }

  function blockPopup(){
    return `
      <div class="lx-pop" id="lxPop">
        <div class="lx-pop-bg" data-lx="pop-close"></div>
        <div class="lx-pop-card">
          <div class="lx-badge2">New here?</div>
          <h3>Start managing in 60 seconds</h3>
          <p>Create a free account, add a property, and you're done. No credit card, no setup fee — just open LANDLORD and go.</p>
          <div class="lx-pop-btns">
            <button class="lx-pop-go" data-lx="pop-signup">Create free account</button>
            <button class="lx-pop-skip" data-lx="pop-close">Maybe later</button>
          </div>
        </div>
      </div>`;
  }

  /* ---------- 4. Chat brain (rule-based, zero API cost) ---------- */
  const CHAT_KB = [
    { k:["sign up","signup","sign-up","register","account","create"], a:"Tap <b>Create free account</b> on the homepage, pick Manager / SaaS Partner / Owner, and enter your name, email, and password. Takes about a minute. 🚀" },
    { k:["free","price","pricing","cost","pay","money","subscription"], a:"LANDLORD is <b>free during early access</b>. Paid plans for teams and bulk SMS come later — early users keep free access. 💚" },
    { k:["sms","message","text","remind","reminder","bulk"], a:"Two options:<br>1. <b>Device SMS</b> — opens your phone's Messages app pre-filled. Works instantly.<br>2. <b>Bulk gateway</b> — plug in Arkesel / mNotify / Hubtel and send to everyone at once." },
    { k:["owner portal","owner","landlord portal","share"], a:"On the Owners page, add the owner, then enter the email they signed up with. They get a read-only view of their property — tenants, bills, expenses, everything. 🔐" },
    { k:["tenant","renter"], a:"Tenants get their own portal: they see their room, rent due date, utility bills, and payment receipts. You can send them SMS reminders with one tap." },
    { k:["construction","build","materials","cement"], a:"Log every expense and every material (cement bags, blocks, rods) against the property. Owners see the running total in real time — no more phone calls to Ghana. 🏗" },
    { k:["payment","pay","momo","mobile money","card"], a:"Tenants can pay rent and bills directly in the app — MTN MoMo, Telecel Cash, AirtelTigo Money, or card. You see it in Payments instantly." },
    { k:["contact","human","call","email","support"], a:"You can reach us at <b>hello@landlord.app</b> or WhatsApp <b>+233 (0) 000 000 000</b>. We reply within a day." },
    { k:["ghana","country","region"], a:"LANDLORD is built in Tamale for Ghana — prices in GHS, phone numbers in local format, SMS via Ghanaian gateways." },
    { k:["hello","hi","hey","good morning","good evening","yo"], a:"Hello! 👋 Ask me anything about LANDLORD — signup, SMS, owners, payments, or pricing." },
  ];
  function chatReply(msg){
    const q = (msg||"").toLowerCase();
    for (const row of CHAT_KB){
      if (row.k.some(k => q.includes(k))) return row.a;
    }
    return "I'm not sure about that one yet — email <b>hello@landlord.app</b> or WhatsApp <b>+233 (0) 000 000 000</b> and a human will reply quickly.";
  }

  /* ---------- 5. Wire into the app: render public shell ---------- */
  const _renderMarket = renderMarketPublic;
  renderMarketPublic = function(){
    // Keep the existing marketplace grid, but wrap it with our extra sections.
    const inner = _renderMarket();
    return inner
      .replace("</header>", "</header>" + blockHero() + blockFeatures() + blockTestimonials())
      .replace(/<footer[\s\S]*?<\/footer>/, "")   // drop the old one-line footer
      + blockFaq() + blockNewsletter() + blockFooter() + blockChat() + blockPopup();
  };

  /* ---------- 6. Event handling ---------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-lx]");
    if (!el) return;
    const a = el.dataset.lx;

    if (a === "cta-signup" || a === "pop-signup"){
      e.preventDefault();
      State.auth.screen = "roleSelect";
      State.auth.error = "";
      const pop = document.getElementById("lxPop"); if (pop) pop.classList.remove("open");
      render();
      return;
    }
    if (a === "cta-explore"){
      e.preventDefault();
      const t = document.getElementById("lx-features");
      if (t) t.scrollIntoView({ behavior:"smooth", block:"start" });
      return;
    }
    if (a === "chat-open"){
      document.getElementById("lxChatPanel")?.classList.add("open");
      return;
    }
    if (a === "chat-close"){
      document.getElementById("lxChatPanel")?.classList.remove("open");
      return;
    }
    if (a === "chat-q"){
      const q = el.dataset.q || "";
      addChat("user", q);
      setTimeout(() => addChat("bot", chatReply(q)), 300);
      return;
    }
    if (a === "pop-close"){
      document.getElementById("lxPop")?.classList.remove("open");
      localStorage.setItem("landlord_pop_seen_v1", "1");
      return;
    }
  });

  document.addEventListener("submit", (e) => {
    const f = e.target.closest("form[data-lx]");
    if (!f) return;
    e.preventDefault();
    const kind = f.dataset.lx;

    if (kind === "news"){
      const email = f.email.value.trim();
      if (!email) return;
      const msg = document.querySelector('[data-lx="news-msg"]');
      if (msg) msg.textContent = "Thanks! We'll be in touch at " + email + ".";
      f.reset();
      return;
    }
    if (kind === "chat-form"){
      const v = f.msg.value.trim();
      if (!v) return;
      addChat("user", v);
      f.reset();
      setTimeout(() => addChat("bot", chatReply(v)), 350);
      return;
    }
  });

  function addChat(who, text){
    const box = document.getElementById("lxChatBody");
    if (!box) return;
    const b = document.createElement("div");
    b.className = "lx-msg-b " + who;
    b.innerHTML = text;
    box.appendChild(b);
    box.scrollTop = box.scrollHeight;
    if (who === "user"){
      // Hide quick-reply chips after first interaction
      const q = document.getElementById("lxChatQuick");
      if (q) q.style.display = "none";
    }
  }

  /* ---------- 7. Welcome popup — once per browser ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (localStorage.getItem("landlord_pop_seen_v1")) return;
      // Only show if we're on the public marketplace (not logged in)
      const account = Auth.currentAccount && Auth.currentAccount();
      if (account) return;
      const pop = document.getElementById("lxPop");
      if (pop) pop.classList.add("open");
    }, 4000); // wait 4s so it doesn't feel aggressive
  });

  /* ---------- 8. SCROLL-STORY LANDING SECTIONS ---------- */


function blockStory(){
  return `
    <section class="lx-story">

      <!-- SECTION A: big hero screenshot of the Dashboard -->
      <div class="lx-story-section">
        <div class="lx-story-head lx-reveal">
          <div class="lx-eyebrow">Built for distance</div>
          <h2>Your properties, no matter <em>where you are</em>.</h2>
          <p>From Accra to Amsterdam, you can check rent, follow construction, and message tenants in one tap. The office lives in your pocket.</p>
        </div>

        <div class="lx-showcase lx-reveal d1">
          <div class="lx-chrome">
            <i></i><i></i><i></i>
            <span>landlord.app/dashboard</span>
          </div>
          <img src="shots/dashboard.png" alt="LANDLORD dashboard" loading="lazy" />
        </div>
      </div>

      <!-- SECTION B: money, with the Financials screenshot on the right -->
      <div class="lx-story-section">
        <div class="lx-row">
          <div class="lx-row-text lx-reveal">
            <div class="lx-eyebrow">Money, made visible</div>
            <h3>Rent, bills, and construction spend, side by side.</h3>
            <p>No more guessing where the money went. Log a receipt and every number updates in real time, for you and for the owner.</p>
            <ul>
              <li>See what each property earns, and what it costs</li>
              <li>Track per-room occupancy and rent arrears</li>
              <li>Export a monthly financial summary as CSV</li>
            </ul>
          </div>
          <div class="lx-reveal d1">
            <div class="lx-showcase small">
              <div class="lx-chrome">
                <i></i><i></i><i></i>
                <span>landlord.app/financials</span>
              </div>
              <img src="shots/financials.png" alt="Financials" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION C: owners & tenants, with the tenant portal screenshot on the left -->
      <div class="lx-story-section">
        <div class="lx-row rev">
          <div class="lx-row-text lx-reveal">
            <div class="lx-eyebrow">Owners &amp; tenants</div>
            <h3>Everyone sees exactly what they need to see.</h3>
            <p>Owners get a read-only view of their property. Tenants get their rent, bills, and receipts. You stay in control of what's shared.</p>
            <ul>
              <li>Owner portal: read-only, linked from the Owners page</li>
              <li>Tenant portal: rent due, utility bills, and payment receipts</li>
              <li>Real SMS notices sent from your own phone or gateway</li>
            </ul>
          </div>
          <div class="lx-reveal d1">
            <div class="lx-showcase small">
              <div class="lx-chrome">
                <i></i><i></i><i></i>
                <span>landlord.app/tenant-portal</span>
              </div>
              <img src="shots/tenant-portal.png" alt="Tenant portal" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION D: final CTA band -->
      <div class="lx-final lx-reveal">
        <div class="lx-eyebrow">Ready when you are</div>
        <h2 style="margin-top:16px;">Start managing in 60 seconds.</h2>
        <p>Free during early access. No credit card. Works on any phone, anywhere in the world.</p>
        <div class="lx-ctas">
          <a href="#" class="lx-cta primary" data-lx="cta-signup">Create free account</a>
          <a href="#lx-features" class="lx-cta ghost">See all features</a>
        </div>
      </div>

    </section>`;
}
/* ---------- 9. Reveal-on-scroll observer ---------- */
function lxObserve(){
  const els = document.querySelectorAll(".lx-reveal:not(.in)");
  if (!("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  els.forEach(el => io.observe(el));
}

/* ---------- 10. Hook the story into the marketplace render ---------- */
const _renderMarketV2 = renderMarketPublic;
renderMarketPublic = function(){
  // inner already contains hero + features + testimonials + faq + newsletter + footer + chat + popup
  const html = _renderMarketV2();
  // Insert the story between the features strip and the testimonials
  return html.replace(
    '<section class="lx-testimonials">',
    blockStory() + '<section class="lx-testimonials">'
  );
};

/* Re-run observer after every render */
const _render = render;
render = function(){
  _render.apply(this, arguments);
  // Let the DOM settle, then set up reveals
  requestAnimationFrame(() => lxObserve());
};

})();


/* ============================================================================
   PART 06 of 08  >>>  verify.js
   VERIFICATION
   ID + selfie verification for SaaS, tenants, managers, owners.
   (original file: verify.js)
   ============================================================================ */

/* ============================================================
   LANDLORD — verify.js
   ID + selfie verification for SaaS, tenants, managers, owners.
   Loads AFTER extras.js.
   ============================================================ */

(function(){
  "use strict";

  /* ---------- 1. Account flags (added on signup) ---------- */
  // These fields are added to accounts automatically:
  //   initialIdPhoto       (SaaS only)  — base64, permanent
  //   initialIdType        (SaaS only)  — "ghana-card" | "voters-id" | "passport"
  //   initialSelfie        (SaaS + tenant) — base64, permanent
  //   avatar               (any role)   — user-changeable display picture
  //   verifiedAt           — ISO date when verification completed

  const needsVerification = (a) => {
    if (!a) return false;
    if (a.role === "saas")   return !(a.initialIdPhoto && a.initialSelfie);
    if (a.role === "tenant") return !a.initialSelfie;
    return false;
  };

  const hasAvatar = (a) => !!(a && (a.avatar || a.initialSelfie));

  /* ---------- 2. Public helper used by every avatar in the UI ---------- */
  window.lxAvatarSrc = function(account){
    if (!account) return null;
    return account.avatar || account.initialSelfie || null;
  };

  /* ---------- 3. Camera capture component ---------- */
  // Renders a live <video>, a shutter button, and a preview.
  function captureUI(kind, onDone){
    // kind: "selfie" | "id-doc"
    const facing = kind === "selfie" ? "user" : "environment";
    const wrap = document.createElement("div");
    wrap.className = "vf-wrap";
    wrap.innerHTML = `
      <div class="vf-backdrop" data-vf="cancel"></div>
      <div class="vf-modal">
        <div class="vf-head">
          <b>${kind === "selfie" ? "Take a passport-style photo" : "Photograph your ID"}</b>
          <button class="vf-x" data-vf="cancel" aria-label="Cancel">×</button>
        </div>
        <div class="vf-stage">
          <video class="vf-video" playsinline autoplay muted></video>
          <div class="vf-guide ${kind === "selfie" ? "face" : "doc"}"></div>
        </div>
        <p class="vf-hint">
          ${kind === "selfie"
            ? "Face the camera, remove glasses and hats, plain background behind you."
            : "Lay the ID flat. Fit the whole card inside the frame. No glare."}
        </p>
        <div class="vf-actions">
          <button class="vf-btn ghost" data-vf="cancel">Cancel</button>
          <button class="vf-btn primary" data-vf="shoot">Capture</button>
        </div>
        <div class="vf-preview" hidden>
          <img alt="" />
          <div class="vf-actions">
            <button class="vf-btn ghost" data-vf="retake">Retake</button>
            <button class="vf-btn primary" data-vf="use">Use this</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(wrap);
    const video = wrap.querySelector(".vf-video");
    const canvas = document.createElement("canvas");
    const preview = wrap.querySelector(".vf-preview");
    const previewImg = wrap.querySelector(".vf-preview img");
    const stage = wrap.querySelector(".vf-stage");
    let stream = null, result = null;

    function stop(){ if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; }
    function close(){ stop(); wrap.remove(); }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false })
      .then(s => { stream = s; video.srcObject = s; })
      .catch(err => {
        alert("Could not open your camera. Check that the site is allowed to use the camera, then try again.");
        console.error(err);
        close();
      });

    wrap.addEventListener("click", (e) => {
      const act = e.target.closest("[data-vf]")?.dataset.vf;
      if (!act) return;
      if (act === "cancel") return close();
      if (act === "shoot"){
        const w = video.videoWidth || 960;
        const h = video.videoHeight || 720;
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(video, 0, 0, w, h);
        result = canvas.toDataURL("image/jpeg", 0.82);
        previewImg.src = result;
        stage.hidden = true;
        preview.hidden = false;
        return;
      }
      if (act === "retake"){
        result = null;
        preview.hidden = true;
        stage.hidden = false;
        return;
      }
      if (act === "use"){
        const out = result;
        close();
        onDone(out);
      }
    });
  }

  /* ---------- 4. Verification screens ---------- */

  // Full-screen gate shown right after signup for SaaS + tenant
  function renderVerificationGate(account){
    const isSaas = account.role === "saas";
    const hasId = !!account.initialIdPhoto;
    const hasSelfie = !!account.initialSelfie;

    const idTypes = [
      { v:"ghana-card",  t:"Ghana Card" },
      { v:"voters-id",   t:"Voter's ID" },
      { v:"passport",    t:"Passport" },
    ];

    const idBlock = isSaas ? `
      <div class="vf-step ${hasId ? "done" : ""}">
        <div class="vf-num">${hasId ? "✓" : "1"}</div>
        <div class="vf-body">
          <b>Upload a government ID</b>
          <p>Choose which ID you'll use, then photograph the front of it. This stays with your account permanently and cannot be deleted.</p>
          ${hasId ? `<span class="vf-ok">ID captured: ${account.initialIdType || "government ID"}</span>` : `
            <div class="vf-idopts">
              ${idTypes.map(t => `<label class="vf-radio"><input type="radio" name="vfIdType" value="${t.v}" /> ${t.t}</label>`).join("")}
            </div>
            <button class="lw-btn primary" data-vf="take-id">Open camera &amp; photograph ID</button>
          `}
        </div>
      </div>` : "";

    const selfieBlock = `
      <div class="vf-step ${hasSelfie ? "done" : ""}">
        <div class="vf-num">${hasSelfie ? "✓" : (isSaas ? "2" : "1")}</div>
        <div class="vf-body">
          <b>${isSaas ? "Now take a live selfie" : "Take a passport-style selfie"}</b>
          <p>${isSaas
            ? "We'll match this head shot against the photo on your ID. Face the camera, plain background, no hats or glasses."
            : "Your landlord will use this as your tenant photo. Face the camera, plain background, no hats or glasses."}</p>
          ${hasSelfie ? `<span class="vf-ok">Selfie captured.</span>` : `<button class="lw-btn primary" data-vf="take-selfie">Open camera &amp; take selfie</button>`}
        </div>
      </div>`;

    const canFinish = (isSaas ? (hasId && hasSelfie) : hasSelfie);

    return `
      <div class="vf-shell">
        <div class="vf-card">
          <div class="vf-brand">
            <img src="icon.png" alt="" />
            <b>LANDLORD</b>
          </div>
          <h1>Verify your account</h1>
          <p class="vf-lead">
            ${isSaas
              ? "SaaS Partner accounts need a government ID and a live selfie. This protects owners from fraud and keeps the marketplace trustworthy."
              : "Tenants need one passport-style photo. This is what your landlord and property manager will see on your file."}
          </p>
          ${idBlock}
          ${selfieBlock}
          <div class="vf-foot">
            ${canFinish
              ? `<button class="lw-btn primary big" data-vf="finish">Finish and continue</button>`
              : `<span class="vf-wait">Complete the steps above to continue.</span>`}
            <button class="lw-btn ghost small" data-action="logout">Log out</button>
          </div>
          <p class="vf-small">
            Your photos are stored on this device only. They are never uploaded or shared. You can change your display picture later, but the originals above stay with your account.
          </p>
        </div>
      </div>`;
  }

  /* ---------- 5. Intercept render() ---------- */
  const _render = render;
  render = function(){
    const acc = Auth.currentAccount && Auth.currentAccount();
    // If a SaaS or tenant account is logged in and not yet verified, force the gate.
    if (acc && needsVerification(acc)){
      // Make sure Store is loaded so Profile etc. still work after verification
      if (!Store.data) Store.load();
      const el = document.getElementById("app");
      el.className = "lw-auth-shell";
      el.innerHTML = renderVerificationGate(acc);
      // Bind camera buttons
      el.querySelectorAll('[data-vf="take-id"]').forEach(b => b.onclick = () => {
        const picked = el.querySelector('input[name="vfIdType"]:checked');
        if (!picked){ alert("Pick which ID you're using first."); return; }
        captureUI("id-doc", (b64) => {
          acc.initialIdPhoto = b64;
          acc.initialIdType = picked.value;
          Auth.saveAccounts();
          render();
        });
      });
      el.querySelectorAll('[data-vf="take-selfie"]').forEach(b => b.onclick = () => {
        captureUI("selfie", (b64) => {
          acc.initialSelfie = b64;
          Auth.saveAccounts();
          render();
        });
      });
      const fin = el.querySelector('[data-vf="finish"]');
      if (fin) fin.onclick = () => {
        acc.verifiedAt = new Date().toISOString();
        Auth.saveAccounts();
        render();
      };
      return;
    }
    return _render.apply(this, arguments);
  };

  /* ---------- 6. Expose photo helpers used by the Profile page ---------- */
  window.lxChangeAvatar = function(){
    const acc = Auth.currentAccount && Auth.currentAccount();
    if (!acc) return;
    captureUI("selfie", (b64) => {
      acc.avatar = b64;    // this is the *display* picture, separate from initialSelfie
      Auth.saveAccounts();
      render();
    });
  };

  window.lxUploadAvatar = function(){
    const acc = Auth.currentAccount && Auth.currentAccount();
    if (!acc) return;
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.onchange = async () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      try {
        const b64 = await resizeImageFile(f, 600, 0.8);
        acc.avatar = b64;
        Auth.saveAccounts();
        render();
      } catch (e){ alert("Could not read that image."); }
    };
    inp.click();
  };

  /* ---------- 7. Replace the Profile page to show avatars + locked photos ---------- */
  const _profile = renderProfilePage;
  renderProfilePage = function(){
    const acc = Auth.currentAccount && Auth.currentAccount();
    if (!acc) return _profile();

    const av = lxAvatarSrc(acc);
    const avatarBlock = `
      <div class="vf-avatar-block">
        <div class="vf-avatar">
          ${av ? `<img src="${av}" alt="" />` : `<div class="vf-avatar-ph">${escapeHtml((acc.name || "?").charAt(0).toUpperCase())}</div>`}
        </div>
        <div class="vf-avatar-actions">
          <b>Your profile picture</b>
          <p>You can change this any time. It shows on your account, in messages, and to your manager.</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="lw-btn primary small" onclick="lxChangeAvatar()">Take new photo</button>
            <button class="lw-btn small" onclick="lxUploadAvatar()">Upload from device</button>
          </div>
        </div>
      </div>`;

    // Locked-photo panels — only for accounts that went through verification
    let locked = "";
    if (acc.initialIdPhoto){
      locked += `
        <div class="vf-locked">
          <div class="vf-locked-img"><img src="${acc.initialIdPhoto}" alt="ID" /></div>
          <div>
            <b>Government ID on file</b>
            <p>Captured when you signed up. Permanently attached to your account and cannot be changed or deleted.</p>
          </div>
        </div>`;
    }
    if (acc.initialSelfie){
      locked += `
        <div class="vf-locked">
          <div class="vf-locked-img"><img src="${acc.initialSelfie}" alt="Verification selfie" /></div>
          <div>
            <b>Verification photo on file</b>
            <p>Captured when you signed up. Permanently attached to your account and cannot be changed or deleted.</p>
          </div>
        </div>`;
    }
    const lockedPanel = locked
      ? `<div class="lw-panel"><div class="lw-panel-title"><span>Verification photos (locked)</span></div>${locked}</div>`
      : "";

    // Inject avatar block at the top and locked panel after the profile form
    const html = _profile();
    const withAvatar = html.replace(
      /<div class="lw-panel">/,
      `<div class="lw-panel"><div class="lw-panel-title"><span>Profile picture</span></div>${avatarBlock}</div><div class="lw-panel">`
    );
    return withAvatar.replace(
      /(<div class="lw-panel">[\s\S]*?Account type[\s\S]*?<\/div>\s*<\/div>)/,
      "$1" + lockedPanel
    );
  };
})();


/* ============================================================================
   PART 07 of 08  >>>  pages.js
   PAGES & SITE CONTENT
   Editable site content block, About page, Terms page, footer.
   (original file: pages.js)
   ============================================================================ */

/* ============================================================
   LANDLORD — pages.js (single file, everything included)
   Contains: site content, About page, Terms page, footer.
   Loads AFTER extras.js and verify.js.
   ============================================================ */

(function(){
  "use strict";

  /* =========================================================
     1. SITE CONTENT — EDIT ONLY THIS BLOCK
     ========================================================= */
  const SITE = {

    company: {
      name:    "Big Family Tech",
      product: "LANDLORD",
      tagline: "Remote property, tenancy & construction management.",
      city:    "Tamale",
      region:  "Northern Region",
      country: "Ghana",
    },

    contact: {
      email:    "landlord@gmail.com",
      phone:    "+233 (0) 54 771 7114",
      whatsapp: "233547717114",
      hours:    "Monday to Friday, 8am to 6pm GMT",
    },

    social: {
      whatsapp:  "https://wa.me/233547717114",
      facebook:  "https://facebook.com/landlordgh",
      instagram: "https://instagram.com/landlordgh",
      twitter:   "https://twitter.com/landlordgh",
      linkedin:  "https://linkedin.com/company/landlordgh",
      tiktok:    "",
      youtube:   "",
    },

    about: {
      headline: "We built LANDLORD because we were tired of notebooks.",
      intro: "LANDLORD started in Tamale, Ghana, for one simple reason: managing houses, land, and construction from a distance was chaos. Notebooks get lost. WhatsApp groups get buried. Owners abroad had no idea what was happening on their own land. So we built the tool we wished existed.",
      story: [
        "In 2024, we sat with a landlord managing fourteen houses across three towns. He kept everything in five notebooks, three WhatsApp chats, and a folder of photos on his phone. When a tenant asked about a receipt from eight months ago, it took him two days to find it.",
        "We asked him what he actually needed. Not what software companies think landlords need. His answer was simple: see who has paid, see who hasn't, keep receipts, and let owners check for themselves without calling him every week.",
        "That conversation became LANDLORD. Every feature in this app exists because a real person, in a real house, on a real plot of land, told us they needed it."
      ],
      values: [
        { title: "Built for Ghana first", body: "GHS pricing, mobile money, Ghana Card verification, SMS in local formats. Not a global tool with Ghana awkwardly bolted on." },
        { title: "Made for distance", body: "Whether you're in Accra, the United States, Toronto, or anywhere else, you see the same numbers as the person standing on the land." },
        { title: "Honest about limits", body: "We store your data on your device for now, and we say so plainly. When we move to the cloud, it will be encrypted and you'll know exactly where it lives." },
        { title: "Free during early access", body: "You help us shape the product. In return, you use it for free, and you keep free access when paid plans arrive." }
      ]
    },

    terms: {
      lastUpdated: "16 October 2026",
      intro: "These Terms govern your use of LANDLORD, a property, tenancy, and construction management application operated by Big Family Tech in Ghana. By creating an account, you agree to these Terms.",
      sections: [
        { title: "1. Who can use LANDLORD", body: [
          "You must be at least 18 years old and legally able to enter into contracts to use LANDLORD.",
          "You agree to provide accurate information when you sign up, including your real name, working email address, and (for SaaS Partner accounts) a valid government ID that matches your live verification photo.",
          "You are responsible for keeping your password safe. Anyone who signs in with your password is treated as you."
        ]},
        { title: "2. What LANDLORD does", body: [
          "LANDLORD helps property managers, landlords, SaaS partners, and owners keep track of properties, rooms, tenants, rent, utility bills, construction expenses, materials, leases, inspections, and messages.",
          "Tenants can log in to see their home, rent due dates, utility bills, and payment receipts, and to report maintenance issues.",
          "LANDLORD is a record-keeping and messaging tool. We are not a bank, escrow service, or party to any tenancy agreement between you and your tenants."
        ]},
        { title: "3. Your data and privacy", body: [
          "During early access, your account data and any photos you capture (ID, verification selfie, property photos, receipts) are stored only on your own device using your browser's local storage. They are not uploaded to any server we operate.",
          "If you clear your browser data, uninstall your browser, or switch devices, your LANDLORD data will not follow you. We recommend exporting your financial summaries regularly.",
          "When we introduce cloud sync, it will be encrypted, and we will tell you before any data leaves your device.",
          "You own your data. We do not sell it, and we do not share it with advertisers."
        ]},
        { title: "4. Identity verification", body: [
          "SaaS Partner accounts must submit a government ID (Ghana Card, Voter's ID, or Passport) and a live selfie for verification. Tenant accounts must submit a live passport-style selfie.",
          "Once submitted, these verification images are permanently attached to your account. You may add or change a separate profile picture, but the original ID and verification photos cannot be deleted.",
          "Providing false or misleading identity documents is a violation of these Terms and may be reported to the appropriate authorities."
        ]},
        { title: "5. Acceptable use", body: [
          "Do not use LANDLORD to harass, threaten, or send unsolicited messages to anyone.",
          "Do not upload content you do not have the right to share, including photos of people who have not consented.",
          "Do not attempt to reverse-engineer, resell, or misrepresent LANDLORD as your own product without written permission.",
          "Do not use LANDLORD for anything illegal under the laws of the Republic of Ghana."
        ]},
        { title: "6. Payments and fees", body: [
          "LANDLORD is free during early access.",
          "If and when we introduce paid plans, existing users will be notified by email and in the app at least 30 days before any charge. You will always be able to export your data and cancel without penalty.",
          "Any online payments made by tenants through the app (rent, deposits, utility bills) are recorded for your convenience. During early access, the payment processor used is a demonstration and does not transfer real money."
        ]},
        { title: "7. Service availability", body: [
          "We try to keep LANDLORD running smoothly, but we do not promise uninterrupted service. Downtime may occur for maintenance, updates, or events outside our control.",
          "Because early-access data lives in your browser, we are not able to recover data that you delete, that your browser clears, or that is lost if your device fails. Always keep your own backups of critical information."
        ]},
        { title: "8. Limitation of liability", body: [
          "LANDLORD is provided as-is. We are not liable for losses arising from missed rent, mistaken entries, disputes between landlords and tenants, or decisions you make based on the app's records.",
          "Our total liability, if any, is limited to the amount you have paid us in the twelve months before the issue arose, or one hundred Ghana cedis, whichever is greater."
        ]},
        { title: "9. Changes to these Terms", body: [
          "We may update these Terms as the product evolves. When we do, we will update the date at the top and, for significant changes, notify you in the app or by email.",
          "Continuing to use LANDLORD after a change means you accept the updated Terms."
        ]},
        { title: "10. Ending your account", body: [
          "You can stop using LANDLORD at any time. You can delete your account from your Profile page or by contacting us.",
          "We may suspend or close accounts that violate these Terms, especially those involving fraud, abuse, or false identity documents."
        ]},
        { title: "11. Governing law", body: [
          "These Terms are governed by the laws of the Republic of Ghana. Any dispute will be handled in the courts of Ghana."
        ]},
        { title: "12. Contact", body: [
          "Questions about these Terms? Write to us at landlord@gmail.com or visit our Contact page."
        ]}
      ]
    }
  };

  // Expose for reference (some inline templates may want it)
  window.SITE = SITE;

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");

  /* =========================================================
     2. SOCIAL ICONS
     ========================================================= */
  function socialIcon(k){
    const p = {
      mail:  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
      pin:   '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      whatsapp:  '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.13c-.24.68-1.4 1.31-1.94 1.36-.5.05-.98.22-3.29-.68-2.78-1.09-4.55-3.9-4.69-4.09-.13-.18-1.11-1.48-1.11-2.83 0-1.34.7-2 .95-2.27.24-.27.53-.34.71-.34.18 0 .35.002.51.01.16.007.38-.06.59.45.24.55.83 1.9.9 2.04.07.13.11.29.02.47-.09.18-.14.29-.27.45-.13.16-.28.36-.4.48-.13.13-.27.27-.11.53.16.27.7 1.16 1.5 1.87 1.03.92 1.9 1.21 2.17 1.34.27.14.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.07.11.07.63-.17 1.31z"/>',
      facebook:  '<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/>',
      instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>',
      twitter:   '<path d="M18.9 2H22l-7.05 8.06L22.7 22h-6.67l-5.23-6.84L4.75 22H1.62l7.55-8.63L1.3 2h6.83l4.72 6.24L18.9 2zm-1.17 18h1.72L7.36 3.9H5.51L17.73 20z"/>',
      linkedin:  '<path d="M20.45 20.45H16.9V14.9c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93v5.64H9.4V9h3.4v1.56h.05c.47-.9 1.63-1.84 3.36-1.84 3.6 0 4.24 2.36 4.24 5.44v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>',
      tiktok:    '<path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 0-5.18c.27 0 .53.04.78.12V9.7a5.8 5.8 0 0 0-.78-.05 5.7 5.7 0 1 0 5.7 5.7V9.01a7.35 7.35 0 0 0 4.28 1.38V7.3a4.28 4.28 0 0 1-2.84-1.48z"/>',
      youtube:   '<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>',
    };
    const outline = ["mail","phone","pin"].includes(k);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      ${outline ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' : 'fill="currentColor"'}>
      ${p[k] || ""}</svg>`;
  }

  /* =========================================================
     3. FOOTER — replaces whatever extras.js built
     ========================================================= */
  window.lxBuildFooter = function(){
    const socials = Object.entries(SITE.social)
      .filter(([k, v]) => v && String(v).trim().length > 0)
      .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(k)}" class="pg-social pg-${k}">${socialIcon(k)}</a>`)
      .join("");

    const y = new Date().getFullYear();
    const c = SITE.company, ct = SITE.contact;

    return `
      <footer class="lx-footer">
        <div class="lx-footer-grid">
          <div class="lx-footer-about">
            <div class="lx-footer-brand">
              <img src="icon.png" alt="${esc(c.product)}" />
              ${esc(c.product)}
            </div>
            <p>${esc(c.tagline)} Built in ${esc(c.city)}, ${esc(c.country)}.</p>
            <div class="lx-socials">${socials}</div>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#" data-lx="cta-signup">Sign up free</a>
            <a href="#lx-features">Features</a>
            <a href="#" data-mk="home">Browse homes</a>
            <a href="#" data-mk="signin">Tenant login</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#" data-pg="about">About us</a>
            <a href="#lx-faq">FAQ</a>
            <a href="#" data-pg="terms">Terms &amp; Conditions</a>
            <a href="#" data-pg="contact">Contact</a>
          </div>
          <div>
            <h4>Visit / Contact</h4>
            <div class="lx-footer-addr"><span>${esc(c.name)}<br>${esc(c.city)}, ${esc(c.region)}<br>${esc(c.country)}</span></div>
            <div class="lx-footer-addr"><span>${esc(ct.email)}</span></div>
            <div class="lx-footer-addr"><span>${esc(ct.phone)}</span></div>
          </div>
        </div>
        <div class="lx-footer-bottom">
          <div>&copy; ${y} ${esc(c.name)}. All rights reserved.</div>
          <div>Made in ${esc(c.country)}</div>
        </div>
      </footer>`;
  };

  // Patch the DOM right after every render: find the old footer and swap it
  function swapFooter(){
    const old = document.querySelector(".lx-footer");
    const marketplace = document.querySelector(".mk-shell");
    if (!marketplace) return;
    const fresh = window.lxBuildFooter();
    if (old){
      // Only rebuild if the content differs, to avoid infinite loops
      if (old.outerHTML !== fresh){
        const tmp = document.createElement("div");
        tmp.innerHTML = fresh;
        old.replaceWith(tmp.firstElementChild);
      }
    } else {
      // No footer yet, append before chat button if it exists
      const wrap = document.createElement("div");
      wrap.innerHTML = fresh;
      marketplace.appendChild(wrap.firstElementChild);
    }
  }

  /* =========================================================
     4. ABOUT & TERMS PAGES
     ========================================================= */
  function renderAboutPage(){
    const a = SITE.about, c = SITE.company, ct = SITE.contact;
    const values = a.values.map(v => `
      <article class="pg-value">
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.body)}</p>
      </article>`).join("");
    const story = a.story.map(p => `<p>${esc(p)}</p>`).join("");

    return `
      <div class="pg-shell">
        <a href="#" class="pg-back" data-pg="close">&larr; Back to LANDLORD</a>
        <header class="pg-hero">
          <div class="pg-eyebrow">About us</div>
          <h1>${esc(a.headline)}</h1>
          <p class="pg-lead">${esc(a.intro)}</p>
        </header>
        <section class="pg-section">
          <h2>Our story</h2>
          ${story}
        </section>
        <section class="pg-section">
          <h2>What we stand for</h2>
          <div class="pg-values">${values}</div>
        </section>
        <section class="pg-section">
          <h2>Where we are</h2>
          <div class="pg-contact-grid">
            <div><div class="pg-label">Office</div><p>${esc(c.name)}<br>${esc(c.city)}, ${esc(c.region)}<br>${esc(c.country)}</p></div>
            <div><div class="pg-label">Email</div><p><a href="mailto:${esc(ct.email)}">${esc(ct.email)}</a></p></div>
            <div><div class="pg-label">Phone</div><p><a href="tel:${esc(ct.phone.replace(/\s|\(|\)/g,""))}">${esc(ct.phone)}</a></p></div>
            <div><div class="pg-label">Hours</div><p>${esc(ct.hours)}</p></div>
          </div>
        </section>
        <section class="pg-section pg-cta-band">
          <h2>Ready to try it?</h2>
          <p>Free during early access. No credit card.</p>
          <a href="#" class="lw-btn primary" data-lx="cta-signup">Create free account</a>
        </section>
        ${window.lxBuildFooter()}
      </div>`;
  }

    function renderContactPage(){
    const c = SITE.company, ct = SITE.contact;
    const wa = SITE.social.whatsapp || ("https://wa.me/" + (ct.whatsapp || ""));
    const tel = ct.phone.replace(/\s|\(|\)/g, "");

    return `
      <div class="pg-shell">
        <a href="#" class="pg-back" data-pg="close">&larr; Back to LANDLORD</a>

        <header class="pg-hero">
          <div class="pg-eyebrow">Contact</div>
          <h1>Talk to a human.</h1>
          <p class="pg-lead">
            Questions about pricing, SMS setup, owner portals, or anything else?
            Send us a message and we will reply, usually within a day.
          </p>
        </header>

        <section class="pg-section">
          <div class="pg-contact-cards">
            <a class="pg-contact-card" href="mailto:${esc(ct.email)}">
              <div class="pg-contact-ico">${socialIcon("mail")}</div>
              <div>
                <div class="pg-label">Email</div>
                <b>${esc(ct.email)}</b>
                <span>Best for detailed questions and support</span>
              </div>
            </a>

            <a class="pg-contact-card" href="${esc(wa)}" target="_blank" rel="noopener">
              <div class="pg-contact-ico">${socialIcon("whatsapp")}</div>
              <div>
                <div class="pg-label">WhatsApp</div>
                <b>${esc(ct.phone)}</b>
                <span>Fastest way to reach us during work hours</span>
              </div>
            </a>

            <a class="pg-contact-card" href="tel:${esc(tel)}">
              <div class="pg-contact-ico">${socialIcon("phone")}</div>
              <div>
                <div class="pg-label">Phone</div>
                <b>${esc(ct.phone)}</b>
                <span>${esc(ct.hours)}</span>
              </div>
            </a>

            <div class="pg-contact-card static">
              <div class="pg-contact-ico">${socialIcon("pin")}</div>
              <div>
                <div class="pg-label">Office</div>
                <b>${esc(c.name)}</b>
                <span>${esc(c.city)}, ${esc(c.region)}, ${esc(c.country)}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="pg-section">
          <h2>Send us a message</h2>
          <form class="pg-contact-form" data-pgform="contact">
            <div class="pg-field">
              <label>Your name</label>
              <input name="name" required />
            </div>
            <div class="pg-field">
              <label>Your email</label>
              <input type="email" name="email" required />
            </div>
            <div class="pg-field">
              <label>Subject</label>
              <input name="subject" placeholder="e.g. Pricing question, SMS setup, Owner portal" required />
            </div>
            <div class="pg-field full">
              <label>Message</label>
              <textarea name="message" rows="6" required></textarea>
            </div>
            <div class="pg-field full">
              <button class="lw-btn primary" type="submit">Send message</button>
              <div class="pg-form-status" data-pg="status"></div>
            </div>
          </form>
        </section>

        <section class="pg-section">
          <h2>Follow us</h2>
          <div class="pg-socials-lg">
            ${Object.entries(SITE.social)
              .filter(([k,v]) => v && String(v).trim().length > 0)
              .map(([k,url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" class="pg-social-lg pg-${k}">${socialIcon(k)}<span>${esc(k.charAt(0).toUpperCase()+k.slice(1))}</span></a>`)
              .join("")}
          </div>
        </section>

        ${window.lxBuildFooter()}
      </div>`;
  }


  /* =========================================================
     5. ROUTE: intercept market render for about/terms
     ========================================================= */
  State.pgPage = State.pgPage || null;

  const _market = renderMarketPublic;
  renderMarketPublic = function(){
    if (State.pgPage === "about")   return renderAboutPage();
    if (State.pgPage === "terms")   return renderTermsPage();
    if (State.pgPage === "contact") return renderContactPage();
    return _market.apply(this, arguments);
  };

  /* =========================================================
     6. AFTER EVERY RENDER — swap the footer
     ========================================================= */
  const _render = render;
  render = function(){
    _render.apply(this, arguments);
    // Defer the footer swap so the DOM is ready
    requestAnimationFrame(swapFooter);
  };

  /* =========================================================
     7. CLICK HANDLERS
     ========================================================= */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-pg]");
    if (!el) return;
    e.preventDefault();
    const a = el.dataset.pg;
    if (a === "about"){ State.pgPage = "about"; render(); window.scrollTo({top:0}); return; }
    if (a === "terms"){ State.pgPage = "terms"; render(); window.scrollTo({top:0}); return; }
    if (a === "close"){ State.pgPage = null; render(); window.scrollTo({top:0}); return; }
    if (a === "contact"){ State.pgPage = "contact"; render(); window.scrollTo({top:0}); return; }
});

  /* =========================================================
     8. INIT: run one footer swap on first load
     ========================================================= */
  window.addEventListener("load", () => {
    setTimeout(swapFooter, 60);
  });

    /* =========================================================
     9. CONTACT FORM HANDLER
     ========================================================= */
  document.addEventListener("submit", (e) => {
    const f = e.target.closest('form[data-pgform="contact"]');
    if (!f) return;
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f).entries());
    const status = f.querySelector('[data-pg="status"]');

    // Basic validation
    if (!data.name || !data.email || !data.message){
      if (status){ status.textContent = "Please fill in every field."; status.className = "pg-form-status error"; }
      return;
    }

    // Save the message locally so you can see it under a "Messages" review later.
    // For now we open the user's email client with a prefilled message.
    const subject = encodeURIComponent(data.subject || "LANDLORD contact form");
    const body = encodeURIComponent(
      "From: " + data.name + " <" + data.email + ">\n\n" +
      data.message + "\n\n" +
      "Sent from landlord.app contact form"
    );

    const mailto = "mailto:" + SITE.contact.email + "?subject=" + subject + "&body=" + body;

    if (status){
      status.innerHTML = "Thanks " + data.name.split(" ")[0] + ". We received your message and will reply to <b>" + data.email + "</b> shortly.";
      status.className = "pg-form-status ok";
    }
    f.reset();

    // Try to open the mail client, but don't block on it.
    // If the user has no mail app, the confirmation above is still shown.
    setTimeout(() => { window.location.href = mailto; }, 600);
  });
})();


/* ============================================================================
   PART 08 of 08  >>>  pwa.js
   PWA / INSTALL
   Registers the service worker and handles the install prompt. Must stay last.
   (original file: pwa.js)
   ============================================================================ */

/* ============================================================
   LANDLORD — pwa.js
   Registers the service worker and handles install prompt.
   Load LAST in index.html.
   ============================================================ */

(function(){
  "use strict";

  // 1. Register the service worker
  if ("serviceWorker" in navigator){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
        .then((reg) => console.log("LANDLORD: service worker ready", reg.scope))
        .catch((err) => console.warn("LANDLORD: service worker failed", err));
    });
  }

  // 2. Capture the install prompt so we can show our own button
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstallButton();
    console.log("LANDLORD: installed");
  });

  // 3. Show a friendly "Install app" button in the sidebar
  function showInstallButton(){
    if (document.getElementById("lxInstallBtn")) return;
    const foot = document.querySelector(".lw-sidebar-foot") || document.querySelector(".lw-sidebar");
    if (!foot) return;
    const btn = document.createElement("button");
    btn.id = "lxInstallBtn";
    btn.className = "lw-btn primary small";
    btn.style.marginTop = "10px";
    btn.style.width = "100%";
    btn.textContent = "Install LANDLORD app";
    btn.onclick = async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === "accepted") hideInstallButton();
    };
    foot.appendChild(btn);
  }
  function hideInstallButton(){
    document.getElementById("lxInstallBtn")?.remove();
  }
})();

/* ===== END OF landlord.js ===== */
