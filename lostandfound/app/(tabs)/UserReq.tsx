import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, getDocs } from 'firebase/firestore';
import { recordType } from '@/types';
import Checkbox from 'expo-checkbox';

const UserReq = () => {
    const collecData = collection(db, 'Data');
    const [mainList, setMainList] = useState<recordType[]>([]);
    const [selectList, setSelectList] = useState<string[]>([]);

    useEffect(() => {
        getDocs(collecData)
            .then((response) => {
                const dataList: recordType[] = response.docs
                    .map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                    .filter((data) => data.data.Status !== true);
                setMainList(dataList);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const whenCheck = (docID: string) => {
        setSelectList((prev: string[]) =>
            prev.includes(docID)
                ? prev.filter((doc) => doc !== docID)
                : [...prev, docID]
        );
    };

    return (
        <SafeAreaView style={styles.container} className="bg-background">
            <Text className="text-3xl font-bold text-primary mb-4">Lost & Found Items</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {mainList.length > 0 ? (
                    mainList.map((doc) => (
                        <View key={doc.id} style={styles.cardWrapper}>
                            <View style={styles.checkboxRow}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={selectList.includes(doc.id)}
                                    onValueChange={() => whenCheck(doc.id)}
                                    color={selectList.includes(doc.id) ? '#4630EB' : undefined}
                                />
                                <Text style={styles.checkboxLabel}>Select</Text>
                            </View>
                            <PubRecord record={doc} />
                        </View>
                    ))
                ) : (
                    <Text className="text-gray-400 text-center mt-4">No records found.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserReq;

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
    cardWrapper: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        marginRight: 8,
        width: 20,
        height: 20,
        borderRadius: 4,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
    },
});
