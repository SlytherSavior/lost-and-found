import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-background">
            <Text className="text-2xl text-primary">home</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})