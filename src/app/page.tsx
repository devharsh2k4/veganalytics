"use client"


import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import FeaturesSection from './components/FeaturesSection';
import TeamSection from './components/TeamSection';

export default function Home() {

  return (
    <div className='min-h-screen bg-slate-950'>
     <Hero/>
     <InfiniteMarquee/>
     <FeaturesSection/>
     <TeamSection/>
    </div>
  );
}
