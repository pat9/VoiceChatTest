import React from 'react';
import logo from './logo.svg';
import './App.css';
import Peer from 'simple-peer'
import GetUserMedia from 'getusermedia'

class App extends React.Component {

  state={
    err:""
  }

  componentDidMount(){
    GetUserMedia({audio:true},(err,stream)=>{
      if(!err){
        this.gotMedia(stream)
      }
      else{
        console.log(err)

        this.setState({err})
      }
    })
  }

  gotMedia = (stream) => {
    var peer1 = new Peer({ initiator: true, stream: stream })
    var peer2 = new Peer()
   
    peer1.on('signal', function (data) {
      console.log("HEY")
      peer2.signal(data)
    })
   
    peer2.on('signal', function (data) {
      console.log("HEY")
      peer1.signal(data)
    })
   
    peer2.on('stream', function (stream) {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{this.state.err.toString()}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
