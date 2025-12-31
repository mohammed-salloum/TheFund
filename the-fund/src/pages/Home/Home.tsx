import './Home.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import ServicesGuide from '../../components/ServicesGuide/ServicesGuide';
import MediaCenter from '../../components/MediaCenter/MediaCenter';
import Partners from '../../components/Partners/Partners';
import DigitalParticipation from '../../components/DigitalParticipation/DigitalParticipation';

const Home: React.FC = () => {
  return (
    <main className="main-home">

      {/* Hero Section */}
      <Hero />

      {/* About / Introduction */}
      <section className="section-gap">
        <About />
      </section>

      {/* Services */}
      <section className="section-gap">
        <ServicesGuide />
      </section>

      {/* Media Center */}
      <section id="media-center-section" className="section-gap">
        <MediaCenter />
      </section>

      {/* Digital Participation */}
      <section className="section-gap">
        <DigitalParticipation />
      </section>

      {/* Partners */}
      <section id="partners-section" className="section-gap">
        <Partners />
      </section>

    </main>
  );
};

export default Home;
