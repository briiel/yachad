# Website Specification & Development Brief

## Website Identity & Branding
* **English Site Title & Logo Text:** Yachad - Holy Tales for Jewish Kids
* **Hebrew Site Title & Logo Text:** יחד - סיפורי צדיקים לילדים
* **Domain:** Holy Tales for Kids

---

## 1. General Architecture & Global Settings
* **Bilingual Setup:** The website must be built in two completely separate, independent language versions:
  * **Hebrew (RTL - Right to Left)**
  * **English (LTR - Left to Right)**
* **Consistent Background:** A single primary background image (provided separately) must be applied consistently across all pages of the website.
* **Content Paywall (Members Only):**
  * All media, quizzes, and craft sheets are restricted to paid active subscribers only.
  * Non-subscribed visitors can browse the page previews. However, clicking to play any video or opening any quiz/craft file triggers a blocking modal directing them to the subscription checkout page.
  * **Blocking Overlay Button / Message:**
    * **English:** Subscribers Only – Subscribe Now
    * **Hebrew:** למנויים בלבד – הירשם עכשיו

---

## 2. Splash / Language Selection Page (Entry Screen)
* **Purpose:** Initial landing screen welcoming visitors to select their preferred language.
* **Layout:** Full-screen hero layout using the designated master background image with two distinct buttons:
  * **Right Button (Directs to Hebrew site):**
    * Display text: `עברית (Hebrew)`
  * **Left Button (Directs to English site):**
    * Display text: `English (English)`

---

## 3. Main Navigation Bar (Header)
Pinned at the top across all pages, containing 5 main navigation links:
1. **Subscription:**
   * English: `Subscription`
   * Hebrew: `מנויים`
2. **Videos:**
   * English: `Videos`
   * Hebrew: `סרטונים`
3. **Quizzes & Crafts:**
   * English: `Quizzes & Crafts`
   * Hebrew: `חידונים ויצירה`
4. **Shop:**
   * English: `Shop`
   * Hebrew: `חנות`
5. **Contact Us:**
   * English: `Contact Us`
   * Hebrew: `צור קשר`

---

## 4. Detailed Page Specifications

### Page 1: Subscription (Pricing & Checkout)
* **Overview:** Features the global background, an attractive visual Pricing Card showcasing core benefits, and an intake form before redirecting to the payment gateway.
* **Header Title:**
  * English: `Subscription Plans`
  * Hebrew: `מנויים`

#### Pricing Card Elements:
* **Plan Name:**
  * English: `All-Access Monthly Pass`
  * Hebrew: `מנוי חודשי מלא`
* **Price Display:**
  * English Site: `$11.99 / Month`
  * Hebrew Site: `₪35 / לחודש`
* **Sub-caption:**
  * English: `No commitment • Cancel anytime`
  * Hebrew: `ללא התחייבות • ביטול בכל עת`
* **Core Value Propositions (Checklist bullet items):**
  * **Video library access:**
    * English: `Unlimited access to the full video library – 100% ad-free in a safe, clean environment for kids`
    * Hebrew: `גישה בלתי מוגבלת לכל מאגר הסרטונים – 100% ללא פרסומות בסביבה נקייה ובטוחה לילדים`
  * **Content frequency:**
    * English: `Exciting new content added every week`
    * Hebrew: `תכנים חדשים ומרתקים שעולים מדי שבוע`
  * **Quizzes:**
    * English: `Interactive quizzes for every video & episode`
    * Hebrew: `חידונים אינטראקטיביים לכל פרק וסרטון`
  * **Craft sheets:**
    * English: `High-quality printable craft & coloring sheets`
    * Hebrew: `דפי יצירה וצביעה איכותיים מוכנים להדפסה`
* **Pricing Card Action Button:**
  * English: `Join Now`
  * Hebrew: `הצטרפו עכשיו`
* **Future Extension Slot:** Reserve a UI container/placeholder for a future "Premium Tier" ($14.99 / ₪49 per month).

#### Subscriber Intake Form:
Clicking the action button displays the required subscriber fields before handoff to payment:
* **Email address:** Email / `דוא"ל`
* **Phone number:** Phone Number / `מספר טלפון`
* **Number of children in the family:** Number of Children / `מספר ילדים במשפחה`
* **City & State (US):** City & State (US) / `עיר ומדינה בארה"ב`
* **Submit & Proceed Button:**
  * English: `Proceed to Payment`
  * Hebrew: `המשך לתשלום`
  * *Note for Developer:* Connect this trigger to external payment processing URL.

---

### Page 2: Videos (Main Content Hub)
* **Layout:** Grid arrangement presenting 3 videos per row.
* **Per-Video Card Structure:**
  1. Embedded Video Player with clean playback controls (Play / Pause).
  2. Two action buttons positioned directly beneath each player:
     * **Button 1 (Quiz link):**
       * English: `Quiz`
       * Hebrew: `חידון`
     * **Button 2 (Craft Sheets link):**
       * English: `Craft Sheets`
       * Hebrew: `דפי יצירה`
* **Linking Logic:** Each button redirects dynamically to the dedicated sub-page (or downloadable resource) created specifically for that individual episode.

---

### Page 3: Quizzes & Crafts (Fast-Access Directory)
* **Purpose:** A lightweight, quick-loading directory for children and parents to jump straight into activities without loading video streams.
* **Layout:** Compact horizontal banners arranged in a grid, each featuring the episode thumbnail and title.
* **Action Buttons Under Each Item:**
  * English: `Quiz` | Hebrew: `חידון`
  * English: `Craft Sheets` | Hebrew: `דפי יצירה`
* **Routing:** Links direct to the identical quiz/craft endpoints as Page 2.

---

### Page 4: Shop
* **Architecture:** Category-based architecture ready for catalog scalability.
* **Category Landing Screen:**
  * **Featured Category Banner/Card:**
    * English: `Comics for Sale`
    * Hebrew: `קומיקסים למכירה`
    * Displays the comic collection cover graphic.
* **Product Catalog Screen (Upon clicking category):**
  * Grid layout showing 3 items per row.
  * Each product card includes: Product image, Book title, and Price.
  * **Purchase Button:**
    * English: `Buy Now - $[Price]` (e.g., `Buy Now - $14.99`)
    * Hebrew: `קנה עכשיו - ₪[מחיר]` (לדוגמה: `קנה עכשיו - ₪45`)

---

### Page 5: Contact Us (Compliance & Support)
* **Purpose:** Complete customer care and payment gateway verification compliance.
* **Page Header:**
  * English: `Contact Us`
  * Hebrew: `צור קשר`
* **Inquiry Form:**
  * Full Name field: `Full Name` / `שם מלא`
  * Email address field: `Email` / `דוא"ל`
  * Inquiry Subject dropdown (`Subject` / `נושא הפנייה`):
    * Customer Support
    * Inquiries & Feedback
    * Billing & Cancellations
  * Message body: `Message` / `תוכן ההודעה`
  * **Submit Button:**
    * English: `Send Message`
    * Hebrew: `שלח הודעה`
* **Direct Support Channels:**
  * Dedicated Support Email: `Support Email` / `דוא"ל לתמיכה`
  * WhatsApp / Phone Customer Service line: `WhatsApp & Phone Support` / `וואטסאפ וטלפון לשירות לקוחות`
* **Policy Footer/Section:**
  * Clear section covering terms, returns, and order cancellations.
  * **Policy Header:**
    * English: `Refund & Cancellation Policy`
    * Hebrew: `מדיניות החזרים וביטולים`
