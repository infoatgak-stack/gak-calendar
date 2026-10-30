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
   AUTO-EXPIRE      Automatic. Past events disappear from the site by
                    themselves, so nothing breaks if one is left in. We still
                    tidy them out at the end of each term to keep this file
                    readable. Nothing is lost by deleting one — GitHub keeps
                    every previous version of this file forever.

   ---------------------------------------------------------------------
   HOW THIS FILE IS LAID OUT
   ---------------------------------------------------------------------
   The list is grouped, and the groups are marked with big banners so you
   can scroll to the right place instead of hunting.

     🏛️  GABRIEL'S ART CENTER            everything on the Holly St page
         🏺  Haley Holmgren              Ceramics
         💃  Brittany Parker             Dance
         🎨  Zannie DeMarco              Specialty Art
         🖌️  Jeana Esser-Lang            Mixed Media & Printmaking
         📷  Radu Sava                   Photography & Film

     🌈  GABRIEL'S ART KIDS              GAK page only, not the Center
         🎃  Events & fundraisers
         👶  Early years
         📝  Now enrolling
         🎒  Community
         🛍️  Shop

   The order in this file does NOT decide what order families see. The
   website sorts by date on its own. The order here is purely so a human
   can find things — with one exception, noted below: the GAC spotlight
   takes the first featured GAC event in list order.

   ADDING A CLASS   Put it under its teacher. If the teacher is new, add a
                    new 🎓 block for them here AND an entry in TEACHERS
                    above, then put their classes under it.
   WHICH SECTION    Look at pages. ["GAC"] or ["GAK","GAC"] goes in the
                    Art Center section. ["GAK"] alone goes in the Art Kids
                    section. That field is the only thing that decides where
                    a class actually appears — the banners are for humans.

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
/* ═══════════════════════════════════════════════════════════════════════════
   👩‍🏫  TEACHERS
   The bios that show under the class list. Add a teacher here FIRST, then
   point a class at the key with  teacher: "haley"  and the bio attaches.

   ⚠  REAL CHARACTERS ONLY in this block — a real em dash and a real
      ampersand, never &mdash; or &amp;. Unlike class descriptions, these are
      printed raw, so an HTML code shows on the page as literal text. That is
      what once put "PHOTOGRAPHY &AMP; FILM" on the live site.

   img  can be left as ""  — the page falls back to a circle with the initial.
   ═══════════════════════════════════════════════════════════════════════════ */
