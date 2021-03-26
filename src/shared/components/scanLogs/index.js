import React , {Component } from 'react';
import { Dropdown,Button , DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AUX from '../../../hoc/Aux_';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Loaders from '../../widgets/loader';
import {sortBy} from "../../../base/utils/tableSort";
import '../scanLogs/scanLogs.scss';

const { ExportCSVButton } = CSVExport;

class ScanLogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpenFilter: false,
            allScanLogs: [
                {
                    'sNo': "1",
                    'name': "mani",
                    'gdCommission': "demo",
                    'driverCharges': "wer",
                    'rideCharges': "17",
                    'cancelCharges': "Total",
                    'netPay': 100
                },
                {
                    'sNo': "1",
                    'name': "foo",
                    'gdCommission': "test",
                    'driverCharges': "wer",
                    'rideCharges': "12",
                    'cancelCharges': "Total",
                    'netPay': 200
                },
                {
                    'sNo': "1",
                    'name': "Vijay",
                    'gdCommission': "result",
                    'driverCharges': "wer",
                    'rideCharges': "9",
                    'cancelCharges': "Total",
                    'netPay': 200
                }
            ],
            actions: ['All','Distributor','Retailer'],
            dropDownValue: 'Select action',
            dropdownOpen: false,
            scanType: ['All','Send Goods','Receive Goods','Sell to Farmers'],
            productGroup: ['All','Fungicides','Herbicides'],
            status: ['All', 'Valid', 'Invalid'],
            list: ['All', 'Distributor','Retailer'],
            selectedFilters: {
                'type': 'All',
                'scanType': 'All',
                'productGroup': 'All',
                'status': 'All',
                'startDate': new Date(),
                'endDate': new Date()
            }
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
        alert();
        let html = document.querySelector("table").outerHTML;
        this.export_table_to_csv(html, "table.csv");
    }

    onSort(name, data) {
          let arrayCopy = sortBy(name, data);
          this.setState({ allScanLogs: arrayCopy });
    }

    toggleFilter = () => {
        this.setState(prevState => ({
            dropdownOpenFilter: !prevState.dropdownOpenFilter
        }));
    }
    toggle(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    handleFilterChange = (e, name, item) => {
        e.stopPropagation();
        let val = this.state.selectedFilters;
        if ( name === 'type' || name ==='startDate' || name ==='endDate') {
            val[name] = e.target.value;
        } else {
            val[name] = item;
        }
        this.setState({ selectedFilters : val });
    }
    resetFilter = (e) => {
        e.stopPropagation();
        this.setState({ 
            selectedFilters: {
                'type': 'All',
                'scanType': 'All',
                'productGroup': 'All',
                'status': 'All',
                'startDate': new Date(),
                'endDate': new Date()
            },
        })
    }

render(){
    const { allScanLogs,dropdownOpenFilter,selectedFilters} = this.state;
    console.log('date', this.state.selectedFilters);
    return(
            <AUX>
                <div className="container-fluid">
                    <div className="page-title-box mt-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4 className="page-title">Scan Logs</h4>
                            </div>

                            <div className="col-sm-6 text-right filterSide">
                                <div className="filter">
                                    <Dropdown isOpen={dropdownOpenFilter} toggle={this.toggleFilter}>
                                        <DropdownToggle>
                                            <i className="fa fa-filter boxed" aria-hidden="true"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <label>Distributor/Retailer</label>
                                                <i className="fa fa-filter boxed float-right" aria-hidden="true"></i>
                                                <div className="form-control" onClick={(e)=>e.stopPropagation()}>
                                                <select className="" onChange={(e)=> this.handleFilterChange(e,"type")} value={selectedFilters.type}>
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
                                    <button onClick={this.download} >Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="test">
                        <div>
                            { allScanLogs.length > 0 ?   
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name<span className="fa fa-caret-down"  onClick={()=>this.onSort('name', allScanLogs)}></span></th>
                                                <th>Header1</th>
                                                <th>Header1</th>
                                                <th>Header1</th>
                                                <th>Header1</th>
                                                <th>Header1</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { allScanLogs.map((list,i) => 
                                            <>
                                                <tr>
                                                    <td >{i+1}</td>
                                                    <td>{list.name}</td>
                                                    <td>{list.gdCommission}  </td>
                                                    <td>{list.driverCharges} </td>
                                                    <td>{list.rideCharges} </td>
                                                    <td>{list.cancelCharges} </td>
                                                    <td>{list.netPay}</td>
                                                </tr>
                                            
                                            </> 
                                            )
                                            }
                                        
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
                </div>
            </AUX>
        );
    }
}

export { ScanLogs };   