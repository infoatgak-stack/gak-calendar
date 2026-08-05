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
    role: "Ceramics",
    color: "#FF5733",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-haley-holmgren-headshot_orig.jpg",
    bio: "Haley Holmgren is a Bellingham-grown ceramic artist whose passion for playing in the mud has led to a life of wheel throwing and pottery. She is delighted to share the clay, and the laughter it brings, with all."
  },
  brittany: {
    name: "Brittany Parker",
    role: "Dance",
    color: "#5960B9",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-headshot_orig.jpg",
    bio: "Brittany Parker is a Bellingham and Seattle-based choreographer, performer and movement instructor whose work lives at the intersection of accessibility, community and sustainable creative practice. She has worked across Seattle's drag and contemporary dance scenes, including with RuPaul's Drag Race alum BOSCO and 3rd Shift Dance Company, and in 2019 founded Coalescence Dance Company &mdash; now in its seventh season and touring the West Coast. She has taught weekly at Westlake Dance Center since 2018."
  },
  zannie: {
    name: "Zannie DeMarco",
    role: "Specialty Art",
    color: "#364f96",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-headshot_orig.jpg",
    bio: "Zannie is a visual art educator with 27 years in the classroom &mdash; teaching K&ndash;5 art in Malibu, running programs in schools and orphanages in Haiti, and spending a decade integrating studio art and art history across New York City. She moved to Birch Bay in 2024 and now builds curriculum for Gabriel's Art Kids, teaching students of every age."
  },
  jeana: {
    name: "Jeana Esser-Lang",
    role: "Mixed Media &amp; Printmaking",
    color: "#20B2AA",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-jeana-esser-lang-headshot_orig.jpg",
    bio: "Born in Louisiana amid crawfish boils and swirling hurricanes, Jeana brings a splash of Southern soul to Bellingham. She has taught art for over two decades and shown her own work for twice that long &mdash; a vibrant mix of whimsical wonder and sharp, edgy creativity. Loves Halloween and sharks. When she isn't covered in paint, she's a wife, mother, grandma and dedicated dog mom."
  },
  radu: {
    name: "Radu Sava",
    role: "Photography &amp; Film",
    color: "#57A86A",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-radu-sava-headshot_orig.jpg",
    bio: "Radu Sava has spent 25 years turning photography into storytelling &mdash; editorial and print campaigns, portraits on location and in the studio, product, events and nature work for clients across Europe and the US. He is also an award-winning filmmaker; his documentary <em>Not If, But When: Wildfire Solutions</em> streams on Amazon. Now in his 13th year teaching photography and video, he mentors students of all ages."
  }
};

/* =====================================================================
   THE MASTER LIST  -  edit below. Each event is separated by a divider.
   ===================================================================== */
