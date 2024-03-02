import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Apartment from "../../models/Apartment";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ApartmentsListing: FC = ({ navigation }) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);


  // navigate to the ApartmentDetails screen
  function handlePressedCard(apartmentId: number): void {
    navigation.navigate('Apartment Details', {
      apartmentId
    });

  }

  useEffect(() => {
    async function fetchApartments(): Promise<void> {
      try {
        const res = await axios.get('http://192.168.1.15:5000/api/v1/apartments');
        setApartments(res.data.response);

      } catch (error) {
        throw new Error('Error fetching apartments');
      }
    }
    fetchApartments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
      data={apartments} 
      renderItem={({ item }) => (
        <Pressable
          style={styles.pressableContainer}
          onPress={() => handlePressedCard(item.id)}
          >
          <Image
          style={styles.apartmentImage}
          source={{
            uri: item.imageUrl,
          }}
          />
          <View style={styles.apartmentDetails}>
          <View>
            <Text style={styles.apartmentTitle}>
              {item?.title}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Entypo name="home" size={20} color="#014382" />
            <Text style={styles.detailsHeader}>Compound</Text>
            <Text style={styles.detailValue}>{item?.compound}</Text>
          </View>

          <View style={styles.detailContainer}>
            <MaterialIcons name="currency-pound" size={20} color="#014382" />
            <Text style={styles.detailsHeader}>Price</Text>
            <Text style={styles.detailValue}>{item?.price}</Text>
          </View>
          </View>
        </Pressable>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
  },
  pressableContainer: {
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#CCC',
    shadowOffset: { width: 0, height: 3 },
  },
  apartmentImage: {
    width: '100%',
    height: 150,
  },
  apartmentData: {
    padding: 10,
  },
  apartmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color : '#014382'
  },
  apartmentDetails: {
    margin: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 5,
    color: '#014382'
  },
  detailValue: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#014382',
    color: '#014382',
  }
});



export default ApartmentsListing;