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

class ListCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // checked: false,
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
    const {title, price} = this.props;
    return (
      <View style={styles.box_container}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Text style={styles.checkBox_text} numberOfLines={1}>
            {title}
          </Text>
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
  },
  checkBox_text: {
    flex: 1,
    color: '#000',
    fontSize: 13,
  },
  box_price: {
    color: '#000',
    fontSize: 14,
    // marginTop: 10,
  },
});

export default ListCard;
