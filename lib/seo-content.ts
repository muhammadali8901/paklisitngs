// SEO Content Template Generator
// Generates 500-800 word unique content blocks for programmatic SEO pages

export const CITY_INFO: Record<string, { province: string; description: string; industries: string[]; districts?: string[] }> = {
  Karachi: {
    province: 'Sindh',
    description: "the biggest city in Pakistan and the country's commercial and financial heart",
    industries: ['finance', 'retail', 'logistics', 'technology', 'manufacturing'],
    districts: ['Clifton', 'DHA', 'Shahrah-e-Faisal', 'Saddar', 'Gulshan-e-Iqbal', 'North Nazimabad'],
  },
  Lahore: {
    province: 'Punjab',
    description: "the country's cultural heart and its second-biggest city",
    industries: ['education', 'retail', 'real-estate', 'food', 'technology'],
    districts: ['Gulberg', 'DHA', 'Johar Town', 'Model Town', 'Mall Road', 'Bahria Town'],
  },
  Islamabad: {
    province: 'ICT',
    description: "the country's planned, modern capital city",
    industries: ['government', 'technology', 'education', 'real-estate', 'healthcare'],
    districts: ['Blue Area', 'F-7 Markaz', 'F-10 Markaz', 'DHA', 'Bahria Town', 'G-11'],
  },
  Rawalpindi: {
    province: 'Punjab',
    description: "Islamabad's twin city, with a long history as a trading and commercial centre",
    industries: ['retail', 'automotive', 'construction', 'food', 'finance'],
  },
  Faisalabad: {
    province: 'Punjab',
    description: "the centre of Pakistan's textile industry and a major manufacturing city",
    industries: ['textile', 'manufacturing', 'retail', 'logistics', 'agriculture'],
  },
  Multan: {
    province: 'Punjab',
    description: 'the historic City of Saints, where a centuries-old trading culture meets a fast-growing economy',
    industries: ['agriculture', 'education', 'retail', 'healthcare', 'food'],
  },
  Peshawar: {
    province: 'Khyber Pakhtunkhwa',
    description: "one of the region's oldest trading cities and the historic gateway toward Central Asia",
    industries: ['trade', 'retail', 'food', 'automotive', 'real-estate'],
  },
  Quetta: {
    province: 'Balochistan',
    description: "Balochistan's capital and the main commercial centre for trade across the province",
    industries: ['trade', 'agriculture', 'retail', 'construction', 'food'],
  },
  Sialkot: {
    province: 'Punjab',
    description: 'an export powerhouse world-famous for its sports goods and surgical instruments',
    industries: ['manufacturing', 'retail', 'logistics', 'finance', 'technology'],
  },
  Hyderabad: {
    province: 'Sindh',
    description: "the second-biggest city in Sindh, with busy bazaars and a lively trading scene",
    industries: ['retail', 'education', 'healthcare', 'food', 'real-estate'],
  },
  Gujranwala: {
    province: 'Punjab',
    description: "one of Pakistan's leading industrial cities, popularly known as the 'City of Wrestlers'",
    industries: ['manufacturing', 'retail', 'automotive', 'food', 'logistics'],
  },
  Bahawalpur: {
    province: 'Punjab',
    description: 'a former princely state capital whose commerce and agriculture keep expanding',
    industries: ['agriculture', 'retail', 'education', 'healthcare', 'food'],
  },
  Sargodha: {
    province: 'Punjab',
    description: "Pakistan's citrus capital, built on a thriving agricultural economy",
    industries: ['agriculture', 'retail', 'food', 'education', 'automotive'],
  },
  Sukkur: {
    province: 'Sindh',
    description: 'an important city on the Indus River where trade keeps expanding',
    industries: ['trade', 'retail', 'agriculture', 'food', 'construction'],
  },
  Larkana: {
    province: 'Sindh',
    description: 'a well-known Sindhi city with deep historical roots and an active commercial life',
    industries: ['agriculture', 'retail', 'healthcare', 'education', 'food'],
  },
  Sheikhupura: {
    province: 'Punjab',
    description: "an industrial neighbour of Lahore whose economy is expanding fast",
    industries: ['manufacturing', 'retail', 'food', 'logistics', 'construction'],
  },
  'Rahim Yar Khan': {
    province: 'Punjab',
    description: 'a south Punjab city powered by strong farming and trade',
    industries: ['agriculture', 'retail', 'food', 'healthcare', 'education'],
  },
  Mardan: {
    province: 'Khyber Pakhtunkhwa',
    description: "KPK's second-biggest city, home to a steadily expanding business scene",
    industries: ['agriculture', 'retail', 'food', 'education', 'healthcare'],
  },
  Gujrat: {
    province: 'Punjab',
    description: 'a manufacturing city celebrated for its electronics and furniture trades',
    industries: ['manufacturing', 'retail', 'electronics', 'food', 'automotive'],
  },
  Kasur: {
    province: 'Punjab',
    description: 'a historic city close to Lahore, recognised for leather production and farming',
    industries: ['manufacturing', 'agriculture', 'retail', 'food', 'education'],
  },
}

