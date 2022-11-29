import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './hero-area.styles.scss';

{/** 
    Requirements for a good hero:
    - What is this?
    - What do you do?
    - What's in it for me?
 */}

const HeroArea = ({ handleChange, label, ...props}) => {
    return (
        <div className='hero-image'>
            <div className='hero-text'>
                <h1 className='core-value'>DEVEMORCE</h1>
                <p>FULL-STACK DEVELOPMENT</p>
                <CustomButton>GO TO PORTFOLIO</CustomButton>
            </div>
        </div> 
    )
};

export default HeroArea;