<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <form v-on:submit.prevent="addPerson">
      <p>Name</p>
      <input v-model="newPerson.name" type="text" placeholder='name'><br>
      <p>Email</p>
      <input v-model="newPerson.email" type="text" placeholder='email'><br>
      <p>Telephone</p>
      <input v-model="newPerson.phone" type="text" placeholder='phone'><br><br>
      <input type="submit" value="Add Person">
    </form>
    <br>
    <hr> 
    
    <div>
      <h3>People List</h3>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <td><p>Name</p></td>
            <td><p>Email</p></td>
            <td><p>Telephone</p></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people">
            <td><p v-if="person.edit == false" v-bind:href="person.name">{{person.name}}</p>
                <input v-if="person.edit == true" v-model:href="person.name"></td>
            <td><p v-if="person.edit == false" v-bind:href="person.email">{{person.email}}</p>
                <input v-if="person.edit == true" v-model:href="person.email"></td>
            <td><p v-if="person.edit == false" v-bind:href="person.phone">{{person.phone}}</p>
                <input v-if="person.edit == true" v-model:href="person.phone"></td>
            <td><button v-if="person.edit == false" v-on:click="vue.edit=true" @click="modifyPerson(person)">Modify</button></td>
            <td><button v-if="person.edit == true" v-on:click="vue.edit=false" @click="savePerson(person)">Save</button></td>
            <td><button @click="deletePerson(person)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <!-- <table>
        <thead>
          <tr>
            <td><p>Name</p></td>
            <td><p>Email</p></td>
            <td><p>Telephone</p></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people">
            <td><p v-bind:href="person.name">{{person.name}}</p></td>
            <td><p v-bind:href="person.email">{{person.email}}</p></td>
            <td><p v-bind:href="person.phone">{{person.phone}}</p></td>
            <td><button v-model="vue.edit" @click="modifyPerson(person)">Modify</button></td>
            <td><button @click="deletePerson(person)">Delete</button></td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB4j3xzuBfNprOMWmDQ-Xxa2m7_LtOWkvY',
  authDomain: 'vue-firebase-tutorial-jm-babel.firebaseapp.com',
  databaseURL: 'https://vue-firebase-tutorial-jm-babel.firebaseio.com',
  projectId: 'vue-firebase-tutorial-jm-babel',
  storageBucket: 'vue-firebase-tutorial-jm-babel.appspot.com',
  messagingSenderId: '78506655614',
};

let app = Firebase.initializeApp(config);
let db = app.database();
let peopleRef = db.ref('people');

export default {
  name: 'home',
  firebase: {
    people: peopleRef,
  },
  data(){
    return {
      newPerson: {
        name:'',
        email: '',
        phone:'',
        edit:false,
      },
      vue:{
        edit:false,
      },
    }
  },
  methods: {
    logout() {
      Firebase.auth().signOut().then(() => {
        alert("Hola");
        this.$router.replace('login');
      })
    },
    addPerson() {
      console.log(this.newPerson);
      peopleRef.push(this.newPerson);
    },
    deletePerson(person) {
      peopleRef.child(person['.key']).remove();
    },
    modifyPerson(person) {
       person.edit= true;
    },
    savePerson(person) {
      person.edit= false;
      var clave = person['.key'];
      console.log(person);
      //peopleRef.child(person['.key']).update(person);
      //peopleRef.child(person['.key']).child('.key').remove();
      // var ref = 'people/'+person['.key'];
      // Firebase.database().ref(ref).once('value', function(person) {
      //   var data = person.val();
      //   console.log(data);
      //   console.log(Firebase.database().ref(ref));
      //   if (data) {
      //       Firebase.database().ref(ref).update(data);
      //   }
      // });
      
    },
  }
};
</script>
