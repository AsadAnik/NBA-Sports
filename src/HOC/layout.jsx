import React from 'react';
import './layout.css';

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

class Layout extends React.Component{

    state = {//State,
        showNav: false,
    }

 //Toggle Method for SideNav..   
    toggleNav(action){
        this.setState({
            showNav: action,
        })
    }


    render(){//Render Method...
        return (
            <div>
                <Header showNav={this.state.showNav} 
                    onHideNav={() => {this.toggleNav(false)}}
                    onShowNav={() => {this.toggleNav(true)}}    
                />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout;