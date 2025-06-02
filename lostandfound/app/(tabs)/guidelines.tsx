import { Text, SafeAreaView, View, ScrollView } from 'react-native';
import React from 'react';

const Guidelines = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
                className="py-8 px-5"
            >
                <View className="bg-surface rounded-3xl p-6 w-full max-w-xl shadow-lg border border-border">
                    <Text className="text-3xl font-extrabold text-primary text-center mb-3">
                        📚 Guidelines
                    </Text>

                    <Text className="text-base text-muted text-center mb-6">
                        Please read these instructions before submitting a request for a Lost or Found item.
                    </Text>

                    <View className="h-0.5 bg-border mb-6 w-full" />

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">🔐 Profile Setup Required:</Text> You must first complete your profile setup by adding your <Text className="italic">username</Text> and <Text className="italic">contact information</Text> in the profile section. Without this, you will not be able to publish a request.
                    </Text>

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">📧 Email Visibility:</Text> The email used to sign up will be visible to others when you publish a request. For privacy and verification, only sign up using your official <Text className="italic">school email</Text>.
                    </Text>

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">🏷 Labeling:</Text> Tag the request post correctly:
                        {'\n'}• <Text className="italic text-muted">"Lost"</Text> — if the item is missing.
                        {'\n'}• <Text className="italic text-muted">"Found"</Text> — if you found an item with unknown owner.
                    </Text>

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">✅ Resolution Status:</Text> From the requests tab, select any requests that are resolved and mark them accordingly.
                    </Text>

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">📝 Description Details:</Text> Include:
                        {'\n'}• Location it was lost/found.
                        {'\n'}• Where it is now.
                        {'\n'}• How to reach you (email or phone).
                    </Text>

                    <Text className="text-base text-text mb-5 leading-7">
                        <Text className="font-bold text-primary">🔍 Accuracy:</Text> Be specific and truthful.
                    </Text>

                    <Text className="text-base text-text leading-7 mb-5">
                        <Text className="font-bold text-primary">📞 Contact:</Text> Make sure your contact details are reachable.
                    </Text>

                    <Text className="text-base text-text leading-7">
                        <Text className="font-bold text-primary">❌ Fake Info:</Text> Any fake information or unethical descriptions will lead to the uploader facing strict consequences from the school administration.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Guidelines;
