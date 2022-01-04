import React, { useMemo, useState, useCallBack } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';
import uuid from 'react-native-uuid';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import IconPlay from '../../../assets/images/epg/play.png'
import IconFavorite from '../../../assets/images/epg/favorite.png'
import IconArrowExpand from '../../../assets/images/epg/expand.png'
import IconReplay from '../../../assets/images/epg/replay.png'

const THEME_STYLES = {
  PRIMARY_BG_COLOR: '#0b004c',
  WHITE: '#FFFFFF',
  CHANNEL_NUMBER_TEXT_COLOR: '#03143f',
  PROGRAM_PROGESS_BACKGROUND_COLOR: '#727074',
  PROGRAM_PROGESS_ACTIVE_COLOR: '#c34164'
}

const PROGRAM_ITEM_HEIGHT = 32;
const SEPARATOR_LIST_ITEM_HEIGHT = 40;
const DEFAULT_SECTION_ITEMS_HEIGHT = 4 * PROGRAM_ITEM_HEIGHT + SEPARATOR_LIST_ITEM_HEIGHT;
const EXPAND_SECTION_ITEMS_HEIGHT = 4 * (4 * PROGRAM_ITEM_HEIGHT) + SEPARATOR_LIST_ITEM_HEIGHT;

const activeProgramIndex = 7;

const programsItemSectionData = [
  {
    id: uuid.v4(),
    startDateText: '21: 00',
    programName: 'Nuevo dia'
  },
  {
    id: uuid.v4(),
    startDateText: '00: 00',
    programName: 'Greys Antomy'
  },
  {
    id: uuid.v4(),
    startDateText: '01: 00',
    programName: 'Tv Notcidia'
  },
  {
    id: uuid.v4(),
    startDateText: '02: 00',
    programName: 'Habia una vez'
  },
  {
    id: uuid.v4(),
    startDateText: '03: 00',
    programName: 'Faling skye'
  },
  {
    id: uuid.v4(),
    startDateText: '04: 00',
    programName: 'Mac Geter'
  },
  {
    id: uuid.v4(),
    startDateText: '05: 00',
    programName: 'The woking Dead'
  },
  {
    id: uuid.v4(),
    startDateText: '06: 00',
    programName: 'Cri no fia  vale skye'
  },
  {
    id: uuid.v4(),
    startDateText: '07: 00',
    programName: 'La bella y la besia '
  },
  {
    id: uuid.v4(),
    startDateText: '08: 00',
    programName: 'MOh ahe'
  },
  {
    id: uuid.v4(),
    startDateText: '09: 00',
    programName: 'Rea kai time'
  },
  {
    id: uuid.v4(),
    startDateText: '13: 30',
    programName: 'Noticer aucf wife'
  },
  {
    id: uuid.v4(),
    startDateText: '17: 00',
    programName: 'Raiceres'
  },
  {
    id: uuid.v4(),
    startDateText: '18: 00',
    programName: 'Confus art ehc'
  },
  {
    id: uuid.v4(),
    startDateText: '21: 30',
    programName: 'Cloud eport dat evi'
  },
  {
    id: uuid.v4(),
    startDateText: '00: 00',
    programName: 'Notig tiger bera'
  },

];


const sectionData = [
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 0 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 1 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 2 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 3 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 4 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 5 }] },
  { title: ' ', data: [{ programs: programsItemSectionData, indexChannel: 6 }] },
]


