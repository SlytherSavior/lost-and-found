import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type PubRecordProps = {
    Category: string;
    Uploader: string;
    Status: boolean;
    Description: string;
    Title: string;
}

export function PubRecord(record: PubRecordProps, index: number) {

    return (
        <View className="bg-card border-solid text-cardText flex flex-col m-2" style={styles.cardHolder} key={index}>
            <View className="grid grid-cols-3 gap-2 " style={styles.titleBar}>
                <Text className="font-bold  text-xl col-span-2">{record.Title}</Text>
                <Text >{record.Category}</Text>
            </View>
            <View>
                <Text className="text-lg" style={styles.Description}>{record.Description}</Text>
            </View>
            <View style={styles.Bottom} className="text-sm">
                <Text>{record.Uploader}</Text>
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