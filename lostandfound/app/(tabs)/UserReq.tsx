import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, doc, getDocs } from 'firebase/firestore';
import { recordType } from '@/types'

const UserReq = () => {
    const collecData = collection(db, "Data");
    const [mainList, setMainList] = useState<recordType[]>([]);
    const [selectList, setSelectList] = useState<string[]>([]);
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

    const handleCheck = (docID: string) => {
        setSelectList((prev: string[]) => {
            if (prev.includes(docID)) {
                return prev.filter((doc) => {
                    doc !== docID;
                })
            } else {
                return [...prev, docID];
            }
        })
    }


    return (
        <SafeAreaView style={styles.container} className="bg-background">
            <Text className="text-3xl font-bold text-primary mb-4">Lost & Found Items</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {mainList.length > 0 ? (
                    mainList.map((doc) => (
                        <PubRecord record={doc} key={doc.id} />
                    ))
                ) : (
                    <Text className="text-gray-400 text-center mt-4">No records found.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserReq

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    scrollContainer: {
        paddingBottom: 32,
        width: '100%',
    },
});