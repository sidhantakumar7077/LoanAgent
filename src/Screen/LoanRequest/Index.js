// src/Screen/LoanRequest/Index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonNav from '../../Navigation/ButtonNav';

const COLORS = {
  primary: '#51b05e',  // main green
  accent: '#2abc9d',   // teal
  background: '#f5f7fb',
  card: '#ffffff',
  textDark: '#1f2933',
  textLight: '#9aa5b1',
  border: '#e4e9f2',
};

const summaryCards = [
  {
    label: 'Total Disbursed Application',
    value: '20',
    colorFrom: '#3b82f6',
    colorTo: '#2563eb',
    icon: 'shopping-cart',
  },
  {
    label: 'Total Pending Application',
    value: '6',
    colorFrom: '#fb7185',
    colorTo: '#ef4444',
    icon: 'pending-actions',
  },
  {
    label: 'Disbursed Amount',
    value: '₹ 143500.00',
    colorFrom: '#facc15',
    colorTo: '#eab308',
    icon: 'currency-rupee',
  },
  {
    label: 'Pending Amount',
    value: '₹ 1196577.00',
    colorFrom: COLORS.primary,
    colorTo: COLORS.accent,
    icon: 'paid',
  },
];

const applicationData = [
  {
    id: 'APPL020027',
    memberName: 'Mr. Ramesh Chandra Kamila',
    mobile: '8001577701',
    amount: '₹ 2400.00',
    status: 'Processing',
    date: '2019-11-22',
  },
  {
    id: 'APPL020026',
    memberName: 'Mr. Ramesh Chandra Kamila',
    mobile: '8001577701',
    amount: '₹ 13000.00',
    status: 'Processing',
    date: '2019-11-22',
  },
  {
    id: 'APPL020023',
    memberName: 'Mr. Sukumar Bag',
    mobile: '8250754644',
    amount: '₹ 1000000.00',
    status: 'Approved',
    date: '2019-11-22',
  },
];

const statusChipColors = {
  Processing: { bg: '#fef3c7', text: '#92400e' },
  Approved: { bg: '#dcfce7', text: '#166534' },
  Rejected: { bg: '#fee2e2', text: '#b91c1c' },
  Disbursed: { bg: '#e0f2fe', text: '#1d4ed8' },
  Completed: { bg: '#e5e7eb', text: '#374151' },
};

const statusTabs = ['All', 'Processing', 'Approved', 'Rejected', 'Disbursed', 'Completed'];

