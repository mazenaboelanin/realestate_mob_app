import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      {/* <Text>Apartments Listing</Text> */}
      {apartments.map((apartment: any) => ( 
      <Pressable 
        key={apartment?.id} 
        style={styles.pressableContainer} 
        onPress={handlePressedCard.bind(null, apartment.id)}>
        <Text>{apartment?.title}</Text>
      </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableContainer: {
    height:100,
    backgroundColor: 'beige',
    marginBottom: 10,
  }
});



export default ApartmentsListing;