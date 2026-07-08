import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function SignupScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.os === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.wrapper}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={50} color="#fff" />
            </View>
            <Text style={styles.title}>RideGo</Text>
            <Text style={styles.subTitle}>
              Create your account to enjoy ride
            </Text>
          </View>
          <View style={styles.inputBox}>
            <Feather style={styles.icon} name="user" size={22} color="#777" />
            <TextInput
              placeholder="Full name"
              keyboardType="text"
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <Ionicons
              style={styles.icon}
              name="call-outline"
              size={22}
              color="#777"
            />
            <TextInput
              placeholder="Phone number"
              keyboardType="number"
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <Ionicons
              style={styles.icon}
              name="mail-outline"
              size={22}
              color="#777"
            />
            <TextInput
              placeholder="Email Address"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#777"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity>
              <Ionicons name="eye-off-outline" size={22} color="#777" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: PRIMARY,
    height: 95,
    width: 95,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
  },
  subTitle: {
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

  signupButton: {
    height: 60,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: 2,
  },

  signupText: {
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

  login: {
    color: PRIMARY,
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 5,
    cursor: "pointer",
  },
});