var TEACHERS = {

  /* ──────────────────────────────────────────────────────────────────────
     🏺  HALEY HOLMGREN  —  Ceramics
     Wheel throwing, handbuilding, youth and adult clay
     ────────────────────────────────────────────────────────────────────── */
  haley: {
    name: "Haley Holmgren",
    role: "Ceramics",
    color: "#FF5733",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-haley-holmgren-headshot_orig.jpg",
    bio: "Haley Holmgren is a Bellingham-grown ceramic artist whose passion for playing in the mud has led to a life of wheel throwing and pottery. She is delighted to share the clay, and the laughter it brings, with all."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🩰  BRITTANY PARKER  —  Dance
     Contemporary, pom, restorative movement, ballet
     ────────────────────────────────────────────────────────────────────── */
  brittany: {
    name: "Brittany Parker",
    role: "Dance",
    color: "#5960B9",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-brittany-headshot_orig.jpg",
    bio: "Brittany Parker is a Bellingham and Seattle-based choreographer, performer and movement instructor whose work lives at the intersection of accessibility, community and sustainable creative practice. She has worked across Seattle's drag and contemporary dance scenes, including with RuPaul's Drag Race alum BOSCO and 3rd Shift Dance Company, and in 2019 founded Coalescence Dance Company — now in its seventh season and touring the West Coast. She has taught weekly at Westlake Dance Center since 2018."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🎨  ZANNIE DeMARCO  —  Specialty Art
     Drawing, self portraits, artist-led themed classes
     ────────────────────────────────────────────────────────────────────── */
  zannie: {
    name: "Zannie DeMarco",
    role: "Specialty Art",
    color: "#364f96",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-zannie-demarco-headshot_orig.jpg",
    bio: "Zannie is a visual art educator with 27 years in the classroom — teaching K–5 art in Malibu, running programs in schools and orphanages in Haiti, and spending a decade integrating studio art and art history across New York City. She moved to Birch Bay in 2024 and now builds curriculum for Gabriel's Art Kids, teaching students of every age."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🖌️  JEANA ESSER-LANG  —  Mixed Media & Printmaking
     Gelli printing, watercolour, mixed media
     ────────────────────────────────────────────────────────────────────── */
  jeana: {
    name: "Jeana Esser-Lang",
    role: "Mixed Media & Printmaking",
    color: "#20B2AA",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-jeana-esser-lang-headshot_orig.jpg",
    bio: "Born in Louisiana amid crawfish boils and swirling hurricanes, Jeana brings a splash of Southern soul to Bellingham. She has taught art for over two decades and shown her own work for twice that long — a vibrant mix of whimsical wonder and sharp, edgy creativity. Loves Halloween and sharks. When she isn't covered in paint, she's a wife, mother, grandma and dedicated dog mom."
  },

  /* ──────────────────────────────────────────────────────────────────────
     📷   SAVA  —  Photography & Film
     Photography, filmmaking, stop motion animation
     ────────────────────────────────────────────────────────────────────── */
  radu: {
    name: "Radu Sava",
    role: "Photography & Film",
    color: "#57A86A",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-radu-sava-headshot_orig.jpg",
    bio: "Radu Sava has spent 25 years turning photography into storytelling — editorial and print campaigns, portraits on location and in the studio, product, events and nature work for clients across Europe and the US. He is also an award-winning filmmaker; his documentary “Not If, But When: Wildfire Solutions” streams on Amazon. Now in his 13th year teaching photography and video, he mentors students of all ages."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🎵  MARK NICHOLS  —  Music & Community
     Creative Connections morning gatherings

     Added Aug 2026. No class in ALL_EVENTS yet, so he does not appear on the
     site — the teacher strip only lists teachers who have an event on that page.
     ────────────────────────────────────────────────────────────────────── */
  mark: {
    name: "Mark Nichols",
    role: "Music & Community",
    color: "#C2456B",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-mark-nichols-headshot-1_orig.jpg",
    bio: "Mark Nichols is a composer, author, videographer, editor and teacher with forty years behind him. He has written and produced a dozen folk operas and contributed to the films of Children of the Setting Sun. His recent work includes Big Jam Stories, Beautiful Bones and Frankenstein's Children."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🧵  CLEO PIRTLE  —  Fiber Arts
     Wool appliqué quilting and simple embroidery

     Her own words, from the teacher form on 22 Aug 2026, permission given.
     No headshot — she did not send one, so the card shows a circle with "C".
     The image she sent is her own appliqué work and belongs on the CLASS card,
     not here. No class in ALL_EVENTS yet.
     ────────────────────────────────────────────────────────────────────── */
  cleo: {
    name: "Cleo Pirtle",
    role: "Fiber Arts",
    color: "#B0763A",
    img: "",
    bio: "Cleo Pirtle has been a quilter all her life, starting with cotton and moving to wool. She was a landscape designer for over forty years but would rather design wool quilts than pull weeds. She taught horticulture classes for years and now teaches wool quilting on Bainbridge Island, where she lives."
  },

  /* ──────────────────────────────────────────────────────────────────────
     🖍️  GAK INSTRUCTORS  —  ScribbleScape Series
     Little Hands, Preschool, Family Studio and After School Creators

     Not one person — the ScribbleScape classes are taught by rotating GAK
     staff, so Gabriel submitted the team as the teacher and the GAK logo as
     the photo. All four ScribbleScape classes point at this key.
     Added 22 Aug 2026. No classes in ALL_EVENTS yet.
     ────────────────────────────────────────────────────────────────────── */
  gakteam: {
    name: "GAK Instructors",
    role: "ScribbleScape Series",
    color: "#E0A32E",
    img: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/gac-gak-instructors-headshot_orig.jpg",
    bio: "The ScribbleScape classes are hosted by Gabriel's Art Kids' team of trained art instructors, dedicated to open-ended, process-focused creative play."
  }
};

/* =====================================================================
   THE MASTER LIST  -  edit below. Each event is separated by a divider.
   ===================================================================== */
var ALL_EVENTS = [

  /* GABRIEL'S ART CENTER (322 E Holly St) closed Oct 30 2026 - all Holly St classes
     were removed from this list (Toddler Music kept). Earlier versions are in the GitHub history. */


  /* ██████████████████████████████████████████████████████████████████████████
     🌈  GABRIEL'S ART KIDS  —  the wider organisation — GAK page only
     ────────────────────────────────────────────────────────────────────────
     These carry pages:["GAK"] only, so they do NOT appear on the Art Center page.
     Programmes, enrolment and community events rather than Holly Street classes.
     ██████████████████████████████████████████████████████████████████████████ */


  /* ──────────────────────────────────────────────────────────────────────────
     🎃  EVENTS & FUNDRAISERS
     ────────────────────────────────────────────────────────────────────────── */


  /* ============ GAK Crawl  -  once, Saturday Oct 3 2026 ============
     Free, community-wide event. No button or link — informational only.
     Four stops (Painting, Ceramics, Drawing, Music-unavailable) plus
     community partner tables. Passport + stamps, prize for 3+ stops. */
  {
    id: "gak_crawl_2026",
    pages: ["GAK"],
    title: "GAK Crawl",
    category: "family",
    tags: ["Community","Free","All Ages"],
    location: "Multiple GAK Locations, Bellingham, WA",
    price: "Free",
    hook: "One day, four stops, lots to make",
    description: "A community art day that moves between our different GAK locations. Pick up a GAK Crawl Passport at your first stop, then visit as many locations as you like. At each one you can try a hands-on art activity, meet a GAK instructor, and get a stamp for your passport. Visit 3 or more stops and you can turn in your passport for a small prize. <strong>Saturday, October 3, 10:00 AM&ndash;2:00 PM.</strong> All ages welcome.",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-9302_orig.jpeg",
    dateLabel: "Saturday, Oct 3, 2026 · 10:00 AM–2:00 PM",
    schedule: { type:"once", date:"2026-10-03", startTime:"10:00", endTime:"14:00" }
  },

   
  /* ============ Spooktacular 2026  -  dates, 3 nights (FEATURED) ============
   GAK's big fall fundraiser at Woodstock Farm. Shuttle-only from Fairhaven Park.
   Thursday is the shorter, gentler night (ends 8:00 PM); Friday and Saturday
   run to 9:00 PM. The "dates" schedule uses one time pair for all three, so the
   dateLabel below spells out the difference for people reading the card.
   Registration is not open yet, so the button points at the info page.
   Swap link + buttonLabel to the Jotform when tickets go live. */
  {
    id: "spooktacular_2026",
    pages: ["GAK"],
    title: "Spooktacular 2026",
    category: "family",
    color: "orange",
    tags: ["Fundraiser","Halloween","Ages 6+"],
    location: "Woodstock Farm, 1200 Chuckanut Dr N, Bellingham, WA",
    price: "$15 Thursday &middot; $25 Friday &amp; Saturday",
    spots: "33 per time slot",
    hook: "Something is still moving out at the old farm",
    description: "Three nights of family-friendly frights at historic Woodstock Farm. Creep through the <strong>Haunted Fun House</strong>, brave the <strong>Witch Walk</strong>, sit down in the <strong>Seance Room</strong>, and try your nerve at ghostly games and make-and-take crafts. <strong>Thursday Oct 22, 6:30&ndash;8:00 PM</strong> is our gentler night for younger kids and sensitive souls. <strong>Friday Oct 23</strong> brings the Zombie Dancers and <strong>Saturday Oct 24</strong> ends with a Halloween party in the barn, both 6:30&ndash;9:00 PM. Ages 6 and up. Access is by Spooky Van shuttle from Fairhaven Park, included with your ticket &mdash; there is no parking at the farm. Every ticket supports year-round art education for Bellingham youth.",
    buttonLabel: "See the Details",
    link: "https://www.gabrielsartkids.com/spooktacular2026.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/spooktacular-2026-png_orig.png",
    featured: true,
    dateLabel: "Oct 22, 23 &amp; 24, 2026 &middot; Thu 6:30&ndash;8:00 PM &middot; Fri &amp; Sat 6:30&ndash;9:00 PM",
    schedule: { type:"dates", dates:["2026-10-22","2026-10-23","2026-10-24"], startTime:"18:30", endTime:"21:00" }
  },

  /* ──────────────────────────────────────────────────────────────────────────
     👶  EARLY YEARS
     ────────────────────────────────────────────────────────────────────────── */

   
  /* ============ 15) Toddler Music & Art  -  Fall 2026, weekly ============
     Sept 2026: now on BOTH pages, so it shows in the Art Center list too. */
  
{
    id: "toddler_music_fall_2026",
    pages: ["GAK","GAC"],
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
    dateLabel: "6 Fridays, Sept 11 – Oct 16 · 10:00–10:45 AM",
    schedule: { type:"weekly", weekday:5, anchor:"2026-09-11", until:"2026-10-16", startTime:"10:00", endTime:"10:45", skip:[] }
  },

  /* ============ 15b) Toddler Music & Art  -  Nov–Dec 2026, weekly ============
     6 Fridays, no class Nov 27 (Thanksgiving break). Teacher: Julie. */

{
    id: "toddler_music_novdec_2026",
    pages: ["GAK","GAC"],
    title: "Toddler Music & Art: Nov–Dec 2026",
    category: "littles",
    tags: ["Whole Family","Toddlers"],
    venueLabel: "Gabriel's Art Center",
    location: "322 E. Holly St., Downtown Bellingham, WA",
    price: "$139 for 6 weeks",
    spots: "10 spots",
    hook: "Grown-ups stay, playground open till 11",
    description: "Six Friday mornings of shakers, scarves, drums, and process art for ages birth to 4, with a grown-up right there beside them. No drop-off, no performance, no experience needed. <strong>Fridays, Nov 6 &ndash; Dec 18 &middot; 10:00&ndash;10:45 AM</strong> (no class Nov 27) &middot; With Teacher Julie &middot; Playground open until 11:00 &middot; Limited to 10 students.",
    buttonLabel: "Register Now",
    link: "https://www.gabrielsartkids.com/toddlermusic.html",
    image: "https://www.gabrielsartkids.com/uploads/4/5/5/6/4556661/img-6692_orig.jpeg",
    dateLabel: "6 Fridays, Nov 6 – Dec 18 (no class Nov 27) · 10:00–10:45 AM",
    schedule: { type:"weekly", weekday:5, anchor:"2026-11-06", until:"2026-12-18", startTime:"10:00", endTime:"10:45", skip:["2026-11-27"] }
  },

  /* ──────────────────────────────────────────────────────────────────────────
     📝  NOW ENROLLING  ·  year-round programmes
     ────────────────────────────────────────────────────────────────────────── */

  

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


  /* ──────────────────────────────────────────────────────────────────────────
     🎒  COMMUNITY
     ────────────────────────────────────────────────────────────────────────── */

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


  /* ──────────────────────────────────────────────────────────────────────────
     🛍️  SHOP
     ────────────────────────────────────────────────────────────────────────── */

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
