import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {height, width} from '../assets/Constant';
import {CheckBox} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Icon} from 'react-native-elements';

class AppCheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      // list: [],
    };
  }

  // handleChange = data => {
  //   const {title, price} = data;
  //   if (!this.state.checked) {
  //     this.setState({
  //       checked: true,
  //     });
  //     this.setState(prevState => ({
  //       ...this.state.list,
  //       list: [
  //         ...prevState.list,
  //         {
  //           title,
  //           price,
  //         },
  //       ],
  //     }));
  //   } else {
  //     this.setState({
  //       checked: false,
  //     });
  //   }
  // };

  // totalAmount = () => {
  //   let total = this.state.list.reduce((t, l) => {
  //     return (t += l.price);
  //   }, 0);
  //   console.warn(total);
  // };

  // componentDidMount() {
  //   this.totalAmount();
  // }
  // componentDidUpdate() {
  //   this.totalAmount();
  // }

  render() {
    // console.warn('hello,,', this.state.list);
    const {title, price, onPress, checked} = this.props;
    return (
      <View style={styles.box_container}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <CheckBox
            center
            // title="Coppor Pipes with Insulation, Flare, Nuts & plaster"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={onPress}
            checked={checked}
          />

          <Text style={styles.checkBox_text}>{title}</Text>
          <Text style={styles.box_price}>{price} SAR</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
    borderRadius: 35,
    backgroundColor: '#1c235e',
    // width: width / 1.2,
    // height: height / 10,
    //margin: 10,
    // marginTop: 5,
    margin: 2,
    // borderWidth: 2,
    // shadowColor: 'cyan',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  checkBox_text: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  box_price: {
    color: '#fff',
    fontSize: 16,
    // marginTop: 10,
  },
});

export default AppCheckBox;
