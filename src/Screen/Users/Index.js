// src/Screen/UserList/Index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ButtonNav from '../../Navigation/ButtonNav';

const COLORS = {
  primary: '#51b05e',
  accent: '#2abc9d',
  background: '#f5f7fb',
  card: '#ffffff',
  textDark: '#1f2933',
  textLight: '#9aa5b1',
  border: '#e4e9f2',
};

const USERS = [
  {
    id: 'EMP001',
    title: 'Mr',
    firstName: 'Biswajit',
    middleName: '',
    lastName: 'Mishra',
    email: 'biswajit@example.com',
    phoneCode: 'India(+91)',
    phone: '6296095454',
    altPhoneCode: 'India(+91)',
    altPhone: '9000000000',
    dob: '2002-04-07',
    age: 23,
    gender: 'Male',
    caste: 'General',
    maritalStatus: 'Single',
    religion: 'Hindu',
    residence: 'Own House',
    voterCard: 'VOTER1234',
    aadhar: '1234 5678 9012',
    pan: 'ABCDE1234F',
    occupation: 'Agent',
    qualification: 'Graduate',
    familyIncome: '₹ 25,000',
    category: 'Staff',
    userType: 'Loan Agent',
    role: 'Agent',
    branch: 'Demo01',
    guardian: {
      title: 'Mr',
      firstName: 'Ajay',
      middleName: 'Kumar',
      lastName: 'Mishra',
      phoneCode: 'India(+91)',
      phone: '9876543210',
      relation: 'Father',
    },
    communicationAddress: {
      state: 'West Bengal',
      city: 'Bhagwanpur',
      pincode: '721425',
      careOf: 'Ajay Kumar Mishra',
      address1:
        'BASULIBAZAR Basudeb Berya Bhagwanpur-II Purba Medinipur Basuli Bazar West Bengal India',
      address2: '',
      landmark: 'BASUDEVBERIA',
    },
    permanentAddress: {
      sameAsCommunication: true,
      state: 'West Bengal',
      city: 'Bhagwanpur',
      pincode: '721425',
      careOf: 'Ajay Kumar Mishra',
      address1:
        'BASULIBAZAR Basudeb Berya Bhagwanpur-II Purba Medinipur Basuli Bazar West Bengal India',
      address2: '',
      landmark: 'BASUDEVBERIA',
    },
    status: 'Active',
  },
  {
    id: 'EMP002',
    title: 'Ms',
    firstName: 'Anita',
    middleName: '',
    lastName: 'Roy',
    email: 'anita.roy@example.com',
    phoneCode: 'India(+91)',
    phone: '7000000000',
    altPhoneCode: 'India(+91)',
    altPhone: '',
    dob: '1998-10-12',
    age: 27,
    gender: 'Female',
    caste: 'OBC',
    maritalStatus: 'Married',
    religion: 'Hindu',
    residence: 'Rented',
    voterCard: '',
    aadhar: '9999 1111 2222',
    pan: 'AAAPA1234K',
    occupation: 'Agent',
    qualification: 'Post Graduate',
    familyIncome: '₹ 30,000',
    category: 'Staff',
    userType: 'Loan Agent',
    role: 'Agent',
    branch: 'Demo02',
    guardian: {
      title: 'Mr',
      firstName: 'Ramesh',
      middleName: '',
      lastName: 'Roy',
      phoneCode: 'India(+91)',
      phone: '9123456789',
      relation: 'Father',
    },
    communicationAddress: {
      state: 'Odisha',
      city: 'Bhubaneswar',
      pincode: '751001',
      careOf: 'Ramesh Roy',
      address1: 'Some street, Some locality',
      address2: '',
      landmark: 'Near main market',
    },
    permanentAddress: {
      sameAsCommunication: false,
      state: 'Odisha',
      city: 'Cuttack',
      pincode: '753001',
      careOf: 'Ramesh Roy',
      address1: 'Old house, Old locality',
      address2: '',
      landmark: 'Near old temple',
    },
    status: 'Inactive',
  },
];

const SectionRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value || '-'}</Text>
  </View>
);

