import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
const profile = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken);
    };

    getToken();
  }, []);
  return (
    <SafeAreaView>
      <Text>Token : {token}</Text>
    </SafeAreaView>
  );
};

export default profile;
