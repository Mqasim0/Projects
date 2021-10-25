import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon, CheckBox, ThemeConsumer } from 'react-native-elements';
import { width, height } from '../assets/Constant';

// import CheckOut from './CheckOut';
// import AmountCard from './AmountCard';
import AppCheckBox from './AppCheckBox';
import AmountCard from './AmountCard';
import ListCard from './ListCard';

class ReviewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // checked: false,
      list: [
        {
          id: 1,
          title: 'Coppor Pipes with Insulation, Flare, Nuts & plaster',
          price: 150,
          checked: false,
        },
        {
          id: 2,
          title: 'Iron wall mount',
          price: 65,
          checked: false,
        },
        {
          id: 3,
          title: 'Aluminum wall mount',
          price: 75,
          checked: false,
        },
        {
          id: 4,
          title: 'Copper wall mount',
          price: 80,
          checked: false,
        },
      ],
      discount: 0,
      installation: 200,
      buy: [],
      quantity: 1,
    };
  }

  incrementCounter = () => {
    this.setState({
      quantity: ++this.state.quantity,
    });
  };

  decrementCounter = () => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: --this.state.quantity,
      });
    }
  };

  handleChange = (id, index) => {
    let listState = this.state.list;
    const filterList = listState.filter(item => {
      return item.id === id;
    });
    const buyData = this.state.buy;
    if (!filterList[0].checked) {
      filterList[0].checked = true;
      buyData.push(filterList[0]);
      listState[index].checked = true;
      this.setState({
        list: listState,
        buy: buyData,
      });
    } else {
      filterList[0].checked = false;
      let updated = buyData.filter(item => {
        return item.id !== id;
      });
      listState[index].checked = false;
      this.setState({
        list: listState,
        buy: updated,
      });
    }
  };
  render() {
    let value = this.state.buy.reduce((t, b) => {
      return (t = t + b.price);
    }, 0);
    const est_code =
      ((15 * this.state.quantity) / 100) * this.state.installation +
      this.state.installation * this.state.quantity +
      value;

    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.text}>Review your Details</Text>
          <Text style={styles.subText}>
            Please review all information carefully
          </Text>
          <View style={styles.inst_container}>
            <Image
              source={{
                uri: 'image_src',
              }}
              style={styles.inst_image}
            />
            <Text style={styles.inst_text}>
              Installation | Split Air Conditioner
            </Text>
            <View style={styles.inst_subContainer}>
              <Text style={styles.inst_subText}>Date</Text>
              <Text style={styles.inst_subText}>Friday 13 August 2021</Text>
            </View>
            <View style={styles.inst_subContainer01}>
              <Text style={styles.inst_subText}>Invoice Number</Text>
              <Text style={styles.inst_subText}>0001919</Text>
            </View>
            <View style={styles.inst_subContainer01}>
              <Text style={styles.inst_subText}>Showroom</Text>
              <Text style={styles.inst_subText}>Tamkeen Showroom</Text>
            </View>
            <View style={styles.inst_underline}></View>
            <Text style={styles.inst_text01}>Quantity</Text>
            <View style={styles.inst_container01}>
              <View style={styles.inst_con}>
                <View style={styles.inst_con01}>
                  <TouchableOpacity onPress={this.decrementCounter}>
                    <Icon
                      name="minus"
                      type="font-awesome"
                      color="#fff"
                      size={15}
                      style={{
                        marginTop: 12,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center' }}>{this.state.quantity}</Text>
                <View style={styles.inst_con02}>
                  <TouchableOpacity onPress={this.incrementCounter}>
                    <Icon
                      name="plus"
                      type="font-awesome"
                      color="#fff"
                      size={15}
                      style={{
                        marginTop: 12,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tf_container}>
            <Text style={styles.tf_text}>Promo Code</Text>
            <View style={styles.textfield}>
              <TextInput placeholder="Enter your promo code here ..." />
              {/* <Icon name="arrow-right" size={25} /> */}
              <Icon name="arrow-right" type="font-awesome" />
            </View>
          </View>

          <View style={styles.check_container}>
            <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../assets/images/warranty-period.png')}
                />
                <Text style={styles.check_text}>
                  Tamkeen<Text style={styles.check_text01}> Extras</Text>
                  {'\n'}
                  <Text style={styles.check_para}>
                    {' '}
                    We Cover Everything For You..
                  </Text>
                </Text>
              </View>
              <FlatList
                data={this.state.list}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                  <AppCheckBox
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    onPress={() => this.handleChange(item.id, index)}
                    checked={item.checked}
                  />
                )}
              />
            </ScrollView>
          </View>

          <View style={styles.am_container}>
            <View style={styles.am_subContainer}>
              <Text style={styles.am_subText}>Installation</Text>
              <Text style={styles.am_subText}>
                {this.state.installation * this.state.quantity} SAR
              </Text>
            </View>

            <FlatList
              data={this.state.buy}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ListCard title={item.title} price={item.price} />
              )}
            />

            <View style={styles.am_subContainer01}>
              <Text style={styles.am_subText}>VAT</Text>
              <Text style={styles.am_subText}>{this.state.vat} 15%</Text>
            </View>

            <View style={styles.am_subContainer01}>
              <Text style={styles.am_subText}>Discount</Text>
              <Text style={styles.am_subText}>{this.state.discount} %</Text>
            </View>
            <View style={styles.am_underline}></View>
            <View style={styles.am_subContainer01}>
              <Text style={styles.am_text01}>Estimated Cost:</Text>
              <Text style={styles.am_text01}>{est_code}</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginTop: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <CheckBox
              center
              // title="Coppor Pipes with Insulation, Flare, Nuts & plaster"
              checkedIcon="dot-circle-o"
            // uncheckedIcon="circle-o"

            // checked={this.state.checked}
            />
            <Text style={{ flex: 1 }}>
              <Text style={{ marginRight: 10 }}>
                All repairs and replacements are subject to approval inline with
                the protection policy
              </Text>
              <Text
                style={[
                  styles.terms_condition,
                  { padding: 150, backgroundColor: 'red' },
                ]}
                onPress={() =>
                  Alert.alert('Please follow terms and condition')
                }>
                terms and condition
              </Text>
              <Text> and the </Text>
              <Text
                style={styles.document}
                onPress={() => Alert.alert('Documents')}>
                insurance Product information Documents.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    justifyContent: 'center',
    // marginBottom: 500,
  },
  text: {
    textAlign: 'center',
    color: '#424a75',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subText: {
    textAlign: 'center',
    color: '#515e79',
  },
  inst_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 1.1,
    height: height / 2.5,
    padding: 10,
  },
  inst_text: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  inst_subContainer: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inst_subContainer01: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inst_subText: {
    color: '#424a75',
  },
  inst_image: {
    width: width / 8,
    height: height / 30,
    alignSelf: 'center',
    marginTop: 4,
  },
  inst_underline: {
    marginTop: 20,
    borderColor: '#424a75',
    borderWidth: 0.5,
    opacity: 0.2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inst_text01: {
    color: 'red',
    fontSize: 16,
    marginTop: 18,
  },
  inst_container01: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#fff',
    borderRadius: 45,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: '#00',
    // width: width / 1.2,
    // height: height / 12,
    width: width / 1.2,
    height: height / 14,
    padding: 10,
  },
  inst_con: {
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    // marginTop: 10,
  },
  inst_con01: {
    alignSelf: 'center',
    // marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffbd75',
    borderTopLeftRadius: 45,
    borderTopStartRadius: 45,
    borderBottomStartRadius: 45,
    elevation: 2,
    position: 'relative',
    left: -85,

    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 5.2,
    height: height / 14,
    padding: 10,
  },
  inst_con02: {
    alignSelf: 'center',
    // marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffbd75',
    borderTopRightRadius: 45,
    borderTopEndRadius: 45,
    borderBottomEndRadius: 45,
    elevation: 2,
    position: 'relative',
    left: 80,
    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 5.2,
    height: height / 14,
    padding: 10,
  },
  tf_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 1.1,
    height: height / 5.7,
    padding: 10,
  },
  textfield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 35,
    backgroundColor: '#fff',
    width: width / 1.2,
    height: height / 14,
    //margin: 10,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#424a75',
  },
  tf_text: {
    color: 'red',
    paddingTop: 10,
    paddingLeft: 6,
    fontSize: 16,
  },
  check_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#1c235e',
    borderRadius: 20,
    elevation: 2,
    width: width / 1.1,
    height: height / 2.5,
    padding: 10,
  },
  check_text: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  check_text01: {
    color: 'red',
    fontSize: 18,
  },
  check_para: {
    color: '#fff',
    fontSize: 12,
  },
  check_checkBox_text: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  check_price: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  box_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 35,
    backgroundColor: '#1c235e',
    width: width / 1.2,
    height: height / 10,
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
        shadowOffset: { width: 0, height: 1 },
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
    fontSize: 14,
    marginTop: 10,
  },
  am_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 1.1,
    // height: height / 2.5,
    padding: 10,
    marginBottom: 10,
  },
  am_text: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  am_subContainer: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 5,
    paddingBottom: 30,

    // height: height / 12,
  },
  am_subContainer01: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 12,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 8,
  },
  am_subText: {
    color: '#424a75',
  },
  am_image: {
    width: width / 8,
    height: height / 30,
    alignSelf: 'center',
    marginTop: 4,
  },
  am_underline: {
    marginTop: 20,
    borderColor: '#424a75',
    borderWidth: 0.5,
    opacity: 0.2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  am_text01: {
    color: '#424a75',
    fontSize: 16,
    fontWeight: 'bold',
    // marginTop: 18,
  },
  am_container01: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: 'lightgray',
    borderRadius: 45,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: '#00',
    width: width / 1.2,
    height: height / 12,
    padding: 10,
  },
  am_con: {
    flexDirection: 'row',
  },
  terms_condition: {
    color: 'green',
    textDecorationLine: 'underline',
    //paddingLeft: 2,
    marginLeft: 4,
  },
  document: {
    color: 'green',
    textDecorationLine: 'underline',
  },
});

export default ReviewScreen;
