import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const PersonalInfo = () => {
    return (
        <View style={styles.wrapper}>
            {/* Section title */}
            <Text style={styles.sectionHeading}>Your Personal Information</Text>
            <Text style={styles.sectionSub}>
                Enter loan details and scheme information.
            </Text>

            {/* Loan Application Information */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Loan Application Information</Text>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Loan Scheme *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select loan scheme</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Loan Purpose *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Select purpose"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="text"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Center *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select center</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Leader Name</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select leader</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Assistant Leader Name</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select assistant</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Responsible Staff</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select staff</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Borrower Name *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select borrower</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Amount *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.field, { flex: 1 }]}>
                        <Text style={styles.label}>Upload Application Form *</Text>
                        <TouchableOpacity style={styles.uploadBtn}>
                            <Text style={styles.uploadText}>Choose file</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Loan Scheme Details */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Loan Scheme Details</Text>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Interest Rate (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 21.00</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Total EMI Number</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 52</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Pre-Closing Discount (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 1.00</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Collection Period</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select period</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Holiday Exclude</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>Yes / No</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>GST Charge (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 0.00</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>File Charge (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 1.00</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Insurance Type</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select insurance</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Single Party Insurance (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 1.00</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Double Party Insurance (%)</Text>
                        <View style={styles.selectBox}>
                            <Text style={styles.placeholder}>e.g. 2.00</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PersonalInfo;

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 12,
    },
    sectionHeading: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    sectionSub: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 10,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    field: {
        flex: 1,
        marginRight: 8,
    },
    label: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 4,
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
    uploadBtn: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3faf5',
    },
    uploadText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '600',
    },
});