import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePass = () => {
    return password.trim() !== "";
  };

  const signIn = async () => {
    if (validateEmail()) {
      if (validatePass()) {
        setPassVisible(false);
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
          if (user?.user) router.replace("/(tabs)/Home");
        } catch (error: any) {
          console.log(error);
          alert("Sign in failed: " + error.message);
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
          if (user?.user) router.replace("/(tabs)/Home");
        } catch (error: any) {
          console.log(error);
          alert("Sign up failed: " + error.message);
        }
      } else {
        setPassVisible(true);
      }
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <SafeAreaView className="flex-1 justify-center bg-background px-6">
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
              Login or Create Account
            </Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="h-12 px-4 mb-2 rounded-xl bg-surface text-text border border-border"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
            {visible && (
              <Text className="text-red-500 mb-2 ml-1 text-sm">⚠️ Enter a valid email address</Text>
            )}

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="h-12 px-4 mb-2 rounded-xl bg-surface text-text border border-border"
              placeholderTextColor="#9ca3af"
            />
            {passVisible && (
              <Text className="text-red-500 mb-4 ml-1 text-sm">⚠️ Password cannot be empty</Text>
            )}

            <TouchableOpacity
              onPress={signIn}
              className="bg-primary py-3 rounded-xl mb-3"
            >
              <Text className="text-center text-white font-semibold text-base">
                Log In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signUp}
              className="bg-primary/10 py-3 rounded-xl"
            >
              <Text className="text-center text-primary font-semibold text-base">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
