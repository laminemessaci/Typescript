import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getImageFilmFromApi, getUpcomingFilms} from '../api';
import {ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface IStyles {
  content_container: ViewStyle;
  main_container: ViewStyle;
  image: ImageStyle;
  title_text: TextStyle;
  mainContainer: ViewStyle;
  loading_container: ViewStyle;
}

interface Films {
  id: string;
  title: string;
  release_date: string;
}

const MoviesScreen: React.FC = () => {
  const [upcomingFilms, setUpcomingFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const films = async () => {
    const films = await getUpcomingFilms().then(resp => {
      setUpcomingFilms(resp.results);
    });
  };

  useEffect(() => {
    films();
    setIsLoading(false);
  }, []);

  const renderItemList = (film: Object | undefined) => {
    console.log(film);
    return (
      <TouchableOpacity
        style={styles.content_container}
        onPress={() => console.log('pressed!')}>
        <View style={styles.mainContainer}>
          <Image
            style={styles.image}
            source={{uri: getImageFilmFromApi(film?.item.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={{flex: 1}}>
              <Text style={styles.title_text}> {film?.item.title}</Text>
            </View>
            <View style={{}}>
              <Text style={{flex: 1}}>{film?.item.release_date} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!isLoading) {
    return (
      <View style={{top: 60}}>
        <FlatList
          data={upcomingFilms}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItemList}
        />
      </View>
    );
  } else {
    return <ActivityIndicator style={styles.loading_container} />;
  }
};

const styles: IStyles = {
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    //alignContent: 'flex-end',
  },

  main_container: {
    height: 190,
    flexDirection: 'row',
  },

  image: {
    width: 80,
    height: 100,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
    //justyfyContent: 'center',
    flexDirection: 'row',
  },

  title_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    position: 'absolute',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
  },
};

export default MoviesScreen;
