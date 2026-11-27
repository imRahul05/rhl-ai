/**
 * Shortlist — a separate RHL AI product (its own repo, its own licence).
 * One source for the home spotlight, /products/shortlist, /products and the llms files.
 */

export const SHORTLIST = {
  name: 'Shortlist',
  tagline: 'Know your fit before you apply.',
  summary:
    'A Chrome extension that reads a job page, scores your resume against it and tailors your resume in one click. Free, with no sign-in, no API keys and no servers: everything runs in your browser.',
  repo: 'https://github.com/imRahul05/shortliistt',
  site: 'https://shortliistt.vercel.app',
  privacy: 'https://shortliistt.vercel.app/privacy',
  download:
    'https://github.com/imRahul05/shortliistt/releases/latest/download/shortlist-extension.zip',
  license: 'PolyForm Strict 1.0.0',
  licenseUrl: 'https://github.com/imRahul05/shortliistt/blob/main/LICENSE.md',
  /** Plain-language licence summary. Shortlist is source-available, not open source. */
  licenseNote:
    'Free to use for your own job search. Source-available under the PolyForm Strict License 1.0.0: you can read the code and use the released extension, but not modify or redistribute it.',
  browsers: 'Chrome, Edge and Brave (desktop)',
} as const;

export interface ShortlistFeature {
  tag: string;
  title: string;
  body: string;
  /** Whether Chrome's on-device AI is involved. Everything marked false works on any computer. */
  ai: boolean;
}

export const SHORTLIST_FEATURES: ShortlistFeature[] = [
  {
    tag: 'Match',
    title: 'A score you can explain',
    body: 'Reads the job from the page (schema.org data, then site selectors for LinkedIn, Indeed, Greenhouse, Lever, Workday, Naukri and more), splits must-haves from nice-to-haves and checks skills, years, degree, title and keywords. Same input, same score.',
    ai: false,
  },
  {
    tag: 'Card',
    title: 'Floating score card',
    body: 'On any detected job page: match %, must-haves, missing skills and a toolbar badge, without opening anything.',
    ai: false,
  },
  {
    tag: 'Tailor',
    title: 'Resume Studio',
    body: 'Keeps your formatting (links, right-aligned dates, a LaTeX style), fits to one page and re-scores live. One-click tailoring adds skills you already have and reorders bullets for the job; every change is undoable. Export PDF, DOCX or TXT.',
    ai: false,
  },
  {
    tag: 'Apply',
    title: 'Autofill and tracker',
    body: 'Fills sign-up, sign-in and application forms and attaches your resume. Tracks applications (Applied → Interviewing → Offer) with a reminder when nobody replies in 7 days.',
    ai: false,
  },
  {
    tag: 'AI',
    title: 'Optional on-device AI',
    body: 'Job summaries, insights, cover letters, bullet rewrites and proofreading with Chrome’s built-in Gemini Nano. Nothing is sent to an AI service, and the match score never uses AI.',
    ai: true,
  },
];

export const SHORTLIST_INSTALL: string[] = [
  'Download shortlist-extension.zip from the latest release and unzip it.',
  'Open chrome://extensions and turn on Developer mode.',
  'Click Load unpacked and select the unzipped shortlist folder.',
  'Pin Shortlist and open it (Alt+J). In Profile, drop your resume (PDF, DOCX or TXT).',
];
