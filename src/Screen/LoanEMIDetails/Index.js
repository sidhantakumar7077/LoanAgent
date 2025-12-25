// src/Screen/LoanDetails/Index.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const loanSummary = {
    borrowerName: 'Mr. Sukumar Bag',
    borrowerCode: 'RJ0202000001',
    cif: 'RJ0202000001',
    loanCode: 'PLD020017',
    loanStatus: 'Running',
    totalSanction: '₹ 5,000.00',
    repaymentAmount: '₹ 5,373.00',
    repaidAmount: '₹ 672.00',
    insuranceCharge: '₹ 150.00',
    processingFees: '₹ 100.00',
    overdue: '₹ 0.00',
};

const emiList = [
    {
        id: 1,
        emiDate: '2019-11-23',
        principal: '195.00',
        interest: '29.00',
        emiAmount: '224.00',
        overdue: '0.00',
        discount: '0.00',
        paymentDate: '2019-11-22',
        status: 'Paid',
    },
    {
        id: 2,
        emiDate: '2019-12-23',
        principal: '196.00',
        interest: '28.00',
        emiAmount: '224.00',
        overdue: '0.00',
        discount: '0.00',
        paymentDate: '2019-11-22',
        status: 'Paid',
    },
    {
        id: 3,
        emiDate: '2020-01-23',
        principal: '197.00',
        interest: '27.00',
        emiAmount: '224.00',
        overdue: '0.00',
        discount: '0.00',
        paymentDate: '',
        status: 'Pending',
    },
    {
        id: 4,
        emiDate: '2020-02-23',
        principal: '198.00',
        interest: '26.00',
        emiAmount: '224.00',
        overdue: '0.00',
        discount: '0.00',
        paymentDate: '',
        status: 'Pending',
    },
];

const statusChipStyles = {
    Paid: { bg: '#dcfce7', text: '#166534' },
    Pending: { bg: '#fee2e2', text: '#b91c1c' },
};

// Keep strip sizing in ONE place so header + rows never drift.
const STRIP_WIDTH = 4;
const STRIP_GAP = 10; // space between strip and first column
const STRIP_SPACER = STRIP_WIDTH + STRIP_GAP;

