export type Language = 'en' | 'he';

export interface Episode {
  id: string;
  title: string;
  hebrewTitle: string;
  duration: string;
  description: string;
  hebrewDescription: string;
  thumbnail: string;
  videoUrl: string;
  badge: string;
  hebrewBadge: string;
  isFree: boolean;
}

export interface Song {
  id: string;
  episodeId: string;
  title: string;
  hebrewTitle: string;
  duration: string;
  audioUrl: string;
  thumbnail: string;
  isFree: boolean;
  lyricsHighlight: string;
  hebrewLyricsHighlight: string;
}

export interface ComicProduct {
  id: string;
  title: string;
  hebrewTitle: string;
  priceUSD: number;
  priceILS: number;
  image: string;
  description: string;
  hebrewDescription: string;
}

export interface QuizQuestion {
  question: string;
  hebrewQuestion: string;
  options: string[];
  hebrewOptions: string[];
  correctIndex: number;
}

export const SITE_INFO = {
  en: {
    title: 'Yachad - Holy Tales for Jewish Kids',
    tagline: 'Inspiring Jewish stories, holy values, and fun activities for children',
    domain: 'Holy Tales for Kids',
  },
  he: {
    title: 'יחד - סיפורי צדיקים לילדים',
    tagline: 'סיפורי צדיקים מרתקים, ערכים ופעילויות מהנות לילדי ישראל',
    domain: 'סיפורי צדיקים לילדים',
  },
};

export const EPISODES: Episode[] = [
  {
    id: 'ep-1',
    title: 'The Kind Baker of Tzfat',
    hebrewTitle: 'האופה מטבריה וצפת',
    duration: '14:20',
    description: 'A heartwarming story about the holy tzaddik who baked challah for the poor every Friday with pure joy and love.',
    hebrewDescription: 'סיפור מרגש ומרומם על הצדיק הקדוש שהיה אופה חלות לשבת ומחלקן לעניים בשמחה ובאהבת ישראל אמיתית.',
    thumbnail: '/images/video_thumb_1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    badge: 'Episode 1',
    hebrewBadge: 'פרק 1',
    isFree: true,
  },
  {
    id: 'ep-2',
    title: 'The Lost Treasure of Jerusalem',
    hebrewTitle: 'האוצר האבוד בירושלים',
    duration: '18:45',
    description: 'Two curious siblings discover the secret of true inner riches through a mysterious parchment found in the Old City.',
    hebrewDescription: 'שני אחים סקרנים מגלים את סוד העושר הפנימי האמיתי דרך מגילה עתיקה שנמצאה בין סמטאות העיר העתיקה.',
    thumbnail: '/images/comics_cover.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    badge: 'Episode 2',
    hebrewBadge: 'פרק 2',
    isFree: true,
  },
  {
    id: 'ep-3',
    title: "The Ark of Wonders & Noah's Dove",
    hebrewTitle: 'תיבת הפלאים ויונת נח',
    duration: '16:10',
    description: 'Travel aboard the majestic ark with Noah and discover how caring for every animal brings peace, faith, and lasting holy blessings.',
    hebrewDescription: 'מסע מופלא אל תוך תיבת נח ולמידה על כוחה של חסד, דאגה לכל בריה, ואמונת חכמים עמוקה ומאירה.',
    thumbnail: '/images/craft_sheet_1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    badge: 'Episode 3',
    hebrewBadge: 'פרק 3',
    isFree: false,
  },
  {
    id: 'ep-4',
    title: 'The Secret of the Shabbat Candle',
    hebrewTitle: 'סוד נרות השבת של מרת שרה',
    duration: '12:35',
    description: 'The miraculous holy light that stayed burning until Friday evening, bringing peace, joy, and blessings to the entire village.',
    hebrewDescription: 'האור המיוחד שדלק משבת לשבת והביא ברכת שמיים, שמחה גדולה ושלום בית לכל אנשי העיירה כולה.',
    thumbnail: '/images/master_background.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    badge: 'Episode 4',
    hebrewBadge: 'פרק 4',
    isFree: false,
  },
  {
    id: 'ep-5',
    title: 'The Brave Shepherd of the Judean Hills',
    hebrewTitle: 'הרועה האמיץ בהרי יהודה',
    duration: '15:50',
    description: "How young David protected his father's flock with supreme courage, true modesty, and unshakeable trust in Hashem.",
    hebrewDescription: 'כיצד דוד הרועה הגן על צאנו בגבורה עילאית, בענווה אמיתית ובביטחון בלתי מעורער בה׳ יתברך.',
    thumbnail: '/images/comics_cover.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    badge: 'Episode 5',
    hebrewBadge: 'פרק 5',
    isFree: false,
  },
  {
    id: 'ep-6',
    title: 'The Miracle of the Pomegranate Tree',
    hebrewTitle: 'נס עץ הרימון במדבר',
    duration: '13:15',
    description: 'A miraculous journey through the desert where warm hospitality to weary travelers produces sweet fruits and great wonders.',
    hebrewDescription: 'מסע מרתק ומלא אמונה במדבר שבו הכנסת אורחים מכל הלב מניבה פירות מתוקים וניסים גלויים ומפעימים.',
    thumbnail: '/images/video_thumb_1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    badge: 'Episode 6',
    hebrewBadge: 'פרק 6',
    isFree: false,
  },
];

