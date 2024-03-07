import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const navigateToProductDetails = (productId) => {
    navigation.navigate("ProductDetails", { productId });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const jsonData = await response.json();
        setData(jsonData.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProductDetails(item.id)}>
      <View style={styles.productContainer}>
        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
        <View style={styles.productDetails}>
          <Text
            style={{ fontSize: 20, fontWeight: "500" }}
          >{`Product Name: ${item.title}`}</Text>
          <Text style={{ fontSize: 16 }}>{`Price: $${item.price}`}</Text>
          <Text style={{ fontSize: 16 }}>{`Category:${item.category}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <Text
          style={{
            marginTop: 50,
            fontSize: 24,
            fontWeight: "500",
            paddingLeft: 20,
            marginBottom: 5,
          }}
        >
          Products List
        </Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ffff",
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "stretch",
  },
  productDetails: {
    flex: 1,
  },
});
