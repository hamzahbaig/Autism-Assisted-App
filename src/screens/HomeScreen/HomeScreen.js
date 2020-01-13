import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import CardBox from '../../components/CardBox';
import {englishFonts, urduFonts} from '../../assets/fonts/Fonts';
import eng from '../../content/eng.json';
import urdu from '../../content/urdu.json';
import Settings from '../../settings/Settings.json';
import {engFontSizes, urduFontSizes} from '../../settings/FontSizes';
import Header from '../../components/Header';
import {NavigationEvents} from 'react-navigation';
import img1 from '../../assets/images/1.png';
import img2 from '../../assets/images/2.png';
import img3 from '../../assets/images/3.png';
import img4 from '../../assets/images/4.png';

const phoneHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  state = {
    content:
      Settings.currentLanguage == 'english' ? eng.homeScreen : urdu.homeScreen,
    fontSize:
      Settings.currentLanguage == 'english'
        ? engFontSizes.eng_M
        : urduFontSizes.urdu_M,
    fontFamily: Settings.currentLanguage == 'english' ? null : urduFonts,
    contrast: Settings.currentContrast,
  };

  fontSizeHandler = key => {
    if (Settings.currentLanguage == 'english') {
      if (key == 's') {
        Settings.currentFontSettings = 's';
        this.setState({fontSize: engFontSizes.eng_S});
      } else if (key == 'm') {
        Settings.currentFontSettings = 'm';
        this.setState({fontSize: engFontSizes.eng_M});
      } else if (key == 'l') {
        Settings.currentFontSettings = 'l';
        this.setState({fontSize: engFontSizes.eng_L});
      }
    } else if (Settings.currentLanguage == 'urdu') {
      if (key == 's') {
        Settings.currentFontSettings = 's';
        this.setState({fontSize: urduFontSizes.urdu_S});
      } else if (key == 'm') {
        Settings.currentFontSettings = 'm';
        this.setState({fontSize: urduFontSizes.urdu_M});
      } else if (key == 'l') {
        Settings.currentFontSettings = 'l';
        this.setState({fontSize: urduFontSizes.urdu_L});
      }
    }
  };

  changeLanguage = () => {
    if (Settings.currentLanguage == 'english') {
      Settings.currentLanguage = 'urdu';
      Settings.currentFontSettings = 'm';
      this.setState({content: urdu.homeScreen, fontSize: urduFontSizes.urdu_M});
    } else if (Settings.currentLanguage == 'urdu') {
      Settings.currentLanguage = 'english';
      Settings.currentFontSettings = 'm';
      this.setState({content: eng.homeScreen, fontSize: engFontSizes.eng_M});
    }
  };

  calculateFontFamily = key => {
    if (Settings.currentLanguage == 'urdu') {
      return urduFonts.nafees;
    } else if (Settings.currentLanguage == 'english') {
      if (key == 'black') {
        return englishFonts.avenirBlack;
      } else if (key == 'medium') {
        return englishFonts.avenirMedium;
      } else if (key == 'light') {
        return englishFonts.avenirLight;
      } else if (key == 'heavy') {
        return englishFonts.avenirHeavy;
      }
    }
  };

  contrastChanger = key => {
    if (key == '#FACC56') {
      Settings.currentContrast = '#FACC56';
      this.setState({contrast: '#FACC56'});
    } else if (key == '#ACD7E5') {
      Settings.currentContrast = '#ACD7E5';
      this.setState({contrast: '#ACD7E5'});
    } else {
      Settings.currentContrast = null;
      this.setState({contrast: null});
    }
  };
  intialise = () => {
    this.contrastChanger(Settings.currentContrast);
    this.fontSizeHandler(Settings.currentFontSettings);
    this.setState({
      content:
        Settings.currentLanguage == 'english'
          ? eng.homeScreen
          : urdu.homeScreen,
    });
  };

  componentDidMount() {
    this.intialise();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.contrast,
          width: '100%',
          height: '100%',
        }}>
        <NavigationEvents onWillFocus={() => this.intialise()} />
        <View style={styles.container}>
          <Header
            languageSettings={Settings.currentLanguage}
            fontSettings={Settings.currentFontSettings}
            contrast={Settings.currentContrast}
            fontSizeHandler={this.fontSizeHandler}
            changeLanguage={this.changeLanguage}
            fontFamilyHeading={englishFonts.avenirMedium}
            fontFamilyOption={englishFonts.avenirMedium}
            fontFamilyUrdu={urduFonts.nafees}
            reverseFlag={Settings.currentLanguage}
            fontSize={this.state.fontSize}
            contrastChanger={this.contrastChanger}
          />
          <StatusBar backgroundColor="#2C326F" barStyle="light-content" />
          <View
            style={[
              styles.mainHeadingContainer,
              Settings.currentLanguage == 'urdu'
                ? Platform.OS == 'ios'
                  ? {alignItems: 'flex-end'}
                  : null
                : null,
            ]}>
            <Text
              style={[
                styles.mainHeadingFont,
                {
                  fontSize: this.state.fontSize.heading,
                  fontFamily: this.calculateFontFamily('black'),
                },
              ]}>
              {this.state.content['title']}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <CardBox
              image={img1}
              currentLanguage={Settings.currentLanguage}
              title={this.state.content['category'][0]}
              fontSize={this.state.fontSize}
              fontFamily={this.calculateFontFamily('medium')}
              onClick={() =>
                this.props.navigation.navigate('AutismBasics', {
                  refresh: this.intialise,
                })
              }
            />
            <CardBox
              image={img2}
              currentLanguage={Settings.currentLanguage}
              title={this.state.content['category'][1]}
              fontSize={this.state.fontSize}
              fontFamily={this.calculateFontFamily('medium')}
              onClick={() =>
                this.props.navigation.navigate('AutismInChildren', {
                  refresh: this.intialise,
                })
              }
            />
          </View>
          <View style={styles.rowContainer}>
            <CardBox
              image={img3}
              currentLanguage={Settings.currentLanguage}
              title={this.state.content['category'][2]}
              fontSize={this.state.fontSize}
              fontFamily={this.calculateFontFamily('medium')}
              onClick={() =>
                this.props.navigation.navigate('AutismInAdults', {
                  refresh: this.intialise,
                })
              }
            />
            <CardBox
              image={img4}
              currentLanguage={Settings.currentLanguage}
              title={this.state.content['category'][3]}
              fontSize={this.state.fontSize}
              fontFamily={this.calculateFontFamily('medium')}
              onClick={() =>
                this.props.navigation.navigate('FAQs', {
                  refresh: this.intialise,
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainHeadingContainer: {
    width: '100%',
    height: '4%',
    marginTop: 20,
  },
  mainHeadingFont: {
    color: '#707070',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: phoneHeight * 0.22,
    marginTop: 20,
  },
});