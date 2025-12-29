import Fuse from 'fuse.js';

// Enhanced chatbot with intelligent matching, typo tolerance, and natural responses
let lastIntent = null;
let conversationContext = [];

// ============= ALIAS/SYNONYM MAP FOR TYPO & VARIATION HANDLING =============
const aliasMap = {
  // LinkedIn variations
  'linkdin': 'linkedin', 'linkin': 'linkedin', 'linkesin': 'linkedin', 'linkden': 'linkedin',
  'linkedn': 'linkedin', 'linkdein': 'linkedin', 'likedin': 'linkedin', 'lnkdin': 'linkedin',
  
  // Professional/work variations
  'profeshnal': 'professional', 'profesional': 'professional', 'proffessional': 'professional',
  'professionl': 'professional', 'profesonal': 'professional',
  
  // Experience variations
  'experiance': 'experience', 'expereince': 'experience', 'experince': 'experience',
  'experiense': 'experience', 'exp': 'experience', 'xp': 'experience', 'work exp': 'experience',
  
  // Skills variations
  'skils': 'skills', 'skilss': 'skills', 'skill': 'skills', 'skll': 'skills', 'sklls': 'skills',
  
  // Projects variations
  'projet': 'projects', 'projcts': 'projects', 'projetcs': 'projects', 'prjects': 'projects',
  'project': 'projects', 'projct': 'projects', 'wrk': 'projects',
  
  // Contact variations
  'contct': 'contact', 'contat': 'contact', 'contac': 'contact', 'cntact': 'contact',
  'kontact': 'contact', 'contakt': 'contact',
  
  // Email variations
  'emal': 'email', 'emial': 'email', 'emil': 'email', 'e-mail': 'email', 'mail': 'email',
  
  // Education variations
  'educaton': 'education', 'eduction': 'education', 'educatn': 'education', 'edu': 'education',
  'studie': 'education', 'study': 'education', 'collge': 'college', 'colege': 'college',
  
  // Portfolio variations
  'portfolo': 'portfolio', 'porfolio': 'portfolio', 'portflio': 'portfolio', 'folio': 'portfolio',
  
  // Resume/CV variations
  'resum': 'resume', 'resumee': 'resume', 'resme': 'resume', 'cv': 'resume', 'curriculam': 'resume',
  
  // Instagram variations
  'insta': 'instagram', 'ig': 'instagram', 'instagarm': 'instagram', 'instgram': 'instagram',
  
  // Facebook variations
  'fb': 'facebook', 'facbook': 'facebook', 'facebok': 'facebook',
  
  // About/who variations
  'abt': 'about', 'abut': 'about', 'abou': 'about', 'bout': 'about',
  'urself': 'yourself', 'u': 'you', 'ur': 'your', 'r': 'are',
  
  // Hello variations
  'helo': 'hello', 'hllo': 'hello', 'hii': 'hi', 'hiii': 'hi', 'hiiii': 'hi',
  'heya': 'hey', 'heyy': 'hey', 'heyyy': 'hey', 'hai': 'hi', 'hy': 'hi',
  
  // Thanks variations
  'thnks': 'thanks', 'thnx': 'thanks', 'thx': 'thanks', 'ty': 'thanks', 'tysm': 'thanks',
  'thanx': 'thanks', 'thanku': 'thanks', 'thankss': 'thanks', 'tanx': 'thanks',
  
  // Common shortcuts
  'pls': 'please', 'plz': 'please', 'msg': 'message', 'dm': 'message',
  'info': 'information', 'b4': 'before', 'w8': 'wait', 'gr8': 'great',
  'wat': 'what', 'wht': 'what', 'hw': 'how', 'y': 'why', 'n': 'and',
  
  // Achievements variations
  'achivements': 'achievements', 'achievments': 'achievements', 'achivement': 'achievements',
  'achievemnts': 'achievements', 'accompishments': 'accomplishments',
  
  // Social variations  
  'socail': 'social', 'socials': 'social', 'socialmedia': 'social media',
  
  // Support variations
  'suport': 'support', 'supprt': 'support', 'hlp': 'help',
  
  // Website variations
  'websit': 'website', 'webiste': 'website', 'site': 'website', 'webpage': 'website',
};

