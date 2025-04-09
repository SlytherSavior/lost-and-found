import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dataList } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';

const Home = () => {
    // const fetchData = async () => {
    //     const globalList = await dataList();
    //     return globalList;
    // }
    // const mainList = fetchData();
    // const fetchData = async () => {
    //     const globalList = await dataList();
    //     return globalList;
    // }
    // const [mainList, setmainList] = useState([]);

    // useEffect(() => {
    //     fetchData().then(response => {
    //         setmainList(response.Data())
    //     }
    //     )

    // }, [])


    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-background">
            <Text className="text-2xl text-primary">home</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})