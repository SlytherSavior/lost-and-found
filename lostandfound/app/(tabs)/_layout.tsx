import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';




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
                    tabBarIcon: () => <Entypo name="text-document" size={24} color="black" />,
                }} />
            <Tabs.Screen
                name="New Request"
                options={{ headerShown: false }} />
            <Tabs.Screen
                name="Your Requests"
                options={{ headerShown: false }} />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})