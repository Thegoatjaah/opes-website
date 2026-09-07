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
      campaigns.html        Campaigns — the scroll-to-align showcase
      privacy-policy.html   draft — see below
      README.txt            this file
      images/               all artwork, plus the vendored Tailwind and Font Awesome
      webfonts/             the Font Awesome icon fonts

Double-click index.html to view it. To publish, push the whole folder to the
GitHub repo — the paths are the same ones the repo already uses
(./images/saved_resource for Tailwind, ./images/all.min.css for Font Awesome).


WHAT CHANGED THIS ROUND
-----------------------

New page: campaigns.html  —  REBUILT 06/09
  · The hero, the campaigns and the closing call are now three states of ONE
    pinned screen rather than three sections. Scrolling drives all of it:

        1. The campaigns start scattered around the headline — down both
           flanks of it and across the space beneath.
        2. They descend, straighten and line up into one row.
        3. The ground turns from white to #0A0C19, the same navy as the
           Book a Call section. The header, the card edges and the copy turn
           with it.
        4. The row rises and the cards LENGTHEN, uncovering the rest of each
           email while the Book a Call button arrives underneath. That is the
           payoff: the whole length of a campaign and the button on screen at
           the same moment.

  · Every stage glides. Scroll sets the TARGET, never the position: what is
    drawn chases it a fraction of the remaining distance each frame, so
    nothing stops dead when the wheel does and nothing freezes half-faded.
    Measured after a scroll stops mid-run, the cards keep travelling and the
    ground keeps darkening for about 800ms before settling. One number
    controls it — EASE, in the script at the bottom of the file. 0.085 is set;
    lower is lazier, higher is snappier.
  · The stages overlap on purpose. The ground starts turning while the row is
    still assembling, so there is never a moment where one thing has finished
    and the next has not begun. The boundaries are P_GATHER, P_NIGHT and
    P_REVEAL at the top of the script if you want to shift a beat.
  · The scatter is RANDOM on every visit, but only within a grid of slots
    laid across the whole area — one card per slot, free position inside it.
    Free randomness clumps and overlaps as often as not, and a bad roll would
    reach a real visitor with no way for you to reproduce it; this way the
    spread is guaranteed by the grid and the surprise lives in the jitter.
    Slots the headline is standing in are filled last, so the cards step
    around it while there is room to. Rolled once per page load, not per
    frame. Sampled across reloads, the worst-covered card was 0-20%.
  · The row lines up LOW and grows UPWARD. It is anchored by its bottom edge,
    so the reveal opens out of the space above it rather than pushing down
    into the closing copy; the bottom lifts a little at the same time to make
    room, but most of the travel is the top rising. The middle line of copy
    follows the row rather than sitting at a fixed height, or it would be
    stranded half a screen from what it is naming.
  · Book a call is now visibly the larger of the two buttons (148x53 against
    116x42) rather than one of a matching pair, and the closing block sits
    higher again. On a screen under 760px tall its sentence is dropped — that
    height is worth more to the cards.
  · Nothing ever leaves the screen. A tilted card is wider than it is — a
    151x273 card at 12 degrees reaches 200px across — so the bound is the
    rotated, scaled box, and it is the card's CENTRE that gets clamped, which
    is the one point scale and rotation both work about. Checked at every
    tenth of the run across eight screen sizes from 320x568 to 2560x1440.
  · Twelve campaigns, ordered biggest name first because a narrow screen shows
    fewer:
        1  Dior              5  Crepslocker      9   Bulldog Gear
        2  Fenty Beauty      6  Reigning Champ   10  Boustan
        3  Mackage           7  Frank And Oak    11  CTRNE
        4  Sidemen Clothing  8  Lost Mary        12  Lumi
  · The row is a flex line, so it divides the width between however many cards
    are on screen and always fills it exactly — no card runs off the edge and
    no margin is left over. How many show is decided by the screen: each step
    starts where its card would be about 165px wide and grows to about 210
    before the next takes over, so a card is never far off the 200px it was.
    Three on a phone, seven at 1440, ten at 1920.
  · The crop is 1:3.4 now — the card shows the top 1:1.8 of it and uncovers
    the rest as it grows. ~95KB each, 1.1MB for the set. To swap one, replace
    the file in images/ with another 1:3.4 crop from the top of the email.
  · FIXED on the way: the sticky header holds a band of flow at the top of the
    document, so before the first scroll the pinned screen sat 97px lower than
    it does once stuck and the bottom of the composition was cut off in the
    very first frame anyone saw. The section is now pulled up under the header.
  · Reduced motion gets the three states stacked as ordinary sections — no
    pin, no scatter, cards already at full length, button working.

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

