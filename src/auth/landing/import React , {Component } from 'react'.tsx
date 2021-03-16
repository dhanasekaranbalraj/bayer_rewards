import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import footerImg from '../../shared/widgets/icons/blue_footer.svg';
import content1 from '../../shared/widgets/icons/image_1.svg';
import rewardsLogo from '../../shared/widgets/icons/logo.svg';
import bayerLogo from '../../shared/widgets/icons/bayer_logo.svg';
import { Link } from 'react-router-dom';
import './landing.scss';
import { getLocalStorageData, clearLocalStorageData } from '../../base/localStore';

class LandingPage extends Component<any,any>{
    constructor(props: any){
        super(props);
        this.state = {
            isLoggedOut: getLocalStorageData('isLoggedOut') ? true : false
        }
    }
    componentDidMount(){
        if(getLocalStorageData('isLoggedOut')){
            setTimeout(() => {
                this.setState({isLoggedOut: false});
                clearLocalStorageData('isLoggedOut')
            },1800);
        }
    }

render(){
    console.log(this.props, 'this.props');
    const { location } = this.props;
    
    return(
            <AUX>
                <div className="headerBG">
                    <div className="headerbg1">

                        <div className="row" >
                            <div className="col-8 col-sm-6 col-lg-8">
                                <img className="logoAuth" src={bayerLogo} alt="Logo" />
                            </div>
                            <div className="col-4 col-sm-6 col-lg-4 headerRight">

                                <h4 className="title">
                                    Contacts
                                    <div className={location && location['pathname'].indexOf('contacts')>-1 ? "activeLine" : ""} > </div>
                                </h4>
                                <Link to="/login" >
                                    <h4 className="title">
                                        Sign in
                                        <div className={location && location['pathname'].indexOf('login')>-1 ? "activeLine" : ""} > </div>
                                    </h4>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div className="contentsec">
                        <div className="row ">
                            <div className="col-12 d-none d-md-block col-sm-2 col-md-6 col-lg-8">
                                <img className="content1Img" src={content1} alt="Content1" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 formRow">
                                <div className=" col-md-12 ~form pb-2 pl-2 pr-4">
                                    <div className="text-center">
                                        <img src={rewardsLogo} width="140" alt="Content2" />
                                    </div>
                                    { this.state.isLoggedOut ? 
                                        <div className="mt-5">
                                            <h4>Thank you</h4>
                                            <h4>You've successfully logged out</h4>
                                        </div>
                                        :
                                        <>
                                            <div className="pt-2 pl-1 pb-4">
                                                <h4>Welcome to Bayer Rewards</h4>
                                                <p className="mt-3">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.                                        </p>
                                                                                    
                                            </div>
                                            <Link to="/login" >
                                                <div className="form-group row getStartedBtn">
                                                    <div className="col-sm-5 text-left">
                                                        <button className="btn btn-secondary form-control w-md waves-effect waves-light" type="button">Get started</button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                        
                                    }
                                        
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="row footerimg">
                        <div className="col-12">

                            <div className="">
                                <img src={footerImg} alt="Footer" />

                            </div>
                        </div>
                    </div>
                </div>
            </AUX>
        );
    }
}



export { LandingPage };