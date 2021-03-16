import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import AUX from '../../../hoc/Aux_';
import homeIcon from '../../widgets/icons/home_icon.svg';
import addUserIcon from '../../widgets/icons/add_user_icon.svg';
import userListIcon from '../../widgets/icons/list_user_icon.svg';
import scanLogsIcon from '../../widgets/icons/scan_logs_icon.svg';
import pointLogsIcon from '../../widgets/icons/points_log_icon.svg';
import coachIcon from '../../widgets/icons/coach_walker_icon.svg';
import helpCenterIcon from '../../widgets/icons/help_icon.svg';
import logoutIcon from '../../widgets/icons/logout_icon.svg';

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
            <div className="left side-menu ">
            <img className="sideMenuLine" src={lLogo} alt="" />

                <div className="">
                    <div id="sidebar-menu" className="">
                        <ul className="metismenu" id="side-menu">
                            <li className="d-flex">
                                <span className={activeTab === 'dashboard' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/dashboard" className={activeTab === 'dashboard' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('dashboard')}>
                                    <img src={homeIcon} alt="User" width="22" /> <span> Dashboard </span>
                                </Link>
                            </li>

                            <li className="menu-title">MANAGEMENT</li>
                            <li className="d-flex">
                                <span className={activeTab === 'createUser' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/createUser" className={activeTab === 'createUser' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('createUser')}>
                                    <img src={addUserIcon} alt="User" width="22" /> <span> Create a new user </span>
                                </Link>
                            </li>
                            <li className="d-flex">
                                <span className={activeTab === 'usersList' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/usersList" className={activeTab === 'usersList' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('usersList')}>
                                    <img src={userListIcon} alt="User" width="22" /> <span> Registered users </span>
                                </Link>
                            </li>

                            <li className="menu-title">LOGS</li>
                            <li className="d-flex">
                                <span className={activeTab === 'scanLogs' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/scanLogs" className={activeTab === 'scanLogs' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('scanLogs')}>
                                    <img src={scanLogsIcon} alt="Sacn" width="22" /> <span> Scan logs </span>
                                </Link>
                            </li>
                            <li className="d-flex">
                                <span className={activeTab === 'pointLogs' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/pointLogs" className={activeTab === 'pointLogs' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('pointLogs')}>
                                    <img src={pointLogsIcon} alt="Points" width="22" /> <span> Point logs </span>
                                </Link>
                            </li>

                            <li className="menu-title">HELP</li>
                            <li className="d-flex">
                                <span className={activeTab === 'coachWalker' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/coachWalker" className={activeTab === 'coachWalker' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('coachWalker')}>
                                    <img src={coachIcon} alt="Coach Walker" width="22" /> <span> Coach walker </span>
                                </Link>
                            </li>
                            <li className="d-flex">
                                <span className={activeTab === 'helpCenter' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/helpCenter" className={activeTab === 'helpCenter' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('helpCenter')}>
                                    <img src={helpCenterIcon} alt="Help Center" width="22" /> <span> Help center </span>
                                </Link>
                            </li>

                            <li className="d-flex">
                                <span className={activeTab === 'landing' ? 'waves-effect active':'waves-effect'}></span>
                                <Link  to="/landing" className={activeTab === 'landing' ? 'waves-effect active':'waves-effect'} onClick={() => this.setActiveTab('landing')}>
                                    <img src={logoutIcon} alt="Help Center" width="22" /> <span> Help center </span>
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