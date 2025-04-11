import { StyleSheet, Text, View } from 'react-native';
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
                <Text style={styles.uploader}>Uploaded by: {record.data.Uploader}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fdfdfd',
        margin: 12,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flexShrink: 1,
        color: '#333',
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        color: '#777',
        alignSelf: 'center',
    },
    description: {
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    uploader: {
        fontSize: 14,
        color: '#555',
    },
});
