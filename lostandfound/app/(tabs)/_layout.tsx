import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1e293b',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="guidelines"
                options={{
                    title: "Guidelines",
                    tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="NewReq"
                options={{
                    title: "New Request",
                    tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={23} color={color} />,
                }}
            />
            <Tabs.Screen
                name="UserReq"
                options={{
                    title: "Your Requests",
                    tabBarIcon: ({ color }) => <MaterialIcons name="history" size={29} color={color} />,
                }}
            />
        </Tabs>
    )
}

export default _layout;
