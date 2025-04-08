import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PubRecordProps {
    Category: string;
    Uploader: string;
    Status: boolean;
    Description: string;
    Title: string;
}

export function PubRecord(record: PubRecordProps, index: number) {

    return (
        <View>
            <Text className="font-bold">PubRecord</Text>
        </View>
    )
};

const styles = StyleSheet.create({})