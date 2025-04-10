import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, getDocs } from 'firebase/firestore';


const Home = () => {
    const collecData = collection(db, "Data");
    const [mainList, setMainList] = useState([]);
    useEffect(() => {
        let tempList = [];
        getDocs(collecData).then(response => {
            const dataList = response.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            setMainList(dataList);
        }).catch(error => {
            console.log(error.message)
        })
    }, [])
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