const UserListScreen = () => {
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  const closeModal = () => setSelectedUser(null);

  const filtered = USERS.filter(u => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.phone.includes(q)
    );
  });

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
        <View>
          <Text style={styles.appName}>Users</Text>
          <Text style={styles.appSubtitle}>Demo01</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Add user */}
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.navigate('AddUser', { mode: 'create' })}
          >
            <MaterialIcons name="person-add-alt" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Drawer */}
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.openDrawer && navigation.openDrawer()}
          >
            <MaterialIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* SEARCH BAR */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <MaterialIcons
            name="search"
            size={18}
            color={COLORS.textLight}
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="Search by name, ID or mobile"
            placeholderTextColor={COLORS.textLight}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* LIST */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(user => {
          const statusColor =
            user.status === 'Active'
              ? { bg: '#dcfce7', text: '#166534' }
              : { bg: '#fee2e2', text: '#b91c1c' };

          return (
            <View key={user.id} style={styles.userCard}>
              {/* Colored strip */}
              <LinearGradient
                colors={[COLORS.primary, COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardStrip}
              />

              <View style={styles.userCardInner}>
                {/* Top row */}
                <View style={styles.userTopRow}>
                  <View style={styles.userLeft}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {user.firstName.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.userName}>
                        {user.firstName} {user.lastName}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.userId}>{user.id}</Text>
                        <View style={styles.dotSeparator} />
                        <Text style={styles.branchText}>{user.branch}</Text>
                      </View>
                    </View>
                  </View>

                  {/* status chip */}
                  <View
                    style={[
                      styles.statusChip,
                      { backgroundColor: statusColor.bg },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: statusColor.text },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusChipText,
                        { color: statusColor.text },
                      ]}
                    >
                      {user.status}
                    </Text>
                  </View>
                </View>

                {/* Mid info row */}
                <View style={styles.userInfoRow}>
                  <MaterialIcons
                    name="phone-iphone"
                    size={15}
                    color={COLORS.textLight}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.infoText}>{user.phone}</Text>

                  <View style={styles.dotSeparator} />

                  <MaterialIcons
                    name="alternate-email"
                    size={15}
                    color={COLORS.textLight}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.infoText, { flex: 1 }]} numberOfLines={1}>
                    {user.email}
                  </Text>
                </View>

                {/* Bottom row: role + actions */}
                <View style={styles.cardFooter}>
                  <View style={styles.rolePill}>
                    <MaterialIcons
                      name="badge"
                      size={14}
                      color="#2563eb"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.roleText}>{user.role}</Text>
                  </View>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => setSelectedUser(user)}
                    >
                      <MaterialIcons
                        name="visibility"
                        size={18}
                        color="#2563eb"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() =>
                        navigation.navigate('AddUser', {
                          mode: 'edit',
                          user,
                        })
                      }
                    >
                      <MaterialIcons
                        name="edit"
                        size={18}
                        color="#f59e0b"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* DETAIL MODAL */}
      <Modal
        visible={!!selectedUser}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedUser && (
              <>
                {/* Modal header with gradient */}
                <LinearGradient
                  colors={[COLORS.primary, COLORS.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalHeaderGradient}
                >
                  <View style={styles.modalHeaderContent}>
                    <View style={styles.modalAvatar}>
                      <Text style={styles.modalAvatarText}>
                        {selectedUser.firstName.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalName}>
                        {selectedUser.firstName} {selectedUser.lastName}
                      </Text>
                      <Text style={styles.modalId}>{selectedUser.id}</Text>
                      <Text style={styles.modalBranch}>
                        {selectedUser.branch} • {selectedUser.role}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.modalCloseBtn}
                      onPress={closeModal}
                    >
                      <MaterialIcons name="close" size={22} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  {/* status chip */}
                  <View style={styles.modalStatusRow}>
                    <View style={styles.modalStatusChip}>
                      <View style={styles.modalStatusDot} />
                      <Text style={styles.modalStatusText}>
                        {selectedUser.status}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Body */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalContent}
                >
                  {/* Personal Information */}
                  <Text style={styles.sectionTitle}>Personal Information</Text>
                  <View style={styles.sectionCard}>
                    <SectionRow
                      label="Name"
                      value={`${selectedUser.title} ${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}`.replace(
                        /\s+/g,
                        ' '
                      )}
                    />
                    <SectionRow label="Email" value={selectedUser.email} />
                    <SectionRow
                      label="Mobile"
                      value={`${selectedUser.phoneCode} ${selectedUser.phone}`}
                    />
                    <SectionRow
                      label="Alternate Mobile"
                      value={
                        selectedUser.altPhone
                          ? `${selectedUser.altPhoneCode} ${selectedUser.altPhone}`
                          : ''
                      }
                    />
                    <SectionRow
                      label="DOB / Age"
                      value={`${selectedUser.dob} (${selectedUser.age})`}
                    />
                    <SectionRow label="Gender" value={selectedUser.gender} />
                    <SectionRow label="Religion" value={selectedUser.religion} />
                    <SectionRow label="Caste" value={selectedUser.caste} />
                    <SectionRow
                      label="Marital Status"
                      value={selectedUser.maritalStatus}
                    />
                    <SectionRow
                      label="Residence"
                      value={selectedUser.residence}
                    />
                    <SectionRow
                      label="Voter Card No."
                      value={selectedUser.voterCard}
                    />
                    <SectionRow label="Aadhar" value={selectedUser.aadhar} />
                    <SectionRow label="PAN" value={selectedUser.pan} />
                    <SectionRow
                      label="Occupation"
                      value={selectedUser.occupation}
                    />
                    <SectionRow
                      label="Qualification"
                      value={selectedUser.qualification}
                    />
                    <SectionRow
                      label="Family Monthly Income"
                      value={selectedUser.familyIncome}
                    />
                    <SectionRow
                      label="User Category"
                      value={selectedUser.category}
                    />
                    <SectionRow
                      label="User Type"
                      value={selectedUser.userType}
                    />
                    <SectionRow label="Role" value={selectedUser.role} />
                    <SectionRow label="Branch" value={selectedUser.branch} />
                  </View>

                  {/* Guardian Details */}
                  <Text style={styles.sectionTitle}>Guardian Details</Text>
                  <View style={styles.sectionCard}>
                    <SectionRow
                      label="Name"
                      value={`${selectedUser.guardian.title} ${selectedUser.guardian.firstName} ${selectedUser.guardian.middleName} ${selectedUser.guardian.lastName}`.replace(
                        /\s+/g,
                        ' '
                      )}
                    />
                    <SectionRow
                      label="Mobile"
                      value={`${selectedUser.guardian.phoneCode} ${selectedUser.guardian.phone}`}
                    />
                    <SectionRow
                      label="Relation"
                      value={selectedUser.guardian.relation}
                    />
                  </View>

                  {/* Communication Address */}
                  <Text style={styles.sectionTitle}>Communication Address</Text>
                  <View style={styles.sectionCard}>
                    <SectionRow
                      label="State"
                      value={selectedUser.communicationAddress.state}
                    />
                    <SectionRow
                      label="City"
                      value={selectedUser.communicationAddress.city}
                    />
                    <SectionRow
                      label="Pincode"
                      value={selectedUser.communicationAddress.pincode}
                    />
                    <SectionRow
                      label="C/O"
                      value={selectedUser.communicationAddress.careOf}
                    />
                    <SectionRow
                      label="Address Line 1"
                      value={selectedUser.communicationAddress.address1}
                    />
                    <SectionRow
                      label="Address Line 2"
                      value={selectedUser.communicationAddress.address2}
                    />
                    <SectionRow
                      label="Landmark"
                      value={selectedUser.communicationAddress.landmark}
                    />
                  </View>

                  {/* Permanent Address */}
                  <Text style={styles.sectionTitle}>Permanent Address</Text>
                  <View style={styles.sectionCard}>
                    <SectionRow
                      label="Same As Communication"
                      value={
                        selectedUser.permanentAddress.sameAsCommunication
                          ? 'Yes'
                          : 'No'
                      }
                    />
                    <SectionRow
                      label="State"
                      value={selectedUser.permanentAddress.state}
                    />
                    <SectionRow
                      label="City"
                      value={selectedUser.permanentAddress.city}
                    />
                    <SectionRow
                      label="Pincode"
                      value={selectedUser.permanentAddress.pincode}
                    />
                    <SectionRow
                      label="C/O"
                      value={selectedUser.permanentAddress.careOf}
                    />
                    <SectionRow
                      label="Address Line 1"
                      value={selectedUser.permanentAddress.address1}
                    />
                    <SectionRow
                      label="Address Line 2"
                      value={selectedUser.permanentAddress.address2}
                    />
                    <SectionRow
                      label="Landmark"
                      value={selectedUser.permanentAddress.landmark}
                    />
                  </View>

                  <View style={{ height: 12 }} />
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
      <ButtonNav
        activeTab={'users'}
        onTabPress={(key) => {
          if (key === 'home') navigation.navigate('Home');
          if (key === 'loans') navigation.navigate('LoanRequest');
          if (key === 'users') navigation.navigate('Users');
          if (key === 'profile') navigation.navigate('Profile');
        }}
      />
    </SafeAreaView>
  );
};

export default UserListScreen;

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
    justifyContent: 'space-between',
  },
  appName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  headerIconButton: {
    marginLeft: 6,
    padding: 6,
  },

  searchBarWrapper: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  /* list card */
  userCard: {
    marginTop: 12,
  },
  cardStrip: {
    height: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  userCardInner: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  userTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e3f6eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  userName: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  userId: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  branchText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: '600',
  },

  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },

  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    backgroundColor: '#fff',
  },

  /* modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '92%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  modalHeaderGradient: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  modalAvatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
  modalName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalId: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
  },
  modalBranch: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
    marginLeft: 6,
  },
  modalStatusRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  modalStatusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  modalStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dcfce7',
    marginRight: 4,
  },
  modalStatusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 10,
    marginBottom: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    flex: 0.55,
  },
  detailValue: {
    fontSize: 12,
    color: COLORS.textDark,
    flex: 0.45,
    textAlign: 'right',
  },
});