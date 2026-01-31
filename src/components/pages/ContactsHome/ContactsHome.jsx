import React from 'react';
import Contacts from '../Contacts';
import FAQList from '../FAQList';
import DiscountBanner from '../DiscountBanner';
import DeliveryConditions from '../DeliveryConditions';
import FindUs from '../FindUs';
import Mape from '../Mape';

const ContactsHome = () => {
    return (
        <div>
            <Contacts></Contacts>
            <FAQList></FAQList>
            <DiscountBanner></DiscountBanner>
            <DeliveryConditions></DeliveryConditions>
            <FindUs></FindUs>
            <Mape></Mape>
        </div>
    );
};

export default ContactsHome;