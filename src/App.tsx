import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Experience } from './components/sections/Experience';
import { Location } from './components/sections/Location';
import { Testimonials } from './components/sections/Testimonials';
import { Reservation } from './components/sections/Reservation';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main className="min-h-screen relative z-10">
        <Hero />
        <Services />
        <Experience />
        <Location />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}

export default App

