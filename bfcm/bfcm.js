/* Opes Black Friday gift, 2026.
   Hides three gifts on the page. Opening one shows wrapping paper to tear and a 3D monitor with the BFCM plan.
   Needs bfcm/bfcm.css. Loads three.js from jsDelivr only when someone opens a gift.
   Switches itself off after Cyber Monday (1 Dec 2026).
   Project button (900px and wider): the monitor moves left and projects its screen as a hologram. */
(() => {
const GIFT_HTML = "<button class=\"obf-gift\" id=\"obf-gift\" type=\"button\" aria-label=\"Open the Opes Black Friday gift\" hidden>\n    <span class=\"obf-tag\">Black Friday</span>\n    <svg viewBox=\"0 0 64 64\" aria-hidden=\"true\">\n      <rect x=\"9\" y=\"27\" width=\"46\" height=\"31\" rx=\"3\" fill=\"#0A0C19\"/>\n      <rect x=\"6\" y=\"19\" width=\"52\" height=\"11\" rx=\"3\" fill=\"#141830\"/>\n      <rect x=\"28\" y=\"19\" width=\"8\" height=\"39\" fill=\"#0094FF\"/>\n            <path d=\"M32 19c-3-8-14-12-15-5-1 5 9 6 15 5z\" fill=\"#0094FF\"/>\n      <path d=\"M32 19c3-8 14-12 15-5 1 5-9 6-15 5z\" fill=\"#0094FF\"/>\n      <path d=\"M32 19c-2.6-5.4-9.6-8.4-10.6-4.6-.6 2.8 5.6 4.3 10.6 4.6z\" fill=\"#5CC6FF\" opacity=\".55\"/>\n      <circle cx=\"32\" cy=\"19\" r=\"3.4\" fill=\"#0077CC\"/>\n      <path d=\"M13 30v25\" stroke=\"#fff\" stroke-opacity=\".08\" stroke-width=\"3\"/>\n    </svg>\n  </button>";
const OVERLAY_HTML = "<div class=\"obf\" id=\"obf-bf\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Opes Black Friday\" hidden>\n  <div class=\"obf-pin\" id=\"obf-pin\">\n  <section class=\"obf-stage\" id=\"obf-stage\">\n    <canvas class=\"obf-gl\" id=\"obf-gl\" aria-label=\"A retro Opes monitor showing the Black Friday and Cyber Monday plan. Use the channel buttons below to change what it shows.\"></canvas>\n    <div class=\"obf-glow\"></div>\n    <div class=\"obf-topbar\">\n      <div class=\"obf-mark\"><svg viewBox=\"0 0 64 64\" aria-hidden=\"true\" id=\"obf-markSvg\"></svg>OPES \u00b7 BFCM 2026</div>\n      <button class=\"obf-close\" id=\"obf-bfClose\" type=\"button\" aria-label=\"Close and go back to the site\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n    </div>\n    <p class=\"obf-drag-note\">Drag the monitor to turn it \u00b7 press its buttons to change channel</p>\n    <div class=\"obf-channels\" role=\"group\" aria-label=\"Monitor channels\" id=\"obf-channels\">\n      <button type=\"button\" data-ch=\"0\" aria-pressed=\"true\"><b>1</b>Countdown</button>\n      <button type=\"button\" data-ch=\"1\" aria-pressed=\"false\"><b>2</b><span class=\"obf-long\">The campaign</span><span class=\"obf-short\">Campaign</span></button>\n      <button type=\"button\" data-ch=\"2\" aria-pressed=\"false\"><b>3</b><span class=\"obf-long\">Automations</span><span class=\"obf-short\">Flows</span></button>\n      <button type=\"button\" data-ch=\"3\" aria-pressed=\"false\"><b>4</b>November</button>\n    </div>\n\n    <div class=\"obf-paper obf-wrap-in\" id=\"obf-paper\">\n      <canvas id=\"obf-paperCanvas\"></canvas>\n    </div>\n    <svg class=\"obf-hand\" id=\"obf-hand\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"14\" r=\"12\" fill=\"#fff\" opacity=\".35\"/><path d=\"M14 8c0-2 3-2 3 0v14l1-6c.4-2 3.3-1.7 3 .3l-.5 6 1.6-4.4c.7-1.9 3.4-1 2.9.9l-1.3 5 1.8-3c1-1.7 3.4-.4 2.6 1.4L24.6 34c-1.6 4-5 6-9 6-5 0-8-3-9-8l-1.8-7c-.5-2 2.2-3 3.1-1.1L10 29V8z\" fill=\"#fff\" stroke=\"#0A0C19\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/></svg>\n    <div class=\"obf-tear-hint\" id=\"obf-tearHint\">\n      <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M3 12l4-4 3 3 7-7\" stroke=\"#5CC6FF\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M12 4h5v5\" stroke=\"#5CC6FF\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n      Drag across the paper to tear it\n      <button type=\"button\" id=\"obf-autoTear\">Open it for me</button>\n    </div>\n    <button type=\"button\" class=\"obf-scroll-cue\" id=\"obf-scrollCue\">The full plan<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M8 3v10M3.5 8.5 8 13l4.5-4.5\" stroke=\"currentColor\" stroke-width=\"1.8\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button>\n  </section>\n  </div>\n__PLAYBOOK__\n  <section class=\"obf-offer\" id=\"obf-offer\" aria-labelledby=\"obf-offerTitle\">\n    <div class=\"obf-offer-in\">\n      <h2 id=\"obf-offerTitle\"><span class=\"obf-big\" id=\"obf-offerBig\">20% off</span>your whole <em>Black Friday</em> programme.</h2>\n      <div>\n        <p>We plan, write, design and automate the lot: the VIP list, the teaser, early access, doors open, the weekend, the last call and Cyber Monday, plus the browse, cart and back in stock automations running underneath. You just watch the orders come in.</p>\n        <p id=\"obf-offerDeadline\">Book your BFCM call before Friday 6 November to lock in 20% off and give us time to warm up your list.</p>\n        <div class=\"obf-row\">\n          <a class=\"obf-pill obf-pill-navy\" href=\"https://opesconsulting.london/book.html\" target=\"_blank\" rel=\"noopener\">Book a BFCM call</a>\n          <button type=\"button\" class=\"obf-ghost-link\" id=\"obf-backToSite\">Back to the site</button>\n        </div>\n        <div class=\"obf-guarantee\">\n          <svg width=\"22\" height=\"22\" viewBox=\"0 0 20 20\" aria-hidden=\"true\" style=\"flex:none;margin-top:2px\"><circle cx=\"10\" cy=\"10\" r=\"10\" fill=\"#0A0C19\"/><path d=\"M5.5 10.2l3 3 6-6.4\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n          <div><strong>You don\u2019t pay unless we deliver on our promise.</strong>Your Performance Threshold is agreed on the call, in writing, before any work starts.</div>\n        </div>\n        <p class=\"obf-terms\">Black Friday is Friday 27 November 2026. Cyber Monday is Monday 30 November 2026.</p>\n      </div>\n    </div>\n  </section>\n  <footer class=\"obf-foot\">\n    <span>Opes Consulting \u00b7 London</span>\n    <span id=\"obf-footCount\"></span>\n  </footer>\n</div>\n";
/* ============ The full BFCM plan, shown under the monitor (from the BFCM 2026 strategy doc) ============
   Edit the wording in the lists below. Keep hyphens and dashes out of the copy. */
const PLAYBOOK_HTML = (() => {
  const li = a => a.map(x => `<li>${x}</li>`).join('');
  const CAMPAIGN = [
    { when: 'Mon 16 Nov', name: 'VIP list opens', hero: 'Black Friday is coming.', heat: 1,
      job: 'Turn subscribers into a high intent Black Friday audience before anything goes public. One job: something is coming, and VIPs get in first.',
      cta: ['Join the VIP list'],
      audience: ['Existing email subscribers', 'Subscribers who aren’t VIPs yet', 'Engaged subscribers', 'Previous customers where it fits'],
      exclude: ['People already on the VIP list', 'Anyone who has opted out', 'Recent buyers, where the offer could cause regret'],
      content: ['Early access', 'First chance to shop', 'Any VIP only extra', 'Priority before the wider launch'],
      subjects: ['Black Friday starts here...', 'Want first access to Black Friday?', 'Get on the Black Friday VIP list', 'VIP access is coming', 'Black Friday: get in early'],
      note: 'Don’t reveal everything. This email exists to spark curiosity and make the next one worth opening.' },
    { when: 'Fri 20 Nov', name: 'Black Friday teaser', hero: 'Black Friday is coming', heat: 2,
      job: 'Build anticipation without giving the promotion away. Subscribers should leave knowing which dates to remember.',
      cta: ['Get VIP access', 'Save the date'],
      audience: ['The main email list', 'VIPs, with a version that recognises their status'],
      exclude: ['Unsubscribed or otherwise ineligible contacts', 'Recent buyers where it fits'],
      content: ['VIP early access: Thursday 26 November, 6pm', 'Black Friday opens: Friday 27 November, 7am'],
      subjects: ['Something big is coming...', 'Black Friday is almost here', 'You haven’t seen the full picture yet', 'Save this date: 27 November', 'Your Black Friday heads up'],
      note: 'Keep it shorter than the launch email. Curiosity, then the date, then anticipation.' },
    { when: 'Thu 26 Nov, 6pm', name: 'VIP early access', hero: 'Black Friday VIP access is live', heat: 3,
      job: 'The first big revenue moment. VIPs shop before the public, driven by exclusivity and scarcity.',
      cta: ['Shop VIP early access'],
      audience: ['VIPs only'],
      exclude: ['Subscribers who aren’t VIPs', 'Anyone not eligible for the VIP offer'],
      content: ['The offer, revealed', 'Products included', 'Restrictions', 'End date and time', 'A code, if one is needed', 'A reminder that public access opens Friday at 7am'],
      subjects: ['VIP access is LIVE', 'You’re in: Black Friday starts now', 'Your Black Friday early access', 'VIPs shop first', 'You’re officially invited'],
      note: 'Exclude buyers the moment they convert, so they stop getting acquisition messages.' },
    { when: 'Fri 27 Nov, 7am', name: 'Doors open', hero: 'Black Friday is here', heat: 4, hot: true,
      job: 'The main public launch. Get as many eligible subscribers as possible to see the offer and walk into the store.',
      cta: ['Shop Black Friday'],
      audience: ['The wider eligible database', 'VIPs who haven’t bought yet, with adjusted messaging'],
      exclude: ['Customers who have already bought', 'Unsubscribed contacts', 'Any other excluded audiences'],
      content: ['A clear offer', 'Key products and categories', 'Benefits', 'A real deadline', 'One primary CTA'],
      subjects: ['Black Friday is LIVE', 'It’s here: Black Friday starts now', 'Black Friday starts now', 'The doors are open', 'Your Black Friday offer is live'],
      note: 'The first screen answers four questions. What’s the offer? Who is it for? What should I do? When does it end?' },
    { when: 'Sat 28 Nov', tag: 'Optional', name: 'Still deciding?', hero: 'Still deciding?', heat: 4,
      job: 'Convert people who were interested but haven’t bought, with help choosing instead of another generic announcement.',
      cta: ['Shop now'],
      audience: ['Non buyers', 'Engaged subscribers', 'People who opened or clicked earlier BFCM emails'],
      exclude: ['Buyers', 'Unsubscribed contacts', 'Any other excluded audiences'],
      content: ['Best sellers', 'Most popular products', 'Customer favourites', 'Gift guide', 'Product comparison', 'FAQs', 'Popular stock that’s still left'],
      subjects: ['Still deciding?', 'What people are buying this Black Friday', 'The products customers are choosing', 'Not sure what to buy?'],
      note: 'This is the consideration step. The launch builds awareness, Saturday helps them decide, the final call brings the urgency.' },
    { when: 'Sun 29 Nov, ends 8pm', name: 'Last chance', hero: 'Last chance', heat: 5, last: true,
      job: 'Convert the high intent subscribers who are left, with a real and credible deadline.',
      cta: ['Shop before 8pm'],
      audience: ['Openers of earlier BFCM emails', 'Clickers', 'Relevant site and product visitors', 'Cart abandoners who haven’t bought', 'Engaged subscribers'],
      exclude: ['Anyone who has bought', 'Unsubscribed contacts', 'Any other excluded contacts'],
      content: ['The exact end time', 'The offer or code', 'Product or cart context where it fits', 'One strong CTA'],
      subjects: ['Last chance: Black Friday ends tonight', 'Final hours', 'Black Friday ends tonight', '8PM: that’s the deadline', 'Don’t miss the final hours'],
      note: 'Keep it short. By now they know the brand, the offer and the products. Offer, deadline, CTA.' }
  ];
  const FLOWS = [
    { when: '1 hour after a product view', name: 'Browse abandonment', hero: 'You were looking at this...', code: 'No code', codeKind: 'none',
      job: 'Bring back a subscriber who viewed a product but didn’t add it to cart or buy.',
      cta: ['View product'],
      audience: ['Product viewers we can identify and email', 'No purchase since they browsed'],
      exclude: ['Anyone who added to cart', 'Buyers', 'Unsubscribed contacts'],
      content: ['Dynamic product image', 'Product name', 'Price', 'CTA'],
      subjects: ['You were looking at this...', 'Still thinking about it?'],
      note: 'Leave the Black Friday code out unless the commercial plan needs it. Browse stays separate from cart and code.' },
    { when: '30 minutes after the cart', name: 'Cart reminder', hero: 'Your cart is waiting.', code: 'No code', codeKind: 'none',
      job: 'Recover purchase intent straight away, without teaching customers to wait for a discount.',
      cta: ['Return to cart'],
      audience: ['Cart abandoners who haven’t bought'],
      exclude: ['Buyers', 'Customers whose cart no longer qualifies'],
      content: ['Dynamic cart contents', 'Product image', 'Product name', 'Price', 'Return to cart CTA'],
      subjects: ['Your cart is waiting.', 'You left something behind.'],
      note: 'No code yet. They’ve already shown strong intent.' },
    { when: '4 hours after the cart', name: 'Second cart nudge', hero: 'Still thinking about it?', code: 'BF code', codeKind: 'code',
      job: 'Step it up by bringing in the Black Friday incentive.',
      cta: ['Complete your order'],
      audience: ['Cart abandoners still without a purchase after the first reminder'],
      exclude: ['Buyers', 'Contacts no longer eligible for the cart'],
      content: ['Black Friday code', 'Discount', 'Eligible products', 'Expiry', 'CTA'],
      subjects: ['Still thinking about it?', 'Your Black Friday code is here', 'A little something for your cart', 'Your cart just got better', 'Come back for [offer]'],
      note: 'The progression: email one is the reminder, email two is the incentive.' },
    { when: '20 hours after the cart', name: 'Final cart call', hero: 'Final call', code: 'Code ends tonight', codeKind: 'end',
      job: 'Convert customers who have shown intent again and again but haven’t finished checking out.',
      cta: ['Use my code'],
      audience: ['Cart abandoners still without a purchase'],
      exclude: ['Buyers', 'Ineligible contacts'],
      content: ['Cart or product', 'Code', 'Exact deadline', 'CTA'],
      subjects: ['Final call: your code ends tonight', 'Your Black Friday code expires tonight', 'Last chance to use your code', 'Your cart won’t wait forever', 'Ends tonight: [offer]'],
      note: 'Strong urgency, but true. The code deadline has to be real.' },
    { when: 'The moment stock lands', name: 'Back in stock', hero: 'It’s back', code: 'BF offer if eligible', codeKind: 'stock',
      job: 'Catch the demand from customers who were waiting on a product that sold out.',
      cta: ['Shop now'],
      audience: ['Customers who showed interest in the product and can be emailed'],
      exclude: ['Customers who already bought it, where it’s no longer relevant', 'Unsubscribed contacts'],
      content: ['Dynamic product image', 'Product name', 'Price', 'Shop CTA', 'A BFCM offer note if the product qualifies and the sale is live'],
      subjects: ['It’s back', 'It’s back in stock', 'The wait is over', '[Product] is back', 'You asked. It’s back.'],
      note: 'Send as soon as stock lands. If the product is in the sale, say it’s back while the offer is live.' }
  ];
  const TABLE = [
    ['Mon 16 Nov', 'VIP list opens', 'Scheduled', 'Main database', 'Not yet', 'Join VIP'],
    ['Fri 20 Nov', 'Black Friday teaser', 'Scheduled', 'Main database', 'Not yet', 'Black Friday is coming'],
    ['Thu 26 Nov, 6pm', 'VIP early access', 'Scheduled', 'VIPs', 'Revealed', 'You’re in first'],
    ['Fri 27 Nov, 7am', 'Black Friday launch', 'Scheduled', 'Main database', 'Live', 'Black Friday is live'],
    ['Sat 28 Nov', 'Consideration', 'Scheduled', 'Non buyers', 'Live', 'What to buy, best sellers'],
    ['Sun 29 Nov, 8pm', 'Last chance', 'Scheduled', 'Non buyers', 'Ends 8pm', 'Final opportunity'],
    ['1 hour after browse', 'Browse abandonment', 'Behaviour', 'Product viewers', 'None at first', 'You were looking at this'],
    ['30 min after cart', 'Cart reminder', 'Behaviour', 'Cart abandoners', 'None', 'Your cart is waiting'],
    ['4 hours after cart', 'Second cart nudge', 'Behaviour', 'Cart abandoners', 'BF code', 'Here’s your code'],
    ['20 hours after cart', 'Final cart call', 'Behaviour', 'Cart abandoners', 'BF code', 'Code ends tonight'],
    ['Immediately', 'Back in stock', 'Stock', 'Interested customers', 'BF offer if it applies', 'It’s back']
  ];
  const SEGMENTS = [
    ['A', 'Never purchased', 'Lead with discovery: introduce the products, what the brand stands for and the BFCM offer.'],
    ['B', 'Existing customers', 'Use familiarity: favourites, restocks, upgrades and the categories they already buy.'],
    ['C', 'VIP, not bought yet', 'Acknowledge that early access is already open and push the chance to shop.'],
    ['D', 'VIP who bought', 'Take them out of acquisition emails and move them into the right post purchase messages.']
  ];
  const RULES = [
    ['Purchase', 'Buyers leave browse and cart flows straight away.'],
    ['Purchase', 'Buyers skip acquisition Black Friday emails where it fits.'],
    ['Browse to cart', 'Adding to cart ends browse abandonment and moves them into the cart journey.'],
    ['Cart to purchase', 'A purchase ends every remaining cart reminder and nudge.'],
    ['VIP', 'VIPs get their own early access experience, never the same treatment as the general list.'],
    ['Last chance', 'Non buyers come first. Buyers are suppressed.'],
    ['Back in stock', 'Only sent while the product is relevant and available. No stale stock alerts.']
  ];
  const MESSAGES = [
    ['Early campaign', 'Get access.', 'Exclusivity, list growth'],
    ['Teaser', 'Something is coming.', 'Curiosity, anticipation'],
    ['VIP early access', 'You’re in first.', 'Exclusivity, early revenue'],
    ['Public launch', 'It’s live.', 'Awareness, conversion'],
    ['Consideration', 'Here’s what to consider.', 'Decision support'],
    ['Final call', 'It’s ending.', 'Urgency, conversion'],
    ['Browse', 'You were looking at this.', 'Bringing them back'],
    ['Cart reminder', 'You left this behind.', 'Recovery'],
    ['Cart nudge', 'Here’s your code.', 'Incentive'],
    ['Final cart', 'Your code ends tonight.', 'Deadline'],
    ['Back in stock', 'It’s back.', 'Availability, immediate intent']
  ];
  const TONE = [
    ['Early campaign', 'Curiosity, exclusivity, anticipation, first access.'],
    ['Launch', 'Clarity, offer, product, immediate action.'],
    ['Mid campaign', 'Product discovery, best sellers, benefits, decision support.'],
    ['Final hours', 'Deadline, specific time, code, immediate action.'],
    ['Cart', 'Personalisation, product, rising urgency.']
  ];
  const MODULES = [
    ['Hero', 'Large image, headline and CTA.'],
    ['Offer', 'Discount or code mechanics and the key conditions.'],
    ['Product grid', '2 to 4 products with short supporting copy.'],
    ['Urgency bar', 'For example: ENDS 29 NOVEMBER, 8PM or VIP ACCESS NOW LIVE.'],
    ['Dynamic product', 'Used in the browse and cart emails.'],
    ['Social proof', 'Reviews and testimonials where they fit.'],
    ['Final CTA', 'One clear action, repeated at the bottom.']
  ];
  const CHECK = [
    ['Offer and segments', ['Confirm the final offer, eligibility rules, code mechanics and a genuine expiry time', 'Define VIP eligibility and build the VIP segment before 16 November', 'Build the VIP sign up email and the landing or confirmation journey if needed']],
    ['Campaign emails', ['Build the 20 November teaser', 'Build the 26 November VIP early access email', 'Build the 27 November launch in three versions: new prospects, existing customers and VIP non buyers', 'Decide whether the optional 28 November email goes out', 'Build the 29 November final call']],
    ['Automations', ['Browse abandonment at 1 hour', 'Cart reminder at 30 minutes, no code', 'Second cart nudge at 4 hours, with the Black Friday code', 'Final cart call at 20 hours, with a real deadline', 'Back in stock, sent immediately']],
    ['Logic and QA', ['Purchase suppression across campaigns and flows', 'Browse to cart transition logic', 'Cart to purchase exit logic', 'QA every dynamic product and cart block', 'QA every discount code and expiry rule', 'QA every date and time, especially 26 Nov 6pm, 27 Nov 7am and 29 Nov 8pm']],
    ['Reporting', ['Campaign and flow reporting set up before launch', 'Unsubscribe rate and frequency watched during the live period']]
  ];

  const more = e => `
        <details class="obf-more">
          <summary>Audience and subject lines</summary>
          <div class="obf-more-in">
            <div><h4>Who gets it</h4><ul>${li(e.audience)}</ul></div>
            <div><h4>Leave out</h4><ul class="obf-x">${li(e.exclude)}</ul></div>
            <div><h4>What goes in</h4><ul>${li(e.content)}</ul></div>
            <div><h4>Subject line ideas</h4><ul class="obf-subj">${li(e.subjects)}</ul></div>
          </div>
        </details>`;
  const card = (e, i, kind) => `
      <article class="obf-card obf-rise${e.hot ? ' obf-card-hot' : ''}${e.last ? ' obf-card-last' : ''}" style="--i:${i}">
        <div class="obf-card-top">
          <span class="obf-when">${e.when}</span>
          ${e.tag ? `<span class="obf-tag-soft">${e.tag}</span>` : ''}
          ${kind === 'flow' ? `<span class="obf-code obf-code-${e.codeKind}">${e.code}</span>` : `<span class="obf-heat" aria-label="Urgency ${e.heat} of 5">${[1, 2, 3, 4, 5].map(n => `<i${n <= e.heat ? ' class="on"' : ''}></i>`).join('')}</span>`}
        </div>
        <h3>${e.name}</h3>
        <p class="obf-hero-line">“${e.hero}”</p>
        <p class="obf-job">${e.job}</p>
        <div class="obf-ctas">${e.cta.map(c => `<span class="obf-cta">${c}</span>`).join('')}</div>
        <p class="obf-note"><b>The thinking</b>${e.note}</p>${more(e)}
      </article>`;

  return `
  <div class="obf-pb" id="obf-plan">
    <section class="obf-pb-sec obf-pb-intro" aria-labelledby="obf-pb-title">
      <p class="obf-eyebrow obf-rise">The BFCM 2026 plan</p>
      <h2 id="obf-pb-title" class="obf-rise">One connected system, <em>not</em> a pile of promo sends.</h2>
      <p class="obf-lede obf-rise">Scheduled campaign emails and automations triggered by behaviour and stock work as one. Subscribers move from anticipation to purchase, and every high intent moment gets caught along the way.</p>
      <ol class="obf-stages">
        <li class="obf-rise" style="--i:0"><b>01</b><span>Build the list and set up VIP access.</span></li>
        <li class="obf-rise" style="--i:1"><b>02</b><span>Build anticipation and share the key dates.</span></li>
        <li class="obf-rise" style="--i:2"><b>03</b><span>Open the offer: VIP early access, then the public launch.</span></li>
        <li class="obf-rise" style="--i:3"><b>04</b><span>Recover missed sales with browse, cart, deadline and back in stock automation.</span></li>
      </ol>
      <div class="obf-layers">
        <div class="obf-layer obf-rise" style="--i:0"><span class="obf-layer-n">Layer 1</span><h3>Event emails</h3><p>Create the BFCM moment.</p><p class="obf-chain">VIP → anticipation → early access → launch → consideration → deadline</p></div>
        <div class="obf-layer obf-rise" style="--i:1"><span class="obf-layer-n">Layer 2</span><h3>Behaviour emails</h3><p>Turn the intent that moment creates into orders.</p><p class="obf-chain">Browse → cart → incentive → final deadline</p></div>
        <div class="obf-layer obf-rise" style="--i:2"><span class="obf-layer-n">Layer 3</span><h3>Availability emails</h3><p>Catch the people waiting on stock.</p><p class="obf-chain">Wanted it → unavailable → available → purchase</p></div>
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-cal">
      <p class="obf-eyebrow obf-rise">The calendar</p>
      <h2 id="obf-pb-cal" class="obf-rise">Low pressure first. <em>High urgency</em> last.</h2>
      <ol class="obf-track obf-rise">
        <li><span>16 Nov</span><b>Get access.</b></li>
        <li><span>20 Nov</span><b>Something is coming.</b></li>
        <li><span>26 Nov, 6pm</span><b>You’re in first.</b></li>
        <li class="obf-track-hot"><span>27 Nov, 7am</span><b>It’s live.</b></li>
        <li><span>28 Nov</span><b>Here’s what to consider.</b></li>
        <li class="obf-track-last"><span>29 Nov, 8pm</span><b>It’s ending.</b></li>
      </ol>
      <p class="obf-under obf-rise">Running underneath the whole time: browse, cart reminder, code, final deadline, with a separate back in stock flow.</p>
      <details class="obf-more obf-more-wide obf-rise">
        <summary>See every send in one table</summary>
        <div class="obf-table-wrap">
          <table class="obf-table">
            <thead><tr><th>When</th><th>Email</th><th>Trigger</th><th>Who</th><th>Offer</th><th>Main message</th></tr></thead>
            <tbody>${TABLE.map(r => `<tr${r[2] !== 'Scheduled' ? ' class="obf-auto"' : ''}>${r.map((c, i) => `<td data-l="${['When', 'Email', 'Trigger', 'Who', 'Offer', 'Message'][i]}">${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </details>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-camp">
      <p class="obf-eyebrow obf-rise">The campaign</p>
      <h2 id="obf-pb-camp" class="obf-rise">Six scheduled emails, <em>each with one job.</em></h2>
      <div class="obf-cards">${CAMPAIGN.map((e, i) => card(e, i, 'camp')).join('')}
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-auto">
      <p class="obf-eyebrow obf-rise">The automations</p>
      <h2 id="obf-pb-auto" class="obf-rise">Automations that <em>follow intent.</em></h2>
      <p class="obf-lede obf-rise">The code is used progressively, never handed out straight away. First a reminder, then the incentive, then a deadline that’s real.</p>
      <div class="obf-codebar obf-rise" aria-hidden="true"><span class="none">Browse: no code</span><span class="none">Cart 30 min: no code</span><span class="code">Cart 4 hours: BF code</span><span class="end">Cart 20 hours: code ends tonight</span></div>
      <div class="obf-cards">${FLOWS.map((e, i) => card(e, i, 'flow')).join('')}
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-seg">
      <p class="obf-eyebrow obf-rise">Segments and suppression</p>
      <h2 id="obf-pb-seg" class="obf-rise">Nobody gets the <em>wrong</em> email.</h2>
      <p class="obf-lede obf-rise">At the very least, the 27 November launch is split by customer status.</p>
      <div class="obf-segs">${SEGMENTS.map(([k, n, d], i) => `
        <div class="obf-seg obf-rise" style="--i:${i}"><span class="obf-seg-k">${k}</span><h3>${n}</h3><p>${d}</p></div>`).join('')}
      </div>
      <div class="obf-rules obf-rise">
        <div class="obf-rules-head">
          <h3>Suppression rules, set before launch</h3>
          <p>One subscriber can qualify for several campaigns and automations at once, so frequency climbs fast during BFCM.</p>
          <p class="obf-progress"><span>Browse</span><i>→</i><span>Cart</span><i>→</i><span>Purchase</span></p>
          <p class="obf-small">Customers move down the funnel instead of getting competing messages from several stages.</p>
        </div>
        <ul>${RULES.map(([k, d]) => `<li><b>${k}</b><span>${d}</span></li>`).join('')}</ul>
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-msg">
      <p class="obf-eyebrow obf-rise">Messaging and creative</p>
      <h2 id="obf-pb-msg" class="obf-rise">Every message has <em>one clear job.</em></h2>
      <div class="obf-msgs obf-rise">${MESSAGES.map(([s, m]) => `<div><span>${s}</span><b>${m}</b></div>`).join('')}</div>
      <details class="obf-more obf-more-wide obf-rise">
        <summary>See the emotional and commercial job of each stage</summary>
        <div class="obf-table-wrap">
          <table class="obf-table obf-table-3">
            <thead><tr><th>Stage</th><th>Main message</th><th>The job</th></tr></thead>
            <tbody>${MESSAGES.map(r => `<tr>${r.map((c, i) => `<td data-l="${['Stage', 'Message', 'Job'][i]}">${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </details>
      <div class="obf-two">
        <div class="obf-rise">
          <h3 class="obf-h3">Tone by phase</h3>
          <dl class="obf-tone">${TONE.map(([p, d]) => `<div><dt>${p}</dt><dd>${d}</dd></div>`).join('')}</dl>
          <p class="obf-small">They shouldn’t all feel the same. Each phase gets its own emotional tone.</p>
        </div>
        <div class="obf-rise">
          <h3 class="obf-h3">Reusable email modules</h3>
          <p class="obf-small obf-small-top">So the team can build the whole campaign consistently, without designing every email from scratch.</p>
          <div class="obf-mods">${MODULES.map(([n, d]) => `<div><b>${n}</b><span>${d}</span></div>`).join('')}</div>
        </div>
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-kpi">
      <p class="obf-eyebrow obf-rise">Measurement</p>
      <h2 id="obf-pb-kpi" class="obf-rise">Judged on <em>revenue per recipient,</em> not opens.</h2>
      <div class="obf-kpis">
        <div class="obf-kpi obf-kpi-main obf-rise"><span class="obf-layer-n">The number that matters</span><h3>Email attributed revenue per recipient</h3><p>The key commercial metric for the whole of BFCM, ahead of simply chasing a higher open rate.</p></div>
        <div class="obf-kpi obf-rise"><h3>Campaign emails</h3><ul>${li(['Delivered', 'Open rate', 'Click rate', 'Click to open rate', 'Conversion rate', 'Revenue', 'Revenue per recipient', 'Unsubscribe rate'])}</ul></div>
        <div class="obf-kpi obf-rise"><h3>Automated flows</h3><ul>${li(['Flow conversion rate', 'Revenue per recipient', 'Revenue per email', 'Recovery rate', 'Time to purchase'])}</ul><p class="obf-small">Browse to purchase and cart to purchase are tracked separately where the platform allows.</p></div>
      </div>
    </section>

    <section class="obf-pb-sec" aria-labelledby="obf-pb-check">
      <p class="obf-eyebrow obf-rise">Before we go live</p>
      <h2 id="obf-pb-check" class="obf-rise">The launch <em>checklist.</em></h2>
      <div class="obf-checks">${CHECK.map(([g, items], i) => `
        <div class="obf-check obf-rise" style="--i:${i}"><h3>${g}</h3><ul>${li(items)}</ul></div>`).join('')}
      </div>
    </section>
  </div>`;
})();

/* ============ CRT screen UI, drawn into a canvas that becomes the monitor's glass ============ */
const SCREEN = (() => {
  const W = 1280, H = 960;
  const ui = document.createElement('canvas'); ui.width = W; ui.height = H;
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const u = ui.getContext('2d'), o = out.getContext('2d');
  const C = {
    bg: '#06101E', text: '#EAF4FF', dim: '#8FA9C6', faint: 'rgba(143,169,198,.35)',
    blue: '#0094FF', neon: '#5CC6FF', amber: '#FFB547', navy: '#0A0C19'
  };
  const SANS = "'DM Sans', system-ui, sans-serif";
  const SERIF = 'Newsreader, Georgia, serif';
  const TABS = ['Countdown', 'Campaign', 'Automations', 'November'];
  // UK times: November is GMT, so these UTC times are the local ones
  const EA = Date.UTC(2026, 10, 26, 18), BF_OPEN = Date.UTC(2026, 10, 27, 7), BF_END = Date.UTC(2026, 10, 29, 20);
  const DAY = (d, h = 0) => Date.UTC(2026, 10, d, h);
  // fit a line of text into a width by stepping the font size down (cached, so it is cheap per frame)
  const fitCache = new Map();
  function fit(c, s, max, size, weight = 600, fam = SANS) {
    const key = s + '|' + max + '|' + size + '|' + weight + fam;
    let f = fitCache.get(key);
    if (!f) {
      let z = size; c.font = `${weight} ${z}px ${fam}`;
      while (z > 12 && c.measureText(s).width > max) { z -= 1; c.font = `${weight} ${z}px ${fam}`; }
      f = `${weight} ${z}px ${fam}`; fitCache.set(key, f);
    }
    return f;
  }

  let tab = 0, compact = false, hits = [], flip = 0;
  let power = 1, powerTarget = 1, switchT = 0, osdT = 0, switchEnd = 0, osdEnd = 0;

  // overlay: scanlines + vignette, drawn once
  const fx = document.createElement('canvas'); fx.width = W; fx.height = H;
  (() => {
    const f = fx.getContext('2d');
    f.fillStyle = 'rgba(0,0,0,.22)';
    for (let y = 0; y < H; y += 3) f.fillRect(0, y, W, 1);
    const g = f.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .82);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.62)');
    f.fillStyle = g; f.fillRect(0, 0, W, H);
  })();
  const noise = document.createElement('canvas'); noise.width = 320; noise.height = 240;
  const nctx = noise.getContext('2d'); const nimg = nctx.createImageData(320, 240);

  function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  function t(c, s, x, y, font, color, align = 'left', base = 'alphabetic') {
    c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = base; c.fillText(s, x, y);
  }
  function tracked(c, s, x, y, size, color, align = 'left', spacing = .14) {
    c.font = `600 ${size}px ${SANS}`; c.fillStyle = color; c.textBaseline = 'alphabetic';
    if ('letterSpacing' in c) { c.letterSpacing = `${spacing * size}px`; c.textAlign = align; c.fillText(s, x, y); c.letterSpacing = '0px'; }
    else { c.textAlign = align; c.fillText(s, x, y); }
  }
  function mark(c, cx, cy, R, ring, arc) {
    const r = R * .62, g = .6;
    c.fillStyle = ring; c.beginPath();
    c.arc(cx, cy, R, -Math.PI + g, Math.PI - g, false);
    c.arc(cx, cy, r, Math.PI - g, -Math.PI + g, true); c.closePath(); c.fill();
    const ax = cx - R * .2, ga = .5;
    c.fillStyle = arc; c.beginPath();
    c.arc(ax, cy, R, Math.PI - ga, Math.PI + ga, false);
    c.arc(ax, cy, r * 1.08, Math.PI + ga * .92, Math.PI - ga * .92, true); c.closePath(); c.fill();
  }
  function arrow(c, x1, y1, x2, y2, color) {
    c.strokeStyle = color; c.lineWidth = 3; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - 8, y2); c.stroke();
    c.fillStyle = color; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - 12, y2 - 7); c.lineTo(x2 - 12, y2 + 7); c.fill();
  }
  function remain(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
  }
  const pad = n => String(n).padStart(2, '0');
  function daysTo(ts) { return Math.floor((ts - Date.now()) / 86400000); }
  function whenLabel(start, end) {
    const now = Date.now();
    if (now >= end) return 'Done';
    if (now >= start) return 'Live now';
    const d = daysTo(start);
    return d < 1 ? 'Today' : d < 2 ? 'Tomorrow' : `in ${d} days`;
  }

  /* ---------- top bar ---------- */
  function topBar() {
    hits = [];
    mark(u, 92, 94, 22, C.text, C.blue);
    t(u, 'BFCM 26', 128, 104, `700 ${compact ? 40 : 28}px ${SANS}`, C.text);
    if (compact) {
      tracked(u, `CH ${tab + 1}  ${TABS[tab].toUpperCase()}`, 1216, 104, 30, C.neon, 'right', .1);
      return;
    }
    u.font = `600 24px ${SANS}`;
    const widths = TABS.map(s => u.measureText(s).width + 30 + 8 + 36);
    let x = 1216 - widths.reduce((a, b) => a + b, 0) - 12 * 3;
    TABS.forEach((s, i) => {
      const w = widths[i], y = 66, h = 56, on = i === tab;
      rr(u, x, y, w, h, 28);
      if (on) { u.fillStyle = C.blue; u.fill(); } else { u.strokeStyle = C.faint; u.lineWidth = 2; u.stroke(); }
      u.beginPath(); u.arc(x + 18 + 15, y + h / 2, 15, 0, 7); u.fillStyle = on ? '#fff' : 'rgba(143,169,198,.18)'; u.fill();
      t(u, String(i + 1), x + 33, y + h / 2 + 1, `700 18px ${SANS}`, on ? C.blue : C.dim, 'center', 'middle');
      t(u, s, x + 18 + 30 + 8, y + h / 2 + 1, `600 24px ${SANS}`, on ? '#fff' : C.dim, 'left', 'middle');
      hits.push({ x, y, w, h, tab: i });
      x += w + 12;
    });
  }

  /* ---------- 1. countdown ---------- */
  const MOMENTS = [
    ['Mon 16 Nov', 'VIP list', 'Get access', DAY(16, 8), DAY(20)],
    ['Fri 20 Nov', 'Teaser', 'Something is coming', DAY(20, 8), EA],
    ['Thu 26 Nov', 'Early access', '6pm, VIPs first', EA, BF_OPEN],
    ['Fri 27 Nov', 'Doors open', '7am, it’s live', BF_OPEN, DAY(28)],
    ['Sat 28 Nov', 'Still deciding', 'What to consider', DAY(28, 8), DAY(29)],
    ['Sun 29 Nov', 'Last chance', 'Ends 8pm', DAY(29, 8), BF_END]
  ];
  function drawCountdown() {
    const r = remain(BF_OPEN - Date.now());
    const live = Date.now() >= BF_OPEN, over = Date.now() >= BF_END;
    if (!compact) {
      t(u, over ? 'That’s a wrap for Black Friday' : live ? 'Black Friday is live' : 'Black Friday doors open in', 640, 214, `italic 400 48px ${SERIF}`, C.dim, 'center');
      const vals = [[r.d, 'DAYS'], [r.h, 'HOURS'], [r.m, 'MINUTES'], [r.s, 'SECONDS']];
      const bw = 236, gap = 26, x0 = (W - (bw * 4 + gap * 3)) / 2, y = 250, bh = 290;
      vals.forEach(([v, l], i) => {
        const x = x0 + i * (bw + gap);
        rr(u, x, y, bw, bh, 20); u.fillStyle = 'rgba(92,198,255,.07)'; u.fill();
        u.strokeStyle = 'rgba(92,198,255,.32)'; u.lineWidth = 2; u.stroke();
        const s = i === 0 ? String(v) : pad(v);
        t(u, s, x + bw / 2, y + 190, `400 ${s.length > 2 ? 150 : 184}px ${SERIF}`, i === 3 ? C.neon : C.text, 'center');
        tracked(u, l, x + bw / 2, y + 252, 22, C.dim, 'center');
      });
      // the six campaign moments, low pressure on the left to high urgency on the right
      const ly = 680, lx0 = 140, step = 200;
      const heat = u.createLinearGradient(90, 0, 1190, 0);
      heat.addColorStop(0, 'rgba(143,169,198,.35)'); heat.addColorStop(.5, C.blue); heat.addColorStop(1, C.amber);
      u.strokeStyle = heat; u.lineWidth = 3; u.beginPath(); u.moveTo(90, ly); u.lineTo(1190, ly); u.stroke();
      MOMENTS.forEach(([d, n, sub, s, e], i) => {
        const x = lx0 + i * step, big = i === 2 || i === 3;
        u.beginPath(); u.arc(x, ly, big ? 13 : 9, 0, 7); u.fillStyle = i === 5 ? C.amber : (big ? C.blue : C.text); u.fill();
        t(u, d, x, ly - 32, fit(u, d, 186, 23), C.text, 'center');
        t(u, n, x, ly + 50, fit(u, n, 190, 31, 400, SERIF), C.text, 'center');
        t(u, sub, x, ly + 84, fit(u, sub, 190, 20, 500), C.dim, 'center');
        t(u, whenLabel(s, e), x, ly + 118, `600 20px ${SANS}`, i === 5 ? C.amber : C.neon, 'center');
      });
      u.beginPath(); u.arc(452, 874, 7, 0, 7); u.fillStyle = C.amber; u.fill();
      t(u, 'Book by Fri 6 Nov to be live for early access', 470, 882, `600 26px ${SANS}`, C.amber);
    } else {
      t(u, over ? 'That’s a wrap' : live ? 'Black Friday is live' : 'Doors open in', 640, 226, `italic 400 64px ${SERIF}`, C.dim, 'center');
      const vals = [[r.d, 'DAYS'], [r.h, 'HOURS'], [r.m, 'MINUTES'], [r.s, 'SECONDS']];
      vals.forEach(([v, l], i) => {
        const col = i % 2, row = Math.floor(i / 2), x = 110 + col * 540, y = 270 + row * 290, w = 520, h = 270;
        rr(u, x, y, w, h, 24); u.fillStyle = 'rgba(92,198,255,.07)'; u.fill();
        u.strokeStyle = 'rgba(92,198,255,.32)'; u.lineWidth = 3; u.stroke();
        t(u, i === 0 ? String(v) : pad(v), x + w / 2, y + 180, `400 190px ${SERIF}`, i === 3 ? C.neon : C.text, 'center');
        tracked(u, l, x + w / 2, y + 240, 34, C.dim, 'center');
      });
      t(u, 'VIPs Thu 6pm · Everyone Fri 7am', 640, 900, fit(u, 'VIPs Thu 6pm · Everyone Fri 7am', 1080, 44), C.text, 'center');
    }
  }

  /* ---------- 2. the campaign: six scheduled emails ---------- */
  const EMAILS = [
    ['VIP list', 'Mon 16 Nov', 'Main list', 'Not yet', 'Get access'],
    ['Teaser', 'Fri 20 Nov', 'Main list', 'Not yet', 'Something is coming'],
    ['Early access', 'Thu 26, 6pm', 'VIPs only', 'Revealed', 'You’re in first'],
    ['Doors open', 'Fri 27, 7am', 'Everyone', 'Live', 'It’s live'],
    ['Still deciding', 'Sat 28 Nov', 'Non buyers', 'Live', 'Best sellers'],
    ['Last chance', 'Sun 29 Nov', 'Non buyers', 'Ends 8pm', 'It’s ending']
  ];
  const OFFER_COL = { 'Not yet': ['rgba(143,169,198,.16)', C.dim], 'Revealed': ['rgba(92,198,255,.2)', C.neon], 'Live': ['rgba(0,148,255,.9)', '#fff'], 'Ends 8pm': ['rgba(255,181,71,.95)', C.navy] };
  function node(x, y, w, h, title, sub, style) {
    rr(u, x, y, w, h, 16);
    if (style === 'exit') { u.setLineDash([8, 7]); u.strokeStyle = C.amber; u.lineWidth = 2.5; u.stroke(); u.setLineDash([]); }
    else if (style === 'hot') { u.fillStyle = C.blue; u.fill(); }
    else if (style === 'cm') { u.fillStyle = C.neon; u.fill(); }
    else { u.fillStyle = 'rgba(234,244,255,.06)'; u.fill(); u.strokeStyle = C.faint; u.lineWidth = 2; u.stroke(); }
    const dark = style === 'cm';
    t(u, title, x + 16, y + 46, fit(u, title, w - 30, 25), dark ? C.navy : (style === 'exit' ? C.amber : C.text));
    t(u, sub, x + 16, y + 80, fit(u, sub, w - 30, 21, 500), dark ? '#0B2A4A' : (style === 'hot' ? '#E6F4FF' : C.dim));
  }
  function pulse(x, y, color) {
    const g = u.createRadialGradient(x, y, 0, x, y, 22);
    g.addColorStop(0, color); g.addColorStop(1, 'rgba(92,198,255,0)');
    u.fillStyle = g; u.beginPath(); u.arc(x, y, 22, 0, 7); u.fill();
    u.fillStyle = '#fff'; u.beginPath(); u.arc(x, y, 5, 0, 7); u.fill();
  }
  function pill(x, y, s, fill, ink, size = 19) {
    u.font = `600 ${size}px ${SANS}`; const w = u.measureText(s).width + 26;
    rr(u, x, y, w, size + 16, (size + 16) / 2); u.fillStyle = fill; u.fill();
    t(u, s, x + 13, y + (size + 16) / 2 + 1, `600 ${size}px ${SANS}`, ink, 'left', 'middle');
    return w;
  }
  function drawCampaign(time) {
    if (!compact) {
      t(u, 'The campaign: low pressure to high urgency', 64, 214, `400 48px ${SERIF}`, C.text);
      const nw = 176, nh = 108, gap = 18, x0 = 64, y1 = 300, span = 6 * nw + 5 * gap;
      tracked(u, 'SIX SCHEDULED EMAILS', x0, 268, 18, C.blue);
      // a customer travelling through the week
      u.strokeStyle = 'rgba(143,169,198,.18)'; u.lineWidth = 2; u.beginPath(); u.moveTo(x0, y1 - 14); u.lineTo(x0 + span, y1 - 14); u.stroke();
      pulse(x0 + ((time / 7000) % 1) * span, y1 - 14, 'rgba(0,148,255,.9)');
      EMAILS.forEach(([a, b], i) => {
        const x = x0 + i * (nw + gap);
        node(x, y1, nw, nh, a, b, i === 3 ? 'hot' : i === 5 ? 'exit' : '');
        if (i < 5) arrow(u, x + nw + 2, y1 + nh / 2, x + nw + gap - 1, y1 + nh / 2, C.dim);
      });
      const rows = [['WHO GETS IT', 460], ['THE OFFER', 560], ['THE MESSAGE', 660]];
      rows.forEach(([l, y]) => { tracked(u, l, x0, y, 16, C.dim); u.strokeStyle = 'rgba(143,169,198,.14)'; u.lineWidth = 1.5; u.beginPath(); u.moveTo(x0 + 160, y - 6); u.lineTo(x0 + span, y - 6); u.stroke(); });
      EMAILS.forEach(([, , who, offer, msg], i) => {
        const x = x0 + i * (nw + gap);
        t(u, who, x + 4, 504, fit(u, who, nw - 8, 22, 600), C.text);
        const [f, ink] = OFFER_COL[offer]; pill(x + 2, 580, offer, f, ink);
        t(u, msg, x + 4, 708, fit(u, msg, nw - 8, 25, 'italic 400', SERIF), C.dim);
      });
      // pressure builds across the week
      const by = 760, heat = u.createLinearGradient(x0, 0, x0 + span, 0);
      heat.addColorStop(0, 'rgba(143,169,198,.25)'); heat.addColorStop(.55, C.blue); heat.addColorStop(1, C.amber);
      rr(u, x0, by, span, 10, 5); u.fillStyle = heat; u.fill();
      t(u, 'Low pressure', x0, by + 42, `600 20px ${SANS}`, C.dim);
      t(u, 'High urgency', x0 + span, by + 42, `600 20px ${SANS}`, C.amber, 'right');
      t(u, 'Anyone who buys is suppressed straight away and leaves every sale email.', 64, 872, `500 23px ${SANS}`, C.dim);
    } else {
      t(u, 'The campaign', 90, 236, `400 70px ${SERIF}`, C.text);
      EMAILS.forEach(([a, b, who], i) => {
        const y = 322 + i * 104;
        u.beginPath(); u.arc(112, y - 13, 13, 0, 7); u.fillStyle = i === 3 ? C.blue : i === 5 ? C.amber : C.text; u.fill();
        if (i < 5) { u.strokeStyle = C.faint; u.lineWidth = 3; u.beginPath(); u.moveTo(112, y + 4); u.lineTo(112, y + 78); u.stroke(); }
        t(u, a, 156, y, `600 44px ${SANS}`, i === 5 ? C.amber : C.text);
        t(u, `${b} · ${who}`, 156, y + 40, fit(u, `${b} · ${who}`, 1000, 30, 500), C.dim);
      });
    }
  }

  /* ---------- 3. automations: browse, cart and back in stock ---------- */
  const FLOW = [
    ['Browse abandonment', '1 hour after a view', 'No code', 'You were looking at this'],
    ['Cart reminder', '30 minutes after cart', 'No code', 'Your cart is waiting'],
    ['Second nudge', '4 hours after cart', 'BF code', 'Here’s your code'],
    ['Final call', '20 hours after cart', 'Code ends tonight', 'Your code ends tonight']
  ];
  const CODE_COL = { 'No code': ['rgba(143,169,198,.16)', C.dim], 'BF code': ['rgba(0,148,255,.9)', '#fff'], 'Code ends tonight': ['rgba(255,181,71,.95)', C.navy] };
  function drawAutomations(time) {
    if (!compact) {
      t(u, 'Automations that follow intent', 64, 214, `400 50px ${SERIF}`, C.text);
      tracked(u, 'BROWSE  →  CART  →  INCENTIVE  →  FINAL DEADLINE', 64, 268, 18, C.blue);
      const nw = 260, nh = 108, gap = 37, x0 = 64, y1 = 296, span = 4 * nw + 3 * gap;
      FLOW.forEach(([a, b, code, msg], i) => {
        const x = x0 + i * (nw + gap);
        node(x, y1, nw, nh, a, b, i === 3 ? 'hot' : '');
        if (i < 3) arrow(u, x + nw + 3, y1 + nh / 2, x + nw + gap - 3, y1 + nh / 2, C.dim);
        const [f, ink] = CODE_COL[code]; pill(x + 2, y1 + nh + 20, code, f, ink, 20);
        t(u, `“${msg}”`, x + 4, y1 + nh + 104, fit(u, `“${msg}”`, nw - 6, 25, 'italic 400', SERIF), C.dim);
      });
      u.strokeStyle = 'rgba(143,169,198,.18)'; u.lineWidth = 2; u.beginPath(); u.moveTo(x0, y1 - 12); u.lineTo(x0 + span, y1 - 12); u.stroke();
      pulse(x0 + ((time / 6000) % 1) * span, y1 - 12, 'rgba(92,198,255,.9)');
      // exit rules
      tracked(u, 'EXIT RULES', 64, 582, 18, C.amber);
      let ex = 64;
      ['Adds to cart: leaves browse', 'Buys: leaves every flow', 'Buyers skip sale emails'].forEach(s => {
        u.font = `600 22px ${SANS}`; const w = u.measureText(s).width + 36;
        rr(u, ex, 602, w, 54, 27); u.setLineDash([7, 6]); u.strokeStyle = C.amber; u.lineWidth = 2; u.stroke(); u.setLineDash([]);
        t(u, s, ex + 18, 630, `600 22px ${SANS}`, C.text, 'left', 'middle');
        ex += w + 16;
      });
      // availability
      tracked(u, 'AVAILABILITY', 64, 718, 18, C.neon);
      node(64, 738, 300, 104, 'Back in stock', 'the moment it lands', 'cm');
      const chain = ['Wanted it', 'Unavailable', 'Available', 'Purchase'];
      let cx = 410;
      chain.forEach((s, i) => {
        u.font = `600 24px ${SANS}`; const w = u.measureText(s).width;
        t(u, s, cx, 798, `600 24px ${SANS}`, i === 3 ? C.neon : C.text, 'left', 'middle');
        cx += w + 18;
        if (i < 3) { arrow(u, cx, 798, cx + 46, 798, C.dim); cx += 64; }
      });
      t(u, 'BF offer note added if the product is in the sale.', 410, 838, `500 21px ${SANS}`, C.dim);
      t(u, 'The code arrives on the second cart email, never the first.', 64, 902, `500 23px ${SANS}`, C.dim);
    } else {
      t(u, 'Automations', 90, 236, `400 70px ${SERIF}`, C.text);
      const list = FLOW.map(([a, b, code]) => [a, `${b.replace(' after a view', '').replace(' after cart', '')} · ${code}`]).concat([['Back in stock', 'the moment it lands']]);
      list.forEach(([a, b], i) => {
        const y = 330 + i * 116;
        u.beginPath(); u.arc(112, y - 14, 14, 0, 7); u.fillStyle = i === 4 ? C.neon : i >= 2 ? C.blue : C.text; u.fill();
        if (i < 3) { u.strokeStyle = C.faint; u.lineWidth = 3; u.beginPath(); u.moveTo(112, y + 4); u.lineTo(112, y + 88); u.stroke(); }
        t(u, a, 156, y, fit(u, a, 1000, 48), C.text);
        t(u, b, 156, y + 44, fit(u, b, 1000, 34, 500), C.dim);
      });
    }
  }

  /* ---------- 4. November ---------- */
  const EVENTS = { 13: ['VIP segment', 'prep'], 16: ['VIP list', 'build'], 20: ['Teaser', 'build'], 26: ['Early access', 'sale'], 27: ['Black Friday', 'bf'], 28: ['Still deciding', 'sale'], 29: ['Last chance', 'sale'] };
  const KIND = { prep: 'rgba(143,169,198,.28)', build: 'rgba(0,148,255,.55)', sale: 'rgba(92,198,255,.9)' };
  function drawNovember() {
    const big = compact;
    t(u, 'November 2026', big ? 90 : 64, big ? 236 : 214, `400 ${big ? 70 : 50}px ${SERIF}`, C.text);
    if (!big) {
      let lx = 1216;
      [['Sale', KIND.sale], ['Anticipation', KIND.build], ['Set up', KIND.prep]].forEach(([l, c]) => {
        u.font = `600 22px ${SANS}`; const w = u.measureText(l).width;
        lx -= w; t(u, l, lx, 207, `600 22px ${SANS}`, C.dim);
        lx -= 36; rr(u, lx, 186, 26, 26, 7); u.fillStyle = c; u.fill();
        lx -= 28;
      });
    }
    const x0 = big ? 90 : 64, gw = big ? 1100 : 1152, cw = gw / 7, top = big ? 290 : 272, rh = big ? 80 : 94;
    ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].forEach((d, i) => tracked(u, d, x0 + i * cw + 12, top - 12, big ? 26 : 18, C.dim));
    // Nov 1 2026 is a Sunday: Monday first grid starts Mon 26 Oct
    for (let i = 0; i < 42; i++) {
      const day = i - 5; // day 1 sits at index 6
      if (i > 35) break;
      const col = i % 7, row = Math.floor(i / 7), x = x0 + col * cw + 3, y = top + row * rh + 3, w = cw - 6, h = rh - 6;
      const inMonth = day >= 1 && day <= 30;
      const ev = inMonth ? EVENTS[day] : null;
      rr(u, x, y, w, h, 12);
      if (ev && ev[1] === 'bf') { u.fillStyle = C.blue; u.fill(); }
      else if (ev && ev[1] === 'cm') { u.fillStyle = C.neon; u.fill(); }
      else if (big && ev) { u.fillStyle = KIND[ev[1]]; u.fill(); }
      else { u.fillStyle = inMonth ? 'rgba(234,244,255,.04)' : 'rgba(234,244,255,.015)'; u.fill(); }
      const label = inMonth ? String(day) : String(25 + col + 1);
      const dark = ev && ev[1] === 'cm';
      t(u, label, x + 12, y + (big ? 50 : 30), `600 ${big ? 38 : 22}px ${SANS}`, !inMonth ? 'rgba(143,169,198,.3)' : dark ? C.navy : C.text);
      if (ev && !big) {
        const [name, kind] = ev;
        if (kind === 'bf' || kind === 'cm') {
          t(u, name, x + 10, y + h - 14, `400 23px ${SERIF}`, dark ? C.navy : '#fff');
        } else {
          u.font = `600 17px ${SANS}`; const tw = u.measureText(name).width;
          rr(u, x + 8, y + h - 36, tw + 18, 28, 14); u.fillStyle = KIND[kind]; u.fill();
          t(u, name, x + 17, y + h - 16, `600 17px ${SANS}`, kind === 'sale' ? C.navy : C.text);
        }
      }
    }
    if (big) {
      const s = '16 VIP list \u00b7 27 Black Friday \u00b7 29 Last chance';
      t(u, s, 640, 880, fit(u, s, 1100, 38), C.text, 'center');
    } else {
      t(u, 'Browse, cart and back in stock automations run the whole way through.', 64, 880, `500 23px ${SANS}`, C.dim);
    }
  }

  function drawUI(time) {
    u.fillStyle = C.bg; u.fillRect(0, 0, W, H);
    const g = u.createRadialGradient(W / 2, H * .45, 60, W / 2, H * .45, W * .7);
    g.addColorStop(0, 'rgba(0,148,255,.16)'); g.addColorStop(1, 'rgba(0,148,255,0)');
    u.fillStyle = g; u.fillRect(0, 0, W, H);
    topBar();
    [drawCountdown, drawCampaign, drawAutomations, drawNovember][tab](time);
  }

  function frame(time, dt) {
    // power animation
    power += (powerTarget - power) * Math.min(1, dt / 160);
    if (Math.abs(powerTarget - power) < .002) power = powerTarget;
    if (compact && (tab === 1 || tab === 2)) {
      const f = Math.floor(time / 5000);
      if (f !== flip) { flip = f; }
    }
    drawUI(time);
    o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
    if (power > .01) {
      const p = power;
      if (p < .35) {
        const k = p / .35; const lw = W * k;
        o.fillStyle = '#DDF1FF'; o.fillRect((W - lw) / 2, H / 2 - 3, lw, 6);
      } else {
        const k = (p - .35) / .65, e = 1 - Math.pow(1 - k, 3), h = Math.max(6, H * e);
        o.drawImage(ui, 0, (H - h) / 2, W, h);
        if (k < 1) { o.fillStyle = `rgba(221,241,255,${(1 - k) * .8})`; o.fillRect(0, (H - h) / 2, W, h); }
      }
    }
    // channel change static
    if (switchT > 0) { switchT = switchEnd - performance.now();
      const d = nimg.data;
      for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = v * .8; d[i + 1] = v * .9; d[i + 2] = v; d[i + 3] = 255; }
      nctx.putImageData(nimg, 0, 0);
      o.globalAlpha = Math.min(1, switchT / 120); o.imageSmoothingEnabled = false;
      o.drawImage(noise, 0, 0, W, H); o.globalAlpha = 1; o.imageSmoothingEnabled = true;
    }
    // on screen display after a switch
    if (osdT > 0 && !compact && power > .9) {
      o.globalAlpha = Math.min(1, osdT / 400);
      tracked(o, `CH ${tab + 1}`, 1216, 912, 34, '#7CFFB2', 'right', .08);
      o.globalAlpha = 1; osdT = osdEnd - performance.now();
    }
    o.drawImage(fx, 0, 0);
  }

  return {
    canvas: out, W, H,
    get tab() { return tab; },
    setTab(i, quiet) { if (i === tab && !quiet) return; tab = i; flip = Math.floor(performance.now() / 5000); if (!quiet) { switchT = 260; osdT = 1600; switchEnd = performance.now() + 260; osdEnd = performance.now() + 1600; } },
    setCompact(v) { compact = v; },
    power(on) { powerTarget = on ? 1 : 0; },
    get isOn() { return powerTarget === 1; },
    hitTest(x, y) { if (compact) return null; const h = hits.find(h => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h); return h ? h.tab : null; },
    frame, mark,
    bfIn() { return remain(BF_OPEN - Date.now()); }
  };
})();