export const SONGS: Song[] = [
  {
    id: 'song-1',
    episodeId: 'ep-1',
    title: 'Challah of Love (Song of Tzfat)',
    hebrewTitle: 'חלות של אהבה (שיר האופה מצפת)',
    duration: '3:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: '/images/video_thumb_1.jpg',
    isFree: true,
    lyricsHighlight: 'Warm from the oven, baked with delight, bringing holy light to Shabbat night...',
    hebrewLyricsHighlight: 'חלות חמות מן התנור באהבה נמסרות, מאירות את שולחן השבת בברכות...',
  },
  {
    id: 'song-2',
    episodeId: 'ep-2',
    title: 'Treasure of the Heart (Jerusalem Song)',
    hebrewTitle: 'אוצר הלב (שיר ירושלים)',
    duration: '4:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: '/images/comics_cover.jpg',
    isFree: true,
    lyricsHighlight: 'Not silver, not gold in an ancient chest, but a generous heart is truly blessed...',
    hebrewLyricsHighlight: 'לא כסף וזהב בתיבה נסתרת, אלא לב טוב ואהבה בוערת...',
  },
  {
    id: 'song-3',
    episodeId: 'ep-3',
    title: 'Dove of Hope (Ark of Peace Song)',
    hebrewTitle: 'יונת השלום (שיר תיבת נח)',
    duration: '3:50',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnail: '/images/craft_sheet_1.jpg',
    isFree: false,
    lyricsHighlight: 'Fly high little dove across the gentle breeze, bring a holy leaf of green and peace...',
    hebrewLyricsHighlight: 'עופי יונה אל על מעל המים, הביאי עלה של שלום מן השמיים...',
  },
  {
    id: 'song-4',
    episodeId: 'ep-4',
    title: 'The Eternal Flame (Shabbat Candles Song)',
    hebrewTitle: 'נר השבת המאיר (שיר שרה אמנו)',
    duration: '3:30',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    thumbnail: '/images/master_background.jpg',
    isFree: false,
    lyricsHighlight: 'Seven bright days the holy candles glow, with serenity and love that overflow...',
    hebrewLyricsHighlight: 'שבעה ימים האור הקדוש עוד בוער, את כל הבית והלב הוא מעורר...',
  },
  {
    id: 'song-5',
    episodeId: 'ep-5',
    title: 'Song of the Brave Shepherd',
    hebrewTitle: 'שיר הרועה האמיץ בהרי יהודה',
    duration: '4:05',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    thumbnail: '/images/comics_cover.jpg',
    isFree: false,
    lyricsHighlight: 'With a harp and a prayer high upon the hill, Hashem is my shepherd, I trust in Him still...',
    hebrewLyricsHighlight: 'בכינור ובשיר על ראש הגבעה, ה׳ רועי לא אחסר בכל שעה...',
  },
  {
    id: 'song-6',
    episodeId: 'ep-6',
    title: 'Pomegranate Seeds of Kindness',
    hebrewTitle: 'פירות הרימון של חסד ואמונה',
    duration: '3:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    thumbnail: '/images/video_thumb_1.jpg',
    isFree: false,
    lyricsHighlight: 'Open your tent to each weary guest, sweet are the fruits when our hands are blessed...',
    hebrewLyricsHighlight: 'פתחו את האוהל לכל אורח ועובר, פירות מתוקים וברכה שתגבר...',
  },
];

