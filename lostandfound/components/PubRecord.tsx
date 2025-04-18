import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { recordType } from '@/types';

interface PubRecordType {
    record: recordType;
}

export function PubRecord({ record }: PubRecordType) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{record.data.Title}</Text>
                <Text style={styles.category}>{record.data.Category}</Text>
            </View>
            <Text style={styles.description}>{record.data.Description}</Text>
            <View style={styles.footer}>
                <Text className="font-bold" style={styles.uploader}>Uploaded by: {record.data.Uploader}</Text>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 8,
        alignSelf: 'center',
        width: screenWidth - 32, 
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b', 
        flexShrink: 1,
        marginRight: 10,
    },
    category: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748b', 
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    description: {
        fontSize: 15,
        color: '#475569', 
        marginBottom: 12,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10,
    },
    uploader: {
        fontSize: 13,
        color: '#94a3b8', 
    },
});
