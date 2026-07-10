/* =====================================================================
   GAK / GAC  -  events.js  -  THE ONE LIST EVERYTHING READS
   =====================================================================
   This single file feeds:
     - the homepage carousel + calendar
     - the calendar subscribe feed (build-ics.js makes gak-classes.ics)
     - the Email Builder and the Media Maker
     - the GAC page later (same file, just PAGE_TAG = "GAC")

   You only ever edit the ALL_EVENTS list near the bottom. When you save
   it on GitHub, everything else updates on its own.

   ---------------------------------------------------------------------
   HOW TO...
   ---------------------------------------------------------------------
   ADD an event     Copy the TEMPLATE block at the very bottom (it starts
                    with a comma), paste it just above the  ];  remove the
                    // from each line, and fill it in. Give it a new id.
   EDIT an event    Change the fields in its block. Save.
   REMOVE an event  Delete its whole { ... } block (and a stray comma).
   FEATURE          Put  featured: true  on an event. Featured events show
                    first with a star, and a "Featured" filter appears on the
                    site. You can feature as many as you like.
   EXTRA MEDIA      Add a  media: [ ... ]  list for more photos/videos beyond
                    the main image. They show as a gallery in the popup.
   CANCEL a session On a weekly/biweekly event, add the date to "skip",
                    e.g.  skip: ["2026-07-21"]
   AUTO-EXPIRE      Automatic. Past events disappear by themselves. You do
                    not delete old ones; leaving them is fine.

   FOR GAC EVENTS   (pages includes "GAC") the Art Center page filters
                    DIFFERENTLY than our calendar:
                      * category  -> the GAC "Activity" chip (use pottery,
                        dance, specialty, littles, adult, family).
                      * tags      -> the GAC "Who's it for" dropdown. Use an
                        audience word: All Ages / Whole Family / Adults /
                        Teens / Younger Students. Other tags show as badges.
                      * teacher   -> must match a key in TEACHERS (shows bio).
                    The GAC spotlight = the FIRST featured GAC event in list
                    order (highest in the list wins, not by date).
                    Full details in the project brief, section 8.

   ---------------------------------------------------------------------
   WHICH PAGE SHOWS AN EVENT  ->  the "pages" field
   ---------------------------------------------------------------------
       pages: ["GAK"]            main site only
       pages: ["GAC"]            Gabriel's Art Center page only
       pages: ["GAK","GAC"]      both

   ---------------------------------------------------------------------
   THE SCHEDULE  ->  pick ONE "type"
   ---------------------------------------------------------------------
     once     a single date
              { type:"once", date:"2026-07-09", startTime:"18:00", endTime:"20:00" }
     weekly   every week on a weekday until an end date
              weekday: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
              { type:"weekly", weekday:4, anchor:"2026-09-17", until:"2027-06-11",
                startTime:"13:15", endTime:"17:30", skip:["2026-11-26"] }
     biweekly every OTHER week (same fields; "anchor" must be a real session)
              { type:"biweekly", weekday:2, anchor:"2026-06-09", until:"2026-09-16",
                startTime:"18:00", endTime:"20:30", skip:[] }
     dates    a specific list of days
              { type:"dates", dates:["2026-05-23","2026-06-04"], startTime:"10:00", endTime:"12:00" }
     range    a multi-day program / camp week
              { type:"range", start:"2026-06-22", end:"2026-08-14", allDay:true }
     ongoing  no fixed dates, shows as a card until it expires
              { type:"ongoing", expires:"2026-09-15" }

   ---------------------------------------------------------------------
   EVERY FIELD, EXPLAINED  (full example - this is a COMMENT, not a real
   event; copy the live TEMPLATE at the very bottom to make a new one)
   ---------------------------------------------------------------------
     {
       id:          "unique_slug",          // REQUIRED. lowercase, no spaces. must be unique.
       pages:       ["GAK","GAC"],          // REQUIRED. which page(s) show it.
       title:       "My Event Name",        // REQUIRED. card headline.
       category:    "pottery",              // REQUIRED. sets the default color (see CAT_COLORS).
                                            //   pottery dance specialty littles camp
                                            //   enrollment classes family adult shop
       color:       "orange",               // optional. forces a color, overriding category.
                                            //   orange | purple | green | yellow | blue
       tags:        ["Adult Events","Ceramics"], // optional. the filter chips on the page.
       teacher:     "haley",                // optional. an id from TEACHERS below -> shows bio.
       venueLabel:  "Gabriel's Art Center", // optional. small green badge naming the space.
       location:    "123 Street, Bellingham, WA", // optional. also used in the calendar file.
       price:       "$35 per painter",      // optional. shown in the detail popup.
       spots:       "20 spots",             // optional. shown in the detail popup.
       hook:        "Steins fired by Haley",// optional. short highlight line.
       description: "One or two sentences. Simple <strong>bold</strong> is OK.", // REQUIRED.
       buttonLabel: "Register Now",         // REQUIRED. text on the button.
       link:        "https://...",          // REQUIRED. where the button goes.
       image:       "https://.../photo.jpeg",// REQUIRED. the MAIN square image. used by the
                                            //   card, the popup, the calendar AND the email tools.
                                            //   keep this as your one canonical image.
       media:       [                       // optional. EXTRA media beyond the main image.
         { type:"image", url:"https://.../photo2.jpeg", caption:"Back of the mug" },
         { type:"video", url:"https://youtu.be/ID", link:"https://youtu.be/ID",
           thumb:"https://.../cover.jpeg", caption:"Watch the class" }
       ],                                   //   shown as a thumbnail gallery in the popup.
                                            //   videos open their link in a new tab.
       featured:    true,                   // optional. shown first with a star. MORE THAN ONE
                                            //   event can be featured; on the site a "Featured"
                                            //   filter appears. Featured is per page (a GAC-only
                                            //   featured event only stars on the GAC page).
       dateLabel:   "Custom date text",     // optional. overrides the auto date line.
       schedule:    { type:"once", date:"2026-07-09", startTime:"18:00", endTime:"20:00" } // REQUIRED.
     }
===================================================================== */

