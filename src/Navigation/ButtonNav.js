import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TABS = [
    { key: 'home', label: 'HOME', icon: (p) => <MaterialCommunityIcons name="home-outline" {...p} /> },
    { key: 'loans', label: 'LOANS', icon: (p) => <MaterialCommunityIcons name="file-document-outline" {...p} /> },
    { key: 'users', label: 'USERS', icon: (p) => <Feather name="users" {...p} /> },
    { key: 'profile', label: 'PROFILE', icon: (p) => <Ionicons name="person-outline" {...p} /> },
];

const ButtonNav = ({ activeTab = 'home', onTabPress = () => { } }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.navBar}>
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    const iconColor = isActive ? '#005f0dff' : '#555';
                    const textColor = isActive ? '#005f0dff' : '#777';

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tabButton, isActive && styles.tabActive]}
                            activeOpacity={0.8}
                            onPress={() => onTabPress(tab.key)}
                        >
                            {tab.icon({ size: 22, color: iconColor })}
                            <Text style={[styles.tabLabel, { color: textColor }]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default ButtonNav;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f1f3f6',
    },
    navBar: {
        height: 60,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', // ⭐ equal space between all menu items
        paddingBottom: Platform.OS === 'ios' ? 16 : 10,
        paddingTop: 8,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.09,
        shadowRadius: 6,
        elevation: 14,
        position: 'relative',
    },
    tabButton: {
        width: 72, // ⭐ fixed width so every tab looks same
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        borderRadius: 16,
    },
    tabActive: {
        backgroundColor: '#b3e9baff',
    },
    tabLabel: {
        marginTop: 2,
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.4,
    },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        top: -24,
        paddingHorizontal: 18,
        height: 52,
        borderRadius: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FF5A3C',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 16,
    },
    fabText: {
        color: '#fff',
        marginLeft: 6,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
});