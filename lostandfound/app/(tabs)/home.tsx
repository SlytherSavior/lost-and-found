import { StyleSheet, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, onSnapshot } from 'firebase/firestore';

const Home = () => {
    const collecData = collection(db, "Data");
    const [mainList, setMainList] = useState<any[]>([]);

    useEffect(() => {
        const listen = onSnapshot(collecData, (snapshot) => {
            const dataList: any[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })).filter((data) => {
                return data.data.Status !== true;
            });
            setMainList(dataList);
        }, (error) => {
            console.log("Error fetching real-time updates:", error.message);
        });

        return () => listen();
    }, []);


    return (
        <SafeAreaView style={styles.container} className="bg-background">
            <Text className="text-3xl font-bold mb-6 text-primary">
                Lost & Found Items
            </Text>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {mainList.length > 0 ? (
                    mainList.map((doc) => (
                        <PubRecord record={doc} key={doc.id} />
                    ))
                ) : (
                    <Text className="text-muted text-center mt-4">No records found.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#0f172a',
    },
    scrollContainer: {
        paddingBottom: 32,
        width: '100%',
    },
});
