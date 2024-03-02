import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Apartment from "../../models/Apartment";

const ApartmentsListing = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

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
    <View>
      <Text>Apartments Listing</Text>
      {apartments.map((apartment: any) => ( <Text key={apartment?.id}>{apartment?.title}</Text>))}
    </View>
  );
}

export default ApartmentsListing;