// ============= INTENT KEYWORDS WITH SEMANTIC GROUPING =============
const intentKeywords = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo', 'greetings', 'hola', 'namaste', 'whats up', 'howdy', 'wassup', 'good morning', 'good evening', 'good afternoon', 'bonjour', 'salaam', 'vanakkam', 'aloha', 'morning', 'evening', 'afternoon'],
    patterns: [/^(hi+|hey+|hello+|yo+)$/i, /^what'?s? up/i, /^how are you/i, /^how r u/i, /^how's it going/i]
  },
  about: {
    keywords: ['who are you', 'about', 'tell me about yourself', 'introduce', 'yourself', 'background', 'who is devicharan', 'who is devi', 'about you', 'describe yourself', 'who made this', 'who built this', 'creator', 'owner', 'whose portfolio', 'your story', 'your journey', 'bio', 'biography', 'profile', 'introduction', 'who dis', 'devicharan', 'devi charan'],
    patterns: [/who (are|r) (you|u)/i, /tell (me )?about (you|yourself)/i, /introduce yourself/i, /your (story|background|journey)/i, /who('s| is) (this|devicharan|devi)/i]
  },
  skills: {
    keywords: ['skills', 'what can you do', 'abilities', 'capable', 'expertise', 'good at', 'tools', 'software', 'proficient', 'tech stack', 'technologies', 'programming', 'frameworks', 'specialization', 'specialty', 'strengths', 'competencies', 'talents', 'qualifications', 'technical skills', 'soft skills', 'skill set', 'coding', 'development', 'design skills', 'editing skills', 'video skills', 'ai skills', 'capabilities', 'know how', 'what do you know', 'what you know', 'can do'],
    patterns: [/what (can|do) you (do|know)/i, /your (skills|abilities|expertise)/i, /are you good at/i, /what tools/i, /tech stack/i]
  },
  projects: {
    keywords: ['projects', 'work', 'portfolio work', 'built', 'created', 'made', 'showcase', 'examples', 'show me', 'what have you done', 'your work', 'past work', 'previous work', 'samples', 'demos', 'case studies', 'things you made', 'stuff you built', 'works', 'creations', 'builds', 'accomplishment', 'your projects', 'project list', 'show work', 'see work'],
    patterns: [/show (me )?(your )?(work|projects)/i, /what (have|did) you (done|make|build|create)/i, /(your|the) projects/i, /see (your )?work/i]
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'call', 'message', 'number', 'whatsapp', 'get in touch', 'reach out', 'connect with you', 'contact info', 'contact details', 'your email', 'your phone', 'your number', 'mobile', 'cell', 'telephone', 'text you', 'write to you', 'talk to you', 'speak to you', 'chat with you', 'hire you', 'hiring', 'freelance', 'available', 'availability', 'book you', 'schedule', 'appointment', 'meeting', 'consultation', 'reach you', 'contact you'],
    patterns: [/how (can|do) i (contact|reach|email|call)/i, /(your|the) (email|phone|number|contact)/i, /get in touch/i, /reach (you|out)/i, /hire you/i]
  },
  social: {
    keywords: ['social', 'linkedin', 'instagram', 'facebook', 'follow', 'connect', 'socials', 'social media', 'twitter', 'x', 'youtube', 'github', 'tiktok', 'snapchat', 'discord', 'telegram', 'online presence', 'social profiles', 'social links', 'follow you', 'your socials', 'social accounts', 'handles', 'profiles', 'networking', 'professional network', 'where to follow'],
    patterns: [/(your )?(social|linkedin|instagram|facebook|twitter|github)/i, /follow you/i, /where (can|do) i follow/i, /social (media|profiles|links|accounts)/i]
  },
  portfolio: {
    keywords: ['website', 'portfolio', 'link', 'url', 'web', 'page', 'cv', 'resume', 'your website', 'your site', 'portfolio link', 'download cv', 'download resume', 'get cv', 'get resume', 'see portfolio', 'view portfolio', 'portfolio website', 'personal site', 'personal website', 'homepage', 'landing page', 'biodata', 'curriculum vitae', 'this site', 'this website'],
    patterns: [/(your |this )?(website|portfolio|site)/i, /download (cv|resume)/i, /(cv|resume) (link|download)/i, /see (your )?portfolio/i]
  },
  support: {
    keywords: ['support', 'help you', 'contribute', 'share', 'promote', 'assist', 'donate', 'sponsor', 'how can i help', 'support you', 'support your work', 'fund', 'funding', 'patronize', 'boost', 'spread the word', 'recommend', 'referral', 'refer', 'endorse', 'vouch', 'collaborate', 'collab', 'partnership', 'work together', 'team up', 'join forces'],
    patterns: [/how (can|do) i (help|support)/i, /support (you|your work)/i, /(collab|collaborate|work together)/i, /spread the word/i]
  },
  experience: {
    keywords: ['experience', 'work history', 'jobs', 'internship', 'career', 'worked', 'employment', 'job', 'work experience', 'professional experience', 'past jobs', 'previous jobs', 'companies', 'organizations', 'employers', 'where did you work', 'job history', 'career history', 'industry experience', 'years of experience', 'how long', 'freelance experience', 'client work', 'intern', 'worked where', 'job experience'],
    patterns: [/(your |work )?experience/i, /where (have|did) you work/i, /(job|career|work) history/i, /years of experience/i, /internship/i]
  },
  education: {
    keywords: ['education', 'degree', 'college', 'university', 'study', 'studied', 'school', 'diploma', 'btech', 'b.tech', 'engineering', 'qualification', 'academic', 'academics', 'where did you study', 'educational background', 'graduation', 'graduate', 'undergraduate', 'postgraduate', 'masters', 'bachelors', 'course', 'major', 'institution', 'alma mater', 'polytechnic', 'eee', 'electrical', 'studied where', 'which college', 'which university'],
    patterns: [/(your )?education/i, /where (did|do) you stud/i, /(college|university|degree|diploma)/i, /(educational|academic) background/i, /b\.?tech/i]
  },
  achievements: {
    keywords: ['achievements', 'accomplishments', 'awards', 'certifications', 'proud', 'certificates', 'certified', 'recognition', 'honors', 'honours', 'accolades', 'medals', 'trophies', 'proud moments', 'best work', 'notable', 'highlights', 'milestones', 'success', 'wins', 'winning', 'badges', 'credentials', 'accreditation', 'what are you proud of'],
    patterns: [/(your )?achievements/i, /what (are you|r u) proud of/i, /(awards|certifications|certificates)/i, /proud (of|moments)/i]
  },
  goodbye: {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'thanks', 'thank you', 'cya', 'ttyl', 'take care', 'see ya', 'catch you later', 'gotta go', 'got to go', 'leaving', 'peace', 'peace out', 'adios', 'ciao', 'farewell', 'goodnight', 'good night', 'have a nice day', 'have a good day', 'talk later', 'until next time', 'cheers', 'appreciate it'],
    patterns: [/^(bye+|goodbye|cya|ttyl|later|peace)$/i, /thank (you|u)/i, /take care/i, /see (you|ya|u)/i, /have a (nice|good|great) day/i]
  }
};

