import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import ButtonNav from '../../Navigation/ButtonNav';

const Index = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>Profile</Text>
        <Text style={styles.placeholderSub}>Screen coming soon</Text>
      </View>
      <ButtonNav
        activeTab={'profile'}
        onTabPress={(key) => {
          if (key === 'home') navigation.navigate('Home');
          if (key === 'loans') navigation.navigate('LoanRequest');
          if (key === 'users') navigation.navigate('Users');
          if (key === 'profile') navigation.navigate('Profile');
        }}
      />
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fb',
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2933',
    marginBottom: 8,
  },
  placeholderSub: {
    fontSize: 14,
    color: '#9aa5b1',
  },
})