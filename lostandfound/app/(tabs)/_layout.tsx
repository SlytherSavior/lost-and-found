import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
// sadly had to use so many icon imports need a better convention :(



const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="Home"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
                }} />
            <Tabs.Screen
                name="Guidelines"
                options={{
                    headerShown: false,
                    title: "Guidelines",
                    tabBarIcon: () => <Ionicons name="document-text-outline" size={24} color="black" />,
                }} />
            <Tabs.Screen
                name="NewReq"
                options={{
                    headerShown: false,
                    title: "New Request",
                    tabBarIcon: () => <AntDesign name="pluscircleo" size={23} color="black" />,
                }} />
            <Tabs.Screen
                name="UserReq"
                options={{
                    headerShown: false,
                    title: "Your Requests",
                    tabBarIcon: () => <MaterialIcons name="history" size={29} color="black" />,
                }} />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})