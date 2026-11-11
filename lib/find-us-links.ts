// Central source of truth for the /find-us page ("Find Us Online").
//
// HOW TO ADD / EDIT / REMOVE A PROFILE:
//   Edit ONLY this file. Add an entry to the right category's `links`
//   array (or remove / edit an existing one) and the page updates
//   automatically — no other file hardcodes profile URLs.
//
// HARD RULE — real, verified URLs only:
//   Every URL below comes from the PakListings backlinks workbook
//   (~/workspace/your_files/paklistings-backlinks/PakListings Backlinks.xlsx,
//   sheet "Live Backlinks", Status = Live, checked 2026-11-11).
//   Only the 55 Live rows are listed. Pending platforms
//   (Startup Network Pakistan, LaunchFree, MicroSaaS, VentureRadar,
//   PeerPush, Gust, IndieNeed, …) are NOT listed here — add one only
//   after its workbook row flips to Live. Never invent, guess, or
//   placeholder a URL, and never list the founder's personal LinkedIn
//   (linkedin.com/in/muhammad-imran-972364373) as a company profile.
//
//   One caveat, carried over from the workbook: FreeStartupListing.org
//   has no per-listing URL — its verified URL is the directory page
//   anchor where the PakListings card appears.

import type { LucideIcon } from 'lucide-react'
import {
  AtSign,
  BookOpen,
  Building2,
  Code2,
  Link2,
  MapPin,
  MousePointerClick,
  Network,
  Rocket,
  Ship,
  Tent,
  LayoutTemplate,
} from 'lucide-react'

export type FindUsLink = {
  /** Display name of the platform. */
  name: string
  /** Real, verified profile URL — never a placeholder. */
  url: string
  /** Short, factual description of the PakListings profile there. */
  description: string
  /** Lucide icon shown on the card. */
  icon: LucideIcon
}

export type FindUsCategory = {
  id: string
  title: string
  description: string
  links: FindUsLink[]
}

