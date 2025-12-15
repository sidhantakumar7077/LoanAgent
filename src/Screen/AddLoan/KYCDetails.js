// src/Screen/AddLoan/KYCDetails.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

const COLORS = {
    primary: '#51b05e',
    accent: '#2abc9d',
    background: '#f5f7fb',
    card: '#ffffff',
    textDark: '#1f2933',
    textLight: '#9aa5b1',
    border: '#e4e9f2',
};

const DOC_TYPES = [
    'Aadhaar Card',
    'PAN Card',
    'Voter Card',
    'Driving Licence',
    'Passport',
];

const DOC_OPTIONS = DOC_TYPES.map(label => ({ label, value: label }));

const KYCDetails = () => {
    /* -------- Personal doc state -------- */
    const [pDocType, setPDocType] = useState('');
    const [pDocNo, setPDocNo] = useState('');
    const [pImageUri, setPImageUri] = useState('');
    const [personalDocs, setPersonalDocs] = useState([]);

    /* -------- Guarantor doc state -------- */
    const [gDocType, setGDocType] = useState('');
    const [gDocNo, setGDocNo] = useState('');
    const [gImageUri, setGImageUri] = useState('');
    const [guarantorDocs, setGuarantorDocs] = useState([]);

    /* -------- View modal -------- */
    const [viewVisible, setViewVisible] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const getFileNameFromUri = uri => {
        if (!uri) return '';
        const withoutQuery = uri.split('?')[0];
        const parts = withoutQuery.split('/');
        return parts[parts.length - 1] || '';
    };

    const pickImage = target => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.85,
            },
            response => {
                if (response.didCancel || response.errorCode) return;
                const uri = response.assets?.[0]?.uri;
                if (!uri) return;

                if (target === 'personal') {
                    setPImageUri(uri);
                } else if (target === 'guarantor') {
                    setGImageUri(uri);
                }
            },
        );
    };

    const savePersonalDoc = () => {
        if (!pDocType.trim() || !pDocNo.trim() || !pImageUri) return;

        const newDoc = {
            id: Date.now().toString(),
            section: 'Personal Document',
            type: pDocType.trim(),
            number: pDocNo.trim(),
            image: pImageUri,
        };
        setPersonalDocs(prev => [...prev, newDoc]);
        setPDocType('');
        setPDocNo('');
        setPImageUri('');
    };

    const saveGuarantorDoc = () => {
        if (!gDocType.trim() || !gDocNo.trim() || !gImageUri) return;

        const newDoc = {
            id: Date.now().toString(),
            section: 'Guarantor Document',
            type: gDocType.trim(),
            number: gDocNo.trim(),
            image: gImageUri,
        };
        setGuarantorDocs(prev => [...prev, newDoc]);
        setGDocType('');
        setGDocNo('');
        setGImageUri('');
    };

    const openViewModal = doc => {
        setSelectedDoc(doc);
        setViewVisible(true);
    };

    const closeViewModal = () => {
        setSelectedDoc(null);
        setViewVisible(false);
    };

    const renderDocRow = doc => (
        <TouchableOpacity
            key={doc.id}
            style={styles.docRow}
            activeOpacity={0.7}
            onPress={() => openViewModal(doc)}
        >
            <View style={styles.docThumb}>
                {doc.image ? (
                    <Image source={{ uri: doc.image }} style={styles.docThumbImage} />
                ) : (
                    <View style={styles.docThumbPlaceholder}>
                        <Text style={styles.docThumbPlaceholderText}>Img</Text>
                    </View>
                )}
            </View>

            <View style={styles.docTextBlock}>
                <Text style={styles.docType} numberOfLines={1}>
                    {doc.type}
                </Text>
                <Text style={styles.docNumber} numberOfLines={1}>
                    No: {doc.number}
                </Text>
            </View>

            <View style={styles.docViewChip}>
                <Text style={styles.docViewChipText}>View</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.wrapper}
            >
                <Text style={styles.sectionHeading}>KYC Details</Text>
                <Text style={styles.sectionSub}>
                    Attach identity and address proof for borrower and guarantor.
                </Text>

                {/* -------- PERSONAL DOC CARD -------- */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Personal Document Details</Text>
                    <Text style={styles.cardSub}>
                        Upload documents for the loan applicant.
                    </Text>

                    {/* Type + Number */}
                    <View style={styles.row}>
                        <View style={styles.halfField}>
                            <Text style={styles.label}>Document Type *</Text>
                            <Dropdown
                                style={styles.dropdown}
                                containerStyle={styles.dropdownContainer}
                                data={DOC_OPTIONS}
                                labelField="label"
                                valueField="value"
                                placeholder="document type"
                                placeholderStyle={styles.dropdownPlaceholder}
                                selectedTextStyle={styles.dropdownSelectedText}
                                itemTextStyle={styles.dropdownItemText}
                                value={pDocType}
                                onChange={item => setPDocType(item.value)}
                            />
                        </View>

                        <View style={styles.halfField}>
                            <Text style={styles.label}>Document Number *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="document no."
                                placeholderTextColor={COLORS.textLight}
                                value={pDocNo}
                                onChangeText={setPDocNo}
                            />
                        </View>
                    </View>

                    {/* Image field + Save button in one row */}
                    <View style={styles.row}>
                        <View style={styles.imageFieldWrapper}>
                            <Text style={styles.label}>Document Image *</Text>
                            <TouchableOpacity
                                style={styles.imageInputBox}
                                activeOpacity={0.7}
                                onPress={() => pickImage('personal')}
                            >
                                <Text
                                    style={
                                        pImageUri ? styles.imageInputText : styles.imageInputPlaceholder
                                    }
                                    numberOfLines={1}
                                >
                                    {pImageUri
                                        ? getFileNameFromUri(pImageUri)
                                        : 'document image'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.saveButtonWrapper}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                activeOpacity={0.8}
                                onPress={savePersonalDoc}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* List */}
                    {personalDocs.length > 0 && (
                        <View style={styles.listWrapper}>
                            <View style={styles.listHeader}>
                                <Text style={styles.listHeaderText}>
                                    Saved Personal Documents
                                </Text>
                            </View>
                            {personalDocs.map(renderDocRow)}
                        </View>
                    )}
                </View>

                {/* -------- GUARANTOR DOC CARD -------- */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Guarantor Document Details</Text>
                    <Text style={styles.cardSub}>
                        Attach documents for the guarantor associated with this loan.
                    </Text>

                    {/* Type + Number */}
                    <View style={styles.row}>
                        <View style={styles.halfField}>
                            <Text style={styles.label}>Document Type *</Text>
                            <Dropdown
                                style={styles.dropdown}
                                containerStyle={styles.dropdownContainer}
                                data={DOC_OPTIONS}
                                labelField="label"
                                valueField="value"
                                placeholder="document type"
                                placeholderStyle={styles.dropdownPlaceholder}
                                selectedTextStyle={styles.dropdownSelectedText}
                                itemTextStyle={styles.dropdownItemText}
                                value={gDocType}
                                onChange={item => setGDocType(item.value)}
                            />
                        </View>

                        <View style={styles.halfField}>
                            <Text style={styles.label}>Document Number *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="document no."
                                placeholderTextColor={COLORS.textLight}
                                value={gDocNo}
                                onChangeText={setGDocNo}
                            />
                        </View>
                    </View>

                    {/* Image field + Save button in one row */}
                    <View style={styles.row}>
                        <View style={styles.imageFieldWrapper}>
                            <Text style={styles.label}>Document Image *</Text>
                            <TouchableOpacity
                                style={styles.imageInputBox}
                                activeOpacity={0.7}
                                onPress={() => pickImage('guarantor')}
                            >
                                <Text
                                    style={
                                        gImageUri ? styles.imageInputText : styles.imageInputPlaceholder
                                    }
                                    numberOfLines={1}
                                >
                                    {gImageUri
                                        ? getFileNameFromUri(gImageUri)
                                        : 'document image'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.saveButtonWrapper}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                activeOpacity={0.8}
                                onPress={saveGuarantorDoc}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* List */}
                    {guarantorDocs.length > 0 && (
                        <View style={styles.listWrapper}>
                            <View style={styles.listHeader}>
                                <Text style={styles.listHeaderText}>
                                    Saved Guarantor Documents
                                </Text>
                            </View>
                            {guarantorDocs.map(renderDocRow)}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* -------- VIEW MODAL -------- */}
            <Modal
                visible={viewVisible}
                transparent
                animationType="fade"
                onRequestClose={closeViewModal}
            >
                <View style={styles.modalOverlay}>
                    <View className="view-modal-card" style={styles.viewModalCard}>
                        <Text style={styles.modalTitle}>
                            {selectedDoc?.section || 'Document Details'}
                        </Text>

                        <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Document Type</Text>
                            <Text style={styles.modalValue}>
                                {selectedDoc?.type || '-'}
                            </Text>
                        </View>

                        <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Document Number</Text>
                            <Text style={styles.modalValue}>
                                {selectedDoc?.number || '-'}
                            </Text>
                        </View>

                        <Text style={[styles.modalLabel, { marginTop: 10 }]}>
                            Document Image
                        </Text>
                        {selectedDoc?.image ? (
                            <Image
                                source={{ uri: selectedDoc.image }}
                                style={styles.modalImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <View style={styles.modalImagePlaceholder}>
                                <Text style={styles.modalPlaceholderText}>
                                    No image available
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.closeButton, { alignSelf: 'flex-end' }]}
                            onPress={closeViewModal}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default KYCDetails;

/* -------- STYLES -------- */

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
        marginBottom: 14,
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

    /* Dropdown */
    dropdown: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        backgroundColor: '#f9fafb',
    },
    dropdownContainer: {
        borderRadius: 12,
        borderColor: COLORS.border,
    },
    dropdownPlaceholder: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    dropdownSelectedText: {
        fontSize: 13,
        color: COLORS.textDark,
    },
    dropdownItemText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    /* Image field + Save */
    imageFieldWrapper: {
        flex: 1,
        marginRight: 8,
    },
    imageInputBox: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
    },
    imageInputPlaceholder: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    imageInputText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    saveButtonWrapper: {
        justifyContent: 'flex-end',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 9,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },

    /* List */
    listWrapper: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#edf0f6',
        paddingTop: 6,
    },
    listHeader: {
        marginBottom: 4,
    },
    listHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: '#f9fafb',
        marginBottom: 6,
    },
    docThumb: {
        width: 34,
        height: 34,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 8,
        backgroundColor: '#e5e7eb',
    },
    docThumbImage: {
        width: '100%',
        height: '100%',
    },
    docThumbPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    docThumbPlaceholderText: {
        fontSize: 10,
        color: COLORS.textLight,
    },
    docTextBlock: {
        flex: 1,
        marginRight: 8,
    },
    docType: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    docNumber: {
        fontSize: 11,
        color: COLORS.textLight,
        marginTop: 1,
    },
    docViewChip: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: COLORS.primary,
    },
    docViewChipText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
    },

    /* Modals */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewModalCard: {
        width: '86%',
        borderRadius: 18,
        backgroundColor: COLORS.card,
        paddingHorizontal: 16,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    modalTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: 10,
    },
    modalRow: {
        marginBottom: 6,
    },
    modalLabel: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    modalValue: {
        fontSize: 13,
        color: COLORS.textDark,
        fontWeight: '500',
    },
    modalImage: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginTop: 6,
        backgroundColor: '#f3f4f6',
    },
    modalImagePlaceholder: {
        width: '100%',
        height: 140,
        borderRadius: 10,
        marginTop: 6,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPlaceholderText: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    closeButton: {
        marginTop: 12,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 999,
        backgroundColor: COLORS.primary,
    },
    closeButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
});