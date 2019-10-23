import React from 'react';

const About = () => {
    return ( 
        <div className="about">
            <div className="about__description">  
                <h1 className="about__title">About Us</h1>  
                <p>The BCA Relief for Middle Eastern Minorities club aims to raise money and awareness for issues facing ethnic and religious minorities, as well as other marginalized groups. This blog covers current events facing these communities, and also provides overviews of the history of marginalization across the region. We also raise money by selling Hi-Chew, and you can find someone on the leadership board, or another member in order to buy some. All profits go to CNEWA, the Catholic Near East Welfare Association. CNEWA provides aid and relief to displaced families and suffering people regardless of religion or creed.</p>
                <p>We meet Wednedsays in the upper cafeteria before school at 7:40AM.</p>
            </div>

            <div className="about__creators">
                <h1 className="about__creators__title">Contact Us</h1>
                <p>Presidents: Rimas Chacar-Palubinskas, Mark Ayob</p>
                <div className="about__creators__contact__container">
                    <a href="mailto:rimcha20@bergen.org" target="_blank" rel="noopener noreferrer" className="about__creators__contact">rimcha20@bergen.org</a>
                    <a href="mailto:marayo20@bergen.org" target="_blank" rel="noopener noreferrer" className="about__creators__contact">marayo20@bergen.org</a>
                </div>
                <p>Vice President: Zach Chan</p>
                <a href="mailto:zaccha20@bergen.org" target="_blank" rel="noopener noreferrer" className="about__creators__contact">zaccha20@bergen.org</a>
                <p>Webmaster: Miguel Roberts</p>
                <a href="mailto:migrob20@bergen.org" target="_blank" rel="noopener noreferrer" className="about__creators__contact">migrob20@bergen.org</a>
            </div>
        </div>
    );
}

export default About;