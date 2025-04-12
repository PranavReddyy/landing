type Project = {
  name: string
  description: string
  link?: string
  video?: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Stock Trading Simulator',
    description:
      'Simulated stock market for 400+ students where university clubs acted as companies. Built with Next.js, Firebase, and WebSockets with local engines for real-time matching. Companies could post news, and admins had control over market conditions.',
    link: 'https://mcse.vercel.app',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744383071/mcse_apahbz.mp4',
    id: 'project1',
  },
  {
    name: 'Math Club Website',
    description:
      'Full-stack Next.js site for the Math Club with a custom backend-powered blog. Designed, developed, and maintained to boost engagement and event visibility.',
    link: 'https://mathsoc.club',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744493689/mathsocfinal_cmrzwm.mp4',
    id: 'project2',
  },
  {
    name: 'The Echo – University Newspaper Website',
    description:
      'Modern, full-featured platform for the official university newspaper. Built with Next.js and Firebase, it includes a sleek reading experience, anonymous article submissions, and a powerful admin dashboard to manage 200+ articles, events, and contributors. Also serves as a central hub for all campus happenings.',
    link: 'https://theechomu.vercel.app',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744493687/echofinal_xh936w.mp4',
    id: 'project9',
  },
  {
    name: 'Stalls at Fest – Food Ordering Platform',
    description:
      'Ongoing platform for ordering from temporary food stalls at university events. Built with Next.js, Firebase, and Redis. Users can book food, while stalls manage orders, stock, and view real-time statistics. Admin dashboard provides analytics and control.',
    link: 'https://aeonstalls.vercel.app',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744413847/stallsatfest_ekpxrp.mov',
    id: 'project8',
  },
  {
    name: 'Moodora – Mood Tracking App',
    description:
      'Next.js and Firebase-based app to track user moods over time. Features smooth UI, interactive charts, and persistent user history.',
    link: 'https://moodora.vercel.app',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744383058/moodora_ntycqf.mov',
    id: 'project3',
  },
  {
    name: 'COVID-19 Regression Analysis',
    description:
      'Explored 10k+ case records using Polynomial and Ridge Regression to predict trends. Evaluated using MSE and visualized insights via Matplotlib.',
    link: 'https://github.com/PranavReddyy/COVID-19-Regression-Analysis',
    id: 'project4',
  },
  {
    name: 'Diabetes Prediction Model',
    description:
      'KNN-based model on the Pima dataset with EDA, preprocessing, and evaluation via confusion matrix and classification metrics.',
    link: 'https://github.com/PranavReddyy/Diabetes-Prediction-Model',
    id: 'project5',
  },
  {
    name: 'Caffeinatic – Coffee Tracking App',
    description:
      'React and Firebase app to log daily caffeine intake. Tracks trends over time with real-time updates and clean, mobile-friendly UI.',
    link: 'https://caffeinatic.netlify.app',
    video: 'https://res.cloudinary.com/dknefj2hu/video/upload/v1744383057/caffeinatic_fg0oev.mov',
    id: 'project6',
  },
  {
    name: 'AI/ML Assignments & Implementations',
    description:
      'Collection of core ML implementations done during the IIITH AIML program — includes clustering, regression, and deep learning fundamentals.',
    link: 'https://github.com/PranavReddyy/Labs-IIITH',
    id: 'project7',
  },
]




export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Mathematics Society, Mahindra University',
    title: 'Head of Tech & Design',
    start: 'Aug. 2024',
    end: 'Present',
    link: 'https://www.linkedin.com/company/mathematics-club-mu/',
    id: 'work3',
  },
  {
    company: 'The Echo, University Paper',
    title: 'Head of Tech',
    start: 'Aug. 2024',
    end: 'Present',
    link: 'https://www.linkedin.com/company/the-echo-mu/',
    id: 'work4',
  },
  {
    company: 'Hacktoberfest 2024',
    title: 'Contributor – Phishing Site Detection',
    start: 'Oct. 2024',
    end: 'Oct. 2024',
    link: 'https://github.com/MU-Enigma/BotForge/tree/master/Level3/PranavReddyyy',
    id: 'work2',
  },
  {
    company: 'Self Employed',
    title: 'Freelance Designer/Web Developer',
    start: 'Aug. 2023',
    end: 'Present',
    link: 'https://github.com/PranavReddyy',
    id: 'work1',
  },
]



export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/PranavReddyy',
  },
  {
    label: 'Twitter',
    link: 'https://x.com/0xPranavReddy',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/pranavreddymitta/',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/pranavreddy.m/',
  },
]

export const EMAIL = 'pranavreddymitta@gmail.com'
