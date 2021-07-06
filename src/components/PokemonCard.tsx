import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import ImageColors from "react-native-image-colors"

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { getImageColors } from '../helpers/getColores';
import { useNavigation } from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const navigation = useNavigation();

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);

    const getPosterColors = async (uri: string) => {
        const { primary } = await getImageColors(uri);

        setBgColor(primary);
    }

    useEffect(() => {
        
        // Android: dominant

        if( !isMounted.current ) return;

        getPosterColors(pokemon.picture);

        return () => {
            isMounted.current = false
        }


    }, [])


    return (
        <TouchableOpacity 
            onPress = { () => {
                navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon,
                    color: bgColor 
                } );
            } }

            activeOpacity = { 0.9 }>

            <View style = {{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style = { styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style = { styles.pokebolaContainer }>
                    <Image
                        source = { require('../assets/pokebola-blanca.png') }
                        style = { styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.picture }
                    style = { styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'red',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});