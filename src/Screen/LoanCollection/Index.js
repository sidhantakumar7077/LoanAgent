import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
    danger: '#ef4444',
};

const Index = () => {

    const navigation = useNavigation();
    const [cif, setCif] = useState('');
    const [loanAccount, setLoanAccount] = useState('');
    const [queueNo, setQueueNo] = useState('Q03-16');
    const [date, setDate] = useState('2025-09-22');
    const [txnMode, setTxnMode] = useState('Transfer');
    const [narration, setNarration] = useState('By Transfer');

    const [drAccType, setDrAccType] = useState('');
    const [drAccNo, setDrAccNo] = useState('');
    const [drName, setDrName] = useState('');
    const [drCif, setDrCif] = useState('');
    const [drBalance, setDrBalance] = useState('');

    const regenerateQueue = () => {
        // dummy example – you will replace with API call later
        const rand = Math.floor(Math.random() * 90) + 10;
        setQueueNo(`Q03-${rand}`);
    };

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
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.appName}>Loan Collection</Text>
                        <Text style={styles.appSubtitle}>Demo01 Branch</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* BODY */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* TRANSACTION DETAILS CARD */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Transaction Details</Text>
                    <Text style={styles.cardSub}>
                        Enter basic details for this loan collection voucher.
                    </Text>

                    {/* CIF + Loan Account + Queue */}
                    <View style={styles.row}>
                        <View style={[styles.field, { flex: 1.2 }]}>
                            <Text style={styles.label}>CIF *</Text>
                            <View style={styles.inputWithButton}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="Enter CIF"
                                    placeholderTextColor={COLORS.textLight}
                                    value={cif}
                                    onChangeText={setCif}
                                />
                                <TouchableOpacity style={styles.smallActionBtn}>
                                    <Text style={styles.smallActionText}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.field, { flex: 1.1 }]}>
                            <Text style={styles.label}>Loan Account *</Text>
                            <TouchableOpacity style={styles.selectBox}>
                                <Text style={styles.placeholder}>
                                    {loanAccount || 'Select Account ▾'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.field, { flex: 0.9 }]}>
                            <Text style={styles.label}>Queue No. *</Text>
                            <View style={styles.queueRow}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    value={queueNo}
                                    editable={false}
                                />
                                <TouchableOpacity
                                    style={styles.queueRefresh}
                                    onPress={regenerateQueue}
                                >
                                    <MaterialIcons
                                        name="refresh"
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.field, { flex: 1.1 }]}>
                            <Text style={styles.label}>Date *</Text>
                            <TextInput
                                style={styles.input}
                                value={date}
                                onChangeText={setDate}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={COLORS.textLight}
                            />
                        </View>

                        <View style={[styles.field, { flex: 1.1 }]}>
                            <Text style={styles.label}>Transaction Mode *</Text>
                            <TouchableOpacity style={styles.selectBox}>
                                <Text style={styles.placeholder}>
                                    {txnMode || 'Select Mode ▾'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Narration */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Narration</Text>
                        <TextInput
                            style={[styles.input, styles.multiline]}
                            multiline
                            value={narration}
                            onChangeText={setNarration}
                            placeholder="Enter narration"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                </View>

                {/* DR DETAILS CARD */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dr Account Details</Text>
                    <Text style={styles.cardSub}>
                        Select the debit account from which the amount will be collected.
                    </Text>

                    {/* Account Type */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Account Type *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>
                                {drAccType || 'Select Account ▾'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Account No + Search */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Account No. *</Text>
                        <View style={styles.inputWithButton}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Enter account no."
                                placeholderTextColor={COLORS.textLight}
                                value={drAccNo}
                                onChangeText={setDrAccNo}
                            />
                            <TouchableOpacity style={styles.smallActionBtn}>
                                <Text style={styles.smallActionText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name / CIF / Balance */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.readOnlyBox}>
                            <Text
                                style={styles.readOnlyText}
                                numberOfLines={1}
                            >
                                {drName || '—'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.field, { flex: 1 }]}>
                            <Text style={styles.label}>CIF</Text>
                            <View style={styles.readOnlyBox}>
                                <Text style={styles.readOnlyText}>{drCif || '—'}</Text>
                            </View>
                        </View>

                        <View style={[styles.field, { flex: 1 }]}>
                            <Text style={styles.label}>Balance</Text>
                            <View style={styles.readOnlyBox}>
                                <Text style={styles.readOnlyText}>
                                    {drBalance ? `₹ ${drBalance}` : '₹ 0.00'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ACTION BUTTONS */}
                <View style={styles.footerRow}>
                    <TouchableOpacity style={styles.saveBtnFooter}>
                        <MaterialIcons
                            name="save"
                            size={18}
                            color="#fff"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.saveBtnFooterText}>Save Voucher</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },

    header: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        marginRight: 8,
        padding: 4,
    },
    appName: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    appSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 11,
        marginTop: 2,
    },

    content: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
    },

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 2,
    },
    cardSub: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
    },
    field: {
        marginBottom: 10,
        marginRight: 8,
    },
    label: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 3,
    },
    input: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        backgroundColor: '#f9fafb',
        fontSize: 13,
        color: COLORS.textDark,
    },
    multiline: {
        height: 70,
        textAlignVertical: 'top',
    },

    selectBox: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
    },
    placeholder: {
        fontSize: 13,
        color: COLORS.textLight,
    },

    inputWithButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallActionBtn: {
        height: 38,
        paddingHorizontal: 12,
        marginLeft: 6,
        borderRadius: 10,
        backgroundColor: '#51b05e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallActionText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },

    queueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    queueRefresh: {
        marginLeft: 6,
        width: 36,
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: '#e0f2fe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    readOnlyBox: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },
    readOnlyText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    footerRow: {
        marginTop: 18,
    },
    saveBtnFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 999,
        backgroundColor: COLORS.primary,
    },
    saveBtnFooterText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '700',
    },
});