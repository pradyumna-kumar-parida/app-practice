import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={60} color="#000" />
    </View>
  );
};

export default Loader;
