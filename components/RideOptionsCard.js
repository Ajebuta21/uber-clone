import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimmeinformation } from "../slices/navSlice";

const data = [
  {
    id: "1",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "2",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "3",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 2;

const RideOptionsCard = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const traveltimeInformation = useSelector(selectTravelTimmeinformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-3`}>
          <Icon name="chevron-left" type="fontawesome" size={28} />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl font-semibold`}>
          Select a ride - {traveltimeInformation?.distance.text}
        </Text>
        <TouchableOpacity>
          <Icon
            name="chevron-left"
            type="fontawesome"
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              item.id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{traveltimeInformation?.duration.text} travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(
                    (traveltimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier)
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
