import React from 'react';
import { SideNav } from 'react-simple-sidenav';
import SidenavItems from './Sidenav_items';

///Also can Use this one for Sidenav...
 // <SideNav
        //     showNav={props.showNav}
        //     onHideNav={props.onHideNav}
        //     items={['home', 'services', 'about', 'contact']}
        //     titleStyle={{ backgroundColor: '#4CAF50' }}
        //     itemStyle={{ backgroundColor: '#fff' }}
        //     itemHoverStyle={{ backgroundColor: '#CDDC39' }}
        // />

const Sidenav = (props) => {
    return (
       
        <SideNav showNav={props.showNav} onHideNav={props.onHideNav}
            navStyle={{
                background: '#000',
                maxWidth: '220px',
                color: '#fff'
            }}
        >
            <SidenavItems user={props.user} />
        </SideNav>
    )
}

export default Sidenav;