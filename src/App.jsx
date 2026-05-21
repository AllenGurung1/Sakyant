// Google Fonts loaded via useEffect
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap";

import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const fighters = [
  { name: "Bikash Gurung",   weight: "Welterweight",  record: "12-3", badge: true,  initials: "BG", accent: "#8B0000" },
  { name: "Anish Tamang",    weight: "Lightweight",   record: "8-1",  badge: true,  initials: "AT", accent: "#B8860B" },
  { name: "Priya Rana",      weight: "Strawweight",   record: "5-2",  badge: false, initials: "PR", accent: "#556B2F" },
  { name: "Roshan Shrestha", weight: "Middleweight",  record: "9-4",  badge: true,  initials: "RS", accent: "#8B0000" },
  { name: "Suman Karki",     weight: "Featherweight", record: "6-2",  badge: false, initials: "SK", accent: "#B8860B" },
  { name: "Nisha Lama",      weight: "Flyweight",     record: "4-1",  badge: true,  initials: "NL", accent: "#8B0000" },
];

const faqs = [
  { q: "What does 'Sak Yant' actually mean?", a: "Sak Yant (สักยันต์) translates to 'sacred geometric tattooing'. 'Sak' means 'to tap' or 'tattoo' while 'Yant' derives from the Sanskrit 'Yantra', a sacred geometric diagram believed to carry magical protection, power, and fortune." },
  { q: "What does the Hah Taew (5 Lines) tattoo mean?", a: "The Hah Taew is the most iconic Sak Yant design. Each of the five rows carries a specific blessing: row one prevents unjust punishment, row two protects against misfortune, row three wards off black magic, row four brings good luck, and row five grants power and attraction." },
  { q: "Why do Muay Thai fighters get Sak Yant?", a: "Thai fighters have sought Sak Yant protection for centuries. The tattoos are believed to make the skin resistant to weapons, grant invincibility in battle, and channel the energy of Buddhist scripture — a powerful psychological ritual before any bout." },
  { q: "What is The Contender Fight Series in Pokhara?", a: "Nepal's premier Muay Thai promotion event held in Pokhara. It features local fighters from Lakeside gyms competing against national and international opponents." },
  { q: "How is Lakeside training different from Rangasala?", a: "Rangasala focuses on competitive bouts in an urban setting. Lakeside training is shaped by altitude, lake-recovery, and a tighter community bond — ideal for fighters who want deep technique work alongside Nepal's mountain energy." },
];

