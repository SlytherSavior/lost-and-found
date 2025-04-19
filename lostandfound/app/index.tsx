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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-background px-6">
      <View className="w-full max-w-md mx-auto">
        <Text className="text-3xl font-bold text-center text-text mb-8">
          Login or Create Account
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="h-12 px-4 mb-4 rounded-xl bg-surface text-text border border-border"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="h-12 px-4 mb-6 rounded-xl bg-surface text-text border border-border"
          placeholderTextColor="#9ca3af"
        />

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
  );
}
