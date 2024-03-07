import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import Header from "../components/Header";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const route = useRoute();
  const productId = route.params.productId;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        Alert.alert("error at fetching the data");
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <View style={styles.mainContainer}>
      <Header />

      {product ? (
        <>
          <Swiper style={styles.swiper}>
            {product.images.map((image, index) => (
              <View key={index}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
            ))}
          </Swiper>
          <View style={styles.details}>
            <Text style={styles.title}>{`${product.title}`}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.price}>{`Price: $${product.price}`}</Text>
              <Text
                style={styles.discount}
              >{`(-${product.discountPercentage}%)`}</Text>
            </View>

            <Text
              style={styles.desc}
            >{`Description: ${product.description}`}</Text>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Product Details
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <View>
                <Text style={styles.price}>Brand</Text>
                <Text style={styles.price}>Category</Text>
                <Text style={styles.price}>Rating</Text>
                <Text style={styles.price}>Stock</Text>
              </View>
              <View>
                <Text style={styles.price}>{`${product.brand}`}</Text>
                <Text style={styles.price}>{`${product.category}`}</Text>
                <Text style={styles.price}>{`${product.rating} `} </Text>
                <Text style={styles.price}>{`${product.stock}`}</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  details: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
  },
  price: {
    fontSize: 20,
  },
  discount: {
    fontSize: 20,
    color: "red",
    marginLeft: 10,
  },
  desc: {
    marginVertical: 5,
    fontSize: 18,
  },
});
