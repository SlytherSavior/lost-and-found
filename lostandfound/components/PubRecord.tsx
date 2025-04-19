import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

export function PubRecord({ record }: any) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{record.data.Title}</Text>
                <Text style={styles.category}>{record.data.Category}</Text>
            </View>
            <Text style={styles.description}>{record.data.Description}</Text>
            <View style={styles.footer}>
                <Text style={styles.uploader}>Uploader: {record.data.Uploader}</Text>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e293b', // custom 'card' color
        marginVertical: 10,
        alignSelf: 'center',
        width: screenWidth - 32,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#334155', // 'border'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#f1f5f9', // 'text'
        flexShrink: 1,
        marginRight: 10,
    },
    category: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94a3b8', // 'muted'
        backgroundColor: '#334155', // subtle pill bg, from 'border'
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    description: {
        fontSize: 14,
        color: '#cbd5e1', // slate-300 for a softer contrast
        marginBottom: 12,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#334155', // 'border'
        paddingTop: 8,
    },
    uploader: {
        fontSize: 12,
        color: '#94a3b8', // 'muted'
    },
});