export const COMIC_PRODUCTS: ComicProduct[] = [
  {
    id: 'comic-1',
    title: 'Adventures in Ancient Jerusalem - Volume 1',
    hebrewTitle: 'הרפתקאות בירושלים הקדומה - כרך א׳',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/comics_cover.jpg',
    description: 'The premier full-color illustrated graphic novel following Danny and Sarah across ancient Jerusalem.',
    hebrewDescription: 'ספר קומיקס מרתק ומלא צבע המלווה את דני ושרה בסמטאות ירושלים בתקופת בית המקדש.',
  },
  {
    id: 'comic-2',
    title: 'Tales of the Tzaddikim: The Tzfat Mystery',
    hebrewTitle: 'סיפורי צדיקים בקומיקס: תעלומת צפת',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/video_thumb_1.jpg',
    description: 'An inspiring illustrated journey highlighting acts of hidden charity and genuine loving-kindness.',
    hebrewDescription: 'מסע מאויר ומלא השראה בעקבות מעשי חסד מופלאים ומתן בסתר בעיר המקובלים צפת.',
  },
  {
    id: 'comic-3',
    title: "Noah's Ark & The Secret of Peace",
    hebrewTitle: 'תיבת נח וסוד השלום בקומיקס',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/craft_sheet_1.jpg',
    description: 'An action-packed comic bringing the animals of the Ark alive with humor and holy midrashim.',
    hebrewDescription: 'קומיקס סוחף ומשעשע המביא לחיים את סיפור התיבה על פי מדרשי חז״ל וערכי אהבת חינם.',
  },
  {
    id: 'comic-4',
    title: 'The Shabbat Lanterns of Rabbi Meir',
    hebrewTitle: 'מנורות השבת של רבי מאיר בעל הנס',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/master_background.jpg',
    description: 'A magical comic story about faith, charity, and miracles that light up the darkest nights.',
    hebrewDescription: 'סיפור קומיקס מאיר לבבות על אמונה, צדקה וניסים המאירים גם בלילות החשוכים ביותר.',
  },
  {
    id: 'comic-5',
    title: 'Young David and the Giant Challenge',
    hebrewTitle: 'דוד הצעיר ומבחן הגבורה',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/comics_cover.jpg',
    description: 'Full-color pages depicting trust in Divine strength over earthly weapons and fears.',
    hebrewDescription: 'דפים צבעוניים ומרהיבים המלמדים על כוחו של ביטחון בה׳ אל מול כל אתגר ופחד.',
  },
  {
    id: 'comic-6',
    title: 'The Great Challah Delivery of Erev Shabbat',
    hebrewTitle: 'מבצע חלות השבת של צפת העתיקה',
    priceUSD: 14.99,
    priceILS: 45,
    image: '/images/video_thumb_1.jpg',
    description: 'A fast-paced comic adventure celebrating the beauty and peace of Shabbat preparation.',
    hebrewDescription: 'הרפתקת קומיקס קצבית ומלאת הומור על ההכנות לשבת קודש ושמחת השבת בבית יהודי.',
  },
];

