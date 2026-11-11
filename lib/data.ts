export const CITIES = Array.from(new Set([
  // Major Metropolitan Cities (Top Priority)
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta',
  'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Hyderabad', 'Abbottabad',
  
  // Punjab
  'Sargodha', 'Bahawalpur', 'Sahiwal', 'Gujrat', 'Sheikhupura', 'Jhang', 
  'Bahawalnagar', 'Sadiqabad', 'Kasur', 'Okara', 'Rahim Yar Khan', 'Mianwali', 
  'Vehari', 'Khanewal', 'Mandi Bahauddin', 'Toba Tek Singh', 'Jhelum', 'Bhalwal',
  'Daska', 'Burewala', 'Hafizabad', 'Chiniot', 'Kamoke', 'Pattoki',
  'Jaranwala', 'Kamalia', 'Renala Khurd', 'Samundri', 'Wazirabad',
  'Murree', 'Mian Channu', 'Bhakkar', 'Lalamusa', 'Shakargarh', 'Layyah',
  'Dinga', 'Pakpattan', 'Arifwala', 'Baddomalhi', 'Gojra', 'Ahmedpur East', 
  'Chichawatni', 'Chishtian', 'Mailsi', 'Haroonabad', 'Hasilpur', 'Bhera', 
  'Chakwal', 'Attock', 'Fateh Jang', 'Pindigheb', 'Jand', 'Wah Cantonment',
  'Taxila', 'Hazro', 'Hassan Abdal', 'Sarai Alamgir', 'Dina', 'Sohawa',
  'Kallar Syedan', 'Gujar Khan', 'Kahuta',

  // Khyber Pakhtunkhwa
  'Kohat', 'Lakki Marwat', 'Bannu', 'Karak', 'Tank', 'Hangu', 'Dera Ismail Khan',
  'Mansehra', 'Haripur', 'Havelian', 'Batkhela', 'Mardan', 'Swabi',
  'Nowshera', 'Charsadda', 'Timergara', 'Mingora', 'Saidu Sharif',
  'Kabal', 'Chitral',

  // Sindh
  'Sukkur', 'Larkana', 'Nawabshah', 'Khairpur', 'Mirpur Khas', 'Ghotki', 
  'Jacobabad', 'Shikarpur', 'Dadu', 'Moro', 'Tando Adam', 'Tando Allahyar', 
  'Tando Muhammad Khan', 'Matli', 'Kotri', 'Sehwan', 'Gambat', 'Kandhkot', 
  'Kashmor', 'Mehar', 'Shujabad', 'Warah',

  // Balochistan
  'Gwadar', 'Turbat', 'Pasni', 'Ormara', 'Jiwani', 'Khuzdar', 'Hub', 'Uthal', 
  'Belapat', 'Wadh', 'Nushki', 'Dalbandin', 'Taftan', 'Ziarat', 'Sibi', 'Harnai', 
  'Kohlu', 'Duki', 'Barkhan', 'Loralai', 'Mach', 'Bolan', 'Dera Bugti', 
  'Dera Murad Jamali', 'Sui', 'Pir Koh', 'Usta Muhammad', 'Gandakha', 
  'Jhal Magsi', 'Kachhi', 'Sohbatpur', 'Chaman', 'Zhob', 'Mastung', 'Kalat',

  // Gilgit Baltistan & Azad Kashmir
  'Gilgit', 'Skardu', 'Hunza', 'Nagar', 'Diamer', 'Astore', 'Ghanche', 'Kharmang', 
  'Shigar', 'Baltistan', 'Roundu', 'Ghizer', 'Gakuch', 'Khaplu', 'Muzaffarabad', 
  'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Hattian Bala', 'Haveli', 'Bagh', 
  'Sudhanoti', 'Poonch', 'Neelum Valley', 'Athmuqam', 'Jhelum Valley', 
  'Leepa Valley', 'Pallandri', 'Trarkhel', 'Hajira', 'Sehnsa'
]))

export const TOP_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Hyderabad', 'Abbottabad', 'Sargodha', 'Bahawalpur', 'Sahiwal',
  'Mardan', 'Sukkur', 'Larkana', 'Gwadar', 'Muzaffarabad'
]

