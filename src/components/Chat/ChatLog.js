import React, { Component } from "react";

class ChatLog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
  }

  render() {
    //console.log(this.props.log);
    return (
      <div
        className="chat__log"
        ref={el => {
            this.messagesContainer = el;
        }}
      >
        {this.props.log.map((item, index) => {
          return (
            <div
              key={index}
              className={"chat__message chat__message--" + item.type}
            >
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChatLog;
