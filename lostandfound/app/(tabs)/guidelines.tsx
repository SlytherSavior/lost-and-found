import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
} from 'react-native';
import React from 'react';

const guidelines = () => {
    return (
        <SafeAreaView style={styles.safeArea} className="bg-background">
            <ScrollView contentContainerStyle={styles.container} className="bg-background">
                <View style={styles.guidelinesContainer}>
                    <Text style={styles.title}>Guidelines to Follow</Text>
                    <Text style={styles.subtitle}>
                        Please read these guidelines carefully before adding any lost / found items.
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Labeling:</Text> Make sure the form is
                        correctly labeled:
                        {'\n'}
                        - "Lost" if you've lost the item.
                        {'\n'}
                        - "Found" if you found an item whose owner you do not know.
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Resolution Status:</Text> Indicate
                        clearly whether the request has been resolved:
                        {'\n'}
                        - Has the item been found (if lost)?
                        {'\n'}
                        - Has the item been returned to the actual owner (if found)?
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Description Details:</Text> In the
                        description, provide the following information:
                        {'\n'}
                        - Where did you find the item?
                        {'\n'}
                        - In which place did you keep the item? (Be specific)
                        {'\n'}
                        - Your contact information (phone number or email).
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Accuracy:</Text> Ensure that all the
                        information you provide is accurate and truthful.
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Privacy:</Text> Be mindful of the
                        information you share. Do not include any sensitive personal
                        details that are not necessary.
                    </Text>

                    <Text style={styles.guideline}>
                        <Text style={styles.bold}>Contact:</Text> Provide a reliable way for
                        people to contact you regarding the item.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default guidelines;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Light background for the whole screen
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    guidelinesContainer: {
        backgroundColor: '#fff', // White background for the guidelines box
        padding: 20,
        borderRadius: 10, // Rounded corners
        width: '90%', // Adjust width as needed
        maxWidth: 600, // Maximum width
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // for Android shadow
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    guideline: {
        fontSize: 16,
        color: '#444',
        marginBottom: 15,
        lineHeight: 24,
    },
    bold: {
        fontWeight: 'bold',
        color: '#222',
    },
});
