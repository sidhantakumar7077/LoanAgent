import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonNav from '../../Navigation/ButtonNav';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#51b05e',  // main green
  accent: '#2abc9d',   // teal
  background: '#f5f7fb',
  card: '#ffffff',
  textDark: '#1f2933',
  textLight: '#9aa5b1',
  border: '#e4e9f2',
};

const metrics = [
  { label: 'Total Balance', value: '₹ 185,859.00' },
  { label: 'Hand Balance', value: '₹ 85,859.00' },
  { label: 'Bank Balance', value: '₹ 100,000.00' },
  { label: 'Total A/C Holder', value: '2' },
  { label: 'Loan Application', value: '7' },

  { label: 'Disbursement Amount', value: '₹ 26,000.00 (5)' },
  { label: 'Outstanding Principal', value: '₹ 25,795.00' },
  { label: 'Outstanding Interest', value: '₹ 772.00' },
  { label: 'Collected Principal', value: '₹ 225.00' },
  { label: 'Collected Interest', value: '₹ 12.00' },

  { label: 'Today’s Loan Collection', value: '₹ 0.00' },
  { label: 'Today’s Savings Collection', value: '₹ 0.00' },
];

const recentCollections = [
  { id: 1, name: 'User 1 (U0302000002)', amount: '₹ 79.00', date: '2025-09-22' },
  { id: 2, name: 'User 2 (U0302000003)', amount: '₹ 125.00', date: '2025-09-22' },
  { id: 3, name: 'User 3 (U0302000004)', amount: '₹ 50.00', date: '2025-09-22' },
];

const pieData = [
  {
    name: 'Collection',
    value: 56,
    color: COLORS.primary,
    legendFontColor: COLORS.textDark,
    legendFontSize: 12,
  },
  {
    name: 'Disbursement',
    value: 30,
    color: '#ff4b4b',
    legendFontColor: COLORS.textDark,
    legendFontSize: 12,
  },
  {
    name: 'Overdue',
    value: 14,
    color: '#ffc02b',
    legendFontColor: COLORS.textDark,
    legendFontSize: 12,
  },
];

const Index = () => {

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* TOP APP BAR */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.appName}>Dashboard</Text>
          <Text style={styles.appSubtitle}>Demo01</Text>
        </View>

        <View style={styles.headerRight}>
          {/* Hamburger icon */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer && navigation.openDrawer()}
          >
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* MAIN CONTENT */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* APPLICATION OVERVIEW */}
        <Text style={styles.sectionTitle}>Application Overview</Text>
        <LinearGradient
          colors={['#ffffff', '#f1fff7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.appOverviewCard}
        >
          <View style={styles.metricGrid}>
            {metrics.map((item, index) => (
              <View key={index.toString()} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{item.label}</Text>
                <Text style={styles.metricValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* MONTHLY COLLECTION OVERVIEW */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Monthly Collection Overview
        </Text>
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  data: [10, 12, 15, 20, 18, 22, 40, 90, 220, 80, 30, 18],
                  color: (opacity = 1) => `rgba(81,176,94,${opacity})`,
                  strokeWidth: 3,
                },
              ],
            }}
            width={width - 41}
            height={230}
            bezier
            yAxisSuffix="k"
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(31, 41, 51, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(154,165,177,${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#ffffff',
              },
              propsForBackgroundLines: {
                stroke: '#edf0f6',
              },
            }}
            style={styles.chart}
            fromZero
          />
        </View>

        {/* COLLECTION VS DISBURSEMENT VS OUTSTANDING */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Collection vs Disbursement vs Outstanding Amount
        </Text>
        <View style={styles.pieCard}>
          <PieChart
            data={pieData.map(d => ({
              ...d,
              population: d.value,        // chart-kit expects "population"
            }))}
            width={width - 32}
            height={190}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: () => '#000000',
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="80"
            absolute={false}
            hasLegend={false}
          />

          <View style={styles.pieLegendContainer}>
            {pieData.map(item => (
              <View key={item.name} style={styles.legendRow}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.name} {item.value}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* RECENT COLLECTIONS (already good) */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Recent Collections
        </Text>
        <View style={styles.recentCard}>
          {recentCollections.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.collectionRow,
                index !== recentCollections.length - 1 &&
                styles.collectionRowBorder,
              ]}
            >
              <View style={styles.collectionLeft}>
                <View style={styles.collectionAvatar}>
                  <Text style={styles.collectionAvatarText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.collectionName}>{item.name}</Text>
                  <Text style={styles.collectionDate}>{item.date}</Text>
                </View>
              </View>

              <View style={styles.collectionRight}>
                <Text style={styles.collectionAmount}>{item.amount}</Text>
                <View style={styles.progressBarBg}>
                  <View style={styles.progressBarFill} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Button Navigation */}
      <ButtonNav
        activeTab={'home'}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  // HEADER
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginRight: 8,
  },
  branchLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  branchValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  menuButton: {
    paddingLeft: 4,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  menuBar: {
    height: 2,
    width: 18,
    borderRadius: 1,
    backgroundColor: '#ffffff',
    marginVertical: 1.4,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '600',
  },

  // Application overview
  appOverviewCard: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#51b05e',
    shadowOpacity: 0.16,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e6f6eb',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    width: '50%',
    padding: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  metricValue: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  // Line chart
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chart: {
    borderRadius: 16,
  },

  // Pie chart card
  pieCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pieLegendContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textDark,
  },

  // Recent collections
  recentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  collectionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  collectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  collectionAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e3f6eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  collectionAvatarText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  collectionName: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  collectionDate: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  collectionRight: {
    alignItems: 'flex-end',
  },
  collectionAmount: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBarBg: {
    width: 80,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#edf0f6',
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },

  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
});