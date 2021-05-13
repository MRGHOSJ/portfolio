import React , { Fragment } from 'react'
import $ from 'jquery'
import ReactPlayer from 'react-player'
import { confirmAlert } from 'react-confirm-alert'
import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import firebase from '../../../../../firebase'
import { toast } from 'react-toastify';

const db = firebase.database()

let ref = db.ref("tags")

class UrlTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tag:this.props.tag,
          url:'',
          urlEdit:'',
          tab:[]
        };
        this.config = {
            sort: { column: "id", order: "desc" }
        };
        this.columns = [
            {
                key: "id",
                text: "#",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "frame",
                text: "Frame",
                className: "frame",
                align: "left",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            {
                                this.youtube_parser(record.frame) ? <ReactPlayer url={record.frame}/>:
                                <img src={record.frame} className='image-urlTable'/>
                            }
                        </Fragment>
                    );
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <div className="nav-item dropdown no-arrow mx-1">
                                <a className="btn btn-primary btn-sm" onClick={()=>this.showEditUrl(record)}><i 
                                className="material-icons">edit</i></a>
                                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" id={"edit-"+record.id}>
                                    <h6 className="dropdown-header">
                                        Edit frame
                                    </h6><br/>
                                    <div className="dropdown-item d-flex align-items-center">
                                        <div className="mr-3">
                                        </div>
                                        <div>
                                            <input type="text" className="form-control bg-light border-0 input-tag" placeholder="Frame url..."
                                            aria-describedby="basic-addon2" value={this.state.urlEdit} onChange={(e)=>this.setState({urlEdit:e.target.value})} />
                                        </div>
                                    </div>
                                    <a className="dropdown-item text-center addtag-btn" onClick={()=>this.editUrl(record.id)}>Edit Frame</a>
                                </div>
                            </div><br/>
                            <div className="nav-item  no-arrow mx-1">
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => this.deleteURL(record)}>
                                    <i className="material-icons">delete</i>
                                </button>
                            </div>
                        </Fragment>
                    );
                }
            }
        ];
    }

    componentDidMount(){
        let url = this.state.tag.url
        let tab = []

        if(url == undefined) return

        url.map((value,index) =>{
            if(value.embedUrl){
                tab.push({
                    "id": index+1,
                    "frame": value.embedUrl,
                })
            }
            else{
                tab.push({
                    "id": index+1,
                    "frame": value.thumbnail,
                })
            }
        })

        this.setState({tab})
    }

    showAddUrl(){
        if ( $('.dropdown-menu-add-url').hasClass('show') ) return  $('.dropdown-menu-add-url').removeClass('show')
        $('.dropdown-menu-add-url').addClass('show')
    }

    youtube_parser(url){
        var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
        var match = url.match(regExp);
        return (match && match[1].length==11)? match[1] : false;
    } 

    addUrl(){
        let url = this.state.tag.url
        let tab = this.state.tab
        let id = -1

        this.props.addUrl(this.state.url)
        $('.dropdown-menu-add-url').removeClass('show')
        
        if(url == undefined){
            id = 0
        }else{
            id = url.length
        }

        tab.push({
            "id": id+1,
            "frame": this.state.url,
        })

        this.setState({tab})
        
        this.setState({url:''})
    }

    showEditUrl(record){
        if ( $('#edit-'+record.id).hasClass('show') ) return  $('#edit-'+record.id).removeClass('show')
        $('#edit-'+record.id).addClass('show')

        this.setState({urlEdit:record.frame})
    }

    editUrl(i){
        let tag = this.state.tag
        let url = this.state.urlEdit
        let youtubeId = this.youtube_parser(url)
        let tab = []
        let id = i-1

        $('#edit-'+i).removeClass('show')

        console.log(tab[id])
              
        if(youtubeId){
            tag.url[id] = {
                'thumbnail': 'https://img.youtube.com/vi/'+youtubeId+'/maxresdefault.jpg',
                'original': 'https://img.youtube.com/vi/'+youtubeId+'/maxresdefault.jpg',
                'embedUrl': 'https://www.youtube.com/watch?v='+youtubeId
              }   
        }else{
            tag.url[id] = {'thumbnail': url,'original': url}
        }
        
        this.setState(tag)

        tag.url.map((value,index) =>{
            if(value.embedUrl){
                tab.push({
                    "id": index+1,
                    "frame": value.embedUrl,
                })
            }
            else{
                tab.push({
                    "id": index+1,
                    "frame": value.thumbnail,
                })
            }
        })

        this.setState({tab})
            
        ref.set(this.props.tags)
            
        toast.success('Frame was successfully edited!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })


    }


    deleteURL = (record) => {
        let id = record.id-1
        
    confirmAlert({
        title: 'Confirm to delete this frame',
        message: 'Are you sure about doing this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                let tag = this.state.tag
              
                tag.url.splice(id,1)
                this.setState(tag)
                let tab = []

                tag.url.map((value,index) =>{
                if(value.embedUrl){
                    tab.push({
                        "id": index+1,
                        "frame": value.embedUrl,
                    })
                }
                else{
                    tab.push({
                        "id": index+1,
                        "frame": value.thumbnail,
                    })
                }
                })

                this.setState({tab})
                    
                ref.set(this.props.tags)
                    
                toast.error('Frame was successfully removed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
          },
          {
            label: 'No',
            onClick: () => {return}
          }
        ]
      });
    }

    onSort = (column, records, sortOrder) => {
        return orderBy(records, [column], [sortOrder]);
    }


    render(){
        return(
            <div className="card border-bottom-primary shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Frames</h6>
                    <div className="nav-item dropdown no-arrow mx-1 add-url-tag">
                            <a className=" d-sm-inline-block btn btn-sm btn-success shadow-sm" onClick={()=>this.showAddUrl()}><i
                            className="material-icons icon text-white-50 add-btn">add</i></a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-add-url dropdown-menu-right shadow animated--grow-in">
                            <h6 className="dropdown-header">
                                Add frame
                            </h6><br/>
                            <div className="dropdown-item d-flex align-items-center">
                                <div className="mr-3">
                                </div>
                                <div>
                                    <input type="text" className="form-control bg-light border-0 input-tag" placeholder="Frame url..."
                                    aria-describedby="basic-addon2" value={this.state.url} onChange={(e)=>this.setState({url:e.target.value})} />
                                </div>
                            </div>
                            <a className="dropdown-item text-center addtag-btn" onClick={()=>this.addUrl()}>Add Frame</a>
                        </div>
                    </div>
                </div>
                    {
                        (this.state.tag.url == undefined) ? <div>No frames were added!</div> : (
                            <ReactDatatable
                                config={this.config}
                                records={this.state.tab}
                                columns={this.columns}
                                extraButtons={this.extraButtons}
                            />
                        )
                    }
            </div>
        )
    }

}

export default UrlTable