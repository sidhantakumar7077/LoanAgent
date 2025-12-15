// src/Screen/AddLoan/Index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import PersonalInfo from './PersonalInfo';
import GuarantorDetails from './GuarantorDetails';
import KYCDetails from './KYCDetails';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const STEPS = [
    { key: 'personal', label: 'Personal Info', icon: 'person' },
    { key: 'guarantor', label: 'Guarantor Details', icon: 'groups' },
    { key: 'kyc', label: 'KYC Details', icon: 'badge' },
];

const Index = () => {
    const navigation = useNavigation();
    const [activeStep, setActiveStep] = useState(0);

    const goNext = () => {
        if (activeStep < STEPS.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            // Final save – you can call API here
            // For now just go back or show a success toast
            navigation.goBack();
        }
    };

    const goPrev = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        } else {
            navigation.goBack();
        }
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <PersonalInfo />;
            case 1:
                return <GuarantorDetails />;
            case 2:
                return <KYCDetails />;
            default:
                return <PersonalInfo />;
        }
    };

    const primaryButtonLabel =
        activeStep === STEPS.length - 1 ? 'Final Save' : 'Save & Next';

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            {/* HEADER */}
            <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        activeOpacity={0.8}
                    >
                        <MaterialIcons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Add Loan Application</Text>
                        <Text style={styles.headerSub}>Agent360 • Demo01</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* STEP INDICATOR */}
            <View style={styles.stepperWrapper}>
                <View style={styles.stepperLine} />
                <View style={styles.stepperRow}>
                    {STEPS.map((step, index) => {
                        const isDone = index < activeStep;
                        const isActive = index === activeStep;

                        return (
                            <View key={step.key} style={styles.stepItem}>
                                <View
                                    style={[
                                        styles.stepCircle,
                                        isDone && styles.stepCircleDone,
                                        isActive && styles.stepCircleActive,
                                    ]}
                                >
                                    {isDone ? (
                                        <MaterialIcons
                                            name="check"
                                            size={18}
                                            color="#fff"
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name={step.icon}
                                            size={18}
                                            color={isActive ? '#fff' : COLORS.primary}
                                        />
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.stepLabel,
                                        (isDone || isActive) && styles.stepLabelActive,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {step.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* CONTENT */}
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
            >
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderStepContent()}
                </ScrollView>

                {/* BOTTOM ACTION BAR */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.footerBtn, styles.secondaryBtn]}
                        onPress={goPrev}
                        activeOpacity={0.85}
                    >
                        <MaterialIcons
                            name={activeStep === 0 ? 'close' : 'chevron-left'}
                            size={18}
                            color={COLORS.textDark}
                        />
                        <Text style={styles.secondaryBtnText}>
                            {activeStep === 0 ? 'Cancel' : 'Previous'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={goNext}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.primaryBtnGradient}
                        >
                            <Text style={styles.primaryBtnText}>{primaryButtonLabel}</Text>
                            <MaterialIcons
                                name={activeStep === STEPS.length - 1 ? 'check' : 'chevron-right'}
                                size={18}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    flex: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    headerSub: {
        color: 'rgba(255,255,255,0.88)',
        fontSize: 11,
        marginTop: 2,
    },

    stepperWrapper: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    stepperLine: {
        position: 'absolute',
        left: 32,
        right: 32,
        top: 32,
        height: 2,
        backgroundColor: '#e5efe8',
    },
    stepperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepItem: {
        alignItems: 'center',
        width: '33%',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor: '#f1faf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    stepCircleActive: {
        backgroundColor: COLORS.primary,
    },
    stepCircleDone: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    stepLabel: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    stepLabelActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },

    content: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
    },

    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(245,247,251,0.98)',
        borderTopWidth: 1,
        borderTopColor: '#dde3ea',
    },
    footerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
    },
    secondaryBtn: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    secondaryBtnText: {
        marginLeft: 4,
        fontSize: 13,
        color: COLORS.textDark,
        fontWeight: '500',
    },
    primaryBtn: {
        flex: 1,
        marginLeft: 10,
    },
    primaryBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        paddingVertical: 10,
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        marginRight: 4,
    },
});