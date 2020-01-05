import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  Container: {
    backgroundColor: "#2b2d35",
    height: "100%",
    width: "100%",
  },
  Button: {
    backgroundColor: "#cc0c1c",
    borderRadius: 15,
    width: "60%",
    marginLeft: "20%",
    height: 60,
    marginTop: 50,
  },
  ButtonText: {
    color: "#fafafa",
    fontSize: 22,
    letterSpacing: 1.1,
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
})
