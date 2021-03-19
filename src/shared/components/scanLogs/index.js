import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Loaders from '../../widgets/loader';
import '../scanLogs/scanLogs.scss';

const { ExportCSVButton } = CSVExport;
const columns = [{
    dataField: 'sNo',
    text: 'S.No'
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'gdCommission',
    text: 'Gordon Commission (\u20AC)'
  },
  , {
    dataField: 'driverCharges',
    text: 'Driver Charges (\u20AC)'
  }, {
    dataField: 'rideCharges',
    text: 'Ride Charges (\u20AC)'
  }, {
    dataField: 'cancelCharges',
    text: 'Cancelled Charges (\u20AC)'
  }, {
    dataField: 'netPay',
    text: 'Net to pay (\u20AC)'
  }
];

class ScanLogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            allRideList: [
                {
                    'sNo': "1",
                    'name': "mani",
                    'gdCommission': "test",
                    'driverCharges': "wer",
                    'rideCharges': "12",
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
                    'gdCommission': "test",
                    'driverCharges': "wer",
                    'rideCharges': "12",
                    'cancelCharges': "Total",
                    'netPay': 200
                }
            ]
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
        this.setState({allRideList: data})
      }
 
render(){
    
    return(
            <AUX>
                <div className="container-fluid">
                    <div className="page-title-box mt-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4 className="page-title">Scan Logs</h4>
                            </div>
                            <div className="col-sm-6 text-right">
                                <button onClick={this.download} >Download</button>
                            </div>
                        </div>
                    </div>
                    <div className="test">
                   
                                    <div>
                                       
                                        { this.state.allRideList.length > 0 ?   
                                            <div className="table-responsive">
                                                <table className="table table-hover mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th onClick={e => this.onSort(e, 'name')}>Name</th>
                                                            <th>Header1</th>
                                                            <th>Header1</th>
                                                            <th>Header1</th>
                                                            <th>Header1</th>
                                                            <th>Header1</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { this.state.allRideList.map((list,i) => 
                                                        <>
                                                            <tr>
                                                                <td >{i+1}</td>
                                                                <td>{list.name}</td>
                                                                <td>{list.gdCommission}  </td>
                                                                <td>{list.driverCharges} </td>
                                                                <td>{list.rideCharges} </td>
                                                                <td>{list.cancelCharges} </td>
                                                                <td>{list.netPay} jj</td>
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