/* ============ Opes wrapping paper that tears where you drag ============ */
const PAPER = (() => {
  let cv, ctx, wrap, dpr = 1, w = 0, h = 0, grid, gw = 48, gh = 30, torn = 0, done = false, onDone = null;
  let stroke = null, seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function tile(size) {
    const t = document.createElement('canvas'); t.width = t.height = size; const c = t.getContext('2d');
    const s = size / 240;
    c.fillStyle = '#0094FF'; c.fillRect(0, 0, size, size);
    c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 2 * s;
    for (let i = -size; i < size * 2; i += 20 * s) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + size, size); c.stroke(); }
    const markAt = (x, y, R, rot, ring, arc) => { c.save(); c.translate(x, y); c.rotate(rot); SCREEN.mark(c, 0, 0, R, ring, arc); c.restore(); };
    markAt(62 * s, 62 * s, 30 * s, -.3, '#0A0C19', '#FFFFFF');
    markAt(182 * s, 182 * s, 30 * s, .45, '#FFFFFF', '#0A0C19');
    markAt(182 * s, 62 * s, 11 * s, 1.2, 'rgba(10,12,25,.9)', 'rgba(10,12,25,.9)');
    markAt(62 * s, 182 * s, 11 * s, 2.4, 'rgba(255,255,255,.95)', 'rgba(255,255,255,.95)');
    const star = (x, y, r) => { c.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * .32 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); };
    c.fillStyle = '#FFFFFF'; star(122 * s, 20 * s, 7 * s); star(20 * s, 122 * s, 5 * s);
    c.fillStyle = '#0A0C19'; star(122 * s, 122 * s, 6 * s); star(222 * s, 122 * s, 4 * s);
    return t;
  }

  function drawRibbon(c, x0, y0, len, vertical, width) {
    const g = vertical ? c.createLinearGradient(x0 - width / 2, 0, x0 + width / 2, 0) : c.createLinearGradient(0, y0 - width / 2, 0, y0 + width / 2);
    g.addColorStop(0, '#070913'); g.addColorStop(.35, '#1B2140'); g.addColorStop(.5, '#2A3260'); g.addColorStop(.65, '#1B2140'); g.addColorStop(1, '#070913');
    c.fillStyle = g;
    if (vertical) c.fillRect(x0 - width / 2, 0, width, len); else c.fillRect(0, y0 - width / 2, len, width);
    c.strokeStyle = 'rgba(92,198,255,.35)'; c.lineWidth = 1.5 * dpr;
    c.beginPath();
    if (vertical) { c.moveTo(x0 - width / 2 + 6 * dpr, 0); c.lineTo(x0 - width / 2 + 6 * dpr, len); c.moveTo(x0 + width / 2 - 6 * dpr, 0); c.lineTo(x0 + width / 2 - 6 * dpr, len); }
    else { c.moveTo(0, y0 - width / 2 + 6 * dpr); c.lineTo(len, y0 - width / 2 + 6 * dpr); c.moveTo(0, y0 + width / 2 - 6 * dpr); c.lineTo(len, y0 + width / 2 - 6 * dpr); }
    c.setLineDash([4 * dpr, 5 * dpr]); c.stroke(); c.setLineDash([]);
  }
  function loop(c, x, y, rot, L, Wd) {
    c.save(); c.translate(x, y); c.rotate(rot);
    const g = c.createLinearGradient(0, -Wd, L, Wd); g.addColorStop(0, '#0A0C19'); g.addColorStop(.45, '#27305C'); g.addColorStop(1, '#0A0C19');
    c.fillStyle = g; c.beginPath(); c.moveTo(0, 0);
    c.bezierCurveTo(L * .35, -Wd * 1.3, L * 1.05, -Wd * 1.1, L, 0);
    c.bezierCurveTo(L * 1.05, Wd * 1.1, L * .35, Wd * 1.3, 0, 0); c.fill();
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.moveTo(L * .2, 0);
    c.bezierCurveTo(L * .45, -Wd * .45, L * .85, -Wd * .4, L * .88, 0);
    c.bezierCurveTo(L * .85, Wd * .4, L * .45, Wd * .45, L * .2, 0); c.fill();
    c.strokeStyle = 'rgba(92,198,255,.25)'; c.lineWidth = 2 * dpr; c.beginPath(); c.moveTo(L * .1, -Wd * .3);
    c.bezierCurveTo(L * .4, -Wd * 1.05, L * .9, -Wd * .95, L * .95, -Wd * .1); c.stroke();
    c.restore();
  }

  function paint() {
    const c = ctx;
    c.globalCompositeOperation = 'source-over';
    c.fillStyle = c.createPattern(tile(Math.round(240 * dpr)), 'repeat'); c.fillRect(0, 0, w, h);
    // crinkles: soft folds of light and shadow
    seed = 11;
    for (let i = 0; i < 26; i++) {
      const x = rnd() * w, y = rnd() * h, a = rnd() * Math.PI, L = (200 + rnd() * 500) * dpr, Wd = (30 + rnd() * 90) * dpr;
      c.save(); c.translate(x, y); c.rotate(a);
      const g = c.createLinearGradient(0, -Wd, 0, Wd); const lite = rnd() > .5;
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, lite ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = g; c.fillRect(-L / 2, -Wd, L, Wd * 2); c.restore();
    }
    const edge = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .3, w / 2, h / 2, Math.max(w, h) * .75);
    edge.addColorStop(0, 'rgba(0,0,0,0)'); edge.addColorStop(1, 'rgba(10,12,25,.35)'); c.fillStyle = edge; c.fillRect(0, 0, w, h);
    // ribbon cross and bow
    const rx = w * .5, ry = h * .44, RW = Math.max(52 * dpr, Math.min(w, h) * .075);
    drawRibbon(c, rx, 0, h, true, RW); drawRibbon(c, 0, ry, w, false, RW);
    const L = RW * 2.3, Wd = RW * .9;
    // tails
    c.fillStyle = '#10142A';
    [[-1, .5], [1, .7]].forEach(([s, k]) => { c.save(); c.translate(rx, ry); c.rotate(s * k + Math.PI / 2 - s * .9);
      c.beginPath(); c.moveTo(-RW * .35, 0); c.lineTo(RW * .35, 0); c.lineTo(RW * .45, L * 1.1); c.lineTo(0, L * .9); c.lineTo(-RW * .45, L * 1.1); c.closePath(); c.fill(); c.restore(); });
    loop(c, rx, ry, Math.PI + .35, L, Wd); loop(c, rx, ry, -.35, L, Wd);
    loop(c, rx, ry, Math.PI - .5, L * .78, Wd * .8); loop(c, rx, ry, -Math.PI + .5 + Math.PI, L * .78, Wd * .8);
    const kg = c.createRadialGradient(rx - RW * .15, ry - RW * .2, 2, rx, ry, RW * .6); kg.addColorStop(0, '#34407A'); kg.addColorStop(1, '#0A0C19');
    c.fillStyle = kg; c.beginPath(); c.ellipse(rx, ry, RW * .55, RW * .48, 0, 0, 7); c.fill();
    // gift tag hanging from the bow
    const tw = 230 * dpr, th = 118 * dpr, ts = Math.min(1, (w / dpr) / 520);
    const tx = Math.min(rx + RW * 1.2, w - tw * ts - 20 * dpr), ty = ry + RW * 1.3;
    c.strokeStyle = '#EAF2FB'; c.lineWidth = 2 * dpr; c.beginPath(); c.moveTo(rx + RW * .3, ry + RW * .2); c.quadraticCurveTo(tx, ty - 30 * dpr, tx + 18 * dpr * ts, ty + 14 * dpr * ts); c.stroke();
    c.save(); c.translate(tx, ty); c.rotate(.12); c.scale(ts, ts);
    c.shadowColor = 'rgba(10,12,25,.35)'; c.shadowBlur = 18 * dpr; c.shadowOffsetY = 8 * dpr;
    c.fillStyle = '#FFFFFF'; c.beginPath(); c.moveTo(0, th * .3); c.lineTo(th * .3, 0); c.lineTo(tw, 0); c.lineTo(tw, th); c.lineTo(th * .3, th); c.lineTo(0, th * .7); c.closePath(); c.fill();
    c.shadowColor = 'transparent';
    c.fillStyle = '#0A0C19'; c.beginPath(); c.arc(18 * dpr, th / 2, 6 * dpr, 0, 7); c.fill();
    c.fillStyle = '#0A0C19'; c.textBaseline = 'alphabetic';
    c.font = `italic 400 ${26 * dpr}px Newsreader, Georgia, serif`; c.fillText('To you, from Opes', 44 * dpr, 48 * dpr);
    c.font = `600 ${15 * dpr}px Aspekta, sans-serif`; c.fillStyle = '#0077CC'; c.fillText('Black Friday 2026', 44 * dpr, 78 * dpr);
    c.fillStyle = '#475569'; c.font = `500 ${13 * dpr}px Aspekta, sans-serif`; c.fillText('Tear to open', 44 * dpr, 100 * dpr);
    c.restore();
  }

  function setup(el, canvas, cb) {
    wrap = el; cv = canvas; ctx = cv.getContext('2d'); onDone = cb;
    wrap.addEventListener('pointerdown', down);
    wrap.addEventListener('pointermove', move);
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => wrap.addEventListener(t, up));
  }
  function reset() {
    done = false; torn = 0; stroke = null;
    wrap.classList.remove('obf-falling', 'obf-dragging'); wrap.hidden = false;
    wrap.classList.remove('obf-wrap-in'); void wrap.offsetWidth; wrap.classList.add('obf-wrap-in');
    size();
  }
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = Math.round(wrap.clientWidth * dpr); h = Math.round(wrap.clientHeight * dpr);
    cv.width = w; cv.height = h; grid = new Uint8Array(gw * gh); torn = 0; paint();
  }

  function jag(points, width) {
    // build a jagged torn strip along the points
    const L = [], R = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i], q = points[Math.min(i + 1, points.length - 1)], o = points[Math.max(i - 1, 0)];
      let dx = q[0] - o[0], dy = q[1] - o[1]; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const nx = -dy, ny = dx;
      const j1 = (rnd() - .5) * 7 * dpr + (rnd() < .12 ? rnd() * 9 * dpr : 0);
      const j2 = (rnd() - .5) * 7 * dpr + (rnd() < .12 ? rnd() * 9 * dpr : 0);
      L.push([p[0] + nx * (width / 2 + j1), p[1] + ny * (width / 2 + j1)]);
      R.push([p[0] - nx * (width / 2 + j2), p[1] - ny * (width / 2 + j2)]);
    }
    return L.concat(R.reverse());
  }
  function poly(pts) { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); }
  function blob(x, y, r) {
    const pts = []; const n = 22;
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = r * (0.82 + rnd() * .3); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    return pts;
  }
  function tearSegment(a, b, width) {
    const pts = []; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.max(2, Math.ceil(d / (5 * dpr)));
    for (let i = 0; i <= n; i++) pts.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
    const cut = jag(pts, width), cap = blob(b[0], b[1], width / 2);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(4,20,48,.28)'; poly(jag(pts, width + 22 * dpr)); ctx.fill(); poly(blob(b[0], b[1], width / 2 + 11 * dpr)); ctx.fill();
    ctx.fillStyle = '#F4F8FC'; poly(jag(pts, width + 9 * dpr)); ctx.fill(); poly(blob(b[0], b[1], width / 2 + 4.5 * dpr)); ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000'; poly(cut); ctx.fill(); poly(cap); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    // coverage bookkeeping on a coarse grid
    const cw = w / gw, chh = h / gh, rad = width / 2;
    for (let i = 0; i <= n; i += 2) {
      const [px, py] = pts[i];
      const x0 = Math.max(0, Math.floor((px - rad) / cw)), x1 = Math.min(gw - 1, Math.floor((px + rad) / cw));
      const y0 = Math.max(0, Math.floor((py - rad) / chh)), y1 = Math.min(gh - 1, Math.floor((py + rad) / chh));
      for (let gy = y0; gy <= y1; gy++) for (let gx = x0; gx <= x1; gx++) {
        const cx = (gx + .5) * cw, cy = (gy + .5) * chh;
        if (!grid[gy * gw + gx] && Math.hypot(cx - px, cy - py) < rad) { grid[gy * gw + gx] = 1; torn++; }
      }
    }
  }
  function pos(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr]; }
  function down(e) {
    if (done) return;
    wrap.setPointerCapture?.(e.pointerId);
    wrap.classList.add('obf-dragging');
    stroke = { last: pos(e), len: 0 };
    tearSegment(stroke.last, [stroke.last[0] + 1, stroke.last[1] + 1], 16 * dpr);
    document.dispatchEvent(new CustomEvent('paper:start'));
  }
  function move(e) {
    if (!stroke || done) return;
    const p = pos(e), d = Math.hypot(p[0] - stroke.last[0], p[1] - stroke.last[1]);
    if (d < 6 * dpr) return;
    stroke.len += d / dpr;
    const width = Math.min(18 + stroke.len * .22, Math.max(170, Math.min(w, h) / dpr * .3)) * dpr;
    tearSegment(stroke.last, p, width);
    stroke.last = p;
    check();
  }
  function up() { stroke = null; wrap.classList.remove('obf-dragging'); }
  function check() {
    if (!done && torn / (gw * gh) > .26) finish();
  }
  function finish() {
    done = true; stroke = null;
    wrap.classList.add('obf-falling');
    const ms = matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 1000;
    onDone && onDone();
    setTimeout(() => { wrap.hidden = true; }, ms);
  }
  function auto() {
    // tear it for the visitor along a sweeping path
    if (done) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { finish(); return; }
    const path = []; const n = 60;
    for (let i = 0; i <= n; i++) { const k = i / n; path.push([w * (.08 + .84 * k), h * (.72 - .5 * k + Math.sin(k * Math.PI * 3) * .12)]); }
    for (let i = 0; i <= n; i++) { const k = i / n; path.push([w * (.92 - .84 * k), h * (.2 + .6 * k + Math.sin(k * Math.PI * 2) * .1)]); }
    let i = 1, len = 0; const t0 = performance.now(), dur = 1300;
    const step = now => {
      if (done) return;
      const target = Math.min(path.length, 1 + Math.floor((now - t0) / dur * (path.length - 1)) + 1);
      while (i < target && !done) {
        const a = path[i - 1], b = path[i]; len += Math.hypot(b[0] - a[0], b[1] - a[1]) / dpr;
        tearSegment(a, b, Math.min(18 + len * .22, 200) * dpr); i++; check();
      }
      if (i >= path.length) { if (!done) finish(); return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  return { setup, reset, size, auto, get done() { return done; } };
})();

/* ============ The monitor: rebuilt in code from Aran's photo (img2threejs method) ============
   Reference read: 15 inch beige CRT, front view, slightly above. Bezel W:H about 1.17.
   Screen opening sits high (thin top and side margins, deep bottom control strip).
   Bottom strip: brand badge left, four small oval buttons centre, model script and LED right,
   big round power button far right. Swivel base under the front. The back (tube bell, vents)
   is not visible in the photo, so it is inferred from typical 15 inch CRTs. Brand badge swapped
   for Opes. */
function makeMonitor() { window.MONITOR = (() => {
  const T = THREE;
  let renderer, scene, camera, root, pivot, glass, screenTex, buttons = [], power, led, ledMat;
  let W = 1, H = 1, compact = false;
  const ray = new T.Raycaster(), ndc = new T.Vector2();
  const state = { rotY: 0, rotX: 0, tRotY: 0, tRotX: 0, dragging: false, lastDrag: -1e9, spin: 0, rise: 0, riseT: 1, visible: false };

  const BW = 1.6, BH = 1.37;               // bezel
  const OW = 1.33, OH = 0.99, OY = 0.03;   // screen opening
  const GW = 1.24, GH = 0.93;              // glass (4:3)

  function rrShape(w, h, r, cx = 0, cy = 0) {
    const s = new T.Shape(), x = cx - w / 2, y = cy - h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  function slab(w, h, d, r, bev, mat) {
    const g = new T.ExtrudeGeometry(rrShape(w - bev * 2, h - bev * 2, Math.max(.001, r - bev)), { depth: d - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 10 });
    g.translate(0, 0, -(d - bev * 2) / 2);
    return new T.Mesh(g, mat);
  }
  function rrPoints(w, h, r, n) {
    // evenly sampled rounded rectangle outline (counter clockwise), n points
    const pts = [], per = 2 * (w + h - 4 * r) + 2 * Math.PI * r;
    for (let i = 0; i < n; i++) {
      let s = i / n * per; const hw = w / 2 - r, hh = h / 2 - r;
      const segs = [[2 * hw, 'b'], [Math.PI / 2 * r, 'c1'], [2 * hh, 'r'], [Math.PI / 2 * r, 'c2'], [2 * hw, 't'], [Math.PI / 2 * r, 'c3'], [2 * hh, 'l'], [Math.PI / 2 * r, 'c4']];
      for (const [len, k] of segs) {
        if (s <= len) {
          const a = s / (r || 1);
          if (k === 'b') pts.push([-hw + s, -h / 2]);
          else if (k === 'c1') pts.push([hw + Math.sin(a) * r, -hh - Math.cos(a) * r]);
          else if (k === 'r') pts.push([w / 2, -hh + s]);
          else if (k === 'c2') pts.push([hw + Math.cos(a) * r, hh + Math.sin(a) * r]);
          else if (k === 't') pts.push([hw - s, h / 2]);
          else if (k === 'c3') pts.push([-hw - Math.sin(a) * r, hh + Math.cos(a) * r]);
          else if (k === 'l') pts.push([-w / 2, hh - s]);
          else pts.push([-hw - Math.cos(a) * r, -hh - Math.sin(a) * r]);
          break;
        }
        s -= len;
      }
    }
    return pts;
  }
  function loft(rings, mat) {
    // rings: [{w,h,r,y,z}], lofted along z with a closed cap on the last ring
    const n = 96, pos = [], idx = [];
    rings.forEach(R => rrPoints(R.w, R.h, R.r, n).forEach(([x, y]) => pos.push(x, y + R.y, R.z)));
    for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < n; i++) {
      const a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + i, d = (k + 1) * n + (i + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    const last = rings[rings.length - 1], ci = pos.length / 3; pos.push(0, last.y, last.z);
    const base = (rings.length - 1) * n; for (let i = 0; i < n; i++) idx.push(base + i, ci, base + (i + 1) % n);
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    return new T.Mesh(g, mat);
  }
  function labelTex(draw, w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const tx = new T.CanvasTexture(c); tx.colorSpace = T.SRGBColorSpace; tx.anisotropy = 4; return tx;
  }

  function build() {
    const plastic = new T.MeshStandardMaterial({ color: 0xDDD6C4, roughness: .5, metalness: 0, envMapIntensity: .9 });
    const plasticShade = new T.MeshStandardMaterial({ color: 0xD2CBB9, roughness: .58, metalness: 0, envMapIntensity: .8 });
    const lip = new T.MeshStandardMaterial({ color: 0xE4DDCC, roughness: .5, metalness: 0, envMapIntensity: .45 });
    const dark = new T.MeshStandardMaterial({ color: 0x2B2A27, roughness: .8 });
    root = new T.Group(); root.name = 'monitor';
    const front = new T.Group(); front.name = 'front'; root.add(front);

    // bezel with the screen opening cut out
    const bev = .022, depth = .12;
    const outer = rrShape(BW - bev * 2, BH - bev * 2, .06);
    const hole = rrShape(OW + bev * 2, OH + bev * 2, .045, 0, OY); outer.holes.push(hole);
    const bg = new T.ExtrudeGeometry(outer, { depth: depth - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 12 });
    bg.translate(0, 0, -(depth - bev));
    const bezel = new T.Mesh(bg, plastic); bezel.name = 'bezel'; front.add(bezel);

    // sloped inner frame between opening and glass
    const zA = -.018, zB = -.085, oa = [OW / 2, OH / 2], ga = [GW / 2 + .004, GH / 2 + .004];
    const ch = new T.BufferGeometry();
    const P = (sx, sy, a, z) => [sx * a[0], OY + sy * a[1], z];
    const quads = [[[-1, 1], [1, 1]], [[1, 1], [1, -1]], [[1, -1], [-1, -1]], [[-1, -1], [-1, 1]]];
    const cp = [];
    quads.forEach(([p, q]) => {
      const a = P(p[0], p[1], oa, zA), b = P(q[0], q[1], oa, zA), c = P(q[0], q[1], ga, zB), d = P(p[0], p[1], ga, zB);
      cp.push(...a, ...d, ...b, ...b, ...d, ...c);
    });
    ch.setAttribute('position', new T.Float32BufferAttribute(cp, 3)); ch.computeVertexNormals();
    front.add(new T.Mesh(ch, lip));

    // curved glass with the live screen
    screenTex = new T.CanvasTexture(SCREEN.canvas); screenTex.colorSpace = T.SRGBColorSpace; screenTex.anisotropy = 8;
    const gg = new T.PlaneGeometry(GW, GH, 40, 30), gp = gg.attributes.position;
    for (let i = 0; i < gp.count; i++) {
      const x = gp.getX(i) / (GW / 2), y = gp.getY(i) / (GH / 2);
      gp.setZ(i, .034 * (1 - x * x * .9) * (1 - y * y * .9));
    }
    gg.computeVertexNormals(); gg.translate(0, OY, zB - .002);
    const gm = new T.MeshBasicMaterial({ map: screenTex, toneMapped: false });
    glass = new T.Mesh(gg, gm); glass.name = 'glass'; front.add(glass);
    // soft glare like the one in the photo
    const glare = new T.Mesh(gg.clone(), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => {
        const g = c.createRadialGradient(w * .3, h * .22, 10, w * .3, h * .22, w * .55);
        g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      }, 256, 192), transparent: true, depthWrite: false, toneMapped: false
    }));
    glare.position.z = .003; front.add(glare);

    // control strip
    const sy = -.585;
    const recess = new T.MeshStandardMaterial({ color: 0xB9B4A7, roughness: .7 });
    const btnGeo = new T.CylinderGeometry(.017, .017, .024, 28); btnGeo.rotateX(Math.PI / 2);
    const ringGeo = new T.CircleGeometry(.022, 28);
    [-.11, -.037, .037, .11].forEach((x, i) => {
      const r = new T.Mesh(ringGeo, recess); r.scale.set(1.15, 1, 1); r.position.set(x, sy, .001); front.add(r);
      const b = new T.Mesh(btnGeo, lip); b.scale.set(1.1, 1, 1); b.position.set(x, sy, .006); b.name = 'btn' + i; b.userData = { ch: i, z: .006 };
      front.add(b); buttons.push(b);
    });
    const pr = new T.Mesh(new T.CircleGeometry(.045, 36), recess); pr.position.set(.49, sy + .005, .001); front.add(pr);
    power = new T.Mesh(new T.CylinderGeometry(.036, .036, .03, 36).rotateX(Math.PI / 2), lip);
    power.position.set(.49, sy + .005, .008); power.name = 'power'; power.userData = { z: .008 }; front.add(power);
    ledMat = new T.MeshBasicMaterial({ color: 0x5CC6FF, toneMapped: false });
    led = new T.Mesh(new T.SphereGeometry(.008, 16, 12), ledMat); led.position.set(.415, sy + .005, .002); front.add(led);

    // Opes badge (replaces the maker badge in the photo) and the script label
    const badge = new T.Mesh(new T.PlaneGeometry(.3, .075), new T.MeshStandardMaterial({
      map: labelTex((c, w, h) => {
        SCREEN.mark(c, 40, h / 2, 26, '#0A0C19', '#0094FF');
        c.font = '700 44px Aspekta, sans-serif'; c.fillStyle = '#0A0C19'; c.textBaseline = 'middle'; c.fillText('OPES', 84, h / 2 + 2);
      }, 320, 80), transparent: true, roughness: .5
    }));
    badge.position.set(-.5, -.57, .0015); front.add(badge);
    const script = new T.Mesh(new T.PlaneGeometry(.2, .05), new T.MeshStandardMaterial({
      map: labelTex((c, w, h) => {
        c.font = 'italic 400 40px Newsreader, Georgia, serif'; c.fillStyle = '#55534C'; c.textBaseline = 'middle'; c.fillText('bfcm 26', 8, h / 2);
      }, 240, 60), transparent: true, roughness: .5
    }));
    script.position.set(.35, -.53, .0015); front.add(script);

    // housing: shoulder box, tube bell, rear cap
    const shoulder = slab(1.54, 1.32, .36, .07, .03, plastic); shoulder.position.set(0, 0, -.12 - .18); root.add(shoulder);
    const bell = loft([
      { w: 1.46, h: 1.24, r: .1, y: 0, z: -.46 },
      { w: 1.3, h: 1.14, r: .14, y: .01, z: -.75 },
      { w: 1.02, h: .92, r: .16, y: .03, z: -1.14 },
      { w: .9, h: .84, r: .16, y: .03, z: -1.2 }
    ], plasticShade); bell.name = 'bell'; root.add(bell);
    const cap = slab(.84, .78, .14, .12, .03, plastic); cap.position.set(0, .03, -1.26); root.add(cap);
    // vents on the top of the bell
    const vent = new T.InstancedMesh(new T.BoxGeometry(.3, .01, .018), dark, 16);
    const m = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler();
    let k = 0;
    for (let row = 0; row < 8; row++) for (let side = -1; side <= 1; side += 2) {
      const z = -.5 - row * .03, t = (-.46 - z) / .29;
      const top = .62 - .04 * t;
      e.set(-Math.atan2(.04, .29), 0, 0); q.setFromEuler(e);
      m.compose(new T.Vector3(side * .25, top, z), q, new T.Vector3(1, 1, 1)); vent.setMatrixAt(k++, m);
    }
    root.add(vent);
    // swivel stand
    const neck = slab(.5, .2, .42, .06, .02, plasticShade); neck.position.set(0, -.66, -.55); root.add(neck);
    const prof = [[0, 0], [.97, 0], [1, .02], [.985, .05], [.9, .075], [.4, .09], [0, .092]].map(([x, y]) => new T.Vector2(x, y));
    const base = new T.Mesh(new T.LatheGeometry(prof, 72), plastic); base.scale.set(.5, 1, .46); base.position.set(0, -.8, -.46); root.add(base);

    // contact shadow + blue pool of light on the floor
    const floorY = -.8;
    const shadow = new T.Mesh(new T.PlaneGeometry(2.6, 2.2), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(0,0,0,.7)'); g.addColorStop(.5, 'rgba(0,0,0,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 256, 256),
      transparent: true, depthWrite: false
    }));
    shadow.name = 'shadow'; shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, floorY + .001, -.45); root.add(shadow);
    const pool = new T.Mesh(new T.PlaneGeometry(4.5, 3), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w * .5); g.addColorStop(0, 'rgba(0,148,255,.35)'); g.addColorStop(1, 'rgba(0,148,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 256, 256),
      transparent: true, depthWrite: false, toneMapped: false, blending: T.AdditiveBlending
    }));
    pool.name = 'pool'; pool.rotation.x = -Math.PI / 2; pool.position.set(0, floorY, .1); pool.scale.set(1, 1.5, 1); root.add(pool);

    root.traverse(o => { if (o.isMesh) o.userData.part = o.name; });
    return root;
  }

  function envMap() {
    const env = new T.Scene();
    const sky = new T.Mesh(new T.SphereGeometry(10, 32, 16), new T.MeshBasicMaterial({ side: T.BackSide, vertexColors: true }));
    const cols = [], p = sky.geometry.attributes.position, top = new T.Color(0x3a4460), bot = new T.Color(0x0A0C19), c = new T.Color();
    for (let i = 0; i < p.count; i++) { c.copy(bot).lerp(top, (p.getY(i) / 10 + 1) / 2); cols.push(c.r, c.g, c.b); }
    sky.geometry.setAttribute('color', new T.Float32BufferAttribute(cols, 3)); env.add(sky);
    const box = (col, int, pos, s) => { const m = new T.Mesh(new T.PlaneGeometry(s[0], s[1]), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(int), side: T.DoubleSide })); m.position.set(...pos); m.lookAt(0, 0, 0); env.add(m); };
    box(0xfff4e6, 3.2, [-4, 5, 5], [5, 3]);
    box(0x0094FF, 4, [6, 1, -4], [3, 6]);
    box(0xffffff, 1.4, [3, 4, 6], [3, 2]);
    const pm = new T.PMREMGenerator(renderer); const tex = pm.fromScene(env, .04).texture; pm.dispose(); return tex;
  }


  /* ---------- Project mode: the monitor turns into a projector ----------
     The monitor shrinks to the left and turns to face right, its glass lights up,
     a cone of light leaves the screen and a hologram of the same live screen
     unfolds on the right. Desktop and tablet only (the button is hidden under 900px). */
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const proj = { p: 0, target: 0, glitchUntil: 0, nextGlitch: 0 };
  let holo, holoMat, beam, beamGeo, beamMat, dust, dustGeo, lampMat;
  const DUST = 90, dustSeed = [];
  const GLASS_C = [[-1, 1], [1, 1], [1, -1], [-1, -1]].map(([x, y]) => new T.Vector3(x * GW / 2, OY + y * GH / 2, -.075));
  const HOLO_C = [[-.5, .375], [.5, .375], [.5, -.375], [-.5, -.375]].map(([x, y]) => new T.Vector3(x, y, 0));
  const src = GLASS_C.map(() => new T.Vector3()), dst = GLASS_C.map(() => new T.Vector3()), end = GLASS_C.map(() => new T.Vector3());
  const tmp = new T.Vector3(), tmp2 = new T.Vector3();
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const outQuart = v => 1 - Math.pow(1 - v, 4), outCubic = v => 1 - Math.pow(1 - v, 3);

  const HOLO_FS = `
    uniform sampler2D map; uniform float uTime, uReveal, uAlpha, uGlitch, uGlitchY, uDis;
    varying vec2 vUv;
    float hash(float n) { return fract(sin(n) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      uv.x += step(abs(uv.y - uGlitchY), .025) * uGlitch * .014;
      vec3 c = texture2D(map, uv).rgb;
      float lum = dot(c, vec3(.2126, .7152, .0722));
      vec3 tint = vec3(.05, .42, 1.);
      float key = smoothstep(.012, .085, lum);          // the dark screen background turns to clear air
      vec3 col = mix(c, tint * lum * 2.4, .32) * key;
      col *= .8 + .2 * sin(vUv.y * 1500.);
      float roll = exp(-pow((fract(vUv.y + uTime * .00008) - .5) * 12., 2.));
      col += tint * roll * (.05 + lum * .5);
      vec2 e = min(vUv, 1. - vUv); float m = min(e.x, e.y);
      float body = smoothstep(0., .04, m);
      float rim = 1. - smoothstep(.0, .005, m);
      float y = 1. - vUv.y;
      float shown = step(y, uReveal * 1.03);
      float lead = exp(-pow((y - uReveal) * 70., 2.)) * (1. - step(1., uReveal));
      float flick = .94 + .06 * hash(floor(uTime * .024));
      vec3 outc = (col * body + tint * rim * .9 + tint * .012 * body) * shown + vec3(.55, .85, 1.) * lead * 1.6;
      float hk = ((1. - vUv.y) * .6 + (1. - vUv.x) * .4) * .92 + .06;
      float cell = hash(floor(vUv.x * 110.) * 13.1 + floor(vUv.y * 82.) * 157.7);
      outc *= step(uDis, hk - cell * .08 + .04);
      gl_FragColor = vec4(outc * flick * uAlpha, 1.);
      #include <colorspace_fragment>
    }`;
  const BEAM_VS = `attribute float aT; attribute float aS; varying float vT; varying float vS;
    void main() { vT = aT; vS = aS; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;
  const BEAM_FS = `uniform float uAlpha, uTime; varying float vT; varying float vS;
    void main() {
      float edge = pow(abs(vS - .5) * 2., 6.);
      float fall = mix(.5, .14, vT) * smoothstep(0., .12, vT);
      float streak = .85 + .15 * sin(vT * 24. - uTime * .005);
      float a = (.06 + .5 * edge) * fall * streak * uAlpha;
      gl_FragColor = vec4(vec3(.2, .6, 1.) * a, 1.);
      #include <colorspace_fragment>
    }`;

  function buildProjection() {
    const add = { transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false };
    holoMat = new T.ShaderMaterial({
      uniforms: { map: { value: screenTex }, uTime: { value: 0 }, uReveal: { value: 0 }, uAlpha: { value: 0 }, uGlitch: { value: 0 }, uGlitchY: { value: .5 }, uDis: { value: -1 } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
      fragmentShader: HOLO_FS, ...add
    });
    holo = new T.Mesh(new T.PlaneGeometry(1, .75), holoMat); holo.visible = false; holo.renderOrder = 12; scene.add(holo);

    // cone of light: four open sides from the glass corners to the hologram corners
    beamGeo = new T.BufferGeometry();
    const aT = new Float32Array(16), aS = new Float32Array(16), idx = [];
    for (let f = 0; f < 4; f++) { const o = f * 4; aT.set([0, 0, 1, 1], o); aS.set([0, 1, 0, 1], o); idx.push(o, o + 1, o + 2, o + 1, o + 3, o + 2); }
    beamGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(48), 3));
    beamGeo.setAttribute('aT', new T.BufferAttribute(aT, 1)); beamGeo.setAttribute('aS', new T.BufferAttribute(aS, 1)); beamGeo.setIndex(idx);
    beamMat = new T.ShaderMaterial({ uniforms: { uAlpha: { value: 0 }, uTime: { value: 0 } }, vertexShader: BEAM_VS, fragmentShader: BEAM_FS, side: T.DoubleSide, ...add });
    beam = new T.Mesh(beamGeo, beamMat); beam.frustumCulled = false; beam.visible = false; beam.renderOrder = 11; scene.add(beam);

    // dust drifting down the beam
    dustGeo = new T.BufferGeometry();
    dustGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(DUST * 3), 3));
    dustGeo.setAttribute('color', new T.BufferAttribute(new Float32Array(DUST * 3), 3));
    for (let i = 0; i < DUST; i++) dustSeed.push({ u: Math.random(), v: Math.random(), ph: Math.random(), sp: .00012 + Math.random() * .00018 });
    const dot = labelTex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.4, 'rgba(160,220,255,.5)'); g.addColorStop(1, 'rgba(92,198,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 32, 32);
    dust = new T.Points(dustGeo, new T.PointsMaterial({ size: .028, map: dot, vertexColors: true, sizeAttenuation: true, ...add }));
    dust.frustumCulled = false; dust.visible = false; dust.renderOrder = 13; scene.add(dust);

    // the glass itself brightens like a lamp
    lampMat = new T.MeshBasicMaterial({ color: 0x5CC6FF, opacity: 0, ...add });
    const lamp = new T.Mesh(glass.geometry, lampMat); lamp.position.z = .004; glass.parent.add(lamp);
  }

  // where things sit in project mode, measured from the camera so it fits any desktop window
  function layout() {
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
    const dist = camera.position.length();
    const halfH = dist * tan, halfW = halfH * camera.aspect, upp = 2 * halfH / H;
    const top = 104, bot = 100;                       // clear the top bar and the channel buttons
    const cy = (H / 2 - (top + H - bot) / 2) * upp, availH = (H - top - bot) * upp;
    const margin = Math.max(64 * upp, halfW * .07);
    const s = Math.min(.34, availH / 3.6), mHalf = 1.02 * s;   // small, pressed up against the left edge
    const mx = -halfW + 4 * upp + .66 * s, my = cy - .12;
    const L = mx + mHalf + margin * .7, R = halfW - margin;
    let w = R - L, h = w * .75;
    if (h > availH) { h = availH; w = h / .75; }
    return { s, mx, my, hx: (L + R) / 2, hy: cy, w, dist };
  }
  function viewToWorld(x, y, dist, out) { return camera.localToWorld(out.set(x, y, -dist)); }

  function updateProjection(now, dt, pos) {
    const dur = REDUCE ? 260 : (proj.target ? 1500 : 850);
    const dir = Math.sign(proj.target - proj.p);
    if (dir) proj.p = clamp01(proj.p + dir * dt / dur);
    const p = proj.p;
    // three phases that overlap: monitor moves, light shoots out, picture unfolds (reverse order on the way back)
    const m = REDUCE ? proj.target : outQuart(clamp01(p / .5));
    const b = REDUCE ? p : outCubic(clamp01((p - .36) / .26));
    const r = REDUCE ? p : clamp01((p - .52) / .48);
    pos.m = m;
    if (p <= 0) { holo.visible = beam.visible = dust.visible = false; lampMat.opacity = 0; return; }

    const L = layout();
    viewToWorld(L.mx, L.my, L.dist, tmp);
    pos.x = tmp.x * m; pos.y = tmp.y * m; pos.s = 1 + (L.s - 1) * m;

    // hologram: grows out from its centre while a scan line draws it in, top to bottom
    const grow = REDUCE ? 1 : .1 + .9 * outCubic(clamp01(r * 1.5));
    viewToWorld(L.hx, L.hy + Math.sin(now / 1400) * .006, L.dist, holo.position);
    holo.quaternion.copy(camera.quaternion);
    holo.scale.setScalar(L.w * grow);
    holo.visible = r > 0;
    const u = holoMat.uniforms;
    u.uTime.value = now; u.uReveal.value = REDUCE ? 1 : r * 1.1; u.uAlpha.value = Math.min(1, r * 3);
    if (p === 1 && !REDUCE && now > proj.nextGlitch) { proj.glitchUntil = now + 90; proj.nextGlitch = now + 4000 + Math.random() * 7000; u.uGlitchY.value = Math.random(); }
    u.uGlitch.value = now < proj.glitchUntil ? (Math.random() * 2 - 1) : 0;

    // beam: starts at the glass, reaches out to the hologram corners
    return b;
  }
  function updateBeam(now, b) {
    if (!holo.visible && b <= 0) { beam.visible = dust.visible = false; lampMat.opacity = 0; return; }
    pivot.updateMatrixWorld(true); holo.updateMatrixWorld(true);
    GLASS_C.forEach((c, i) => { glass.localToWorld(src[i].copy(c)); holo.localToWorld(end[i].copy(HOLO_C[i])); dst[i].copy(src[i]).lerp(end[i], b); });
    const P = beamGeo.attributes.position.array;
    for (let f = 0; f < 4; f++) {
      const a = f, c = (f + 1) % 4, o = f * 12;
      [src[a], src[c], dst[a], dst[c]].forEach((v, k) => { P[o + k * 3] = v.x; P[o + k * 3 + 1] = v.y; P[o + k * 3 + 2] = v.z; });
    }
    beamGeo.attributes.position.needsUpdate = true;
    const flash = REDUCE ? 0 : Math.sin(Math.PI * b) * .9;
    const fade = clamp01(1 - dis * 2.4);
    beamMat.uniforms.uAlpha.value = b * (1 + flash) * (.92 + .08 * Math.sin(now / 700)) * fade;
    beamMat.uniforms.uTime.value = now;
    beam.visible = b > 0;
    lampMat.opacity = (.1 * b + .1 * flash) * fade;

    // dust motes
    dust.visible = b > .2 && !REDUCE;
    if (dust.visible) {
      const DP = dustGeo.attributes.position.array, DC = dustGeo.attributes.color.array;
      const bil = (q, u, v, out) => out.copy(q[0]).lerp(q[1], u).lerp(tmp2.copy(q[3]).lerp(q[2], u), v);
      dustSeed.forEach((d, i) => {
        const t = (now * d.sp + d.ph) % 1;
        bil(src, d.u, d.v, tmp); const x0 = tmp.x, y0 = tmp.y, z0 = tmp.z;
        bil(dst, d.u, d.v, tmp);
        DP[i * 3] = x0 + (tmp.x - x0) * t; DP[i * 3 + 1] = y0 + (tmp.y - y0) * t; DP[i * 3 + 2] = z0 + (tmp.z - z0) * t;
        const k = Math.sin(Math.PI * t) * b * .8 * fade;
        DC[i * 3] = .45 * k; DC[i * 3 + 1] = .8 * k; DC[i * 3 + 2] = k;
      });
      dustGeo.attributes.position.needsUpdate = true; dustGeo.attributes.color.needsUpdate = true;
    }
  }

  /* ---------- Scroll dissolve: the monitor breaks into tiny glowing pieces ----------
     As the visitor scrolls down, a sweep runs across the monitor from the top right corner.
     Everything behind the sweep is clipped away, and pieces sampled from those surfaces
     (the glass pieces take the colours of whatever is on screen) fly off up and to the right.
     The hologram does the same when it is showing. It is tied to the scroll position, so
     scrolling back up puts everything back together. */
  const DIS_W = .42, DIS_N = 9000, HOLO_N = 3200, EDGE = .045;
  const DIS_DIR = new T.Vector3(-.42, -1, -.18).normalize();
  let model, kMin = 0, kRange = 1, dis = 0, colored = false;
  // shared by every monitor material: the sweep burns a ragged, glowing edge across the surfaces
  const DU = { uDisP: { value: -1 }, uDisDir: { value: DIS_DIR }, uDisK: { value: new T.Vector2(0, 1) }, uDisInv: { value: new T.Matrix4() } };
  const DIS_NOISE = `
    float dH(vec3 p) { p = fract(p * .3183099 + .1); p *= 17.; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
    float dN(vec3 x) { vec3 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f);
      return mix(mix(mix(dH(i), dH(i + vec3(1, 0, 0)), f.x), mix(dH(i + vec3(0, 1, 0)), dH(i + vec3(1, 1, 0)), f.x), f.y),
                 mix(mix(dH(i + vec3(0, 0, 1)), dH(i + vec3(1, 0, 1)), f.x), mix(dH(i + vec3(0, 1, 1)), dH(i + vec3(1, 1, 1)), f.x), f.y), f.z); }`;
  function hookDissolve(mat) {
    mat.onBeforeCompile = sh => {
      Object.assign(sh.uniforms, DU);
      sh.vertexShader = 'uniform mat4 uDisInv; varying vec3 vDisPos;\n' + sh.vertexShader.replace('#include <project_vertex>',
        '#include <project_vertex>\n#ifdef USE_INSTANCING\n vDisPos = (uDisInv * modelMatrix * instanceMatrix * vec4(transformed, 1.)).xyz;\n#else\n vDisPos = (uDisInv * modelMatrix * vec4(transformed, 1.)).xyz;\n#endif');
      sh.fragmentShader = 'uniform float uDisP; uniform vec3 uDisDir; uniform vec2 uDisK; varying vec3 vDisPos;\n' + DIS_NOISE + '\n' +
        sh.fragmentShader.replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
          float dEdge = 0.;
          if (uDisP > -.5) {
            float dk = (dot(uDisDir, vDisPos) - uDisK.x) / uDisK.y - (dN(vDisPos * 9.) * .65 + dN(vDisPos * 23.) * .35) * ${(EDGE * 2).toFixed(3)} + ${EDGE.toFixed(3)};
            if (dk < uDisP) discard;
            dEdge = 1. - smoothstep(0., .015, dk - uDisP);
          }`)
        .replace('#include <dithering_fragment>', 'gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.62, .9, 1.), dEdge * .92);\n#include <dithering_fragment>');
    };
    mat.customProgramCacheKey = () => 'obf-dissolve';
    mat.needsUpdate = true;
  }
  let disPts, disMat, holoPts, holoPtsMat, floorMats = [];
  const glassIdx = [], glassUV = [], holoUV = [];
  const PIECE_VS = `attribute vec3 aVel; attribute float aKey; attribute float aSeed; attribute vec3 aCol;
    uniform float uP, uW, uSize, uScale;
    varying vec3 vCol; varying float vA;
    void main() {
      float l = (uP - aKey) / uW;
      float on = step(0., l) * step(l, 1.);
      l = clamp(l, 0., 1.);
      float e = l * (.3 + .7 * l);
      float sw = aSeed * 6.2831;
      vec3 p = position + aVel * e + vec3(sin(l * 7. + sw), cos(l * 5. + sw * 1.3), sin(l * 6. + sw * .7)) * .05 * l;
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = on > .5 ? projectionMatrix * mv : vec4(0., 0., 2., 1.);
      gl_PointSize = max(1., uSize * (.5 + aSeed) * (1. - .55 * l) * uScale / -mv.z);
      vCol = aCol;
      vA = on * (1. - l) * (1. - .3 * l) * smoothstep(0., .035, l + .004) * (1. + 2.2 * pow(1. - l, 6.));
    }`;
  const PIECE_FS = `varying vec3 vCol; varying float vA;
    void main() {
      vec2 d = gl_PointCoord - .5; float r = length(d);
      if (r > .5) discard;
      float core = smoothstep(.5, .0, r);
      float a = core * core * vA;
      gl_FragColor = vec4((vCol * 1.35 + vec3(.1, .3, .6) * .25) * a, 1.);
      #include <colorspace_fragment>
    }`;
  function pieceMat(size) {
    return new T.ShaderMaterial({
      uniforms: { uP: { value: -1 }, uW: { value: DIS_W }, uSize: { value: size }, uScale: { value: 400 } },
      vertexShader: PIECE_VS, fragmentShader: PIECE_FS,
      transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false
    });
  }
  function pieceGeo(n) {
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aVel', new T.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aCol', new T.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aKey', new T.BufferAttribute(new Float32Array(n), 1));
    g.setAttribute('aSeed', new T.BufferAttribute(new Float32Array(n), 1));
    return g;
  }

  function buildDissolve() {
    model.updateMatrixWorld(true);
    const inv = new T.Matrix4().copy(model.matrixWorld).invert(), rel = new T.Matrix4();
    const tris = []; let total = 0;
    const va = new T.Vector3(), vb = new T.Vector3(), vc = new T.Vector3(), e1 = new T.Vector3(), e2 = new T.Vector3();
    const neon = new T.Color(0x5CC6FF);
    const hooked = new Set();
    model.traverse(o => {
      if (!o.isMesh) return;
      if (!hooked.has(o.material)) { hooked.add(o.material); hookDissolve(o.material); if (!o.material.transparent) o.material.side = T.DoubleSide; }
      if (o.name === 'shadow' || o.name === 'pool') floorMats.push(o.material);
      if (o.isInstancedMesh || o.material.transparent) return;
      rel.multiplyMatrices(inv, o.matrixWorld);
      const g = o.geometry, P = g.attributes.position, I = g.index, UV = g.attributes.uv, isGlass = o === glass;
      const col = isGlass ? null : o.material.color.clone().lerp(neon, .25).multiplyScalar(.85);
      const n = I ? I.count : P.count;
      for (let i = 0; i + 2 < n; i += 3) {
        const ia = I ? I.getX(i) : i, ib = I ? I.getX(i + 1) : i + 1, ic = I ? I.getX(i + 2) : i + 2;
        va.fromBufferAttribute(P, ia).applyMatrix4(rel); vb.fromBufferAttribute(P, ib).applyMatrix4(rel); vc.fromBufferAttribute(P, ic).applyMatrix4(rel);
        e1.subVectors(vb, va).cross(e2.subVectors(vc, va));
        const area = e1.length() / 2; if (area < 1e-8) continue;
        total += area * (isGlass ? 4 : 1);
        tris.push({ a: va.clone(), b: vb.clone(), c: vc.clone(), n: e1.clone().normalize(), col, uv: isGlass ? [ia, ib, ic].map(k => [UV.getX(k), UV.getY(k)]) : null, cum: total });
      }
    });
    const geo = pieceGeo(DIS_N), A = geo.attributes, kv = new Float32Array(DIS_N), p = new T.Vector3();
    for (let i = 0; i < DIS_N; i++) {
      const r = Math.random() * total; let lo = 0, hi = tris.length - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (tris[mid].cum < r) lo = mid + 1; else hi = mid; }
      const tr = tris[lo]; let u1 = Math.random(), u2 = Math.random(); if (u1 + u2 > 1) { u1 = 1 - u1; u2 = 1 - u2; }
      p.copy(tr.a).addScaledVector(e1.subVectors(tr.b, tr.a), u1).addScaledVector(e2.subVectors(tr.c, tr.a), u2);
      A.position.setXYZ(i, p.x, p.y, p.z);
      kv[i] = DIS_DIR.dot(p);
      const sp = .5 + Math.random() * .95;
      A.aVel.setXYZ(i, (.6 + tr.n.x * .3 + (Math.random() - .5) * .7) * sp, (.8 + tr.n.y * .3 + (Math.random() - .5) * .6) * sp, (.3 + tr.n.z * .45 + (Math.random() - .5) * .6) * sp);
      A.aSeed.setX(i, Math.random());
      if (tr.uv) {
        const w0 = 1 - u1 - u2; glassIdx.push(i);
        glassUV.push(tr.uv[0][0] * w0 + tr.uv[1][0] * u1 + tr.uv[2][0] * u2, tr.uv[0][1] * w0 + tr.uv[1][1] * u1 + tr.uv[2][1] * u2);
        A.aCol.setXYZ(i, .3, .6, 1);
      } else A.aCol.setXYZ(i, tr.col.r, tr.col.g, tr.col.b);
    }
    kMin = Infinity; let kMax = -Infinity;
    kv.forEach(k => { kMin = Math.min(kMin, k); kMax = Math.max(kMax, k); });
    kRange = kMax - kMin || 1;
    kv.forEach((k, i) => A.aKey.setX(i, (k - kMin) / kRange + EDGE - Math.random() * EDGE * 2 - .01));
    DU.uDisK.value.set(kMin, kRange);
    disMat = pieceMat(.021);
    disPts = new T.Points(geo, disMat); disPts.frustumCulled = false; disPts.visible = false; disPts.renderOrder = 14; model.add(disPts);

    // the hologram's pieces, laid out on its plane (1 x .75, facing the camera)
    const hg = pieceGeo(HOLO_N), H2 = hg.attributes;
    for (let i = 0; i < HOLO_N; i++) {
      const u = Math.random(), v = Math.random(); holoUV.push(u, v);
      H2.position.setXYZ(i, u - .5, (v - .5) * .75, 0);
      const sp = .5 + Math.random() * .9;
      H2.aVel.setXYZ(i, (.26 + (Math.random() - .5) * .3) * sp, (.3 + (Math.random() - .5) * .28) * sp, (.3 + Math.random() * .3) * sp);
      H2.aKey.setX(i, ((1 - v) * .6 + (1 - u) * .4) * .92 + .06 - Math.random() * .08);
      H2.aSeed.setX(i, Math.random());
      H2.aCol.setXYZ(i, .3, .6, 1);
    }
    holoPtsMat = pieceMat(.024);
    holoPts = new T.Points(hg, holoPtsMat); holoPts.frustumCulled = false; holoPts.visible = false; holoPts.renderOrder = 15; holo.add(holoPts);
  }

  // colour the glass and hologram pieces from what the screen is showing right now
  function colourFromScreen() {
    const cv = SCREEN.canvas, W2 = cv.width, H2 = cv.height;
    let img; try { img = cv.getContext('2d').getImageData(0, 0, W2, H2).data; } catch (e) { return; }
    const lin = v => Math.pow(v / 255, 2.2);
    const paint = (attr, idx, uvs) => {
      for (let j = 0; j < idx.length; j++) {
        const x = Math.min(W2 - 1, uvs[j * 2] * W2 | 0), y = Math.min(H2 - 1, (1 - uvs[j * 2 + 1]) * H2 | 0), k = (y * W2 + x) * 4;
        attr.setXYZ(idx[j], Math.max(lin(img[k]), .03), Math.max(lin(img[k + 1]), .16), Math.max(lin(img[k + 2]), .42));
      }
      attr.needsUpdate = true;
    };
    paint(disPts.geometry.attributes.aCol, glassIdx, glassUV);
    const all = []; for (let i = 0; i < HOLO_N; i++) all.push(i);
    paint(holoPts.geometry.attributes.aCol, all, holoUV);
  }

  function applyDissolve() {
    if (!disPts) return;
    const uP = dis * (1 + DIS_W + .06) - .02;
    holoMat.uniforms.uDis.value = dis > 0 ? uP : -1;
    floorMats.forEach(m => { m.opacity = clamp01(1 - dis * 1.7); });
    if (dis <= 0) { DU.uDisP.value = -1; disPts.visible = holoPts.visible = false; colored = false; return; }
    if (!colored) { colourFromScreen(); colored = true; }
    model.updateMatrixWorld(true);
    DU.uDisInv.value.copy(model.matrixWorld).invert();
    DU.uDisP.value = uP;
    disPts.visible = holoPts.visible = !REDUCE;
    disMat.uniforms.uP.value = holoPtsMat.uniforms.uP.value = uP;
  }
  function pieceScale() {
    if (!disMat) return;
    const s = H * renderer.getPixelRatio() / 2;
    disMat.uniforms.uScale.value = holoPtsMat.uniforms.uScale.value = s;
  }

  function init(canvas) {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x0A0C19, 1);
    scene = new T.Scene(); scene.environment = envMap();
    camera = new T.PerspectiveCamera(30, 1, .1, 50);
    scene.add(new T.HemisphereLight(0xdfe8ff, 0x0A0C19, .55));
    const key = new T.DirectionalLight(0xfff1e0, 1.7); key.position.set(-2.5, 3, 4); scene.add(key);
    const rim = new T.DirectionalLight(0x0094FF, 3.2); rim.position.set(3, 1.2, -3); scene.add(rim);
    const rim2 = new T.DirectionalLight(0x5CC6FF, 1.4); rim2.position.set(-3, .5, -2.5); scene.add(rim2);
    const glow = new T.PointLight(0x5CC6FF, 1.2, 1.6, 2); glow.position.set(0, -.74, .55); scene.add(glow);
    pivot = new T.Group(); pivot.position.z = -.6; const m = build(); m.position.z = .6; pivot.add(m); scene.add(pivot);
    model = m;
    buildProjection();
    buildDissolve();
    resize();
    // 26/09: compile every shader now, including the hidden dissolve pieces, so the first frame
    // of the dissolve doesn't stall while the graphics card builds them
    const hv = [holo.visible, beam.visible, dust.visible]; disPts.visible = holoPts.visible = holo.visible = beam.visible = dust.visible = true;
    try { renderer.compile(scene, camera); } catch (e) {}
    disPts.visible = holoPts.visible = false; [holo.visible, beam.visible, dust.visible] = hv;
  }

  function resize() {
    const c = renderer.domElement; W = c.clientWidth || 1; H = c.clientHeight || 1;
    renderer.setSize(W, H, false); camera.aspect = W / H;
    compact = W < 640; SCREEN.setCompact(compact);
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
    const usableH = H - 150; // room for the top bar and the channel buttons
    const needH = compact ? 1.2 : 1.74;
    const dH = (needH / 2) / tan * (H / Math.max(usableH, H * .6));
    const needW = compact ? 1.34 : 1.9;
    const dW = (needW / 2) / (tan * camera.aspect);
    const d = Math.max(dH, dW);
    camera.position.set(0, compact ? .06 : .16, d);
    camera.lookAt(0, compact ? -.12 : -.04, 0);
    camera.updateProjectionMatrix();
    pieceScale();
  }

  function pick(clientX, clientY) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set((clientX - r.left) / r.width * 2 - 1, -(clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([glass, power, ...buttons], false)[0];
    if (!hit) return null;
    if (hit.object === glass && hit.uv) return { kind: 'glass', x: hit.uv.x * SCREEN.W, y: (1 - hit.uv.y) * SCREEN.H };
    if (hit.object === power) return { kind: 'power', obj: power };
    return { kind: 'button', obj: hit.object, ch: hit.object.userData.ch };
  }
  function press(obj) {
    obj.position.z = obj.userData.z - .012;
    setTimeout(() => { obj.position.z = obj.userData.z; }, 160);
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(64, now - last); last = now;
    if (!state.dragging && now - state.lastDrag > 2600) { state.spin *= .94; }
    state.rotY += (state.tRotY + state.spin - state.rotY) * .08;
    state.rotX += (state.tRotX - state.rotX) * .08;
    // entrance
    if (state.riseT < 1) state.riseT = Math.min(1, (now - state.riseStart) / 1400);
    const e = 1 - Math.pow(1 - state.riseT, 4);
    const pos = { m: 0, x: 0, y: 0, s: 1 };
    const b = updateProjection(now, dt, pos) || 0;
    const calm = 1 - .75 * pos.m;                    // less mouse tilt while projecting
    pivot.position.x = pos.x;
    pivot.position.y = (1 - e) * -1.6 + pos.y;
    pivot.scale.setScalar(pos.s);
    pivot.rotation.y = state.rotY * calm + (1 - e) * -1.1 + pos.m * .78;
    pivot.rotation.x = state.rotX * calm;
    ledMat.color.setHex(SCREEN.isOn ? 0x5CC6FF : 0xFFB547);
    SCREEN.frame(now, dt);
    screenTex.needsUpdate = true;
    updateBeam(now, b);
    applyDissolve();
    renderer.render(scene, camera);
  }

  return {
    init, resize, frame, pick, press, state,
    riseIn() { state.riseT = 0; state.riseStart = performance.now(); },
    pressCh(i) { if (buttons[i]) press(buttons[i]); },
    get compact() { return compact; },
    setProject(on) { proj.target = on ? 1 : 0; if (on) { state.spin = 0; proj.nextGlitch = performance.now() + 5000; } },
    get projecting() { return proj.target === 1; },
    setDissolve(v) { const n = clamp01(v); if (n > 0 && !colored && disPts) { colourFromScreen(); colored = true; } dis = n; },
    get dissolve() { return dis; }
  };
})(); }