var PAGE_TAG = (typeof window !== 'undefined' && window.PAGE_TAG) ? window.PAGE_TAG : "GAK";

/* category -> default accent color (an event's own "color" wins over this) */
var CAT_COLORS = {
  pottery:'orange', dance:'purple', specialty:'blue', littles:'green',
  camp:'yellow', enrollment:'blue', classes:'blue', family:'green',
  adult:'orange', shop:'purple'
};

/* teacher bios (link an event with  teacher:"haley" ) */
var TEACHERS = {
  haley: {
    name: "Haley Holmgren",
    role: "Ceramics & Paint Nights",
    color: "#FF5733",
    img: null,
    bio: "Haley hand-throws the ceramics for our Paint & Sip nights and leads our Ceramics camps and classes."
  }
};

/* =====================================================================
   THE MASTER LIST  -  edit below. Each event is separated by a divider.
   ===================================================================== */
var ALL_EVENTS = [

  /* ============ 1) Crepe & Paint  -  biweekly ============ */
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

  /* ============ 2) Paint & Pint at Schweinhaus  -  once (FEATURED) ============ */
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

  /* ============ 3) Paint a Tote at Hela  -  once ============ */
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


  /* ============ 12) Sketch & Pet at NEKO  -  once ============ */
  {
    id: "neko_sketch_pet",
    pages: ["GAK"],
    title: "Sketch & Pet: Observational Cat Drawing",
    category: "specialty",
    tags: ["All Ages","Drawing"],
    venueLabel: "NEKO Bellingham",
    location: "NEKO Cat Cafe, Bellingham, WA",
    price: "$30",
    hook: "Draw the kitties, all levels welcome",
    description: "A drawing class with the cutest live models around! Join GAK at NEKO for an observational drawing session with the kitties as your subjects. For all ages and all skill levels, paper, pencils, charcoal, and other sketching supplies purrvided by GAK.",
    buttonLabel: "Register Now",
    link: "https://book.peek.com/s/9be0c799-6cbe-4ddb-aa08-66c64af3043d/aD2d6",
    image: "https://www.nekocatcafe.com/asset/6a43f41566c3b/download-56.jpeg?w=400&h=400&fit=crop&fm=webp",
    schedule: { type:"once", date:"2026-07-23", startTime:"17:00", endTime:"19:00" }
  },

  /* ============ 13) First Friday Art Walk: GAC Soft Opening  -  once (FEATURED) ============ */
  {
    id: "gac_art_walk_aug7",
    pages: ["GAK","GAC"],
    title: "First Friday Art Walk: GAC Soft Opening",
    category: "family",
    tags: ["All Ages","Art Walk","Free"],
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "Free",
    hook: "Our soft opening, come see the space!",
    description: "Join us for the soft opening of <strong>Gabriel's Art Center</strong> as part of downtown Bellingham's First Friday Art Walk! Meet your favorite GAK and GAC instructors and enjoy work from visual artists, performers, and dancers, plus a first look at everything GAC has in store. No registration needed, just drop by.",
    buttonLabel: "Learn More About GAC",
    link: "https://www.gabrielsartkids.com/gabriels-art-center.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-art-walk_orig.jpeg",
    featured: true,
    schedule: { type:"once", date:"2026-08-07", startTime:"18:00", endTime:"22:00" }
  },


/* ============ Back-to-School Backpack Giveaway  -  ongoing (PROMO, FEATURED) ============ */
  ,{
    id: "backpack_giveaway_2026",
    pages: ["GAK"],
    title: "Back-to-School Backpack Giveaway",
    category: "enrollment",
    color: "orange",
    tags: ["Promo"],
    location: "Gabriel's Art Kids, Bellingham, WA",
    spots: "Limited to the first 20 families",
    hook: "First 20 families to register win a free backpack!",
    description: "The first 20 families to register for ASAP get a <strong>FREE backpack loaded with school supplies!</strong> Give your little artist everything they need to create from day one. <strong>Starts July 15 &middot; July &amp; August 2026.</strong>",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/enrollment-fees.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-3820_orig.jpeg",
    featured: true,
    dateLabel: "Register July 15 to August 31, 2026",
    schedule: { type:"ongoing", expires:"2026-08-31" }
  }

   
  /* ============ 4) Summer Camp 2026  -  range (multi-day) ============ */
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

  

  /* ============ 6) Now Enrolling: ECE  -  ongoing (color override) ============ */
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

  /* ============ 7) Now Enrolling: RWSAS  -  ongoing (color override) ============ */
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

  /* ============ 8) Now Enrolling: After-School  -  ongoing (color override) ============ */
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

  

  /* ============ 10) Fiamma Pizza & Paint  -  once ============ */
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

  /* ============ 11) GAK Store  -  ongoing (no expiry) ============ */
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

  /* ============ TEMPLATE - copy to add a new event ============
     Copy this whole block INCLUDING the leading comma, paste it just
     above the  ];  below, delete the // from each line, and fill it in.
     Only the lines marked REQUIRED are mandatory; delete the rest if
     you don't need them.

  ,{
    id: "my_new_event",                    // REQUIRED unique slug
    pages: ["GAK"],                        // REQUIRED ["GAK"], ["GAC"], or both
    title: "My New Event",                 // REQUIRED
    category: "pottery",                   // REQUIRED pottery|dance|specialty|littles|camp|enrollment|classes|family|adult|shop
    color: "orange",                       // optional color override
    tags: ["Adult Events"],                // optional filter chips
    teacher: "haley",                      // optional, must match a TEACHERS id
    venueLabel: "Gabriel's Art Center",    // optional badge
    location: "123 Street, Bellingham, WA",// optional
    price: "$35",                          // optional
    spots: "20 spots",                     // optional
    hook: "Short highlight",               // optional
    description: "What it is, in a sentence or two.", // REQUIRED
    buttonLabel: "Register Now",           // REQUIRED
    link: "https://form.jotform.com/REPLACE-ME",      // REQUIRED
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/REPLACE.jpeg", // REQUIRED main image
    // featured: true,                     // optional, can be on more than one event
    // media: [                            // optional extra photos/videos (gallery in the popup)
    //   { type:"image", url:"https://.../photo2.jpeg", caption:"Caption" },
    //   { type:"video", url:"https://youtu.be/ID", link:"https://youtu.be/ID", thumb:"https://.../cover.jpeg", caption:"Watch" }
    // ],
    schedule: { type:"once", date:"2026-10-31", startTime:"18:00", endTime:"20:00" } // REQUIRED
  }
  ============ end template ============ */
];

/* Lets the calendar build step (build-ics.js) read this list in Node. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALL_EVENTS: ALL_EVENTS, TEACHERS: TEACHERS, CAT_COLORS: CAT_COLORS };
}