const CATEGORY_INFO: Record<string, { label: string; description: string; examples: string[] }> = {
  restaurants: {
    label: 'Restaurant & Food',
    description: 'eateries of every kind, from restaurants and cafes to fast-food outlets, bakeries and caterers',
    examples: ['fast-food outlets', 'family dining restaurants', 'cafes and coffee shops', 'bakeries', 'catering companies', 'food trucks'],
  },
  'real-estate': {
    label: 'Real Estate',
    description: 'property dealers and agents, housing societies, rental agencies and construction companies',
    examples: ['residential developments', 'commercial properties', 'rental agencies', 'housing societies', 'estate agents'],
  },
  technology: {
    label: 'Technology & IT',
    description: 'software houses, web and app development studios, IT support providers and digital marketing agencies',
    examples: ['software development', 'website design', 'mobile app development', 'digital marketing', 'IT support', 'cloud services'],
  },
  healthcare: {
    label: 'Healthcare & Medical',
    description: 'hospitals and clinics, pharmacies, diagnostic laboratories and suppliers of medical equipment',
    examples: ['hospitals', 'private clinics', 'dental practices', 'pharmacies', 'diagnostic laboratories', 'specialist doctors'],
  },
  education: {
    label: 'Education & Training',
    description: 'schools, colleges and universities, plus academies and vocational training institutes',
    examples: ['schools', 'colleges', 'universities', 'training institutes', 'online learning providers', 'tutoring centres'],
  },
  retail: {
    label: 'Retail & Shopping',
    description: 'clothing and electronics stores, grocery outlets and specialist retailers of every kind',
    examples: ['fashion and clothing stores', 'electronics shops', 'grocery outlets', 'furniture shops', 'bookstores', 'sports equipment stores'],
  },
  construction: {
    label: 'Construction',
    description: 'building contractors and construction firms, architects, interior designers and building-material suppliers',
    examples: ['building contractors', 'interior design studios', 'architectural firms', 'renovation specialists', 'building material suppliers'],
  },
  automotive: {
    label: 'Automotive',
    description: 'car dealers, repair workshops, car-wash services and spare-parts retailers',
    examples: ['car dealerships', 'auto repair workshops', 'car wash services', 'spare parts shops', 'motorcycle dealers', 'car rental services'],
  },
  finance: {
    label: 'Finance & Banking',
    description: 'banks and insurers, investment firms and providers of accounting and advisory services',
    examples: ['commercial banks', 'insurance providers', 'investment firms', 'accounting practices', 'tax consultants', 'microfinance institutions'],
  },
  travel: {
    label: 'Travel & Tourism',
    description: 'travel agents, hotels and guest houses, tour operators and other tourism services',
    examples: ['travel agencies', 'hotels and resorts', 'tour operators', 'guest houses', 'car hire', 'adventure tourism operators'],
  },
  beauty: {
    label: 'Beauty & Wellness',
    description: 'beauty salons and spas, gyms and fitness centres, yoga studios and cosmetics retailers',
    examples: ['hair and beauty salons', 'spas', 'gyms and fitness centres', 'yoga studios', 'cosmetics shops', 'barbershops'],
  },
  logistics: {
    label: 'Logistics & Transport',
    description: 'courier and shipping companies, warehousing operators and transport providers',
    examples: ['courier companies', 'freight and shipping firms', 'warehousing', 'freight forwarders', 'house-moving services', 'trucking companies'],
  },
  'home-services': {
    label: 'Home Services',
    description: 'plumbers, electricians, carpenters, painters, cleaners and repair technicians who work in your home',
    examples: ['plumbers', 'electricians', 'carpenters', 'painters', 'AC and appliance repair', 'cleaning services', 'pest control'],
  },
  legal: {
    label: 'Legal Services',
    description: 'law firms, advocates, notaries and legal consultants for individuals and businesses',
    examples: ['law firms and advocates', 'corporate lawyers', 'family lawyers', 'property lawyers', 'tax lawyers', 'notary and documentation services'],
  },
  'solar-energy': {
    label: 'Solar Energy',
    description: 'solar panel installers, inverter and battery suppliers, and renewable-energy system designers',
    examples: ['solar panel installers', 'solar system dealers', 'inverter and battery suppliers', 'net-metering consultants', 'solar maintenance services'],
  },
  events: {
    label: 'Events & Weddings',
    description: 'event planners, wedding venues and marquees, caterers, decorators and photographers',
    examples: ['wedding planners', 'banquet halls and marquees', 'caterers', 'decorators', 'photographers and videographers', 'sound and lighting rentals'],
  },
  manufacturing: {
    label: 'Manufacturing & Industry',
    description: 'factories, industrial units, textile mills, engineering works and industrial suppliers',
    examples: ['textile mills', 'engineering works', 'food processing units', 'packaging manufacturers', 'industrial equipment suppliers', 'export manufacturers'],
  },
  agriculture: {
    label: 'Agriculture',
    description: 'farm suppliers, seed and fertiliser dealers, livestock services and agri-machinery providers',
    examples: ['seed and fertiliser dealers', 'tractor and machinery dealers', 'livestock and dairy services', 'pesticide suppliers', 'cold storage operators'],
  },
  security: {
    label: 'Security Services',
    description: 'private security companies, CCTV and alarm installers, and guarding services',
    examples: ['security guard companies', 'CCTV installers', 'alarm system providers', 'access control installers', 'event security'],
  },
  printing: {
    label: 'Printing & Packaging',
    description: 'printing presses, packaging manufacturers, signage makers and design studios',
    examples: ['offset and digital printing', 'packaging manufacturers', 'signage and flex printing', 'stationery printers', 'label and sticker printing'],
  },
  furniture: {
    label: 'Furniture & Decor',
    description: 'furniture makers and showrooms, carpenters, and home and office decor suppliers',
    examples: ['furniture showrooms', 'custom furniture makers', 'office furniture suppliers', 'curtain and upholstery shops', 'interior decor stores'],
  },
  media: {
    label: 'Media & Marketing',
    description: 'advertising and digital marketing agencies, production houses, photographers and content studios',
    examples: ['digital marketing agencies', 'advertising agencies', 'video production houses', 'photography studios', 'social media agencies', 'graphic design studios'],
  },
  sports: {
    label: 'Sports & Fitness',
    description: 'sports goods manufacturers and retailers, gyms, sports clubs and coaching academies',
    examples: ['sports goods manufacturers', 'sports shops', 'gyms and fitness clubs', 'cricket academies', 'sports coaching centres'],
  },
  pets: {
    label: 'Pets & Animals',
    description: 'veterinary clinics, pet shops, grooming services and animal feed suppliers',
    examples: ['veterinary clinics', 'pet shops', 'pet grooming services', 'animal feed suppliers', 'pet boarding'],
  },
}

