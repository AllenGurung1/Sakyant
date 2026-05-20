import { useState } from "react";

// ── Mock Fighter Roster Data ─────────────────────────────────────────────────
const fighters = [
  { name: "Bikash Gurung",   weight: "Welterweight", record: "12-3", badge: true,  initials: "BG", accent: "#8B0000" },
  { name: "Anish Tamang",    weight: "Lightweight",  record: "8-1",  badge: true,  initials: "AT", accent: "#B8860B" },
  { name: "Priya Rana",      weight: "Strawweight",  record: "5-2",  badge: false, initials: "PR", accent: "#556B2F" },
  { name: "Roshan Shrestha", weight: "Middleweight", record: "9-4",  badge: true,  initials: "RS", accent: "#8B0000" },
  { name: "Suman Karki",     weight: "Featherweight",record: "6-2",  badge: false, initials: "SK", accent: "#B8860B" },
  { name: "Nisha Lama",      weight: "Flyweight",    record: "4-1",  badge: true,  initials: "NL", accent: "#8B0000" },
];

// ── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What does 'Sak Yant' actually mean?",
    a: "Sak Yant (สักยันต์) translates to 'sacred geometric tattooing'. 'Sak' means 'to tap' or 'tattoo' while 'Yant' derives from the Sanskrit 'Yantra', meaning a sacred geometric diagram believed to carry magical protection, power, and good fortune.",
  },
  {
    q: "What does the Hah Taew (5 Lines) tattoo mean?",
    a: "The Hah Taew is the most iconic Sak Yant design. Each of the five rows carries a specific blessing: row one prevents unjust punishment, row two protects against misfortune, row three wards off black magic, row four brings good luck, and row five grants power and attraction.",
  },
  {
    q: "Why do Muay Thai fighters get Sak Yant?",
    a: "Thai fighters have sought Sak Yant protection for centuries. The tattoos are believed to make the skin resistant to weapons, grant invincibility in battle, and channel the energy of Buddhist scripture — a powerful psychological ritual before any bout.",
  },
  {
    q: "What is The Contender Fight Series in Pokhara?",
    a: "Nepal's premier Muay Thai promotion event held in Pokhara. It features local fighters from Lakeside gyms competing against national and international opponents — the primary competitive outlet for Sak Yant athletes.",
  },
];

