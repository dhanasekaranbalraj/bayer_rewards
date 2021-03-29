import React , {Component } from 'react';
import { Dropdown,Button , DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AUX from '../../../hoc/Aux_';
import Loaders from '../../widgets/loader';
import { sortBy } from "../../../base/utils/tableSort";
import '../scanLogs/scanLogs.scss';
import { apiURL } from '../../../base/utils/config';
import { invokeGetAuthService } from '../../../base/service';
import moment from 'moment';
import filterIcon from '../../widgets/icons/filter_icon.svg'


class ScanLogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectIndex: "",
            isAsc: true,
            isRendered: false,
            allScanLogs: [
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
            ],
            actions: ['All','Distributor','Retailer'],
            dropDownValue: 'Select action',
            scanType: ['All','Send Goods','Receive Goods','Sell to Farmers'],
            productGroup: ['All','Fungicides','Herbicides'],
            status: ['All', 'Valid', 'Invalid'],
            list: ['All', 'Distributor','Retailer'],
            selectedFilters: {
                'type': 'All',
                'scanType': 'All',
                'productGroup': 'All',
                'status': 'All',
                'startDate': new Date().toISOString().substr(0, 10),
                'endDate': new Date().toISOString().substr(0, 10)
            },
            dateErrMsg: ''
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


    onSort(name, data) {
        let response = sortBy(name, data);
        this.setState({allScanLogs: response, isAsc: !this.state.isAsc})

    }

    toggleFilter = () => {
        this.setState(prevState => ({
            dropdownOpenFilter: !prevState.dropdownOpenFilter
        }));
    }
    handleFilterChange = (e, name, item) => {
        e.stopPropagation();
        let val = this.state.selectedFilters;
        let flag = false;
        this.state.dateErrMsg = '';
        if ( name === 'type') {
            val[name] = e.target.value;
            flag = true;
        } else if (name === 'startDate') {
            if( e.target.value <= val.endDate){
                val[name] = e.target.value;
                flag = true;
            } else {
                this.setState({ dateErrMsg : 'Start date should be lesser than End Date' });
            }
        } 
        else if ( name === 'endDate') {
            if( e.target.value >= val.startDate){
                val[name] = e.target.value;
                flag = true;
            } else {
                this.setState({ dateErrMsg : 'End Date should be lesser than Start Date' });
            }
        } else {
            val[name] = item;
            flag = true;
        }
        if (flag) {
            this.setState({ selectedFilters : val });
        }
    }

    resetFilter = (e) => {
        e.stopPropagation();
        this.setState({ 
            selectedFilters: {
                'type': 'All',
                'scanType': 'All',
                'productGroup': 'All',
                'status': 'All',
                 'startDate': new Date().toISOString().substr(0, 10),
                'endDate': new Date().toISOString().substr(0, 10)
            },
        })
    }

render(){
    const { isAsc, allScanLogs,dropdownOpenFilter,selectedFilters,dateErrMsg} = this.state;
    console.log('date', this.state.selectedFilters);

    return(
            <AUX>
                <div className="container-fluid card">
                    <div className="page-title-box mt-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4 className="page-title">Scan Logs</h4>
                            </div>

                            <div className="col-sm-6 filterSide text-center">
                                <div className="searchInputRow">
                                    <i class="fa fa-search icon"></i>
                                    <input placeholder="Search here..." class="input-field" type="text" />
                                </div>
                                   
                                <div className="filterRow">
                                    <Dropdown isOpen={dropdownOpenFilter} toggle={this.toggleFilter}>
                                        <DropdownToggle>
                                            { !dropdownOpenFilter && <img src={filterIcon} width="17" alt="filter" /> }
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <label>Distributor/Retailer</label>
                                                <i className="fa fa-filter boxed float-right" aria-hidden="true"></i>
                                                
                                                <div className="form-group" onClick={(e)=>e.stopPropagation()}>
                                                <select className="form-control" onChange={(e)=> this.handleFilterChange(e,"type")} value={selectedFilters.type}>
                                                    <option>All</option>
                                                    <option>Distributor</option>
                                                    <option>Retailer</option>
                                                </select>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <label className="font-weight-bold">Scan Logs</label>
                                                <div>
                                                    {this.state.scanType.map((item)=>
                                                    <span className="chipLabel">
                                                        <Button color={selectedFilters.scanType === item ? "primary rounded-pill" : "btn rounded-pill boxColor"}
                                                         size="sm" onClick={(e)=> this.handleFilterChange(e,"scanType",item)}>{item}</Button>
                                                    </span>
                                                    )}
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <label className="font-weight-bold">Product Group</label>
                                                <div>
                                                    {this.state.productGroup.map((item)=>
                                                        <Button color={selectedFilters.productGroup === item ? "primary rounded-pill" : "btn rounded-pill boxColor"}
                                                         size="sm" onClick={(e)=> this.handleFilterChange(e,"productGroup",item)}>{item}</Button>
                                                    )}
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <label className="font-weight-bold">Status</label>
                                                <div>
                                                {this.state.status.map((item)=>
                                                    <span className="chipLabel">
                                                         <Button color={selectedFilters.status === item ? "primary rounded-pill" : "btn rounded-pill boxColor"}
                                                         size="sm" onClick={(e)=> this.handleFilterChange(e,"status",item)}>{item}</Button>
                                                    </span>
                                                    )}
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                            <div className="" onClick={(e)=>e.stopPropagation()}>
                                                <label className="font-weight-bold">Date Range</label>
                                                <div>
                                                    <input type="date" value={selectedFilters.startDate} onChange={(e)=>this.handleFilterChange(e,'startDate','')} style={{width: '45%'}} />
                                                    <label>---</label>
                                                    <input type="date" value={selectedFilters.endDate} onChange={(e)=>this.handleFilterChange(e,'endDate','')} style={{width: '45%'}}/>
                                                </div>
                                                {dateErrMsg && <span className="error">{ dateErrMsg } </span>}
                                            </div>
                                             </DropdownItem>
                                            <DropdownItem>
                                                <div className="filterFooter">
                                                    <Button color="btn rounded-pill boxColor" size="lg" onClick={(e)=> this.resetFilter(e)}>Reset All</Button>
                                                    <Button color="btn rounded-pill boxColor" size="lg" onClick={()=> this.saveFilter}>Apply</Button>
                                                </div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div>
                                    <button className="btn btn-primary downloadBtn" onClick={this.download} >
                                        <i className="fa fa-download mr-2"></i> <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="test">
                    { allScanLogs.length > 0 ?   

                    <div className="table-responsive">
                        <table className="table" id="tableData">
                            <thead>
                            <tr>
                                <th>
                                    Label ID
                                    <i className={`fa ${ isAsc ? 'fa-angle-down' : 'fa-angle-up'} ml-3`} onClick={() => this.onSort('productlabelid', allScanLogs)}></i>
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
                            { allScanLogs.map((list,i) => 
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
                                                <div className="row">
                                                    <div className="col-3">
                                                        Batch : 89899898998
                                                    </div>
                                                    <div className="col-3">
                                                        Expiry Date : 23 Dec 2021
                                                    </div>
                                                    <div className="col-3">
                                                        Product group : BB-Bayer
                                                    </div>
                                                    <div className="col-3">
                                                        Scan ID : #67677677
                                                    </div>
                                                </div>
                            
                                            </div>
                                            
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