// ============================================================
// Meta-description + title helpers (shared by the directory
// templates). Every formula is verified computationally over
// the full dataset it serves: titles 50-60 chars, descriptions
// 150-160 chars. See the Group C report for the distributions.
// ============================================================

/** Word-boundary truncate to at most `max` chars, keeping whole words. */
export function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()
}

/** First candidate whose length lands in [min, max]; the first candidate as fallback. */
export function pickTitleInRange(candidates: string[], min = 50, max = 60): string {
  for (const c of candidates) {
    if (c.length >= min && c.length <= max) return c
  }
  return candidates[0]
}

/**
 * Fit a meta description into [min, max] (default 150-160).
 * Long text is word-boundary truncated; in-range text is kept;
 * short text is extended with the given tails — a single tail
 * first, then a pair, then greedy append + truncate — so the
 * result always lands in range when the tails allow it. Tails
 * must be real content (what the page shows), never filler.
 */
export function fitMetaDescription(text: string, tails: string[], min = 150, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length > max) {
    const cut = truncateWords(clean, max)
    return cut.length >= min ? cut : clean.slice(0, max)
  }
  if (clean.length >= min) return clean
  for (const tail of tails) {
    if (clean.length + tail.length >= min && clean.length + tail.length <= max) return clean + tail
  }
  for (let i = 0; i < tails.length; i++) {
    for (let j = i + 1; j < tails.length; j++) {
      const len = clean.length + tails[i].length + tails[j].length
      if (len >= min && len <= max) return clean + tails[i] + tails[j]
    }
  }
  let out = clean
  for (const tail of tails) {
    if (out.length >= min) break
    out += tail
  }
  if (out.length > max) {
    const cut = truncateWords(out, max)
    return cut.length >= min ? cut : out.slice(0, max)
  }
  return out
}

