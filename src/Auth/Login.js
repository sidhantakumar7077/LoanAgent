// src/Auth/Login.js
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: '#51b05e',  // main green
    accent: '#2abc9d',   // teal
    background: '#f5f7fb',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    white: '#ffffff',
};

const Login = () => {

    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const passwordRef = useRef(null);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <View style={styles.container}>
                {/* Top gradient header (same style as before) */}
                <LinearGradient
                    colors={[COLORS.primary, COLORS.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <Text style={styles.headerSmall}>Welcome back 👋</Text>
                    <Text style={styles.headerTitle}>Log Into</Text>
                    <Text style={styles.headerTitle}>Your account</Text>
                </LinearGradient>

                {/* Body: card vertically centered & scrollable with keyboard */}
                <KeyboardAvoidingView
                    style={styles.body}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.bodyContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.card}>
                            {/* User ID */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>User ID</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder="Enter your User ID"
                                        placeholderTextColor={COLORS.textLight}
                                        value={userId}
                                        onChangeText={setUserId}
                                        style={styles.input}
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                    />
                                </View>
                            </View>

                            {/* Password */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        ref={passwordRef}
                                        placeholder="Password"
                                        placeholderTextColor={COLORS.textLight}
                                        secureTextEntry={secure}
                                        value={password}
                                        onChangeText={setPassword}
                                        style={styles.input}
                                        returnKeyType="done"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setSecure(!secure)}
                                        style={styles.eyeButton}
                                    >
                                        <Text style={styles.eyeText}>
                                            {secure ? 'Show' : 'Hide'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Register link */}
                            <View style={styles.rowBetween}>
                                <Text style={styles.helperText}>Don’t have any account?</Text>
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>Register</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login button – gradient */}
                            <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 26 }} onPress={() => navigation.navigate('MainDrawer')}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.accent]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.loginButton}
                                >
                                    <Text style={styles.loginText}>Login</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Forgot password */}
                            <TouchableOpacity style={styles.centeredLink}>
                                <Text style={styles.secondaryLink}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    // HEADER (unchanged)
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 60,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerSmall: {
        marginTop: 4,
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        marginBottom: 4,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: 26,
        fontWeight: '700',
        lineHeight: 30,
        letterSpacing: 0.3,
    },

    // BODY
    body: {
        flex: 1,
    },
    bodyContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 34,
        // 👇 this centers the card vertically in the remaining space
        justifyContent: 'center',
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 24,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },

    fieldGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        color: COLORS.textDark,
        marginBottom: 6,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dde2eb',
        paddingHorizontal: 14,
        backgroundColor: '#f9fafc',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textDark,
        paddingVertical: 12,
    },
    eyeButton: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    eyeText: {
        fontSize: 12,
        color: COLORS.accent,
        fontWeight: '600',
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    helperText: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    linkText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '700',
    },

    loginButton: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    loginText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },

    centeredLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    secondaryLink: {
        fontSize: 13,
        color: COLORS.textLight,
    },
});