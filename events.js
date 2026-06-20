/* =====================================================================
   GAK / GAC SHARED EVENT DATA  (events.js)
   ---------------------------------------------------------------------
   This is THE single source of truth. It is read by:
     - the homepage carousel/calendar
     - the email builder and the media (flyer/poster) maker
     - the calendar feed builder (build-ics.js) that makes gak-classes.ics
     - the GAC page later (same file, PAGE_TAG = "GAC")

   Edit the ALL_EVENTS list below to add / change / remove anything.
   See the big field guide in gak-events-calendar.html for what each
   field does and how the "schedule" types work.

   Loaded two ways, automatically:
     - In a browser via <script src="events.js"> it defines the globals
       ALL_EVENTS, TEACHERS, CAT_COLORS (and PAGE_TAG).
     - In Node (the calendar build step) it exports the same things.
===================================================================== */

var PAGE_TAG = (typeof window !== 'undefined' && window.PAGE_TAG) ? window.PAGE_TAG : "GAK";

/* category -> default accent color (an item's own "color" wins over this) */
var CAT_COLORS = {
  pottery:'orange', dance:'purple', specialty:'blue', littles:'green',
  camp:'yellow', enrollment:'blue', classes:'blue', family:'green',
  adult:'orange', shop:'purple'
};

/* teacher bios (link an event with teacher:"haley") */
var TEACHERS = {
  haley: {
    name: "Haley Holmgren",
    role: "Ceramics & Paint Nights",
    color: "#FF5733",
    img: null,
    bio: "Haley hand-throws the ceramics for our Paint & Sip nights and leads our Ceramics camps and classes."
  }
};