/**
 * Description tails for city and area pages: the same eight
 * lengths (86-124) cover every city/area prefix in the dataset.
 * Each tail states what the page offers — categories, areas,
 * phone numbers, hours, addresses, direct contact.
 */
export const CONTACT_DESCRIPTION_TAILS = [
  ' — compare options by category and area, check phone numbers, hours and addresses, then call or WhatsApp providers directly.',
  ' — compare providers by category and area, check phone numbers, hours and addresses, then call or WhatsApp directly.',
  ' — compare options by category, check phone numbers, hours and addresses, then call or WhatsApp providers directly.',
  ' — compare options by category and area, check phone numbers and hours, then call or WhatsApp directly.',
  ' — compare providers by category and area, check phone numbers and hours, then call or WhatsApp directly.',
  ' — compare providers by category, check phone numbers and hours, then call or WhatsApp directly.',
  ' — compare options by category, check phone numbers and hours, then call or WhatsApp directly.',
  ' — check phone numbers, hours and addresses, then call or WhatsApp providers directly.',
]

/** Short label for a category id (the guide heading form), e.g. 'pets' -> 'Pets & Animals'. */
export function categoryLabel(categorySlug: string): string {
  return CATEGORY_INFO[categorySlug]?.label || (categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category')
}

// ============================================================
// Detail-page title guard (business / company / job)
// ------------------------------------------------------------
// Target 50-60 chars, hard cap 60. The full form is used when
// it fits; otherwise the label is dropped, then short honest
// extenders are tried; only when the name itself is too long
// is the NAME truncated — at a word boundary with an ellipsis,
// never dropping the city. Phone-less listings never get a
// phone-implying extender (their extenders say Address/Hours).
// ============================================================

function truncateNameForTitle(name: string, cityLabel: string): string {
  const suffixes = [` in ${cityLabel} | PakListings`, ` in ${cityLabel}, Pakistan | PakListings`]
  for (const suffix of suffixes) {
    const budget = 60 - (suffix.length + 1)
    const truncated = truncateWords(name, budget)
    const titled = `${truncated}${truncated.length < name.length ? '…' : ''}${suffix}`
    if (titled.length >= 50 && titled.length <= 60) return titled
  }
  // Last resort: hard-extend the word-boundary prefix to exactly 50.
  const suffix = suffixes[0]
  const budget = 60 - (suffix.length + 1)
  const core = truncateWords(name, budget).replace(/…$/, '')
  const need = 50 - (core.length + 1 + suffix.length)
  const extended = (core + name.slice(core.length, core.length + Math.max(0, need))).trimEnd() + '…'
  return `${extended}${suffix}`
}

/**
 * Guarded detail title: "{name} — {label} in {city} | PakListings"
 * when it fits, with honest fallbacks. `hasPhone` selects the
 * extender family (phone variants only when a number exists).
 */
export function detailTitle(name: string, label: string | undefined, city: string | undefined, hasPhone: boolean): string {
  const cityLabel = city || 'Pakistan'
  const dropped = `${name} in ${cityLabel} | PakListings`
  const candidates: string[] = []
  if (label) {
    candidates.push(`${name} — ${label} in ${cityLabel} | PakListings`)
    const extender = /services$/i.test(label) ? 'Providers' : 'Services'
    candidates.push(`${name} — ${label} ${extender} in ${cityLabel} | PakListings`)
    candidates.push(`${name} — ${label} in ${cityLabel}, Pakistan | PakListings`)
  }
  candidates.push(dropped)
  candidates.push(`${name} in ${cityLabel}, Pakistan | PakListings`)
  if (hasPhone) {
    candidates.push(`${name} in ${cityLabel}: Phone & Address | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Phone, Address & Hours | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Phone, Address, Hours & More | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Phone Number, Address & Opening Hours | PakListings`)
  } else {
    candidates.push(`${name} in ${cityLabel}: Address & Hours | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Address, Hours & Services | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Address, Hours, Services & More | PakListings`)
    candidates.push(`${name} in ${cityLabel}: Address, Opening Hours & Services | PakListings`)
  }
  const picked = pickTitleInRange(candidates)
  if (picked.length >= 50 && picked.length <= 60) return picked
  if (dropped.length > 60) return truncateNameForTitle(name, cityLabel)
  return picked
}

/** Truncated-name title for a long job title (company dropped, city kept). */
export function truncateTitleName(name: string, city: string | undefined): string {
  return truncateNameForTitle(name, city || 'Pakistan')
}

// ============================================================
// Category families — the guide checklists, questions, price
// notes and warning signs vary by family instead of one
// identical checklist with token swaps on every page.
// ============================================================

type CategoryFamily = 'trades' | 'food' | 'professional' | 'care' | 'retail'

const CATEGORY_FAMILY: Record<string, CategoryFamily> = {
  'home-services': 'trades',
  construction: 'trades',
  automotive: 'trades',
  'solar-energy': 'trades',
  security: 'trades',
  printing: 'trades',
  furniture: 'trades',
  agriculture: 'trades',
  manufacturing: 'trades',
  logistics: 'trades',
  restaurants: 'food',
  travel: 'food',
  events: 'food',
  legal: 'professional',
  finance: 'professional',
  'real-estate': 'professional',
  technology: 'professional',
  media: 'professional',
  education: 'professional',
  healthcare: 'care',
  beauty: 'care',
  sports: 'care',
  pets: 'care',
  retail: 'retail',
}

const FAMILY_CONTENT: Record<CategoryFamily, { angle: string; questions: string[]; priceNote: string; redFlags: string[] }> = {
  trades: {
    angle:
      'Trade work in Pakistan is bought on trust and finished on site: the provider comes to you, or you hand over something valuable for repair. That is why the details on a profile matter more than the pitch — a stated service area, a reachable number, and a list of the actual jobs done. Most trade providers quote per job rather than per hour, and most are happy to discuss the work on WhatsApp with a photo of the problem before anyone travels.',
    questions: [
      'Is the visit charge separate from the repair, and what does the visit include?',
      'Are parts and materials included in the quote, and are they new?',
      'How long is the work guaranteed for, and what does the guarantee cover?',
      'Do you charge a fixed quote, or by the hour — and what happens if the job takes longer?',
    ],
    priceNote:
      'Get the quote in writing on WhatsApp before anyone lifts a tool — labour, parts, visit charges and any tax, each on its own line. A fixed quote beats an open-ended hourly rate for a defined job; for exploratory repairs, agree an inspection fee and a ceiling before work starts, and pay larger jobs in stages against finished work.',
    redFlags: [
      'will not put a price in writing',
      'demands the full amount in advance in cash with no receipt',
      'has no reachable phone number or stated service area',
      'offers no warranty on the work',
      'pressures you to decide on the spot',
    ],
  },
  food: {
    angle:
      'Food and hospitality run on reputation and repeat visits: a restaurant lives or dies by its last month of customers, a caterer by its last wedding, a travel agent by the last group that came home happy. Prices move with the season and the menu, so the rate list on a profile — or a menu sent on WhatsApp — is worth more than any headline price.',
    questions: [
      'Is the menu or rate list on your profile current?',
      'Do you deliver or cater in my area, and what is the delivery charge?',
      'For bookings: what is the per-head rate, what does it include, and what are the cancellation terms?',
      'Can you share recent photos of the venue, the food or a recent event — not stock images?',
    ],
    priceNote:
      'Compare per-head or per-item prices, not headline totals, and check delivery charges, minimum orders and cancellation terms before booking. For events, get the full package in writing — venue, food, decor and photography are often quoted separately and add up fast.',
    redFlags: [
      'has no menu or rate list and will not share one',
      'takes an advance with no receipt or written booking',
      'shows only stock photos with nothing real of its own food or venue',
      'will not confirm delivery to your area before you pay',
    ],
  },
  professional: {
    angle:
      'Professional services are bought on credentials and clarity: who will handle the work, what it costs, and what happens if it goes wrong. The best providers state all three up front. Fees vary widely with the size of the firm and the complexity of the matter, so a short written scope — what is included, what is billed separately, when payment falls due — is the single most useful document in this category.',
    questions: [
      'Who exactly will handle my matter — you, or someone in your team?',
      'What is the fee structure: fixed, hourly, or success-based?',
      'What documents do you need from me, and what is the realistic timeline?',
      'Can you share a sample of similar work, or a client I can speak to?',
    ],
    priceNote:
      'Ask for the fee in writing with the scope: what is included, what is billed separately, and when each payment falls due. A short written engagement note beats a verbal promise, and a provider who will not put a fee in writing is telling you something.',
    redFlags: [
      'guarantees an outcome no honest provider can guarantee',
      'changes the fee mid-matter',
      'will not put the scope and fee in writing',
      'has no reachable office or verifiable registration',
    ],
  },
  care: {
    angle:
      'Health, beauty and fitness services are personal: you are trusting someone with your body, your appearance or your child\u2019s training. Qualifications and registration matter here more than in any other category, and so does a clear first-visit price — what a consultation or session costs, and what follow-ups cost after it.',
    questions: [
      'What are your qualifications, and where are you registered?',
      'What does a first visit or consultation cost, and what does it include?',
      'What are your timings, and do I need an appointment?',
      'What is the follow-up or aftercare policy, and what does it cost?',
    ],
    priceNote:
      'Ask for the consultation or session fee up front, plus what follow-ups cost. For treatment plans, get the full course and its cost in writing before the first session — and be wary of anyone who insists on the whole course paid in advance on visit one.',
    redFlags: [
      'cannot show a qualification or registration',
      'pressures you to book and pay for a full course on the first visit',
      'will not state a fee in writing',
      'has no appointment system or published timings',
    ],
  },
  retail: {
    angle:
      'Retail is the most price-transparent category on this directory: the same item usually has a visible price in two or three shops, so comparison is fast. What separates shops is not the price alone — it is whether the item is actually in stock, whether delivery and fitting are included, and whether you get a proper bill, which is your warranty.',
    questions: [
      'Is this the current price, and does it include delivery?',
      'What is the return or exchange policy?',
      'Is the item in stock in my size or model, or does it need to be ordered in?',
      'Do you offer installation, fitting or after-sales support?',
    ],
    priceNote:
      'Compare the same item across two or three shops, and check whether delivery, fitting or installation is inside the price. Ask for a proper bill — it is your warranty — and confirm the return window before you pay.',
    redFlags: [
      'gives no bill and no return policy',
      'changes the price between the call and the visit',
      'shows only stock photos of items it does not hold',
      'cannot say whether the item is in stock',
    ],
  },
}

function familyFor(categorySlug: string): CategoryFamily {
  return CATEGORY_FAMILY[categorySlug] || 'trades'
}

export function generateCityContent(city: string): string {
  const info = CITY_INFO[city] || {
    province: 'Pakistan',
    description: 'a fast-growing centre of commerce',
    industries: ['retail', 'food', 'healthcare', 'education', 'technology'],
  }

  const districtsText = info.districts
    ? `The city's commercial life clusters in areas like ${info.districts.join(', ')} — if you want someone nearby, start your search there.`
    : `Trade here runs through bazaars, markets and commercial centres spread across the city, so starting from your own area saves real time.`

  return `## Businesses in ${city}: Numbers, Hours and Addresses in One Place

${city}, in ${info.province}, is ${info.description}. Think of this page as the ${city} yellow pages: every approved listing leads with the details you actually need — a phone number, a WhatsApp button, an address or service area, and opening hours. Browsing and calling are free; there is no account to create and no commission on any enquiry.

### Start With the Trade, Not the Name

If you already know the business name, search for it directly. If you only know what you need — a plumber, a restaurant, a clinic — pick the category first and let the city do the filtering. Every category on this page opens its own ${city} guide with the approved businesses in that trade so far, and each profile shows the services the owner listed, the areas covered and the hours kept.

${districtsText}

### What ${city} Is Known For

The local economy leans hardest on ${info.industries.slice(0, 3).join(', ')}, with plenty beyond those three. That mix decides the depth of choice in each trade: where the city has real strength, you will find several providers worth comparing instead of one name to take or leave.

### Call First, Then Visit

Pakistani businesses run on the phone, and this directory is built for that. Before you travel anywhere, call the number on the profile or send a WhatsApp message and confirm four things: the timings today, whether the service or item you want is available, the price or a written estimate, and the exact location or landmark. A provider that answers clearly on all four is usually a safe pair of hands; one that will not answer, or will not put a price in writing, is a reason to try the next listing.

### Two Messages to a Fair Price

There is no single going rate for most local work — it moves with the job, the materials and the provider's workload. The fastest fair-price check is two messages: ask two or three providers for the same job in writing on WhatsApp, then compare what is inside each quote — labour, materials, delivery, visit charges and after-service. Agree the schedule before work starts, pay larger jobs in stages against finished work, and always take a proper bill or receipt.

### Read the Profile Like a Local Would

Five quick reads that prevent most bad experiences, whatever the trade:

1. Match the services list. Make sure the exact service you need is in the profile's services, not just implied by the category.
2. Match the area. Check the address or service area on the profile — a provider nearby usually means a faster visit and a lower travel charge.
3. Check the hours. A profile that lists opening hours tells you whether it is open now; one with no hours at all is a weaker bet.
4. Read the reviews where they exist. Approved customer reviews on a profile are the closest thing to asking a neighbour.
5. Call before you visit. One call confirms the timings, the price and the location — and tells you how responsive the business is before you spend anything.

Where it applies, registration adds confidence: an FBR NTN for tax-registered firms, Securities and Exchange Commission of Pakistan incorporation for registered companies, or membership of a chamber of commerce.

### List Your ${city} Business on PakListings

If you run a business in ${city}, a listing costs a one-time fee from PKR 99 — browsing the directory and contacting businesses is free, but listing is a paid, one-time step. Create an account and complete the Add Business form with contact details, category, location, opening hours, services and products. Our team reviews every submission, and approved listings appear at the next weekly release — on this city page, on your category page and in search — with your call and WhatsApp buttons live for customers.

### Frequently Asked Questions About Businesses in ${city}

### Do I need an account to call a business in ${city}?

No. Phone numbers and WhatsApp buttons on approved profiles are public. Open the profile and contact the business directly — no sign-up and no fee for customers.

### What does it cost to list a business in ${city}?

Listing costs a one-time fee from PKR 99. There is no subscription and no commission on enquiries — customers contact you directly.

### How soon does an approved listing appear?

Approved listings go live at the next weekly release, not instantly. Once released, the profile appears on this city page, on its category page and in search.

### What if a phone number or address on a listing is wrong?

Tell us through the contact page and our team will check it. Listings are owner-submitted, so the business itself supplies the details — but accuracy is the whole point of the directory, and corrections are applied once verified.

### Does PakListings charge for enquiries or bookings?

No. Searching, calling and messaging are free for customers, and PakListings never takes a commission on an enquiry.`
}

export function generateCategoryContent(categorySlug: string): string {
  const info = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses supplying everyday services people rely on',
    examples: ['independent service providers', 'local firms', 'shops', 'specialist agencies'],
  }

  const family = FAMILY_CONTENT[familyFor(categorySlug)]

  return `## ${info.label} in Pakistan: What to Check Before You Call

${info.label} in Pakistan covers ${info.description} — from ${info.examples.slice(0, 3).join(', ')} to ${info.examples.slice(3, 5).join(' and ')}. This page gathers them by city, with each profile showing the facts you need to judge it: phone and WhatsApp, address, hours, and the business's own website or social pages where it has them.

### How This Trade Works in Pakistan

${family.angle}

### The Questions That Separate Good Providers

Before you commit, ask every shortlisted provider the same questions — the comparison is only fair if everyone answers the same thing:

${family.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

The provider that answers all four calmly, in writing, is usually the safe pair of hands. The comparison takes one afternoon of messages, not a week of visits.

### Reading a Quote

${family.priceNote}

### When to Walk Away

Step back from any ${info.label.toLowerCase()} provider that:

${family.redFlags.map(f => `- ${f.charAt(0).toUpperCase() + f.slice(1)}.`).join('\n')}

Honest businesses expect these questions and answer them without fuss.

### List Your ${info.label} Business on PakListings

Run a ${info.label.toLowerCase()} business anywhere in Pakistan? Listing costs a one-time fee from PKR 99 — there is no subscription and no commission on enquiries. Create an account and complete the Add Business form — contact, category, location, hours, services and products. After our team reviews and approves it, the listing appears at the next weekly release in this category, on your city page and in search.

### Frequently Asked Questions About ${info.label} in Pakistan

### Can a home-based business list in this category?

Yes, if it genuinely serves customers. Choose the closest matching category, give the city and area you serve, and use your working phone or WhatsApp number — freelancers, tutors, home bakers and repair technicians list exactly this way.

### How does PakListings check listings before they appear?

Every submission is reviewed by our team before publication. We check that the business name, phone number and category look genuine and consistent. Details come from the business itself, so confirm anything critical when you make contact — and report errors through the contact page so we can check them.

### What does it cost to list, and when does it appear?

Listing costs a one-time fee from PKR 99. Approved listings appear at the next weekly release, not instantly. Searching, calling and messaging are free for customers.

### What if a listing in this category is out of date?

Report it through the contact page. Our team verifies corrections — a changed number, a move, a closure — and updates the profile, because a directory is only useful while its details are current.

### ${info.label} Across Pakistan's Cities

Providers cluster most densely in Karachi, Lahore and Islamabad, but strong options exist well beyond the big three — Faisalabad, Multan, Peshawar, Quetta and Sialkot among them. Choose a city below to open its dedicated ${info.label.toLowerCase()} page, with a local guide and the approved businesses listed there.`
}

