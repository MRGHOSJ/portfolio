import React from 'react'
import $ from 'jquery'

class AddTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tag_name:this.props.tag_name,
          tag_icon:this.props.tag_icon,
        };
    }

    
    showAddTag(){
        if ( $('.dropdown-menu-add-tag').hasClass('show') ) return  $('.dropdown-menu-add-tag').removeClass('show')
        $('.dropdown-menu-add-tag').addClass('show')
    }


    render(){
        return(
            <div className="nav-item dropdown no-arrow mx-1">
                    <a className=" d-sm-inline-block btn btn-sm btn-success shadow-sm"><i
                    className="material-icons icon text-white-50 add-btn" onClick={()=>this.showAddTag()}>add</i></a>
                  <div className="dropdown-list dropdown-menu dropdown-menu-add-tag dropdown-menu-right shadow animated--grow-in">
                      <h6 className="dropdown-header">
                          Add Tag
                      </h6><br/>
                      <div className="dropdown-item d-flex align-items-center">
                          <div className="mr-3">
                          </div>
                          <div>
                            <input type="text" className="form-control bg-light border-0 input-tag" placeholder="Tag name..."
                            aria-describedby="basic-addon2" value={this.state.tag_name} onChange={(e)=>this.setState({tag_name:e.target.value})}/>
                          </div>
                      </div>
                      <div className="dropdown-item d-flex align-items-center">
                          <div className="mr-3">
                          </div>
                          <div>
                            <input type="text" className="form-control bg-light border-0 input-tag" placeholder="Tag icon..."
                            aria-describedby="basic-addon2" value={this.state.tag_icon} onChange={(e)=>this.setState({tag_icon:e.target.value})}/>
                            <br/><p>This website only supports these kind of <a href="https://fonts.google.com/icons" target="_blank">icons</a></p>
                          </div>
                      </div>
                      <a className="dropdown-item text-center addtag-btn" onClick={()=>this.props.addTag(this.state.tag_name,this.state.tag_icon)}>Add Tag</a>
                  </div>
              </div>
        )
    }

}

export default AddTag
