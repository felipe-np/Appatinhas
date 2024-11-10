import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db, storage } from "./../../config/FirebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function addNewPet() {

// Esta página permite ao usuário adicionar um novo animal de estimação. 
// O usuário pode preencher um formulário com informações sobre o pet, 
// selecionar uma imagem e escolher a categoria e o sexo do animal. 
// As informações são então enviadas para o Firestore e a imagem é 
// carregada no Firebase Storage.


  const navigation = useNavigation();
  const [formData, setFormData] = useState(
        {category:'Dogs', sex:'Macho'}
  );
  const [gender, setGender] = useState();
  const [categorylist, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image,setImage]=useState();
  const [loader,setLoader]=useState(false);
  const router=useRouter();

  const {user}=useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Adicionar novo Pet",
    });
    GetCategorias();
  }, []);

  /**   Usado para pegar categoria */
  const GetCategorias = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categorylist) => [...categorylist, doc.data()]);
    });
  };
   // Função para pegar imagem da galeria
  const imagePicker=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
  }

  const handleInputCHange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit=()=> {
    if(Object.keys(formData).length!=8)
        {
      ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
      return;
    }
    setLoader(true);
    UploadImage();
}
// Função para fazer upload da imagem
    const UploadImage=async()=>{
        const resp=await fetch(image)
        const blobImage=await resp.blob();
        const storageRef=ref(storage,'/appatinhas/'+Date.now()+'.jpg');

        uploadBytes(storageRef,blobImage).then((snapshot)=>{
            console.log('Arquivo enviado com sucesso');
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                SaveFormData(downloadUrl);
            })
        })
        setLoader(false);
    }

    const SaveFormData=async(imageUrl)=>{
        const docID=Date.now().toString();
        await setDoc(doc(db,'Pets',docID),{
            ...formData,
            imageUrl:imageUrl,
            username:user?.fullName,
            email:user?.primaryEmailAddress.emailAddress,
            userImage:user?.imageUrl,
            id:docID
    })
    setLoader(false);
    router.replace('/(tabs)/home');
}
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "quicksand-medium",
          fontSize: 18,
        }}
      >
        Cadastre um novo Pet
      </Text>
    <Pressable onPress={imagePicker}>
      {!image?<Image
        source={require("./../../assets/images/placeholder.png")}
        style={{
          width: 80,
          height: 80,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Colors.LIGHT_PRIMARY,
        }}
      />:
      <Image source={{uri:image}} 
      style={{
        width: 80,
        height: 80,
        borderRadius: 5,
        borderColor: Colors.LIGHT_PRIMARY,
      }}/>}
    </Pressable>

      <View>
        <Text style={styles.label}>Nome do Pet *</Text>
        <TextInput
          onChangeText={(value) => handleInputCHange("name", value)}
          style={styles.input}
          placeholder="Nome do Pet"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputCHange("category", itemValue);
          }}
        >
          {categorylist.map((category,index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
            ))}
          
        </Picker>
      </View>

      <View>
        <Text style={styles.label}>Raça *</Text>
        <TextInput
          onChangeText={(value) => handleInputCHange("breed", value)}
          style={styles.input}
          placeholder="Nome da Raça"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputCHange("sex", itemValue);
          }}
        >
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Fêmea" value="Fêmea" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Idade *</Text>
        <TextInput
          onChangeText={(value) => handleInputCHange("age", value)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>

      <View>
        <Text style={styles.label}>Peso *</Text>
        <TextInput
          onChangeText={(value) => handleInputCHange("weight", value)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>

      <View>
        <Text style={styles.label}>Endereço *</Text>
        <TextInput
          onChangeText={(value) => handleInputCHange("address", value)}
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.label}>Sobre *</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputCHange("about", value)}
          style={styles.input}
          placeholder="Sobre"
        />
      </View>

      <TouchableOpacity
      onPress={onSubmit}
      style={styles.button}
      disabled={loader}>
      
      {loader?<ActivityIndicator size={'large'}/>:
        <Text
          style={{
            fontFamily: "quicksand-bold",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Cadastrar
        </Text>
}</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    fontFamily: "quicksand",
  },
  label: {
    marginVertical: 5,
    fontFamily: "quicksand",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
});
