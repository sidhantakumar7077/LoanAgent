import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = {
  primary: '#51b05e',
  accent: '#2abc9d',
  background: '#f5f7fb',
  white: '#ffffff',
};

const Index = () => {
  // Logo animation
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // App name letters (ESMS) – animate one by one
  const appName = 'AGENT360';
  const letterAnims = useRef(
    appName.split('').map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(12),
    }))
  ).current;

  // Tagline + footer fade-in
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo pop-in
    const logoAnim = Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    // Letters one-by-one
    const lettersAnim = Animated.stagger(
      150,
      letterAnims.map(({ opacity, translateY }) =>
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      )
    );

    // Tagline + footer
    const textExtras = Animated.parallel([
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    Animated.sequence([logoAnim, lettersAnim, textExtras]).start();
  }, [logoScale, logoOpacity, letterAnims, taglineOpacity, footerOpacity]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <LinearGradient
        colors={[COLORS.primary, COLORS.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Inner gradient logo circle */}
          <LinearGradient
            colors={['#ffffff', 'rgba(255,255,255,0.85)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Text style={styles.logoText}>360</Text>
          </LinearGradient>
        </Animated.View>

        {/* App name letters animated one by one */}
        <View style={styles.appNameRow}>
          {appName.split('').map((char, index) => {
            const { opacity, translateY } = letterAnims[index];
            return (
              <Animated.Text
                key={`${char}-${index}`}
                style={[
                  styles.appNameLetter,
                  {
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                {char}
              </Animated.Text>
            );
          })}
        </View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.textBlock,
            {
              opacity: taglineOpacity,
              transform: [
                {
                  translateY: taglineOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.tagline}>Smart, simple loan management.</Text>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: footerOpacity,
            },
          ]}
        >
          <Text style={styles.footerText}>Powered by Scriptlab Finance Group</Text>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Logo
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },

  // App name row
  appNameRow: {
    flexDirection: 'row',
    marginTop: 28,
  },
  appNameLetter: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 4,
  },

  textBlock: {
    marginTop: 10,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});