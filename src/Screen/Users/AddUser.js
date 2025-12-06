import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const steps = ['Personal Info', 'Guardian Details', 'Address'];

const Field = ({ label, placeholder, value, onChangeText, flex = 1 }) => (
    <View style={[styles.field, { flex }]}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.inputWrapper}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={COLORS.textLight}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    </View>
);

const UserFormScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const mode = route.params?.mode || 'create'; // 'create' | 'edit'
    const editUser = route.params?.user || null;

    const [currentStep, setCurrentStep] = useState(0);

    const [form, setForm] = useState({
        // Personal
        title: 'Mr',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneCode: 'India(+91)',
        phone: '',
        altPhoneCode: 'India(+91)',
        altPhone: '',
        dob: '',
        age: '',
        gender: '',
        caste: '',
        maritalStatus: '',
        religion: '',
        residence: '',
        voterCard: '',
        aadhar: '',
        pan: '',
        occupation: '',
        qualification: '',
        familyIncome: '',
        category: '',
        userType: '',
        role: '',
        password: '',
        confirmPassword: '',

        // Guardian
        gTitle: 'Mr',
        gFirstName: '',
        gMiddleName: '',
        gLastName: '',
        gPhoneCode: 'India(+91)',
        gPhone: '',
        gRelation: '',

        // Communication address
        cState: '',
        cCity: '',
        cPincode: '',
        cCareOf: '',
        cAddress1: '',
        cAddress2: '',
        cLandmark: '',

        // Permanent address
        sameAsComm: true,
        pState: '',
        pCity: '',
        pPincode: '',
        pCareOf: '',
        pAddress1: '',
        pAddress2: '',
        pLandmark: '',
    });

    // Pre-fill when editing
    useEffect(() => {
        if (!editUser) return;

        setForm(prev => ({
            ...prev,
            title: editUser.title || 'Mr',
            firstName: editUser.firstName || '',
            middleName: editUser.middleName || '',
            lastName: editUser.lastName || '',
            email: editUser.email || '',
            phoneCode: editUser.phoneCode || 'India(+91)',
            phone: editUser.phone || '',
            altPhoneCode: editUser.altPhoneCode || 'India(+91)',
            altPhone: editUser.altPhone || '',
            dob: editUser.dob || '',
            age: String(editUser.age || ''),
            gender: editUser.gender || '',
            caste: editUser.caste || '',
            maritalStatus: editUser.maritalStatus || '',
            religion: editUser.religion || '',
            residence: editUser.residence || '',
            voterCard: editUser.voterCard || '',
            aadhar: editUser.aadhar || '',
            pan: editUser.pan || '',
            occupation: editUser.occupation || '',
            qualification: editUser.qualification || '',
            familyIncome: editUser.familyIncome || '',
            category: editUser.category || '',
            userType: editUser.userType || '',
            role: editUser.role || '',
            // Guardian
            gTitle: editUser.guardian?.title || 'Mr',
            gFirstName: editUser.guardian?.firstName || '',
            gMiddleName: editUser.guardian?.middleName || '',
            gLastName: editUser.guardian?.lastName || '',
            gPhoneCode: editUser.guardian?.phoneCode || 'India(+91)',
            gPhone: editUser.guardian?.phone || '',
            gRelation: editUser.guardian?.relation || '',
            // Communication address
            cState: editUser.communicationAddress?.state || '',
            cCity: editUser.communicationAddress?.city || '',
            cPincode: editUser.communicationAddress?.pincode || '',
            cCareOf: editUser.communicationAddress?.careOf || '',
            cAddress1: editUser.communicationAddress?.address1 || '',
            cAddress2: editUser.communicationAddress?.address2 || '',
            cLandmark: editUser.communicationAddress?.landmark || '',
            // Permanent address
            sameAsComm:
                editUser.permanentAddress?.sameAsCommunication ?? true,
            pState: editUser.permanentAddress?.state || '',
            pCity: editUser.permanentAddress?.city || '',
            pPincode: editUser.permanentAddress?.pincode || '',
            pCareOf: editUser.permanentAddress?.careOf || '',
            pAddress1: editUser.permanentAddress?.address1 || '',
            pAddress2: editUser.permanentAddress?.address2 || '',
            pLandmark: editUser.permanentAddress?.landmark || '',
        }));
    }, [editUser]);

    const handleChange = (name, value) =>
        setForm(prev => ({ ...prev, [name]: value }));

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // submit
            if (mode === 'edit') {
                console.log('Update user:', form);
            } else {
                console.log('Create new user:', form);
            }
            navigation.goBack && navigation.navigate('Users');
            setCurrentStep(0);
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack && navigation.navigate('Users');
            setCurrentStep(0);
        }
    };

    const progress = (currentStep + 1) / steps.length;

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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={goBack} style={{ paddingRight: 8 }}>
                        <MaterialIcons name="arrow-back-ios" size={18} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.appName}>
                            {mode === 'edit' ? 'Edit User' : 'Add User'}
                        </Text>
                        <Text style={styles.appSubtitle}>Agent360</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* PROGRESS BAR */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                    <View
                        style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
                    />
                </View>

                <View style={styles.stepLabelsRow}>
                    {steps.map((step, index) => {
                        const completed = index <= currentStep;
                        return (
                            <View key={step} style={styles.stepItem}>
                                <View
                                    style={[
                                        styles.stepCircle,
                                        completed && styles.stepCircleActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.stepCircleText,
                                            completed && styles.stepCircleTextActive,
                                        ]}
                                    >
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.stepLabel,
                                        completed && styles.stepLabelActive,
                                    ]}
                                >
                                    {step}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* FORM BODY */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formCard}>
                    {currentStep === 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Personal Information</Text>

                            <View style={styles.row}>
                                <Field
                                    label="Title"
                                    placeholder="Mr/Ms"
                                    value={form.title}
                                    onChangeText={v => handleChange('title', v)}
                                    flex={0.8}
                                />
                                <Field
                                    label="First Name"
                                    placeholder="Enter first name"
                                    value={form.firstName}
                                    onChangeText={v => handleChange('firstName', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Middle Name"
                                    placeholder="Enter middle name"
                                    value={form.middleName}
                                    onChangeText={v => handleChange('middleName', v)}
                                />
                                <Field
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    value={form.lastName}
                                    onChangeText={v => handleChange('lastName', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChangeText={v => handleChange('email', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Phone Code"
                                    placeholder="Code"
                                    value={form.phoneCode}
                                    onChangeText={v => handleChange('phoneCode', v)}
                                    flex={1}
                                />
                                <Field
                                    label="Phone Number"
                                    placeholder="Enter phone"
                                    value={form.phone}
                                    onChangeText={v => handleChange('phone', v)}
                                    flex={2}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Alt Phone Code"
                                    placeholder="Code"
                                    value={form.altPhoneCode}
                                    onChangeText={v => handleChange('altPhoneCode', v)}
                                    flex={1}
                                />
                                <Field
                                    label="Alternate Phone"
                                    placeholder="Enter alternate phone"
                                    value={form.altPhone}
                                    onChangeText={v => handleChange('altPhone', v)}
                                    flex={2}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="DOB"
                                    placeholder="YYYY-MM-DD"
                                    value={form.dob}
                                    onChangeText={v => handleChange('dob', v)}
                                />
                                <Field
                                    label="Age"
                                    placeholder="Age"
                                    value={form.age}
                                    onChangeText={v => handleChange('age', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Gender"
                                    placeholder="Male/Female"
                                    value={form.gender}
                                    onChangeText={v => handleChange('gender', v)}
                                />
                                <Field
                                    label="Religion"
                                    placeholder="Select religion"
                                    value={form.religion}
                                    onChangeText={v => handleChange('religion', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Caste"
                                    placeholder="Select caste"
                                    value={form.caste}
                                    onChangeText={v => handleChange('caste', v)}
                                />
                                <Field
                                    label="Marital Status"
                                    placeholder="Select marital status"
                                    value={form.maritalStatus}
                                    onChangeText={v => handleChange('maritalStatus', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Residence"
                                    placeholder="Select residence"
                                    value={form.residence}
                                    onChangeText={v => handleChange('residence', v)}
                                />
                                <Field
                                    label="Family Monthly Income"
                                    placeholder="Enter income"
                                    value={form.familyIncome}
                                    onChangeText={v => handleChange('familyIncome', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Occupation"
                                    placeholder="Select occupation"
                                    value={form.occupation}
                                    onChangeText={v => handleChange('occupation', v)}
                                />
                                <Field
                                    label="Qualification"
                                    placeholder="Select qualification"
                                    value={form.qualification}
                                    onChangeText={v => handleChange('qualification', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Aadhar Card No."
                                    placeholder="Enter Aadhar"
                                    value={form.aadhar}
                                    onChangeText={v => handleChange('aadhar', v)}
                                />
                                <Field
                                    label="PAN Card No."
                                    placeholder="Enter PAN"
                                    value={form.pan}
                                    onChangeText={v => handleChange('pan', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Voter Card No."
                                    placeholder="Enter Voter ID"
                                    value={form.voterCard}
                                    onChangeText={v => handleChange('voterCard', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="User Category"
                                    placeholder="Select category"
                                    value={form.category}
                                    onChangeText={v => handleChange('category', v)}
                                />
                                <Field
                                    label="User Type"
                                    placeholder="Select user type"
                                    value={form.userType}
                                    onChangeText={v => handleChange('userType', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Role"
                                    placeholder="Select role"
                                    value={form.role}
                                    onChangeText={v => handleChange('role', v)}
                                />
                            </View>

                            {/* passwords normally only for create; keep simple here */}
                            {mode === 'create' && (
                                <>
                                    <View style={styles.row}>
                                        <Field
                                            label="Password"
                                            placeholder="Enter password"
                                            value={form.password}
                                            onChangeText={v => handleChange('password', v)}
                                        />
                                        <Field
                                            label="Confirm Password"
                                            placeholder="Confirm password"
                                            value={form.confirmPassword}
                                            onChangeText={v => handleChange('confirmPassword', v)}
                                        />
                                    </View>
                                </>
                            )}
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <Text style={styles.sectionTitle}>Guardian Details</Text>

                            <View style={styles.row}>
                                <Field
                                    label="Title"
                                    placeholder="Mr/Ms"
                                    value={form.gTitle}
                                    onChangeText={v => handleChange('gTitle', v)}
                                    flex={0.8}
                                />
                                <Field
                                    label="First Name"
                                    placeholder="Guardian first name"
                                    value={form.gFirstName}
                                    onChangeText={v => handleChange('gFirstName', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Middle Name"
                                    placeholder="Guardian middle name"
                                    value={form.gMiddleName}
                                    onChangeText={v => handleChange('gMiddleName', v)}
                                />
                                <Field
                                    label="Last Name"
                                    placeholder="Guardian last name"
                                    value={form.gLastName}
                                    onChangeText={v => handleChange('gLastName', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Phone Code"
                                    placeholder="Code"
                                    value={form.gPhoneCode}
                                    onChangeText={v => handleChange('gPhoneCode', v)}
                                    flex={1}
                                />
                                <Field
                                    label="Phone Number"
                                    placeholder="Guardian phone"
                                    value={form.gPhone}
                                    onChangeText={v => handleChange('gPhone', v)}
                                    flex={2}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Relation With Guardian"
                                    placeholder="Father / Mother / Brother"
                                    value={form.gRelation}
                                    onChangeText={v => handleChange('gRelation', v)}
                                />
                            </View>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Text style={styles.sectionTitle}>Communication Address</Text>

                            <View style={styles.row}>
                                <Field
                                    label="State"
                                    placeholder="Select state"
                                    value={form.cState}
                                    onChangeText={v => handleChange('cState', v)}
                                />
                                <Field
                                    label="City"
                                    placeholder="Select city"
                                    value={form.cCity}
                                    onChangeText={v => handleChange('cCity', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Pincode"
                                    placeholder="Enter pincode"
                                    value={form.cPincode}
                                    onChangeText={v => handleChange('cPincode', v)}
                                />
                                <Field
                                    label="C/O"
                                    placeholder="Care of"
                                    value={form.cCareOf}
                                    onChangeText={v => handleChange('cCareOf', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Address Line 1"
                                    placeholder="Address line 1"
                                    value={form.cAddress1}
                                    onChangeText={v => handleChange('cAddress1', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Address Line 2"
                                    placeholder="Address line 2"
                                    value={form.cAddress2}
                                    onChangeText={v => handleChange('cAddress2', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Landmark"
                                    placeholder="Landmark"
                                    value={form.cLandmark}
                                    onChangeText={v => handleChange('cLandmark', v)}
                                />
                            </View>

                            <View
                                style={[
                                    styles.row,
                                    { alignItems: 'center', marginTop: 10, marginBottom: 4 },
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.checkboxRow}
                                    onPress={() =>
                                        handleChange('sameAsComm', !form.sameAsComm)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            form.sameAsComm && styles.checkboxChecked,
                                        ]}
                                    >
                                        {form.sameAsComm && (
                                            <MaterialIcons name="check" size={14} color="#fff" />
                                        )}
                                    </View>
                                    <Text style={styles.checkboxLabel}>
                                        Same as Communication Address
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
                                Permanent Address
                            </Text>

                            <View style={styles.row}>
                                <Field
                                    label="State"
                                    placeholder="Select state"
                                    value={form.pState}
                                    onChangeText={v => handleChange('pState', v)}
                                />
                                <Field
                                    label="City"
                                    placeholder="Select city"
                                    value={form.pCity}
                                    onChangeText={v => handleChange('pCity', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Pincode"
                                    placeholder="Enter pincode"
                                    value={form.pPincode}
                                    onChangeText={v => handleChange('pPincode', v)}
                                />
                                <Field
                                    label="C/O"
                                    placeholder="Care of"
                                    value={form.pCareOf}
                                    onChangeText={v => handleChange('pCareOf', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Address Line 1"
                                    placeholder="Address line 1"
                                    value={form.pAddress1}
                                    onChangeText={v => handleChange('pAddress1', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Address Line 2"
                                    placeholder="Address line 2"
                                    value={form.pAddress2}
                                    onChangeText={v => handleChange('pAddress2', v)}
                                />
                            </View>

                            <View style={styles.row}>
                                <Field
                                    label="Landmark"
                                    placeholder="Landmark"
                                    value={form.pLandmark}
                                    onChangeText={v => handleChange('pLandmark', v)}
                                />
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* BOTTOM BUTTONS */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.navButton, styles.navButtonSecondary]}
                    onPress={goBack}
                >
                    <Text style={[styles.navButtonText, { color: COLORS.primary }]}>
                        {currentStep === 0 ? 'Cancel' : 'Previous'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={goNext}>
                    <Text style={styles.navButtonText}>
                        {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UserFormScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    appName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    appSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
    },

    progressContainer: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 6,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: COLORS.primary,
    },
    stepLabelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    stepCircleActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    stepCircleText: {
        fontSize: 11,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    stepCircleTextActive: {
        color: '#fff',
    },
    stepLabel: {
        fontSize: 10,
        color: COLORS.textLight,
        marginTop: 2,
        textAlign: 'center',
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
    formCard: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        columnGap: 8,
        marginBottom: 8,
    },
    field: {
        flex: 1,
    },
    fieldLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9fafb',
        height: 38,
        justifyContent: 'center',
    },
    input: {
        fontSize: 13,
        color: COLORS.textDark,
        paddingVertical: 0,
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    checkboxLabel: {
        fontSize: 12,
        color: COLORS.textDark,
    },

    bottomBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    navButton: {
        flex: 1,
        borderRadius: 999,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginLeft: 8,
    },
    navButtonSecondary: {
        backgroundColor: '#e5f9ec',
        marginLeft: 0,
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});