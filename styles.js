import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  board: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'web' ? -50 : 20,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    elevation: 8,
  },
  boardComponent: {
    height: 10,
    width: 10,
  },
  snakeComponent: {
    height: 10,
    width: 10,
    backgroundColor: 'brown',
  },
  foodComponent: {
    height: 10,
    width: 10,
    backgroundColor: 'green',
    borderRadius: 3,
  },
  buttons: {
    alignItems: 'center',
  },
  buttonHorizontal: {
    flexDirection: 'row',
  },
  scoreContainer: {
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
    padding: 10,
    paddingTop: Platform.OS !== 'web' ? 50 : 10,
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  scoreHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    marginLeft: 10,
  },
  scoreText: {
    fontSize: 25,
    color: 'white',
    marginLeft: 10,
  },
})

export default styles
