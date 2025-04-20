import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '@/firebaseConfig';
import { PubRecord } from '@/components/PubRecord';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';

const Home = () => {
    const collecData = collection(db, 'Data');
    const [mainList, setMainList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [focusedInput, setFocusInput] = useState<boolean>(false);
    const user = auth.currentUser;
    useEffect(() => {
        if (!user) return;

        const queryData = query(collecData, where('userId', '!=', user.uid))

        const listen = onSnapshot(
            queryData,
            (snapshot) => {
                const dataList: any[] = snapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                    .filter((data) => data.data.Status !== true);
                setMainList(dataList);
            },
            (error) => {
                console.log('Error fetching real-time updates:', error.message);
            }
        );

        return () => listen();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text className="text-3xl font-bold text-primary">Lost & Found Items</Text>
                <Text className="text-muted mt-1 mb-4 text-base">Search through reported items below</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search items by title or description..."
                    placeholderTextColor="#94a3b8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    className={`bg-surface text-text p-3 rounded-xl border border-border ${focusedInput ? "border-primary" : "border-border"
                        }`}
                    style={styles.searchInput}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {mainList.length > 0 ? (
                    mainList
                        .filter(
                            (doc) =>
                                doc.data.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                doc.data.Description?.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((doc) => <PubRecord record={doc} key={doc.id} />)
                ) : (
                    <Text className="text-muted text-center mt-4">Request submitted by other students will be displayed here</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
        paddingBottom: 10,
    },
    searchContainer: {
        marginBottom: 12,
    },
    searchInput: {
        fontSize: 16,
    },
    scrollContainer: {
        paddingBottom: 32,
        gap: 12,
    },
});
