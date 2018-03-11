import React, { Component } from "react";

import ChatInput from "./ChatInput.js";
import ChatLog from "./ChatLog.js";

import {
  getRandomCity,
  checkCity,
  getRandomCityByLetter
} from "../../helpers/api.js";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usedCities: [],
      chatLog: [

      ],
      currentLetter: null
    };
  }

  addCity(city) {
    if (
      ["ь", "ъ", "й", "ы", "ё"].indexOf(city.name[city.name.length - 1]) == -1
    ) {
      this.props.linkCityToMap(city.name);
      this.setState({
        usedCities: [...this.state.usedCities, city.city_id],
        currentLetter: city.name[city.name.length - 1]
      });
    } else {
      this.props.linkCityToMap(city.name);
      this.setState({
        usedCities: [...this.state.usedCities, city.city_id],
        currentLetter: city.name[city.name.length - 2]
      });
    }
  }

  componentDidMount() {
    getRandomCity()
      .then(result => {
        if (result.status == 200) {
          this.addBotMessage(result.data.name);
          setTimeout(() => this.addCity(result.data), 1500);
        }
      })
      .catch(error => {
        this.addBotMessage("Потерял соединение с сервером :(");
      });
  }

  addBotCityByLetter = () => {
    getRandomCityByLetter(this.state.currentLetter)
      .then(result => {
        if (
          result.status == 200 &&
          this.state.usedCities.indexOf(result.data.city_id) == -1
        ) {
          this.addBotMessage(result.data.name);
          setTimeout(() => this.addCity(result.data), 1500);
        } else {
          this.addBotCityByLetter();
        }
      })
      .catch(error => {
        this.addBotMessage("Потерял соединение с сервером :(");
      });
  };

  addBotMessage = text => {
    setTimeout(
      () =>
        this.setState({
          chatLog: [...this.state.chatLog, { type: "bot", text: text }]
        }),
      1500
    );
  };

  addMessage = message => {
    this.setState({
      chatLog: [...this.state.chatLog, message]
    });
  };

  addUserMessage = text => {
    this.setState({
      chatLog: [...this.state.chatLog, { type: "user", text: text }]
    });
  };

  validateCity = name => {
    if (name !== "") {
      if (name.toLowerCase() == "сдаюсь") {
        this.addUserMessage(name);
        this.addBotMessage("лол");
      } else {
        this.addUserMessage(name);
        checkCity(name).then(result => {
          if (result.status == 200) {
            if (result.data.check) {
              if (this.state.usedCities.indexOf(result.data.city_id) > -1) {
                this.addBotMessage("Этот город уже был!");
              } else {
                if (
                  result.data.name[0].toLowerCase() == this.state.currentLetter
                ) {
                  this.addCity(result.data);
                  this.addBotCityByLetter();
                } else {
                  this.addBotMessage(
                    "Город не начинается на " + this.state.currentLetter
                  );
                }
              }
            } else {
              this.addBotMessage("Такого города к сожалению я не знаю :(");
            }
          }
        });
      }
    } else {
      return null;
    }
  };

  render() {
    //console.log(this.state.currentLetter, this.state.usedCities);
    return (
      <div className="chat">
        <ChatLog log={this.state.chatLog} />
        <ChatInput onSubmit={this.validateCity} />
      </div>
    );
  }
}

export default Chat;