/* THE master list. Everything is generated from this. */
var ALL_EVENTS = [
  {
    id: "crepe_paint",
    pages: ["GAK","GAC"],
    title: "Crepe & Paint at AB Crepes",
    category: "pottery",
    tags: ["Adult Events","Paint & Sip","Ceramics"],
    teacher: "haley",
    location: "AB Crepes, downtown Bellingham, WA",
    price: "Limited to 10 spots",
    hook: "Plates hand-thrown in our studio",
    description: "Your midweek creative reset! Paint a hand-thrown ceramic plate made in our studio, guided by instructor Haley. <strong>Every other Tuesday &middot; 6:00&ndash;8:30 PM</strong> &middot; AB Crepes, downtown Bellingham &middot; Limited to 10 spots!",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/crepe-and-paint-ab-crepes.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-7519_orig.jpeg",
    schedule: { type:"biweekly", weekday:2, anchor:"2026-06-09", until:"2026-09-16", startTime:"18:00", endTime:"20:30", skip:[] }
  },
  {
    id: "schweinhaus_paint_pint",
    pages: ["GAK","GAC"],
    title: "Paint & Pint at Schweinhaus",
    category: "pottery",
    tags: ["Adult Events","Paint & Sip","Ceramics"],
    teacher: "haley",
    location: "Schweinhaus Biergarten, Bellingham, WA",
    price: "$35 per painter",
    spots: "20 spots",
    hook: "Steins fired by Haley",
    description: "Paint your own handmade ceramic stein, sip a cold beer, snack on pretzels, and take home a one-of-a-kind souvenir. <strong>Wednesday, July 9 &middot; 6:00&ndash;8:00 PM</strong> &middot; Instructor: Haley &middot; Limited to 20 spots!",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/paint-and-pint-schweinhaus-july-9.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-7804_orig.jpeg",
    featured: true,
    schedule: { type:"once", date:"2026-07-09", startTime:"18:00", endTime:"20:00" }
  },
  {
    id: "hela_tote",
    pages: ["GAK","GAC"],
    title: "Paint a Tote at Hela Provisions",
    category: "specialty",
    tags: ["Adult Events","Paint & Sip"],
    location: "Hela Provisions, Bellingham, WA",
    spots: "15 spots",
    description: "Unwind with an evening of art and creativity! Design and paint your own reusable tote bag, all supplies, wine, and snacks included. <strong>July 16 &middot; 5&ndash;7 PM &middot; Limited to 15 spots!</strong>",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/paint-a-tote-hela-provisions.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/paint-and-sip-hella-psd-3_orig.jpeg",
    schedule: { type:"once", date:"2026-07-16", startTime:"17:00", endTime:"19:00" }
  },
  {
    id: "summer_camp_2026",
    pages: ["GAK"],
    title: "Summer Camp 2026",
    category: "camp",
    tags: ["Camps"],
    location: "Gabriel's Art Kids, Bellingham, WA",
    description: "8 weeks of creative summer adventures for ages 2.5&ndash;16 in Bellingham! Little Sprouts, Budding Artists, Art &amp; Play, Ceramics, and Outdoor Camp. June 22 &ndash; August 14.",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/summer-camp-2026",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/summer-camp-square-2026_orig.jpeg",
    schedule: { type:"range", start:"2026-06-22", end:"2026-08-14", allDay:true }
  },
  {
    id: "ceramic_sculpture",
    pages: ["GAK","GAC"],
    title: "Ceramic & Sculpture Classes",
    category: "pottery",
    tags: ["Classes","Ceramics"],
    teacher: "haley",
    location: "Gabriel's Art Kids, Bellingham, WA",
    venueLabel: "Gabriel's Art Center",
    description: "Early Release Thursday program for middle school students. Pick-up at 1:15 PM from Whatcom, Shuksan, or Kulshan Middle School; drop-off at Whatcom Middle School (5:30/5:45 PM).",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/ceramic.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/ceramic-sculpture-class-square_orig.jpg",
    schedule: { type:"ongoing", expires:"2027-06-15" }
  },
  {
    id: "ece_enroll",
    pages: ["GAK"],
    title: "Now Enrolling: ECE 2026-2027",
    category: "enrollment",
    color: "orange",
    tags: ["Enrollment"],
    location: "2215 D St, Bellingham, WA",
    description: "Open enrollment is here! Give your little one a joyful start with our play-based, arts-integrated preschool &amp; pre-K at <strong>2215 D St</strong>. Ages 2.5-6, flexible scheduling, and a warm creative community.",
    buttonLabel: "Learn More & Enroll",
    link: "https://www.gabrielsartkids.com/ece.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-3719_orig.jpeg",
    schedule: { type:"ongoing", expires:"2026-09-15" }
  },
  {
    id: "rwsas_enroll",
    pages: ["GAK"],
    title: "Now Enrolling: RWSAS 2026-2027",
    category: "enrollment",
    color: "green",
    tags: ["Enrollment"],
    location: "1405 Dupont St, Bellingham, WA",
    description: "Open enrollment is now! Discover Bellingham's WA State-approved K-6 arts-integrated elementary school at <strong>1405 Dupont St</strong>. Project-based learning, small classes, and a curriculum where creativity and academics grow together.",
    buttonLabel: "Learn More & Enroll",
    link: "https://www.robertwilliamsschool.com/",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-3729_orig.jpeg",
    schedule: { type:"ongoing", expires:"2026-09-15" }
  },
  {
    id: "afterschool_enroll",
    pages: ["GAK"],
    title: "Now Enrolling: After-School 2026-2027",
    category: "enrollment",
    color: "purple",
    tags: ["Enrollment"],
    location: "Gabriel's Art Kids, Bellingham, WA",
    description: "Open enrollment is here! Visual arts, music, theater, and creative play for K-5th graders, with <strong>convenient van pick-up</strong> from Bellingham elementary schools.",
    buttonLabel: "Learn More & Enroll",
    link: "https://www.gabrielsartkids.com/afterschool.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-3723_orig.jpeg",
    schedule: { type:"ongoing", expires:"2026-09-15" }
  },
  {
    id: "ceramics_tryout_days",
    pages: ["GAK","GAC"],
    title: "Ceramics Camp Try-Out Days",
    category: "pottery",
    tags: ["Camps","Ceramics"],
    teacher: "haley",
    location: "Holly Street Studio, Bellingham, WA",
    venueLabel: "Gabriel's Art Center",
    price: "$25 per session",
    description: "Try a ceramics class before committing to a full camp week! Drop-in sessions with Teacher Haley. $25 per session, credited toward tuition if you register within 30 days. Ages 5-16, all materials included!",
    buttonLabel: "Register Now",
    link: "https://form.jotform.com/261386344133051",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-7324_orig.jpeg",
    schedule: { type:"dates", dates:["2026-05-23","2026-06-04","2026-06-06","2026-06-07"], startTime:"10:00", endTime:"12:00" }
  },
  {
    id: "fiamma_pizza_paint",
    pages: ["GAK","GAC"],
    title: "Fiamma Pizza & Paint",
    category: "pottery",
    tags: ["Adult Events","Paint & Sip","Ceramics"],
    teacher: "haley",
    location: "Fiamma Pizza, Bellingham, WA",
    spots: "16 spots",
    description: "Paint your own ceramic plate and enjoy a fun evening out at Fiamma Pizza! Includes ceramic plate, supplies, pizza buffet, salad & drinks. Limited to 16 spots!",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/fiamma-pizza-paint-june1.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-7315_orig.jpeg",
    schedule: { type:"once", date:"2026-06-09", startTime:"18:30", endTime:"20:30" }
  },
  {
    id: "gak_store",
    pages: ["GAK"],
    title: "Check Out the GAK Store",
    category: "shop",
    tags: ["Shop"],
    description: "Filled with unique designs created by our talented artist/teachers. Each purchase directly funds scholarships, nurturing the future of young artists.",
    buttonLabel: "Shop Now",
    link: "https://www.gabrielsartkids.com/gakstore.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-4804_orig.gif",
    schedule: { type:"ongoing" }
  }
];

/* Node (the calendar build step) reads it through here */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALL_EVENTS: ALL_EVENTS, TEACHERS: TEACHERS, CAT_COLORS: CAT_COLORS };
}
