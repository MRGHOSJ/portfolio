import React from 'react'
import $ from 'jquery'
import { confirmAlert } from 'react-confirm-alert'
import firebase from '../../../../firebase'

import { ToastContainer, toast } from 'react-toastify';

import AddTag from './components/addTag'
import Tag from './components/tag'

const db = firebase.database()

let ref = db.ref("tags")

let youtube_parser = (url) => {
  var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  var match = url.match(regExp);
  return (match && match[1].length==11)? match[1] : false;
} 

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags:[],
      tag_name:"",
      tag_icon:"",
      tagIsSelected:false,
      tagSelected:[],
      tagSelectedId:-1
    };
  }

  componentDidMount(){
    ref.once("value", snapshot => {
      
      if(!snapshot.exists()) return
      
      this.setState({tags:Object.values(snapshot.val())})

    })
  } 

  deleteTag(id){
    confirmAlert({
      title: 'Confirm to delete tag',
      message: 'Are you sure about doing this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let tags = this.state.tags
            tags.splice(id,1)
            this.setState(tags)
            ref.set(tags)
            toast.error('Tag was successfully removed!', {
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

  addTag(tag_name,tag_icon){
    let tags = this.state.tags
    let tag = {}

    if (tag_name == "" || tag_icon == ""){
      toast.error("Inputs can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    if (tags.length == 0 ){
      tag = {
        icon:tag_icon,
        category:tag_name,
        show:true,
        url:[]
      }
    }else{
      tag = {
        icon:tag_icon,
        category:tag_name,
        show:false,
        url:[]
      }
    }
     
    tags.push(tag)
    this.setState({
      tags
    })
    ref.set(tags)
    toast.success('New tag was successfully added!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    this.setState({
      tag_icon:"",
      tag_name:""
    })
    $('.dropdown-menu-add-tag').removeClass('show')
  }

  showSelectedTag(id,tag) {
    this.setState({
      tagIsSelected:true,
      tagSelected:tag,
      tagSelectedId:id
    })
  }

  hideSelectedTag(){
    this.setState({
      tagIsSelected:false,
      tagSelected:[],
      tagSelectedId:-1
    })
  }

  handleTagEdit(tagChanged){
    let tags = this.state.tags
    let tagChangedId = this.state.tagSelectedId

    if(tagChanged.show){
      tags.map((tag,index)=>{
        if(tag.show == true){
          if (tag != tagChanged) tags[index].show = false
        }
      })
    }

    tags[tagChangedId] = tagChanged
      this.setState({tags})
      ref.set(tags)
      toast.success('Tag was successfully updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    
  }

  addUrl(url){
    let tags = this.state.tags
    let tagChangedId = this.state.tagSelectedId
    let youtubeVideoId = youtube_parser(url)
    let newUrls = []
    let urlToAdd = []

    if(url == ""){
      toast.error("You didn't insert an url!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    if(youtubeVideoId){
      urlToAdd = {
        'thumbnail': 'https://img.youtube.com/vi/'+youtubeVideoId+'/maxresdefault.jpg',
        'original': 'https://img.youtube.com/vi/'+youtubeVideoId+'/maxresdefault.jpg',
        'embedUrl': 'https://www.youtube.com/watch?v='+youtubeVideoId
      }
    }else{
      urlToAdd = {'thumbnail': url,'original': url}
    }

    if (tags[tagChangedId].url == undefined){
      tags[tagChangedId].url = [urlToAdd]
      this.setState({tags})
        ref.set(tags)
        toast.success('Tag was successfully updated!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      console.log(tags[tagChangedId])
    }else{
      tags[tagChangedId].url.map((url)=>{
          newUrls.push(url)
      })
      
      newUrls.push(urlToAdd)
      tags[tagChangedId].url = newUrls
      this.setState({tags})
        ref.set(tags)
        toast.success('Tag was successfully updated!', {
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

  render(){
    return (
        <div className="container-fluid">
            <ToastContainer/>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Gallery</h1>
                {
                  !this.state.tagIsSelected &&
                  <AddTag addTag={this.addTag.bind(this)} tag_name={this.state.tag_name} tag_icon={this.state.tag_icon}/>
                }
            </div>
            {
              !this.state.tagIsSelected && (<code>Tags:</code>)
            }
            <div className="row">
                {
                  !this.state.tagIsSelected ? (
                    this.state.tags.length != 0 ? (
                      this.state.tags.map((tag,index)=>{
    
                        return(
                          <div className="col-xl-3 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body card-tags">
                                    <i className="material-icons icon delete-btn" onClick={()=>this.deleteTag(index)}>highlight_off</i>
                                    <div onClick={()=>this.showSelectedTag(index,tag)}>
                                    <div className="col-auto">
                                            <i className="material-icons fa-2x text-gray-300 dashbord-landingPage-icon">{tag.icon}</i>
                                    </div>
                                    <div className="card-body">
                                      <div className="col mr-2">
                                          <h1 className="h3 mb-0 text-gray-800 uppercase">{tag.category}</h1>
                                      </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        )
    
                      })):
                      <p className="col-xl-3 mb-4">No tags were added</p>
                  ) : <Tag 
                        tag={this.state.tagSelected}
                        tags={this.state.tags}
                        tagID={this.state.tagSelectedId}
                        hideSelectedTag={()=>this.hideSelectedTag()}
                        handleTagEdit={(tagChanged)=>this.handleTagEdit(tagChanged)}
                        addUrl={this.addUrl.bind(this)}
                        />
                }
            </div>
        </div>
      )
  }
  
}

export default Gallery