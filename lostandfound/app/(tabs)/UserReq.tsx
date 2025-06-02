import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '@/firebaseConfig';
import { Record } from '@/components/Record';
import { collection, doc,deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import Checkbox from 'expo-checkbox';
import { ActivityIndicator } from 'react-native';

const UserReq = () => {
    const collecData = collection(db, 'Data');
    const [mainList, setMainList] = useState<any[]>([]);
    const [selectList, setSelectList] = useState<string[]>([]);
    const [selectCount, setSelectCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const user = auth.currentUser;
    useEffect(() => {
        if (!user) return;

        const queryData = query(collecData, where('userId', '==', user.uid))

        const unSub = onSnapshot(queryData, (snapshot) => {
            const records = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })).filter((doc) => doc.data.Status !== true)

            setMainList(records)
            setLoading(false);
        })

        return () => unSub();
    }, [user]);

    useEffect(() => {
        setSelectCount(selectList.length)
    })
    const updateData = async (id: string) => {
        const dataDoc = doc(db, 'Data', id);
        await deleteDoc(dataDoc);
        setSelectCount(0)

    };



    const whenCheck = (docID: string) => {
        setSelectList((prev: string[]) =>
            prev.includes(docID)
                ? prev.filter((doc) => doc !== docID)
                : [...prev, docID]
        );
    };


    const markAsResolved = async () => {
        for (let id of selectList) {
            await updateData(id);
        }
        setSelectList([]);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2563eb" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} className="text-primary">Your Requests</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
                                {selectList.includes(doc.id) && (
                                    <Text style={styles.checkboxSelected}>Selected</Text>
                                )}
                                {!selectList.includes(doc.id) && (
                                    <Text style={styles.checkboxLabel}>Select</Text>
                                )}
                            </View>
                            <Record record={doc} />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No records found.</Text>
                )}
            </ScrollView>

            {selectCount > 0 && (
                <View style={styles.footer}>
                    <TouchableOpacity onPress={markAsResolved} style={styles.markResolvedButton}>
                        <Text style={styles.markResolvedText}>Mark {selectCount} as Resolved</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );

};

export default UserReq;

const styles = StyleSheet.create({
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ef4444',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 12,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 16,
    },
    scrollContainer: {
        paddingBottom: 80,
        paddingTop: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
        gap: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    signOutText: {

        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#ef4444',
        paddingVertical: 3,
        paddingHorizontal: 1,
        borderRadius: 12,
    },
    markResolvedButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
    },
    markResolvedText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
    },
    cardWrapper: {
        marginBottom: 20,
        borderRadius: 16,
        padding: 10,
        backgroundColor: '#1e293b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingHorizontal: 4,
    },
    checkbox: {
        marginRight: 10,
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#cbd5e1',
    },
    checkboxLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#334155',
    },
    checkboxSelected: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
    emptyText: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 20,
    },
    footer: {
        backgroundColor: '#0f172a',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#334155',
        alignItems: 'center',
    },

});
