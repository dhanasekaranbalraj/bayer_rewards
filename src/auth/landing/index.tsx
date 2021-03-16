import React , {Component } from 'react';
import AUX from '../../hoc/Aux_';
import footerImg from '../../shared/widgets/icons/blue_footer.svg';
import content1 from '../../shared/widgets/icons/image_1.svg';
import content2 from '../../shared/widgets/icons/image_2.svg';
import rewardsLogo from '../../shared/widgets/icons/logo.svg';
import bayerLogo from '../../shared/widgets/icons/bayer_logo.svg';
import { Link } from 'react-router-dom';
import './landing.scss';
import { getLocalStorageData, clearLocalStorageData } from '../../base/localStore';
import {Login} from '../login';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
  
  const items = [
    {
      id: 1,
      image: content1
    },
    {
      id: 2,
      image: content2
    }
  ];

class LandingPage extends Component<any,any>{
    constructor(props: any){
        super(props);
        this.state = {
            isLoggedOut: getLocalStorageData('isLoggedOut') ? true : false,
            animating: false,
            activeIndex: 0
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


    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        });
    }
    
    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex
        });
    }
    
    goToIndex = (newIndex: any) => {
        if (this.state.animating) return;
        this.setState({
            activeIndex: newIndex
        });
    }

render(){
    console.log(this.props, 'this.props');
    const { location } = this.props;
    const { activeIndex } = this.state;
    
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
                                    Contact us
                                    <div className={activeIndex === 2 ? "activeLine" : ""} > </div>
                                </h4>
                                <h4 className="title" onClick={this.previous}>
                                    Sign in
                                    <div className={ activeIndex === 1 ? "activeLine" : ""} > </div>
                                </h4>
                            </div>
                            
                        </div>
                    </div>
                    
                    

                    <div className="contentsec">
                        <style>
                        {
                        `.custom-tag {
                            height: 400px;
                            }`
                        }
                    </style>
                        <Carousel
                                activeIndex={activeIndex}
                                next={() =>{}}
                                previous={() =>{}}
                            >
                                <CarouselIndicators ride={false} items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                {
                                    items.map((item: any) => {
                                        return (
                                          <CarouselItem
                                            className="custom-tag"
                                            tag="div"
                                            key={item.id}
                                            // onExiting={() => this.setState({animating: true})}
                                            // onExited={() => this.setState({animating: false})}
                                          >

                                            <div className="row ">

                                                <div className="col-12 d-none col-sm-2 col-md-6 col-lg-8 d-flex justify-content-center aligin-item-center content1Img">
                                                    <img className="content1Img" src={item.image} alt="Content1" />
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-4 formRow">
                                                    { item.id === 1 ?
                                                        <div className=" col-md-12 ~form pb-2 pl-2 pr-4">
                                                            <div className="text-center">
                                                                <img src={rewardsLogo} width="140" alt="Content2" />
                                                            </div>
                                                            { this.state.isLoggedOut ? 
                                                                <div className="mt-5 logoutContent">
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
                                                                    <div className="form-group row getStartedBtn" onClick={this.previous}>
                                                                        <div className="col-sm-5 text-left">
                                                                            <button className="btn btn-secondary form-control w-md waves-effect waves-light" type="button">Get started</button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                
                                                            }
                                                            
                                                        </div>
                                                        :
                                                        <Login {...this.props} />
                                                    }
                                                </div>
                                            
                                            </div>


                                          </CarouselItem>
                                        );
                                      })
                                }
                                {/* <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} /> */}
                                {/* <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} /> */}
                            </Carousel>
                           
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