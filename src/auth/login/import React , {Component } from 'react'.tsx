import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import headerImg from '../../shared/widgets/icons/green_header.svg';
import footerImg from '../../shared/widgets/icons/blue_footer.svg';
import content1 from '../../shared/widgets/icons/image_2.svg';
import rewardsLogo from '../../shared/widgets/icons/logo.svg';
import bayerLogo from '../../shared/widgets/icons/bayer_logo.svg';
import { Link } from 'react-router-dom';
import './login.scss';
import { Input } from '../../shared/widgets/input';
import { apiURL } from '../../base/utils/config';
import { invokePostService } from '../../base/service';
import { setLocalStorageData } from '../../base/localStore';
import { toastError } from '../../shared/widgets/toaster';
import Loaders from '../../shared/widgets/loader';

type Props = {
    location: any;
    history: any;
}
type States = {
    username: any;
    password: any;
    usernameError: any;
    passwordError: any;
    isPwdView: boolean;
    isLoader: boolean;
}
class Login extends Component<Props, States>{
    constructor(props: any){
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            isPwdView: false,
            isLoader: false
        };
        console.log(this.props, 'propss')
    }
    handleChange = (e: any) => {
        console.log(e.target.value, 'teee');
        if (e.target.name === 'username') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    usernameError: 'Please enter the username',
                    username: e.target.value
                })
            } else {
                this.setState({
                    usernameError: '',
                    username: e.target.value
                })
            }
        } else if (e.target.name === 'password') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    passwordError: 'Please enter the password',
                    password: e.target.value
                })
            } else {
                this.setState({
                    passwordError: '',
                    password: e.target.value
                })
            }
        }
    }
    login = () => {
        let formValid = this.checkValidation();
        const data = {
            "username": this.state.username,
            "password": this.state.password
        }
        const {login } = apiURL;
        if(formValid){
            this.setState({isLoader: true});
            invokePostService(login, data).then((response: any) => {
                console.log(response, 'response');
                setLocalStorageData('userData', JSON.stringify(response.body));
                this.props.history.push('/dashboard');
                this.setState({isLoader: false});
    
            }).catch((error) => {
                this.setState({isLoader: false});
                console.log(error, 'error');
                toastError(error.message);
            });
        }
        
    }
    checkValidation = () => {
        let formValid = true;
        if (this.state.username === "") {
            this.setState({
                usernameError: 'Please enter the username'
            });
            formValid = false;
        }
        if (this.state.password === "") {
            this.setState({
                passwordError: 'Please enter the password'
            });
            formValid = false;
        }
        return formValid;
    }
    
    

render(){
    const { location } = this.props;
    const { username, password, usernameError, passwordError, isPwdView, isLoader } = this.state;
    return(
            <AUX>
                {isLoader && <Loaders />}
                <div className="headerBG">
                    <div className="headerbg1">

                        <div className="row" >
                            {/* <div className="col-12">
                                <img src={headerImg} alt="Footer" />
                            </div> */}

                            <div className="col-8 col-sm-6 col-lg-8">
                                <img className="logoAuth" src={bayerLogo} alt="Logo" />
                            </div>
                            <div className="col-4 col-sm-6 col-lg-4 headerRight">

                                <h4 className="title">
                                    Contacts
                                    <div className={location && location['pathname'].indexOf('contacts')>-1 ? "activeLine" : ""} > </div>
                                </h4>
                                <h4 className="title">
                                    Sign in
                                    <div className={location && location['pathname'].indexOf('login')>-1 ? "activeLine" : ""} > </div>
                                </h4>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div className="contentsec">
                        <div className="row ">
                            <div className="col-12 d-none d-md-block col-sm-2 col-md-6 col-lg-8">
                                <img className="content1Img" src={content1} alt="Content1" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 formRow">
                                <div className=" col-md-10 ~form">
                                    <div className="text-center">
                                        <img src={rewardsLogo} width="140" alt="Content2" />
                                    </div>
                                    <form className="form-horizontal" >

                                        <div className="form-group">
                                            <label>Username</label>
                                            <Input type="text" className={!usernameError ? "form-control" : "form-control invalid"} name="username" placeHolder="Enter username" value={username}
                                                onChange={this.handleChange} />
                                            {usernameError && <span className="error">{ usernameError } </span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="userpassword">Password</label>
                                            <div className="withIcon">
                                                <Input type={isPwdView ? "text" : "password"} className={!passwordError ? "form-control" : "form-control invalid"} name="password" placeHolder="Enter password" value={password}
                                                    onChange={this.handleChange} />
                                                <i className={ isPwdView ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => {this.setState({isPwdView: !isPwdView})}}></i>
                                            </div>
                                            {passwordError && <span className="error">{ passwordError } </span>}
                                        </div>

                                        
                                        <div className="form-group row m-t-20">
                                            <div className="col-sm-12">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row loginBtn">
                                            <div className="col-sm-12 text-center">
                                                <button className="btn btn-secondary form-control w-md waves-effect waves-light" type="button"
                                                    onClick={this.login}>Log In</button>
                                            </div>
                                        </div>
                                        <div className="form-group m-t-10 mb-0 row forgot">
                                            <div className="col-12">
                                                <Link to="">Forgot your password?</Link>
                                            </div>
                                        </div>
                                        
                                    </form>
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



export { Login };