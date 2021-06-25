// import React ,{useState,useEffect, Children, useRef} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   FlatList,
//   TextInput,
//   Button,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore'; 
// function App() {
 
//   const [name,setName] =useState("");
//   const [pass,setPass] =useState("");
//   const save_data = ()=>{
//     let user ={
//       name,
//        pass,
      
//     }

//   const ref = firestore().collection('user');
//   ref.add({
//     title:user,
   
//   });
  
//     alert("Thank you for Donate Blood for needed people ")

//     }
//     const get_data=()=>{
//         const data = firestore().collection("user").get();
//       console.log(data)
//     }
  
//   return (
//     <View>
//  <TextInput  onChangeText={(text)=>setName(text)} placeholder="Name" />
//  <TextInput onChangeText={(text)=>setPass(text)} placeholder="Name" />
//  <Button onPress={save_data} title="save data" />


// <Button onPress={get_data} title="get data" />
 





 
//     </View>
//   )
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App

import React, { useContext } from 'react';
import {  Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../utils/Button';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react/cjs/react.development';
import { AuthContext } from '../Components/AuthProvider';

const reviewSchema = yup.object({
    donorName: yup.string().required().min(4),
    city: yup.string().required(),
    bloodGroup: yup.string().required(),
    phoneNo: yup.string(Number).required(),
    eMail: yup.string().required(),


})

export default function DonorForm({ handle }) {
    const {  user } = useContext(AuthContext)
    console.log(user.uid);
    const FirebaseIput = (values) => {
        firestore()
            .collection(`users/UW6nTBTkLMrOUKbXcI2A/${bloodGroup}`)
            .add(values)
            .then(() => {
                console.log('User added!');
                handle();
            });
    }
    const [bloodGroup, setBloodGroup] = useState("A")
    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    donorName: '',
                    city: '',
                    bloodGroup,
                    phoneNo: '',
                    eMail: '',
                    userId: user.uid,
                }}
                validationSchema={reviewSchema}
                onSubmit={(values) => {
                    console.log(values);
                    FirebaseIput(values);
                }}
            >
                {(props) => (
                    <View>
                        <Text style={{ ...globalStyles.text, ...globalStyles.headerText }}>Donor's Form</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Donor Name"
                            onChangeText={props.handleChange('donorName')}
                            value={props.values.donorName}
                            onBlur={props.handleBlur('donorName')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.donorName && props.errors.donorName}</Text>
                        <TextInput
                            multiline minHeight={60}
                            style={globalStyles.input}
                            placeholder="Donor City"
                            onChangeText={props.handleChange('city')}
                            value={props.values.city}
                            onBlur={props.handleBlur('city')}

                        />
                        <Text style={globalStyles.errorText}>{props.touched.city && props.errors.city}</Text>
                        <Text style={{ ...globalStyles.text }}>Blood Group</Text>

                        <Picker
                            selectedValue={bloodGroup}
                            style={globalStyles.input}
                            onValueChange={(val) => {
                                setBloodGroup(val)
                                console.log(bloodGroup);
                                props.setFieldValue("bloodGroup", val)
                            }}
                        >
                            <Picker.Item label="A" value="A" />
                            <Picker.Item label="B" value="B" />
                            <Picker.Item label="AB" value="AB" />
                            <Picker.Item label="O" value="O" />
                        </Picker>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Donor Contact No."
                            onChangeText={props.handleChange('phoneNo')}
                            value={props.values.phoneNo}
                            keyboardType="number-pad"
                            onBlur={props.handleBlur('phoneNo')}

                        />
                        <Text style={globalStyles.errorText}>{props.touched.phoneNo && props.errors.phoneNo}</Text>
                        <TextInput
                            multiline minHeight={60}
                            style={globalStyles.input}
                            placeholder="Email Address"
                            onChangeText={props.handleChange('eMail')}
                            value={props.values.eMail}
                            onBlur={props.handleBlur('eMail')}

                        />
                        <Text style={globalStyles.errorText}>{props.touched.eMail && props.errors.eMail}</Text>
                        <FlatButton text={'Submit'} onPress={props.handleSubmit} />
                    </View>

                )}
            </Formik>
        </View>
    )
}


const styles = StyleSheet.create({
  hh:{
// justifyContent:"center",
// alignContent:"center",
alignItems:"center",
// borderRadius:8,

// textAlign:"center",

  },
    itemsList: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // width:350,
        // display:'flex',
        // backgroundColor:"yellow",
        // paddingTop:40,
        // paddingLeft:10,
        marginTop:20,
        display:"flex",
        flexWrap:"wrap",
        backgroundColor:"lightgray",
        borderRadius:8,
        // borderWidth:2,
        // width:300,
        // height:200,
        // borderColor:"black",
        // borderWidth:2
    },
    itemtexts:{
// backgroundColor:"#870c0c",
// color:"white",
fontSize:30,
fontWeight:"bold",
color:"white",
    },
    itemtext: {
        // borderWidth:1,
        fontSize: 18,
        fontWeight: '300',
        // color:"#c2c0b8"
        // textAlign: 'center',
    },
    btn:{
      backgroundColor:"#c77f7f",
      // fontWeight: "bold",
      // borderColor:"red",
      paddingBottom:6 ,
      marginTop:20,
      width:250,
      // marginLeft:40,
      fontSize:20,
      borderRadius:3,
      fontWeight:"bold",
      justifyContent:"center",
      alignItems:"center",
      alignContent:"center",
      height:40,
      // borderWidth:2,
      textAlign:"center",
      color:"#870c0c",
          },
          blood:{
// justifyContent:"center",
backgroundColor:"#870c0c",
borderRadius:8,
// color:"white",
alignItems:"center",
          },
          itemtextss:{
            fontSize:20,
            color:"white",
            // backgroundColor:"gray",
            fontWeight:"bold"
          } 
        
});