import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

const ImprovedHeightPickerModal = memo(({ visible, onClose, onHeightSelect, styles }) => {
  const [selectedFeet, setSelectedFeet] = useState(null);
  
  const feetOptions = [4, 5, 6, 7, 8];
  const inchesOptions = Array.from({length: 12}, (_, i) => i);
  
  const handleHeightSelect = (feet, inches) => {
    onHeightSelect(feet, inches);
    onClose();
    setSelectedFeet(null);
  };
  
  const renderFeetSelector = () => (
    <View>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 20
      }}>
        Select Feet
      </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
      }}>
        {feetOptions.map((feet) => (
          <TouchableOpacity
            key={feet}
            style={{
              backgroundColor: '#F8F9FA',
              borderColor: '#E9ECEF',
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              margin: 6,
              width: '25%',
              alignItems: 'center',
              minHeight: 70,
              justifyContent: 'center'
            }}
            onPress={() => setSelectedFeet(feet)}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#1A1A1A',
              marginBottom: 2,
              textAlign: 'center',
              numberOfLines: 1
            }}>
              {feet}
            </Text>
            <Text style={{
              fontSize: 13,
              color: '#6C757D',
              textAlign: 'center',
              numberOfLines: 1
            }}>
              feet
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  const renderInchesSelector = () => (
    <View>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 20
      }}>
        Select Inches ({selectedFeet} feet)
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#F8F9FA',
          borderColor: '#E9ECEF',
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
          alignItems: 'center'
        }}
        onPress={() => setSelectedFeet(null)}
        activeOpacity={0.7}
      >
        <Text style={{
          fontSize: 14,
          color: '#6C757D'
        }}>
          ← Back to Feet
        </Text>
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 5
      }}>
        {inchesOptions.map((inches) => (
          <TouchableOpacity
            key={inches}
            style={{
              backgroundColor: '#007AFF',
              borderRadius: 8,
              padding: 10,
              margin: 4,
              width: '15%',
              alignItems: 'center',
              minHeight: 44,
              justifyContent: 'center'
            }}
            onPress={() => handleHeightSelect(selectedFeet, inches)}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#FFFFFF',
              textAlign: 'center',
              numberOfLines: 1
            }}>
              {inches}"
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{
          fontSize: 14,
          color: '#6C757D',
          textAlign: 'center'
        }}>
          Tap an inch value to complete your height selection
        </Text>
      </View>
    </View>
  );

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
          maxHeight: '70%'
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
              Select Height
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
            style={{ maxHeight: 300 }}
            showsVerticalScrollIndicator={false}
          >
            {!selectedFeet && renderFeetSelector()}
            {selectedFeet && renderInchesSelector()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

ImprovedHeightPickerModal.displayName = 'ImprovedHeightPickerModal';

export default ImprovedHeightPickerModal;