/* ============ Orchestration for the live site ============ */
(() => {
  const END = Date.UTC(2026, 11, 1, 0);            // the gift disappears after Cyber Monday
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js';
  // black-friday.html carries data-bfcm-page: there the wrapping paper IS the page,
  // so no hidden gifts, it opens on load, and closing goes back to the homepage.
  const PAGE = document.body.hasAttribute('data-bfcm-page');
  if (!PAGE && Date.now() >= END && location.hash !== '#black-friday') return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = document.createElement('div');
  wrap.innerHTML = GIFT_HTML + OVERLAY_HTML.replace('__PLAYBOOK__', PLAYBOOK_HTML);
  // How many gifts hide on a page: set with data-bfcm-gifts on <body>. Big pages use 2, everything else 1.
  const COUNT = Math.max(1, Math.min(2, parseInt(document.body.dataset.bfcmGifts, 10) || 1));
  const gift0 = wrap.querySelector('.obf-gift'), bf = wrap.querySelector('.obf');
  const gifts = [gift0];
  for (let i = 1; i < COUNT; i++) gifts.push(gift0.cloneNode(true));
  gifts.forEach(g => { g.removeAttribute('id'); if (!PAGE) document.body.appendChild(g); });
  document.body.appendChild(bf);
  const $ = s => bf.querySelector(s);
  if (PAGE) {
    // On black-friday.html the offer title is the page's main heading, and booking stays in the same tab.
    const h2 = bf.querySelector('#obf-offerTitle');
    if (h2) { const h1 = document.createElement('h1'); h1.id = h2.id; h1.className = h2.className; h1.innerHTML = h2.innerHTML; h2.replaceWith(h1); }
    bf.querySelectorAll('a[target="_blank"][href*="book.html"]').forEach(a => { a.removeAttribute('target'); a.removeAttribute('rel'); a.setAttribute('href', 'book.html'); });
  }
  const pin = $('#obf-pin'), plan = $('#obf-plan'), scrollCue = $('#obf-scrollCue');
  const stage = $('#obf-stage'), gl = $('#obf-gl'), paperEl = $('#obf-paper'), tearHint = $('#obf-tearHint'), hand = $('#obf-hand');
  const chans = [...bf.querySelectorAll('#obf-channels button')];
  // Project button: turns the monitor into a projector. Added here so the channel list above stays untouched.
  $('#obf-channels').insertAdjacentHTML('beforeend',
    '<span class="obf-sep" aria-hidden="true"></span>' +
    '<span class="obf-project-wrap"><span class="obf-project-tip" id="obf-projectTip" aria-hidden="true">See it on the big screen</span>' +
    '<button type="button" class="obf-project" id="obf-project" aria-pressed="false" aria-keyshortcuts="P" title="Project the screen (P)">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 9.5 22 5v14l-8.5-4.5" fill="currentColor" opacity=".35"/><rect x="2" y="7" width="12" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8" cy="12" r="2.4" fill="currentColor"/><path d="M5 19.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    '<span class="obf-project-label">Project</span></button></span>');
  const projBtn = $('#obf-project'), projTip = $('#obf-projectTip'), projLabel = projBtn.querySelector('.obf-project-label');
  const dragNote = $('.obf-drag-note'), NOTE = dragNote.textContent, GL_LABEL = gl.getAttribute('aria-label');
  const roomToProject = matchMedia('(min-width: 900px)');   // never on phones
  let tipTimer = 0;
  let opened = false, started = false, paperReady = false, raf = 0, lastFocus = null, threeReady = null;

  (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    SCREEN.mark(c.getContext('2d'), 70, 64, 50, '#EAF2FB', '#0094FF');
    $('#obf-markSvg').innerHTML = `<image href="${c.toDataURL()}" width="64" height="64"/>`;
  })();

  /* ---- hide the gift somewhere new on every page load, away from text, images and controls ---- */
  const AVOID = 'h1,h2,h3,h4,h5,h6,p,a,button,img,picture,video,iframe,input,textarea,select,label,li,blockquote,figure,table,nav,header,footer,span,small,strong,em,svg,i,[role="button"]';
  function placeGift() {
    gifts.forEach(g => { g.hidden = true; });
    const sx = scrollX, sy = scrollY, W = document.documentElement.clientWidth, H = document.documentElement.scrollHeight, s = 58;
    const avoid = [];
    document.querySelectorAll(AVOID).forEach(el => {
      if (bf.contains(el)) return;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      avoid.push({ x: r.left + sx - 16, y: r.top + sy - 16, w: r.width + 32, h: r.height + 32 });
    });
    // spread the gifts out: each one gets its own band of the page
    const top = 120, span = Math.max(10, H - s - 400) / gifts.length;
    gifts.forEach((g, k) => {
      let best = null;
      for (let i = 0; i < 200; i++) {
        const x = 16 + Math.random() * (W - s - 32), y = top + k * span + Math.random() * span;
        if (!avoid.some(a => x < a.x + a.w && x + s > a.x && y < a.y + a.h && y + s > a.y)) { best = { x, y }; break; }
      }
      if (!best) best = { x: k % 2 ? 24 : W - s - 24, y: top + k * span + span / 2 };
      avoid.push({ x: best.x - 40, y: best.y - 40, w: s + 80, h: s + 80 });
      g.style.left = best.x + 'px'; g.style.top = best.y + 'px';
      g.hidden = false;
    });
  }
  if (!PAGE) { if (document.readyState === 'complete') setTimeout(placeGift, 600); else addEventListener('load', () => setTimeout(placeGift, 600)); }
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (!opened) { if (!PAGE) placeGift(); } else resize(); }, 200); });

  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (threeReady) return threeReady;
    threeReady = new Promise((ok, fail) => {
      const s = document.createElement('script'); s.src = THREE_URL; s.async = true;
      s.onload = ok; s.onerror = fail; document.head.appendChild(s);
    });
    return threeReady;
  }
  // start fetching the 3D library when someone gets close to the gift
  gifts.forEach(g => { g.addEventListener('pointerenter', loadThree, { once: true }); g.addEventListener('focus', loadThree, { once: true }); });

  /* ---- open and close ---- */
  async function open() {
    if (opened) return; opened = true; lastFocus = document.activeElement;
    bf.hidden = false; document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => bf.classList.add('obf-on'));
    bf.scrollTop = 0; resetDis(); stage.classList.remove('obf-revealed'); tearHint.classList.remove('obf-gone');
    if (!paperReady) { paperReady = true; PAPER.setup(paperEl, $('#obf-paperCanvas'), reveal); }
    PAPER.reset();
    hand.style.left = (stage.clientWidth * .32) + 'px'; hand.style.top = (stage.clientHeight * .62) + 'px';
    hand.classList.remove('obf-play'); void hand.getBoundingClientRect(); if (!reduce) hand.classList.add('obf-play');
    setTimeout(() => $('#obf-autoTear').focus({ preventScroll: true }), 400);
    try { await loadThree(); } catch (e) { gl.hidden = true; return; }
    if (!started) { started = true; makeMonitor(); MONITOR.init(gl); bindGL(); }
    SCREEN.setTab(0, true); SCREEN.power(true); syncChans(); setProject(false);
    MONITOR.resize(); MONITOR.setDissolve(reduce ? 0 : dis); loop();
  }
  function close() {
    if (PAGE) { location.href = 'index.html'; return; }
    if (!opened) return; opened = false;
    bf.classList.remove('obf-on'); document.documentElement.style.overflow = '';
    setTimeout(() => { bf.hidden = true; cancelAnimationFrame(raf); }, 350);
    if (location.hash === '#black-friday') history.replaceState(null, '', location.pathname + location.search);
    lastFocus?.focus?.();
    placeGift();
  }
  function reveal() {
    stage.classList.add('obf-revealed'); tearHint.classList.add('obf-gone'); hand.classList.remove('obf-play');
    if (window.MONITOR && !reduce) MONITOR.riseIn();
    SCREEN.power(false);
    setTimeout(() => SCREEN.power(true), reduce ? 0 : 450);
    setTimeout(() => chans[0].focus({ preventScroll: true }), 900);
    // one nudge towards the Project button, then it gets out of the way
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => {
      if (!roomToProject.matches || (window.MONITOR && MONITOR.projecting)) return;
      projTip.classList.add('obf-show');
      tipTimer = setTimeout(hideTip, 6000);
    }, 2600);
    try { window.fbq && fbq('trackCustom', 'BlackFridayGiftOpened'); } catch (e) {}
  }
  gifts.forEach(g => g.addEventListener('click', open));
  $('#obf-bfClose').addEventListener('click', close);
  $('#obf-backToSite').addEventListener('click', close);
  $('#obf-autoTear').addEventListener('click', () => { tearHint.classList.add('obf-gone'); PAPER.auto(); });
  document.addEventListener('paper:start', () => { tearHint.classList.add('obf-gone'); hand.classList.remove('obf-play'); });
  addEventListener('keydown', e => {
    if (!opened) return;
    if (e.key === 'Escape' && window.MONITOR && MONITOR.projecting) { setProject(false); projBtn.focus({ preventScroll: true }); return; }
    if (e.key === 'Escape' && !PAGE) close();
    if (PAPER.done && window.MONITOR && (e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey && !e.altKey && roomToProject.matches) setProject(!MONITOR.projecting);
    if (PAPER.done && /^[1-4]$/.test(e.key) && !e.metaKey && !e.ctrlKey) setChannel(+e.key - 1);
  });
  bf.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = [...bf.querySelectorAll('button,a[href]')].filter(el => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* ---- channels ---- */
  function syncChans() { chans.forEach((b, i) => b.setAttribute('aria-pressed', String(i === SCREEN.tab))); }
  function setChannel(i) { if (!SCREEN.isOn) SCREEN.power(true); SCREEN.setTab(i); syncChans(); }
  chans.forEach(b => b.addEventListener('click', () => { const i = +b.dataset.ch; setChannel(i); window.MONITOR && MONITOR.pressCh(i); }));

  /* ---- scroll: a small scroll down sets off the dissolve, scrolling back up rebuilds it ----
     26/09: the dissolve used to be tied to the scroll position, so every scroll event pushed a
     new frame of the effect and it stuttered when the visitor stopped halfway. Now the scroll
     only flips a switch and the effect plays on its own clock, start to finish.
       Scroll DOWN past DIS_OUT_AT px   the monitor breaks apart, then the page glides to the plan
       Scroll UP into the monitor area  (the first 45vh of the page) it builds itself back and
                                        the page glides back to the top
       DIS_OUT_MS / DIS_IN_MS           how long each direction takes
       DIS_GLIDE_MS                     when the glide to the plan starts, 0 turns it off */
  const DIS_OUT_AT = 30, DIS_OUT_MS = 1600, DIS_IN_MS = 1200, DIS_GLIDE_MS = 900;
  let dis = 0, disTarget = 0, disRaf = 0, lastY = 0, glideT = 0;
  const easeInOut = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const easeOut = k => 1 - Math.pow(1 - k, 3);
  const planTop = () => plan.offsetTop + parseFloat(getComputedStyle(plan).paddingTop) - 40;
  function setDis(d) {
    dis = d;
    stage.style.setProperty('--obf-d', d.toFixed(4));
    stage.classList.toggle('obf-dissolving', d > 0);
    stage.classList.toggle('obf-gone-ui', d > .25);
    if (window.MONITOR && started) MONITOR.setDissolve(reduce ? 0 : d);
    if (reduce) gl.style.opacity = String(1 - d);
  }
  function playDissolve(to) {
    if (to === disTarget) return;
    disTarget = to;
    cancelAnimationFrame(disRaf);
    if (to) hideTip();
    const from = dis, t0 = performance.now();
    // if it is reversed halfway, the way back only takes as long as the part already played
    const dur = (reduce ? 350 : (to ? DIS_OUT_MS : DIS_IN_MS)) * Math.max(.2, Math.abs(to - from));
    const ease = to ? easeInOut : easeOut;
    const step = now => {
      const k = Math.max(0, Math.min(1, (now - t0) / dur));
      setDis(from + (to - from) * ease(k));
      if (k < 1) disRaf = requestAnimationFrame(step);
    };
    disRaf = requestAnimationFrame(step);
  }
  function resetDis() { cancelAnimationFrame(disRaf); clearTimeout(glideT); disTarget = 0; lastY = 0; setDis(0); }
  function onScroll() {
    const y = bf.scrollTop, dir = y - lastY; lastY = y;
    const monitorZone = Math.max(1, pin.offsetHeight - stage.offsetHeight);
    if (!disTarget && dir > 0 && y > DIS_OUT_AT) {
      playDissolve(1);
      clearTimeout(glideT);
      // the plan rises in over the last of the pieces, unless the visitor has already scrolled there
      if (DIS_GLIDE_MS) glideT = setTimeout(() => {
        const top = planTop();
        if (disTarget && bf.scrollTop < top - 60) bf.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      }, reduce ? 0 : DIS_GLIDE_MS);
    } else if (disTarget && dir < 0 && y <= monitorZone) {
      clearTimeout(glideT);
      playDissolve(0);
      // and glide back up so the whole monitor, buttons included, is in view again
      if (DIS_GLIDE_MS && y > 0) bf.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  bf.addEventListener('scroll', onScroll, { passive: true });
  scrollCue.addEventListener('click', () => {
    bf.scrollTo({ top: planTop(), behavior: reduce ? 'auto' : 'smooth' });
  });
  // each part of the plan rises in as it arrives
  const riseIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('obf-in'); riseIO.unobserve(e.target); } }), { root: bf, threshold: .05 });
  bf.querySelectorAll('.obf-rise').forEach(el => riseIO.observe(el));

  /* ---- project mode ---- */
  function hideTip() { clearTimeout(tipTimer); projTip.classList.remove('obf-show'); }
  function setProject(on) {
    on = !!on && roomToProject.matches && !!window.MONITOR && PAPER.done;
    if (window.MONITOR) MONITOR.setProject(on);
    if (on && !SCREEN.isOn) SCREEN.power(true);
    projBtn.setAttribute('aria-pressed', String(on));
    projLabel.textContent = on ? 'Back to monitor' : 'Project';
    projBtn.title = on ? 'Back to the monitor (P)' : 'Project the screen (P)';
    stage.classList.toggle('obf-projecting', on);
    dragNote.textContent = on ? 'Projecting the screen \u00b7 change channel with the buttons below' : NOTE;
    gl.setAttribute('aria-label', on ? 'The Opes monitor is projecting its screen as a large hologram. Use the channel buttons below to change what it shows.' : GL_LABEL);
    hideTip();
  }
  projBtn.addEventListener('click', () => { setProject(!(window.MONITOR && MONITOR.projecting)); try { window.fbq && projBtn.getAttribute('aria-pressed') === 'true' && fbq('trackCustom', 'BlackFridayProjected'); } catch (e) {} });
  roomToProject.addEventListener?.('change', () => { if (!roomToProject.matches) setProject(false); });

  /* ---- pointer on the 3D monitor ---- */
  function bindGL() {
    const st = MONITOR.state; let down = null;
    gl.addEventListener('pointermove', e => {
      if (down) {
        const dx = e.clientX - down.x;
        if (Math.abs(dx) > 4) down.moved = true;
        if (MONITOR.projecting) return;
        st.spin = down.spin + dx * .008; st.lastDrag = performance.now(); st.dragging = true;
        return;
      }
      if (e.pointerType === 'mouse' && !reduce) {
        const r = gl.getBoundingClientRect();
        st.tRotY = ((e.clientX - r.left) / r.width - .5) * .5;
        st.tRotX = ((e.clientY - r.top) / r.height - .5) * .14;
      }
      const hit = MONITOR.pick(e.clientX, e.clientY);
      const clickable = hit && (hit.kind !== 'glass' || SCREEN.hitTest(hit.x, hit.y) !== null);
      gl.style.cursor = clickable ? 'pointer' : 'grab';
    });
    gl.addEventListener('pointerdown', e => { down = { x: e.clientX, spin: st.spin, moved: false }; gl.setPointerCapture?.(e.pointerId); });
    const end = e => {
      if (!down) return;
      const wasDrag = down.moved; down = null; st.dragging = false; st.lastDrag = performance.now();
      if (wasDrag || e.type !== 'pointerup') return;
      const hit = MONITOR.pick(e.clientX, e.clientY);
      if (!hit || !PAPER.done) return;
      if (hit.kind === 'button') { MONITOR.press(hit.obj); setChannel(hit.ch); }
      else if (hit.kind === 'power') { MONITOR.press(hit.obj); SCREEN.power(!SCREEN.isOn); }
      else { const t = SCREEN.hitTest(hit.x, hit.y); if (t !== null) setChannel(t); }
    };
    gl.addEventListener('pointerup', end); gl.addEventListener('pointercancel', end);
    gl.addEventListener('pointerleave', () => { if (!down) { st.tRotY = 0; st.tRotX = 0; } });
  }
  function resize() { if (window.MONITOR && started) MONITOR.resize(); if (!PAPER.done) PAPER.size(); }

  let stageVisible = true;
  new IntersectionObserver(es => { stageVisible = es[0].isIntersecting; }).observe(stage);
  function loop() {
    cancelAnimationFrame(raf);
    const tick = now => { if (!opened) return; if (stageVisible) MONITOR.frame(now); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }

  const foot = () => { const r = SCREEN.bfIn(); $('#obf-footCount').textContent = `Black Friday in ${r.d} days, ${r.h} hours`; };
  foot(); setInterval(foot, 30000);

  // opesconsulting.london/#black-friday opens the gift straight away (handy for ads and emails)
  const fromHash = () => { if (PAGE || location.hash === '#black-friday') open(); };
  addEventListener('hashchange', fromHash);
  if (document.readyState === 'complete') setTimeout(fromHash, 300); else addEventListener('load', () => setTimeout(fromHash, 300));
})();

})();
