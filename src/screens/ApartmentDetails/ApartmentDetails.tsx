import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Apartment from "../../models/Apartment";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


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
    <ScrollView>
        <Image
        style={styles.apartmentImage}
        source={{
          uri: apartment?.imageUrl,
        }}
        />
      <View style={styles.apartmentDetails}>
      <Text style={styles.apartmentTitle}>
        {apartment?.title}
      </Text>

      <View style={styles.detailsContainer}>
        <MaterialIcons name="currency-pound" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Price</Text>
        <Text style={styles.detailValue}>{apartment?.price}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Entypo name="home" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Compound</Text>
        <Text style={styles.detailValue}>{apartment?.compound}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialIcons name="straighten" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Area</Text>
        <Text style={styles.detailValue}>{apartment?.area} m</Text>
      </View>

      <View style={styles.detailsContainer}>
        <FontAwesome5 name="city" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>City</Text>
        <Text style={styles.detailValue}>{apartment?.city}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialIcons name="payment" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Payment Type</Text>
        <Text style={styles.detailValue}>{apartment?.paymentType}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Entypo name="phone" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Phone Number</Text>
        <Text style={styles.detailValue} >{apartment?.phoneNumber}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <AntDesign name="checkcircle" size={20} color="#014382" />
        <Text style={styles.detailsHeader}>Finished</Text>
        <Text style={styles.detailValue}>{apartment?.finished ? 'Yes' : 'No'}</Text>
      </View>

      <View>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="description" size={20} color="#014382" />
          <Text style={styles.detailsHeader}>Description</Text>
        </View>
        <View style={[styles.firstRow, styles.descriptionContainer]}>
          <Text style= {styles.descriptionDetails}>{apartment?.description.reception} reception</Text>
          <Text style= {styles.descriptionDetails}>{apartment?.description.rooms} rooms </Text>
          </View>
          <View style={[styles.firstRow, styles.descriptionContainer]}>
          <Text style= {styles.descriptionDetails}>{apartment?.description.bathrooms} bathrooms</Text>
          <Text style= {styles.descriptionDetails}>{apartment?.description.kitchens} kitchens</Text>
        </View>
      </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  apartmentImage: {
    height: 250,
  },
  apartmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 10,
    padding: 10,
    color : '#1976D2'
  },
  apartmentDetails: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#014382',
    borderRadius: 10,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 5,
    color: '#014382'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  descriptionContainer: {
    marginHorizontal: 10,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'baseline',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'baseline',
  },
  descriptionDetails: {
    backgroundColor: '#014382',
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    color: 'white',
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

export default ApartmentDetails;