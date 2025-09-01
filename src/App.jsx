import React, { useState } from 'react';

// The following CSS is added to make the video in the Memories page responsive
// It uses a common technique with a container to maintain a 16:9 aspect ratio.
// I've also set the font family to 'Inter' for a consistent look across the app.
const responsiveStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  
  body {
    font-family: 'Inter', sans-serif;
  }
  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    position: relative;
    height: 0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

// Updated student data for Dzivarasekwa Hub with project links
const studentsData = [
  // Digital Marketing Students
  {
    id: 'dm-1',
    name: 'Precious Tendayi',
    specialization: 'Digital Marketing',
    hub: 'Dzivarasekwa',
    photo: '/images/precious-tendayi.jpg',
    projectTitle: 'Digital Marketing Strategy & Website Audit',
    projectDescription: 'Led the development of a full digital marketing strategy and website audit for Wanamari, a Zimbabwean financial services brand. The project focused on identifying website performance issues and creating a results-driven digital strategy to improve traffic, engagement, and conversions.',
    projectImage: '/images/precious-pr.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/precious-tendayi-b58650284/',
    githubUrl: null, //
  },
  {
    id: 'dm-2',
    name: 'Ruvarashe Masarira',
    specialization: 'Digital Marketing',
    hub: 'Dzivarasekwa',
    photo: '/images/ruvarashe-masaira.jpg',
    projectTitle: ' YouTube video campaign ',
    projectDescription: 'Letas Design is a powerhouse brand that creates custom-made clothing for women aged 20–28, celebrating individuality, style, and confidence for every occasion. From brunch with the girls to elegant evening wear, this brand truly does it all.',
    projectImage: '/images/ruva-pr.png',
    linkedinUrl: 'https://www.linkedin.com/posts/ruvarashe-masarira-703030347_digitalmarketing-youtubemarketing-letasdesign-activity-7331672914452287491-ELO0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFaWnqYBpO85Nb-tzPm_JxfibqBM8rbTXKsn',
    githubUrl: null,
  },
  {
    id: 'dm-3',
    name: 'Munashe Charindapazne',
    specialization: 'Digital Marketing',
    hub: 'Dzivarasekwa',
    photo: '/images/tutu.jpg',
    projectTitle: 'Content Marketing for Educational Platform',
    projectDescription: 'Created a content marketing plan and produced engaging blog posts, videos, and infographics for an online educational platform targeting high school students.',
    projectImage: 'https://placehold.co/400x250/1A56DB/FFFFFF?text=DM+Project+3',
    linkedinUrl: 'https://www.linkedin.com/in/munashe-charindapazne-profile',
    githubUrl: null,
  },
  {
    id: 'dm-4',
    name: 'Nomsa Sibanda',
    specialization: 'Digital Marketing',
    hub: 'Dzivarasekwa',
    photo: '/images/nonono.jpg',
    projectTitle: 'Marketing Plan For Her Brand the Dream Craft Coders ',
    projectDescription: 'Came up with her own brand and designed the marketing plan of her brand-Dream Craft Coders .',
    projectImage: '/images/nomsa-pr.png',
    linkedinUrl: 'https://www.linkedin.com/in/nomsa-sibanda-275492347/',
    design:'https://www.canva.com/design/DAGr1O4sVBU/vYX75M0Hh6PoNkZDZHmTcw/edit' ,
  },

  // Development Students
  {
    id: 'dev-1',
    name: 'Nicole Tatenda Zonke (Me)',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/mukundi.jpg',
    projectTitle: 'Interactive Yearbook Web Application',
    projectDescription: 'Developed a dynamic web application to showcase student profiles and projects for the Dzivarasekwa Hub yearbook, featuring responsive design and smooth navigation.',
    projectImage: '/images/my pr.png',
    linkedinUrl: 'https://www.linkedin.com/in/nicole-zonke-profile', 
    githubUrl: 'https://github.com/nicolezonke/yearbook-project', 
  },
  {
    id: 'dev-2',
    name: 'Sharon Mwandura',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/sharon.jpg',
    projectTitle: 'Eco Basket Online Shop (Pure HTML)',
    projectDescription: 'Developed an online shop using pure HTML, "Eco Basket," which sells fresh vegetables and healthy produce like maize and various other vegetables, focusing on a simple and accessible user interface.',
    projectImage: '/images/eco-basket.png',
    linkedinUrl: 'https://www.linkedin.com/in/sharon-e-mwandura-3a576234b',
    githubUrl: 'https://github.com/sharonmwandura/community-events-app',
  },
  {
    id: 'dev-3',
    name: 'Fellan (Sauce) Mahove',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/sauce.jpg',
    projectTitle: 'Inventory Management System for SMEs',
    projectDescription: 'Created a web-based inventory management system tailored for small and medium-sized enterprises (SMEs) to track stock, sales, and orders efficiently.',
    projectImage: 'https://placehold.co/400x250/1A56DB/FFFFFF?text=Dev+Project+3',
    linkedinUrl: 'https://www.linkedin.com/in/fellan-mahove-profile',
    githubUrl: 'https://github.com/fellanmahove/inventory-system',
  },
  {
    id: 'dev-4',
    name: 'Michael (Glockboy) Dendere',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/mikela.jpg',
    projectTitle: 'AI Notes Taker App',
    projectDescription: 'Developed a AI powered note taking application.',
    projectImage: '/images/mikela pr.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/michael-dendere-profile',
    githubUrl: 'https://app-ai-note.vercel.app/ ',
  },
  {
    id: 'dev-5',
    name: 'Tadiwanashe Sipambeni',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/dickhead.jpg',
    projectTitle: 'VID Project for Driving in Zimbabwe',
    projectDescription: 'Developed a project related to Vehicle Identification Document (VID) processes, specifically tailored for driving regulations and procedures in Zimbabwe.',
    projectImage: '/images/tadex.jpg', 
    linkedinUrl: null,
    githubUrl: 'https://github.com/Tadiwanashe20/MIniproject.git',
  },
  { id: 'dev-6',
    name: 'Funie Franklin Zhuwao',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/funie-zhuwao.jpg',
    projectTitle: 'Crop Disease Detection',
    projectDescription: 'Developed a web application where users can upload crop pictures to detect the crop disease, discover.',
    projectImage: '/images/funie.png',
    linkedinUrl: 'https://www.linkedin.com/in/funie-zhuwao-9a5961343/',
    githubUrl: 'https://crop-disease-detector-v2-ba.vercel.app/',
  },

  {
    id: 'dev-7',
    name: 'Tafadzwa (Baba Harare) Kanhoodza',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/tafadzwa-kanhohodza.jpg',
    projectTitle: 'Easy Park Space Finder app',
    projectDescription: 'Created an app that finds free parking space easily with real time availability and easy booking system.',
    projectImage: '/images/taflo.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/tafadzwa-kanhoodza-profile',
    githubUrl: 'https://parking-space-finder-five.vercel.app/',
  },
  {
    id: 'dev-8',
    name: ' Makomborero Kayden Chidziva',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/kayden.jpg',
    projectTitle: 'SnapEvent-An app that allows you to take pictures and create events,share QR code and also collect photos.',
    projectDescription: 'Created instant photo galleries for events. Guests can scan, share, and view photos in real time No apps No accounts. No friction.',
    projectImage: '/images/kayden-pr.png',
    linkedinUrl: 'https://www.linkedin.com/in/kayden-profile',
    githubUrl: 'https://snap-event-henna.vercel.app/#',
  },
  {
    id: 'dev-9',
    name: 'Niget Sota',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/sota.jpg',
    projectTitle: 'Support Ticket System Web App',
    projectDescription: 'Built a system that analyzes ticket content and, in real-time, predicts the correct category and routes it to the right team. This not only streamlines the process but also drastically reduces response times, freeing up teams to focus on solving problems, not sorting them.',
    projectImage: '/images/sota nigel.jpg',
    linkedinUrl: 'https://ticket-pilot-nu.vercel.app/',
    githubUrl: '',
  },
  {
    id: 'dev-10',
    name: 'Dion Dzwengwe',
    specialization: 'Development',
    hub: 'Dzivarasekwa',
    photo: '/images/dion.jpg',
    projectTitle: 'Weather Forecasting Web App',
    projectDescription: 'Built a web application that fetches and displays real-time weather data for various locations using external APIs, with a clean and intuitive interface.',
    projectImage: 'https://placehold.co/400x250/EC4899/FFFFFF?text=Dev+Project+9',
    linkedinUrl: 'https://www.linkedin.com/in/niget-sota-profile',
    githubUrl: 'https://github.com/nigetsota/weather-app',
  },

  // Design Students
  {
    id: 'des-1',
    name: 'Millicent Gumbira',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/millicent-gumbira.jpg',
    projectTitle: 'Millie Trends - E-commerce Platform Design',
    projectDescription: `She designed Millie Trends, her first UI/UX website project. It's an e-commerce platform for plus-size women, focusing on creating a modern, body-positive online space. The project allowed her to explore visual hierarchy, layout, and mobile responsiveness in Figma.`,
    projectImage: '/images/millicent-pr.png',
    linkedinUrl: 'https://www.figma.com/design/0ZIl3qaRzt1QmOqjlWAPoW/Website-Project?node-id=0-1&t=upx0EyhSC5r9dUgN-1', // Updated to Figma link
    githubUrl: null,
  },
  {
    id: 'des-2',
    name: 'Welma Kayanga',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/welma-kayanga.jpg',
    projectTitle: 'Wedding and Events Planner Web App',
    projectDescription: 'Designed a wedding and events planner web app .',
    projectImage: '/images/welma-pr.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/welma-kayanga-profile',
    githubUrl: null,
  },
  {
    id: 'des-3',
    name: 'Tapiwa Gombarume',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/tapiwa.jpg',
    projectTitle: 'HustleHub-A mobile platform',
    projectDescription: 'Created a mobile platform for side hustlers,informal traders and small business owners that heps them grow their businesses and connect with more customers.',
    projectImage: '/images/tapiwa-pr.png',
    linkedinUrl: 'https://www.linkedin.com/posts/tapiwa-gombarume-16b033347_productdesign-zimtech-designforafrica-activity-7340647493967175681-rqI9?utm_source=share&utm_medium=member_android&rcm=ACoAAFat-CMBMgnJU5qpgeQGRbZonAFj5mggZ58',
    githubUrl: null,
  },
  {
    id: 'des-4',
    name: 'Malcom Mbazangi',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/malcom.jpg', // Placeholder, replace with actual if available
    projectTitle: 'Website Layout and Visual Design for a Startup',
    projectDescription: 'Designed the complete visual layout and user interface for a new tech startup\'s website, ensuring a modern, intuitive, and engaging user experience.',
    projectImage: 'https://placehold.co/400x250/EC4899/FFFFFF?text=Design+Project+4',
    linkedinUrl: 'https://www.linkedin.com/in/malcom-mbazangi-profile',
    githubUrl: null,
  },
  {
    id: 'des-5',
    name: 'Kirsty Matyukira',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/serviek.jpg',
    projectTitle: 'E-Commerce App',
    projectDescription: 'E-commerce app that sells hygiene products.',
    projectImage: '/images/servie-pr.png',
    linkedinUrl: 'https://www.linkedin.com/posts/kirsty-matyukira-008766309_darkui-ecommercedesign-womenintech-activity-7354514399430115330-N5Og?utm_source=share&utm_medium=member_ios&rcm=ACoAAFaWnqYBpO85Nb-tzPm_JxfibqBM8rbTXKs c ;p',
    githubUrl: null,
  },
  {
    id: 'des-6',
    name: 'Lorraine Thom',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/lorraine.jpg',
    projectTitle: 'Designed the Yo Mix Mobile App',
    projectDescription: 'Designed a mobile app, focusing on user friendly features and interactive interface.',
    projectImage: '/images/lolo pr.jpg',
    linkedinUrl: null,
    githubUrl: 'https://www.figma.com/design/HANgfzCCy1JraVXyoiwsAq/Untitled?node-id=0-1&t=L5R5CsmsV65nzs4F-1',
  },
  {
    id: 'des-7',
    name: 'Dennis Tapiwa Chidamaya',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/dennis.jpg', // Placeholder, replace with actual if available
    projectTitle: 'Infographic Series for Public Health Campaign',
    projectDescription: 'Created a series of informative and visually compelling infographics to support a public health awareness campaign on common diseases.',
    projectImage: 'https://placehold.co/400x250/10B981/FFFFFF?text=Design+Project+7',
    linkedinUrl: 'https://www.linkedin.com/in/tapiwa-chidamaya-profile',
    githubUrl: null,
  },
  {
    id: 'des-8',
    name: 'Anesu Mamu Zakeyu',
    specialization: 'Design',
    hub: 'Dzivarasekwa',
    photo: '/images/anesu-mamu.jpg',
    projectTitle: 'An online electronics store',
    projectDescription: 'Anesu created an online electronics store that redefines the way people shop for gadgets. His design approach prioritizes intuitive navigation, visually appealing interfaces, and streamlined checkout processes, making is app a go-to destination for tech enthusiasts.',
    projectImage: '/images/mamu pr.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/anesu-mamu-profile',
    githubUrl: 'https://www.figma.com/design/bxq0dk1ri9SfIF3de2bLDd/Ancola?node-id=0-1&t=z9hV0KWwOr0QZZnY-1',
  },
];

