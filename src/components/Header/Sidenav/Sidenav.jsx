import React from 'react';
import { SideNav } from 'react-simple-sidenav';
import SidenavItems from './Sidenav_items';


const Sidenav = (props) => {

    return (
        // <SideNav
        //     showNav={props.showNav}
        //     onHideNav={props.onHideNav}
        //     items={['home', 'services', 'about', 'contact']}
        //     titleStyle={{ backgroundColor: '#4CAF50' }}
        //     itemStyle={{ backgroundColor: '#fff' }}
        //     itemHoverStyle={{ backgroundColor: '#CDDC39' }}
        // />
        <SideNav showNav={props.showNav} onHideNav={props.onHideNav}
            navStyle={{
                background: '#000',
                maxWidth: '220px',
                color: '#fff'
            }}
        >
            <SidenavItems />
        </SideNav>
    )
}

export default Sidenav;