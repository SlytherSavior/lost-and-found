import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/firebaseConfig";
import { 
  updateProfile, updateEmail, updatePassword, 
  reauthenticateWithCredential, EmailAuthProvider, signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    bio: "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.replace("/");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        setUserData({
          displayName: user.displayName || "",
          email: user.email || "",
          bio: userDoc.exists() ? userDoc.data().bio || "" : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError("");
      const user = auth.currentUser;
      
      if (!user) {
        setError("You must be logged in to update your profile");
        return;
      }

      if (userData.displayName.trim() === "") {
        setError("Username cannot be empty");
        return;
      }

      // Update display name in Firebase Auth
      await updateProfile(user, { displayName: userData.displayName });

      // Update or create user document in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, { 
          displayName: userData.displayName,
          bio: userData.bio
        });
      } else {
        await setDoc(userRef, {
          displayName: userData.displayName,
          bio: userData.bio,
          email: user.email,
          createdAt: new Date()
        });
      }
      
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      setError("New passwords do not match");
      return;
    }

    if (password.new.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const user = auth.currentUser;
      
      if (!user || !user.email) {
        setError("Authentication error");
        return;
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, password.current);
      await reauthenticateWithCredential(user, credential);

      // Change password
      await updatePassword(user, password.new);
      
      setPassword({ current: "", new: "", confirm: "" });
      Alert.alert("Success", "Password updated successfully");
    } catch (error: any) {
      console.error("Error changing password:", error);
      
      if (error.code === "auth/wrong-password") {
        setError("Current password is incorrect");
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5">
        <View className="mt-6 pb-16">
          <View className="items-center mb-8">
            <View className="bg-primary rounded-full h-24 w-24 items-center justify-center mb-2">
              <Text className="text-white text-4xl font-bold">
                {userData.displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-text">{userData.displayName || "User"}</Text>
            <Text className="text-muted">{userData.email}</Text>
          </View>

          {error ? (
            <View className="bg-red-100 p-4 rounded-xl mb-6">
              <Text className="text-red-700">{error}</Text>
            </View>
          ) : null}

          <View className="bg-surface p-5 rounded-xl mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4 flex-row items-center">
              <AntDesign name="user" size={20} color="#2563eb" /> Profile Information
            </Text>
            
            <View className="mb-4">
              <Text className="text-muted mb-1">Username</Text>
              <TextInput
                value={userData.displayName}
                onChangeText={(text) => setUserData({ ...userData, displayName: text })}
                onFocus={() => setFocusedInput("displayName")}
                onBlur={() => setFocusedInput(null)}
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "displayName" ? "border-primary" : "border-border"}`}
              />
            </View>

            <View className="mb-6">
              <Text className="text-muted mb-1">Bio</Text>
              <TextInput
                value={userData.bio}
                onChangeText={(text) => setUserData({ ...userData, bio: text })}
                onFocus={() => setFocusedInput("bio")}
                onBlur={() => setFocusedInput(null)}
                multiline
                numberOfLines={4}
                className={`px-4 py-3 rounded-xl bg-background text-text border ${focusedInput === "bio" ? "border-primary" : "border-border"}`}
                style={{ height: 100, textAlignVertical: 'top' }}
              />
            </View>

            <TouchableOpacity
              onPress={handleSaveProfile}
              disabled={saving}
              className="bg-primary py-3 rounded-xl flex-row justify-center items-center"
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Feather name="save" size={18} color="white" />
                  <Text className="text-white font-semibold text-base ml-2">Save Profile</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="bg-surface p-5 rounded-xl mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4 flex-row items-center">
              <MaterialIcons name="security" size={20} color="#2563eb" /> Change Password
            </Text>
            
            <View className="mb-4">
              <Text className="text-muted mb-1">Current Password</Text>
              <TextInput
                value={password.current}
                onChangeText={(text) => setPassword({ ...password, current: text })}
                onFocus={() => setFocusedInput("currentPass")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "currentPass" ? "border-primary" : "border-border"}`}
              />
            </View>

            <View className="mb-4">
              <Text className="text-muted mb-1">New Password</Text>
              <TextInput
                value={password.new}
                onChangeText={(text) => setPassword({ ...password, new: text })}
                onFocus={() => setFocusedInput("newPass")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "newPass" ? "border-primary" : "border-border"}`}
              />
            </View>

            <View className="mb-6">
              <Text className="text-muted mb-1">Confirm New Password</Text>
              <TextInput
                value={password.confirm}
                onChangeText={(text) => setPassword({ ...password, confirm: text })}
                onFocus={() => setFocusedInput("confirmPass")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "confirmPass" ? "border-primary" : "border-border"}`}
              />
            </View>

            <TouchableOpacity
              onPress={handleChangePassword}
              disabled={saving}
              className="bg-primary/90 py-3 rounded-xl flex-row justify-center items-center"
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="lock" size={18} color="white" />
                  <Text className="text-white font-semibold text-base ml-2">Update Password</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-100 py-3 rounded-xl flex-row justify-center items-center"
          >
            <MaterialIcons name="logout" size={20} color="#dc2626" />
            <Text className="text-red-600 font-semibold text-base ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;