import React, { Component } from "react";

import Microphone from "../../assets/svg/mic.svg";
//import Send from '../../assets/svg/send.svg'

import Speech from "./Speech.js";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false
    };
  }

  recordingToogle = () => this.setState({ recording: !this.state.recording });

  onEnd = () => {
    this.setState({ recording: false });
  };

  onResult = ({ finalTranscript }) => {
    const result = finalTranscript;
    this.setState({ recording: false });
    this.props.onSubmit(result);
  };

  onEnter = e => {
    if (e.which == 13 || e.keyCode == 13) {
      this.props.onSubmit(e.target.value);
      e.target.value = "";
    }
  };

  render() {
    return (
      <div>
        <div className="chat__input-container">
          <div className="chat__input-wrapper">
            <input
              className="chat__input"
              type="text"
              placeholder="Введите город..."
              onKeyPress={e => this.onEnter(e)}
            />
            <button onClick={this.recordingToogle} className={(this.state.recording) ? "chat__microphone chat__microphone--recording" : "chat__microphone"}>
              <img src={Microphone} width="20px" height="20px" />
            </button>
          </div>
        </div>
        {this.state.recording && (
          <Speech
            onStart={() => console.log("start")}
            onEnd={() => console.log("end")}
            onResult={this.onResult}
            continuous={true}
            lang="ru-RU"
            stop={this.state.recording}
          />
        )}
      </div>
    );
  }
}

export default ChatInput;
