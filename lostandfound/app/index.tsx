import { auth } from "@/firebaseConfig";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);

  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const validateEmail = () => /^[^\s@]+@gmail\.com$/.test(email);
  const validatePass = () => password.trim() !== "";

  const signIn = async () => {
    if (validateEmail()) {
      if (validatePass()) {
        setPassVisible(false);
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
          if (user?.user) router.replace("/(tabs)/guidelines");
        } catch (error: any) {
          handleAuthError(error.code, "Sign In");
        }
      } else {
        setPassVisible(true);
      }
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const signUp = async () => {
    if (validateEmail()) {
      if (validatePass()) {
        setPassVisible(false);
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          if (user?.user) router.replace("/(tabs)/guidelines");
          // router.replace("/(tabs)/home");
        } catch (error: any) {
          handleAuthError(error.code, "Sign Up");
        }
      } else {
        setPassVisible(true);
      }
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleAuthError = (code: string, action: string) => {
    let message = "An unknown error occurred.";

    switch (code) {
      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;
      case "auth/user-disabled":
        message = "This user account has been disabled.";
        break;
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/email-already-in-use":
        message = "An account with this email already exists.";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;
      case "auth/too-many-requests":
        message = "Too many attempts. Please try again later.";
        break;
      default:
        message = code.replace("auth/", "").replace(/-/g, " ");
        break;
    }

    alert(`${action} failed: ${message}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-background px-6 justify-center">
          <View className="w-full max-w-md mx-auto">

            <View className="bg-primary/10 p-6 rounded-2xl mb-8">
              <Text className="text-2xl font-bold text-primary text-center">
                Welcome to Lost & Found
              </Text>
              <Text className="text-sm text-muted text-center mt-2">
                Helping you return and retrieve lost items easily.
              </Text>
            </View>

            <Text className="text-3xl font-bold text-center text-text mb-8">
              Log In or Sign Up
            </Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
              className={`h-12 px-4 mb-2 rounded-xl bg-surface text-text border ${focusedInput === "email" ? "border-primary" : "border-border"
                }`}
            />
            {visible && (
              <Text className="text-red-500 mb-2 ml-1 text-sm">
                ⚠️ Enter a valid email address
              </Text>
            )}

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              placeholderTextColor="#9ca3af"
              className={`h-12 px-4 mb-2 rounded-xl bg-surface text-text border ${focusedInput === "password" ? "border-primary" : "border-border"
                }`}
            />
            {passVisible && (
              <Text className="text-red-500 mb-4 ml-1 text-sm">
                ⚠️ Password cannot be empty
              </Text>
            )}

            <TouchableOpacity
              onPress={signIn}
              className="bg-primary py-3 rounded-xl mb-3 flex-row justify-center items-center space-x-2"
            >
              <Text className="mr-2">
                <Entypo name="login" size={20} color="white" />
              </Text>
              <Text className="text-white font-semibold text-base">
                Log In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signUp}
              className="bg-primary/10 py-3 rounded-xl flex-row justify-center items-center space-x-2"
            >
              <AntDesign name="adduser" size={20} color="#2563eb" />
              <Text className="text-primary font-semibold text-base">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
 