// src/Screen/AddLoan/GuarantorDetails.js
import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const GuarantorDetails = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionHeading}>Guarantor Information</Text>
            <Text style={styles.sectionSub}>
                Enter guarantor personal and financial details.
            </Text>

            {/* PROFILE CARD */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Guarantor Profile</Text>
                <Text style={styles.cardSub}>Basic information of the guarantor.</Text>

                {/* Name rows */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Title *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Mr</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>First Name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Middle Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Middle name"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Last Name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last name"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                </View>

                {/* EMAIL – full row */}
                <View style={styles.row}>
                    <View style={styles.fullField}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="email-address"
                        />
                    </View>
                </View>

                {/* PHONE ROWS – country code + number in one row */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Phone Number *</Text>
                        <View style={styles.phoneRow}>
                            <TouchableOpacity style={styles.countryBox}>
                                <Text style={styles.countryText}>India(+91)</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Enter phone"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Alternate Phone</Text>
                        <View style={styles.phoneRow}>
                            <TouchableOpacity style={styles.countryBox}>
                                <Text style={styles.countryText}>India(+91)</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Alternate phone"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </View>

                {/* Relation + DOB */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Relation With Guarantor *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select relation</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Date of Birth *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>DD/MM/YYYY</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Age + Gender */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Age *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Age"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Gender *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Male</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Marital + Religion */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Marital Status *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select status</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Religion *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select religion</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Caste + Residence */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Caste *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select caste</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Residence *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select residence</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Residence years + Occupation */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Residence Years *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Years"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Occupation *</Text>
                        <TouchableOpacity style={styles.selectBox}>
                            <Text style={styles.placeholder}>Select occupation</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Address – full width */}
                <View style={styles.fullField}>
                    <Text style={styles.label}>Address *</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        placeholder="House no, street, village, post, district"
                        placeholderTextColor={COLORS.textLight}
                        multiline
                    />
                </View>
            </View>

            {/* FINANCIAL CARD */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Financial & Identity Details</Text>
                <Text style={styles.cardSub}>
                    Income information and government ID numbers.
                </Text>

                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={styles.label}>Family Monthly Income *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Income"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.halfField}>
                        <Text style={styles.label}>Family Monthly Expense *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Expense"
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.fullField}>
                        <Text style={styles.label}>Aadhar Card No. *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Aadhar no."
                            placeholderTextColor={COLORS.textLight}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.fullField}>
                        <Text style={styles.label}>Voter Card No.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Voter card no."
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.fullField}>
                        <Text style={styles.label}>PAN No.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter PAN"
                            placeholderTextColor={COLORS.textLight}
                            autoCapitalize="characters"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default GuarantorDetails;

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
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
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
        marginBottom: 2,
    },
    cardSub: {
        fontSize: 11,
        color: COLORS.textLight,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    halfField: {
        flex: 1,
        marginRight: 8,
    },
    fullField: {
        flex: 1,
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
        marginTop: 2,
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

    /* phone with country code */
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryBox: {
        width: 100,
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 8,
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
    },
    countryText: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    phoneInput: {
        flex: 1,
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        backgroundColor: '#f9fafb',
        fontSize: 13,
        color: COLORS.textDark,
        marginLeft: 6,
    },
});