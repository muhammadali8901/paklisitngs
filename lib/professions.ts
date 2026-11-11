// ============================================================
// PakListings — professional profile professions
// ------------------------------------------------------------
// The profession dropdown on the add-professional form: common
// professions plus an "Other" choice that lets the user type
// their own profession freehand. The stored value is always the
// plain profession string (the dropdown choice or the custom
// text) — nothing here is an enum enforced anywhere else, so
// older free-text values keep working. The five trades at the
// end (plumber, electrician, AC technician, tailor, beautician)
// are offered as first-class choices so people looking for
// hands-on help can find them through the professionals list
// instead of only through a freehand "Other" value, which
// creates no filter value. This list only offers choices —
// it invents no listings.
// ============================================================

export const PROFESSIONS: string[] = [
  'Doctor',
  'Dentist',
  'Physiotherapist',
  'Psychologist',
  'Nutritionist',
  'Pharmacist',
  'Veterinarian',
  'Lawyer',
  'Accountant',
  'Chartered Accountant',
  'Financial Advisor',
  'Software Developer',
  'Web Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'Graphic Designer',
  'SEO Expert',
  'Digital Marketer',
  'Social Media Manager',
  'Content Writer',
  'Video Editor',
  'Photographer',
  'Videographer',
  'Architect',
  'Interior Designer',
  'Civil Engineer',
  'Electrical Engineer',
  'Mechanical Engineer',
  'Data Analyst',
  'Data Scientist',
  'AI Engineer',
  'Cybersecurity Expert',
  'Network Engineer',
  'Teacher',
  'Tutor',
  'Professor',
  'Translator',
  'Consultant',
  'Business Consultant',
  'Project Manager',
  'HR Manager',
  'Real Estate Agent',
  'Insurance Agent',
  'Event Planner',
  'Fashion Designer',
  'Fitness Trainer',
  'Chef',
  'Makeup Artist',
  'Journalist',
  'Banker',
  'Plumber',
  'Electrician',
  'AC Technician',
  'Tailor',
  'Beautician',
]

/** Select value for the freehand profession choice. */
export const PROFESSION_OTHER = 'Other'
