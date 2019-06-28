import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: 'black',
    width: 60,
    margin: 5,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
})