// ── Gallery images (Unsplash Muay Thai / Nepal) ───────────────────────────
const galleryPhotos = [
  { src: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=600&q=80", caption: "Morning pad work, Lakeside" },
  { src: "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80", caption: "Clinch training" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", caption: "Conditioning circuit" },
  { src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80", caption: "Evening run, Fewa Lake" },
  { src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80", caption: "Heavy bag session" },
  { src: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=600&q=80", caption: "Sparring day" },
  { src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80", caption: "Strength & conditioning" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", caption: "Annapurna backdrop" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", caption: "Mountain sunrise" },
  { src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&q=80", caption: "Lakeside golden hour" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", caption: "Himalayan peaks" },
  { src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80", caption: "Pokhara valley" },
];

// ── Background Mosaic ─────────────────────────────────────────────────────
const BG_IMGS = [
  "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=300&q=40",
  "https://images.unsplash.com/photo-1549476464-37392f717541?w=300&q=40",
  "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=300&q=40",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&q=40",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=40",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&q=40",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=40",
  "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=300&q=40",
  "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=300&q=40",
  "https://images.unsplash.com/photo-1509781827353-fb95d4a6bd71?w=300&q=40",
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=300&q=40",
  "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=300&q=40",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=40",
  "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=300&q=40",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&q=40",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=40",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=40",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=40",
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=300&q=40",
  "https://images.unsplash.com/photo-1422289333144-4759a4d93d8a?w=300&q=40",
];

const BackgroundMosaic = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    <div className="grid grid-cols-5 gap-0 w-full h-full">
      {BG_IMGS.map((src, i) => (
        <div key={i} className="overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover"
            style={{ filter: "grayscale(80%) sepia(30%) hue-rotate(330deg) brightness(0.3)" }} />
        </div>
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(139,0,0,0.22), transparent)" }} />
  </div>
);

// ── Sak Yant SVG ─────────────────────────────────────────────────────────────
const YantSymbol = ({ size = 120, opacity = 0.7 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
    <polygon points="50,14 86,33 86,67 50,86 14,67 14,33" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
    <polygon points="50,28 72,50 50,72 28,50" fill="none" stroke="#C0392B" strokeWidth="1" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <circle cx="50" cy="50" r="7" fill="none" stroke="#C0392B" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="2.5" fill="#D4AF37" />
    {[0,45,90,135,180,225,270,315].map(a => {
      const r = a * Math.PI / 180;
      return <line key={a} x1={50+7*Math.cos(r)} y1={50+7*Math.sin(r)} x2={50+14*Math.cos(r)} y2={50+14*Math.sin(r)} stroke="#D4AF37" strokeWidth="0.5" />;
    })}
    {[0,60,120,180,240,300].map(a => {
      const r = a * Math.PI / 180;
      return <line key={a} x1={50+15*Math.cos(r)} y1={50+15*Math.sin(r)} x2={50+40*Math.cos(r)} y2={50+40*Math.sin(r)} stroke="#D4AF37" strokeWidth="0.4" opacity="0.6" />;
    })}
  </svg>
);

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ label, title, subtitle }) => (
  <div className="text-center mb-12">
    <span className="inline-block text-xs font-bold tracking-widest text-red-500 uppercase mb-3 px-4 py-1 border border-red-900/50 rounded-full">
      {label}
    </span>
    <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Georgia', serif" }}>
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 max-w-xl mx-auto">{subtitle}</p>}
  </div>
);

// ── Accordion ────────────────────────────────────────────────────────────────
const AccordionItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-red-900/40 rounded-lg overflow-hidden mb-3 transition-all"
      style={{ background: open ? "rgba(139,0,0,0.1)" : "rgba(255,255,255,0.03)" }}>
      <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-amber-400 pr-4">{faq.q}</span>
        <span className="text-amber-500 text-xl flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-red-900/40 mb-4" />
          <p className="text-slate-300 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
};

// ── Fighter Card ──────────────────────────────────────────────────────────────
const FighterCard = ({ fighter }) => (
  <div className="relative border border-slate-700/50 rounded-xl overflow-hidden group hover:border-red-700/60 transition-all duration-300"
    style={{ background: "rgba(15,15,15,0.85)" }}>
    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${fighter.accent}, #D4AF37)` }} />
    {fighter.badge && (
      <div className="absolute top-4 right-4">
        <span className="text-xs font-bold px-2 py-1 rounded-full text-amber-900"
          style={{ background: "linear-gradient(135deg,#D4AF37,#F5D060)" }}>⚔ LOCAL</span>
      </div>
    )}
    <div className="p-5">
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black mb-4 border-2"
        style={{ background: `${fighter.accent}33`, borderColor: fighter.accent, color: "#D4AF37" }}>
        {fighter.initials}
      </div>
      <h3 className="text-white font-bold mb-1">{fighter.name}</h3>
      <p className="text-slate-400 text-sm mb-3">{fighter.weight}</p>
      <span className="text-2xl font-black text-amber-400">{fighter.record}</span>
    </div>
  </div>
);

// ── Gallery ───────────────────────────────────────────────────────────────────
const Gallery = () => {
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {galleryPhotos.map((photo, i) => (
          <div key={i} className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg border border-slate-800 hover:border-amber-700/50 transition-all duration-300 group"
            onClick={() => setActive(photo)}>
            <div className="relative overflow-hidden">
              <img src={photo.src} alt={photo.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "brightness(0.85) saturate(0.8)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs text-white font-semibold">{photo.caption}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setActive(null)}>
          <div className="relative max-w-3xl w-full mx-6" onClick={e => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-white text-2xl hover:text-amber-400 transition-colors"
              onClick={() => setActive(null)}>✕</button>
            <img src={active.src} alt={active.caption} className="w-full rounded-xl object-cover max-h-[80vh]" />
            <p className="text-center text-amber-400 mt-3 font-semibold text-sm">{active.caption}</p>
          </div>
        </div>
      )}
    </>
  );
};

// ── Member Registration Form ──────────────────────────────────────────────────
const WEIGHT_CLASSES = ["Strawweight (−47kg)", "Mini flyweight (−49kg)", "Flyweight (−51kg)", "Super flyweight (−53kg)", "Bantamweight (−55kg)", "Featherweight (−58kg)", "Lightweight (−61kg)", "Welterweight (−67kg)", "Middleweight (−72.5kg)", "Heavyweight (+72.5kg)"];
const EXPERIENCE = ["Complete Beginner", "Some Gym Experience", "Intermediate (1-3 yrs)", "Advanced (3+ yrs)", "Competitive Fighter"];
const GOALS = ["Fitness & Weight Loss", "Learn Self-Defence", "Compete Locally", "Compete Nationally", "Professional Career"];

const MemberForm = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    dob: "", nationality: "", weightClass: "", experience: "",
    goal: "", photo: null, photoPreview: null,
    emergencyName: "", emergencyPhone: "", medicalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [memberCard, setMemberCard] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set("photoPreview", ev.target.result);
    reader.readAsDataURL(file);
    set("photo", file);
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email) return;
    setMemberCard({ ...form, memberId: `SYL-${Date.now().toString().slice(-5)}`, joinDate: new Date().toLocaleDateString("en-GB") });
    setSubmitted(true);
  };

  if (submitted && memberCard) {
    return (
      <div className="flex flex-col items-center gap-8">
        {/* Member Card */}
        <div className="w-full max-w-md rounded-2xl overflow-hidden border border-amber-700/40"
          style={{ background: "linear-gradient(135deg, #0f0f0f, #1a0505)", boxShadow: "0 0 40px rgba(212,175,55,0.15)" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, #8B0000, #D4AF37, #8B0000)" }} />
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                {memberCard.photoPreview
                  ? <img src={memberCard.photoPreview} alt="Member" className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600/50" />
                  : <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-black border-2 border-amber-700/50"
                      style={{ background: "rgba(139,0,0,0.3)", color: "#D4AF37" }}>
                      {memberCard.firstName[0]}{memberCard.lastName[0]}
                    </div>
                }
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold tracking-widest text-red-500 uppercase mb-1">Member Card</div>
                <div className="text-xl font-black text-white">{memberCard.firstName} {memberCard.lastName}</div>
                <div className="text-amber-400 text-sm mt-1">{memberCard.weightClass || "Weight class TBC"}</div>
                <div className="text-slate-500 text-xs mt-1">{memberCard.nationality}</div>
              </div>
              <div className="text-right">
                <YantSymbol size={48} opacity={0.5} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ["Member ID", memberCard.memberId],
                ["Joined", memberCard.joinDate],
                ["Experience", memberCard.experience || "—"],
                ["Goal", memberCard.goal || "—"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-white text-sm font-semibold">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <div className="flex-1">
                <div className="text-xs text-slate-500 mb-1">Contact</div>
                <div className="text-white text-xs">{memberCard.email}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-600">SAK YANT LAKESIDE</div>
                <div className="text-xs text-slate-700">Pokhara, Nepal</div>
              </div>
            </div>
          </div>
          <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
        </div>

        <button onClick={() => { setSubmitted(false); setMemberCard(null); setForm({ firstName:"",lastName:"",email:"",phone:"",dob:"",nationality:"",weightClass:"",experience:"",goal:"",photo:null,photoPreview:null,emergencyName:"",emergencyPhone:"",medicalNotes:"" }); }}
          className="px-6 py-3 border border-red-900/50 text-red-400 rounded-lg text-sm hover:bg-red-900/20 transition-all">
          Register Another Member
        </button>
      </div>
    );
  }

  // Form field style helpers
  const inputCls = "w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-amber-600/60 transition-colors border border-slate-700/60 placeholder-slate-600";
  const inputStyle = { background: "rgba(255,255,255,0.04)" };
  const labelCls = "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-slate-800"
        style={{ background: "rgba(10,10,10,0.85)" }}>
        <div className="h-1" style={{ background: "linear-gradient(90deg, #8B0000, #D4AF37)" }} />
        <div className="p-8">

          {/* ── Personal Info ── */}
          <div className="mb-8">
            <h3 className="text-amber-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">1</span>
              Personal Information
            </h3>

            {/* Photo upload */}
            <div className="flex items-center gap-5 mb-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden flex items-center justify-center cursor-pointer hover:border-amber-700/60 transition-colors relative"
                style={{ background: "rgba(255,255,255,0.03)" }}
                onClick={() => document.getElementById("photo-upload").click()}>
                {form.photoPreview
                  ? <img src={form.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  : <div className="text-center p-2"><div className="text-2xl mb-1">📷</div><div className="text-slate-600 text-xs">Photo</div></div>
                }
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-1">Profile Photo</div>
                <div className="text-slate-500 text-xs mb-2">Upload a clear face photo for your member card</div>
                <button onClick={() => document.getElementById("photo-upload").click()}
                  className="text-xs px-3 py-1.5 border border-slate-700 rounded-lg text-slate-400 hover:border-amber-700/50 hover:text-amber-500 transition-all">
                  Choose Photo
                </button>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>First Name *</label>
                <input className={inputCls} style={inputStyle} placeholder="Bikash" value={form.firstName}
                  onChange={e => set("firstName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Last Name *</label>
                <input className={inputCls} style={inputStyle} placeholder="Gurung" value={form.lastName}
                  onChange={e => set("lastName", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Email *</label>
                <input className={inputCls} style={inputStyle} type="email" placeholder="you@email.com" value={form.email}
                  onChange={e => set("email", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input className={inputCls} style={inputStyle} type="tel" placeholder="+977 98..." value={form.phone}
                  onChange={e => set("phone", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Date of Birth</label>
                <input className={inputCls} style={inputStyle} type="date" value={form.dob}
                  onChange={e => set("dob", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nationality</label>
                <input className={inputCls} style={inputStyle} placeholder="Nepali" value={form.nationality}
                  onChange={e => set("nationality", e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── Fighting Info ── */}
          <div className="mb-8">
            <h3 className="text-amber-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">2</span>
              Fighting Profile
            </h3>

            <div className="mb-4">
              <label className={labelCls}>Weight Class</label>
              <select className={inputCls} style={inputStyle} value={form.weightClass}
                onChange={e => set("weightClass", e.target.value)}>
                <option value="">Select weight class...</option>
                {WEIGHT_CLASSES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className={labelCls}>Experience Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXPERIENCE.map(exp => (
                  <button key={exp} onClick={() => set("experience", exp)}
                    className="text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200"
                    style={{
                      border: form.experience === exp ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.08)",
                      background: form.experience === exp ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.03)",
                      color: form.experience === exp ? "#D4AF37" : "#888",
                    }}>
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Training Goal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOALS.map(goal => (
                  <button key={goal} onClick={() => set("goal", goal)}
                    className="text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200"
                    style={{
                      border: form.goal === goal ? "1px solid #C0392B" : "1px solid rgba(255,255,255,0.08)",
                      background: form.goal === goal ? "rgba(139,0,0,0.18)" : "rgba(255,255,255,0.03)",
                      color: form.goal === goal ? "#F1948A" : "#888",
                    }}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Emergency & Medical ── */}
          <div className="mb-8">
            <h3 className="text-amber-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">3</span>
              Emergency & Medical
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Emergency Contact Name</label>
                <input className={inputCls} style={inputStyle} placeholder="Full name" value={form.emergencyName}
                  onChange={e => set("emergencyName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Emergency Contact Phone</label>
                <input className={inputCls} style={inputStyle} placeholder="+977 98..." value={form.emergencyPhone}
                  onChange={e => set("emergencyPhone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Medical Notes / Injuries</label>
              <textarea className={inputCls} style={{ ...inputStyle, resize: "none" }} rows={3}
                placeholder="Any medical conditions, injuries, or allergies the trainer should know about..."
                value={form.medicalNotes}
                onChange={e => set("medicalNotes", e.target.value)} />
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit}
            disabled={!form.firstName || !form.lastName || !form.email}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{ background: (!form.firstName || !form.lastName || !form.email) ? "#333" : "linear-gradient(135deg,#8B0000,#C0392B)", color: "#fff", letterSpacing: "0.15em" }}>
            Generate Member Card ↗
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">* Required fields: First Name, Last Name, Email</p>
        </div>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0a", fontFamily: "'Georgia', serif" }}>
      <BackgroundMosaic />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="mb-8">
          <YantSymbol size={140} opacity={0.85} />
        </div>
        <div className="text-center max-w-4xl">
          <p className="text-xs font-bold tracking-[0.4em] text-amber-500 uppercase mb-4">✦ Pokhara, Nepal · Lakeside ✦</p>
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Georgia', serif", background: "linear-gradient(135deg,#fff 0%,#D4AF37 50%,#C0392B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SAK YANT
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-2">LAKESIDE</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-red-700" />
            <span className="text-amber-400 tracking-widest">MUAY THAI</span>
            <div className="h-px w-16 bg-red-700" />
          </div>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed italic">
            Where Sacred Ink Meets Savage Training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="px-8 py-4 font-bold text-sm tracking-widest uppercase rounded-lg transition-all hover:scale-105 text-center"
              style={{ background: "linear-gradient(135deg,#8B0000,#C0392B)", color: "#fff" }}>
              Join the Gym
            </a>
            <a href="#gallery" className="px-8 py-4 font-bold text-sm tracking-widest uppercase rounded-lg border border-amber-600/60 text-amber-400 hover:bg-amber-900/20 transition-all text-center">
              View Gallery
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-500 text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-600 to-transparent" />
        </div>
      </section>

      {/* GYM FEATURES */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="The Gym" title="The Lakeside Advantage"
            subtitle="Why athletes from across Nepal choose Fewa Lake over the city stadium." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🏔️", title: "Altitude Training",  desc: "827m elevation enhances VO₂ max and endurance naturally" },
              { icon: "🌊", title: "Lake Recovery",      desc: "Cold Fewa Lake plunges accelerate muscle recovery" },
              { icon: "🥊", title: "Authentic Thai Kru", desc: "Trainers with 15+ years fighting experience in Thailand" },
              { icon: "🏯", title: "Sacred Culture",     desc: "Sak Yant blessing ceremonies for fighters before bouts" },
              { icon: "👥", title: "Community",          desc: "A brotherhood of local and international athletes" },
              { icon: "⚡", title: "Contender Ready",    desc: "Pipeline to The Contender Fight Series, Pokhara" },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-800 hover:border-red-800/50 transition-all group"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-1">{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Gallery" title="Life at Sak Yant"
            subtitle="Grit, culture, and the mountain spirit — captured from the gym floor to Fewa Lake." />
          <Gallery />
        </div>
      </section>

      {/* SACRED INK FAQ */}
      <section className="relative z-10 py-24 px-6">
        <div className="relative max-w-3xl mx-auto">
          <SectionHeader label="Sacred Ink" title="The Culture of Sak Yant"
            subtitle="Ancient wisdom woven into every fighter's journey." />
          <div className="flex justify-center mb-8"><YantSymbol size={80} opacity={0.7} /></div>
          {faqs.map((faq, i) => <AccordionItem key={i} faq={faq} />)}
        </div>
      </section>

      {/* FIGHTER ROSTER */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="The Roster" title="Pokhara's Finest"
            subtitle="Meet the warriors who carry Sak Yant's banner into every ring." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {fighters.map((f, i) => <FighterCard key={i} fighter={f} />)}
          </div>
        </div>
      </section>

      {/* MEMBER REGISTRATION */}
      <section id="register" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Join the Gym" title="Become a Member"
            subtitle="Fill in your details below and generate your official Sak Yant Lakeside member card." />
          <MemberForm />
        </div>
      </section>

      {/* CONTENDER CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-red-900/40 p-12 text-center"
            style={{ background: "linear-gradient(135deg,rgba(139,0,0,0.2),rgba(20,20,20,0.9))" }}>
            <p className="text-xs font-bold tracking-widest text-red-400 uppercase mb-4">⚔ Event</p>
            <h2 className="text-5xl font-black text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>The Contender</h2>
            <h3 className="text-2xl font-bold text-amber-400 mb-6">Fight Series · Pokhara</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Nepal's premier Muay Thai championship. Sak Yant athletes compete carrying their sacred ink and the spirit of Fewa Lake into every bout.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[["10+","Local Gyms"],["500+","Spectators"],["20+","Bouts / Event"]].map(([v,l])=>(
                <div key={l}><div className="text-3xl font-black text-amber-400">{v}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wide mt-1">{l}</div></div>
              ))}
            </div>
            <button className="px-10 py-4 font-bold text-sm tracking-widest uppercase rounded-lg hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg,#D4AF37,#F5D060)", color: "#1a0a00" }}>
              Watch the Series ↗
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-2xl font-black text-amber-400 mb-1">SAK YANT LAKESIDE</div>
            <div className="text-slate-500 text-sm">Lakeside, Pokhara 33700 · Nepal</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Est. 2015</span><span>·</span><span>827m ASL</span><span>·</span><span>Muay Thai</span>
          </div>
          <div className="text-xs text-slate-700">© 2024 Sak Yant Muay Thai</div>
        </div>
      </footer>
    </div>
  );
}
