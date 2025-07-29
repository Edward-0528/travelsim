import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import OptimizedButton from './common/OptimizedButton';

const DashboardScreen = ({ user, onLogout, loading, styles }) => {
  const { count, setCount } = useAppContext();
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch user fitness profile
  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { supabase } = await import('../supabaseConfig');
      const { data, error } = await supabase
        .from('user_fitness_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const calculateBMI = () => {
    if (!userProfile) return 0;
    return userProfile.bmi || 0;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3182ce' };
    if (bmi < 25) return { category: 'Normal', color: '#38a169' };
    if (bmi < 30) return { category: 'Overweight', color: '#d69e2e' };
    return { category: 'Obese', color: '#e53e3e' };
  };

  const getGoalText = (goalId) => {
    const goals = {
      'lose_weight': 'Lose Weight',
      'gain_muscle': 'Gain Muscle',
      'improve_endurance': 'Improve Endurance',
      'general_fitness': 'General Fitness',
      'strength_training': 'Strength Training'
    };
    return goals[goalId] || 'General Fitness';
  };

  const renderOverview = () => {
    const bmi = calculateBMI();
    const bmiInfo = getBMICategory(bmi);
    
    return (
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Welcome Section - Compact */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1A1A1A',
            marginBottom: 4
          }}>
            Welcome back, {user.user_metadata?.first_name || 'Champion'}! 💪
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6C757D'
          }}>
            Ready to crush your fitness goals?
          </Text>
        </View>

        {/* Quick Stats Cards - Compact */}
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <View style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            borderRadius: 12,
            padding: 12,
            marginRight: 8,
            borderLeftWidth: 4,
            borderLeftColor: bmiInfo.color
          }}>
            <Text style={{ fontSize: 11, color: '#6C757D', marginBottom: 2 }}>BMI</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' }}>{bmi}</Text>
            <Text style={{ fontSize: 11, color: bmiInfo.color }}>{bmiInfo.category}</Text>
          </View>
          
          <View style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            borderRadius: 12,
            padding: 12,
            marginLeft: 8,
            borderLeftWidth: 4,
            borderLeftColor: '#007AFF'
          }}>
            <Text style={{ fontSize: 11, color: '#6C757D', marginBottom: 2 }}>Age</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' }}>
              {userProfile?.age || 0}
            </Text>
            <Text style={{ fontSize: 11, color: '#007AFF' }}>Years</Text>
          </View>
        </View>

        {/* Current Goal - Compact */}
        {userProfile && (
          <View style={{
            backgroundColor: '#E3F2FD',
            borderRadius: 12,
            padding: 12,
            marginBottom: 16
          }}>
            <Text style={{ fontSize: 12, color: '#1976D2', fontWeight: '600', marginBottom: 4 }}>
              Current Goal
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' }}>
              {getGoalText(userProfile.main_goal)}
            </Text>
            <Text style={{ fontSize: 12, color: '#424242', marginTop: 2 }}>
              Height: {Math.floor(userProfile.height_inches / 12)}'{userProfile.height_inches % 12}" • 
              Weight: {userProfile.weight_pounds} lbs • 
              Goal: {userProfile.goal_weight_pounds} lbs
            </Text>
          </View>
        )}

        {/* Quick Actions - Compact */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1A1A1A' }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#007AFF',
                borderRadius: 12,
                padding: 12,
                width: '48%',
                alignItems: 'center',
                marginBottom: 8
              }}
              onPress={() => setActiveTab('workouts')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>🏋️ Workouts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#34C759',
                borderRadius: 12,
                padding: 12,
                width: '48%',
                alignItems: 'center',
                marginBottom: 8
              }}
              onPress={() => setActiveTab('calories')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>🍎 Calories</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#FF9500',
                borderRadius: 12,
                padding: 12,
                width: '48%',
                alignItems: 'center',
                marginBottom: 8
              }}
              onPress={() => setActiveTab('progress')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>📊 Progress</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#AF52DE',
                borderRadius: 12,
                padding: 12,
                width: '48%',
                alignItems: 'center',
                marginBottom: 8
              }}
              onPress={() => setActiveTab('leaderboard')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>🏆 Rankings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderWorkouts = () => (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' }}>
        🏋️ Workout Plans
      </Text>
      
      <View style={{
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#1A1A1A' }}>
          Today's Workout
        </Text>
        <Text style={{ color: '#6C757D', marginBottom: 16 }}>
          {getGoalText(userProfile?.main_goal)} Focus
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center'
          }}
          onPress={() => Alert.alert('Coming Soon!', 'Workout plans feature will be available soon!')}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Start Workout</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: '#E8F5E8',
        borderRadius: 12,
        padding: 20
      }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1A1A1A' }}>
          Weekly Progress
        </Text>
        <Text style={{ color: '#34C759', fontSize: 14 }}>
          3 out of 5 workouts completed this week
        </Text>
      </View>
    </ScrollView>
  );

  const renderCalories = () => (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' }}>
        🍎 Calorie Tracker
      </Text>
      
      <View style={{
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1A1A1A' }}>
          Today's Intake
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: '#6C757D' }}>Consumed</Text>
          <Text style={{ fontWeight: '600', color: '#1A1A1A' }}>1,250 / 2,000 cal</Text>
        </View>
        <View style={{
          backgroundColor: '#E9ECEF',
          height: 8,
          borderRadius: 4,
          marginBottom: 16
        }}>
          <View style={{
            backgroundColor: '#34C759',
            height: 8,
            borderRadius: 4,
            width: '62%'
          }} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#34C759',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center'
          }}
          onPress={() => Alert.alert('Coming Soon!', 'Calorie tracking feature will be available soon!')}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Log Food</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderProgress = () => (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' }}>
        📊 Weight Progress
      </Text>
      
      <View style={{
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1A1A1A' }}>
          Current Stats
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: '#6C757D' }}>Current Weight</Text>
          <Text style={{ fontWeight: '600', color: '#1A1A1A' }}>
            {userProfile?.weight_pounds || 0} lbs
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: '#6C757D' }}>Goal Weight</Text>
          <Text style={{ fontWeight: '600', color: '#007AFF' }}>
            {userProfile?.goal_weight_pounds || 0} lbs
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#6C757D' }}>BMI</Text>
          <Text style={{ fontWeight: '600', color: getBMICategory(calculateBMI()).color }}>
            {calculateBMI()} ({getBMICategory(calculateBMI()).category})
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF9500',
          borderRadius: 12,
          padding: 16,
          alignItems: 'center'
        }}
        onPress={() => Alert.alert('Coming Soon!', 'Weight tracking feature will be available soon!')}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>Update Weight</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' }}>
        🏆 Leaderboard
      </Text>
      
      <View style={{
        backgroundColor: '#FFF3CD',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#1A1A1A' }}>
          Your Ranking
        </Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#F59E0B', marginBottom: 4 }}>
          #42
        </Text>
        <Text style={{ color: '#92400E' }}>
          Out of 1,247 active users
        </Text>
      </View>

      <View style={{
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20
      }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#1A1A1A' }}>
          This Week's Top 3
        </Text>
        
        {[
          { rank: 1, name: 'Alex Chen', points: 2847 },
          { rank: 2, name: 'Sarah Williams', points: 2623 },
          { rank: 3, name: 'Mike Rodriguez', points: 2456 }
        ].map((user, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: index < 2 ? 1 : 0,
            borderBottomColor: '#E9ECEF'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: user.rank === 1 ? '#F59E0B' : user.rank === 2 ? '#6B7280' : '#92400E',
              width: 30
            }}>
              #{user.rank}
            </Text>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#1A1A1A' }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#6C757D' }}>
              {user.points} pts
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'workouts':
        return renderWorkouts();
      case 'calories':
        return renderCalories();
      case 'progress':
        return renderProgress();
      case 'leaderboard':
        return renderLeaderboard();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      {/* Navigation Tabs */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 8,
        paddingTop: 6,
        paddingBottom: 4
      }}>
        {[
          { key: 'overview', label: '🏠', title: 'Home' },
          { key: 'workouts', label: '🏋️', title: 'Workouts' },
          { key: 'calories', label: '🍎', title: 'Calories' },
          { key: 'progress', label: '📊', title: 'Progress' },
          { key: 'leaderboard', label: '🏆', title: 'Rankings' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 4,
              backgroundColor: activeTab === tab.key ? '#FFFFFF' : 'transparent',
              borderRadius: 8,
              marginHorizontal: 2
            }}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={{ fontSize: 18, marginBottom: 2 }}>{tab.label}</Text>
            <Text style={{
              fontSize: 10,
              color: activeTab === tab.key ? '#007AFF' : '#6C757D',
              fontWeight: activeTab === tab.key ? '600' : '400'
            }}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Logout Button */}
      <View style={{ padding: 12, backgroundColor: '#F8F9FA' }}>
        <OptimizedButton 
          style={{
            backgroundColor: '#DC3545',
            borderRadius: 12,
            padding: 12,
            alignItems: 'center'
          }} 
          onPress={onLogout}
          disabled={loading}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
            {loading ? 'Signing out...' : 'Logout'}
          </Text>
        </OptimizedButton>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
};

export default DashboardScreen;
