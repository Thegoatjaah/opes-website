OPES WEBSITE
============

Everything needed is in this folder. Keep it together — index.html, work.html,
pricing.html and privacy-policy.html all read from the images/ and webfonts/
folders that sit beside them. Opening one of the HTML files on its own, away
from those folders, is what makes the site look unstyled.

    OPES WEBSITE/
      index.html            the homepage
      work.html             Our Work
      pricing.html          Pricing
      process.html          Process — the onboarding timelines
      privacy-policy.html   draft — see below
      README.txt            this file
      images/               all artwork, plus the vendored Tailwind and Font Awesome
      webfonts/             the Font Awesome icon fonts

Double-click index.html to view it. To publish, push the whole folder to the
GitHub repo — the paths are the same ones the repo already uses
(./images/saved_resource for Tailwind, ./images/all.min.css for Font Awesome).


WHAT CHANGED THIS ROUND
-----------------------

Booking
  · Every Book a Call on every page opens your Google Calendar "Discovery Call"
    booking page in a new tab — header, mobile menu, hero, the mid-page CTA and
    the closing section, on all four pages. One route, no exceptions.
  · The embedded calendar that was in the homepage's Book a Call section has
    been removed in favour of a button, so the site behaves the same way
    everywhere. Your booking-form questions are asked on Google's page as
    normal.
  · The link used is the share link (calendar.app.google/MZ5z...), not the
    /u/0/ form of the URL. /u/0/ means "the first Google account signed in on
    this computer" — fine when you open it, unreliable for a visitor signed
    into several Google accounts. The share link resolves correctly for
    everyone.
  · Search the HTML for calendar.app.google to change it; it is the same string
    in every place.
  · Worth knowing: a free personal Google account allows one booking page and
    has no email verification on bookings, so spam bookings are possible. Paid
    Workspace or Google One adds verification, payments and multiple schedules.

New page: process.html
  · "Process" in the navbar on every page. Built from your two handwritten
    timelines, as reassurance for someone deciding whether to book a call.
  · Two tracks behind a switcher — Retention & Lifecycle, and HubSpot & CRM —
    because almost nobody arriving is both, and fourteen stages at once buries
    the seven they came for.
  · Anything your notes did not say, this page does not claim. Where the
    handwriting could not be read, the line was left out rather than guessed —
    see the list at the bottom of this file.
  · Seven nav items no longer fit beside the logo under 1200px, so the full bar
    now appears at 1280px and the hamburger covers everything below it. The
    Pricing page's nav was also brought in line — it shipped with wider spacing
    and 16px type, which is why it was the first to break.

Homepage
  · The page now turns over as you scroll past Systems That Drive Growth: the
    ground fades from white to near-black just as the reviews arrive, and fades
    back on the way up. Reviews, FAQs, Book a Call and the sticky header all
    invert with it. Systems That Drive Growth itself stays white — the turn
    happens below it.
  · The Systems That Drive Growth heading is back on the same left edge as
    every other section title. The rule that pushed the images out to the full
    width was catching the heading container too.
  · The free-resource heading moved 8px to match, so all four section titles
    now start on one line.
  · Clicking the Opes logo, header or footer, returns to the homepage.

Work and Pricing
  · Both files you sent were browser "Save page as" captures taken through an
    ad blocker. Each carried about 230KB of injected ad-blocking CSS and a
    couple of browser-extension script tags. Stripped: work.html went from
    289KB to 40KB, pricing.html from 265KB to 31KB. Nothing of yours was lost.
  · The loading screen on both pages had been saved in its already-dismissed
    state — display:none was baked into the source, so it could never appear
    again. Un-frozen.
  · Both now use DM Sans and Newsreader, no bold headings, the smaller pill
    buttons, the ink colour and the blue footer — the same as the homepage.
  · Every link was absolute to opesconsulting.london, so opening the folder
    locally sent you back out to the live site. They now point at each other.
  · Free Resource added to both navbars.
  · The three case-study images were 5MB, 11MB and 26MB — 42MB loading at once
    on the Work page. Resampled to 1800px JPEGs: 0.8MB for the set, with no
    visible difference at any screen size. The originals are untouched in your
    Downloads folder.
  · The N8N panel's placeholder was a plain white rectangle on a near-black
    panel, which read as a broken image. It is now a dark plate, and its
    "View project" button opens that instead of a file that does not exist.


STILL NEEDS YOU
---------------

1. Aspekta .woff2 files (4). Aspekta is still named as the fallback typeface
   but the files are not in the repo. Drop them in images/ if you want it back.

2. images/service-n8n.png and images/n8n-project.png. Neither has ever existed.
   Both places currently show a neutral placeholder.

3. privacy-policy.html is a DRAFT. Every highlighted field needs your real
   details — registered name, company number, address, contact email, your
   Supabase region, and the cookies section. It needs a read-through by someone
   qualified before it goes live. I am not a lawyer.

4. Supabase row-level security. The newsletter form's publishable key is in the
   page source, which is only safe if RLS is on for newsletter_subscribers with
   an insert-only policy. Worth confirming in the Supabase dashboard.

5. Four lines on process.html were left OUT because the transcription of your
   handwriting broke down and I would only have been guessing:
     - Retention, Month 2: the phrase after "full retention infrastructure
       begins" (transcribed as "System is chasing/cleansing perks")
     - Retention, Month 3: the word before "LTV and repeat rate tracking"
       (transcribed as "Quarter [?]")
     - Retention, Months 4+: the closing phrase (transcribed as "build out lab")
     - HubSpot, Month 2: what is delivered on the custom channel
   Send me the two photos (IMG_4433 and IMG_4434) and I will read them
   directly and put these back.

6. The loading screen code from Jahiem, if his version is the one you want.
   The loader in these files is the one that was already in your source — it
   works now that the frozen state is out of the way.