const Index = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchType] = useState('Search type');
  const [keyword, setKeyword] = useState('');

  const filteredApplications = applicationData.filter(item => {
    const matchStatus =
      activeStatus === 'All' ? true : item.status === activeStatus;

    const matchKeyword =
      keyword.trim().length === 0
        ? true
        : item.id.toLowerCase().includes(keyword.toLowerCase()) ||
        item.memberName.toLowerCase().includes(keyword.toLowerCase()) ||
        item.mobile.includes(keyword);

    return matchStatus && matchKeyword;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* HEADER – same style as Home */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.appName}>Loan Request</Text>
          <Text style={styles.appSubtitle}>Demo01</Text>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer && navigation.openDrawer()}
        >
          <MaterialIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* BODY */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY CARDS */}
        <View style={styles.summaryGrid}>
          {summaryCards.map(card => (
            <LinearGradient
              key={card.label}
              colors={[card.colorFrom, card.colorTo]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.summaryLabel}>{card.label}</Text>
                <Text style={styles.summaryValue}>{card.value}</Text>
              </View>
              {/* <MaterialIcons
                name={card.icon}
                size={26}
                color="rgba(255,255,255,0.95)"
              /> */}
            </LinearGradient>
          ))}
        </View>

        {/* SEARCH + ADD LOAN */}
        <View style={styles.searchCard}>
          <View style={styles.searchHeaderRow}>
            <Text style={styles.searchTitle}>Search</Text>

            <TouchableOpacity style={styles.addLoanButton}>
              <MaterialIcons name="add" size={18} color="#fff" />
              <Text style={styles.addLoanText}>Add Loan</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.searchLabel}>Search By</Text>
          <View style={styles.searchRow}>
            <TouchableOpacity style={styles.searchTypeBox}>
              <Text style={styles.searchTypeText}>{searchType} ▾</Text>
            </TouchableOpacity>

            <View style={styles.searchInputWrapper}>
              <TextInput
                placeholder="Search by keyword"
                placeholderTextColor={COLORS.textLight}
                style={styles.searchInput}
                value={keyword}
                onChangeText={setKeyword}
              />
            </View>
          </View>
        </View>

        {/* STATUS TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 15 }}
          contentContainerStyle={styles.statusTabsRow}
        >
          {statusTabs.map(tab => {
            const active = activeStatus === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.statusTab, active && styles.statusTabActive]}
                onPress={() => setActiveStatus(tab)}
              >
                <Text
                  style={[
                    styles.statusTabText,
                    active && styles.statusTabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LIST / EMPTY */}
        {filteredApplications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="inbox"
              size={42}
              color={COLORS.textLight}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.emptyTitle}>
              No {activeStatus} applications
            </Text>
            <Text style={styles.emptySubtitle}>
              Try changing the status filter or add a new loan request.
            </Text>
          </View>
        ) : (
          filteredApplications.map(item => {
            const chip =
              statusChipColors[item.status] || statusChipColors.Processing;

            return (
              <View key={item.id} style={styles.appCard}>
                <View style={styles.appMainRow}>
                  {/* Avatar */}
                  <View style={styles.appAvatar}>
                    <Text style={styles.appAvatarText}>
                      {item.memberName.charAt(0)}
                    </Text>
                  </View>

                  {/* Middle text block */}
                  <View style={styles.appTextBlock}>
                    <Text style={styles.memberName} numberOfLines={1}>
                      {item.memberName}
                    </Text>
                    <Text style={styles.applicationCode}>{item.id}</Text>

                    <View style={styles.appInfoMiniRow}>
                      <MaterialIcons
                        name="phone-iphone"
                        size={14}
                        color={COLORS.textLight}
                        style={{ marginRight: 3 }}
                      />
                      <Text style={styles.infoValueMini}>{item.mobile}</Text>
                    </View>
                  </View>

                  {/* Right side: amount + chip */}
                  <View style={styles.appRightBlock}>
                    <Text style={styles.amountText} numberOfLines={1}>
                      {item.amount}
                    </Text>
                    <View
                      style={[styles.statusChip, { backgroundColor: chip.bg }]}
                    >
                      <Text
                        style={[styles.statusChipText, { color: chip.text }]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Actions + Date row */}
                <View style={styles.actionsRow}>
                  {/* Date on the left */}
                  <View style={styles.dateRow}>
                    <MaterialIcons
                      name="event"
                      size={16}
                      color={COLORS.textLight}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>

                  {/* Buttons on the right */}
                  <View style={styles.actionsRight}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <MaterialIcons
                        name="visibility"
                        size={16}
                        color="#2563eb"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.actionText, { color: '#2563eb' }]}>
                        View
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                      <MaterialIcons
                        name="edit"
                        size={16}
                        color="#f59e0b"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.actionText, { color: '#f59e0b' }]}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                      <MaterialIcons
                        name="delete-outline"
                        size={16}
                        color="#ef4444"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.actionText, { color: '#ef4444' }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      {/* Button Navigation */}
      <ButtonNav
        activeTab={'loans'}
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

export default Index;

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
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    paddingLeft: 4,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  /* SUMMARY */
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  summaryCard: {
    width: '48%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.card,
  },

  /* SEARCH */
  searchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 8,
  },
  searchHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  searchLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  searchRow: {
    flexDirection: 'row',
  },
  searchTypeBox: {
    width: 110,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#f9fafb',
    height: 36,
  },
  searchTypeText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  searchInputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9fafb',
    height: 36,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 13,
    color: COLORS.textDark,
    paddingVertical: 0,
  },
  addLoanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  addLoanText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },

  /* STATUS TABS */
  statusTabsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingRight: 8,
  },
  statusTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
  },
  statusTabActive: {
    backgroundColor: '#e5f9ec',
    borderColor: COLORS.primary,
  },
  statusTabText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  statusTabTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  /* EMPTY STATE */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  /* APPLICATION CARD */
  appCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  appMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e3f6eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  appAvatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  appTextBlock: {
    flex: 1,
  },
  memberName: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  applicationCode: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 1,
  },
  appInfoMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoValueMini: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  appRightBlock: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '600',
  },

  /* ACTION ROW WITH DATE */
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#edf0f6',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#edf0f6',
    marginLeft: 6,
    backgroundColor: '#ffffff',
  },
  actionText: {
    fontSize: 10,
    fontWeight: '600',
  },
});