import { auth, db } from '@/firebaseConfig';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

interface UserProfileData {
  displayName: string;
  bio: string;
  email?: string;
}

export function Record({ record }: any) {
  const [profileVisible, setProfileVisible] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const user = auth.currentUser;
  
  const fetchUserProfile = async () => {
    if (record.data.userId === user?.uid || (profileData && !error)) {
      setProfileVisible(true);
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const userRef = doc(db, "users", record.data.userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        setProfileData({
          displayName: userDoc.data().displayName || record.data.Uploader,
            bio: userDoc.data().bio || "No contact information provided",
            email: userDoc.data().email
        });
      } else {
        setProfileData({
          displayName: record.data.Uploader,
          bio: "No contact information available",
          email: "No email information available"
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Couldn't load user profile");
    } finally {
      setLoading(false);
      setProfileVisible(true);
    }
  };
  const getCurrentUserProfile = () => {
    return {
      displayName: user?.displayName || "You",
      bio: "This is your post. Your contact info is visible to others."
    };
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{record.data.Title}</Text>
        <Text style={styles.category}>{record.data.Category}</Text>
      </View>
      
      <Text style={styles.description}>{record.data.Description}</Text>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={fetchUserProfile}>
          <Text style={styles.uploaderLink}>
            {record.data.userId === user?.uid 
              ? `You (${record.data.Uploader})` 
              : record.data.Uploader}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileVisible}
        onRequestClose={() => setProfileVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setProfileVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Uploader Information</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setProfileVisible(false)}
              >
                <AntDesign name="close" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
            
            {loading ? (
              <ActivityIndicator size="large" color="#3b82f6" />
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : (
              <View style={styles.profileInfo}>
                <View style={styles.profileHeader}>
                  <View style={styles.profileAvatar}>
                    <Text style={styles.avatarText}>
                      {record.data.userId === user?.uid 
                        ? (user?.displayName?.[0] || "Y").toUpperCase()
                        : (profileData?.displayName?.[0] || "U").toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.profileName}>
                    {record.data.userId === user?.uid 
                      ? getCurrentUserProfile().displayName 
                      : profileData?.displayName}
                  </Text>
                </View>
                
                <View style={styles.bioContainer}>
                  <Text style={styles.bioLabel}>Contact Info:</Text>
                  <Text style={styles.bioText}>
                    {record.data.userId === user?.uid 
                      ? getCurrentUserProfile().bio 
                      : profileData?.bio}
                                          </Text>
                                          </View>
                <View style={styles.bioContainer}>
                 <Text style={styles.bioLabel}>Email:</Text>
                  <Text style={styles.bioText}>
                    {record.data.userId === user?.uid 
                      ? "Your school email is visible to others."
                      : profileData?.email || "No email provided"}
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    marginVertical: 10,
    alignSelf: 'center',
    width: screenWidth - 32,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f1f5f9',
    flexShrink: 1,
    marginRight: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 8,
  },
  uploader: {
    fontSize: 12,
    color: '#94a3b8',
  },
  uploaderLink: {
    fontSize: 12,
    color: '#60a5fa', 
    
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  closeButton: {
    padding: 4,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
  },
  bioContainer: {
    width: '100%',
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 15,
    color: '#e2e8f0',
    lineHeight: 22,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#450a0a',
    borderRadius: 8,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    textAlign: 'center',
  },
});
