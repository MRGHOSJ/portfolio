import React from 'react'

class RequestCard extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            request:this.props.request,
        };
    }

    render(){

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-9 mb-4">
                        <code><a onClick={this.props.hideSelectedRequest} className="a-tag">Requests</a> {">"}{this.state.request.subject}:</code>
                    </div>
                    {
                        this.state.request.stats == "pending" && (
                            <div className="col-xl-3 mb-4">
                                <div className="row">
                                    <div className="col-xl-6 mb-4">
                                        <a className="btn btn-success btn-icon-split" onClick={this.props.requestDone}>
                                            <span className="icon text-white-50">
                                                <i className="material-icons">done</i>
                                            </span>
                                            <span className="text">Done</span>
                                        </a>
                                    </div>
                                    <div className="col-xl-6 mb-4">
                                        <a className="btn btn-danger btn-icon-split" onClick={this.props.requestDenied}>
                                            <span className="icon text-white-50">
                                                <i className="material-icons">clear</i>
                                            </span>
                                            <span className="text">Deny</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
                
                {
                    this.state.request.stats == "pending" && (
                        <div className="col-xl-12 mb-4">
                            <div className="card border-bottom-primary">
                                <div className="card-body">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Subject:</code> {this.state.request.subject}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Name:</code> {this.state.request.name}</h1>
                                        <h1 className="h3 mb-0 text-gray-800"><code>Email:</code> {this.state.request.email}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Content:</code> </h1>
                                    </div>
                                    <textarea rows="5" className="form-control bg-light border-0 input-tag content-textarea" value={this.state.request.content}/>

                                    {
                                        this.state.request.message_file != "" && (
                                            <div className="iframe-body-attachment">
                                                <br/>
                                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                    <h1 className="h3 mb-0 text-gray-800"><code>Attachment:</code> </h1>
                                                </div>
                                                <iframe frameborder="0" src={this.state.request.message_file} height="100%" width="100%" className="attachment-frame"/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.request.stats == "done" && (
                        <div className="col-xl-12 mb-4">
                            <div className="card border-bottom-done">
                            <div className="card-body">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Subject:</code> {this.state.request.subject}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Name:</code> {this.state.request.name}</h1>
                                        <h1 className="h3 mb-0 text-gray-800"><code>Email:</code> {this.state.request.email}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Content:</code> </h1>
                                    </div>
                                    <textarea rows="5" className="form-control bg-light border-0 input-tag content-textarea" value={this.state.request.content}/>

                                    {
                                        this.state.request.message_file != "" && (
                                            <div className="iframe-body-attachment">
                                                <br/>
                                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                    <h1 className="h3 mb-0 text-gray-800"><code>Attachment:</code> </h1>
                                                </div>
                                                <iframe frameborder="0" src={this.state.request.message_file} height="100%" width="100%" className="attachment-frame"/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.request.stats == "denied" && (
                        <div className="col-xl-12 mb-4">
                            <div className="card border-bottom-denied">
                            <div className="card-body">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Subject:</code> {this.state.request.subject}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Name:</code> {this.state.request.name}</h1>
                                        <h1 className="h3 mb-0 text-gray-800"><code>Email:</code> {this.state.request.email}</h1>
                                    </div>
                                    
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800"><code>Content:</code> </h1>
                                    </div>
                                    <textarea rows="5" className="form-control bg-light border-0 input-tag content-textarea" value={this.state.request.content}/>

                                    {
                                        this.state.request.message_file != "" && (
                                            <div className="iframe-body-attachment">
                                                <br/>
                                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                    <h1 className="h3 mb-0 text-gray-800"><code>Attachment:</code> </h1>
                                                </div>
                                                <iframe frameborder="0" src={this.state.request.message_file} height="100%" width="100%" className="attachment-frame"/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                
            </div>
          )
    }
  
}

export default RequestCard