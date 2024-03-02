import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Apartment from "../../models/Apartment";

const ApartmentsListing = ({ navigation }) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);


  function handlePressedCard(apartmentId: number) {
    console.log('Card pressed');
    navigation.navigate('Apartment Details', {
      apartmentId
    });

  }

  useEffect(() => {
    async function fetchApartments() {
      try {
        const res = await axios.get('http://192.168.1.15:5000/api/v1/apartments');
        console.log(res.data.response);
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
          <View style={styles.apartmentData}>
            <Text>{item.title}</Text>
            <Text>Compound: {item.compound}</Text>
            <Text>Price: {item.price}</Text>
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
    height: 200,
    backgroundColor: 'beige',
    marginBottom: 10,
    elevation: 5,
  },
  apartmentImage: {
    width: '100%',
    height: 100,
  },
  apartmentData: {
    padding: 10,
  }
});



export default ApartmentsListing;