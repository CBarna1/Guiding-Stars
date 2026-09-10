// src/pages/Team.tsx
import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import ScrollProgress from '../components/ScrollProgress';
import HeroCarousel from '../components/HeroCarousel';
import Tag from '../components/Tag';
import { SEOHelmet } from '../hooks/useSEO';
import api from '../services/api';

// Team member images (use root-relative public paths)
const twaambo = "/img/TEAM/Twaambo Chisamba Kayombo.png";
const lisa = "/img/TEAM/Lisa T Chansa.png";
const nangoma = "/img/TEAM/Nangoma Mwanamoonte.png";
const tabitha = "/img/TEAM/Tabitha Muzumara.png";
const edward = "/img/TEAM/Edward Kafusa.png";
const lwanga = "/img/TEAM/Lwanga C Luchembe.png";

const teamMembers = [
  {
    name: 'Ms. Twaambo Chisamba Kayombo',
    role: 'CEO & Founder',
    image: twaambo,
    description: 'Through this role, she provides strategic leadership and sets the overall vision and direction of the organization, ensuring alignment of all programs, operations, and partnerships with its mission and goals. She oversees organizational growth, governance, and stakeholder engagement while driving innovation and long-term impact across all initiatives.'
  },
  {
    name: 'Ms. Tabitha Muzumara',
    role: 'Sales & Marketing Coordinator',
    image: tabitha,
    description: 'Through this position, she promotes the organization, attracts mentors and mentees, and develops marketing strategies to increase engagement.'
  },
  {
    name: 'Mr. Edward Kafusa',
    role: 'Events & Program Coordinator',
    image: edward,
    description: 'Through this role, he plans and coordinates mentorship programs and events, fostering meaningful interactions between mentors and mentees & other stakeholders. He also serves as Co-Administrator for the organization, supporting overall coordination and operations.'
  },
  {
    name: 'Ms. Nangoma Mwanamoonte',
    role: 'Finance & Administration Coordinator',
    image: nangoma,
    description: 'Through this role, she oversees financial and administrative functions, ensuring effective resource management, organizational compliance, and smooth day-to-day operations that support the organization\'s activities.'
  },
  {
    name: 'Mr. Chilufya Lwanga Luchembe',
    role: 'Mentorship Program Coordinator',
    image: lwanga,
    description: 'Through this role, he oversees the planning and implementation of mentorship programs, facilitating meaningful engagement between mentors and mentees while ensuring the overall success and impact of the program.'
  },
  {
    name: 'Ms. Lisa Taonga Chansa',
    role: 'Digital & Communications Coordinator',
    image: lisa,
    description: 'Through this role, she manages the organization\'s digital presence, brand, and public relations, creating engaging content, enhancing visibility, and driving audience engagement across platforms.'
  },
];

const Team = () => {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/content')
      .then(res => setContent(res.data?.data || {}))
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  // Build team members with CMS descriptions at render time
  const teamWithContent = useMemo(() => [
    { ...teamMembers[0], description: content.team_twaambo_desc || teamMembers[0].description },
    { ...teamMembers[1], description: content.team_tabitha_desc || teamMembers[1].description },
    { ...teamMembers[2], description: content.team_edward_desc  || teamMembers[2].description },
    { ...teamMembers[3], description: content.team_nangoma_desc || teamMembers[3].description },
    { ...teamMembers[4], description: content.team_chilufya_desc|| teamMembers[4].description },
    { ...teamMembers[5], description: content.team_lisa_desc    || teamMembers[5].description },
  ], [content]);

  const filteredTeam = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teamWithContent;
    return teamWithContent.filter(
      (m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
    );
  }, [search, teamWithContent]);

  const toggleFlip = (name: string) => {
    setFlipped(flipped === name ? null : name);
  };

  const onCardKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(name);
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* SEO Meta Tags */}
      <SEOHelmet pageName="team" />

      <ScrollProgress />

      {/* Hero Section with Carousel */}
      <HeroCarousel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
          {content.team_hero_title || 'MEET OUR TEAM'}
        </h1>
        <p className="text-base md:text-xl text-gray-100">{content.team_section_subtitle || 'Dedicated professionals committed to transforming lives through mentorship'}</p>
      </HeroCarousel>

      {/* Team Members Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search / filter */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or role..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-[#FF9148] focus:ring-2 focus:ring-[#FF9148]/20 outline-none transition"
              />
            </div>
          </div>

          {filteredTeam.length === 0 ? (
            <p className="text-center text-gray-500">No team members match "{search}".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeam.map((member, index) => (
                <Reveal key={member.name} delay={index * 80} className="h-96">
                  <div
                    className="group h-96 cursor-pointer perspective hover:-translate-y-1 transition-transform duration-300"
                    onClick={() => toggleFlip(member.name)}
                    onKeyDown={(e) => onCardKeyDown(e, member.name)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={flipped === member.name}
                    aria-label={`${member.name}, ${member.role}. Press to ${flipped === member.name ? 'hide' : 'show'} details.`}
                  >
                  <div
                    className="relative w-full h-full transition-transform duration-500 transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped === member.name ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front of card - Image & Name */}
                    <div
                      className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-orange-50 to-gray-50">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-40 h-48 object-cover rounded-lg mx-auto mb-4 border-4 shadow-md"
                          style={{ borderColor: '#FF9148' }}
                        />
                        <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                        <Tag className="mt-2" variant="outline">{member.role}</Tag>
                        <p className="text-xs text-gray-500 mt-3">Click to learn more</p>
                      </div>
                    </div>

                    {/* Back of card - Description */}
                    <div
                      className="absolute w-full h-full bg-gradient-to-br rounded-xl shadow-lg overflow-hidden p-6 flex items-center justify-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)',
                      }}
                    >
                      <div className="text-white text-center">
                        <h4 className="text-lg font-bold mb-3">{member.role}</h4>
                        <p className="text-sm leading-relaxed opacity-95">{member.description}</p>
                        <p className="text-xs mt-4 opacity-75">Click to go back</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Team;