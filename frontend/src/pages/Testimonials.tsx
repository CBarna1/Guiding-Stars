import { useState } from 'react';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import ImageLightbox from '../components/ImageLightbox';
import ScrollProgress from '../components/ScrollProgress';
import HeroCarousel from '../components/HeroCarousel';
import Tag from '../components/Tag';
import { SEOHelmet } from '../hooks/useSEO';

// Testimonials organized by cohort with images
const testimonialsByCohort = {
  cohort2: {
    title: "Cohort Two Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'The mentorship I received through Guiding Stars has been invaluable. My mentor provided guidance that accelerated my professional growth significantly.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.46.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'Being part of Guiding Stars has transformed my perspective on leadership and career development. I feel more confident and prepared for the future.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.48.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'The support and guidance I received from my mentor has been instrumental in my personal and professional growth. I am grateful for this opportunity.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.50 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'This program has given me the tools and confidence I need to succeed. The mentorship experience has been transformational and inspiring.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.50.jpeg',
      },
    ]
  },
  cohort3: {
    title: "Cohort Three Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'Through Guiding Stars, I have discovered my potential and gained the confidence to pursue my dreams. The mentorship has been life-changing.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-04-30 at 11.48.22.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'The guidance and support I received has truly transformed my perspective and career trajectory.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.25.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'Being part of this cohort has connected me with amazing individuals and opened doors I never expected.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.26 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'The mentorship program has empowered me to take charge of my future and lead with purpose.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.26.jpeg',
      },
    ]
  },
  cohort4: {
    title: "Cohort Four Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'Guiding Stars has provided me with exceptional mentorship and networking opportunities that have shaped my career path positively.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.08.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'The program exceeded my expectations. The guidance, support, and community have been invaluable in my journey.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.13.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'I am grateful for the mentorship and the opportunity to grow both personally and professionally through Guiding Stars.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.14 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'This mentorship program has been a game-changer for me. I feel empowered and ready to make a difference in my field.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.14.jpeg',
      },
    ]
  },
};

const Testimonials = () => {
  const [selectedCohort, setSelectedCohort] = useState('cohort2');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const data = testimonialsByCohort[selectedCohort as keyof typeof testimonialsByCohort];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* SEO Meta Tags */}
      <SEOHelmet pageName="testimonials" />

      <ScrollProgress />

      {/* Hero Section with Carousel */}
      <HeroCarousel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
          STUDENT TESTIMONIALS
        </h1>
        <p className="text-base md:text-xl text-gray-100">Hear from our mentees about their transformational journey</p>
      </HeroCarousel>

      {/* Cohort Tabs */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(testimonialsByCohort).map(([key, cohort]) => (
              <button
                key={key}
                onClick={() => setSelectedCohort(key)}
                className={`btn-tactile px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  selectedCohort === key
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                style={{
                  background: selectedCohort === key ? 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' : undefined,
                }}
              >
                {cohort.title.split(' ')[0]} {cohort.title.split(' ')[1]}
              </button>
            ))}
          </div>
          <div className="sr-only-live" aria-live="polite">{`Showing ${data.title}`}</div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span style={{ color: '#FF9148' }}>{data.title}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the impact Guiding Stars has made on our mentees' lives and careers.
            </p>
          </div>

          <div className="space-y-12">
            {data.testimonials.map((testimonial, index) => (
              <Reveal
                key={testimonial.id}
                delay={(index % 4) * 80}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  {testimonial.image && (
                    <ImageWithSkeleton
                      src={testimonial.image}
                      alt={testimonial.name}
                      wrapperClassName="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      className="w-full h-64 lg:h-80 object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      onClick={() => setSelectedImage(testimonial.image)}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center">
                    <div className="mb-4 flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <Tag className="mb-4">{testimonial.role}</Tag>
                    <p className="text-gray-600 leading-relaxed text-base">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a transformative mentorship experience that will shape your future.
          </p>
          <a
            href="/apply"
            className="btn-tactile inline-block text-white px-9 py-4 rounded-lg font-semibold transition hover:brightness-110 text-lg bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
          >
            Apply Now
          </a>
        </div>
      </section>

      <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

      <Footer />
    </div>
  );
};

export default Testimonials;
