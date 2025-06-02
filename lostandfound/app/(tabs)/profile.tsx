import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/firebaseConfig";
import { 
  updateProfile, updatePassword, 
  reauthenticateWithCredential, EmailAuthProvider, signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialUserData, setInitialUserData] = useState({
    displayName: "",
    email: "",
    bio: "",
  });
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
  
  const hasProfileChanges = () => {
    return userData.displayName !== initialUserData.displayName || 
           userData.bio !== initialUserData.bio;
  };
  
  const hasPasswordChanges = () => {
    return password.current.trim() !== "" && 
           password.new.trim() !== "" && 
           password.confirm.trim() !== "";
  };

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
        
        const userData = {
          displayName: user.displayName || "",
          email: user.email || "",
          bio: userDoc.exists() ? userDoc.data().bio || "" : "",
        };

        setUserData(userData);
        setInitialUserData(userData); // Store initial state
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

      if (userData.bio.trim() === "") {
        setError("Contact Information cannot be empty");
        return;
      }

      await updateProfile(user, { displayName: userData.displayName });

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
      
      setInitialUserData({...userData});
      
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    
    setError("");
    
    if (password.new !== password.confirm) {
      setError("New passwords do not match");
      return;
    }

    if (password.new.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (password.current.trim() === "") {
      setError("Please enter your current password");
      return;
    }

    try {
      setSaving(true);
      const user = auth.currentUser;
      
      if (!user || !user.email) {
        setError("Authentication error");
        return;
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, password.current);
        await reauthenticateWithCredential(user, credential);
      } catch (authError: any) {
        if (authError.code === "auth/wrong-password") {
          setError("Current password is incorrect");
        } else if (authError.code === "auth/too-many-requests") {
          setError("Too many failed attempts. Please try again later");
        } else {
          setError("Authentication failed. Please check your current password");
        }
        setSaving(false);
        alert(`${error}`);
        return; 
      }

      
      await updatePassword(user, password.new);
      
      setPassword({ current: "", new: "", confirm: "" });
      
      Alert.alert(
        "Success", 
        "Your password has been updated successfully",
        [{ text: "OK" }]
      );
      
    } catch (error: any) {
      console.error("Error changing password:", error);
      
      if (error.code === "auth/requires-recent-login") {
        setError("For security, please sign out and sign in again before changing your password");
      } else {
        setError("Failed to change password. Please try again later");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error: any) {
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
                placeholder="Enter your username"
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "displayName" ? "border-primary" : "border-border"}`}
              />
            </View>

            <View className="mb-6">
              <Text className="text-muted mb-1">Contact Information</Text>
              <TextInput
                value={userData.bio}
                onChangeText={(text) => setUserData({ ...userData, bio: text })}
                onFocus={() => setFocusedInput("bio")}
                onBlur={() => setFocusedInput(null)}
                multiline
                placeholder="Enter your contact information other than your email. Email used to create this account is visible to others."
                numberOfLines={4}
                className={`px-4 py-3 rounded-xl bg-background text-text border ${focusedInput === "bio" ? "border-primary" : "border-border"}`}
                style={{ height: 100, textAlignVertical: 'top' }}
              />
            </View>

            <TouchableOpacity
              onPress={handleSaveProfile}
              disabled={saving || !hasProfileChanges()}
              className={`py-3 rounded-xl flex-row justify-center items-center ${
                hasProfileChanges() ? "bg-primary" : "bg-primary/40"
              }`}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Feather name="save" size={18} color="white" />
                  <Text className="text-white font-semibold text-base ml-2">
                    {hasProfileChanges() ? "Save Profile" : "No Changes"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="bg-surface p-5 rounded-xl mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4 flex-row items-center">
              <MaterialIcons name="security" size={20} color="#2563eb" /> Change Password
            </Text>
            

            <View className="mb-4">
              <Text className="text-muted mb-1">New Password</Text>
              <TextInput
                value={password.new}
                onChangeText={(text) => setPassword({ ...password, new: text })}
                onFocus={() => setFocusedInput("newPass")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry
                autoComplete="off"
                textContentType="oneTimeCode"
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
                textContentType="oneTimeCode"
                autoComplete="off"
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "confirmPass" ? "border-primary" : "border-border"}`}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-muted mb-1">Current Password</Text>
              <TextInput
                value={password.current}
                onChangeText={(text) => setPassword({ ...password, current: text })}
                onFocus={() => setFocusedInput("currentPass")}
                onBlur={() => setFocusedInput(null)}
                textContentType="oneTimeCode" 
                secureTextEntry
                autoComplete="off"
                className={`h-12 px-4 rounded-xl bg-background text-text border ${focusedInput === "currentPass" ? "border-primary" : "border-border"}`}
              />
            </View>

            <TouchableOpacity
              onPress={handleChangePassword}
              disabled={saving || !hasPasswordChanges()}
              className={`py-3 rounded-xl flex-row justify-center items-center ${
                hasPasswordChanges() ? "bg-primary/90" : "bg-primary/40"
              }`}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="lock" size={18} color="white" />
                  <Text className="text-white font-semibold text-base ml-2">
                    {hasPasswordChanges() ? "Update Password" : "Enter Password Details"}
                  </Text>
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