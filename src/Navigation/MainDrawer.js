import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from '../../src/Screen/Home/Index';
import LoanRequest from '../../src/Screen/LoanRequest/Index';
import DisbursedLoan from '../../src/Screen/DisbursedLoan/Index';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    white: '#ffffff',
};

const Drawer = createDrawerNavigator();

// ---- Custom drawer content (drawer modal UI) ----
function CustomDrawerContent(props) {
    const { navigation, state } = props;
    const currentRoute = state.routeNames[state.index];

    const MenuItem = ({ label, routeName, icon }) => {
        const isActive = currentRoute === routeName;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(routeName)}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
            >
                <View style={styles.menuIconWrap}>
                    <Text style={styles.menuIcon}>{icon}</Text>
                </View>
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.drawerSafeArea} edges={['bottom']}>
            {/* Scrollable part (header + menu) */}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.drawerScroll}
            >
                {/* Drawer header */}
                <View style={styles.headerOuter}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.drawerHeader}
                    >
                        <View style={styles.avatarBig}>
                            <Text style={styles.avatarBigText}>A</Text>
                        </View>
                        <View>
                            <Text style={styles.userName}>Agent360</Text>
                            <Text style={styles.userSub}>Demo01 • Branch</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Menu items */}
                <View style={styles.menuWrapper}>
                    <MenuItem label="Home" routeName="Home" icon="🏠" />
                    <MenuItem label="Loan Request" routeName="LoanRequest" icon="📄" />
                    <MenuItem label="Disbursed Loan" routeName="DisbursedLoan" icon="💸" />
                    <MenuItem label="Collections" routeName="Collections" icon="📊" />
                    <MenuItem label="Settings" routeName="Settings" icon="⚙️" />
                </View>
            </DrawerContentScrollView>

            {/* Fixed footer / logout – sits above bottom safe area */}
            <View style={styles.logoutWrapper}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        // later: clear auth & go back to Login
                        navigation.closeDrawer();
                    }}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// ---- Dummy screens for menu items you haven’t built yet ----
const PlaceholderScreen = ({ title }) => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>{title}</Text>
        <Text style={styles.placeholderSub}>Screen coming soon</Text>
    </View>
);

export const Collections = () => <PlaceholderScreen title="Collections" />;
export const Settings = () => <PlaceholderScreen title="Settings" />;

// ---- Drawer navigator itself ----
const MainDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                overlayColor: 'rgba(0,0,0,0.45)',
                swipeEdgeWidth: 40,
                drawerStyle: {
                    width: '70%',
                    backgroundColor: COLORS.white,
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="LoanRequest" component={LoanRequest} />
            <Drawer.Screen name="DisbursedLoan" component={DisbursedLoan} />
            <Drawer.Screen name="Collections" component={Collections} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    );
};

export default MainDrawer;

const styles = StyleSheet.create({
    drawerSafeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    drawerScroll: {
        paddingBottom: 16,
    },

    // Header card
    headerOuter: {
        // paddingHorizontal: 16,
        // paddingTop: 8,
    },
    drawerHeader: {
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarBig: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
    },
    avatarBigText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '700',
    },
    userName: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '700',
    },
    userSub: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        marginTop: 4,
    },

    // Menu
    menuWrapper: {
        paddingHorizontal: 10,
        paddingTop: 18,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        // paddingHorizontal: 10,
        borderRadius: 12,
        marginBottom: 4,
    },
    menuItemActive: {
        backgroundColor: 'rgba(81,176,94,0.08)',
    },
    menuIconWrap: {
        width: 30,
        alignItems: 'center',
        marginRight: 6,
    },
    menuIcon: {
        fontSize: 18,
    },
    menuLabel: {
        fontSize: 14,
        color: COLORS.textDark,
        fontWeight: '500',
    },
    menuLabelActive: {
        color: COLORS.primary,
        fontWeight: '700',
    },

    // Logout
    logoutWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 14, // safe padding so it doesn't overlap nav bar
    },
    logoutButton: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#f5c8c8',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff7f7',
    },
    logoutText: {
        fontSize: 14,
        color: '#d9534f',
        fontWeight: '600',
    },

    // Placeholder screens
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    placeholderTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    placeholderSub: {
        fontSize: 14,
        color: COLORS.textLight,
    },
});