Reviews (mobile + the gap)
  · The gap you saw was a marquee that was too short. A row is two copies of
    the same set travelling -50%, so one copy has to be at least as wide as the
    screen — with four reviews a copy was 1,608px, and on your 2,000px monitor
    391px of empty ground swung through once a cycle. Every row now carries all
    eight reviews per copy (3,216px), and a script adds more copies if the
    screen is wider still. Checked clean from 390px to 3,440px.
  · Speed is set from the measured track rather than a fixed duration, so the
    rows travel at 22px/s on every screen instead of getting faster as the
    track grows.
  · FIREFOX FIX (05/09). The script that does that measuring never checked its
    own reading. A zero measurement produced animationDuration "0.0s", which
    stops a CSS animation dead, and the same zero made the widening loop clone
    the row six times over — a frozen, overloaded single row, which is exactly
    what Firefox showed. It now refuses to act on a measurement it cannot
    trust, caps cloning at two passes, clamps the duration to 30-600s, and
    measures after load and after fonts settle rather than at parse time.
    The markup already carries sixteen reviews per copy, so when the script
    stands down the CSS alone still runs the marquee correctly on any screen
    up to ~3,200px. Verified by forcing scrollWidth to 0: the rows still move.
  · Press and hold anywhere on the reviews to stop them; let go and they carry
    on. Works with a finger as well as a mouse. Hover-to-pause is gone — it did
    nothing on a phone, and on desktop it made the press feel like it had no
    effect because the mouse had already paused things on the way in. If the
    browser takes a gesture over to scroll the page, the rows resume rather
    than staying stuck.
  · On a phone the quotes wrapped to eleven lines, making each row 311px tall
    and pushing the second row off the bottom of the screen — which is why you
    only ever saw one. Smaller type and tighter leading bring a card to 224px,
    so both rows and the heading now fit in one screen.
  · iPhone Safari treats 100vh as the height with the address bar HIDDEN, so
    a section sized to it is taller than what you can actually see and its
    centred content sits under the browser chrome. Sections now use 100svh
    where supported (the height with the bar visible), and mobile section
    padding is 36px rather than 64px. The reviews section is 705px, which fits
    an iPhone 15 screen with the bar showing.
  · How We Build Growth cards are smaller on a phone too: tighter padding,
    smaller title and bullets, and the artwork down from 205x292 to 150x210.
    Note the two stacked images in the Email Marketing card are absolutely
    positioned, so their container needs a real height — collapsing it drops
    both images out of the card and on top of the heading.

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

1. images/n8n-project.png on the Work page. Still missing, so the N8N case
   study shows a dark placeholder. The same logo would work there if you want
   it — say the word.

2. privacy-policy.html is a DRAFT. Every highlighted field needs your real
   details — registered name, company number, address, contact email, your
   Supabase region, and the cookies section. It needs a read-through by someone
   qualified before it goes live. I am not a lawyer.

3. Supabase row-level security. The newsletter form's publishable key is in the
   page source, which is only safe if RLS is on for newsletter_subscribers with
   an insert-only policy. Worth confirming in the Supabase dashboard.

4. Four lines on process.html were left OUT because the transcription of your
   handwriting broke down and I would only have been guessing:
     - Retention, Month 2: the phrase after "full retention infrastructure
       begins" (transcribed as "System is chasing/cleansing perks")
     - Retention, Month 3: the word before "LTV and repeat rate tracking"
       (transcribed as "Quarter [?]")
     - Retention, Months 4+: the closing phrase (transcribed as "build out lab")
     - HubSpot, Month 2: what is delivered on the custom channel
   Send me the two photos (IMG_4433 and IMG_4434) and I will read them
   directly and put these back.

5. The loading screen code from Jahiem, if his version is the one you want.
   The loader in these files is the one that was already in your source — it
   works now that the frozen state is out of the way.
