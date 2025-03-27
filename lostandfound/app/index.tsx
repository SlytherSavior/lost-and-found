import { View, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView>
            <Text>dfafasd</Text>
        </SafeAreaView>
    )
}

export default index; 
