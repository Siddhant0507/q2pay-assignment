import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="left" style={styles.icon} size={25} color="white" />
      </TouchableOpacity>
      <View style={styles.cartIconsSection}>
        <TouchableOpacity
          onPress={() => Alert.alert("Item Saved In Your Shopping List ")}
          style={styles.backButton}
        >
          <Icon name="hearto" style={styles.icon} size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert("Item added in Your Cart")}
          style={styles.backButton}
        >
          <Icon
            name="shoppingcart"
            style={styles.icon}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
  },
  cartIconsSection: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  backButton: {
    display: "flex",
    flexDirection: "row",

    width: 30,
    height: 30,
    borderRadius: 50,
  },
  icon: {
    color: "black",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 25,
    color: "black",
  },
});