const galleryPhotos = [
  { src: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=700&q=80", caption: "Morning pad work, Lakeside" },
  { src: "https://images.unsplash.com/photo-1549476464-37392f717541?w=700&q=80", caption: "Clinch training drill" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80", caption: "Conditioning circuit" },
  { src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&q=80", caption: "Evening run, Fewa Lake" },
  { src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&q=80", caption: "Heavy bag session" },
  { src: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=700&q=80", caption: "Sparring day" },
  { src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=700&q=80", caption: "Strength & conditioning" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", caption: "Annapurna backdrop" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80", caption: "Mountain sunrise" },
  { src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=700&q=80", caption: "Lakeside golden hour" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80", caption: "Himalayan peaks" },
  { src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=700&q=80", caption: "Pokhara valley" },
];

const achievements = [
  { year: "2024", title: "National Muay Thai Championship", result: "🥇 3 Gold Medals", desc: "Bikash Gurung, Anish Tamang & Nisha Lama claimed national titles at the 2024 NMSF Championship, Kathmandu.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=70" },
  { year: "2023", title: "Contender Fight Series II — Pokhara", result: "🏆 Best Gym Award", desc: "Sak Yant Lakeside won the Best Represented Gym award at Contender II with four fighters in the final card.", img: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=500&q=70" },
  { year: "2023", title: "WBC Muay Thai — Nepal Trials", result: "🥇 2 Qualifiers", desc: "Roshan Shrestha & Priya Rana qualified for the WBC Muay Thai South Asia regional trials held in Kathmandu.", img: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500&q=70" },
  { year: "2022", title: "Contender Fight Series I — Pokhara", result: "🥊 4 Bouts Won", desc: "Our debut on the Contender card — four fighters, four wins. The night that put Sak Yant Lakeside on Nepal's map.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=70" },
  { year: "2021", title: "Altitude Training Study", result: "📊 Featured Research", desc: "Sak Yant athletes participated in a high-altitude training study by Tribhuvan University's Sports Science dept.", img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=70" },
  { year: "2019", title: "First Sak Yant Blessing Ceremony", result: "🙏 Cultural Milestone", desc: "Hosted the first public Sak Yant blessing ceremony in Pokhara — a monk from Chiang Mai led 24 fighters in the ritual.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=70" },
];

const events = [
  { date: "AUG 15, 2025", status: "upcoming", tag: "Major Event", title: "Contender Fight Series III", venue: "Pokhara Stadium, Lakeside", desc: "Nepal's biggest Muay Thai night returns. Six Sak Yant fighters on the card.", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=75", details: ["6 Sak Yant fighters confirmed", "International headline bout", "Live streamed nationally", "Pre-fight Sak Yant ceremony"], accent: "#D4AF37" },
  { date: "JUL 4, 2025", status: "upcoming", tag: "In-Gym", title: "Sak Yant Blessing Ceremony", venue: "Sak Yant Lakeside Gym", desc: "Annual pre-season blessing with visiting Ajarn from Thailand. Open to all registered fighters.", img: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&q=75", details: ["Ajarn arriving from Chiang Mai", "Limited to 30 participants", "Traditional mongkol ritual", "Sacred Yant application"], accent: "#C0392B" },
  { date: "JUN 21, 2025", status: "upcoming", tag: "Training Camp", title: "Altitude Training Camp", venue: "Sarangkot, Pokhara", desc: "5-day intensive camp at 1600m. Open to intermediate and advanced fighters.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75", details: ["5 days, 4 nights", "1600m altitude sessions", "Morning runs at Sarangkot", "Tactical sparring evenings"], accent: "#556B2F" },
  { date: "MAY 10, 2025", status: "past", tag: "Interclub", title: "Lakeside Interclub Bouts", venue: "Sak Yant Lakeside Ring", desc: "Monthly interclub sparring night. Fighters from 5 Pokhara gyms came together for 18 bouts.", img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=75", details: ["18 bouts completed", "5 gyms represented", "3 Sak Yant fighters won", "Open door to public"], accent: "#888" },
  { date: "MAR 22, 2025", status: "past", tag: "National", title: "NMSF Nepal Open 2025", venue: "Tribhuvan Army Club, Kathmandu", desc: "National championship. Sak Yant sent 4 fighters — 2 gold, 1 silver, 1 bronze.", img: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=600&q=75", details: ["2 gold, 1 silver, 1 bronze", "4 fighters represented", "Ranked #2 gym nationally", "Bikash named MVP"], accent: "#888" },
];

const BG_IMGS = [
  "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=300&q=30",
  "https://images.unsplash.com/photo-1549476464-37392f717541?w=300&q=30",
  "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=300&q=30",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&q=30",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=30",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&q=30",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=30",
  "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=300&q=30",
  "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=300&q=30",
  "https://images.unsplash.com/photo-1509781827353-fb95d4a6bd71?w=300&q=30",
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=300&q=30",
  "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=300&q=30",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=30",
  "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=300&q=30",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&q=30",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=30",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=30",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=30",
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=300&q=30",
  "https://images.unsplash.com/photo-1422289333144-4759a4d93d8a?w=300&q=30",
  "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=300&q=30",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&q=30",
  "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=300&q=30",
  "https://images.unsplash.com/photo-1509781827353-fb95d4a6bd71?w=300&q=30",
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=300&q=30",
];

const WEIGHT_CLASSES = ["Strawweight (−47kg)","Mini flyweight (−49kg)","Flyweight (−51kg)","Super flyweight (−53kg)","Bantamweight (−55kg)","Featherweight (−58kg)","Lightweight (−61kg)","Welterweight (−67kg)","Middleweight (−72.5kg)","Heavyweight (+72.5kg)"];
const EXPERIENCE = ["Complete Beginner","Some Gym Experience","Intermediate (1-3 yrs)","Advanced (3+ yrs)","Competitive Fighter"];
const GOALS = ["Fitness & Weight Loss","Learn Self-Defence","Compete Locally","Compete Nationally","Professional Career"];

// Membership plans
const PLANS = [
  {
    id: "weekly",
    name: "Weekly Pass",
    price: 3000,
    unit: "/ week",
    renewal: null,
    tag: null,
    color: "#B8860B",
    features: ["Full gym access 7 days", "All group classes", "Locker room access", "No commitment required"],
  },
  {
    id: "monthly_first",
    name: "Monthly — First Month",
    price: 8000,
    unit: "/ first month",
    renewal: "Renewal: NPR 6,000/mo",
    tag: "Most Popular",
    color: "#D4AF37",
    popular: true,
    features: ["Full gym access 30 days", "All group classes", "Sparring sessions", "Progress tracking"],
  },
  {
    id: "monthly_foreigner",
    name: "Foreigner Monthly",
    price: 8500,
    unit: "/ month",
    renewal: null,
    tag: null,
    color: "#C0392B",
    features: ["International welcome pack", "Airport pick-up option", "English-speaking trainer", "Cultural ceremony access"],
  },
  {
    id: "kids",
    name: "Kids Program",
    price: 6000,
    unit: "/ first month",
    renewal: "Renewal: NPR 5,000/mo",
    tag: "Under 12",
    color: "#556B2F",
    features: ["Ages below 12", "Dedicated kids session 5–6 PM", "Safety-first curriculum", "Parent observation allowed"],
  },
  {
    id: "group",
    name: "Group Class Drop-in",
    price: 1000,
    unit: "/ session",
    renewal: null,
    tag: null,
    color: "#8B0000",
    features: ["Any single group class", "No membership needed", "All levels welcome", "Equipment provided"],
  },
  {
    id: "private",
    name: "Private Coaching",
    price: 2000,
    unit: "/ session",
    renewal: "2,500/session (senior Kru)",
    tag: null,
    color: "#4A235A",
    features: ["1-on-1 with certified Kru", "Tailored technique work", "Fight camp prep available", "Video analysis included"],
    extra: "20-session pack: NPR 25,000–30,000",
  },
];

// Class schedule
const SCHEDULE = [
  { time: "7:00 – 8:30 AM",   class: "Muay Thai",           level: "All Levels",          icon: "🥊", color: "#8B0000",  period: "morning" },
  { time: "8:30 – 10:00 AM",  class: "MMA",                 level: "All Levels",          icon: "🤼", color: "#B8860B",  period: "morning" },
  { time: "10:00 AM – 4:00 PM", class: "Private Sessions",  level: "By Appointment",      icon: "🎯", color: "#2C5F2E",  period: "midday" },
  { time: "5:00 – 6:00 PM",   class: "Kids Muay Thai",      level: "Under 12",            icon: "👦", color: "#556B2F",  period: "evening" },
  { time: "6:00 – 7:00 PM",   class: "Beginners (Adult)",   level: "Beginner",            icon: "🌱", color: "#1A5276",  period: "evening" },
  { time: "7:00 – 8:30 PM",   class: "Intermediate / Pro",  level: "Intermediate+",       icon: "⚡", color: "#C0392B",  period: "evening" },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const YantSymbol = ({ size = 120, opacity = 0.7 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
    <polygon points="50,14 86,33 86,67 50,86 14,67 14,33" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
    <polygon points="50,28 72,50 50,72 28,50" fill="none" stroke="#C0392B" strokeWidth="1" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <circle cx="50" cy="50" r="7" fill="none" stroke="#C0392B" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="2.5" fill="#D4AF37" />
    {[0,45,90,135,180,225,270,315].map(a => { const r=a*Math.PI/180; return <line key={a} x1={50+7*Math.cos(r)} y1={50+7*Math.sin(r)} x2={50+14*Math.cos(r)} y2={50+14*Math.sin(r)} stroke="#D4AF37" strokeWidth="0.5"/>; })}
    {[0,60,120,180,240,300].map(a => { const r=a*Math.PI/180; return <line key={a} x1={50+15*Math.cos(r)} y1={50+15*Math.sin(r)} x2={50+40*Math.cos(r)} y2={50+40*Math.sin(r)} stroke="#D4AF37" strokeWidth="0.4" opacity="0.6"/>; })}
  </svg>
);

// AI-generated style hero image using canvas art
const HeroArtCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    // Deep dark background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0a0005");
    bg.addColorStop(0.5, "#150008");
    bg.addColorStop(1, "#0a0a00");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Mountain silhouette
    ctx.fillStyle = "#0f0f0f";
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H*0.55);
    ctx.lineTo(W*0.1, H*0.35);
    ctx.lineTo(W*0.2, H*0.45);
    ctx.lineTo(W*0.32, H*0.18);
    ctx.lineTo(W*0.45, H*0.38);
    ctx.lineTo(W*0.58, H*0.1);
    ctx.lineTo(W*0.7, H*0.32);
    ctx.lineTo(W*0.82, H*0.42);
    ctx.lineTo(W*0.9, H*0.28);
    ctx.lineTo(W, H*0.5);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // Golden glow at center-top
    const glow = ctx.createRadialGradient(W/2, H*0.3, 10, W/2, H*0.3, W*0.4);
    glow.addColorStop(0, "rgba(212,175,55,0.35)");
    glow.addColorStop(0.4, "rgba(192,57,43,0.15)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Draw Yant hexagon geometry
    const cx = W/2, cy = H*0.3;
    const R = 90;
    ctx.strokeStyle = "rgba(212,175,55,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI/3)*i - Math.PI/6;
      const x = cx + R*Math.cos(angle), y = cy + R*Math.sin(angle);
      i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.stroke();

    // Inner star
    ctx.strokeStyle = "rgba(192,57,43,0.8)";
    ctx.lineWidth = 1;
    const pts6 = Array.from({length:6}, (_,i) => {
      const a = (Math.PI/3)*i - Math.PI/6;
      return [cx+R*0.55*Math.cos(a), cy+R*0.55*Math.sin(a)];
    });
    ctx.beginPath();
    [0,2,4,0].forEach(i => { const [x,y]=pts6[i]; ctx.lineTo(x,y); });
    ctx.stroke();
    ctx.beginPath();
    [1,3,5,1].forEach(i => { const [x,y]=pts6[i]; ctx.lineTo(x,y); });
    ctx.stroke();

    // Decorative circles
    [R*1.1, R*0.7, R*0.35].forEach((r,i) => {
      ctx.strokeStyle = i===0 ? "rgba(212,175,55,0.25)" : "rgba(212,175,55,0.4)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.stroke();
    });

    // Radiating lines from center
    for (let i=0; i<24; i++) {
      const a = (Math.PI*2/24)*i;
      const r1=R*0.35, r2=R*0.95;
      ctx.strokeStyle = "rgba(212,175,55,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx+r1*Math.cos(a), cy+r1*Math.sin(a));
      ctx.lineTo(cx+r2*Math.cos(a), cy+r2*Math.sin(a));
      ctx.stroke();
    }

    // Fighter silhouette (stylized kick pose)
    const fx = W*0.5, fy = H*0.6;
    const scale = 1.8;
    ctx.fillStyle = "rgba(20,0,0,0.95)";
    ctx.strokeStyle = "rgba(192,57,43,0.9)";
    ctx.lineWidth = 1.2;
    // Head
    ctx.beginPath();
    ctx.arc(fx, fy - 62*scale, 10*scale, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    // Body
    ctx.beginPath();
    ctx.moveTo(fx, fy - 52*scale);
    ctx.lineTo(fx - 4*scale, fy - 20*scale);
    ctx.lineTo(fx + 14*scale, fy - 20*scale);
    ctx.lineTo(fx + 8*scale, fy - 52*scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Left arm raised (guard)
    ctx.beginPath();
    ctx.moveTo(fx - 4*scale, fy - 45*scale);
    ctx.lineTo(fx - 14*scale, fy - 58*scale);
    ctx.lineTo(fx - 10*scale, fy - 62*scale);
    ctx.lineWidth = 5*scale;
    ctx.strokeStyle = "rgba(192,57,43,0.85)";
    ctx.stroke();
    // Right arm — high kick punch
    ctx.beginPath();
    ctx.moveTo(fx + 8*scale, fy - 45*scale);
    ctx.lineTo(fx + 22*scale, fy - 55*scale);
    ctx.lineWidth = 5*scale;
    ctx.stroke();
    // Back leg
    ctx.beginPath();
    ctx.moveTo(fx - 2*scale, fy - 20*scale);
    ctx.lineTo(fx - 8*scale, fy);
    ctx.lineTo(fx - 5*scale, fy + 15*scale);
    ctx.lineWidth = 6*scale;
    ctx.strokeStyle = "rgba(139,0,0,0.9)";
    ctx.stroke();
    // Front leg — kick
    ctx.beginPath();
    ctx.moveTo(fx + 4*scale, fy - 20*scale);
    ctx.lineTo(fx + 18*scale, fy - 5*scale);
    ctx.lineTo(fx + 28*scale, fy - 20*scale);
    ctx.lineWidth = 6*scale;
    ctx.stroke();

    // Sacred script lines (simulated Thai sacred text)
    ctx.fillStyle = "rgba(212,175,55,0.35)";
    ctx.font = `${8}px serif`;
    const sacredY = [H*0.82, H*0.85, H*0.88, H*0.91, H*0.94];
    const sacredTexts = ["᪑᪒᪓᪔᪕᪖᪗᪘᪙","ᬒᬃᬄᬅᬆᬇᬈ","ᨀᨁᨂᨃᨄᨅᨆ","᭐᭑᭒᭓᭔᭕᭖","ᬓᬔᬕᬖᬗᬘᬙ"];
    sacredTexts.forEach((t, i) => {
      ctx.fillText(t.repeat(Math.floor(W/40)), W*0.05, sacredY[i]);
    });

    // Top text: SAK YANT
    ctx.fillStyle = "rgba(212,175,55,0.9)";
    ctx.font = `bold ${20}px "Bebas Neue", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.3em";
    ctx.fillText("SAK YANT", W/2, H*0.07);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `${11}px "Barlow Condensed", Georgia, serif`;
    ctx.fillText("LAKESIDE · MUAY THAI · POKHARA", W/2, H*0.12);

    // Fewa Lake reflection at bottom
    const lake = ctx.createLinearGradient(0, H*0.72, 0, H);
    lake.addColorStop(0, "rgba(0,20,40,0)");
    lake.addColorStop(0.3, "rgba(0,10,25,0.6)");
    lake.addColorStop(1, "rgba(0,5,15,0.85)");
    ctx.fillStyle = lake;
    ctx.fillRect(0, H*0.72, W, H*0.28);

    // Reflection ripples
    for (let i=0; i<6; i++) {
      const ry = H*0.78 + i*12;
      ctx.strokeStyle = `rgba(212,175,55,${0.05 + i*0.03})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(W/2, ry, W*0.3 + i*15, 3, 0, 0, Math.PI*2);
      ctx.stroke();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={420}
      style={{ width: "100%", maxWidth: 700, borderRadius: 16, border: "1px solid rgba(212,175,55,0.25)", display: "block", margin: "0 auto" }}
    />
  );
};

const SectionHeader = ({ label, title, subtitle }) => (
  <div className="text-center mb-12">
    <span className="inline-block text-red-500 uppercase mb-3 px-4 py-1 border border-red-900/50 rounded-full" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", fontWeight: 700 }}>{label}</span>
    <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: "0.02em" }}>{title}</h2>
    {subtitle && <p className="text-slate-400 max-w-xl mx-auto text-base">{subtitle}</p>}
  </div>
);

const BackgroundMosaic = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    <div className="grid grid-cols-5 gap-0 w-full h-full">
      {BG_IMGS.map((src, i) => (
        <div key={i} className="overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover"
            style={{ filter: "grayscale(80%) sepia(30%) hue-rotate(330deg) brightness(0.28)" }} />
        </div>
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/88 to-black" />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(139,0,0,0.20), transparent)" }} />
  </div>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { path: "#home",        label: "Home" },
  { path: "#gym",         label: "The Gym" },
  { path: "#gallery",     label: "Gallery" },
  { path: "#achievements",label: "Honours" },
  { path: "#events",      label: "Events" },
  { path: "#membership",  label: "Membership" },
  { path: "#culture",     label: "Culture" },
  { path: "#roster",      label: "Roster" },
  { path: "#location",    label: "Location" },
  { path: "#register",    label: "Join" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = NAV_LINKS.map(l => {
        const el = document.querySelector(l.path);
        return el ? { path: l.path, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = offsets.filter(o => o.top <= 120).pop();
      if (current) setActive(current.path);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (path) => {
    const id = path.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(8,8,8,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", backdropFilter: scrolled ? "blur(14px)" : "none" }}>
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between h-24">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-2.5 group">
          <YantSymbol size={50} opacity={0.9} />
          <div className="text-left">
            <div className="text-amber-400 font-black text-base leading-none" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.1rem", letterSpacing: "0.12em" }}>SAK YANT</div>
            <div className="text-slate-500 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.22em" }}>LAKESIDE · MT</div>
          </div>
        </button>
        <div className="hidden xl:flex items-center gap-0.5 ">
          {NAV_LINKS.map(l => (
            <button key={l.path} onClick={() => scrollTo(l.path)}
              className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200"
              style={{ color: active === l.path ? "#D4AF37" : "#666", background: active === l.path ? "rgba(212,175,55,0.08)" : "transparent", fontFamily: "'Barlow Condensed', sans-serif" }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#register")}
            className="ml-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#8B0000,#C0392B)", color: "#fff" }}>
            Join Now
          </button>
        </div>
        <button className="xl:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="w-6 h-0.5 bg-amber-400 transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "" }} />
          <span className="w-6 h-0.5 bg-amber-400 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 bg-amber-400 transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "" }} />
        </button>
      </div>
      {menuOpen && (
        <div className="xl:hidden border-t border-slate-800 py-4 px-6 flex flex-col gap-1" style={{ background: "rgba(8,8,8,0.98)" }}>
          {NAV_LINKS.map(l => (
            <button key={l.path} onClick={() => scrollTo(l.path)}
              className="text-left px-3 py-3 text-sm font-bold uppercase tracking-widest rounded transition-colors"
              style={{ color: active === l.path ? "#D4AF37" : "#888" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── ACCORDION ───────────────────────────────────────────────────────────────

const AccordionItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-red-900/40 rounded-lg overflow-hidden mb-3 transition-all"
      style={{ background: open ? "rgba(139,0,0,0.1)" : "rgba(255,255,255,0.03)" }}>
      <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpen(!open)}>
        <span className="text-amber-400 pr-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600 }}>{faq.q}</span>
        <span className="text-amber-500 text-2xl flex-shrink-0 transition-transform duration-300"
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

// ─── FIGHTER CARD ────────────────────────────────────────────────────────────

const FighterCard = ({ fighter }) => (
  <div className="relative border border-slate-700/50 rounded-xl overflow-hidden hover:border-red-700/60 transition-all duration-300 group"
    style={{ background: "rgba(15,15,15,0.85)" }}>
    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${fighter.accent},#D4AF37)` }} />
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
      <h3 className="text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 700 }}>{fighter.name}</h3>
      <p className="text-slate-400 text-sm mb-3">{fighter.weight}</p>
      <span className="text-amber-400" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.7rem", letterSpacing: "0.05em" }}>{fighter.record}</span>
      <span className="text-slate-500 text-xs ml-2">W-L</span>
    </div>
  </div>
);

// ─── GALLERY ─────────────────────────────────────────────────────────────────

const Gallery = () => {
  const [active, setActive] = useState(null);
  const [idx, setIdx] = useState(0);
  const open = (i) => { setIdx(i); setActive(galleryPhotos[i]); };
  const prev = (e) => { e.stopPropagation(); const ni=(idx-1+galleryPhotos.length)%galleryPhotos.length; setIdx(ni); setActive(galleryPhotos[ni]); };
  const next = (e) => { e.stopPropagation(); const ni=(idx+1)%galleryPhotos.length; setIdx(ni); setActive(galleryPhotos[ni]); };
  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {galleryPhotos.map((photo, i) => (
          <div key={i} className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg border border-slate-800 hover:border-amber-700/50 transition-all duration-300 group" onClick={() => open(i)}>
            <div className="relative overflow-hidden">
              <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ filter: "brightness(0.85) saturate(0.8)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs text-white font-semibold">{photo.caption}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92" onClick={() => setActive(null)}>
          <button className="absolute top-5 right-6 text-white text-3xl hover:text-amber-400 transition-colors z-10" onClick={() => setActive(null)}>✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:border-amber-500 hover:text-amber-400 transition-all z-10 text-xl" style={{ background: "rgba(0,0,0,0.7)" }} onClick={prev}>‹</button>
          <div className="max-w-4xl w-full mx-16" onClick={e => e.stopPropagation()}>
            <img src={active.src} alt={active.caption} className="w-full rounded-xl object-cover max-h-[78vh]" />
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-amber-400 font-semibold text-sm">{active.caption}</p>
              <p className="text-slate-600 text-xs">{idx+1} / {galleryPhotos.length}</p>
            </div>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:border-amber-500 hover:text-amber-400 transition-all z-10 text-xl" style={{ background: "rgba(0,0,0,0.7)" }} onClick={next}>›</button>
        </div>
      )}
    </>
  );
};

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────

const Achievements = () => (
  <div className="relative">
    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-700/60 via-red-900/40 to-transparent" style={{ transform: "translateX(-0.5px)" }} />
    <div className="space-y-12">
      {achievements.map((a, i) => (
        <div key={i} className={`relative flex flex-col md:flex-row gap-6 items-start ${i%2===0?"md:flex-row":"md:flex-row-reverse"}`}>
          <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full border-2 border-amber-500 z-10" style={{ background: "#8B0000", transform: "translate(-50%, 18px)" }} />
          <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-700/40 transition-all duration-300 group ${i%2===0?"md:mr-8":"md:ml-8"}`} style={{ background: "rgba(12,12,12,0.9)" }}>
            <div className="relative h-40 overflow-hidden">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ filter: "brightness(0.55) saturate(0.7)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)" }} />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-black px-2 py-1 rounded text-amber-900 mr-2" style={{ background: "linear-gradient(135deg,#D4AF37,#F5D060)" }}>{a.year}</span>
                <span className="text-lg">{a.result}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 700 }}>{a.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
            </div>
          </div>
          <div className="hidden md:block md:w-[calc(50%-2rem)]" />
        </div>
      ))}
    </div>
  </div>
);

// ─── EVENTS ──────────────────────────────────────────────────────────────────

const Events = () => {
  const [filter, setFilter] = useState("all");
  const visible = events.filter(e => filter==="all" || e.status===filter);
  return (
    <div>
      <div className="flex justify-center gap-3 mb-10">
        {["all","upcoming","past"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200"
            style={{ background: filter===f ? "linear-gradient(135deg,#8B0000,#C0392B)" : "rgba(255,255,255,0.04)", color: filter===f ? "#fff" : "#666", border: filter===f ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
            {f==="all"?"All Events":f==="upcoming"?"Upcoming":"Past"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((ev, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 group"
            style={{ borderColor: ev.status==="upcoming"?`${ev.accent}55`:"rgba(255,255,255,0.07)", background: "rgba(12,12,12,0.9)" }}>
            <div className="relative h-44 overflow-hidden">
              <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: ev.status==="past"?"grayscale(60%) brightness(0.5)":"brightness(0.6) saturate(0.85)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)" }} />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: ev.status==="upcoming"?"rgba(212,175,55,0.9)":"rgba(80,80,80,0.85)", color: ev.status==="upcoming"?"#1a0a00":"#ccc" }}>
                  {ev.status==="upcoming"?"⚡ Upcoming":"✓ Past"}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-xs font-bold px-2 py-1 rounded border text-slate-300" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)" }}>{ev.tag}</span>
              </div>
              <div className="absolute bottom-3 left-4">
                <span className="text-xs font-black tracking-widest" style={{ color: ev.status==="upcoming"?ev.accent:"#888" }}>{ev.date}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white mb-1 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 700 }}>{ev.title}</h3>
              <p className="text-slate-500 text-xs mb-3 flex items-center gap-1"><span>📍</span>{ev.venue}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{ev.desc}</p>
              <div className="space-y-1.5 mb-4">
                {ev.details.map((d, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ev.status==="upcoming"?ev.accent:"#555" }} />{d}
                  </div>
                ))}
              </div>
              {ev.status==="upcoming" && (
                <button className="w-full py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${ev.accent}, ${ev.accent}aa)`, color: ev.accent==="#556B2F"?"#d4f0a0":"#fff" }}>
                  {ev.accent==="#D4AF37"?"Get Tickets ↗":"Register Now ↗"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MEMBERSHIP PLANS ────────────────────────────────────────────────────────

const MembershipSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {/* Pricing grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {PLANS.map((plan) => (
          <div key={plan.id}
            className="rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            style={{
              borderColor: selected===plan.id ? plan.color : plan.popular ? `${plan.color}88` : "rgba(255,255,255,0.08)",
              background: selected===plan.id ? `${plan.color}18` : "rgba(12,12,12,0.9)",
              boxShadow: selected===plan.id ? `0 0 30px ${plan.color}30` : "none",
            }}
            onClick={() => setSelected(selected===plan.id?null:plan.id)}>
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${plan.color},#D4AF37)` }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {plan.tag && (
                    <span className="inline-block text-xs font-black px-2.5 py-1 rounded-full mb-2 tracking-wider"
                      style={{ background: `${plan.color}33`, color: plan.color, border: `1px solid ${plan.color}55` }}>
                      {plan.tag}
                    </span>
                  )}
                  <h3 className="text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 700 }}>{plan.name}</h3>
                </div>
              </div>
              <div className="mb-4">
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2.2rem", letterSpacing: "0.03em", color: plan.color }}>
                  NPR {plan.price.toLocaleString()}
                </span>
                <span className="text-slate-500 text-sm ml-1">{plan.unit}</span>
                {plan.renewal && (
                  <div className="mt-1 text-xs text-slate-500">{plan.renewal}</div>
                )}
                {plan.extra && (
                  <div className="mt-2 text-xs font-bold px-3 py-1.5 rounded-lg inline-block"
                    style={{ background: `${plan.color}20`, color: plan.color, border: `1px solid ${plan.color}40` }}>
                    📦 {plan.extra}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span style={{ color: plan.color }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                style={{ background: selected===plan.id ? `linear-gradient(135deg,${plan.color},${plan.color}cc)` : "rgba(255,255,255,0.05)", color: selected===plan.id ? "#fff" : plan.color, border: `1px solid ${plan.color}55` }}>
                {selected===plan.id ? "Selected ✓" : "Select Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Class Schedule */}
      <div>
        <div className="text-center mb-8">
          <span className="inline-block text-amber-500 uppercase mb-3 px-4 py-1 border border-amber-900/50 rounded-full" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", fontWeight: 700 }}>Daily Schedule</span>
          <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>Class Timetable</h3>
          <p className="text-slate-400 mt-2 text-sm">Monday – Saturday · All classes include warm-up & cool-down</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {/* Morning block */}
          <div className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-amber-900/30" />🌅 Morning Sessions<div className="h-px flex-1 bg-amber-900/30" />
          </div>
          {SCHEDULE.filter(s => s.period==="morning").map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group"
              style={{ background: "rgba(15,15,15,0.9)" }}>
              <div className="text-2xl w-10 text-center flex-shrink-0">{s.icon}</div>
              <div className="w-36 flex-shrink-0">
                <div className="text-xs font-black text-amber-400 tracking-wide">{s.time}</div>
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600 }}>{s.class}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
                {s.level}
              </span>
            </div>
          ))}

          {/* Midday block */}
          <div className="text-xs font-black uppercase tracking-widest text-slate-600 my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />☀️ Midday<div className="h-px flex-1 bg-slate-800" />
          </div>
          {SCHEDULE.filter(s => s.period==="midday").map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group"
              style={{ background: "rgba(15,15,15,0.9)" }}>
              <div className="text-2xl w-10 text-center flex-shrink-0">{s.icon}</div>
              <div className="w-36 flex-shrink-0">
                <div className="text-xs font-black text-amber-400 tracking-wide">{s.time}</div>
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600 }}>{s.class}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
                {s.level}
              </span>
            </div>
          ))}

          {/* Evening block */}
          <div className="text-xs font-black uppercase tracking-widest text-red-700 my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-red-900/30" />🌙 Evening Sessions<div className="h-px flex-1 bg-red-900/30" />
          </div>
          {SCHEDULE.filter(s => s.period==="evening").map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group"
              style={{ background: "rgba(15,15,15,0.9)" }}>
              <div className="text-2xl w-10 text-center flex-shrink-0">{s.icon}</div>
              <div className="w-36 flex-shrink-0">
                <div className="text-xs font-black text-amber-400 tracking-wide">{s.time}</div>
              </div>
              <div className="flex-1">
                <div className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600 }}>{s.class}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
                {s.level}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-slate-600 text-xs mt-6">Sunday: Rest day · Public holidays may vary · Private sessions available any day by booking</p>
      </div>
    </div>
  );
};

// ─── LOCATION MAP ─────────────────────────────────────────────────────────────

const LocationSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Map embed */}
      <div className="rounded-2xl overflow-hidden border border-slate-800" style={{ height: 420 }}>
        <iframe
          title="Sak Yant Lakeside Gym Location"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
          loading="lazy"
          allowFullScreen
          src="https://www.openstreetmap.org/export/embed.html?bbox=83.94,28.19,83.98,28.22&layer=mapnik&marker=28.2096,83.9585"
        />
      </div>

      {/* Info panel */}
      <div className="space-y-5">
        <div className="rounded-xl border border-slate-800 p-5" style={{ background: "rgba(15,15,15,0.9)" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-amber-400 font-black text-sm uppercase tracking-widest">Address</div>
              <div className="text-white text-base font-semibold">Lakeside, Pokhara 33700</div>
              <div className="text-slate-500 text-sm">Bagmati Province, Nepal</div>
            </div>
          </div>
          <div className="h-px bg-slate-800 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {[
              ["🕐", "Mon – Sat", "6:30 AM – 9:00 PM"],
              ["🕐", "Sunday", "Closed (Rest Day)"],
              ["📞", "Phone", "+977 61 000 000"],
              ["✉️", "Email", "info@sakyantlakeside.com"],
            ].map(([icon, label, val], i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                <div className="text-white text-xs font-semibold mt-0.5">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Landmarks */}
        <div className="rounded-xl border border-slate-800 p-5" style={{ background: "rgba(15,15,15,0.9)" }}>
          <div className="text-amber-400 font-black text-xs uppercase tracking-widest mb-4">Nearby Landmarks</div>
          <div className="space-y-3">
            {[
              { icon: "🌊", name: "Fewa Lake shore", dist: "2 min walk" },
              { icon: "✈️", name: "Pokhara International Airport", dist: "15 min drive" },
              { icon: "🏔️", name: "Annapurna viewpoint", dist: "25 min drive" },
              { icon: "🛶", name: "Tal Barahi Temple boat dock", dist: "5 min walk" },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{l.icon}</span>
                  <span className="text-slate-300">{l.name}</span>
                </div>
                <span className="text-xs text-amber-600 font-bold">{l.dist}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="https://maps.google.com/?q=28.2096,83.9585" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg,#8B0000,#C0392B)", color: "#fff" }}>
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
};

// ─── MEMBER FORM ─────────────────────────────────────────────────────────────

const MemberForm = () => {
  const [form, setForm] = useState({ firstName:"",lastName:"",email:"",phone:"",dob:"",nationality:"",weightClass:"",experience:"",goal:"",photoPreview:null,emergencyName:"",emergencyPhone:"",medicalNotes:"" });
  const [submitted, setSubmitted] = useState(false);
  const [memberCard, setMemberCard] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePhoto = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set("photoPreview", ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email) return;
    setMemberCard({ ...form, memberId: `SYL-${Date.now().toString().slice(-5)}`, joinDate: new Date().toLocaleDateString("en-GB") });
    setSubmitted(true);
  };

  if (submitted && memberCard) {
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-md rounded-2xl overflow-hidden border border-amber-700/40"
          style={{ background: "linear-gradient(135deg,#0f0f0f,#1a0505)", boxShadow: "0 0 60px rgba(212,175,55,0.1)" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#8B0000,#D4AF37,#8B0000)" }} />
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                {memberCard.photoPreview
                  ? <img src={memberCard.photoPreview} alt="Member" className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600/40" />
                  : <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-black border-2 border-amber-700/40"
                      style={{ background: "rgba(139,0,0,0.3)", color: "#D4AF37" }}>
                      {memberCard.firstName[0]}{memberCard.lastName[0]}
                    </div>}
              </div>
              <div className="flex-1">
                <div className="text-red-500 uppercase mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", fontWeight: 700 }}>Member Card</div>
                <div className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700 }}>{memberCard.firstName} {memberCard.lastName}</div>
                <div className="text-amber-400 text-sm mt-1">{memberCard.weightClass || "Weight TBC"}</div>
                <div className="text-slate-500 text-xs mt-1">{memberCard.nationality}</div>
              </div>
              <YantSymbol size={44} opacity={0.45} />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[["Member ID",memberCard.memberId],["Joined",memberCard.joinDate],["Experience",memberCard.experience||"—"],["Goal",memberCard.goal||"—"]].map(([l,v]) => (
                <div key={l} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{l}</div>
                  <div className="text-white text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <div className="flex-1"><div className="text-xs text-slate-500 mb-1">Contact</div><div className="text-white text-xs">{memberCard.email}</div></div>
              <div className="text-right"><div className="text-xs text-slate-600">SAK YANT LAKESIDE</div><div className="text-xs text-slate-700">Pokhara, Nepal</div></div>
            </div>
          </div>
          <div className="h-0.5" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />
        </div>
        <button onClick={() => { setSubmitted(false); setMemberCard(null); setForm({ firstName:"",lastName:"",email:"",phone:"",dob:"",nationality:"",weightClass:"",experience:"",goal:"",photoPreview:null,emergencyName:"",emergencyPhone:"",medicalNotes:"" }); }}
          className="px-6 py-3 border border-red-900/50 text-red-400 rounded-lg text-sm hover:bg-red-900/20 transition-all">
          Register Another Member
        </button>
      </div>
    );
  }

  const inp = "w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-amber-600/60 transition-colors border border-slate-700/60 placeholder-slate-600";
  const inpStyle = { background: "rgba(255,255,255,0.04)" };
  const lbl = "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2";
  const ready = form.firstName && form.lastName && form.email;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-slate-800" style={{ background: "rgba(10,10,10,0.88)" }}>
        <div className="h-1" style={{ background: "linear-gradient(90deg,#8B0000,#D4AF37)" }} />
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-amber-400 uppercase mb-5 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.22em", fontWeight: 700 }}>
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">1</span>
              Personal Information
            </h3>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden flex items-center justify-center cursor-pointer hover:border-amber-700/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", flexShrink: 0 }}
                onClick={() => document.getElementById("photo-upload").click()}>
                {form.photoPreview ? <img src={form.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  : <div className="text-center"><div className="text-2xl">📷</div><div className="text-slate-600 text-xs mt-1">Photo</div></div>}
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-1">Profile Photo</div>
                <div className="text-slate-500 text-xs mb-3">Upload a clear face photo for your member card</div>
                <button onClick={() => document.getElementById("photo-upload").click()}
                  className="text-xs px-3 py-1.5 border border-slate-700 rounded-lg text-slate-400 hover:border-amber-700/50 hover:text-amber-500 transition-all">
                  Choose Photo
                </button>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className={lbl}>First Name *</label><input className={inp} style={inpStyle} placeholder="Bikash" value={form.firstName} onChange={e => set("firstName", e.target.value)} /></div>
              <div><label className={lbl}>Last Name *</label><input className={inp} style={inpStyle} placeholder="Gurung" value={form.lastName} onChange={e => set("lastName", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className={lbl}>Email *</label><input className={inp} style={inpStyle} type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
              <div><label className={lbl}>Phone</label><input className={inp} style={inpStyle} placeholder="+977 98..." value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lbl}>Date of Birth</label><input className={inp} style={inpStyle} type="date" value={form.dob} onChange={e => set("dob", e.target.value)} /></div>
              <div><label className={lbl}>Nationality</label><input className={inp} style={inpStyle} placeholder="Nepali" value={form.nationality} onChange={e => set("nationality", e.target.value)} /></div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-amber-400 uppercase mb-5 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.22em", fontWeight: 700 }}>
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">2</span>
              Fighting Profile
            </h3>
            <div className="mb-4">
              <label className={lbl}>Weight Class</label>
              <select className={inp} style={inpStyle} value={form.weightClass} onChange={e => set("weightClass", e.target.value)}>
                <option value="">Select weight class...</option>
                {WEIGHT_CLASSES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className={lbl}>Experience Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXPERIENCE.map(exp => (
                  <button key={exp} onClick={() => set("experience", exp)}
                    className="text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200"
                    style={{ border: form.experience===exp?"1px solid #D4AF37":"1px solid rgba(255,255,255,0.08)", background: form.experience===exp?"rgba(212,175,55,0.12)":"rgba(255,255,255,0.03)", color: form.experience===exp?"#D4AF37":"#777" }}>
                    {exp}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={lbl}>Training Goal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOALS.map(goal => (
                  <button key={goal} onClick={() => set("goal", goal)}
                    className="text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200"
                    style={{ border: form.goal===goal?"1px solid #C0392B":"1px solid rgba(255,255,255,0.08)", background: form.goal===goal?"rgba(139,0,0,0.18)":"rgba(255,255,255,0.03)", color: form.goal===goal?"#F1948A":"#777" }}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-amber-400 uppercase mb-5 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.22em", fontWeight: 700 }}>
              <span className="w-5 h-5 rounded-full bg-red-900/60 flex items-center justify-center text-xs text-amber-500">3</span>
              Emergency & Medical
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><label className={lbl}>Emergency Contact</label><input className={inp} style={inpStyle} placeholder="Full name" value={form.emergencyName} onChange={e => set("emergencyName", e.target.value)} /></div>
              <div><label className={lbl}>Emergency Phone</label><input className={inp} style={inpStyle} placeholder="+977 98..." value={form.emergencyPhone} onChange={e => set("emergencyPhone", e.target.value)} /></div>
            </div>
            <div>
              <label className={lbl}>Medical Notes / Injuries</label>
              <textarea className={inp} style={{ ...inpStyle, resize: "none" }} rows={3}
                placeholder="Any conditions, injuries, or allergies the trainer should know about..."
                value={form.medicalNotes} onChange={e => set("medicalNotes", e.target.value)} />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={!ready}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{ background: ready?"linear-gradient(135deg,#8B0000,#C0392B)":"#333", color: "#fff", letterSpacing: "0.15em" }}>
            Generate Member Card ↗
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">* Required fields: First Name, Last Name, Email</p>
        </div>
      </div>
    </div>
  );
};

// ─── APP LAYOUT ───────────────────────────────────────────────────────────────

function AppLayout() {
  useEffect(() => {
    if (!document.getElementById("gfonts-sakyant")) {
      const link = document.createElement("link");
      link.id = "gfonts-sakyant";
      link.rel = "stylesheet";
      link.href = FONT_LINK;
      document.head.appendChild(link);
    }
  }, []);
  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}>
      <BackgroundMosaic />
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28">
        {/* AI-style canvas art hero image */}
        <div className="w-full max-w-2xl mb-10 px-4">
          <HeroArtCanvas />
          <p className="text-center text-slate-600 text-xs mt-2 tracking-widest">✦ SACRED INK · ANCIENT POWER · MODERN FIGHTER ✦</p>
        </div>
        <div className="text-center max-w-4xl">
          <p className="text-amber-500 uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.85rem", letterSpacing: "0.35em", fontWeight: 600 }}>✦ Pokhara, Nepal · Lakeside · Est. 2015 ✦</p>
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em", background: "linear-gradient(135deg,#fff 0%,#D4AF37 50%,#C0392B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SAK YANT
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.35em" }}>LAKESIDE</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-red-700" />
            <span className="text-amber-400 tracking-widest">MUAY THAI</span>
            <div className="h-px w-16 bg-red-700" />
          </div>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem" }}>Where Sacred Ink Meets Savage Training</p>
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-10">
            {[["2015","Founded"],["827m","Altitude"],["200+","Alumni"],["3×","Contender Champs"]].map(([v,l]) => (
              <div key={l} className="text-center p-3 rounded-xl border border-slate-800" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-xl font-black text-amber-400">{v}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 font-bold text-sm tracking-widest uppercase rounded-lg transition-all hover:scale-105 text-center"
              style={{ background: "linear-gradient(135deg,#8B0000,#C0392B)", color: "#fff" }}>View Plans</button>
            <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 font-bold text-sm tracking-widest uppercase rounded-lg border border-amber-600/60 text-amber-400 hover:bg-amber-900/20 transition-all text-center">Upcoming Events</button>
          </div>
        </div>
        <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-500 text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-600 to-transparent" />
        </div>
      </section>

      {/* GYM FEATURES */}
      <section id="gym" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="The Gym" title="The Lakeside Advantage" subtitle="Why athletes from across Nepal choose Fewa Lake over the city stadium." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon:"🏔️",title:"Altitude Training",desc:"827m elevation enhances VO₂ max and endurance naturally" },
              { icon:"🌊",title:"Lake Recovery",desc:"Cold Fewa Lake plunges accelerate muscle recovery" },
              { icon:"🥊",title:"Authentic Thai Kru",desc:"Trainers with 15+ years fighting experience in Thailand" },
              { icon:"🏯",title:"Sacred Culture",desc:"Sak Yant blessing ceremonies for fighters before bouts" },
              { icon:"👥",title:"Community",desc:"A brotherhood of local and international athletes" },
              { icon:"⚡",title:"Contender Ready",desc:"Pipeline to The Contender Fight Series, Pokhara" },
            ].map((f,i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-800 hover:border-red-800/50 transition-all" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="text-amber-400 uppercase mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 700 }}>{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Gallery" title="Life at Sak Yant" subtitle="Moments from the gym floor to the Himalayan skyline." />
          <Gallery />
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Honours" title="Our Achievements" subtitle="A history built fight by fight, ceremony by ceremony, summit by summit." />
          <Achievements />
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Schedule" title="Events & Fights" subtitle="Upcoming bouts, training camps, and ceremonies." />
          <Events />
        </div>
      </section>

      {/* MEMBERSHIP & SCHEDULE */}
      <section id="membership" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Membership" title="Plans & Pricing" subtitle="Flexible options for every level — from drop-in visitors to competitive fighters." />
          <MembershipSection />
        </div>
      </section>

      {/* SACRED INK FAQ */}
      <section id="culture" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Sacred Ink" title="The Culture of Sak Yant" subtitle="Ancient wisdom woven into every fighter's journey." />
          <div className="flex justify-center mb-8"><YantSymbol size={80} opacity={0.75} /></div>
          {faqs.map((faq, i) => <AccordionItem key={i} faq={faq} />)}
        </div>
      </section>

      {/* FIGHTER ROSTER */}
      <section id="roster" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="The Roster" title="Pokhara's Finest" subtitle="Meet the warriors who carry Sak Yant's banner into every ring." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {fighters.map((f, i) => <FighterCard key={i} fighter={f} />)}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Find Us" title="Lakeside, Pokhara" subtitle="On the western shore of Fewa Lake, beneath the Annapurna range." />
          <LocationSection />
        </div>
      </section>

      {/* MEMBER REGISTRATION */}
      <section id="register" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Join the Gym" title="Become a Member" subtitle="Fill in your details below and generate your official Sak Yant Lakeside member card." />
          <MemberForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <YantSymbol size={36} opacity={0.8} />
                <div>
                  <div className="text-amber-400 font-black" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.3rem", letterSpacing: "0.1em" }}>SAK YANT LAKESIDE</div>
                  <div className="text-slate-500" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em" }}>MUAY THAI · POKHARA</div>
                </div>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Nepal's premier Muay Thai gym, nestled on the shores of Fewa Lake at 827m above sea level.</p>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Navigate</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {NAV_LINKS.map(l => (
                  <button key={l.path} onClick={() => document.querySelector(l.path)?.scrollIntoView({ behavior: "smooth" })} className="text-slate-400 hover:text-amber-400 text-sm transition-colors text-left">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact</div>
              <div className="space-y-2 text-sm text-slate-400">
                <p>📍 Lakeside, Pokhara 33700</p>
                <p>📞 +977 61 000 000</p>
                <p>✉️ info@sakyantlakeside.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-700">© 2025 Sak Yant Muay Thai Lakeside · All rights reserved</div>
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <span>Est. 2015</span><span>·</span><span>827m ASL</span><span>·</span><span>Pokhara, Nepal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}