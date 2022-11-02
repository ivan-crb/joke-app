import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

const uri = "https://v2.jokeapi.dev/joke";

export default function App() {
  const [text, setText] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [id, setId] = React.useState("");

  const [programming, setProgramming] = React.useState(true);
  const [misc, setMisc] = React.useState(true);
  const [dark, setDark] = React.useState(true);
  const [pun, setPun] = React.useState(true);
  const [spooky, setSpooky] = React.useState(true);
  const [christmas, setChristmas] = React.useState(true);
  const [nsfw, setNsfw] = React.useState(true);
  const [religious, setReligious] = React.useState(true);
  const [political, setPolitical] = React.useState(true);
  const [racist, setRacist] = React.useState(true);
  const [sexist, setSexist] = React.useState(true);
  const [explicit, setExplicit] = React.useState(true);

  const [categoryImage, setCategoryImage] = React.useState(require("./assets/images/blank.png"));

  const getCategoryImage = (cat) => {
    let image = require("./assets/images/blank.png");

    switch (cat.toLowerCase()) {
      case "programming":
        image = require("./assets/images/programming.png");
        break;
      case "misc":
        image = require("./assets/images/misc.png");
        break;
      case "dark":
        image = require("./assets/images/dark.png");
        break;
      case "pun":
        image = require("./assets/images/pun.png");
        break;
      case "spooky":
        image = require("./assets/images/spooky.png");
        break;
      case "christmas":
        image = require("./assets/images/christmas.png");
        break;
    }
    return image;   
  }

  const categoriesArray = [
    {name: "Programming", value: programming},
    {name: "Miscellaneous", value: misc},
    {name: "Dark", value: dark},
    {name: "Pun", value: pun},
    {name: "Spooky", value: spooky},
    {name: "Christmas", value: christmas}
  ];

  const getCategories = () => {
    let items = 0;
    let categoriesString = "";
    for (let i = 0; i < categoriesArray.length; i++) {
      if (items == 0 && categoriesArray[i].value) {
        categoriesString += categoriesArray[i].name;
        items++;
      }
      else if (categoriesArray[i].value) {
        categoriesString += "," + categoriesArray[i].name;
      }
    }
    if (items == 0) return "any"
    else return categoriesString;
  }

  const stylesArray = [
    {name: "nsfw", value: nsfw},
    {name: "religious", value: religious},
    {name: "political", value: political},
    {name: "racist", value: racist},
    {name: "sexist", value: sexist},
    {name: "explicit", value: explicit}
  ];

  const getStyles = () => {
    let items = 0;
    let stylesString = "";
    for (let i = 0; i < stylesArray.length; i++) {
      if (items == 0 && !stylesArray[i].value) {
        stylesString += "?blacklistFlags=" + stylesArray[i].name;
        items++;
      }
      else if (!stylesArray[i].value) {
        stylesString += "," + stylesArray[i].name;
      }
    }
    return stylesString;
  }

  const fetchJoke = () => {
    fetch(uri + `/${getCategories()}${getStyles()}`).then(ans => {
      ans.json().then(a => {
        setCategory(a.category);
        setCategoryImage(getCategoryImage(a.category));
        setId("#" + a.id);
        if (a.type == "single") {
          setText(a.joke);
        }
        else {
          setText(`${a.setup}\n\n${a.delivery}`);
        }
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  } 

  let buttonStyle = (active) => {
    let color;
    if (active) color = "#98fb98";
    else color = "#dc143c";
    return {
              backgroundColor: color,
              width: "32%",
              height: 50,
              borderRadius: 5,
              margin: 2,
              padding: 15,
    };
  }
  
  return (
   
    <View style={styles.container}>
      <ScrollView style={styles.box}>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.row}>
          <TouchableOpacity style={buttonStyle(programming)}
          onPress={() => {setProgramming(!programming)}}
          >
            <Text style={styles.text}>Programming</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(misc)}
          onPress={() => {setMisc(!misc)}}
          >
            <Text style={styles.text}>Misc</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(dark)}
          onPress={() => {setDark(!dark)}}
          >
            <Text style={styles.text}>Dark</Text>           
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity style={buttonStyle(pun)}
          onPress={() => {setPun(!pun)}}
          >
            <Text style={styles.text}>Pun</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(spooky)}
          onPress={() => {setSpooky(!spooky)}}
          >
            <Text style={styles.text}>Spooky</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(christmas)}
          onPress={() => {setChristmas(!christmas)}}
          >
            <Text style={styles.text}>Christmas</Text>           
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Humour style</Text>
        <View style={styles.row}>
          <TouchableOpacity style={buttonStyle(nsfw)}
          onPress={() => {setNsfw(!nsfw)}}
          >
            <Text style={styles.text}>NSFW</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(religious)}
          onPress={() => {setReligious(!religious)}}
          >
            <Text style={styles.text}>Religious</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(political)}
          onPress={() => {setPolitical(!political)}}
          >
            <Text style={styles.text}>Political</Text>           
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={buttonStyle(racist)}
          onPress={() => {setRacist(!racist)}}
          >
            <Text style={styles.text}>Racist</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(sexist)}
          onPress={() => {setSexist(!sexist)}}
          >
            <Text style={styles.text}>Sexist</Text>           
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle(explicit)}
          onPress={() => {setExplicit(!explicit)}}
          >
            <Text style={styles.text}>Explicit</Text>           
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.generateButton}
            onPress={() => fetchJoke()}
            >
            <Text style={{textAlign: "center", fontSize: 24, fontFamily: "monospace"}}>GENERATE +</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputJoke}>
            <Text>{text}</Text>
            <View style={styles.dataBox}>
              <View style={styles.categoryBox}>
              <Image style={{height: 30, width: 30}}
                      source={categoryImage}
              />
              <Text style={{padding: 10}}>{category}</Text>
              </View>
            <Text>{id}</Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'seashell',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
  box: {
    flex: 1,
    width: "95%"
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    fontSize: 14,
    fontFamily: "sans-serif-medium"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonContainer: {
    alignItems: "center"
  },
  generateButton: {
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    width: "60%",
    aspectRatio: 16/9,
    padding: 10,
    backgroundColor: "#87ceeb",
    borderWidth: 5,
    borderColor: "#4169e1"
  },
  outputJoke: {
    fontSize: 16,
    borderWidth: 2,
    padding: 25,
    width: "100%",
    backgroundColor: "white"
  },
  dataBox: {
    marginTop: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
});