const responses = {
  greeting: [
    "Hey there! I'm Devicharan from Visakhapatnam—passionate about AI, content creation, and all things digital. What can I help you with?",
    "Hi! Thanks for stopping by. I'm an EEE student who loves blending tech with creativity. How can I assist you today?",
    "Hello! I'm Devicharan, currently diving into AI workflows and video editing while pursuing my B.Tech. What would you like to know?",
    "Glad you're here! I work with design tools, AI platforms, and content creation. Feel free to ask me anything!",
    "Hey! I'm a digital enthusiast from Vizag who enjoys building things and solving problems. What brings you here today?",
    "Hi there! I specialize in video editing, graphic design, and AI-assisted workflows. How can I help?",
    "Hello! I'm Devicharan—a learner, creator, and problem-solver in the digital space. What's on your mind?",
    "Hey! I'm passionate about merging engineering knowledge with creative digital skills. Ask away!",
    "Hi! I'm an aspiring digital professional with skills in content creation and tech tools. What would you like to explore?",
    "Hello there! I'm Devicharan, and I love experimenting with AI, video editing, and design. How can I assist you?",
  ],

  about: [
    "I'm Devicharan, pursuing B.Tech in EEE while building my digital portfolio through AI content creation, video editing, and design work.",
    "Sure thing! I'm a tech enthusiast from Visakhapatnam with a Diploma in EEE, focused on AI workflows and creative digital projects.",
    "I'm someone who loves learning and creating—currently balancing engineering studies with hands-on experience in content design and AI tools.",
    "Glad you asked! I'm Devicharan, an aspiring digital professional skilled in video editing, graphic design, and bilingual communication.",
    "I'm a B.Tech student with a passion for blending technical knowledge and creativity to build meaningful digital experiences.",
    "Funny enough, I started with electrical engineering but fell in love with AI tools and content creation along the way!",
    "I'm Devicharan—self-taught in prompt engineering, skilled in design tools, and always eager to tackle new challenges.",
    "I'm a growth-driven learner from Vizag who thrives on adaptability, problem-solving, and exploring new digital skills.",
    "I'm currently pursuing my degree while working on real-world projects in video editing, web design, and AI-assisted content.",
    "I'm Devicharan, a motivated individual who combines engineering discipline with creative thinking to deliver quality digital work.",
  ],

  skills: [
    "I work with video editing tools like CapCut and DaVinci Resolve, design in Canva and Photoshop, and handle data research with Google Sheets.",
    "My skills include AI-assisted content creation, prompt engineering, graphic design, and bilingual communication in Telugu and English.",
    "I specialize in content creation, video production, web building with Wix, and problem-solving with attention to detail.",
    "Sure thing! I'm skilled in video editing, data entry, AI workflows, and designing visual content for digital platforms.",
    "I handle everything from video editing and graphic design to research, planning, and executing digital marketing strategies.",
    "Glad you asked! I'm proficient in tools like Canva, CapCut, DaVinci Resolve, and no-code AI platforms for creative projects.",
    "I bring together technical skills like data organization and creative abilities in video editing, design, and AI-assisted writing.",
    "My expertise spans video production, content design, web development basics, and adapting quickly to new tools and technologies.",
    "I work with creative tools for design and video, handle research tasks efficiently, and communicate fluently in two languages.",
    "I'm skilled in AI workflows, content strategy, graphic design, video editing, and collaborating effectively in team environments.",
  ],

  projects: [
    "I've built my portfolio website using Wix and AI builders, created video editing demos for social media, and designed content with Canva.",
    "My projects include a personal portfolio site, professional video clips with transitions and effects, and mock data entry databases.",
    "Glad you asked! I've worked on video editing showcases, AI-assisted content design, and digital marketing practice projects.",
    "I've created a modern portfolio website, edited videos for platforms like YouTube, and designed posters with AI copywriting.",
    "My work includes building responsive websites, producing social media-style video content, and organizing research data effectively.",
    "I've showcased my skills through portfolio development, video demos with music and overlays, and creative graphic design pieces.",
    "Sure thing! I've completed projects in web design, video production, content creation, and team collaboration exercises.",
    "I've built digital assets like websites and videos, practiced data management, and experimented with AI tools for content generation.",
    "My portfolio features a personal site, video editing samples, design work in Canva, and marketing campaign planning projects.",
    "I've worked on various projects including website creation, video storytelling, infographic design, and AI-powered content writing.",
  ],

  contact: {
    text: [
      "You can reach me at devicharangeddada@gmail.com or call me at +91 6303468707. I'm based in Visakhapatnam!",
      "Sure thing! Feel free to email me at devicharangeddada@gmail.com or give me a call at +91 6303468707.",
      "I'd love to hear from you! Drop me an email at devicharangeddada@gmail.com or text me at +91 6303468707.",
      "Glad you asked! My email is devicharangeddada@gmail.com and my phone number is +91 6303468707. Let's connect!",
      "You can contact me via email at devicharangeddada@gmail.com or reach out by phone at +91 6303468707 anytime.",
      "Here's how to reach me: Email me at devicharangeddada@gmail.com or call +91 6303468707. Looking forward to it!",
      "Feel free to get in touch! My email is devicharangeddada@gmail.com and I'm available at +91 6303468707.",
      "I'm just an email away at devicharangeddada@gmail.com or a call away at +91 6303468707. Let's chat!",
      "Contact me anytime! Email: devicharangeddada@gmail.com or Phone: +91 6303468707. I'm in Visakhapatnam, India.",
      "Sure! You can reach me at devicharangeddada@gmail.com or dial +91 6303468707. I'd be happy to connect!",
    ],
    buttons: [
      { label: 'Email Me', icon: 'mail', action: 'email' },
      { label: 'View Contact', icon: 'link', action: 'contact-page' }
    ]
  },

  social: {
    text: [
      "Let's connect on social media! Find me on LinkedIn, Instagram, and Facebook to stay updated with my work.",
      "I'm active on LinkedIn for professional updates, Instagram for creative content, and Facebook to connect with friends and peers.",
      "Sure thing! Follow me on LinkedIn to see my professional journey, Instagram for behind-the-scenes content, and Facebook for updates.",
      "Glad you asked! I share my work on LinkedIn, post creative projects on Instagram, and connect with people on Facebook.",
      "You can find me across social platforms—LinkedIn for networking, Instagram for visual content, and Facebook for community engagement.",
      "I'd love to connect! Check out my LinkedIn profile, follow my Instagram for creative work, and join me on Facebook.",
      "Let's stay connected! I'm on LinkedIn sharing professional insights, Instagram showcasing projects, and Facebook for casual updates.",
      "Find me on LinkedIn for career updates, Instagram for design and video work, and Facebook to connect and collaborate.",
      "I'm on all major platforms! LinkedIn for professional growth, Instagram for creative expression, and Facebook for networking.",
      "Connect with me on LinkedIn to see my professional side, Instagram for my creative projects, and Facebook to stay in touch!",
    ],
    buttons: [
      { label: 'LinkedIn', icon: 'link', action: 'linkedin' },
      { label: 'Instagram', icon: 'link', action: 'instagram' },
      { label: 'Facebook', icon: 'link', action: 'facebook' }
    ]
  },

  portfolio: {
    text: [
      "You're already on my portfolio! Feel free to explore my projects, skills, and background right here.",
      "Welcome to my portfolio site! Here you can check out my work, download my CV, and learn more about what I do.",
      "Glad you're here! This is my portfolio where I showcase projects, skills, and ways to get in touch with me.",
      "You're viewing it right now! My portfolio features everything from my projects to my contact information.",
      "Sure thing! This website is my digital portfolio—explore my work, skills, and feel free to reach out anytime.",
      "This is my portfolio! Browse through my projects, check out my skills, and download my CV if you'd like.",
      "You're on my portfolio site! Here you'll find my work samples, background, and all the ways to connect with me.",
      "Welcome! My portfolio showcases my projects, skills, education, and professional journey—take a look around!",
      "This is where I showcase everything I've built and learned. Feel free to explore and reach out if something catches your eye!",
      "You're already exploring my portfolio! Check out my projects section or download my CV to learn more about my work.",
    ],
    buttons: [
      { label: 'View Projects', icon: 'link', action: 'projects' },
      { label: 'Download CV', icon: 'link', action: 'cv' }
    ]
  },

  support: {
    text: [
      "Thank you for your interest in supporting me! Following me on LinkedIn or sharing my portfolio with others would mean a lot.",
      "I really appreciate your support! You can help by connecting on social media, sharing my work, or just spreading the word.",
      "Glad you asked! The best way to support me is to follow my journey on LinkedIn, Instagram, or share my portfolio with your network.",
      "Your support means everything! Feel free to follow me on social platforms, share my projects, or reach out for collaborations.",
      "Thanks for wanting to help! You can support me by following my socials, sharing my portfolio, or keeping in touch for future opportunities.",
      "I appreciate you! Supporting me is as simple as connecting on LinkedIn, sharing my work, or recommending me to others.",
      "Thank you! You can support me by following my professional journey, sharing my portfolio, or collaborating on interesting projects.",
      "Your support is valuable! Connect with me on social media, share my work with others, or just keep in touch—it all helps!",
      "Thanks for asking! The best support is engagement—follow me on LinkedIn, Instagram, or share my portfolio with someone who might benefit.",
      "I'm grateful for your support! You can help by following my socials, sharing my portfolio, or reaching out with opportunities or feedback.",
    ],
    buttons: [
      { label: 'Follow on LinkedIn', icon: 'heart', action: 'linkedin' },
      { label: 'Share Portfolio', icon: 'heart', action: 'share' },
      { label: 'Get in Touch', icon: 'mail', action: 'contact-page' }
    ]
  },

  experience: [
    "I'm currently building my portfolio through self-driven projects and I'm open to internships in data research, content creation, and AI workflows.",
    "Sure thing! I'm focused on hands-on learning right now and seeking entry-level opportunities in customer support and digital content.",
    "I'm actively building real-world skills through practice projects and looking for internships that match my creative and technical abilities.",
    "Glad you asked! I'm working on strengthening my portfolio and I'm open to roles in research, content creation, and AI-assisted tasks.",
    "I'm currently gaining experience through independent projects and I'm eager to join teams in content, data, or support roles.",
    "I'm building practical experience through self-initiated work and seeking opportunities in content creation, research, and digital workflows.",
    "Right now I'm focused on portfolio development and I'm open to internships or entry-level positions in creative and technical fields.",
    "I'm in the learning and building phase, working on real projects, and looking for opportunities in AI workflows and content creation.",
    "I'm developing my skills through practice work and I'm interested in internships involving data, content, support, or AI tools.",
    "I'm currently creating my professional foundation through projects and I'm open to opportunities in digital content and research roles.",
  ],

  education: [
    "I'm currently in my 3rd year of B.Tech in Electrical & Electronics Engineering, and I previously completed my Diploma in EEE.",
    "Sure thing! I hold a Diploma in EEE from M.R.A.G.R. Government Polytechnic and I'm now pursuing my B.Tech degree.",
    "I'm pursuing B.Tech in Electrical & Electronics Engineering while building my digital skills alongside my technical education.",
    "Glad you asked! I completed my Diploma in EEE in Vizianagaram and I'm currently working toward my B.Tech in the same field.",
    "I'm in my third year of B.Tech in EEE, and I have a solid foundation from my Diploma in Electrical & Electronics Engineering.",
    "I've completed my Diploma in EEE and I'm now in the 3rd year of my B.Tech program at university.",
    "My educational background includes a Diploma in EEE from Government Polytechnic and ongoing B.Tech studies in Electrical Engineering.",
    "I'm currently a B.Tech student specializing in Electrical & Electronics Engineering, with prior diploma-level training in the same field.",
    "I'm pursuing my B.Tech in EEE and I've already completed a Diploma in the field, giving me both practical and theoretical knowledge.",
    "I'm in my 3rd year of engineering studies (B.Tech in EEE), building on my diploma foundation from M.R.A.G.R. Government Polytechnic.",
  ],

  achievements: [
    "I'm self-taught in Prompt Engineering and AI workflows, fluent in Telugu and English, and consistently motivated to grow and learn.",
    "Sure thing! I've developed bilingual communication skills, taught myself AI tools, and I'm focused on building practical, real-world abilities.",
    "Glad you asked! My achievements include self-learning AI workflows, mastering creative tools, and maintaining a growth-focused mindset.",
    "I'm proud of teaching myself prompt engineering, becoming proficient in multiple digital tools, and staying adaptable in learning new skills.",
    "My accomplishments include being bilingual, self-educating in AI, and building a diverse skill set through continuous practice and dedication.",
    "I've achieved proficiency in AI workflows without formal training, developed strong communication skills in two languages, and stay driven to improve.",
    "I'm self-taught in modern AI tools, reliable in my work approach, and committed to learning and adapting in fast-changing digital environments.",
    "My key achievements are self-directed learning in AI and content creation, bilingual fluency, and a consistent focus on personal and professional growth.",
    "I've built expertise in AI-assisted workflows on my own, communicate effectively in Telugu and English, and maintain strong motivation for skill development.",
    "I'm accomplished in self-learning AI tools, skilled in bilingual communication, and dedicated to building practical abilities for real-world applications.",
  ],

  fallback: [
    "I think you're asking about something related to my background. I can tell you about my skills, projects, experience, education, or how to contact me—what interests you most?",
    "Let me help you with that! Feel free to ask about my work, skills, projects, or ways to get in touch. I'm here to help!",
    "I'd be happy to share more! You can ask about my background, what I do, my projects, or how to connect with me.",
    "Great question! I can share info about who I am, what I do, my projects, social links, or how to reach me. What would you like to know?",
    "I'm here to help! Ask me about my skills, experience, education, portfolio, or ways to connect—I'll do my best to answer!",
    "Let me point you in the right direction! I can tell you about my background, projects, social media, or contact details.",
    "I'm happy to help! Feel free to ask about my work, skills, education, achievements, or how to support me!",
    "That's an interesting question! I can help with questions about my projects, experience, portfolio, or contact information.",
    "I want to make sure I help you. Ask about my skills, background, social links, or ways to reach me—I'm ready!",
    "Good question! I can share details about who I am, what I've built, my skills, education, or how we can connect.",
  ],

  goodbye: [
    "Thanks for chatting! Feel free to reach out at devicharangeddada@gmail.com or connect with me on social media. Have a great day!",
    "It was great talking with you! Don't hesitate to contact me if you have more questions. Take care and stay awesome!",
    "Appreciate the conversation! Hit me up anytime at devicharangeddada@gmail.com or find me on LinkedIn. Catch you later!",
    "Thanks for stopping by! Feel free to email me or connect on socials whenever you want. Have an amazing day ahead!",
    "It's been a pleasure! Reach out anytime through email or social media—I'd love to stay connected. Take care!",
    "Thanks for your time! Don't be a stranger—email me or follow my socials to stay in touch. See you around!",
    "Great chatting with you! Feel free to contact me anytime at devicharangeddada@gmail.com. Wishing you all the best!",
    "Thanks for the chat! I'm just an email or message away if you need anything. Have a wonderful day!",
    "It was nice connecting! Reach out anytime via email or social platforms—I'm always happy to chat. Take care!",
    "Thanks for reaching out! Don't hesitate to contact me for anything. Have a fantastic day and stay in touch!",
  ],
};

