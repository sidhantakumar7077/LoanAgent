// src/Screen/DisbursedLoan/Index.js
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

const summaryCards = [
  {
    label: 'Total Disbursed Loan',
    value: '₹ 65,500.00',
    colorFrom: '#3b82f6',
    colorTo: '#2563eb',
    icon: 'shopping-cart',
  },
  {
    label: 'Total Repayment',
    value: '₹ 69,894.44',
    colorFrom: '#fb7185',
    colorTo: '#ef4444',
    icon: 'attach-money',
  },
  {
    label: 'Interest Collection',
    value: '₹ 0.00',
    colorFrom: '#facc15',
    colorTo: '#eab308',
    icon: 'percent',
  },
  {
    label: 'Principal Collection',
    value: '₹ 0.00',
    colorFrom: COLORS.primary,
    colorTo: COLORS.accent,
    icon: 'paid',
  },
];

const disbursedData = [
  {
    id: 'LD020019',
    memberName: 'Mr. Sukumar Bag',
    mobile: '8250754644',
    branch: 'Mugberia (BR0002)',
    principal: '₹ 4,000.00',
    interest: '₹ 298.00',
    repayment: '₹ 4,298.00',
    repaid: '₹ 0.00',
    date: '2019-11-22',
    status: 'Active',
  },
  {
    id: 'LD020018',
    memberName: 'Mr. Sukumar Bag',
    mobile: '8250754644',
    branch: 'Mugberia (BR0002)',
    principal: '₹ 2,000.00',
    interest: '₹ 44.00',
    repayment: '₹ 2,044.00',
    repaid: '₹ 0.00',
    date: '2019-11-22',
    status: 'Active',
  },
  {
    id: 'LD020026',
    memberName: 'Mr. Santanu Manna',
    mobile: '7845748596',
    branch: 'Mugberia (BR0002)',
    principal: '₹ 3,000.00',
    interest: '₹ 61.00',
    repayment: '₹ 3,061.00',
    repaid: '₹ 0.00',
    date: '2019-11-22',
    status: 'Closed',
  },
];

const statusTabs = ['All', 'Active', 'Closed', 'Overdue'];

const statusChipColors = {
  Active: { bg: '#dcfce7', text: '#166534' },
  Closed: { bg: '#e5e7eb', text: '#374151' },
  Overdue: { bg: '#fee2e2', text: '#b91c1c' },
};

const Index = () => {
  const navigation = useNavigation();
  const [activeStatus, setActiveStatus] = useState('All');
  const [scheme] = useState('Loan scheme');
  const [loanStatus] = useState('Active');
  const [keyword, setKeyword] = useState('');

  const filteredDisbursed = disbursedData.filter(item => {
    const matchTab =
      activeStatus === 'All' ? true : item.status === activeStatus;

    const matchKeyword =
      keyword.trim().length === 0
        ? true
        : item.id.toLowerCase().includes(keyword.toLowerCase()) ||
        item.memberName.toLowerCase().includes(keyword.toLowerCase()) ||
        item.mobile.includes(keyword);

    return matchTab && matchKeyword;
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
          <Text style={styles.appName}>Disbursed Loans</Text>
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

        {/* SEARCH / FILTERS */}
        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>Advance Search</Text>

          <Text style={styles.searchLabel}>Search By Keyword</Text>

          <View style={styles.searchRow}>
            <TouchableOpacity style={styles.searchTypeBox}>
              <Text style={styles.searchTypeText}>Search type ▾</Text>
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

          <View style={styles.filterRow}>
            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Loan Scheme</Text>
              <TouchableOpacity style={styles.filterBox}>
                <Text style={styles.filterText}>{scheme} ▾</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Loan Status</Text>
              <TouchableOpacity style={styles.filterBox}>
                <Text style={styles.filterText}>{loanStatus} ▾</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* STATUS TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 12 }}
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

        {/* LIST OR EMPTY */}
        {filteredDisbursed.length === 0 ? (
          <View className={styles.emptyState}>
            <MaterialIcons
              name="inbox"
              size={42}
              color={COLORS.textLight}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.emptyTitle}>
              No {activeStatus} disbursed loans
            </Text>
            <Text style={styles.emptySubtitle}>
              Try a different filter or keyword to see results.
            </Text>
          </View>
        ) : (
          filteredDisbursed.map(item => {
            const chip =
              statusChipColors[item.status] || statusChipColors.Active;

            return (
              <View key={item.id} style={styles.loanCard}>
                {/* Row 1: Loan ID + Status chip */}
                <View style={styles.loanRowTop}>
                  <Text style={styles.loanIdText}>{item.id}</Text>
                  <View
                    style={[
                      styles.statusChip,
                      { backgroundColor: chip.bg },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: chip.text },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusChipText,
                        { color: chip.text },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                {/* Row 2: Avatar + Member name, Date */}
                <View style={styles.loanRowMiddle}>
                  <View style={styles.personBlock}>
                    <View style={styles.loanAvatar}>
                      <Text style={styles.loanAvatarText}>
                        {item.memberName.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.memberName} numberOfLines={1}>
                        {item.memberName}
                      </Text>
                      <View style={styles.mobileRow}>
                        <MaterialIcons
                          name="phone-iphone"
                          size={14}
                          color={COLORS.textLight}
                          style={{ marginRight: 3 }}
                        />
                        <Text style={styles.mobileText}>{item.mobile}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.dateRow}>
                    <MaterialIcons
                      name="event"
                      size={16}
                      color={COLORS.textLight}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>

                {/* Row 3: Repayment + View icon */}
                <View style={styles.loanRowBottom}>
                  <View style={styles.repaymentPill}>
                    <Text style={styles.repaymentLabel}>Repayment</Text>
                    <Text style={styles.repaymentValue}>
                      {item.repayment}
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.viewButton}>
                    <MaterialIcons
                      name="visibility"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
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
  searchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  searchLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 8,
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

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  filterField: {
    flex: 1,
    marginRight: 8,
  },
  filterLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  filterBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  filterText: {
    fontSize: 12,
    color: COLORS.textLight,
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

  /* EMPTY */
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

  /* LOAN CARDS – simple but richer */
  loanCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  loanRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  loanIdText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
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

  loanRowMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  personBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  loanAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e3f6eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  loanAvatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  memberName: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  mobileText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textLight,
  },

  loanRowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  repaymentPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e5f9ec',
    flexDirection: 'row',
    alignItems: 'center',
  },
  repaymentLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginRight: 4,
  },
  repaymentValue: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  viewButton: {
    padding: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e3f6eb',
    backgroundColor: '#f4fff7',
  },
});