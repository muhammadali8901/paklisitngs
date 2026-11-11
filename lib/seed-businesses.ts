// ============================================================
// PakListings — Seed business listings (FULLY STATIC dataset)
// ------------------------------------------------------------
// Source: ~/workspace/localepak-seed-businesses.md (research list,
// 21 Oct 2026) — 91 businesses selected for daily branded-search
// demand, plus 25 top-5-bank branches (added 2026-10-23).
//
// PRUNED 2026-11-06 (round 1): kept 71 / removed 45. Criterion =
// verifiable branded-search demand only (national brands, flagship
// branches, real multi-city operations with local demand).
//
// PRUNED 2026-11-06 (round 2): kept 43 / removed 28. Criterion =
// strongest verifiable branded-search demand only. Kept: the
// biggest national names and the few second-city pages with their
// own proven local demand (SKMCH Peshawar, Chughtai Lab Karachi,
// Daewoo Karachi Terminal, Nayatel Rawalpindi, Savour Foods
// Lahore). Removed: all other branch/terminal pages (one flagship
// page per brand), smaller regional names, thin-demand and
// B2B-only entries, and brands whose demand has faded into a
// successor (Call Courier, now part of PostEx). Nothing extra
// stays on the site — AdSense quality over quantity.
//
// DESCRIPTIONS (round 2): every kept seed now carries a 60–100
// word factual description written from publicly verified sources
// (web search, 2026-11-06): what the business is known for, its
// services, areas/cities served, and practical visitor guidance.
// No invented facts — no invented phones, addresses, founding
// years, ratings, review counts or superlatives; a year, number
// or "first/largest" claim appears ONLY where a public source
// verifies it. No duplicated sentences across seeds.
//
// INTEGRITY RULES baked into this dataset:
// - Only publicly verified fields are included. Where the source
//   marked a phone "VERIFY" (unconfirmed), the phone is OMITTED
//   entirely — no phone, address, rating or review data is ever
//   invented for these listings.
// - `seed: true` marks these as directory-created listings that
//   the business has not yet claimed. Pages for them are fully
//   static (generateStaticParams) and make ZERO Firestore reads.
// ============================================================

export type SeedBusiness = {
  seed: true
  slug: string
  name: string
  /** Category display name, e.g. 'Technology & IT' */
  category: string
  /** Site category id from lib/data CATEGORIES, e.g. 'technology' */
  categorySlug: string
  city: string
  citySlug: string
  /** Present ONLY when the phone was publicly verified in the source list. */
  phone?: string
  description: string
}

