import React from "react";
import firebase from '../firebase'

const ref = firebase.database().ref('category')

class About extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      picture:"",
      text:""
    };
  }

  componentDidMount() {
    ref.child("about").on("value",(snapshot)=>{
      let about = snapshot.val();
      this.setState({text:about.text})
      this.setState({picture:about.picture})
    })
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="skill-mf">
                      <img src={this.state.picture} alt="my picture!" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2">
                        <h5 className="title-left">About Me</h5>
                      </div>
                      <div className="about-text"> 
                        {this.state.text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
