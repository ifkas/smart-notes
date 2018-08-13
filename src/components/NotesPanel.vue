<template>
  <div>
      <div v-if="user">
          <!-- <h2>{{ user.metadata.lastSignInTime }}</h2> -->
      </div>

       <div class="row at-row">
        <div class="col-md-7">
          <at-menu active-name="0">
            <at-menu-item v-if="note.alias == user.uid" v-for="note in notes" :key="note.id" :name="note.id">
              <!-- <at-tooltip :content="note.bodyText"><span>{{ note.title }}</span></at-tooltip> -->
              <span @click="alert('hi')">{{ note.title }}</span>
              <at-popover placement="top" v-model="show">
                <i class="icon icon-x"></i>
                <template slot="content">
                  <p>Are you sure to delete it?</p>
                  <div style="text-align: center; margin-top: 8px;">
                    <at-button size="smaller" @click="show = false">Cancel</at-button>
                    <at-button type="primary" size="smaller" @click="deleteNote(note.id)">Sure</at-button>
                  </div>
                </template>
              </at-popover>
            </at-menu-item>
          </at-menu>
        </div> <!-- End of sidebar -->
        <div class="col-md-17">
          <at-card :no-hover="true">
            <div slot="title"><at-input v-model="title" placeholder="Add your title"></at-input></div>
            <div slot="extra"><at-button @click.prevent="newNote" type="info">Save</at-button></div>
            <div>
              <vue-editor v-model="bodyText" :editorToolbar="customToolbar"></vue-editor>
            </div>
            <div v-if="bodyText.length >= 10">
              <at-button @click="modal1=true">Full Mode</at-button>
              <at-modal v-model="modal1" :title="this.title">
                <div v-html="this.bodyText"></div>
                <!-- <at-badge value="Total of 5 words"></at-badge> -->
              </at-modal>
            </div>
          </at-card>
        </div><!-- end of main -->
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/auth/init'; // we can call db as we like and we import this const firebaseApp = firebase.initializeApp(config);
import { VueEditor } from 'vue2-editor';

export default {
  name: 'NotesPanel',
  data() {
    return {
      msg: 'Welcome to the Smart Notes',
      user: null,
      title: '',
      bodyText: '',
      modal1: false,
      modal2: false,
      modal3: false,
      show: false,
      alias: '',
      notes: [],
      customToolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // [{ 'color': [] }, { 'background': [] }],
            ['code-block'],
          ]
    }
  },
  components: {
    // Navbar
    VueEditor
    },
  methods: {
    alo() {
      alert("ALLOO");
    },
    showMe() {
      // let currentUser = firebase.auth().currentUser;
      // console.log(currentUser.displayName);
    },
    newNote() {
      if(this.title) {
        // the below is only for locally no db
        // this.notes.unshift({ // create object
        //   id: Date.now(), // this later will be the id from firestore
        //   title: this.title,
        //   body: this.bodyText
        // })
        db.collection('notes').add({
          title: this.title,
          body: this.bodyText,
          timestamp: Date.now(),
          alias: this.user.uid
        }).then(() => {
          this.$Notify.success({
            title: this.title,
            message: 'Yay, it is saved!'
          })
        })
        this.title = '',
        this.bodyText = ''
      }
    },
    deleteNote(id) {
      // console.log(id);
      // we target the id and use the delete method which also has promise
      db.collection('notes').doc(id).delete()
      .then(() => {
        this.notes = this.notes.filter(note => {
          return note.id != id;
        })
      })
      // we need to add reactivity so it also deletes from the dom by promise, after it deletes
      // from the database it creates a new array with the filter, then it filters each index from
      // the notes array and returns a result, in this case it sees that the id (which is already deleted from firebase)
      // does not compare or exist in the current notes array, therefore the new array from the filter method and
      // does not consist the note with that id and it is deleted
    },
    modalAlert() {
        this.$Modal.alert({
          title: this.title,
          content: this.bodyText,
        }).then(() => {
          this.$Message.success('Click \'Confirm\' Button')
        })
    }
  },
  mounted() {
    this.user = firebase.auth().currentUser;
    console.log(this.user.uid);
  },
  created() {
    // fetch data from firestore
    // once we connect to the collection we want to retrieve the data from it
    // db.collection('notes').get() // we use the get method and we also have promise
    // .then(snapshot => { // snapshot refers to the state of the notes collection at that current point which contains documents (currently 2) // we need to cycle through each document and list them out
    //   snapshot.forEach(doc => {
    //     // console.log(doc.data(), doc.id)
    //     let note = doc.data();
    //     note.id = doc.id;
    //     this.notes.push(note);
    //   })
    // })
    let ref = db.collection('notes').orderBy('timestamp')
    ref.onSnapshot(snapshot => {
      console.log(snapshot.docChanges())
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
          let doc = change.doc
          this.notes.push({
            id: doc.id,
            title: doc.data().title,
            bodyText: doc.data().body,
            timestamp: doc.data().timestamp,
            alias: doc.data().alias
          })
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.at-popover {float: right;}
/* .at-popover__content {width: 130px !important;} */
</style>