// ============= UTILITY FUNCTIONS =============
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Normalize input: apply alias corrections and clean up
function normalizeInput(input) {
  let normalized = input.toLowerCase().trim();
  
  // Apply alias corrections
  for (const [typo, correct] of Object.entries(aliasMap)) {
    // Use word boundary matching for better accuracy
    const regex = new RegExp(`\\b${typo}\\b`, 'gi');
    normalized = normalized.replace(regex, correct);
  }
  
  // Clean up extra spaces
  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  return normalized;
}

// Enhanced fuzzy matching with lower threshold for better typo tolerance
function fuzzyMatch(input, keywords, threshold = 0.3) {
  const fuse = new Fuse(keywords.map(k => ({ keyword: k })), {
    keys: ['keyword'],
    threshold: threshold,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2
  });
  
  // Check each word in input
  const words = input.split(' ');
  for (const word of words) {
    if (word.length < 2) continue;
    const results = fuse.search(word);
    if (results.length > 0 && results[0].score < threshold) {
      return true;
    }
  }
  
  // Also check full input
  const fullResults = fuse.search(input);
  return fullResults.length > 0 && fullResults[0].score < threshold;
}

// Pattern matching for common phrases
function matchPatterns(input, patterns) {
  for (const pattern of patterns) {
    if (pattern.test(input)) {
      return true;
    }
  }
  return false;
}

