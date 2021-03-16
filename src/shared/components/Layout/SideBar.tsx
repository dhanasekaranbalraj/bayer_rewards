import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import AUX from '../../../hoc/Aux_';
import home from '../../widgets/icons/home_icon.svg';
import addUser from '../../widgets/icons/add_user_icon.svg';
import userList from '../../widgets/icons/list_user_icon.svg';
import lLogo from '../../widgets/icons/large_logo_holder.svg';
// import './Leftsidebar.css';

type Props = {
}
type States = {
    activeTab: any;
}
class Sidebar extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 'dashboard'
        };
        console.log(this.props, 'test');
    }
    
    componentDidMount() {
        $('.button-menu-mobile').on('click', (event: any) => {
            event.preventDefault();
            $("body").toggleClass("enlarged");
        });
    }
    setActiveTab = (tab: any)=> {
        this.setState({activeTab: tab});
    }

    render() {
        console.log(this.state, 'state');
        const { activeTab } = this.state;
        return (
            <AUX>
            <div className="left side-menu">
            <img className="sideMenuLine" src={lLogo} alt="" />

                <div className="">
                    <div id="sidebar-menu" className="">
                        <ul className="metismenu" id="side-menu">
                            <li className="d-flex">
                                <span className={activeTab === 'dashboard' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/dashboard" className={activeTab === 'dashboard' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('dashboard')}>
                                    <img src={home} alt="User" width="22" /> <span> Dashboard </span>
                                </Link>
                            </li>

                            <li className="menu-title">MANAGEMENT</li>
                            <li className="d-flex">
                                <span className={activeTab === 'createUser' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/createUser" className={activeTab === 'createUser' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('createUser')}>
                                    <img src={addUser} alt="User" width="22" /> <span> Create a new user </span>
                                </Link>
                            </li>
                            <li className="d-flex">
                                <span className={activeTab === 'usersList' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/usersList" className={activeTab === 'usersList' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('usersList')}>
                                    <img src={userList} alt="User" width="22" /> <span> Registered users </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
            </AUX>
        );
    }
}

export default Sidebar;