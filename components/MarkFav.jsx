import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../constants/Colors';

// Este componente permite ao usuário marcar um animal de estimação como favorito. 
// Ele recupera a lista de favoritos do usuário a partir do Firestore e permite 
// adicionar o pet atual a essa lista. O ícone de favorito é exibido e atualizado 
// conforme o estado da lista de favoritos.


export default function MarkFavorite({ pet }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        if (user) {
            GetFav();
        }
    }, [user]);

    const GetFav = async () => {
        try {
            const result = await Shared.GetFavList(user);
            setFavList(result?.favorites ? result?.favorites : []);
        } catch (error) {
            console.error('Error fetching favorite list:', error);
        }
    };

    const AddToFav = async () => {
        try {
            const favResult = [...favList, pet.id];
            await Shared.UpdateFav(user, favResult);
            setFavList(favResult); // Update the state immediately
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFav = async () => {
        try {
            const favResult = favList.filter(item => item !== pet.id);
            await Shared.UpdateFav(user, favResult);
            setFavList(favResult); // Update the state immediately
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <View>
            {favList.includes(pet.id) ? (
                <Pressable onPress={removeFromFav}>
                    <Ionicons name="heart" size={35} color={Colors.PINK} />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={35} color={Colors.PURPLE} />
                </Pressable>
            )}
        </View>
    );
}