export const EPISODE_QUIZZES: Record<string, QuizQuestion[]> = {
  'ep-1': [
    {
      question: 'What special mitzvah did the kind baker of Tzfat perform every Friday morning?',
      hebrewQuestion: 'איזו מצווה מיוחדת קיים האופה מטבריה וצפת בכל יום שישי בבוקר?',
      options: [
        'He baked fresh braided challahs and distributed them secretly to poor families',
        'He traveled to Jerusalem on horseback',
        'He sold gold coins at the marketplace',
        'He organized a music festival',
      ],
      hebrewOptions: [
        'הוא אפה חלות טריות וחילקן בהסתר למשפחות נזקקות לכבוד שבת',
        'הוא נסע על סוס עד לירושלים',
        'הוא מכר מטבעות זהב בשוק המרכזי',
        'הוא ארגן פסטיבל מוזיקה גדול',
      ],
      correctIndex: 0,
    },
    {
      question: 'How did the baker feel when giving the challot to others?',
      hebrewQuestion: 'כיצד הרגיש האופה בעת שנתן את החלות לאחרים?',
      options: [
        'He felt immense joy and brotherly love',
        'He wanted people to praise him',
        'He was tired and rushed',
        'He asked for payment in return',
      ],
      hebrewOptions: [
        'הוא הרגיש שמחה גדולה ואהבת ישראל עמוקה',
        'הוא רצה שכולם ישבחו אותו',
        'הוא היה עייף ומיהר מאוד',
        'הוא ביקש תשלום כפול בתמורה',
      ],
      correctIndex: 0,
    },
  ],
  'ep-2': [
    {
      question: 'Where was the mysterious ancient parchment discovered?',
      hebrewQuestion: 'היכן התגלתה המגילה העתיקה והמסתורית?',
      options: [
        'Between the ancient stone walls of the Old City of Jerusalem',
        'In a boat on the Mediterranean Sea',
        'Under a modern high-rise tower',
        'In a library in Rome',
      ],
      hebrewOptions: [
        'בין אבני הסמטאות העתיקות של ירושלים',
        'בסירה על פני הים התיכון',
        'מתחת למגדל מודרני',
        'בספרייה ברומא',
      ],
      correctIndex: 0,
    },
    {
      question: 'What was the true "treasure" revealed by the holy story?',
      hebrewQuestion: 'מה היה ״האוצר״ האמיתי שהתגלה בסיפור הקדוש?',
      options: [
        'A kind heart, Torah wisdom, and good deeds',
        'A heavy chest filled with silver coins',
        'A crown made of diamonds',
        'A secret underground palace',
      ],
      hebrewOptions: [
        'לב טוב, חוכמת התורה ומעשים טובים',
        'תיבה כבדה מלאה מטבעות כסף',
        'כתר משובץ יהלומים',
        'ארמון תת-קרקעי סודי',
      ],
      correctIndex: 0,
    },
  ],
  'ep-3': [
    {
      question: "What lesson do we learn from Noah feeding and caring for every animal in the Ark?",
      hebrewQuestion: 'איזה לקח אנו לומדים מהדאגה וההאכלה של נח לכל חיה בתיבה?',
      options: [
        'Caring with patience and devotion for every living creature brings Hashem’s blessing',
        'Only large animals deserve attention',
        'It is better to sleep than to care for others',
        'Animals do not need care',
      ],
      hebrewOptions: [
        'חסד, סבלנות ומסירות לכל בריה מביאים את ברכת ה׳ ושלום',
        'רק חיות גדולות ראויות לתשומת לב',
        'עדיף לישון מאשר לדאוג לאחרים',
        'בעלי חיים אינם זקוקים לדאגה',
      ],
      correctIndex: 0,
    },
    {
      question: 'What did the dove bring back in its beak to show peace had returned?',
      hebrewQuestion: 'מה הביאה היונה בפיה בסימן לשלום ולסיום המבול?',
      options: [
        'An olive leaf',
        'A golden coin',
        'A bundle of wheat',
        'A bunch of grapes',
      ],
      hebrewOptions: [
        'עלה זית טרף בפיה',
        'מטבע זהב',
        'אלומת חיטה',
        'אשכול ענבים',
      ],
      correctIndex: 0,
    },
  ],
  'ep-4': [
    {
      question: 'What was special about the Shabbat candles of Sarah Imeinu?',
      hebrewQuestion: 'מה היה מיוחד בנרות השבת של שרה אמנו?',
      options: [
        'They remained miraculously lit from one Friday evening to the next',
        'They burned with five different colors',
        'They only lit during the daytime',
        'They were made of silver',
      ],
      hebrewOptions: [
        'הם דלקו באורח נס מעשיות שבת אחת לערב שבת הבאה',
        'הם בערו בחמישה צבעים שונים',
        'הם דלקו רק בשעות היום',
        'הם היו עשויים כסף טהור',
      ],
      correctIndex: 0,
    },
  ],
  'ep-5': [
    {
      question: 'Why was young shepherd David not afraid when guarding his flock?',
      hebrewQuestion: 'מדוע דוד הרועה הצעיר לא פחד כאשר שמר על צאנו?',
      options: [
        'He had complete faith and trust in Hashem who protects His children',
        'He carried giant iron armor',
        'He hid in a cave whenever danger appeared',
        'He had trained lions to help him',
      ],
      hebrewOptions: [
        'היה לו ביטחון ואמונה שלמה בה׳ יתברך השומר ומציל',
        'הוא לבש שריון ברזל כבד',
        'הוא התחבא במערה בכל עת שהייתה סכנה',
        'היו לו אריות מאולפים שעזרו לו',
      ],
      correctIndex: 0,
    },
  ],
  'ep-6': [
    {
      question: 'What mitzvah caused the miraculous pomegranate tree to blossom?',
      hebrewQuestion: 'איזו מצווה גרמה לעץ הרימון לפרוח בניסי נסים?',
      options: [
        'Welcoming travelers with a warm smile and generosity (Hachnasat Orchim)',
        'Winning a running contest',
        'Building a tall tower in the desert',
        'Finding buried treasure',
      ],
      hebrewOptions: [
        'הכנסת אורחים מכל הלב, בסבר פנים יפות ובשמחה',
        'ניצחון בתחרות ריצה',
        'בניית מגדל גבוה במדבר',
        'מציאת אוצר קבור',
      ],
      correctIndex: 0,
    },
  ],
};

export const SAMPLE_QUIZ: QuizQuestion[] = EPISODE_QUIZZES['ep-1'];


