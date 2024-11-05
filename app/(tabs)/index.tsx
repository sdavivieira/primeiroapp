import React, { Component,  } from "react"
import { View, StyleSheet, Image, Text, TextInput, Modal, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Button } from "react-native"

interface Estabelecimento {
  inputAlcool: number | null;
  inputGasolina: number | null;
  modalVisible : boolean,
  result : string
}

class App extends Component<{}, Estabelecimento>{

  constructor(props : any){
    super(props);
    this.state = {
      modalVisible: false,
      inputAlcool : 0,
      inputGasolina : 0,
      result: ''
    }
    this.calcular = this.calcular.bind(this)
  }

  calcular(){
    this.setState({modalVisible: true});
    if(this.state.inputAlcool == 0 || this.state.inputAlcool == 0)
     {
      alert('Os valores tem que ser validos.') 
      return;
    } 
    var calculaValores = this.state.inputAlcool! / this.state.inputGasolina!;
    const resultado = calculaValores < 0.7 ? 'Álcool' : 'Gasolina';

    this.setState({result : resultado})
  }
  sair(visible : boolean){
    this.setState({modalVisible: visible})
  }
  render(){

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}> 
          <Image style={styles.logo}
          source={require('@/src/logo.png')}
          />
          <Text style={styles.Title} >Qual melhor opção?</Text>
          <Text style={styles.TitleInput} >Álcool (preço por litro):?</Text>
          <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              onChangeText={(number) => this.setState({inputAlcool : number ? parseFloat(number) : 0})}
              value={this.state.inputAlcool?.toString() ?? ""}
            />
          <Text style={styles.TitleInput} >Gasolina (preço por litro):?</Text>
          <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              onChangeText={(number) => this.setState({inputGasolina : number ? parseFloat(number) : 0})}
              value={this.state.inputGasolina?.toString() ?? ""}
            />
            <TouchableOpacity style={styles.button} onPress={this.calcular}>
              <Text style={styles.textButton}> Calcular</Text>
            </TouchableOpacity>

            <Modal animationType="slide" visible={this.state.modalVisible}>
              <View style={styles.containerModal}>
                <Image style={styles.logo} source={require('@/src/gas.png')}/>
                <Text style={{color: 'green', fontSize: 28, marginTop: 10}}>Compensa usar {this.state.result}</Text>
                <Text style={{color: '#FFF', fontSize: 24, marginTop: 10}}>Com os Preços</Text>
                <Text style={{color: '#FFF', fontSize: 20,  marginTop: 10}}>Álcool: R$: {this.state.inputAlcool}</Text>
                <Text style={{color: '#FFF', fontSize: 20,  marginTop: 10,  marginBottom: 10}}>Gasolina: R$: {this.state.inputGasolina}</Text>
                <Button title="calcular novamente" onPress={() => this.sair(false)}/>
              </View>
            </Modal>
        </View>
      </TouchableWithoutFeedback>
    )
  
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center'
  },
  logo:{
    marginTop: 50,
    marginBottom: 10
  },
  Title:{
    color: '#FFF',
    fontSize: 30
  },
  TitleInput: {
    marginTop: 40,
    color: '#FFF',
    fontSize: 25,
    marginBottom: 10
  },
  input : {
    backgroundColor: '#FFF',
    width: 300,
    height: 30,
    borderRadius: 2
  },
  button :{
    backgroundColor: 'red',
    color: '#FFF',
    marginTop : 20,
    fontSize: 150,
    width: 250,
    height: 50,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'

  },
  textButton:{
    color: '#FFF',
    fontSize: 30,
    justifyContent: 'center'
  },



  containerModal : {
    flex : 1,
    backgroundColor: '#222',
    alignItems: 'center'
  }
})
export default App;