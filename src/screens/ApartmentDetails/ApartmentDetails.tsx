import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Apartment from "../../models/Apartment";
import axios from "axios";

const ApartmentDetails = ({route, navigation}) => {
  const [apartment, setApartment] = useState<Apartment>();
  const { apartmentId } = route.params;

  useEffect(() => {
    async function fetchApartmentById() {
      try {
        const res = await axios(`http://192.168.1.15:5000/api/v1/apartments/${apartmentId}`);
        setApartment(res.data.response);
      } catch (error) {
        throw new Error('Error fetching apartment by id');
      }
    }
    fetchApartmentById();
  }, [apartmentId]);

    // set the title of the screen
    useEffect(() => {
      if (apartment) {
        navigation.setOptions({ title: apartment.title });
      }
    }, [apartment, navigation]);

  return (
    <View>
        <Image
        style={styles.apartmentImage}
        source={{
          uri: apartment?.imageUrl,
        }}
        />
      <Text>Apartment Details</Text>
      <Text>Apartment ID: {apartmentId}</Text>
      <Text>title ID:{apartment?.title}</Text>
      <Text>price:{apartment?.price}</Text>
      <Text>area:{apartment?.area}</Text>
      <Text>city:{apartment?.city}</Text>
      <Text>compound:{apartment?.compound}</Text>
      <Text>Description:{apartment?.description.reception} reception, {apartment?.description.rooms} rooms, {apartment?.description.bathrooms} bathrooms, {apartment?.description.kitchens} kitchens.</Text>
      <Text>PhoneNumber: {apartment?.phoneNumber}</Text>
      <Text>Payment Type:{apartment?.paymentType}</Text>
      <Text>Finished:{apartment?.finished ? 'Yes' : 'No'}</Text>

    </View>
  );
}


const styles = StyleSheet.create({
  apartmentImage: {
    width: '100%',
    height: 250,
  },
});

export default ApartmentDetails;