// ═══════════════════════════════════════════════════════════════
// KERALA WEDDING INVITATION - CONFIGURATION FILE
// Edit all your wedding details here. This is the ONLY file
// you need to modify to personalize your invitation.
// ═══════════════════════════════════════════════════════════════

const WEDDING_CONFIG = {

  // ── Couple Details ──────────────────────────────────────────
  bride: {
    name: "Anju",
    malayalamName: "അഞ്ജു",
    photo: "assets/bride.jpg",        // Replace with your photo
    description: "Daughter of Shri. Anil Kumar V B & Smt. Sindhu Anil",
    family: "Valiychetty Parambil (H), Kaloor"
  },
  groom: {
    name: "Ajith",
    malayalamName: "അജിത്",
    photo: "assets/groom.jpg",        // Replace with your photo
    description: "Son of Shri. Aravindakhan T S & Smt. Padmavathi",
    family: "Thathampalli, Aroor"
  },

  // ── Wedding Date & Time ─────────────────────────────────────
  wedding: {
    date: "2026-08-21T09:45:00",      // YYYY-MM-DDTHH:MM:SS (24hr format)
    muhurtham: "9:45 AM - 10:30 AM",
    venue: {
      name: "Anjumana Devi Temple, Edappally",
      address: "Edappally, Kochi, Kerala",
      mapsUrl: "https://maps.google.com/?q=Anjumana+Devi+Temple+Edappally",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.6!2d76.95!3d10.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sEdappally!5e0!3m2!1sen!2sin!4v1234567890"
    }
  },

  // ── Events Schedule ─────────────────────────────────────────
  events: [
    {
      name: "Wedding",
      nameMalayalam: "വിവാഹം",
      date: "2026-08-21",
      time: "9:45 AM - 10:30 AM",
      venue: "Anjumana Devi Temple, Edappally"
    },
    {
      name: "Reception",
      nameMalayalam: "ആഘോഷം",
      date: "2026-08-21",
      time: "11:00 AM",
      venue: "Anjumana Temple Auditorium, Edappally"
    }
  ],

  // ── Contact Numbers ─────────────────────────────────────────
  contact: {
    bridePhone: "+919876543210",
    groomPhone: "+919876543211",
    brideWhatsApp: "919876543210",
    groomWhatsApp: "919876543211"
  },

  // ── Family Members (Optional) ──────────────────────────────
  family: {
    brideSide: [
      { name: "Shri. Anil Kumar V B", relation: "Father" },
      { name: "Smt. Sindhu Anil", relation: "Mother" }
    ],
    groomSide: [
      { name: "Shri. Aravindakhan T S", relation: "Father" },
      { name: "Smt. Padmavathi", relation: "Mother" }
    ]
  },

  // ── Gallery Photos ─────────────────────────────────────────
  gallery: [
    "assets/gallery1.jpg",
    "assets/gallery2.jpg",
    "assets/gallery3.jpg",
    "assets/gallery4.jpg"
  ],

  // ── Background Music ───────────────────────────────────────
  music: {
    src: "assets/music.mp3",         // Replace with your song
    autoplay: false                   // Set true to autoplay (browsers may block)
  },

  // ── Theme Settings ─────────────────────────────────────────
  theme: {
    primaryColor: "#8B0000",          // Deep Maroon
    secondaryColor: "#C9A84C",        // Gold
    accentColor: "#FFFDD0",           // Cream/Ivory
    bgGradient: "linear-gradient(135deg, #FFF8E7 0%, #FFF5E1 50%, #FDF2E9 100%)"
  }
};