export const FIND_US_CATEGORIES: FindUsCategory[] = [
  {
    id: 'social-media-profiles',
    title: 'Social Media Profiles',
    description:
      'Our link-in-bio pages — every official PakListings link in one place, each linking back to paklistings.com.',
    links: [
      {
        name: 'lit.bio',
        url: 'https://lit.bio/paklistings',
        description:
          'Our published lit.bio page — all of our official links in one place, verified as published and indexed.',
        icon: Link2,
      },
      {
        name: 'Campsite.bio',
        url: 'https://campsite.bio/paklistings',
        description:
          'Our published Campsite.bio page — all of our official links in one place.',
        icon: Tent,
      },
      {
        name: 'Bio Sites',
        url: 'https://bio.site/paklistings',
        description:
          'Our public Squarespace Bio Site — all of our official links in one place.',
        icon: LayoutTemplate,
      },
      {
        name: 'Bravely',
        url: 'https://bravely.link/paklistings',
        description:
          'Our published Bravely link-in-bio page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'AllMyLinks',
        url: 'https://allmylinks.com/paklistings',
        description:
          'Our published AllMyLinks page — all of our official links in one place, with our office address and phone.',
        icon: AtSign,
      },
      {
        name: 'Direct.me',
        url: 'https://direct.me/paklistings',
        description:
          'Our published Direct.me link-in-bio page — all of our official links in one place.',
        icon: AtSign,
      },
      {
        name: 'Taplink',
        url: 'https://taplink.cc/paklistings',
        description:
          'Our Taplink page — all of our official links in one place.',
        icon: MousePointerClick,
      },
      {
        name: 'Zaap',
        url: 'https://zaap.bio/paklistings',
        description:
          'Our published Zaap link-in-bio page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'Paage',
        url: 'https://paa.ge/paklistings',
        description:
          'Our published Paage link-in-bio page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'Liink',
        url: 'https://liink.is/paklistings',
        description:
          'Our published Liink page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'solo.to',
        url: 'https://solo.to/paklistings',
        description:
          'Our published solo.to page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'hoo.be',
        url: 'https://hoo.be/paklistings',
        description:
          'Our published hoo.be page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'atom.bio',
        url: 'https://atom.bio/paklistings',
        description:
          'Our published atom.bio page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'MeStack',
        url: 'https://mestack.co/paklistings',
        description:
          'Our published MeStack page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'Flipboard',
        url: 'https://flipboard.com/@imrandigitals/pakistan-business-directory-7liijs6oy',
        description:
          'Our Flipboard magazine, with stories linking to live pages on paklistings.com.',
        icon: BookOpen,
      },
      {
        name: 'SOCIA TAP',
        url: 'https://sociatap.com/paklistings/',
        description:
          'Our published SOCIA TAP page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'soc.bio',
        url: 'https://soc.bio/paklistings/',
        description:
          'Our published soc.bio page — all of our official links in one place.',
        icon: Link2,
      },
      {
        name: 'in.bio',
        url: 'https://in.bio/paklistings',
        description:
          'Our published in.bio page — all of our official links in one place.',
        icon: Link2,
      },
    ],
  },
  {
    id: 'business-directories',
    title: 'Business Directories',
    description:
      'PakListings listed in established business directories, with our Islamabad office address and helpline.',
    links: [
      {
        name: 'Hotfrog',
        url: 'https://www.hotfrog.com/company/AaG7NwAIcWuM1go5biE9RQ/paklistings/islamabad/internet',
        description:
          'Our verified Hotfrog business listing in Islamabad, with our address, helpline and website link.',
        icon: Building2,
      },
      {
        name: 'Brownbook',
        url: 'https://www.brownbook.net/business/56093055/paklistings',
        description:
          'Our Brownbook business listing, showing our Islamabad office address and contact details.',
        icon: BookOpen,
      },
      {
        name: 'PakistanYP',
        url: 'https://pakistanyp.com/business/paklistings',
        description:
          'Our free PakistanYP listing under IT & Digital in Islamabad, with our address, phone and website link.',
        icon: MapPin,
      },
      {
        name: 'AddonBiz',
        url: 'https://www.addonbiz.com/listing/islamabad-pakistan-paklistings/',
        description:
          'Our free AddonBiz listing for Islamabad, Pakistan, with our full contact details and business counts.',
        icon: Building2,
      },
    ],
  },
  {
    id: 'business-listings-citations',
    title: 'Business Listings & Citations',
    description:
      'Startup and business-listing directories where PakListings appears as a listed company.',
    links: [
      {
        name: 'FreeStartupListing.org',
        url: 'https://freestartuplisting.org/#directory',
        description:
          'PakListings is listed in the Free Startup Listing directory — find our card on the directory page.',
        icon: Rocket,
      },
    ],
  },
  {
    id: 'other-online-platforms',
    title: 'Other Online Platforms',
    description:
      'Startup platforms and developer communities where PakListings has an official profile.',
    links: [
      {
        name: 'Tiny Startups',
        url: 'https://www.tinystartups.com/startup/paklistings',
        description:
          'Our Tiny Startups profile — PakListings listed as a Pakistan business directory for new startups to discover.',
        icon: Rocket,
      },
      {
        name: 'The Org',
        url: 'https://theorg.com/org/paklistings',
        description:
          'Our organisation profile on The Org, with our description, industry and Islamabad headquarters.',
        icon: Network,
      },
      {
        name: 'ShipDesk.dev',
        url: 'https://shipdesk.dev/p/paklistings',
        description:
          'Our approved ShipDesk launch page — PakListings presented to the ShipDesk community.',
        icon: Ship,
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to/paklistings',
        description:
          'Our organisation page on Dev.to, the developer community.',
        icon: Code2,
      },
      {
        name: 'TryLaunch.ai',
        url: 'https://trylaunch.ai/launch/paklistings',
        description:
          'Our TryLaunch.ai launch page — free Founder Launch scheduled Nov 12, 2026 — with a website link to paklistings.com.',
        icon: Rocket,
      },
      {
        name: 'Wix',
        url: 'https://support742559.wixsite.com/my-site-1',
        description:
          'Our free one-page Wix website, linking to paklistings.com.',
        icon: LayoutTemplate,
      },
      {
        name: 'WooRank',
        url: 'https://www.woorank.com/en/teaser-review/paklistings.com',
        description:
          'WooRank’s free review page for paklistings.com, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Netcraft',
        url: 'https://sitereport.netcraft.com/?url=https%3A%2F%2Fwww.paklistings.com',
        description:
          'Netcraft’s free site report for paklistings.com, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'StatShow',
        url: 'https://www.statshow.com/www/paklistings.com/',
        description:
          'StatShow’s free worth-rating page for paklistings.com, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Be1.ru',
        url: 'https://be1.ru/stat/paklistings.com',
        description:
          'Be1.ru’s free stats page for paklistings.com, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'URLRate',
        url: 'https://www.urlrate.com/www/paklistings.com',
        description:
          'URLRate’s free worth-rating page for paklistings.com, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'whomi.bio',
        url: 'https://whomi.bio/paklistings',
        description:
          'PakListings’ free whomi.bio link-in-bio page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Bitbucket',
        url: 'https://bitbucket.org/paklistings/paklistings/',
        description:
          'PakListings’ public Bitbucket repository, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Link.me',
        url: 'https://link.me/paklistings',
        description:
          'PakListings’ free Link.me link-in-bio page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co/paklistings',
        description:
          'PakListings’ free Hugging Face profile, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Linkie',
        url: 'https://linkie.bio/paklistings',
        description:
          'PakListings’ free Linkie link-in-bio page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Linkme.bio',
        url: 'https://linkme.bio/paklistings',
        description:
          'PakListings’ free Linkme.bio link-in-bio page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Enterprise League',
        url: 'https://enterpriseleague.com/company/paklistings',
        description:
          'PakListings’ free Enterprise League business listing, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Pexels',
        url: 'https://www.pexels.com/@paklistings-2165605772/',
        description:
          'PakListings’ free Pexels profile, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Linklay',
        url: 'https://linklay.io/paklistings',
        description:
          'PakListings’ free Linklay link-in-bio page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Readymag',
        url: 'https://readymag.website/u586288916/paklistings/',
        description:
          'PakListings’ free Readymag one-page website, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Framekit',
        url: 'https://paklistings.framekit.ai/',
        description:
          'PakListings’ free Framekit one-page website, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Mozello',
        url: 'https://paklistings.mozellosite.com/',
        description:
          'PakListings’ free Mozello one-page website, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Softr',
        url: 'https://paklistings.softr.app/',
        description:
          'PakListings’ free Softr public page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'ora.ai',
        url: 'https://ora.ai/score/paklistings.com',
        description:
          'PakListings’ free ora.ai agent-readiness score page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'PKEnrollBusiness',
        url: 'https://pk.enrollbusiness.com/BusinessProfile/8041422/PakListings',
        description:
          'PakListings’ free PKEnrollBusiness directory listing, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'daily.dev',
        url: 'https://daily.dev/paklistings',
        description:
          'PakListings’ free daily.dev profile, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Storeboard',
        url: 'https://www.storeboard.com/paklistings',
        description:
          'PakListings’ free Storeboard business profile, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Kit',
        url: 'https://paklistings.kit.com/b76867551f',
        description:
          'PakListings’ free Kit landing page, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Mixo',
        url: 'https://paklis-ab98q6.mixo.io',
        description:
          'PakListings’ free Mixo site, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'SuperFree',
        url: 'https://paklistings_paklistings.superfree.site',
        description:
          'PakListings’ free SuperFree site, linking to paklistings.com.',
        icon: Link2,
      },
      {
        name: 'Alive Directory',
        url: 'https://www.alive-directory.com/PakListings_744407.html',
        description:
          'PakListings’ free Alive Directory listing, linking to paklistings.com.',
        icon: Link2,
      },
    ],
  },
]

/** Total number of official profiles listed on /find-us. */
export const FIND_US_LINK_COUNT: number = FIND_US_CATEGORIES.reduce(
  (total, category) => total + category.links.length,
  0
)
