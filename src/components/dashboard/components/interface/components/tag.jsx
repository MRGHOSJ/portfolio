import React from 'react'
import { toast } from 'react-toastify';

import UrlTable from './urlTable'

class Tag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tag:this.props.tag,
        };
    }

    handleTagIconChanged(value){
        let tag = this.state.tag
        tag.icon = value
        this.setState({tag})
    }

    handleTagNameChanged(value){
        let tag = this.state.tag
        tag.category = value
        this.setState({tag})
    }

    handleTagShowChanged(){
        let tag = this.state.tag

        if(tag.show){
            toast.error('You cant disable default tag!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        }else{
            tag.show = !tag.show
            this.setState({tag})
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="col-xl-12 mb-4">
                    <code><a onClick={this.props.hideSelectedTag} className="a-tag">Tags</a> {">"} <i className="material-icons">{this.state.tag.icon}</i> {this.state.tag.category}:</code>
                </div>
                
                <div className="col-xl-12 mb-4">
                    <div className="card border-bottom-primary">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-xl-4 mb-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Tag name</div>
                                                            <br/>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            <input type="text" className="form-control bg-light border-0" placeholder="Tag name..."
                                                                aria-label="Search" aria-describedby="basic-addon2" value={this.state.tag.category} onChange={(e)=>this.handleTagNameChanged(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>
                                    <div className="col-xl-4 mb-4">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Tag icon</div>
                                                            <br/>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            <input type="text" className="form-control bg-light border-0" placeholder="Tag icon..."
                                                                aria-label="Search" aria-describedby="basic-addon2" value={this.state.tag.icon} onChange={(e)=>this.handleTagIconChanged(e.target.value)}/>
                                                            <p className="icon-link">This website only supports these kind of <a href="https://fonts.google.com/icons" target="_blank">icons</a></p>
                                                        </div>
                                                    </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 mb-4">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Tag settings</div>
                                                    <br/>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    <div className=" d-flex align-items-center">
                                                        <div className="mr-3">
                                                            <p className="dropdown-header">Default</p>
                                                        </div>
                                                        {
                                                            this.state.tag.show ? (<input type="checkbox" className="bg-light border-0" onClick={()=>this.handleTagShowChanged()} checked/>):
                                                            (<input type="checkbox" className="bg-light border-0" onClick={()=>this.handleTagShowChanged()}/>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <a className="btn btn-success btn-icon-split" onClick={()=>this.props.handleTagEdit(this.state.tag)}>
                                            <span className="icon text-white-50">
                                                <i className="material-icons">done</i>
                                            </span>
                                            <span className="text">Save Changes</span>
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <UrlTable 
                    tags={this.props.tags}
                    tag={this.state.tag}
                    addUrl={this.props.addUrl}
                    tagID={this.props.tagID}
                />
            </div>
        )
    }

}

export default Tag