export const CATEGORIES = [
  { id: 'restaurants', name: 'Restaurants & Food', icon: 'restaurant', color: '#7C3AED', desc: 'Cafes, dhabas, fine dining, bakeries and caterers near you' },
  { id: 'real-estate', name: 'Real Estate & Property', icon: 'real-estate', color: '#0891B2', desc: 'Agents, dealers, builders and property consultants by city' },
  { id: 'technology', name: 'Technology & IT', icon: 'technology', color: '#0891B2', desc: 'Software houses, app developers, IT support and digital teams' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: 'healthcare', color: '#ef4444', desc: 'Clinics, hospitals, labs, pharmacies and specialist doctors' },
  { id: 'education', name: 'Education & Training', icon: 'education', color: '#8b5cf6', desc: 'Schools, colleges, academies, tutors and training institutes' },
  { id: 'retail', name: 'Retail & Shopping', icon: 'retail', color: '#ec4899', desc: 'Markets, boutiques, electronics outlets and wholesale stores' },
  { id: 'construction', name: 'Construction & Building', icon: 'construction', color: '#f97316', desc: 'Contractors, architects, engineers and building suppliers' },
  { id: 'automotive', name: 'Automotive & Vehicles', icon: 'automotive', color: '#14b8a6', desc: 'Showrooms, workshops, spare parts, rentals and car wash' },
  { id: 'finance', name: 'Finance & Banking', icon: 'finance', color: '#6366f1', desc: 'Accountants, auditors, tax experts and financial advisers' },
  { id: 'travel', name: 'Travel & Tourism', icon: 'travel', color: '#0ea5e9', desc: 'Tour operators, Umrah packages, hotels and visa help' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'beauty', color: '#d946ef', desc: 'Salons, spas, gyms, barbers and skincare clinics' },
  { id: 'logistics', name: 'Logistics & Courier', icon: 'logistics', color: '#84cc16', desc: 'Couriers, cargo, warehousing and goods transport' },
  { id: 'home-services', name: 'Home Services & Repairs', icon: 'home-services', color: '#0284c7', desc: 'Plumbers, electricians, AC repair, painters and cleaners' },
  { id: 'legal', name: 'Legal & Law Consultants', icon: 'legal', color: '#4f46e5', desc: 'Lawyers, advocates, notaries and corporate legal firms' },
  { id: 'solar-energy', name: 'Solar & Renewable Energy', icon: 'solar-energy', color: '#eab308', desc: 'Solar installers, inverter dealers and net-metering help' },
  { id: 'events', name: 'Event Management & Wedding', icon: 'events', color: '#7C3AED', desc: 'Wedding planners, marquees, caterers and photographers' },
  { id: 'manufacturing', name: 'Manufacturing & Industrial', icon: 'manufacturing', color: '#64748b', desc: 'Factories, textile mills, machinery and industrial supply' },
  { id: 'agriculture', name: 'Agriculture & Farming', icon: 'agriculture', color: '#15803d', desc: 'Seeds, fertiliser, machinery, livestock and dairy services' },
  { id: 'security', name: 'Security Services & Systems', icon: 'security', color: '#334155', desc: 'Guard agencies, CCTV installers and alarm systems' },
  { id: 'printing', name: 'Printing & Packaging', icon: 'printing', color: '#9333ea', desc: 'Printing presses, packaging, signage and flex printing' },
  { id: 'furniture', name: 'Furniture & Interior Decor', icon: 'furniture', color: '#b45309', desc: 'Furniture showrooms, carpenters and interior designers' },
  { id: 'media', name: 'Media, PR & Advertising', icon: 'media', color: '#06b6d4', desc: 'Marketing agencies, PR teams, studios and billboards' },
  { id: 'sports', name: 'Sports & Fitness Gyms', icon: 'sports', color: '#dc2626', desc: 'Gyms, sports shops, coaching academies and clubs' },
  { id: 'pets', name: 'Pets & Veterinary Clinics', icon: 'pets', color: '#d97706', desc: 'Vets, pet shops, grooming and animal feed suppliers' },
]
