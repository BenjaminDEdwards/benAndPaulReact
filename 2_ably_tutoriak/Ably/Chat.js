import React, { Component } from "react";

import { StyleSheet, View, AsyncStorage } from "react-native";

var Realtime = require("ably").Realtime;

var ably, channel;

export default class Chat extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      msg: [],
      txt: "",
      usersCount: 0
    };
  }


  subscribe = () => {
  ably = new Realtime({
    key: "g7DAeg.GFwDeQ:rxTuVBACO9oJ7df-",
    clientId: this.state.user
  });

  channel = ably.channels.get("ably-chat");
  channel.presence.subscribe("enter", member => {

    var data = {
      msg: "joined the chat",
      user: member.clientId,
      action: "joined"
    };

    var newmsg = this.state.msg;
    newmsg.push(data);
    channel.presence.get((err, members) => {
      this.setState({ msg: newmsg, usersCount: members.length });
    });
  });

  channel.presence.subscribe("leave", member => {
    var data = {
      msg: "left the chat",
      user: member.clientId,
      action: "left"
    };
    var newmsg = this.state.msg;
    newmsg.push(data);
    channel.presence.get((err, members) => {
      this.setState({ msg: newmsg, usersCount: members.length });
    });
  });

  channel.presence.enter();

  channel.subscribe("message", msg => {
    var newmsg = this.state.msg;
    newmsg.push(msg.data);
    this.setState({ msg: newmsg, txt: "" });
  });
};

  componentDidMount = () => {
    AsyncStorage.getItem("user")
      .then(value => {
        this.setState({ user: value });
        this.subscribe();
      })
      .done();
  };

  render = () => {
    return (
      <View style={styles.container}>
      </View>
    );
  };
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 10
  }

});


