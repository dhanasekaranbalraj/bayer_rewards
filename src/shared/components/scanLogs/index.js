import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';

class ScanLogs extends Component{
 
render(){
    return(
            <AUX>
                <div className="container-fluid">
                    <div className="page-title-box mt-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4 className="page-title">Scan Logs</h4>
                            </div>
                            <div className="col-sm-6">
                            </div>
                        </div>
                    </div>
                   
                </div>
           
            </AUX>
        );
    }
}

export { ScanLogs };   