var ALL_EVENTS = [

 /* ============ 1) End of Summer Plate Painting Night  -  once (FEATURED) ============ */
  {
    id: "ab_crepes_end_of_summer_paint",
    pages: ["GAK"],
    title: "End of Summer Plate Painting Night at AB Crepes",
    category: "pottery",
    tags: ["Adult Events","Paint & Sip","Ceramics"],
    teacher: "haley",
    location: "AB Crepes, downtown Bellingham, WA",
    price: "Limited to 10 spots",
    hook: "One special night, plates hand-thrown in our studio",
    description: "Our End of Summer Plate Painting Night! Paint a hand-thrown ceramic plate made in our studio, guided by instructor Haley. <strong>Tuesday, August 18 &middot; 6:00&ndash;8:30 PM</strong> &middot; AB Crepes, downtown Bellingham &middot; Limited to 10 spots!",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/crepe-and-paint-ab-crepes.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-7519_orig.jpeg",
    featured: true,
    schedule: { type:"once", date:"2026-08-18", startTime:"18:00", endTime:"20:30" }
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

   /* ============ Visual Storytelling: Photography — Tuesdays  -  8-week course (Radu Sava) ============
     NOTE: $225 is the price for the WHOLE 8-week course, not per class. One booking, 12 seats. */
  {
    id: "photography_visual_storytelling_tue",
    pages: ["GAK","GAC"],
    title: "Visual Storytelling: Photography (Tuesdays)",
    category: "specialty",
    tags: ["Younger Students","Teens","Photography","Homeschool"],
    teacher: "radu",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$225 for the 8-week course",
    spots: "12 students",
    hook: "Behind and in front of the lens",
    description: "A photography class built to grow self-expression, creativity, confidence and teamwork. Through plenty of hands-on practice, students explore composition, lighting, long and short exposure, camera angles, portrait styles, in-camera effects and more &mdash; all while having fun behind and in front of the lens. Each week the group votes for a Photo of the Week, proudly displayed in the hallway. <strong>8 Tuesdays, 10:00&ndash;11:30 AM</strong> with Radu Sava. 3rd grade through high school, homeschool friendly. One booking covers the whole course.",
    buttonLabel: "Book the Course",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-radu-sava-photography-visual-storytelling_orig.jpg",
    dateLabel: "8 Tuesdays, Sept 8 – Oct 27 · 10:00–11:30 AM",
    schedule: { type:"weekly", weekday:2, anchor:"2026-09-08", until:"2026-10-27", startTime:"10:00", endTime:"11:30", skip:[] }
  },

   /* ============ Visual Storytelling: Photography — Thursdays  -  8-week course (Radu Sava) ============
     After-school section of the same course as the Tuesday one.
     $225 is the price for the WHOLE 8-week course, not per class. One booking, 12 seats. */
  {
    id: "photography_visual_storytelling_thu",
    pages: ["GAK","GAC"],
    title: "Visual Storytelling: Photography (Thursdays)",
    category: "specialty",
    tags: ["Younger Students","Teens","Photography","Homeschool"],
    teacher: "radu",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$225 for the 8-week course",
    spots: "12 students",
    hook: "Behind and in front of the lens",
    description: "A photography class built to grow self-expression, creativity, confidence and teamwork. Through plenty of hands-on practice, students explore composition, lighting, long and short exposure, camera angles, portrait styles, in-camera effects and more &mdash; all while having fun behind and in front of the lens. Each week the group votes for a Photo of the Week, proudly displayed in the hallway. <strong>8 Thursdays, 3:30&ndash;5:00 PM</strong> with Radu Sava. 3rd grade through high school, homeschool friendly. One booking covers the whole course.",
    buttonLabel: "Book the Course",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-radu-sava-photography-visual-storytelling_orig.jpg",
    dateLabel: "8 Thursdays, Sept 10 – Oct 29 · 3:30–5:00 PM",
    schedule: { type:"weekly", weekday:4, anchor:"2026-09-10", until:"2026-10-29", startTime:"15:30", endTime:"17:00", skip:[] }
  },

   /* ============ Dance / Pom Fusion  -  weekly Tuesdays (Brittany Parker) ============ */
  {
    id: "pom_dance_fusion",
    pages: ["GAK","GAC"],
    title: "Dance / Pom Fusion",
    category: "dance",
    tags: ["Teens","Adults","Dance","Drop-In"],
    teacher: "brittany",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$25 drop-in",
    spots: "15 dancers per class",
    hook: "Poms provided · open level",
    description: "Commercial dance training for former pom and dance-team athletes &mdash; and anyone who's always wanted to try it. Open level, so beginners are welcome alongside dancers keeping their technique sharp. Poms provided. <strong>Tuesdays, 8:30&ndash;9:30 PM</strong> with Brittany Parker. Ages 14+. Drop in for a single night, 15 dancers per class.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-pom-dance-fusion_orig.jpg",
    dateLabel: "Tuesdays, Sept 8 – Dec 22 · 8:30–9:30 PM",
    schedule: { type:"weekly", weekday:2, anchor:"2026-09-08", until:"2026-12-22", startTime:"20:30", endTime:"21:30", skip:[] }
  },

 /* ============ Open Level Contemporary  -  weekly Mondays (Brittany Parker) ============ */
  {
    id: "open_level_contemporary",
    pages: ["GAK","GAC"],
    title: "Open Level Contemporary",
    category: "dance",
    tags: ["Teens","Adults","Dance","Drop-In"],
    teacher: "brittany",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$25 drop-in",
    spots: "15 dancers per class",
    hook: "Where dancers from every program train together",
    description: "Most studios around here focus on competition and academy-style training &mdash; there's nowhere central for dancers from different programs to simply train together. This is that room. Open level, so complete beginners work alongside dancers keeping their technique sharp, and everyone gets the same welcoming, intuitive practice. <strong>Mondays, 11:00 AM&ndash;12:00 PM</strong> with Brittany Parker. Ages 13+. Drop in for a single class, 15 dancers each week.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-open-level-contemporary_orig.jpg",
    dateLabel: "Mondays, Sept 14 – Dec 21 · 11:00 AM–12:00 PM",
    schedule: { type:"weekly", weekday:1, anchor:"2026-09-14", until:"2026-12-21", startTime:"11:00", endTime:"12:00", skip:[] }
  },
   
 /* ============ Restorative Movement  -  weekly Mondays (Brittany Parker) ============ */
  {
    id: "restorative_movement",
    pages: ["GAK","GAC"],
    title: "Restorative Movement",
    category: "dance",
    tags: ["Adults","Dance","Wellness","Drop-In"],
    teacher: "brittany",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$25 drop-in",
    spots: "15 spots per class",
    hook: "No dance experience needed",
    description: "Move, express, connect. A class that blends movement, emotional expression and community &mdash; built around releasing what no longer serves you and creating restorative habits you carry beyond the studio. Open to all levels of movement, and no dance experience is required. <strong>Mondays, 12:00&ndash;1:00 PM</strong> with Brittany Parker. Ages 18+. Drop in for a single class, 15 spots each week.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-restorative-movement_orig.jpg",
    dateLabel: "Mondays, Sept 14 – Dec 21 · 12:00–1:00 PM",
    schedule: { type:"weekly", weekday:1, anchor:"2026-09-14", until:"2026-12-21", startTime:"12:00", endTime:"13:00", skip:[] }
  },


    /* ============ Art of Me: Self Portraits — K–4th  -  weekly Mondays (Zannie) ============ */
  {
    id: "art_of_me_k4",
    pages: ["GAK","GAC"],
    title: "Art of Me: Self Portraits (K–4th)",
    category: "specialty",
    tags: ["Younger Students","Drawing","Homeschool","Drop-In"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$35 per class",
    spots: "15 spots per class",
    hook: "Every face has a story — make yours",
    description: "Who are you &mdash; and how do you show it? In this ongoing series, young artists explore identity through the self-portrait tradition, drawing inspiration from history-makers and artmakers alike: Dr. MLK in January, Women's History honorees in February, and more throughout the year. Each month brings a new face and a new story, always their own. <strong>Mondays, 10:00&ndash;11:30 AM</strong> with Zannie DeMarco. Kindergarten&ndash;4th grade, homeschool friendly. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-art-of-me-self-portraits_orig.jpg",
    dateLabel: "Mondays, Sept 14 – Nov 16 · 10:00–11:30 AM",
    schedule: { type:"weekly", weekday:1, anchor:"2026-09-14", until:"2026-11-16", startTime:"10:00", endTime:"11:30", skip:["2026-11-09"] }
  },

  /* ============ Art of Me: Self Portraits — Adults  -  weekly Mondays (Zannie) ============ */
  {
    id: "art_of_me_adults",
    pages: ["GAK","GAC"],
    title: "Art of Me: Self Portraits (Adults)",
    category: "specialty",
    tags: ["Adults","Drawing","Mixed Media","Drop-In"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$40 per class",
    spots: "15 spots per class",
    hook: "Two hours to yourself, once a week",
    description: "Who are you &mdash; and how do you show it? An ongoing series exploring identity through the self-portrait tradition, drawing inspiration from history-makers and artmakers alike: Dr. MLK in January, Women's History honorees in February, and more throughout the year. As the series continues it opens up beyond drawing into other mediums. Two unhurried hours, no experience needed. <strong>Mondays, 3:00&ndash;5:00 PM</strong> with Zannie DeMarco. Ages 18+. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-art-of-me-self-portraits_orig.jpg",
    dateLabel: "Mondays, Sept 14 – Nov 16 · 3:00–5:00 PM",
    schedule: { type:"weekly", weekday:1, anchor:"2026-09-14", until:"2026-11-16", startTime:"15:00", endTime:"17:00", skip:["2026-11-09"] }
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

    /* ============ 14) Toddler Music & Art Trial Class  -  dates ============ */
  {
    id: "toddler_music_trial_aug2026",
    pages: ["GAK"],
    title: "Toddler Music & Art: Trial Class",
    category: "littles",
    tags: ["Whole Family","Toddlers","Trial Class"],
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$25, credited toward the fall session",
    spots: "Small group, one per family",
    hook: "Try one class, your $25 comes back",
    description: "Not ready to commit to six weeks? Come try one morning first. Same songs, same process art, same small group, with a grown-up right there beside them. <strong>Pick one date &middot; 10:00&ndash;10:45 AM &middot; Ages birth to 4</strong> &middot; Your $25 comes off the 6-week fall session when you enroll.",
    buttonLabel: "Try a Class for $25",
    link: "https://www.gabrielsartkids.com/toddlermusic.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-6692_orig.jpeg",
    dateLabel: "Pick one: Aug 1, Aug 8, or Aug 14, 2026",
    schedule: { type:"dates", dates:["2026-08-01","2026-08-08","2026-08-14"], startTime:"10:00", endTime:"10:45" }
  },
   
/* ============ Dance Day  -  once, Sunday Aug 23 2026 (Brittany Parker) ============
     FREE open house. Sign-up is the $0 "Dance Day - Free Open House" product on the
     shared GAC Classes Jotform (261687139050055). Walk-ins still welcome. */
  {
    id: "dance_day_aug23",
    pages: ["GAK","GAC"],
    title: "Dance Day",
    category: "dance",
    tags: ["Teens","Adults","Dance","Open Level"],
    teacher: "brittany",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "Free",
    spots: "15 dancers at a time · first come, first served",
    hook: "Three classes, one morning — come try it",
    description: "Meet your teacher, move a little, and try the styles launching at Gabriel's Art Center this fall. Three open-level classes back to back &mdash; no dance experience needed for any of them. <strong>Contemporary Movement 10:00&ndash;11:00</strong>, <strong>Dance/Pom Fusion 11:00&ndash;11:30</strong> (poms provided), and <strong>Restorative Movement 11:30&ndash;12:00</strong>. Ages 16 and up. Each class takes 15 dancers at a time, first come first served, so come a few minutes early and you'll be all set. Stay after for a smoothie social. Free to join &mdash; save your spot so Brittany knows to expect you, or just show up.",
    buttonLabel: "Save Your Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-dance-day_orig.jpg",
    media: [
      { type:"image", url:"https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-open-level-contemporary_orig.jpg", caption:"10:00–11:00 · Contemporary Movement, open level" },
      { type:"image", url:"https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-pom-dance-fusion_orig.jpg", caption:"11:00–11:30 · Dance/Pom Fusion, poms provided" },
      { type:"image", url:"https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-restorative-movement_orig.jpg", caption:"11:30–12:00 · Restorative Movement, all levels" }
    ],
    featured: true,
    schedule: { type:"once", date:"2026-08-23", startTime:"10:00", endTime:"12:00" }
  },

/* ============ 3rd–5th Grade Ceramics — AFTERNOON  -  8 weeks, Wednesdays (Haley Holmgren) ============
     $280 is the price for the WHOLE 8-week course, not per class. 8 seats, this slot only.
     Sister section runs the same Wednesdays at 5:45–7:00 PM — separate booking, separate 8 seats. */
  {
    id: "ceramics_3_5_wed_afternoon",
    pages: ["GAK","GAC"],
    title: "3rd–5th Grade Ceramics (Afternoon)",
    category: "pottery",
    tags: ["Younger Students","Ceramics","Wheel Throwing","After School"],
    teacher: "haley",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$280 for the 8-week course",
    spots: "8 students",
    hook: "Let imagination take shape in clay",
    description: "A fun-filled clay adventure with Teacher Haley. Young artists learn hand-building and wheel throwing while creating one-of-a-kind ceramic projects &mdash; from playful sculptures to functional pottery. Every class is a chance to get creative, get a little messy, and make something amazing. Projects are glazed, kiln-fired and ready to take home once they're finished. <strong>8 Wednesdays, 2:45&ndash;4:00 PM</strong> with Haley Holmgren. Grades 3rd&ndash;5th. All materials and tools included. One booking covers the whole 8 weeks.",
    buttonLabel: "Book the Course",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-haley-holmgren-ceramics-handbuilding_orig.jpg",
    dateLabel: "8 Wednesdays, Sept 9 – Oct 28 · 2:45–4:00 PM",
    schedule: { type:"weekly", weekday:3, anchor:"2026-09-09", until:"2026-10-28", startTime:"14:45", endTime:"16:00", skip:[] }
  },

  /* ============ 3rd–5th Grade Ceramics — EVENING  -  8 weeks, Wednesdays (Haley Holmgren) ============
     Same course, later slot. Separate booking and separate 8 seats from the 2:45 PM section. */
  {
    id: "ceramics_3_5_wed_evening",
    pages: ["GAK","GAC"],
    title: "3rd–5th Grade Ceramics (Evening)",
    category: "pottery",
    tags: ["Younger Students","Ceramics","Wheel Throwing","After School"],
    teacher: "haley",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$280 for the 8-week course",
    spots: "8 students",
    hook: "Let imagination take shape in clay",
    description: "A fun-filled clay adventure with Teacher Haley. Young artists learn hand-building and wheel throwing while creating one-of-a-kind ceramic projects &mdash; from playful sculptures to functional pottery. Every class is a chance to get creative, get a little messy, and make something amazing. Projects are glazed, kiln-fired and ready to take home once they're finished. <strong>8 Wednesdays, 5:45&ndash;7:00 PM</strong> with Haley Holmgren. Grades 3rd&ndash;5th. All materials and tools included. Same course as the 2:45 PM section &mdash; pick whichever time works for your family. One booking covers the whole 8 weeks.",
    buttonLabel: "Book the Course",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-haley-holmgren-ceramics-handbuilding_orig.jpg",
    dateLabel: "8 Wednesdays, Sept 9 – Oct 28 · 5:45–7:00 PM",
    schedule: { type:"weekly", weekday:3, anchor:"2026-09-09", until:"2026-10-28", startTime:"17:45", endTime:"19:00", skip:[] }
  },

    /* ============ Art of Me: Self Portraits — 5th–HS  -  weekly Mondays (Zannie) ============ */
  {
    id: "art_of_me_5hs",
    pages: ["GAK","GAC"],
    title: "Art of Me: Self Portraits (5th–HS)",
    category: "specialty",
    tags: ["Younger Students","Teens","Drawing","Homeschool"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$35 per class",
    spots: "15 spots per class",
    hook: "Every face has a story — make yours",
    description: "Who are you &mdash; and how do you show it? In this ongoing series, artists explore identity through the self-portrait tradition, drawing inspiration from history-makers and artmakers alike: Dr. MLK in January, Women's History honorees in February, and more throughout the year. Each month brings a new face and a new story, always your own. <strong>Mondays, 12:00&ndash;1:30 PM</strong> with Zannie DeMarco. 5th grade through high school, homeschool friendly. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-art-of-me-self-portraits_orig.jpg",
    dateLabel: "Mondays, Sept 14 – Nov 16 · 12:00–1:30 PM",
    schedule: { type:"weekly", weekday:1, anchor:"2026-09-14", until:"2026-11-16", startTime:"12:00", endTime:"13:30", skip:["2026-11-09"] }
  },

   /* ============ Wonderfully Weird: Tim Burton — K–4th  -  weekly Wednesdays (Zannie) ============ */
  {
    id: "wonderfully_weird_k4",
    pages: ["GAK","GAC"],
    title: "Wonderfully Weird: Tim Burton (K–4th)",
    category: "specialty",
    tags: ["Younger Students","Drawing","Homeschool","Drop-In"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$35 per class",
    spots: "15 spots per class",
    hook: "Where art gets delightfully dark",
    description: "Spirals, stripes, and gorgeously gloomy imagination &mdash; this weekly class dives into the strange and stunning world of Tim Burton's art. Each week brings a new technique and medium (think vellum ghosts, sharpie shadows, and paper-cut silhouettes) inspired by Burton's signature style. Perfect for kids who love a little spooky in their sketchbook. <strong>Wednesdays, 10:00&ndash;11:30 AM</strong> with Zannie DeMarco. Kindergarten&ndash;4th grade, homeschool friendly. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-wonderfully-weird-tim-burton_orig.jpg",
    dateLabel: "Wednesdays, Sept 9 – Nov 18 · 10:00–11:30 AM",
    schedule: { type:"weekly", weekday:3, anchor:"2026-09-09", until:"2026-11-18", startTime:"10:00", endTime:"11:30", skip:["2026-11-04","2026-11-11"] }
  },

/* ============ Wonderfully Weird: Tim Burton — 5th–HS  -  weekly Wednesdays (Zannie) ============ */
  {
    id: "wonderfully_weird_5hs",
    pages: ["GAK","GAC"],
    title: "Wonderfully Weird: Tim Burton (5th–HS)",
    category: "specialty",
    tags: ["Younger Students","Teens","Drawing","Homeschool"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$35 per class",
    spots: "15 spots per class",
    hook: "Where art gets delightfully dark",
    description: "Spirals, stripes, and gorgeously gloomy imagination &mdash; this weekly class dives into the strange and stunning world of Tim Burton's art. Each week brings a new technique and medium (think vellum ghosts, sharpie shadows, and paper-cut silhouettes) inspired by Burton's signature style. For anyone who likes a little spooky in their sketchbook. <strong>Wednesdays, 12:00&ndash;1:30 PM</strong> with Zannie DeMarco. 5th grade through high school, homeschool friendly. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-wonderfully-weird-tim-burton_orig.jpg",
    dateLabel: "Wednesdays, Sept 9 – Nov 18 · 12:00–1:30 PM",
    schedule: { type:"weekly", weekday:3, anchor:"2026-09-09", until:"2026-11-18", startTime:"12:00", endTime:"13:30", skip:["2026-11-04","2026-11-11"] }
  },

    /* ============ Reverse Perspective: Art That Follows You!  -  weekly Fridays (Zannie) ============
     ONE session = BOTH blocks the same day: 10:00–12:00, break, 12:30–2:30. $80 covers the pair. */
  {
    id: "reverse_perspective",
    pages: ["GAK","GAC"],
    title: "Reverse Perspective: Art That Follows You!",
    category: "specialty",
    tags: ["Teens","Drawing","Homeschool","STEAM"],
    teacher: "zannie",
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$80 for the full day",
    spots: "15 spots per day",
    hook: "Your artwork follows you across the room",
    description: "Inspired by the optical illusions of artist Patrick Hughes, students explore the mind-bending world of reverse perspective. Using folded paper, rulers, drawing techniques and vibrant colour, they build a three-dimensional hallway, room or gallery that appears to move and shift as you walk past it. Art, geometry, engineering and a little visual magic all at once. <strong>Fridays &mdash; a full day in two blocks: 10:00 AM&ndash;12:00 PM, break, then 12:30&ndash;2:30 PM.</strong> Both blocks are one session. With Zannie DeMarco. 6th grade through high school, homeschool friendly. All materials provided.",
    buttonLabel: "Book a Spot",
    link: "https://pci.jotform.com/form/261687139050055",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-reverse-perspective_orig.jpg",
    dateLabel: "Fridays, Sept 11 – Nov 20 · 10:00–12:00 & 12:30–2:30",
    schedule: { type:"weekly", weekday:5, anchor:"2026-09-11", until:"2026-11-20", startTime:"10:00", endTime:"14:30", skip:["2026-11-06","2026-11-13"] }
  },
   
  /* ============ 15) Toddler Music & Art  -  Fall 2026, weekly ============ */
  {
    id: "toddler_music_fall_2026",
    pages: ["GAK"],
    title: "Toddler Music & Art: Fall 2026",
    category: "littles",
    tags: ["Whole Family","Toddlers"],
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$139 for 6 weeks",
    spots: "10 spots",
    hook: "Grown-ups stay, playground open till 11",
    description: "Six Friday mornings of shakers, scarves, drums, and process art for ages birth to 4, with a grown-up right there beside them. No drop-off, no performance, no experience needed. <strong>Fridays, Sep 11 &ndash; Oct 16 &middot; 10:00&ndash;10:45 AM</strong> &middot; Playground open until 11:00 &middot; Limited to 10 students.",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/toddlermusic.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-6692_orig.jpeg",
    schedule: { type:"weekly", weekday:5, anchor:"2026-09-11", until:"2026-10-16", startTime:"10:00", endTime:"10:45" }
  },
 


  /* ============ Take a Peek: RWSAS Tour  -  dates (color override) ============ */
  {
    id: "rwsas_take_a_peek_tour",
    pages: ["GAK"],
    title: "Take a Peek: RWSAS Tour",
    category: "enrollment",
    color: "green",
    tags: ["Enrollment","Tour"],
    location: "1405 Dupont St, Bellingham, WA",
    hook: "Sign up for a 15 minute tour",
    description: "Curious what makes RWSAS different? Sign up for a 15 minute Take a Peek tour and see our arts integrated curriculum, project based learning, and small mixed age classrooms in action. <strong>1405 Dupont St, Bellingham</strong>.",
    buttonLabel: "Sign Up for a Tour",
    link: "https://form.jotform.com/260848563027159",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-8680_orig.jpeg",
    dateLabel: "Pick one: Thu, Jul 30 or Mon, Aug 3, 2026 @ 5:00 PM",
    schedule: { type:"dates", dates:["2026-07-30","2026-08-03"], startTime:"17:00", endTime:"17:15" }
  },

/* ============ Back-to-School Backpack Giveaway  -  ongoing (PROMO, FEATURED) ============ */
  {
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
    dateLabel: "Register July 15 to August 31, 2026",
    schedule: { type:"ongoing", expires:"2026-08-31" }
  },

   
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
