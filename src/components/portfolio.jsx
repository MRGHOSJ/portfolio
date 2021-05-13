import React from "react";
import ReactPlayer from 'react-player'
import ImageGallery from 'react-image-gallery'
import firebase from '../firebase'
import "react-image-gallery/styles/scss/image-gallery.scss"

const db = firebase.database()

let ref = db.ref("tags")

class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags:[],
      showVideo: {}
    };
  }

  componentDidMount(){
    ref.once("value", snapshot => {
      
      if(!snapshot.exists()) return

      let tags = Object.values(snapshot.val())
      
      if(tags == undefined) return

      tags.map((tag,index)=>{
        if(tag.url == undefined) return
        tags[index].url = tag.url.reverse()
      })
      this.setState({tags})
    })
  } 

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.embedUrl] ?
            <ReactPlayer url={item.embedUrl} className="video-wrapper container" controls={true} playing={true}/>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img className='image-gallery-image' src={item.original} />
            </a>
        }
      </div>
    );
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _onSlide() {
    this.setState({showVideo: {}});
  }

  
  _renderVideo = (item) => {
    if(item.embedUrl == undefined){
      return (
        <img className="image-gallery-image" src={item.thumbnail} />
      );
    }else{
      return (
        <div>
          {
            this.state.showVideo[item.embedUrl] ?
              <ReactPlayer url={item.embedUrl} className="video-wrapper container" controls={true} playing={true}/>
            :
              <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                <div className='play-button'></div>
                <img className='image-gallery-image' src={item.original} />
              </a>
          }
        </div>
      );
    }
  }

  _toggleShowVideo = (url) => {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }
  

  render() {

    const handleTagClicked = (tag) => {

      let tags = [...this.state.tags]

      tags.find((value, index) => { 

        if(value == tag) {
          let tagSelected = {...value}
          tagSelected.show = true
          tags[index]= tagSelected
          this.setState({tags});
        }else{
          let tagSelected = {...value}
          tagSelected.show = false
          tags[index]= tagSelected
          this.setState({tags});
        }
      })
    }

    return (
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">Gallery</h3>
                <div className="line-mf"></div>  
                <h2>&nbsp;</h2>
                <nav className="Porfolio-Nav">
                  {
                    this.state.tags.map(tag=>{
                      return (
                        tag.show ? <i className="material-icons icon active" onClick={()=>handleTagClicked(tag)}>{tag.icon}</i> :
                        <i className="material-icons icon" onClick={()=>handleTagClicked(tag)}>{tag.icon}</i>
                      )
                    })
                  }
                </nav>
              </div>
            </div>
          </div>
          {
            this.state.tags.map(tag=>{
              if(tag.show){
                return(
                  (tag.url == undefined ) ? <div className="col-md-12 upload-null" style={{textAlignVertical: "center",textAlign: "center",}}>No {tag.category} was uploaded yet!</div> :
                  <ImageGallery 
                    items={tag.url} 
                    showPlayButton={false}
                    showFullscreenButton={!tag.video}
                    onSlide={this._onSlide.bind(this)}
                    renderItem={this._renderVideo.bind(this)}
                  />
                )
              }
            })
          }
        </div>
      </section>
    );
  }
}

export default Portfolio;
