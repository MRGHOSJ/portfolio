import React from 'react'
import firebase, { storage } from '../../../../firebase'
import { confirmAlert } from 'react-confirm-alert'
import RequestCard from './components/requestCard'

import { ToastContainer, toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("requests")


class Requests extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            requests:[],
            filter:'all',
            requestIsSelected:false,
            requestSelected:[],
            requestSelectedId:-1
        };
    }

    
    componentDidMount(){
        ref.once("value", snapshot => {

        if(!snapshot.exists()) return
        this.setState({requests:Object.values(snapshot.val()).reverse()})
        })
    } 

    deleteRequest(id){
        confirmAlert({
          title: 'Confirm to delete tag',
          message: 'Are you sure about doing this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                let requests = this.state.requests
                if(requests[id].imageId){
                    storage.ref(`requests`).child(requests[id].imageId).delete().then(() => {
                        requests.splice(id,1)
                        this.setState(requests)
                        ref.set(requests.reverse())
                        toast.error('Request was successfully removed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        })
                    }).catch((error) => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        })
                    });
                }
                else{
                requests.splice(id,1)
                    this.setState(requests)
                    ref.set(requests.reverse())
                    toast.error('Request was successfully removed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                }
                
              }
            },
            {
              label: 'No',
              onClick: () => {return}
            }
          ]
        });
    }

    showSelectedRequest(id,request){
        this.setState({
            requestIsSelected:true,
            requestSelected:request,
            requestSelectedId:id
        })
    }

    hideSelectedRequest(){
        this.setState({
            requestIsSelected:false,
            requestSelected:[],
            requestSelectedId:-1
        })
    }
    
    requestDone(){
        let requestSelected = this.state.requestSelected
        let requests = this.state.requests

        requestSelected.stats = "done"
        
        this.setState(requestSelected)

        ref.set(requests)
        toast.success('Request was set as done!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    requestDenied(){
        let requestSelected = this.state.requestSelected
        let requests = this.state.requests

        requestSelected.stats = "denied"

        this.setState(requestSelected)
        ref.set(requests)
        toast.error('Request was set as denied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    render(){
        return (
            <div className="container-fluid">
                <ToastContainer/>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Requests</h1>
                </div>
                <div className="row">
                    <div className="col-xl-1">Show:</div>
                    <div className="col-xl-11">
                        <select name="social"  className="form-control bg-light border-0" id="social-select" onChange={(e)=>this.setState({filter:e.target.value})}>
                            <option value="all" selected>All</option>
                            <option value="pending">Pending</option>
                            <option value="aproved">Aproved</option>
                            <option value="denied">Denied</option>
                        </select><br/>  
                    </div>
                
                </div>
                {
                    !this.state.requestIsSelected && (<code>Requests:</code>)
                }
                <div className="row">
                {
                    !this.state.requestIsSelected ? (
                        this.state.requests.length != 0 ? (
                          this.state.requests.map((request,index)=>{
                            if(this.state.filter == "all"){
                                return(
                                    <div className="col-xl-3 mb-4">
                                        {
                                          request.stats == "pending" && (
                                          <div className="card border-left-primary shadow h-100 py-2">
                                              <div className="card-body card-tags">
                                                  
                                                <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                    <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                        <div className="col-auto">
                                                                <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon">help_outline</i>
                                                        </div>
                                                        <div className="card-body">
                                                        <div className="col mr-2">
                                                            <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                            <p>{request.subject}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                          </div>
                                          )
                                            
                                      }
                                      {
                                          request.stats == "done" && (
                                              <div className="card border-left-done shadow h-100 py-2">
                                                  <div className="card-body card-tags">
                                                  
                                                        <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                      <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                      <div className="col-auto">
                                                              <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon done-stats">help_outline</i>
                                                      </div>
                                                      <div className="card-body">
                                                      <div className="col mr-2">
                                                          <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                          <p>{request.subject}</p>
                                                      </div>
                                                      </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          )
                                          
                                      }
                                      {
                                          request.stats == "denied" && (
                                              <div className="card border-left-denied shadow h-100 py-2">
                                                  <div className="card-body card-tags">
                                                  
                                                        <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                      <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                      <div className="col-auto">
                                                              <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon denied-stats">help_outline</i>
                                                      </div>
                                                      <div className="card-body">
                                                      <div className="col mr-2">
                                                          <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                          <p>{request.subject}</p>
                                                      </div>
                                                      </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          )
                                          
                                      }
                                    </div>
                                  )
                            }
                            else{
                                if(request.stats == this.state.filter){
                                    return(
                                        <div className="col-xl-3 mb-4">
                                            {
                                              request.stats == "pending" && (
                                              <div className="card border-left-primary shadow h-100 py-2">
                                                  <div className="card-body card-tags">
                                                      
                                                        <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                      <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                      <div className="col-auto">
                                                              <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon">help_outline</i>
                                                      </div>
                                                      <div className="card-body">
                                                      <div className="col mr-2">
                                                          <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                          <p>{request.subject}</p>
                                                      </div>
                                                      </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              )
                                                
                                          }
                                          {
                                              request.stats == "done" && (
                                                  <div className="card border-left-done shadow h-100 py-2">
                                                      <div className="card-body card-tags">
                                                          
                                                  
                                                        <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                          <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                          <div className="col-auto">
                                                                  <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon done-stats">help_outline</i>
                                                          </div>
                                                          <div className="card-body">
                                                          <div className="col mr-2">
                                                              <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                              <p>{request.subject}</p>
                                                          </div>
                                                          </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              )
                                              
                                          }
                                          {
                                              request.stats == "denied" && (
                                                  <div className="card border-left-denied shadow h-100 py-2">
                                                      <div className="card-body card-tags">
                                                          
                                                  
                                                        <i className="material-icons icon delete-btn" onClick={()=>this.deleteRequest(index)}>highlight_off</i>
                                                          <div onClick={()=>this.showSelectedRequest(index,request)}>
                                                          <div className="col-auto">
                                                                  <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon denied-stats">help_outline</i>
                                                          </div>
                                                          <div className="card-body">
                                                          <div className="col mr-2">
                                                              <h1 className="h3 mb-0 text-gray-800 uppercase">Subject:</h1>
                                                              <p>{request.subject}</p>
                                                          </div>
                                                          </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              )
                                              
                                          }
                                        </div>
                                      )
                                }
                            }
        
                          })):
                          <p className="col-xl-3 mb-4">No requests were sent</p>
                      ) : <RequestCard 
                                request={this.state.requestSelected} 
                                hideSelectedRequest={()=>this.hideSelectedRequest()} 
                                requestDone={()=>this.requestDone()}
                                requestDenied={()=>this.requestDenied()} />
                }
                </div>
            </div>
          )
    }
  
}

export default Requests