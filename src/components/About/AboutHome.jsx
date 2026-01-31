import React from 'react';
import AboutBanner from './AboutBanner';
import AboutHero from './AboutHero';
import Partners from './Partners';
import HistorySection from './HistorySection';
import MasterClassSection from './MasterClassSection';
import MeetOurTeam from './MeetOurTeam';

const AboutHome = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <AboutHero></AboutHero>
            <Partners></Partners>
            <HistorySection></HistorySection>
            <MasterClassSection></MasterClassSection>
            <MeetOurTeam></MeetOurTeam>
        </div>
    );
};

export default AboutHome;