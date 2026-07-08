import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { banners } from "../../constants/banner";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleFindRide = () => {
    console.log({
      source,
      destination,
    });

    // API call here
  };
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          const storedUser = JSON.parse(user);
          setName(storedUser?.name);
        }
      } catch (error) {
        console.log("Error getting user:", error);
      }
    };

    getUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.userName}>Hello {name.split(" ")[0]}</Text>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/12121/12121407.png",
            }}
            style={styles.waveImage}
          />
        </View>

        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#ffffff" />
          <View style={styles.countMsg}>
            <Text style={styles.countTxt}>5</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Carousel */}
      <Carousel
        width={width}
        height={160}
        autoPlay
        loop
        autoPlayInterval={3000}
        scrollAnimationDuration={500}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 30,
        }}
        data={banners}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.img}
            style={styles.banner}
            imageStyle={styles.bannerImage}
          >
            <View style={styles.overlay}>
              <Text style={styles.bannerTitle}>{item.title}</Text>

              <Text style={styles.bannerText}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>{item.primaryButton}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      {/* Search Section */}

      <View style={styles.searchBox}>
        <Text style={styles.heading}>Where do you want to go?</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="location" size={22} />

          <TextInput
            placeholder="Leaving from"
            value={source}
            onChangeText={setSource}
            style={styles.input}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={22} />

          <TextInput
            placeholder="Going to"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleFindRide}>
          <Text style={styles.buttonText}>Find Ride</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Section */}

      <View style={styles.options}>
        <Text style={styles.optionTitle}>Quick Options</Text>

        <View style={styles.cards}>
          <TouchableOpacity style={styles.card}>
            <FontAwesome name="car" size={18} color="#000000" />
            <Text style={styles.quickoptionsText}>Offer Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <FontAwesome5 name="caravan" size={18} color="#000000" />
            <Text style={styles.quickoptionsText}>Recent Trips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  banner: {
    marginHorizontal: 15,
    height: 150,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    overflow: "hidden",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  bannerImage: {
    borderRadius: 20,
  },
  bannerText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 15,
  },

  searchBox: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 5,
    borderRadius: 12,
    paddingHorizontal: 15,
  },

  dot: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  line: {
    height: 25,
    width: 1,
    backgroundColor: "#ccc",
    marginLeft: 20,
  },

  button: {
    marginTop: 25,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerBtn: {
    marginTop: 15,
    height: 35,
    borderRadius: 15,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  bannerBtnText: {
    fontSize: 13,
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  options: {
    paddingHorizontal: 20,
  },

  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cards: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
  },

  card: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d4d4d4",
    elevation: 10,
  },
  quickoptionsText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111",
    fontFamily: "monospace",
  },

  waveImage: {
    width: 40,
    height: 34,
    marginLeft: 6,
  },

  chatButton: {
    position: "relative",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000000dc",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  countMsg: {
    position: "absolute",
    top: -5,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  countTxt: {
    color: "#fff",
    fontSize: 13,
  },
});