// Instructor Data
const instructorsData = [
  {
    id: 'inst-1',
    name: 'Fadzai Chigoma',
    role: 'Instructor',
    photo: '/images/fadzie.jpg',
    bio: 'Fadzi, Digital Marketing Instructor: Fadzi specializes in the dynamic field of digital marketing. She teaches students how to create and execute effective marketing campaigns, understand consumer behavior, and utilize various digital platforms to promote projects and businesses.',
  },
  {
    id: 'inst-2',
    name: 'Simbarashe Mhlaulo',
    role: 'Hub Lead/Instructor',
    photo: '/images/sir simba.png', 
    bio: 'Simba, Web Development Instructor & Hub Lead: As both the Web Development Instructor and the Hub Lead, Simba is at the forefront of the hubs technical and administrative direction. He is responsible for teaching students the fundamentals and advanced topics of web development while also overseeing the day-to-day operations and strategic vision of the entire hub.',
  },
  {
    id: 'inst-3',
    name: 'Collin Manyande',
    role: 'Instructor',
    photo: '/images/collin.png', 
    bio: 'Colin, UI/UX Design Instructor: Colin is the expert in UI/UX design. His role is to instruct students on the principles of creating user-friendly and aesthetically pleasing interfaces and experiences. He guides them in developing designs that are not only beautiful but also intuitive and functional for end-users.',
  },
];


