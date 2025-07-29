import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

const ImprovedWeightPickerModal = memo(({ visible, onClose, onWeightSelect, styles }) => {
  // Weight ranges for easier selection
  const weightRanges = [
    { label: '80-120 lbs', min: 80, max: 120, step: 5 },
    { label: '125-180 lbs', min: 125, max: 180, step: 5 },
    { label: '185-250 lbs', min: 185, max: 250, step: 5 },
    { label: '255-350 lbs', min: 255, max: 350, step: 10 },
    { label: '360-500 lbs', min: 360, max: 500, step: 10 }
  ];
  
  const handleWeightSelect = (weight) => {
    onWeightSelect(weight);
    onClose();
  };
  
  const renderWeightRange = (range) => {
    const weights = [];
    for (let w = range.min; w <= range.max; w += range.step) {
      weights.push(w);
    }
    
    return (
      <View key={range.label} style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1A1A1A',
          marginBottom: 12,
          textAlign: 'center'
        }}>
          {range.label}
        </Text>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          {weights.map((weight) => (
            <TouchableOpacity
              key={weight}
              style={{
                backgroundColor: '#007AFF',
                borderRadius: 8,
                padding: 12,
                margin: 2,
                width: '18%',
                alignItems: 'center'
              }}
              onPress={() => handleWeightSelect(weight)}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#FFFFFF'
              }}>
                {weight}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          width: '100%',
          maxWidth: 400,
          maxHeight: '80%'
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1A1A1A'
            }}>
              Select Weight
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              style={{
                backgroundColor: '#F8F9FA',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: 20,
                color: '#6C757D'
              }}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={{ maxHeight: 500 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{
              fontSize: 14,
              color: '#6C757D',
              textAlign: 'center',
              marginBottom: 20
            }}>
              Tap any weight to select it
            </Text>
            {weightRanges.map(renderWeightRange)}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

ImprovedWeightPickerModal.displayName = 'ImprovedWeightPickerModal';

export default ImprovedWeightPickerModal;