export function generateCityCategoryContent(city: string, categorySlug: string): string {
  const cityInfo = CITY_INFO[city] || {
    province: 'Pakistan',
    description: "one of Pakistan's well-known urban centres",
    industries: ['retail', 'food', 'services'],
  }
  const catInfo = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses serving the local community',
    examples: ['local providers', 'firms', 'shops'],
  }

  const family = FAMILY_CONTENT[familyFor(categorySlug)]
  const districtsText = cityInfo.districts
    ? `Start with the commercial areas — ${cityInfo.districts.slice(0, 4).join(', ')} — where providers cluster.`
    : `Check the area on each profile before you call; a provider nearby usually means a faster visit and a lower travel charge.`

  return `## ${catInfo.label} in ${city}: Who to Call First

Looking for ${catInfo.label.toLowerCase()} in ${city}? Approved providers in ${city} — phone numbers, addresses and opening hours on every profile.

### How ${catInfo.label} Works in ${city}

${city} is ${cityInfo.description}. That gives the local ${catInfo.label.toLowerCase()} trade real depth: enough providers to compare, and enough competition to keep pricing honest. ${districtsText}

### Three Questions for the First Call

Before you commit to a ${catInfo.label.toLowerCase()} business in ${city}, ask the same three questions of every shortlist:

${family.questions.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join('\n')}

The provider that answers all three calmly, in writing, is usually the safe pair of hands.

### What a Fair Quote Looks Like Here

${family.priceNote}

### If Something Goes Wrong

Keep the bill or receipt, and keep the written quote on WhatsApp — together they are your record if the work, the food or the item is not what was promised. Pay larger jobs in stages against finished work rather than everything up front. And if a profile's details are wrong — a dead number, a moved shop — report it through the contact page so the directory stays accurate for the next person.

### Frequently Asked Questions About ${catInfo.label} in ${city}

### How do I contact a ${catInfo.label.toLowerCase()} business in ${city}?

Open its profile from the listings on this page and use the call or WhatsApp button. You speak to the business directly, and PakListings never charges you or takes a commission on the enquiry.

### How much does ${catInfo.label.toLowerCase()} cost in ${city}?

It depends on the exact service, scale and materials — see "What a Fair Quote Looks Like Here" above for how to compare written quotes rather than guessing.

### Are the businesses on this page checked before listing?

Yes. Owners submit their own listings and our team reviews each one before it appears, checking the business name, a working phone number and the correct category and city. Details come from the business itself, so confirm anything critical when you make contact.

### I run a ${catInfo.label.toLowerCase()} business in ${city}. How do I get listed here?

Create an account and complete the Add Business form. Listing costs a one-time fee from PKR 99; once approved, it appears at the next weekly release on this page, on the ${city} page and in search — with your call and WhatsApp buttons live.

### Own a ${catInfo.label} Business in ${city}? List It Here

Run a ${catInfo.label.toLowerCase()} business in ${city}? A PakListings listing costs a one-time fee from PKR 99, with no subscription and no commission on enquiries. Create an account, complete the Add Business form, and once approved your profile appears at the next weekly release.`
}