function HomeScreen(props) {

  const [channelProgramListSelected, setChannelProgramListSelected] = useState({ indexChannel: 0, isExpand: false });

  const ProgessBarTimeLineProgramComponent = (progess) => (
    <View style={styles.progessBarContainer}>
      <View style={styles.progessBarCurrent} />
    </View>
  )

  const ProgramItemComponent = ({ item, isActive, indexProgram }) => (
    <View style={styles.programItemContainer}>
      <Text style={styles.programItemTextTime}>{item?.startDateText}</Text>
      <View style={styles.programItemIconReplayContainer}>
        {indexProgram <= activeProgramIndex && <Image source={IconReplay} style={[styles.programItemIconReplay, { opacity: indexProgram < activeProgramIndex ? 0.4 : 1 }]} />}
      </View>
      <View style={styles.programItemTitleContainer}>
        <Text style={styles.programItemTextTitle}>{item?.programName}</Text>
        {isActive && <ProgessBarTimeLineProgramComponent />}
      </View>

    </View>
  )

  const ButtonArrowExpandComponent = ({ indexChannel, isExpand }) => {

    const onToggleExpandProgramsChannel = () => {
      setChannelProgramListSelected({ indexChannel, isExpand: !channelProgramListSelected.isExpand });
    };

    return (
      <TouchableHighlight style={styles.listItemSeparatorStyle} onPress={onToggleExpandProgramsChannel}>
        <Image source={IconArrowExpand} style={[styles.itemSectionSeparatorIcon, { transform: [{ rotate: isExpand ? '180deg' : '0deg' }] }]} />
      </TouchableHighlight>

    );
  };

  const renderSectionHeaderComponent = ({ section }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderNumberChannel}>{section.indexChannel}</Text>
      <Image source={{ uri: 'https://qlobbi.com/RTEFacade/images/attachments/latina.png?width=320&height=194' }} style={styles.sectionHeaderImageChannel} />
      <Image source={IconPlay} style={styles.sectionHeaderPlayIconChannel} />
      <TouchableHighlight style={styles.sectionHeaderChannelFovoriteContainer}>
        <Image source={IconFavorite} style={styles.sectionHeaderPlayIconChannel} />
      </TouchableHighlight>
    </View>
  );

  const renderItemSectionListComponent = ({ item }) => {

    const { indexChannel } = item;
    return (
      <View style={[styles.sectionItemPrograms, { height: channelProgramListSelected.isExpand === true && channelProgramListSelected.indexChannel === indexChannel ? EXPAND_SECTION_ITEMS_HEIGHT : DEFAULT_SECTION_ITEMS_HEIGHT }]}>
        <ScrollView>
          {item?.programs?.map((program, index) => (
            <ProgramItemComponent item={program} isActive={index === activeProgramIndex} indexProgram={index} />
          ))}
        </ScrollView>
        <ButtonArrowExpandComponent indexChannel={indexChannel} isExpand={channelProgramListSelected.isExpand === true && channelProgramListSelected.indexChannel === indexChannel} />
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer} />
      <View style={styles.tvGuideContainer}>
        <SectionList
          sections={sectionData}
          renderSectionHeader={renderSectionHeaderComponent}
          renderItem={renderItemSectionListComponent}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLES.PRIMARY_BG_COLOR
  },
  filterContainer: {
    height: 50,
    backgroundColor: 'green'
  },
  tvGuideContainer: {
    flex: 1,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderContainer: {
    height: 40,
    backgroundColor: THEME_STYLES.WHITE,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderStyle: {
    backgroundColor: '#CDDC89',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionHeaderImageChannel: {
    width: 50,
    height: 30,
    backgroundColor: 'transparent'
  },
  sectionHeaderNumberChannel: {
    position: 'absolute',
    top: 2,
    left: 7,
    color: THEME_STYLES.CHANNEL_NUMBER_TEXT_COLOR,
    zIndex: 1
  },
  sectionHeaderPlayIconChannel: {
    marginLeft: 9,
    width: 17,
    height: 17
  },
  sectionHeaderChannelFovoriteContainer: {
    position: 'absolute',
    right: 6,
    backgroundColor: 'transparent',
    zIndex: 1
  },
  sectionItemPrograms: {
    // flex: 1,
  },
  programItemContainer: {
    height: PROGRAM_ITEM_HEIGHT,
    backgroundColor: THEME_STYLES.PRIMARY_BG_COLOR,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  programItemTextTime: {
    fontSize: 11,
    color: THEME_STYLES.WHITE,
    opacity: 0.4,
    minWidth: 30
  },
  programItemIconReplayContainer: {
    minWidth: 35,
    marginLeft: 3
  },
  programItemIconReplay: {
    width: 12,
    height: 12,
    opacity: 0.4
  },
  programItemTitleContainer: {
    position: 'relative',
    width: '100%'
  },
  programItemTextTitle: {
    fontSize: 12,
    color: THEME_STYLES.WHITE,
    opacity: 1,
    textAlign: 'left'
  },
  listItemSeparatorStyle: {
    height: SEPARATOR_LIST_ITEM_HEIGHT,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSectionSeparatorIcon: {
    height: 9,
    width: 15,
    resizeMode: 'cover'
  },
  progessBarContainer: {
    width: '80%',
    height: 3,
    borderRadius: 1,
    backgroundColor: THEME_STYLES.PROGRAM_PROGESS_BACKGROUND_COLOR,
  },
  progessBarCurrent: {
    width: '73%',
    height: 3,
    borderRadius: 1,
    backgroundColor: THEME_STYLES.PROGRAM_PROGESS_ACTIVE_COLOR
  }
});
