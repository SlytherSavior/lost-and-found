import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Icon from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { getDoc, doc } from 'firebase/firestore';

const NewRequest = () => {
    const [Title, setTitle] = useState('');
    const [Uploader, setUploader] = useState('');
    const [Description, setDescription] = useState('');
    const [Category, setCategory] = useState<'Lost' | 'Found'>('Lost');
    const user = auth.currentUser;
    const collecData = collection(db, "Data");


    const addData = async () => {
        if (user) {
            await addDoc(collecData, {
                Title,
                Uploader,
                Category,
                Description,
                Status: false,
                userId: user?.uid,
            });
            console.log(`data added by ${user.email}`);
            setTitle('');
            setUploader('');
            setDescription('');
            setCategory('Lost');
        } else {
            console.log("No user logged in");
            alert("Hey u hacker tryna play w me ?");
        }
    };

     useEffect(() => {
        const fetchUserData = async () => {
          try {
            const user = auth.currentUser;
            if (!user) {
              router.replace("/");
              return;
            }
    
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            
            const displayName = user.displayName
            setUploader(displayName || "Anonymous User");
            
          } catch (error) {
            console.error("Error fetching user data:", error);
          } 
        };
    
        fetchUserData();
      }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1">
                <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                        <View style={styles.formContainer}>
                            <Text style={styles.heading}>Add Lost or Found Item</Text>

                            <Text style={styles.label}>Item Title</Text>
                            <TextInput
                                style={styles.input}
                                value={Title}
                                onChangeText={setTitle}
                                placeholder="e.g. Blue bottle"
                                placeholderTextColor="#94a3b8"
                            />

                            <Text style={styles.label}>Category</Text>
                            <View style={styles.radioGroup}>
                                {['Lost', 'Found'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[styles.radioOption, Category === option && styles.selectedOption]}
                                        onPress={() => setCategory(option as 'Lost' | 'Found')}
                                    >
                                        <Text style={[styles.radioText, Category === option && styles.selectedText]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                                value={Description}
                                onChangeText={setDescription}
                                multiline
                                placeholder="Where was the item lost/found, description."
                                placeholderTextColor="#94a3b8"
                            />

                            <TouchableOpacity style={styles.button} onPress={addData}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Icon name="send" size={20} color="#fff" />
                                    <Text style={styles.buttonText}>Submit Request</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default NewRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#0f172a',
    },
    formContainer: {
        backgroundColor: '#1e293b',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
        maxWidth: '100%',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: '600',
        color: '#f1f5f9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#334155',
        padding: 12,
        borderRadius: 12,
        fontSize: 15,
        marginBottom: 18,
        backgroundColor: '#1e293b',
        color: '#f1f5f9',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
        justifyContent: 'center',

    },
    radioOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
        backgroundColor: '#1e293b',
        borderStyle: 'solid',
        borderColor: 'white',
    },
    selectedOption: {
        backgroundColor: '#3b82f6',
    },
    radioText: {
        color: '#f1f5f9',
        fontWeight: '500',
    },
    selectedText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
