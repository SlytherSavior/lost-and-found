import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, getDocs } from 'firebase/firestore';
import { recordType } from '@/types'

const Home = () => {
    const collecData = collection(db, "Data");
    const [mainList, setMainList] = useState<recordType[]>([]);
    useEffect(() => {
        getDocs(collecData).then(response => {
            const dataList: recordType[] = response.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })).filter((data) => {
                return data.data.Status !== true;
            })
            setMainList(dataList);
        }).catch(error => {
            console.log(error.message)
        })
    }, []);


    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-background">
            <Text className="text-2xl text-prima ry">Home</Text>
            <ScrollView className="bg-black p-4" >
                {mainList.map((doc) => (
                    <PubRecord record={doc} key={doc.id}></PubRecord>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})