// Header Component
const Header = ({ navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu when a link is clicked
  const handleNavLinkClick = (page) => {
    setIsMenuOpen(false);
    navigate(page);
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-lg z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-2xl font-bold font-inter text-white">Dz Hub Yearbook</h1>
        </div>
        {/* Mobile menu toggle button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
        <nav className="hidden md:block">
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left">
            <li>
              <button onClick={() => handleNavLinkClick('home')} className="w-full flex items-center justify-center px-4 py-2 text-white hover:text-gray-200 transition-colors duration-300 rounded-lg">
                <span className="font-medium">Home</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavLinkClick('students')} className="w-full flex items-center justify-center px-4 py-2 text-white hover:text-gray-200 transition-colors duration-300 rounded-lg">
                <span className="font-medium">Students</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavLinkClick('projects')} className="w-full flex items-center justify-center px-4 py-2 text-white hover:text-gray-200 transition-colors duration-300 rounded-lg">
                <span className="font-medium">Projects</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavLinkClick('memories')} className="w-full flex items-center justify-center px-4 py-2 text-white hover:text-gray-200 transition-colors duration-300 rounded-lg">
                <span className="font-medium">Memories</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavLinkClick('instructors')} className="w-full flex items-center justify-center px-4 py-2 text-white hover:text-gray-200 transition-colors duration-300 rounded-lg">
                <span className="font-medium">Instructors</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Collapsible mobile menu */}
      <nav className={`${isMenuOpen ? 'h-auto py-2' : 'h-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
        <ul className="flex flex-col space-y-2 text-center">
          <li>
            <button onClick={() => handleNavLinkClick('home')} className="w-full px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              <span className="font-medium">Home</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleNavLinkClick('students')} className="w-full px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              <span className="font-medium">Students</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleNavLinkClick('projects')} className="w-full px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              <span className="font-medium">Projects</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleNavLinkClick('memories')} className="w-full px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              <span className="font-medium">Memories</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleNavLinkClick('instructors')} className="w-full px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              <span className="font-medium">Instructors</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-100 text-gray-800 p-6 text-center shadow-inner mt-8">
    <div className="container mx-auto">
      <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Dzivarasekwa Hub. All rights reserved.</p>
      <p className="text-xs md:text-sm mt-2">Designed and created with passion by the Dzivarasekwa Hub's Nicole Tatenda Zonke.</p>
    </div>
  </footer>
);

// Home Page Component
const HomePage = ({ navigate }) => (
  <section className="min-h-screen bg-white flex items-center justify-center pt-24 pb-8">
    <div className="container mx-auto p-8 text-center text-gray-800">
      <h2 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight mb-4">
        Celebrating a Year of Innovation at <span className="text-blue-600">Uncommon.Org</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        From January's curiosity to December's capability, witness the journey from zero to empowered.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <button onClick={() => navigate('students')} className="button-secondary bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
          View Students
        </button>
        <button onClick={() => navigate('projects')} className="button-secondary bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
          Explore Projects
        </button>
      </div>

      {/* Inspirational Quote Section */}
      <div className="mt-16 p-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl italic font-serif text-gray-700">
          "The roots of education are bitter, but the fruit is sweet."
        </p>
        <p className="text-md md:text-lg mt-4 font-medium text-gray-500">- Aristotle</p>
      </div>
    </div>
  </section>
);

// Students Grid Page Component
const StudentsPage = ({ navigate, setSelectedStudent }) => (
  <section className="bg-white text-gray-800 min-h-screen pt-24 pb-8">
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">The Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {studentsData.map((student) => (
          <div
            key={student.id}
            className="student-card bg-gray-100 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => {
              setSelectedStudent(student);
              navigate('studentDetail');
            }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={student.photo}
                alt={student.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/1A56DB/FFFFFF?text=${student.name.split(' ').map(n => n[0]).join('')}`; }}
              />
              {/*
                 * FIX: The student's name was not appearing because of a class conflict and a lack of specific positioning.
                 * The original code had both 'text-gray-900' and 'text-white' on the same element. 'text-gray-900' was likely overriding 'text-white'.
                 * I have removed the conflicting class and added positioning classes ('absolute', 'bottom-4', 'left-4') to make the name visible and correctly placed.
                 * I also changed the gradient from-gray-200 to from-black to ensure the white text is readable against the image.
                 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <p className="absolute bottom-4 left-4 text-xl font-bold text-white z-10">{student.name}</p>
            </div>
            <div className="p-6">
              <p className="text-blue-600 text-sm font-semibold mb-2">{student.specialization}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {student.projectDescription}
              </p>
              <button
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  setSelectedStudent(student);
                  navigate('studentDetail');
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Student Detail Page Component
const StudentDetailPage = ({ student, navigate }) => {
  // Determine the project link based on availability (GitHub preferred over LinkedIn)
  const projectLink = student.githubUrl || student.linkedinUrl;

  return (
    <section className="bg-white text-gray-800 min-h-screen pt-24 pb-8">
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 md:p-10 relative">
          <button onClick={() => navigate('students')} className="absolute top-4 left-4 flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-300">
            <svg className="h-5 w-5 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15.707 10.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 112 0v10.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span className="hidden md:inline">Back to Students</span>
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mt-8 md:mt-0">
            <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-blue-600">
              <img
                src={student.photo}
                alt={student.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/1A56DB/FFFFFF?text=${student.name.split(' ').map(n => n[0]).join('')}`; }}
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-800">{student.name}</h3>
              <p className="text-lg text-blue-600 mt-1">{student.specialization} Student</p>
              <p className="text-md text-gray-500 mt-1">{student.hub} Hub</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-300 pt-8">
            <h4 className="text-2xl font-bold text-blue-800 mb-4">
              {projectLink ? (
                <a href={projectLink} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center space-x-2">
                  <span>Featured Project: {student.projectTitle}</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              ) : (
                `Featured Project: ${student.projectTitle}`
              )}
            </h4>
            {/* Updated project image container with a consistent aspect ratio */}
            <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0">
              <div className="w-full md:w-1/2 flex-shrink-0 relative overflow-hidden" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <img
                  src={student.projectImage}
                  alt={student.projectTitle}
                  className="absolute inset-0 w-full h-full max-w-full object-contain rounded-lg shadow-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x225/1A56DB/FFFFFF?text=Project+Image`; }}
                />
              </div>
              <p className="text-gray-600 text-base md:w-1/2">{student.projectDescription}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-8">
            <h4 className="text-2xl font-bold text-blue-800 mb-4">Skills & Interests</h4>
            <div className="flex flex-wrap gap-2">
              {student.specialization === 'Development' && (
                <>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">React.js</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Node.js</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Python</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Database Management</span>
                </>
              )}
              {student.specialization === 'Design' && (
                <>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">UI/UX Design</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Graphic Design</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Figma</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Branding</span>
                </>
              )}
              {student.specialization === 'Digital Marketing' && (
                <>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Social Media Marketing</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Content Creation</span>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Analytics</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Page Component (simple listing for now)
const ProjectsPage = ({ navigate, setSelectedStudent }) => (
  <section className="bg-white text-gray-800 min-h-screen pt-24 pb-8">
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">Showcased Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {studentsData.map((student) => (
          <div
            key={student.id}
            className="bg-gray-100 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => {
              setSelectedStudent(student);
              navigate('studentDetail');
            }}
          >
            {/* Updated project image container with a consistent aspect ratio */}
            <div className="w-full relative overflow-hidden" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <img
                  src={student.projectImage}
                  alt={student.projectTitle}
                  className="absolute inset-0 w-full h-full max-w-full object-contain rounded-t-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x225/1A56DB/FFFFFF?text=Project+Image`; }}
                />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-blue-600 mb-1">{student.projectTitle}</h3>
              <p className="text-sm text-gray-600 mb-2">{student.specialization} Project by {student.name}</p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {student.projectDescription}
              </p>
              <button
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  setSelectedStudent(student);
                  navigate('studentDetail');
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


// New Memories Page Component
const MemoriesPage = () => (
  <section className="bg-white text-gray-800 min-h-screen pt-24 pb-8">
    <div className="container mx-auto p-4 md:p-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Hub Memories Throughout The Year</h2>
      <p className="text-lg text-gray-600 mb-8">
        Watch our highlight reel and relive some of the best moments from our time at the Dzivarasekwa Hub!
      </p>
      {/* The video container now uses the responsive styling */}
      <div className="max-w-4xl mx-auto rounded-xl shadow-2xl">
        <div className="video-responsive">
          <iframe
            src="https://www.youtube.com/embed/rhwMgVx8oTM"
            title="Dzivarasekwa Hub Memories Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

// Instructors Page Component
const InstructorsPage = () => (
  <section className="bg-white text-gray-800 min-h-screen pt-24 pb-8">
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">Our Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructorsData.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-600">
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/000000/FFFFFF?text=${instructor.name.split(' ').map(n => n[0]).join('')}`; }}
              />
            </div>
            <h3 className="text-xl font-bold text-blue-800">{instructor.name}</h3>
            <p className="text-blue-600 text-sm font-medium">{instructor.role}</p>
            <p className="text-gray-600 text-sm mt-4">{instructor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Simple navigation function
  const navigate = (page) => {
    setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'students':
        return <StudentsPage navigate={navigate} setSelectedStudent={setSelectedStudent} />;
      case 'studentDetail':
        return <StudentDetailPage student={selectedStudent} navigate={navigate} />;
      case 'projects':
        return <ProjectsPage navigate={navigate} setSelectedStudent={setSelectedStudent} />;
      case 'memories':
        return <MemoriesPage />;
      case 'instructors':
        return <InstructorsPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{responsiveStyles}</style>
      <Header navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