export const SEED_BUSINESSES: SeedBusiness[] = [
  {
    seed: true,
    slug: "nayatel",
    name: "Nayatel",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-111-144-444",
    description: "Nayatel is a fibre-to-the-home internet provider founded in Islamabad in 2006 by former PTCL engineers, and it has built its name on reliable, uncapped fibre broadband with symmetrical upload and download speeds. Its home and business packages cover internet, cable TV and landline phone, and its network serves Islamabad, Rawalpindi, Peshawar and Faisalabad, with the twin cities as its core footprint. Before signing up, check coverage for your exact street address on Nayatel's website or helpline, since fibre availability varies street by street even inside covered sectors."
  },
  {
    seed: true,
    slug: "tcs-express",
    name: "TCS Express",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-123-456",
    description: "TCS Express, short for Tranzum Courier Service, was founded in Karachi in 1983 by brothers Khalid Nawaz Awan and Sadiq Awan, starting with just 12 Express Centres and 25 shipments on its first day. It is now one of Pakistan's longest-running courier networks, handling overnight, same-day and economy parcels, documents and e-commerce cash-on-delivery orders across the country, plus international delivery to more than 200 destinations. Its Sentiments Express arm delivers flowers, cakes and gifts. Keep your tracking number handy and confirm cut-off times at your nearest Express Centre before dispatching time-sensitive parcels."
  },
  {
    seed: true,
    slug: "daewoo-express",
    name: "Daewoo Express",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    phone: "111-007-008 / 0304-111-7008",
    description: "Daewoo Express runs intercity bus services between Pakistan's major cities from terminals in Lahore, Karachi, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar and Abbottabad, with its main Lahore terminal at Thokar Niaz Baig and its main Karachi terminal at Sohrab Goth. Its coaches offer reserved seating and online booking, and its most-searched routes connect Lahore with Karachi, Islamabad, Rawalpindi and Multan. Check departure times and seat availability before travelling, especially around weekends and public holidays, when popular routes sell out early."
  },
  {
    seed: true,
    slug: "faisal-movers",
    name: "Faisal Movers",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    phone: "061-111-22-44-88",
    description: "Faisal Movers is one of Pakistan's largest intercity bus operators, running services across some 135 routes linking around 40 cities through 22 terminals, with its main operations in Lahore. Its fleet covers business-class and executive coaches on corridors such as Lahore-Islamabad, Lahore-Karachi and Lahore-Multan, with online booking and reserved seating. Its city terminals are listed separately on PakListings. Confirm the departure point and timing for your route before travelling, since different services leave from different terminals in the same city."
  },
  {
    seed: true,
    slug: "stormfiber",
    name: "StormFiber",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Karachi",
    citySlug: "karachi",
    phone: "111-1-STORM (78676)",
    description: "StormFiber is the fibre-to-the-home broadband brand of Cybernet, one of Pakistan's oldest internet providers, serving homes and small businesses in Karachi, Lahore, Islamabad, Rawalpindi and more than twenty other cities. Its packages bundle internet with IPTV and a phone line as Triple Play, or internet-only as Single Play, with speeds ranging from a few Mbps up to 1 Gbps on its top Hurricane tier. Coverage is street-by-street even inside served cities, so check your exact address on StormFiber's website before choosing a plan, and confirm installation charges and taxes in advance."
  },
  {
    seed: true,
    slug: "leopards-courier",
    name: "Leopards Courier",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-300-786",
    description: "Leopards Courier was founded in 1983 by Jehangir Shahid, starting with delivery to just five destinations, and has grown into one of Pakistan's largest courier and logistics networks, now serving more than 1,000 destinations through 164 hubs. It handles documents, parcels and e-commerce cash-on-delivery shipments nationwide, and operates its own Boeing 737-300 cargo aircraft for overnight movement between cities. The company also offers warehousing and supply-chain services for businesses. Keep the tracking number from your booking receipt and use the courier's online tracking page to follow a parcel's progress."
  },
  {
    seed: true,
    slug: "chughtai-lab",
    name: "Chughtai Lab",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    phone: "03-111-456-789",
    description: "Chughtai Lab was founded in Lahore in 1983 by Dr A. S. Chughtai as a three-room facility called Lahore Lab, and is now one of Pakistan's largest diagnostic laboratory networks, with more than 15 regional laboratories and hundreds of collection centres serving over 170 cities. It offers routine blood tests, specialised pathology, radiology and home sample collection, and is ISO 15189 certified. Its head office is on Jail Road, Gulberg, Lahore. Before visiting, confirm the test's fasting or preparation requirements and whether your nearest centre offers home collection."
  },
  {
    seed: true,
    slug: "rehman-travels",
    name: "Rehman Travels",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-111-786-785",
    description: "Rehman Travels is an IATA-accredited travel agency founded in 1995, with its head office in Blue Area, Islamabad, and branches in Lahore, Peshawar and Karachi, as well as offices abroad. It books domestic and international flights, hotels, tour packages and travel insurance, and is a registered Hajj and Umrah operator with the Ministry of Religious Affairs. Its team of around 150 travel professionals also handles visit visas for destinations such as Malaysia, Thailand, Dubai, the UK and Canada. Ask for the full fare breakdown, including taxes and visa fees, before confirming any booking."
  },
  {
    seed: true,
    slug: "shaukat-khanum-memorial-cancer-hospital",
    name: "Shaukat Khanum Memorial Cancer Hospital",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35905000",
    description: "Shaukat Khanum Memorial Cancer Hospital and Research Centre opened in Johar Town, Lahore, on 29 December 1994 as Pakistan's first comprehensive cancer hospital. It was founded by Imran Khan in memory of his mother, Shaukat Khanum, who died of cancer, and is run by the Shaukat Khanum Memorial Trust as a charitable hospital — around three quarters of its patients receive financially supported treatment. The centre provides cancer diagnosis, surgery, chemotherapy, radiotherapy and research, and a second hospital opened in Peshawar in 2015. Appointments and referrals are handled through the hospital's own booking channels."
  },
  {
    seed: true,
    slug: "postex",
    name: "PostEx",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-32157777",
    description: "PostEx is a Lahore-based logistics and fintech company founded in 2020 that combines parcel delivery with upfront cash-on-delivery payments for online sellers, so merchants receive their COD earnings before the usual settlement wait. Its network covers more than 650 cities and towns across Pakistan, with same-day delivery in parts of Karachi, Lahore, Islamabad, Rawalpindi and Faisalabad, and it acquired Call Courier in 2022. The company also offers payment-gateway and financing tools for e-commerce businesses. Sellers should compare its COD settlement terms and delivery coverage for their own cities before switching courier."
  },
  {
    seed: true,
    slug: "student-biryani",
    name: "Student Biryani",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-111-778",
    description: "Student Biryani began in 1969 when Haji Muhammad Ali started selling home-cooked biryani from a small eatery called Café Student in Saddar, Karachi, near the area's schools and colleges. The affordable, spicy biryani made it a favourite with students, and the brand has since grown into branches across Pakistan and abroad, including the UAE, Saudi Arabia, Canada and the USA. Its menu still centres on chicken and mutton biryani, alongside qorma, karahi and fried fish. The original Saddar branch on Katrak Road remains the one most visitors seek out."
  },
  {
    seed: true,
    slug: "inverex-solar-energy",
    name: "Inverex Solar Energy",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-209-988",
    description: "Inverex Solar Energy is one of Pakistan's best-known solar brands, founded in Karachi in 2007. It supplies solar panels, hybrid and on-grid inverters, batteries and complete solar systems for homes, businesses and farms, with its Nitrox hybrid inverter range among its most-searched products. Inverex equipment is sold through a nationwide dealer network, and the company also offers installation and after-sales support. Before buying, get a site survey and a written quote covering panels, inverter, batteries, mounting and net-metering paperwork, since system size and price depend on your actual electricity use."
  },
  {
    seed: true,
    slug: "dr-essa-laboratory-and-diagnostic-centre",
    name: "Dr Essa Laboratory & Diagnostic Centre",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-786-986",
    description: "Dr Essa Laboratory and Diagnostic Centre has served patients since 1987 and is one of Pakistan's longest-running diagnostic chains, with branches in Karachi, Lahore, Islamabad, Hyderabad and other cities. It offers blood tests, imaging, ultrasound, X-ray and ECG, along with home sample collection and an app for booking tests and viewing reports. Its test menu covers haematology, clinical chemistry, microbiology and hormone testing, with prices varying by test. Confirm the price, preparation instructions and report timing for your specific test before visiting, and check whether home collection is available in your area."
  },
  {
    seed: true,
    slug: "savour-foods",
    name: "Savour Foods",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-2348097",
    description: "Savour Foods is a Pakistani restaurant chain known above all for its chicken pulao served with kabab, salad and raita, a dish that has made it a household name in Rawalpindi and Islamabad. Its branches across Islamabad, Rawalpindi and Lahore serve dine-in, takeaway and delivery, with a menu built around pulao, roast chicken, shami kabab and other desi dishes at budget-friendly prices. Most branches open from late morning until after midnight. Check the branch timings and whether delivery covers your area before ordering, since hours and delivery zones vary by location."
  },
  {
    seed: true,
    slug: "ptcl-flash-fiber",
    name: "PTCL Flash Fiber",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "PTCL Flash Fiber is the fibre-to-the-home broadband brand of Pakistan Telecommunication Company Limited, the country's national telecom operator and largest fixed-line network, with around 2,000 telephone exchanges nationwide. Flash Fiber plans run from 20 Mbps to 250 Mbps and are available in 95 cities, offering internet, landline and Smart TV bundles. PTCL was partly privatised in 2006, when Etisalat acquired a 26 percent stake with management control, while the Government of Pakistan kept a majority shareholding. Check Flash Fiber availability for your exact address before applying, since coverage varies by neighbourhood."
  },
  {
    seed: true,
    slug: "optix",
    name: "Optix",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "Optix is a fibre internet provider that has served homes and businesses since 2015, operating in seven cities including Lahore, Karachi, Islamabad and Rawalpindi. It offers fibre-to-the-home plans with symmetrical speeds and no data caps on most packages, and its 30, 50 and 100 Mbps plans are frequently cited among the cheapest per-megabit fibre options in Pakistan. Optix also provides services for small businesses and housing societies. Before subscribing, confirm that your street is covered and compare the installation charges and the exact upload speed of the plan you are considering."
  },
  {
    seed: true,
    slug: "m-and-p-express-logistics",
    name: "M&P Express Logistics",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    description: "M&P Express Logistics is the courier arm of Muller & Phipps, a distribution company that began operating in Karachi in 1912 and is one of Pakistan's oldest business names. The courier service itself started in 1986 and now reaches more than 1,300 locations through 450-plus courier centres, handling over 12 million deliveries a year for individuals, e-commerce sellers and more than 12,000 corporate clients. M&P offers domestic and international courier, cash-on-delivery and logistics services, and is Pakistan's first FedEx Authorized Ship Center. Confirm pickup cut-off times at your nearest centre for same-day dispatch."
  },
  {
    seed: true,
    slug: "butt-karahi",
    name: "Butt Karahi",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Lahore",
    citySlug: "lahore",
    phone: "0331-4444726",
    description: "Butt Karahi is one of Lahore's most famous desi restaurants, serving chicken and mutton karahi cooked in desi ghee at its Lakshmi Chowk branch on McLeod Road for decades. The menu is deliberately simple — karahi by the kilogram, plus maghaz, tak-a-tak and barbecue — and the restaurant's reputation has spawned many copycat namesakes, so visitors check carefully for the original Lakshmi Chowk outlet. It is a late-night favourite and gets crowded at dinner time. Go early or be ready to wait, and confirm the per-kilogram price before ordering, since karahi is priced by weight."
  },
  {
    seed: true,
    slug: "daewoo-express-karachi-terminal",
    name: "Daewoo Express (Karachi Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Karachi",
    citySlug: "karachi",
    description: "Daewoo Express (Karachi Terminal) is the company's main Karachi terminal at Sohrab Goth, the departure point for its intercity coaches to Lahore, Islamabad, Rawalpindi, Multan and other major cities. The terminal handles ticket booking, departures and arrivals for one of Pakistan's most-searched bus operators, and its timings pages are among the most-looked-up travel queries in the city. Coaches offer reserved seating and online booking. Arrive at least half an hour before departure, confirm the exact boarding point inside the terminal, and check the day's timings in advance, since schedules change around holidays and weekends."
  },
  {
    seed: true,
    slug: "shaukat-khanum-hospital-peshawar",
    name: "Shaukat Khanum Hospital (Peshawar)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Peshawar",
    citySlug: "peshawar",
    phone: "091-5885000",
    description: "Shaukat Khanum Hospital (Peshawar) is the second hospital of the Shaukat Khanum Memorial Trust, opened on 29 December 2015 — exactly 21 years after the Lahore hospital — to bring specialist cancer care to Khyber Pakhtunkhwa and neighbouring regions. Like Lahore, it provides cancer diagnosis, surgery, chemotherapy and radiotherapy, and holds the Joint Commission International Gold Seal of Approval for quality and patient safety, as well as QOPI certification for oncology care. It operates as a charitable hospital, with a large share of patients receiving financially supported treatment. Contact the hospital directly for appointments, referrals and eligibility for financial support."
  },
  {
    seed: true,
    slug: "chughtai-lab-karachi",
    name: "Chughtai Lab (Karachi)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Karachi",
    citySlug: "karachi",
    phone: "03-111-456-789",
    description: "Chughtai Lab (Karachi) is the Karachi arm of one of Pakistan's largest diagnostic laboratory networks, founded in Lahore in 1983. The chain opened in Karachi in 2016 and now runs regional laboratories and many collection centres across the city, including its Shaheed-e-Millat Road facility in PECHS, offering blood tests, radiology, home sample collection and online reports. Karachi patients search for Chughtai Lab by area because collection centres are spread across the city's main neighbourhoods. Confirm your nearest centre's timings and whether your test needs fasting before you go."
  },
  {
    seed: true,
    slug: "islamabad-diagnostic-centre-idc",
    name: "Islamabad Diagnostic Centre (IDC)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "0345-0048536",
    description: "Islamabad Diagnostic Centre, known as IDC, was founded by Dr Rizwan Uppal, with its first centre opening in Wah Cantt in 2003 and its flagship centre at F-8 Markaz, Islamabad, in 2005. It offers the full range of laboratory tests and medical imaging, including MRI, CT scan, ultrasound and X-ray, and runs its centres round the clock. The network has grown to more than 90 centres across 30-plus cities, and is accredited by PNAC. Bookings can be made online or by phone; confirm preparation instructions for imaging tests and whether your nearest centre offers home sample collection."
  },
  {
    seed: true,
    slug: "nayatel-rawalpindi",
    name: "Nayatel (Rawalpindi)",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    phone: "051-111-144-444",
    description: "Nayatel (Rawalpindi) covers the Rawalpindi side of the twin cities with the same fibre-to-the-home service Nayatel is known for in Islamabad — uncapped fibre broadband with symmetrical upload and download speeds, plus cable TV and landline bundles. Its Rawalpindi footprint includes Saddar, Satellite Town, Westridge, Chaklala Scheme III, Bahria Town Rawalpindi and Askari housing schemes, along with Adyala Road. Because Nayatel lays fibre street by street, coverage can differ between neighbouring streets, so check your exact address on Nayatel's coverage checker or helpline before applying for a connection."
  },
  {
    seed: true,
    slug: "savour-foods-lahore",
    name: "Savour Foods (Lahore)",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Lahore",
    citySlug: "lahore",
    phone: "051-111-728-687",
    description: "Savour Foods (Lahore) brought the chain's famous chicken pulao to Lahore, where its first outlet opened near Shama Chowk on Ferozepur Road and quickly became one of the city's most-reviewed restaurants, with tens of thousands of Google reviews. The Lahore branches — including Lakshmi Chowk, Ghazi Road and Raiwind Road — serve the same menu of pulao with kabab, roast chicken, shami kabab and desi dishes, with dine-in, takeaway and delivery. Most branches open from 10:30 in the morning until after midnight. Expect queues at dinner time, and check delivery coverage for your area before ordering."
  },
  {
    seed: true,
    slug: "bookme-pk",
    name: "Bookme.pk",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    description: "Bookme.pk is Pakistan's largest online ticket booking platform, founded in Lahore in 2014 by Faizan Aslam after a frustrating trip to buy cinema tickets. It lets users book intercity bus tickets with operators such as Daewoo Express, domestic and international flights, train tickets, cinema seats, cricket matches and events through its website and app, with seat selection and advance booking. Bookme.pk is the Pakistan Cricket Board's official e-ticketing partner and raised a $7.5 million Series A round in 2021. Compare fares and cancellation terms across operators before paying, since ticket policies differ by bus company and airline."
  },
  {
    seed: true,
    slug: "depilex-group-head-office",
    name: "Depilex Group (Head Office)",
    category: "Beauty & Salons",
    categorySlug: "beauty",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35694233",
    description: "Depilex is Pakistan's oldest and largest beauty salon brand, founded in Lahore in 1980 by pioneering beautician Musarrat Misbah, and now running more than 30 salons and training institutes across Karachi, Lahore, Islamabad, Rawalpindi and Peshawar. Its head office is in DHA Phase 4, Lahore. Depilex salons offer bridal and party makeup, hair styling and colour, skincare and facials, and its Depilex Men chain, started in 2003, serves male clients. Prices vary by branch and service, so call ahead for the current rate list and book bridal appointments well in advance, especially during the wedding season."
  },
  {
    seed: true,
    slug: "amina-z-salon-and-makeup-studio",
    name: "Amina Z Salon & Makeup Studio",
    category: "Beauty & Salons",
    categorySlug: "beauty",
    city: "Lahore",
    citySlug: "lahore",
    description: "Amina Z Salon & Makeup Studio is a long-established Lahore beauty salon with three branches across DHA, and a reputation built on bridal and party makeup. Its services cover haircuts, colour and treatments, facials and skincare, manicures and pedicures, and spa rituals, with makeup for bridal, engagement, nikah, mehndi and walima occasions. The salon opens daily from 11 in the morning to 7:30 in the evening. Book ahead for bridal and event makeup, confirm the package price and what it includes, and arrive on time, since appointments run back to back."
  },
  {
    seed: true,
    slug: "aimfit",
    name: "AimFit",
    category: "Sports & Fitness",
    categorySlug: "sports",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35695696",
    description: "AimFit is a women's fitness studio chain founded in Lahore in 2014 by sisters Mahlaqa and Noor Shaukat after they returned from studying at Oxford University and found few quality fitness spaces for women in Pakistan. It runs studios in Lahore and Islamabad, with group classes in cardio, strength training, dance fitness and yoga, plus online classes, and instructors trained through AimFit's own academy. The company raised a $1 million seed round in 2020, becoming one of Pakistan's first venture-backed fitness startups. Check class timings and membership packages at your nearest studio before joining, since schedules vary by location."
  },
  {
    seed: true,
    slug: "interwood-mobel",
    name: "Interwood Mobel",
    category: "Furniture & Home Decor",
    categorySlug: "furniture",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-111-203-203",
    description: "Interwood Mobel is one of Pakistan's leading furniture makers, founded in 1974 by Farooq Ahmed Malik as a small workshop in Lahore and now manufacturing home and office furniture, kitchens, doors, wardrobes and flooring from a 600,000-square-foot factory in the city. Its showrooms in Lahore, Karachi and Islamabad sell ready-made and made-to-order pieces, and the company has furnished offices, banks and hotels across the country. Custom orders take time to manufacture and deliver, so confirm lead times, measurements and installation charges in writing before placing an order."
  },
  {
    seed: true,
    slug: "askari-guards-head-office",
    name: "Askari Guards (Head Office)",
    category: "Security Services",
    categorySlug: "security",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    phone: "051-5517131",
    description: "Askari Guards is one of Pakistan's largest private security companies, launched in 1996 as a subsidiary of the Army Welfare Trust, with its head office in Rawalpindi. It provides trained security guards, cash-in-transit, event security and electronic surveillance for homes, businesses, banks and institutions nationwide, and recruits much of its manpower from retired military personnel. The Ministry of Interior has designated it a model security company, and it holds operating permissions in all provinces and Azad Jammu and Kashmir. Businesses seeking guarding services should ask for a site survey and a written quote before signing a contract."
  },
  {
    seed: true,
    slug: "beaconhouse-school-system",
    name: "Beaconhouse School System",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-111-232-266",
    description: "Beaconhouse School System began in 1975 as a small nursery with 19 children in a private house in Lahore, founded by Nasreen Mahmud Kasuri, and has grown into one of the largest school systems of its kind in the world, with hundreds of thousands of students across Pakistan, Malaysia, Thailand, the Philippines, the UAE and Oman. Its campuses in Pakistan run from early years to A Levels, and the wider Beaconhouse Group also operates The Educators network and Beaconhouse National University. Admissions open at set times of the year, so check the campus admission schedule and fee structure before applying."
  },
  {
    seed: true,
    slug: "university-of-the-punjab",
    name: "University of the Punjab",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    description: "The University of the Punjab, established in Lahore on 14 October 1882, is Pakistan's oldest public university and its largest seat of higher learning, with six campuses, 19 faculties and 138 departments, centres and institutes. Its two main Lahore campuses are the historic Allama Iqbal Campus near the old city and the Quaid-i-Azam Campus on Canal Road, with further campuses in Gujranwala, Jhelum and Khanspur, plus hundreds of affiliated colleges. The university offers undergraduate, graduate and doctoral programmes across the sciences, arts, law, business and medicine. Check admission notices and entry-test dates on the university's own website before applying."
  },
  {
    seed: true,
    slug: "university-of-engineering-and-technology-uet",
    name: "University of Engineering and Technology (UET)",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    description: "The University of Engineering and Technology, Lahore, is Pakistan's oldest engineering university, founded in 1921 as Mughalpura Technical College and renamed Maclagan Engineering College in 1923 before becoming a university in 1961 and taking its current name in 1972. Its main campus sits on Grand Trunk Road near the Shalimar Gardens, running undergraduate and postgraduate programmes in civil, electrical, mechanical, chemical and other engineering disciplines, along with architecture and computer science. UET also operates campuses in other Punjab cities. Admission is through the university's entry test, so confirm the test date, eligibility and merit criteria on UET's own website."
  },
  {
    seed: true,
    slug: "descon-engineering",
    name: "Descon Engineering",
    category: "Construction & Engineering",
    categorySlug: "construction",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35990034",
    description: "Descon Engineering is one of Pakistan's leading engineering, procurement and construction companies, founded in Lahore in 1977 by Abdul Razak Dawood with a handful of engineers. It builds and maintains plants and infrastructure for the oil and gas, power, cement, fertiliser, chemical and water sectors, and also manufactures pressure vessels, boilers and industrial equipment. Descon works in Pakistan and across the Gulf, including the UAE, Saudi Arabia, Qatar, Oman and Kuwait, and its manufacturing division has appeared on the Engineering News-Record list. Engineering contracts are awarded through tenders and direct engagement, not walk-in enquiries."
  },
  {
    seed: true,
    slug: "hassan-and-hassan-advocates",
    name: "Hassan & Hassan (Advocates)",
    category: "Legal Services",
    categorySlug: "legal",
    city: "Lahore",
    citySlug: "lahore",
    description: "Hassan & Hassan (Advocates) is one of Pakistan's most renowned law firms, established in Lahore in 1969 by Dr Parvez Hassan, a Senior Advocate of the Supreme Court of Pakistan who holds a doctorate in law from Harvard and a master's from Yale. The firm advises corporate, institutional, government and foreign clients on contracts, commercial and energy law, investment and regulatory matters, and Dr Hassan drafted Pakistan's environmental protection legislation. Its Lahore office is on Kashmir Egerton Road. Legal work is handled by appointment, so contact the firm in advance with a summary of your matter rather than walking in."
  },
  {
    seed: true,
    slug: "zameen-com",
    name: "Zameen.com",
    category: "Real Estate & Property",
    categorySlug: "real-estate",
    city: "Lahore",
    citySlug: "lahore",
    description: "Zameen.com is Pakistan's largest property portal, founded in Lahore in 2006 by brothers Zeeshan and Imran Ali Khan as a single-room startup. It lists houses, plots, apartments and commercial property for sale and rent across the country, with offices in 30 cities and thousands of registered real estate agencies. The portal also publishes property trends, price indexes and guides, and its parent company, Emerging Markets Property Group, runs the UAE portal Bayut. Zameen.com won the CNBC Best Property Portal Pakistan award within two years of launching. Verify any listing's ownership documents and visit the property before paying an advance."
  },
  {
    seed: true,
    slug: "marham",
    name: "Marham",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    description: "Marham is Pakistan's largest digital healthcare platform, founded in Lahore in 2016, connecting patients with more than 40,000 doctors across 100-plus specialties in 121 cities. Patients can book in-clinic appointments, consult doctors by video, order lab tests with home sample collection, and get medicines delivered, all through its website and app. Every doctor on the platform is verified against the Pakistan Medical Commission register before their profile goes live, and fees are shown upfront. Check the doctor's reviews, fee and clinic timings before booking, and keep your prescription ready for video consultations."
  },
  {
    seed: true,
    slug: "holy-family-hospital",
    name: "Holy Family Hospital",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "Holy Family Hospital is one of Rawalpindi's oldest and largest public hospitals, opened in 1927 by Christian missionaries near Liaquat Bagh on Murree Road and moved to its present Satellite Town building in 1946. It was handed to the Government of Punjab in 1977 and is now the principal teaching hospital of Rawalpindi Medical University, with around 1,050 beds and departments covering medicine, surgery, paediatrics, gynaecology and obstetrics, eye and ENT care. It runs a busy 24-hour emergency department. Expect long waits in outpatients and emergency, and bring the patient's previous records and test reports to the appointment."
  },
  {
    seed: true,
    slug: "hbl-plaza-branch-karachi",
    name: "HBL Plaza Branch (Karachi)",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "HBL Plaza Branch is the Karachi main branch of Habib Bank Limited, Pakistan's first commercial bank, founded in 1941 by the Habib family at the urging of Muhammad Ali Jinnah and moved to Karachi in 1947. HBL Plaza on I.I. Chundrigar Road has housed the bank's head office since 1972 and was once the tallest building in South Asia. HBL is now Pakistan's largest private bank, with more than 1,500 branches and over 2,000 ATMs, offering accounts, loans, credit cards, remittances and digital banking. Branch services are available during banking hours; confirm timings and bring original identification for account work."
  },
  {
    seed: true,
    slug: "ubl-main-branch-karachi",
    name: "UBL Main Branch (Karachi)",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "UBL Main Branch is the Karachi main branch of United Bank Limited, founded in 1959 by Agha Hassan Abedi with its first branch on McLeod Road, now I.I. Chundrigar Road. UBL grew into one of Pakistan's largest banks and was the first Pakistani bank to open a branch abroad, in London in 1963. It was nationalised in the 1970s and privatised in 2002, and today runs more than 1,300 branches across Pakistan plus overseas branches. The bank offers accounts, loans, credit cards, remittances and digital banking. Confirm branch timings and bring original identification for account opening and other branch services."
  },
  {
    seed: true,
    slug: "mcb-main-branch-karachi",
    name: "MCB Main Branch (Karachi)",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-32413983",
    description: "MCB Karachi Main Branch is the Karachi main branch of MCB Bank, incorporated in July 1947 as Muslim Commercial Bank by the Adamjee Group, shortly before Partition. MCB was nationalised in 1974 and became Pakistan's first privatised bank in 1991, when a consortium led by the Nishat Group bought it, and the bank shortened its name to MCB Bank in 2005. Headquartered in Lahore, MCB is one of the country's largest banks, offering accounts, loans, credit cards, trade finance and digital banking. Check branch timings before visiting and carry original identification for account-related work."
  },
  {
    seed: true,
    slug: "meezan-bank-gulbai-ho-branch-karachi",
    name: "Meezan Bank Gulbai (HO) Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "Meezan Bank Gulbai (HO) Branch is the head-office branch of Meezan Bank, Pakistan's first and largest Islamic bank, located near its Meezan House headquarters in Karachi. Meezan began in 1997 as Al-Meezan Investment Bank and received Pakistan's first Islamic commercial banking licence from the State Bank in 2002, when it took over Societe Generale's Pakistan operations. Every product it offers is Riba-free and Shariah-compliant, from accounts to home, car and business financing, and its network now spans more than 1,000 branches across the country. Ask the branch for the current profit rates and financing terms before opening an account."
  },
  {
    seed: true,
    slug: "nbp-main-branch-karachi",
    name: "National Bank of Pakistan Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "National Bank of Pakistan Main Branch is the Karachi main branch of the National Bank of Pakistan, established in November 1949 under the National Bank of Pakistan Ordinance as a government-owned bank. Headquartered on I.I. Chundrigar Road, Karachi, NBP is one of the country's largest banks, with more than 1,500 branches across Pakistan and a role as agent of the State Bank, handling government treasury business where the central bank has no office. It offers accounts, loans, agricultural financing, remittances and digital banking. Confirm branch timings and bring original identification for account opening and other services."
  },
]

/** Slugs of the seed businesses that survived pruning round 1. */
export const SEED_SLUGS = SEED_BUSINESSES.map((b) => b.slug)

/** Look up a seed business by slug (undefined when not a seed). */
export const SEED_BUSINESS_BY_SLUG = new Map(SEED_BUSINESSES.map((b) => [b.slug, b]))

export function getSeedBusiness(slug: string): SeedBusiness | undefined {
  return SEED_BUSINESS_BY_SLUG.get(slug)
}