const Index = () => {
    const navigation = useNavigation();
    const [expandedId, setExpandedId] = useState(null);

    const toggleRow = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            {/* HEADER – back + title only */}
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
                        <Text style={styles.appName}>Loan EMI Details</Text>
                        <Text style={styles.appSubtitle}>Demo01 Branch</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* BODY */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* SUMMARY SECTION */}
                <View style={styles.summaryCard}>
                    {/* top: avatar + name + loan code */}
                    <View style={styles.summaryTopRow}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatarCircle}>
                                <Image
                                    source={{
                                        uri: 'https://ui-avatars.com/api/?name=S+B&background=51b05e&color=fff',
                                    }}
                                    style={styles.avatarImg}
                                />
                            </View>
                            <View>
                                <Text style={styles.borrowerName}>{loanSummary.borrowerName}</Text>
                                <Text style={styles.borrowerCode}>{loanSummary.borrowerCode}</Text>
                            </View>
                        </View>

                        <View style={styles.loanCodeChip}>
                            <Text style={styles.loanCodeLabel}>Loan Code</Text>
                            <Text style={styles.loanCodeValue}>{loanSummary.loanCode}</Text>
                        </View>
                    </View>

                    {/* KPI chips */}
                    <View style={styles.kpiRow}>
                        <View style={[styles.kpiChip, { backgroundColor: '#ecfdf3', marginRight: 8 }]}>
                            <Text style={styles.kpiLabel}>Sanction</Text>
                            <Text style={styles.kpiValue}>{loanSummary.totalSanction}</Text>
                        </View>
                        <View style={[styles.kpiChip, { backgroundColor: '#e0f2fe' }]}>
                            <Text style={styles.kpiLabel}>Repayment</Text>
                            <Text style={styles.kpiValue}>{loanSummary.repaymentAmount}</Text>
                        </View>
                    </View>

                    <View style={styles.kpiRow}>
                        <View style={[styles.kpiChip, { backgroundColor: '#fef3c7', marginRight: 8 }]}>
                            <Text style={styles.kpiLabel}>Repaid</Text>
                            <Text style={styles.kpiValue}>{loanSummary.repaidAmount}</Text>
                        </View>
                        <View style={[styles.kpiChip, { backgroundColor: '#fee2e2' }]}>
                            <Text style={styles.kpiLabel}>Overdue</Text>
                            <Text style={[styles.kpiValue, { color: '#b91c1c' }]}>{loanSummary.overdue}</Text>
                        </View>
                    </View>

                    {/* detail grid */}
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailsCol}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>CIF</Text>
                                <Text style={styles.detailValue}>{loanSummary.cif}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Loan Status</Text>
                                <Text style={styles.detailValue}>{loanSummary.loanStatus}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Insurance Charge</Text>
                                <Text style={styles.detailValue}>{loanSummary.insuranceCharge}</Text>
                            </View>
                        </View>

                        <View style={styles.detailsCol}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Repayment Amount</Text>
                                <Text style={styles.detailValue}>{loanSummary.repaymentAmount}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Processing Fees</Text>
                                <Text style={styles.detailValue}>{loanSummary.processingFees}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* EMI SECTION */}
                <View style={styles.emiSectionHeader}>
                    <Text style={styles.sectionTitle}>EMI Schedule</Text>
                    <Text style={styles.sectionSub}>Tap a row to view breakup of this instalment.</Text>
                </View>

                <View style={styles.emiTableCard}>
                    {/* TABLE HEADER (alignment guaranteed via shared column wrappers) */}
                    <View style={styles.tableHeader}>
                        <View style={[styles.stripSpacer, { width: STRIP_SPACER }]} />
                        <View style={[styles.colSl, styles.cellCenter]}>
                            <Text style={styles.headerText}>SL</Text>
                        </View>
                        <View style={[styles.colDate, styles.cellLeft]}>
                            <Text style={styles.headerText}>Date</Text>
                        </View>
                        <View style={[styles.colAmount, styles.cellRight]}>
                            <Text style={[styles.headerText, styles.textRight]}>EMI Amount</Text>
                        </View>
                        <View style={[styles.colStatus, styles.cellLeft]}>
                            <Text style={styles.headerText}>Status</Text>
                        </View>
                        <View style={[styles.colArrow, styles.cellRight]}>
                            <Text style={styles.headerText} />
                        </View>
                    </View>

                    {/* ROWS */}
                    {emiList.map((item, index) => {
                        const isExpanded = expandedId === item.id;
                        const chip = statusChipStyles[item.status] || statusChipStyles.Pending;

                        return (
                            <View key={item.id} style={styles.rowCard}>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={styles.tableRow}
                                    onPress={() => toggleRow(item.id)}
                                >
                                    {/* left colored strip */}
                                    <View style={[styles.statusStrip, { backgroundColor: chip.text }]} />

                                    <View style={[styles.colSl, styles.cellCenter]}>
                                        <Text style={styles.bodyText}>{index + 1}</Text>
                                    </View>

                                    <View style={[styles.colDate, styles.cellLeft]}>
                                        <Text style={styles.bodyText} numberOfLines={1}>
                                            {item.emiDate}
                                        </Text>
                                    </View>

                                    <View style={[styles.colAmount, styles.cellRight]}>
                                        <View style={styles.amountPill}>
                                            <MaterialIcons name="currency-rupee" size={13} color="#111827" />
                                            <Text style={styles.amountPillText}>{item.emiAmount}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.colStatus, styles.cellLeft]}>
                                        <View style={[styles.statusChip, { backgroundColor: chip.bg }]}>
                                            <View style={[styles.statusDot, { backgroundColor: chip.text }]} />
                                            <Text style={[styles.statusChipText, { color: chip.text }]}>{item.status}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.colArrow, styles.cellRight]}>
                                        <MaterialIcons
                                            name={isExpanded ? 'expand-less' : 'expand-more'}
                                            size={22}
                                            color={COLORS.textLight}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/* COLLAPSIBLE DETAILS */}
                                {isExpanded && (
                                    <View style={styles.emiDetailsBox}>
                                        <View style={styles.detailChipRow}>
                                            <View style={styles.detailChip}>
                                                <Text style={styles.detailChipLabel}>Principal</Text>
                                                <Text style={styles.detailChipValue}>₹ {item.principal}</Text>
                                            </View>

                                            <View style={[styles.detailChip, { marginRight: 0 }]}>
                                                <Text style={styles.detailChipLabel}>Interest</Text>
                                                <Text style={styles.detailChipValue}>₹ {item.interest}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.detailChipRow}>
                                            <View style={styles.detailChip}>
                                                <Text style={styles.detailChipLabel}>OD Discount</Text>
                                                <Text style={styles.detailChipValue}>₹ {item.discount}</Text>
                                            </View>

                                            <View style={[styles.detailChip, { marginRight: 0 }]}>
                                                <Text style={styles.detailChipLabel}>Overdue</Text>
                                                <Text style={styles.detailChipValue}>₹ {item.overdue}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.detailFooterRow}>
                                            <Text style={styles.detailFooterLabel}>Payment Date</Text>
                                            <Text style={styles.detailFooterValue}>{item.paymentDate || '--'}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    })}
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

    /* SUMMARY */
    summaryCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    summaryTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: COLORS.accent,
        marginRight: 10,
        overflow: 'hidden',
        backgroundColor: '#e5f7ee',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
    },
    borrowerName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    borrowerCode: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 2,
    },
    loanCodeChip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#ecfdf3',
        alignItems: 'flex-start',
    },
    loanCodeLabel: {
        fontSize: 10,
        color: COLORS.textLight,
    },
    loanCodeValue: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '700',
    },

    kpiRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    kpiChip: {
        flex: 1,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    kpiLabel: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    kpiValue: {
        fontSize: 13,
        color: COLORS.textDark,
        fontWeight: '700',
        marginTop: 2,
    },

    detailsGrid: {
        flexDirection: 'row',
        marginTop: 4,
    },
    detailsCol: {
        flex: 1,
        marginRight: 8,
    },
    detailItem: {
        paddingVertical: 3,
    },
    detailLabel: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    detailValue: {
        fontSize: 12,
        color: COLORS.textDark,
        fontWeight: '500',
    },

    /* EMI SECTION */
    emiSectionHeader: {
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    sectionSub: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 2,
    },

    emiTableCard: {
        marginTop: 4,
        marginBottom: 12,
    },

    /* Shared column sizing (used by both header + rows) */
    colSl: { width: 25 },
    colDate: { flex: 1.2 },
    colAmount: { flex: 1.0 },
    colStatus: { flex: 0.95 },
    colArrow: { width: 26 },

    /* Header row */
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef2f7',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    stripSpacer: {
        height: 1,
    },
    headerText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4b5563',
        letterSpacing: 0.3,
    },
    textRight: {
        textAlign: 'right',
    },

    /* Row card */
    rowCard: {
        marginTop: 10,
        borderRadius: 14,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        overflow: 'hidden',
    },

    /* Row layout (table-like) */
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        minHeight: 52, // consistent row height = better alignment
    },
    statusStrip: {
        width: STRIP_WIDTH,
        alignSelf: 'stretch',
        borderRadius: 4,
        marginRight: STRIP_GAP,
    },

    /* Cell alignment helpers */
    cellLeft: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    bodyText: {
        fontSize: 12,
        color: COLORS.textDark,
        fontWeight: '500',
    },

    amountPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4ff',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    amountPillText: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '700',
        marginLeft: 2,
    },

    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusChipText: {
        fontSize: 11,
        fontWeight: '800',
    },

    emiDetailsBox: {
        backgroundColor: '#f9fafb',
        borderTopWidth: 1,
        borderTopColor: '#edf0f6',
        paddingHorizontal: 12,
        paddingBottom: 10,
        paddingTop: 10,
    },
    detailChipRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailChip: {
        flex: 1,
        marginRight: 8,
        borderRadius: 10,
        backgroundColor: '#eef2ff',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    detailChipLabel: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '600',
    },
    detailChipValue: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '800',
        marginTop: 3,
    },
    detailFooterRow: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailFooterLabel: {
        fontSize: 11,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    detailFooterValue: {
        fontSize: 12,
        color: COLORS.textDark,
        fontWeight: '700',
    },
});