export const TRANSLATIONS = {
  en: {
    siteTitle: 'Yachad - Holy Tales for Jewish Kids',
    siteSubtitle: 'Holy Tales for Kids',
    nav: {
      subscription: 'Subscription',
      videos: 'Videos',
      songs: 'Songs',
      quizzesCrafts: 'Quizzes & Crafts',
      shop: 'Shop',
      contact: 'Contact Us',
    },
    splash: {
      welcomeTitle: 'Welcome to Yachad',
      welcomeSubtitle: 'Holy Tales, Torah values, and inspiring adventures for Jewish children worldwide',
      chooseLanguage: 'Select your preferred language to begin:',
      hebrewBtn: 'עברית (Hebrew)',
      englishBtn: 'English (English)',
    },
    paywall: {
      bannerNotice: 'Subscribers Only – Subscribe Now',
      modalTitle: 'Subscribers Only – Subscribe Now',
      modalSubtitle: 'This exclusive video, audio track, quiz, and craft sheets are available to active subscribers.',
      feature1: '100% ad-free video library with clean values',
      feature2: 'New episodes, audio tracks, and printable sheets every week',
      feature3: 'Interactive quizzes that reinforce Torah knowledge',
      joinBtn: 'Subscribe Now & Unlock Full Access',
      alreadySubscribed: 'Already subscribed?',
      loginHint: 'Toggle member mode in the top bar to test active subscriber access.',
      close: 'Close Preview',
    },
    subscriptionPage: {
      headerTitle: 'Subscription Plans',
      headerSubtitle: 'Give your children a wholesome, joyful sanctuary of Jewish holy tales and activities.',
      card: {
        planName: 'All-Access Monthly Pass',
        price: '$11.99',
        priceFrequency: '/ Month',
        subCaption: 'No commitment • Cancel anytime',
        bullets: [
          'Unlimited access to the full video library – 100% ad-free in a safe, clean environment for kids',
          'Exciting new content added every week',
          'Interactive quizzes for every video & episode',
          'High-quality printable craft & coloring sheets',
        ],
        actionBtn: 'Join Now',
      },
      manage: {
        activeBadge: 'Active Subscription',
        activeTitle: 'Your All-Access Pass is Active',
        activeSubtitle: 'You have unlimited access to all videos, songs, quizzes, and printable craft sheets.',
        nextBilling: 'Automatic renewal active • Renews monthly',
        cancelBtn: 'Cancel Subscription',
        confirmTitle: 'Cancel Subscription?',
        confirmText: 'Are you sure you want to cancel your monthly subscription? Your access will be immediately terminated.',
        confirmYes: 'Yes, Cancel Subscription',
        confirmNo: 'Keep My Subscription',
        cancelledTitle: 'Subscription Cancelled',
        cancelledMsg: 'Your subscription has been cancelled immediately by the system without manual approval. No further charges will occur.',
        resubscribeBtn: 'Re-activate Subscription',
      },
      premiumSlot: {
        title: 'Future Extension Slot: Premium Tier',
        price: '$14.99 / Month',
        desc: 'Coming soon: Live interactive storytelling workshops, physical mail craft kits, and family holiday webinars.',
        badge: 'Coming Soon',
      },
      form: {
        title: 'Subscriber Intake Form',
        subtitle: 'Please complete your subscriber information before continuing to secure payment checkout:',
        email: 'Email address',
        phone: 'Phone number',
        children: 'Number of children in the family',
        cityState: 'City & State (US)',
        submitBtn: 'Proceed to Payment',
        developerNote: 'Note for Developer: Connect this trigger to external payment processing URL.',
        processing: 'Connecting to Secure Payment Gateway...',
        successTitle: 'Intake Completed!',
        successMsg: 'In production, this automatically redirects to the external payment processor.',
      },
    },
    videosPage: {
      headerTitle: 'Videos (Main Content Hub)',
      headerSubtitle: 'Watch inspiring holy tales, tzaddikim stories, and Torah adventures produced in vibrant animation.',
      quizBtn: 'Quiz (PDF)',
      craftBtn: 'Craft Sheets',
      subscribersOnlyBadge: 'Subscribers Only',
      freeBadge: 'Free Episode',
      watchVideo: 'Play Video',
      pauseVideo: 'Pause',
    },
    songsPage: {
      headerTitle: 'Songs & Melodies (Audio Sanctuary)',
      headerSubtitle: 'Listen to the inspiring original songs corresponding to each holy tale episode. Perfect for relaxing and singing along.',
      nowPlaying: 'Now Playing',
      continuousAutoplay: 'Continuous Autoplay',
      continuousAutoplayDesc: 'Automatically starts the next song when current track ends',
      freeTrack: 'Free Song',
      subscribersOnly: 'Subscribers Only',
      playTrack: 'Play',
      pauseTrack: 'Pause',
      nextTrack: 'Next Track',
      prevTrack: 'Previous Track',
      trackListTitle: 'Complete Audio Playlist',
      unlockToListen: 'Subscribe to Listen',
    },
    quizzesCraftsPage: {
      headerTitle: 'Quizzes & Crafts (Fast-Access Directory)',
      headerSubtitle: 'A lightweight, quick-loading directory for children and parents to jump straight into activities without loading video streams.',
      quizBtn: 'Quiz',
      craftBtn: 'Craft Sheets',
      downloadQuizPdf: 'Download Quiz (PDF)',
      badge: 'Interactive Activity',
      freeBadge: 'Free Activity',
      downloadPrompt: 'Print & Download Activity PDF',
    },
    shopPage: {
      headerTitle: 'Shop & Comics Collection',
      headerSubtitle: 'Inspiring graphic novels and holy tales comics for your home library.',
      featuredCategory: {
        badge: 'Featured Category',
        title: 'Comics for Sale',
        subtitle: 'Explore our beloved illustrated graphic novel collection for Jewish kids',
        btnText: 'Browse Comic Collection',
      },
      catalogTitle: 'Product Catalog: Comics & Books',
      catalogSubtitle: 'Showing 3 items per row ready for scaling catalog architecture.',
      buyNow: 'Buy Now - $',
      checkoutTitle: 'Complete Comic Book Purchase',
      checkoutDesc: 'You are purchasing:',
      confirmBuy: 'Complete Secure Checkout',
    },
    contactPage: {
      headerTitle: 'Contact Us',
      headerSubtitle: 'Complete customer care and payment gateway verification compliance.',
      instantCancellation: {
        badge: 'Self-Service Automated Cancellation',
        title: 'Instant Subscription Cancellation',
        desc: 'Need to cancel your subscription? No need to wait for customer support. Click below to cancel your recurring billing immediately.',
        actionBtn: 'Cancel My Subscription Now',
        alreadyCancelled: 'You do not have an active subscription to cancel.',
      },
      form: {
        title: 'Inquiry Form',
        fullName: 'Full Name',
        email: 'Email address',
        subject: 'Inquiry Subject',
        subjects: [
          'Customer Support',
          'Inquiries & Feedback',
          'Billing & Cancellations',
        ],
        message: 'Message body',
        submitBtn: 'Send Message',
        successMsg: 'Thank you! Your inquiry has been sent to our customer care team.',
      },
      directSupport: {
        title: 'Direct Support Channels',
        emailLabel: 'Dedicated Support Email',
        emailVal: 'support@holytalesforkids.com',
        phoneLabel: 'WhatsApp / Phone Customer Service line',
        phoneVal: '+1 (800) 555-TALES / +1 (845) 555-0199',
        hours: 'Sun - Thu: 9:00 AM - 6:00 PM EST | Fri: 9:00 AM - 1:00 PM EST',
      },
      policy: {
        header: 'Refund & Cancellation Policy',
        sectionTitle: 'Payment Gateway Compliance & Member Rights',
        text1: 'At Yachad - Holy Tales for Jewish Kids, we are committed to complete transparency and customer satisfaction. All monthly subscriptions may be canceled at any time with no long-term commitment or penalty.',
        text2: 'Upon cancellation, your access remains active until the end of your current billing period. Full refunds for the monthly charge are gladly provided within 14 days of any billing cycle upon contacting our support team.',
        text3: 'Physical shop items (such as comics) may be returned for a full replacement or refund within 30 days of receipt if unopened or damaged during transit.',
      },
    },
    simulator: {
      badge: 'Prototype Simulation Bar',
      visitorState: 'Current View: Guest / Non-Subscriber (Paywalled)',
      subscriberState: 'Current View: Active Paid Subscriber (Unlocked)',
      toggleToSub: 'Switch to Subscriber View',
      toggleToGuest: 'Switch to Guest View',
    },
  },
  he: {
    siteTitle: 'יחד - סיפורי צדיקים לילדים',
    siteSubtitle: 'סיפורי צדיקים לילדים',
    nav: {
      subscription: 'מנויים',
      videos: 'סרטונים',
      songs: 'שירים',
      quizzesCrafts: 'חידונים ויצירה',
      shop: 'חנות',
      contact: 'צור קשר',
    },
    splash: {
      welcomeTitle: 'ברוכים הבאים ל״יחד - סיפורי צדיקים לילדים״',
      welcomeSubtitle: 'סיפורי צדיקים מרתקים, ערכים יהודיים, ופעילויות חינוכיות וחווייתיות לילדי ישראל',
      chooseLanguage: 'אנא בחרו את שפת האתר הרצויה כדי להמשיך:',
      hebrewBtn: 'עברית (Hebrew)',
      englishBtn: 'English (English)',
    },
    paywall: {
      bannerNotice: 'למנויים בלבד – הירשם עכשיו',
      modalTitle: 'למנויים בלבד – הירשם עכשיו',
      modalSubtitle: 'צפייה בסרטון זה, האזנה לשירים, פתיחת חידונים ודפי היצירה והצביעה פתוחים למנויים פעילים בלבד.',
      feature1: 'גישה בלתי מוגבלת לכל מאגר הסרטונים – 100% ללא פרסומות בסביבה נקייה ובטוחה לילדים',
      feature2: 'תכנים ושירים חדשים ומרתקים שעולים מדי שבוע',
      feature3: 'חידונים אינטראקטיביים ודפי יצירה וצביעה מוכנים להדפסה',
      joinBtn: 'הירשם עכשיו וקבל גישה מלאה',
      alreadySubscribed: 'כבר מנוי?',
      loginHint: 'ניתן לעבור למצב "מנוי פעיל" בסרגל הסימולציה העליון לבדיקת הפרוטוטייפ.',
      close: 'סגור תצוגה מקדימה',
    },
    subscriptionPage: {
      headerTitle: 'מנויים',
      headerSubtitle: 'העניקו לילדיכם עולם עשיר וקדוש של סיפורי צדיקים, מידות טובות וחוויות מעשירות.',
      card: {
        planName: 'מנוי חודשי מלא',
        price: '₪35',
        priceFrequency: '/ לחודש',
        subCaption: 'ללא התחייבות • ביטול בכל עת',
        bullets: [
          'גישה בלתי מוגבלת לכל מאגר הסרטונים – 100% ללא פרסומות בסביבה נקייה ובטוחה לילדים',
          'תכנים חדשים ומרתקים שעולים מדי שבוע',
          'חידונים אינטראקטיביים לכל פרק וסרטון',
          'דפי יצירה וצביעה איכותיים מוכנים להדפסה',
        ],
        actionBtn: 'הצטרפו עכשיו',
      },
      manage: {
        activeBadge: 'מנוי פעיל',
        activeTitle: 'המנוי החודשי המלא שלך פעיל',
        activeSubtitle: 'יש לך גישה מלאה ובלתי מוגבלת לכל הסרטונים, השירים, החידונים ודפי היצירה.',
        nextBilling: 'חידוש אוטומטי פעיל • מתחדש מדי חודש',
        cancelBtn: 'ביטול מנוי',
        confirmTitle: 'ביטול המנוי?',
        confirmText: 'האם אתה בטוח שברצונך לבטל את המנוי החודשי? המערכת תבטל את החיוב באופן מיידי.',
        confirmYes: 'כן, בטל את המנוי עכשיו',
        confirmNo: 'השאר את המנוי פעיל',
        cancelledTitle: 'המנוי בוטל בהצלחה',
        cancelledMsg: 'המנוי שלך בוטל באופן מיידי ומלא במערכת ללא צורך באישור ידני. לא יבוצעו חיובים נוספים.',
        resubscribeBtn: 'חידוש מנוי',
      },
      premiumSlot: {
        title: 'חריץ הרחבה עתידי: מנוי פרימיום משפחתי',
        price: '₪49 / לחודש',
        desc: 'בקרוב: סדנאות סיפור חיות בזום, ערכות יצירה פיזיות במשלוח עד הבית, ומפגשים מיוחדים לקראת החגים.',
        badge: 'בקרוב',
      },
      form: {
        title: 'טופס פרטי מנוי',
        subtitle: 'לפני המעבר לתשלום המאובטח, אנא מלאו את פרטי המנוי הנדרשים:',
        email: 'דוא"ל',
        phone: 'מספר טלפון',
        children: 'מספר ילדים במשפחה',
        cityState: 'עיר ומדינה בארה"ב',
        submitBtn: 'המשך לתשלום',
        developerNote: 'הערה למפתח: חבר טריגר זה לקישור מערכת התשלומים החיצונית.',
        processing: 'מתחבר למערכת תשלומים מאובטחת...',
        successTitle: 'הפרטים נקלטו בהצלחה!',
        successMsg: 'באתר הסופי תתבצע הפניה אוטומטית לעמוד הסליקה המאובטח.',
      },
    },
    videosPage: {
      headerTitle: 'סרטונים',
      headerSubtitle: 'מאגר עשיר של סיפורי צדיקים מאוירים ומונפשים, באווירה נקייה ובטוחה לכל המשפחה.',
      quizBtn: 'חידון (PDF)',
      craftBtn: 'דפי יצירה',
      subscribersOnlyBadge: 'למנויים בלבד',
      freeBadge: 'פרק חינם לכולם',
      watchVideo: 'נגן סרטון',
      pauseVideo: 'השהה',
    },
    songsPage: {
      headerTitle: 'שירים ומנגינות',
      headerSubtitle: 'האזינו לשירי הסיפורים והפרקים המקוריים והמרגשים. מושלם להאזנה נעימה ושירה בצוותא.',
      nowPlaying: 'מתנגן כעת',
      continuousAutoplay: 'הפעלה רציפה אוטומטית',
      continuousAutoplayDesc: 'מעבר והשמעה אוטומטית של השיר הבא בסיום השיר הנוכחי',
      freeTrack: 'שיר פתוח לכולם',
      subscribersOnly: 'למנויים בלבד',
      playTrack: 'נגן',
      pauseTrack: 'השהה',
      nextTrack: 'השיר הבא',
      prevTrack: 'השיר הקודם',
      trackListTitle: 'רשימת השירים המלאה',
      unlockToListen: 'הירשם להאזנה',
    },
    quizzesCraftsPage: {
      headerTitle: 'חידונים ויצירה',
      headerSubtitle: 'ספרייה מהירה וקלת משקל לילדים ולהורים לכניסה ישירה לפעילויות ללא טעינת סרטונים כבדים.',
      quizBtn: 'חידון',
      craftBtn: 'דפי יצירה',
      downloadQuizPdf: 'הורדת חידון (PDF)',
      badge: 'פעילות אינטראקטיבית',
      freeBadge: 'פעילות חינם',
      downloadPrompt: 'הדפסה והורדת דף יצירה וצביעה',
    },
    shopPage: {
      headerTitle: 'חנות',
      headerSubtitle: 'ספרי קומיקס וספרי קריאה חינוכיים ומלאי תוכן לספריית הבית היהודי.',
      featuredCategory: {
        badge: 'קטגוריה נבחרת',
        title: 'קומיקסים למכירה',
        subtitle: 'צפו באוסף ספרי הקומיקס המאוירים והמרתקים לילדים',
        btnText: 'צפה בקטלוג הקומיקס',
      },
      catalogTitle: 'קטלוג מוצרים: ספרי קומיקס',
      catalogSubtitle: 'סידור רשת של 3 מוצרים בשורה המותאם להרחבה עתידית של הקטלוג.',
      buyNow: 'קנה עכשיו - ₪',
      checkoutTitle: 'רכישת ספר קומיקס',
      checkoutDesc: 'הנכם רוכשים את הספר:',
      confirmBuy: 'המשך לסליקה מאובטחת',
    },
    contactPage: {
      headerTitle: 'צור קשר',
      headerSubtitle: 'שירות לקוחות מלא ועמידה בתקני שער הסליקה והתשלומים.',
      instantCancellation: {
        badge: 'מערכת שירות עצמי אוטומטית',
        title: 'ביטול מנוי מיידי',
        desc: 'רוצים לבטל את המנוי? אין צורך להמתין לנציג שירות. לחצו כאן לביטול החיוב החודשי באופן מיידי ומאובטח.',
        actionBtn: 'בטל את המנוי שלי כעת',
        alreadyCancelled: 'אין מנוי פעיל כעת לביטול.',
      },
      form: {
        title: 'טופס פנייה לשירות לקוחות',
        fullName: 'שם מלא',
        email: 'דוא"ל',
        subject: 'נושא הפנייה',
        subjects: [
          'שירות לקוחות ותמיכה',
          'שאלות ומשוב',
          'חיובים וביטול מנוי',
        ],
        message: 'תוכן ההודעה',
        submitBtn: 'שלח הודעה',
        successMsg: 'פנייתך נשלחה בהצלחה! צוות שירות הלקוחות יחזור אליך בהקדם.',
      },
      directSupport: {
        title: 'ערוצי תמיכה ישירים',
        emailLabel: 'דוא"ל לתמיכה',
        emailVal: 'support@holytalesforkids.com',
        phoneLabel: 'וואטסאפ וטלפון לשירות לקוחות',
        phoneVal: '+1 (800) 555-TALES / +1 (845) 555-0199',
        hours: 'ימים א׳-ה׳: 09:00 - 18:00 (שעון ניו יורק) | יום ו׳: 09:00 - 13:00',
      },
      policy: {
        header: 'מדיניות החזרים וביטולים',
        sectionTitle: 'עמידה בדרישות חברות האשראי וזכויות המנוי',
        text1: 'באתר ״יחד - סיפורי צדיקים לילדים״ אנו רואים חשיבות עליונה בשקיפות ובשביעות רצון לקוחותינו. ניתן לבטל את המנוי החודשי בכל עת, ללא כל התחייבות או קנס יציאה.',
        text2: 'עם ביטול המנוי, הגישה לתכנים תישאר פתוחה עד תום תקופת החיוב החודשית הנוכחית. ניתן לקבל החזר כספי מלא על החיוב החודשי בתוך 14 יום ממועד החיוב בפנייה לשירות הלקוחות.',
        text3: 'מוצרים פיזיים הנרכשים בחנות (כגון חוברות קומיקס) ניתנים להחזרה בתוך 30 יום ממועד קבלתם באריזתם המקורית, או במקרה של פגם במשלוח, להחלפה מיידית או החזר כספי מלא.',
      },
    },
    simulator: {
      badge: 'סרגל הדגמה ובדיקה',
      visitorState: 'מצב נוכחי: אורח / אינו מנוי (מופעלת חסימת תוכן)',
      subscriberState: 'מצב נוכחי: מנוי פעיל (כל התכנים פתוחים לצפייה)',
      toggleToSub: 'עבור למצב מנוי פעיל',
      toggleToGuest: 'עבור למצב אורח (חסימה)',
    },
  },
};
