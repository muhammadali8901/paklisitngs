export type DirectorySeoLink = {
  label: string
  href: string
}

export type DirectorySeoCopy = {
  intro: string
  guidance: string
  links: DirectorySeoLink[]
}

const CATEGORY_COPY: Record<string, DirectorySeoCopy> = {
  technology: {
    intro: 'Software houses, IT firms, web developers and product teams across Pakistan — compare them by city, service and proof of work.',
    guidance: 'Judge a profile on five things: services offered, city of operation, public website, portfolio or case-study proof, and reachable contact details. Treat every profile as a starting point — confirm the facts with the business itself before you commit to anything.',
    links: [
      { label: 'Compare Pakistan’s software houses', href: '/blog/best-software-houses-pakistan-2026/' },
      { label: 'View technology company listings', href: '/companies/' },
    ],
  },
  healthcare: {
    intro: 'Clinics, pharmacies, laboratories, hospitals and independent medical professionals, searchable by city and type of care.',
    guidance: 'For healthcare, verify the essentials before you go: current address, how appointments are booked, the exact services offered, and professional or regulatory credentials checked through an authoritative source.',
    links: [
      { label: 'How to build a professional profile', href: '/blog/how-to-build-a-professional-profile-pakistan/' },
      { label: 'Explore services city by city', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  media: {
    intro: 'Digital marketing firms, advertising agencies, PR teams and media service providers from across Pakistan.',
    guidance: 'Shortlist agencies on real delivery: service list, sectors they know, published work, base city, how to reach them, and the terms of any engagement — not on promises alone.',
    links: [
      { label: 'Read our guide to local SEO', href: '/blog/local-seo-pakistan-businesses-google-ranking/' },
      { label: 'See Lahore businesses by category', href: '/blog/businesses-in-lahore-by-category/' },
    ],
  },
  manufacturing: {
    intro: 'Factories, industrial manufacturers, suppliers and textile businesses across Pakistan, grouped by city and specialism.',
    guidance: 'A useful industrial profile names the real product or service, the plant location, a contact route, the company website, and any certifications that can be checked publicly.',
    links: [
      { label: 'Find businesses by city', href: '/cities/' },
      { label: 'See every business category', href: '/categories/' },
    ],
  },
  restaurants: {
    intro: 'Restaurants, cafés, bakeries, caterers and food businesses by city, cuisine and local service.',
    guidance: 'Details that change — location, hours, menu, phone number — are worth confirming before you set out. When it matters, verify through the business’s own channels, not a third-party listing.',
    links: [
      { label: 'Browse restaurants across Pakistan', href: '/category/restaurants/' },
      { label: 'Open the Karachi restaurant guide', href: '/blog/restaurants-in-karachi/' },
    ],
  },
  finance: {
    intro: 'Accountants, tax consultants, financial advisers, banks and related finance businesses, grouped by location and specialism.',
    guidance: 'Money and tax decisions need your own diligence: current credentials, service terms and official confirmations, checked by you. A directory profile helps you discover a provider — it never replaces professional or regulatory checks.',
    links: [
      { label: 'Read the city guide to accountant jobs', href: '/blog/accountant-jobs-pakistan-city-guide/' },
      { label: 'Browse company listings', href: '/companies/' },
    ],
  },
  'home-services': {
    intro: 'Plumbers, electricians, appliance and AC repair technicians, painters and other tradespeople serving your city.',
    guidance: 'Before you hire, compare coverage area, availability, contact details, response times and how quotes are worked out. Keep sensitive personal information back until you have verified the provider yourself.',
    links: [
      { label: 'Read the guide to local services', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'Browse cities across Pakistan', href: '/cities/' },
    ],
  },
}

const CITY_COPY: Record<string, DirectorySeoCopy> = {
  karachi: {
    intro: 'Businesses, companies and local services across Karachi, grouped by category for quick comparison.',
    guidance: 'Karachi searches usually pair a trade with the city. Use the category and business links below to narrow the field, then confirm address, hours and contact details directly with the provider.',
    links: [
      { label: 'Guide to restaurants in Karachi', href: '/blog/restaurants-in-karachi/' },
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Healthcare businesses', href: '/category/healthcare/' },
    ],
  },
  lahore: {
    intro: 'Businesses, local services and companies in Lahore, grouped by category and neighbourhood.',
    guidance: 'Lahore searches run by neighbourhood, service and category. Use listing details as a starting point, and check current operating information before you visit or hire.',
    links: [
      { label: 'Guide to Lahore businesses by category', href: '/blog/businesses-in-lahore-by-category/' },
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Media and marketing businesses', href: '/category/media/' },
    ],
  },
  islamabad: {
    intro: 'Businesses, local services and companies in Islamabad, grouped by category.',
    guidance: 'Combine the city with a category to compare Islamabad providers properly, then confirm the exact office location or service area, current contact details and — for regulated trades — credentials from an authoritative source.',
    links: [
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Company listings', href: '/companies/' },
    ],
  },
  rawalpindi: {
    intro: 'Companies and local services in Rawalpindi, grouped by category.',
    guidance: 'Start from the service you need, then look closely at each listing’s location, contact route and operating details before deciding.',
    links: [
      { label: 'Local services guide', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'All business categories', href: '/categories/' },
    ],
  },
  faisalabad: {
    intro: 'Businesses, local services and companies in Faisalabad, grouped by category.',
    guidance: 'Pair this city page with the industry categories that fit to surface local providers — and check that contact details and service scope are current before engaging one.',
    links: [
      { label: 'Manufacturing businesses', href: '/category/manufacturing/' },
      { label: 'Technology businesses', href: '/category/technology/' },
    ],
  },
  multan: {
    intro: 'Local businesses, services and companies in Multan, grouped by category.',
    guidance: 'Narrow a Multan search by category, service or profession, then confirm the provider’s details are current before calling or visiting.',
    links: [
      { label: 'All business categories', href: '/categories/' },
      { label: 'Local services by city guide', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  sialkot: {
    intro: 'Businesses, industrial firms and local services in Sialkot, grouped by category.',
    guidance: 'Together, the city and category pages give a practical first pass over Sialkot’s industrial, commercial and professional providers. Confirm products, services and contact details with the business directly before going further.',
    links: [
      { label: 'Manufacturing businesses', href: '/category/manufacturing/' },
      { label: 'All business categories', href: '/categories/' },
    ],
  },
}

export function getCategorySeoCopy(categoryId: string): DirectorySeoCopy | null {
  return CATEGORY_COPY[categoryId] || null
}

export function getCitySeoCopy(citySlug: string): DirectorySeoCopy | null {
  return CITY_COPY[citySlug.toLowerCase()] || null
}
