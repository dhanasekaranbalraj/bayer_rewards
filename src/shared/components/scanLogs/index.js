import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Loaders from '../../widgets/loader';
import '../scanLogs/scanLogs.scss';
import { UncontrolledCollapse, Collapse, Button, CardBody, Card } from 'reactstrap';
import { apiURL } from '../../../base/utils/config';
import { invokeGetAuthService } from '../../../base/service';
import moment from 'moment';


class ScanLogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectIndex: "",
            isAsc: true,
            isRendered: false,
            allRideList: [
                {
                    "productlabelid": "62583466963379912311",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "valid",
                    "reason": "",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Behdjdndm",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Nfncndnd",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Ekfnmgv",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Hdhdjdkdnsnd",
                    "scantype": "Receive goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "625834669633799654",
                    "scantype": "Receive goods",
                    "selectedscanneddate": "2021-03-18T00:00:00.000Z",
                    "scanstatus": "valid",
                    "reason": "",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "625834669633799000",
                    "scantype": "Sell to farmer",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "valid",
                    "reason": "",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Dghh",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Sfgjko",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Hdjdnfjfkfkd",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "625834669633799456",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "valid",
                    "reason": "",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "625834669633799123",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "valid",
                    "reason": "",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Jrheidnrnied828493",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "521354588321156899",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-19T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                },
                {
                    "productlabelid": "Asdfasdf",
                    "scantype": "Send goods",
                    "selectedscanneddate": "2021-03-23T00:00:00.000Z",
                    "scanstatus": "invalid",
                    "reason": "Label ID not found",
                    "username": "john994",
                    "isExpand": false
                }
            ]
        }
    }
    componentDidMount(){
        this.getScanLogs();
    }

    downloadExcel = () => {
        let tableId= document.getElementById('tableData').id;
        let fileName = "";
        let excelFileName='excel_table_data';
        let TableDataType = 'application/vnd.ms-excel';
        let selectTable = document.getElementById(tableId);
        let htmlTable = selectTable.outerHTML.replace(/ /g, '%20');
        
        fileName = fileName?fileName+'.xls':excelFileName+'.xls';
        var excelFileURL = document.createElement("a");
        document.body.appendChild(excelFileURL);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', htmlTable], {
                type: TableDataType
            });
            navigator.msSaveOrOpenBlob( blob, fileName);
        }else{
            
            excelFileURL.href = 'data:' + TableDataType + ', ' + htmlTable;
            excelFileURL.download = fileName;
            excelFileURL.click();
        }
    }

    download_csv = (csv, filename) => {
        var csvFile;
        var downloadLink;
    
        // CSV FILE
        csvFile = new Blob([csv], {type: "text/csv"});
    
        // Download link
        downloadLink = document.createElement("a");
    
        // File name
        downloadLink.download = filename;
    
        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
    
        // Make sure that the link is not displayed
        downloadLink.style.display = "none";
    
        // Add the link to your DOM
        document.body.appendChild(downloadLink);
    
        // Lanzamos
        downloadLink.click();
    }
    
    export_table_to_csv = (html, filename) => {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            
            for (var j = 0; j < cols.length; j++) 
                row.push(cols[j].innerText);
            
            csv.push(row.join(","));		
        }
    
        // Download CSV
        this.download_csv(csv.join("\n"), filename);
    }
    
    download = () => {
        let html = document.querySelector("table").outerHTML;
        this.export_table_to_csv(html, "table.csv");
    }

    onSort(event, sortKey){
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
        const data = this.state.allRideList;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
        console.log(data, 'data');
        this.setState({allRideList: data, isAsc: !this.state.isAsc})
    }

    getScanLogs = () => {
        const { scanLogs } = apiURL;
        this.setState({isLoader: true});
        invokeGetAuthService(scanLogs).then((response) => {
            console.log(response, 'response');
            this.setState({isLoader: false, validErrorMsg: ""});

        }).catch((error) => {
            this.setState({isLoader: false, validErrorMsg: error.message });
            console.log(error, 'error');
            // toastError(error.message);
        });
        
    }

    handleExpand = (data) => {
        data.isExpand = !data.isExpand;
        this.setState({isRendered: true});
    }
 
