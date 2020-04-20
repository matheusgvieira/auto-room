export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    name: 'World!',
    }
  }
  onClick = () => {
    this.setState({
    name: 'Matheus!',
    })
  };
  render() {
  return (
    <View style={styles.container}>
      <Text>Hello {this.state.name}</Text>
      <Button 
           onPress={() => {this.onClick()}} 
           title='Click me'
           color='#4169E1'>
      </Button>
    </View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  nameText: {
    fontSize: 50,
    padding: 15,
  }
}); 

/**
 * import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}
*/