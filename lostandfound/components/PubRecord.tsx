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
                <Text style={styles.uploader}>Uploader Name: {record.data.Uploader}</Text>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff', //white 
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
        fontWeight: '800', // heavy font weight for titles
        color: 'buttonText',
        flexShrink: 1,
        marginRight: 10,
    },
    category: {
        fontSize: 13,
        fontWeight: '600', // medium weight for the category label
        color: '#94a3b8', // muted color
        backgroundColor: '#f1f5f9', // muted background for the category
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    description: {
        fontSize: 15,
        color: '#64748b', // slate-400 for description text
        marginBottom: 12,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0', // light border color for separation
        paddingTop: 10,
    },
    uploader: {
        fontSize: 13,
        color: '#94a3b8', // muted color for uploader text
    },
});