render(){
    const { isAsc } = this.state;
    return(
            <AUX>
                <div className="container-fluid">
                    <div className="page-title-box mt-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4 className="page-title">Scan Logs</h4>
                            </div>
                            <div className="col-sm-6 text-right">
                                <button className="btn btn-primary downloadBtn" onClick={this.download} >
                                    <i className="fa fa-download mr-2"></i> <span>Download</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="test">
                    { this.state.allRideList.length > 0 ?   

                    <div class="table-responsive">
                        <table class="table" id="tableData">
                            <thead>
                            <tr>
                                <th>
                                    Label ID
                                    <i className={`fa ${ isAsc ? 'fa-angle-down' : 'fa-angle-up'} ml-3`} onClick={e => this.onSort(e, 'productlabelid')}></i>
                                </th>
                                <th>Customer Name</th>
                                <th>Customer ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Scan Type</th>
                                <th>Sold To</th>
                                <th>Scan Date</th>
                                <th width="10%">Quick Action</th>

                            </tr>
                            </thead>
                            <tbody>
                            { this.state.allRideList.map((list,i) => 
                                <AUX key={i}>
                                    <tr style={list.scanstatus === 'valid' ? {borderLeft: '5px solid #89D329'} : {borderLeft: '5px solid #FF4848' }}
                                        onClick={() => this.handleExpand(list) } >
                                        <td >{list.productlabelid}</td>
                                        <td>{list.username}  </td>
                                        <td>{list.username}  </td>
                                        <td>{list.username}  </td>
                                        <td>{list.username}  </td>
                                        <td>{list.scantype}  </td>
                                        <td>{list.username}  </td>
                                        <td>{moment(list.selectedscanneddate).format('DD-MM-YYYY')}  </td>
                                        <td width="10%" align="center">
                                            {
                                                list.isExpand ? <i className="fa fa-angle-down"></i> 
                                                : <i className="fa fa-angle-up"></i>
                                            }
                                        </td>
                                        
                                    </tr>
                                    { list.isExpand &&
                                        <div style={{display: 'grid'}} > 
                                            <div className={list.scanstatus === 'valid' ? "validBoxShadow" : "inValidBoxShadow"}>
                                                <div class="row">
                                                    <div class="col-3">
                                                        Batch : 89899898998
                                                    </div>
                                                    <div class="col-3">
                                                        Expiry Date : 23 Dec 2021
                                                    </div>
                                                    <div class="col-3">
                                                        Product group : BB-Bayer
                                                    </div>
                                                    <div class="col-3">
                                                        Scan ID : #67677677
                                                    </div>
                                                </div>
                            
                                            </div>
                                            {/* <div style={{display: 'table-cell'}}>
                                                <div class="row d-flex">
                                                    <div class="col-4">label</div>
                                                    <div class="col-4">value 4</div>
                                                </div>
                                            </div>
                                            <div style={{display: 'table-cell'}}>
                                                <div class="row d-flex">
                                                    <div class="col-4">label</div>
                                                    <div class="col-6">value 4</div>
                                                </div>
                                            </div>
                                            <div style={{display: 'table-cell'}}>
                                                
                                            </div> */}
                                        </div>
                                    }
                                    
                                </AUX>
                            )}
      

                            </tbody>
                        </table>
                    </div>
                    :
                        this.state.isLoader ? <Loaders /> : 
                        <div className="col-12 card mt-4">
                            <div className="card-body ">
                                <div className="text-red py-4 text-center">No Data Found</div>
                            </div>
                        </div>
                    }
                   
                   
                    </div>

                    
                   
                </div>
           
            </AUX>
        );
    }
}

export { ScanLogs };   