// Smart intent detection combining keywords, patterns, and fuzzy matching
function detectIntent(input) {
  const normalized = normalizeInput(input);
  
  // Check each intent
  for (const [intent, config] of Object.entries(intentKeywords)) {
    // 1. Check exact keyword matches first (fastest)
    for (const keyword of config.keywords) {
      if (normalized.includes(keyword)) {
        return intent;
      }
    }
    
    // 2. Check regex patterns
    if (config.patterns && matchPatterns(normalized, config.patterns)) {
      return intent;
    }
    
    // 3. Fuzzy matching for typos (with lower threshold = more lenient)
    if (fuzzyMatch(normalized, config.keywords, 0.35)) {
      return intent;
    }
  }
  
  return null;
}

// Find the most relevant fallback based on partial matches
function getSmartFallback(input) {
  const normalized = normalizeInput(input);
  const words = normalized.split(' ').filter(w => w.length > 2);
  
  // Score each intent by partial matches
  let bestIntent = null;
  let bestScore = 0;
  
  for (const [intent, config] of Object.entries(intentKeywords)) {
    let score = 0;
    for (const word of words) {
      for (const keyword of config.keywords) {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 1;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }
  
  // If we found a reasonable match, use it instead of generic fallback
  if (bestScore > 0 && bestIntent) {
    return bestIntent;
  }
  
  return null;
}

// Simulate human typing delay
async function typingDelay() {
  const delay = 400 + Math.random() * 500;
  await new Promise(resolve => setTimeout(resolve, delay));
}

// ============= MAIN RESPONSE LOGIC =============
async function getResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Add typing delay for realism
  await typingDelay();
  
  // Store conversation context
  conversationContext.push(input);
  if (conversationContext.length > 5) conversationContext.shift();
  
  // Handle "tell me more" or follow-up questions
  if ((input.includes('more') || input.includes('elaborate') || input.includes('explain') || input.includes('details') || input.includes('expand')) && lastIntent) {
    const expandedResponses = {
      skills: [
        "I'd love to! Beyond the basics, I'm really passionate about AI-assisted workflows. I use tools like ChatGPT and Claude for content ideation, and I've taught myself prompt engineering to get the best results. I also work with DaVinci Resolve for advanced color grading and CapCut for quick social media edits.",
        "Sure thing! When it comes to design, I use Canva for quick mockups and social posts, but I also dive into Photoshop for more detailed work. I'm comfortable with data organization in Google Sheets and I'm always learning new tools—recently been exploring Figma and web animation.",
        "Absolutely! My bilingual skills (Telugu and English) really help me create content for diverse audiences. I also focus on storytelling in my video work—matching music to emotion, pacing clips perfectly, and adding subtle effects that enhance without overwhelming.",
      ],
      projects: [
        "Let me share more! My portfolio website was built using AI builders and Wix—I wanted something clean and professional that showcases my work effectively. For video projects, I've created everything from travel vlogs to product demos, focusing on smooth transitions and engaging pacing.",
        "Great question! One project I'm proud of is a series of social media videos where I experimented with motion graphics and music sync. I also built mock databases for practice, organizing data efficiently and creating visual reports. Each project teaches me something new!",
        "I'd be happy to elaborate! My design work includes posters, infographics, and social media content—always keeping the target audience in mind. I also practice web design fundamentals, making sure sites are responsive and user-friendly across devices.",
      ],
      about: [
        "Thanks for asking! Beyond the basics, I'm someone who thrives on learning and adapting. I started with electrical engineering but discovered my passion for digital creation along the way. I love problem-solving, whether it's technical challenges or creative roadblocks.",
        "I appreciate your interest! I'm from Visakhapatnam, a coastal city in India, and I balance my B.Tech studies with building practical digital skills. I believe in hands-on learning—I'd rather build something imperfect than wait for the 'perfect' moment to start.",
        "Glad you want to know more! I'm motivated by growth and impact. I want to create content that resonates with people, tools that make life easier, and solutions that actually solve problems. I'm always open to feedback and new opportunities to learn.",
      ]
    };
    
    if (expandedResponses[lastIntent]) {
      return { text: randomChoice(expandedResponses[lastIntent]) };
    }
  }
  
  // Detect intent using smart matching
  let intent = detectIntent(input);
  
  // If no intent found, try smart fallback
  if (!intent) {
    intent = getSmartFallback(input);
  }
  
  // Handle detected intent
  if (intent) {
    lastIntent = intent;
    
    switch (intent) {
      case 'greeting':
        return { text: randomChoice(responses.greeting) };
      
      case 'about':
        return { text: randomChoice(responses.about) };
      
      case 'skills':
        return { text: randomChoice(responses.skills) };
      
      case 'projects':
        return {
          text: randomChoice(responses.projects),
          buttons: responses.portfolio.buttons
        };
      
      case 'contact':
        return {
          text: randomChoice(responses.contact.text),
          buttons: responses.contact.buttons
        };
      
      case 'social':
        return {
          text: randomChoice(responses.social.text),
          buttons: responses.social.buttons
        };
      
      case 'portfolio':
        return {
          text: randomChoice(responses.portfolio.text),
          buttons: responses.portfolio.buttons
        };
      
      case 'support':
        return {
          text: randomChoice(responses.support.text),
          buttons: responses.support.buttons
        };
      
      case 'experience':
        return { text: randomChoice(responses.experience) };
      
      case 'education':
        return { text: randomChoice(responses.education) };
      
      case 'achievements':
        return { text: randomChoice(responses.achievements) };
      
      case 'goodbye':
        lastIntent = null;
        conversationContext = [];
        return { text: randomChoice(responses.goodbye) };
    }
  }
  
  // Fallback with helpful guidance
  lastIntent = 'fallback';
  return { text: randomChoice(responses.fallback) };
}

export default getResponse;
