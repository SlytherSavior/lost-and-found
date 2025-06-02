import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, 
  Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Icon from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { doc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';

const NewRequest = () => {
    const [Title, setTitle] = useState('');
    const [Uploader, setUploader] = useState('');
    const [Description, setDescription] = useState('');
    const [Category, setCategory] = useState<'Lost' | 'Found'>('Lost');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const user = auth.currentUser;
    const collecData = collection(db, "Data");
    const [loading, setLoading] = useState(true);
    const [uploaderBio, setUploaderBio] = useState('');

    const isFormValid = () => {
        return Title.trim() !== '' && Description.trim() !== '';
    };

    const addData = async () => {
        if (!isFormValid()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            if (user) {
                await addDoc(collecData, {
                    Title,
                    Uploader,
                    Category,
                    Description,
                    Status: false,
                    userId: user?.uid,
                });
                
                setTitle('');
                setDescription('');
                setCategory('Lost');
                
                Alert.alert(
                    "Success", 
                    "Your request has been submitted successfully!",
                    [
                        { 
                            text: "OK", 
                            onPress: () => console.log("OK Pressed") 
                        }
                    ]
                );
            } else {
                console.log("No user logged in");
                Alert.alert("Error", "You must be logged in to submit a request");
            }
        } catch (error) {
            console.error("Error adding document:", error);
            Alert.alert(
                "Error",
                "Something went wrong. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
      const user = auth.currentUser;
      if (!user) {
        router.replace("/");
        return;
      }
    
      const userRef = doc(db, "users", user.uid);
    
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
            setUploader(userData.displayName);
            setUploaderBio(userData.bio);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error listening to user doc:", error);
        setLoading(false);
      });
    
      return () => unsubscribe(); 
    }, []);
    
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2563eb" />
            </SafeAreaView>
        );
    }
    
    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: '#f1f5f9', textAlign: 'center' }}>You must be logged in to add a request.</Text>
            </SafeAreaView>
        );
    }

    if (Uploader === '' || uploaderBio === '') {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: '#f1f5f9', textAlign: 'center' }}>Please set a Username and Contact Information for yourself to publish a request.</Text>
            </SafeAreaView>
        );
    }

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
                                editable={!isSubmitting}
                            />

                            <Text style={styles.label}>Category</Text>
                            <View style={styles.radioGroup}>
                                {['Lost', 'Found'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.radioOption, 
                                            Category === option && styles.selectedOption,
                                            isSubmitting && styles.disabledOption
                                        ]}
                                        onPress={() => !isSubmitting && setCategory(option as 'Lost' | 'Found')}
                                        disabled={isSubmitting}
                                    >
                                        <Text style={[
                                            styles.radioText, 
                                            Category === option && styles.selectedText,
                                            isSubmitting && styles.disabledText
                                        ]}>
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
                                editable={!isSubmitting}
                            />

                            <TouchableOpacity 
                                style={[
                                    styles.button, 
                                    (!isFormValid() || isSubmitting) && styles.buttonDisabled
                                ]} 
                                onPress={addData}
                                disabled={!isFormValid() || isSubmitting}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    {isSubmitting ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Icon name="send" size={20} color="#fff" />
                                    )}
                                    <Text style={styles.buttonText}>
                                        {isSubmitting ? "Submitting..." : "Submit Request"}
                                    </Text>
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
    disabledOption: {
        opacity: 0.6,
    },
    radioText: {
        color: '#f1f5f9',
        fontWeight: '500',
    },
    selectedText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    disabledText: {
        color: '#94a3b8',
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
    buttonDisabled: {
        backgroundColor: '#64748b',
        shadowOpacity: 0.1,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
