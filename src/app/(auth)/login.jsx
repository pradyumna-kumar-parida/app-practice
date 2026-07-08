import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { login } from "../../services/authServices";
import Loader from "../../components/loader";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState(null);
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Email and password are required",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email: email.trim(),
        password,
      });

      Toast.show({
        type: "success",
        text1: response?.data?.message || "Login successful",
        text2: "Welcome back!",
      });

      console.log("Response:", response.data);
      const token = response?.data?.token;

      if (token) {
        await SecureStore.setItemAsync("token", token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user),
        );
      }
      setTimeout(() => {
        setEmail("");
        setPassword("");
        router.replace("/(tabs)/home");
      }, 4000);
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.wrapper}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={50} color="#fff" />
            </View>

            <Text style={styles.title}>RideGo</Text>
            <Text style={styles.subtitle}>Login to continue your journey</Text>
          </View>

          {/* Email */}
          <View style={styles.inputBox}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#777"
              style={styles.icon}
            />

            <TextInput
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#777"
              style={styles.icon}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* Signup */}
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signup}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {loading && <Loader />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PRIMARY = "#000";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  logoCircle: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    color: PRIMARY,
    fontWeight: "600",
  },

  loginButton: {
    height: 60,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: 2,
  },

  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
  },

  bottomText: {
    color: "#666",
    fontSize: 15,
  },

  signup: {
    color: PRIMARY,
    fontWeight: "700",
    fontSize: 15,
  },
});
