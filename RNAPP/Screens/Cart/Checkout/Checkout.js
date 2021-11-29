import React, { useEffect, useState, useContext} from 'react'
import { Text, View, Button } from 'react-native'
import { Item, Picker, Toast } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import AuthGlobal from "../../../Context/store/AuthGlobal"


const Checkout = (props) => {
    const context = useContext(AuthGlobal)

    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ city, setCity ] = useState();
    const [ phone, setPhone ] = useState();
    const [ user, setUser ] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)

        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId)
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        console.log("orders", orderItems)
        let order = {
            city,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            status: "3",
            user,
        }

        props.navigation.navigate("Payment", { order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />

                   <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />

            
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => checkOut()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)