import { NeuImage } from "@/components/common/NeuImage";
import { StyleSheet, View } from "react-native";

export const ImageContainer = ({ image }: { image: string }) => {
  return (
    <View style={subStyle.imageProperty}>
      <NeuImage image={image} />
    </View>
  );
};

const subStyle = StyleSheet.create({
  imageProperty: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200
  }
});
