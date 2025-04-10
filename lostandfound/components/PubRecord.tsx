import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type PubRecordProps = {
    id: number,
    data: {
        Category: string;
        Uploader: string;
        Status: boolean;
        Description: string;
        Title: string;
    }
}

export function PubRecord(record: PubRecordProps) {

    return (
        <View className="bg-card border-solid text-cardText flex flex-col m-2" style={styles.cardHolder} key={record.id}>
            <View className="grid grid-cols-3 gap-2 " style={styles.titleBar}>
                <Text className="font-bold  text-xl col-span-2">{record.data.Title}</Text>
                <Text >{record.data.Category}</Text>
            </View>
            <View>
                <Text className="text-lg" style={styles.Description}>{record.data.Description}</Text>
            </View>
            <View style={styles.Bottom} className="text-sm">
                <Text>{record.data.Uploader}</Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    cardHolder: {
        borderRadius: 50,
    },
    titleBar: {

    },
    Description: {

    },
    Bottom: {

    }
})