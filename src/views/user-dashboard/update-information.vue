<template>
  <div class="adminimage">
    <v-content>
      <v-row justify="start" style="background-color: black">
        <v-col md="auto" style="margin-left: 50px">
          <v-btn to="../user-dashboard">
            <v-icon style="margin-bottom: 3px"> mdi-keyboard-backspace </v-icon>
            QUAY LẠI DASHBOARD
          </v-btn>
        </v-col>
        <v-col md="200px"> </v-col>
        <!--
        <v-col md="auto" align-self="center">
          <h4 style="margin-right: 50px; color: white;">CHỨC NĂNG KIỂM TRA XÉT NGHIỆM CỦA BỆNH NHÂN</h4>
        </v-col>
        -->
      </v-row>
      <v-row align="center" justify="center" style="margin-top: 80px">
        <h4 style="color: white">CHỨC NĂNG CẬP NHẬT THÔNG TIN CÁ NHÂN</h4>
      </v-row>
      <v-row align="center"   justify="center">
        <v-col md="auto" sm="auto">
          <v-row>
            <v-text-field
              dark
              outlined
              label="Thay đổi tên đăng nhập"
              style="width: 300px"
            >
            </v-text-field>

            <v-btn style="margin-left: 10px; height: 55px"> Cập nhật </v-btn>
          </v-row>
          <v-row style="margin-top: -12px">
            <v-text-field
              dark
              outlined
              label="Thay đổi mật khẩu"
              style="width: 300px"
            >
            </v-text-field>

            <v-btn style="height: 55px; margin-left: 10px"> Cập nhật </v-btn>
          </v-row>
          <v-row style="margin-top: -12px">
            <v-text-field
              dark
              outlined
              label="Thay đổi email"
              style="width: 300px"
            >
            </v-text-field>

            <v-btn style="height: 55px; margin-left: 10px"> Cập nhật </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      adminHealth: 0,
      numberOfHealth: 0,
      name: "",
      detail: "",
      username: "",
      id: "",
      notation: "",
      headers: [
        { text: "Tên xét nghiệm", value: "title", sortable: false },
        { text: "Người thực hiện", value: "detail", sortable: false },
        { text: "Chi tiết xét nghiệm", value: "notation", sortable: false },
      ],
      health: [
        /*
        {
          title: "TEST",
          detail: "TEST",
        },
        */
      ],
    };
  },
  computed: {

  },
  created() {
    this.getDataFromServer();
    this.getNumber();
  },
  methods: {
    getNumber() {
      axios
        .get(
          "http://admin-database.herokuapp.com/student-health/health/students/admin"
        )
        .then((Response) => {
          this.adminHealth = Response.data.length;
        });
      axios
        .get(
          "http://admin-database.herokuapp.com/student-health/health/students/" +
            this.id
        )
        .then((Response) => {
          this.numberOfHealth = Response.data.length;
          console.log(this.numberOfHealth);
          for (let i = 0; i < this.numberOfHealth; i++) {
            this.health.push({
              title: Response.data[i].name,
              detail: Response.data[i].detail,
            });
          }
        });
    },
    sendHealth() {
      this.health.push({
        title: this.name,
        detail: this.detail,
      });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = {
        name: this.name,
        detail: this.detail,
      };
      axios
        .post(
          "http://admin-database.herokuapp.com/student-health/health/students/" +
            this.id,
          data,
          config
        )
        .then((Response) => Response.data[this.numberOfHealth + 1])
        .then(({ name, detail }) => {
          this.name = name;
          this.detail = detail;
        });
      axios
        .post(
          "http://admin-database.herokuapp.com/student-health/health/students/admin",
          data,
          config
        )
        .then((Response) => Response.data[this.adminHealth + 1])
        .then(({ name, detail }) => {
          this.name = name;
          this.detail = detail;
        });
    },
    getDataFromServer() {
      /*
      this.username = this.$store.state.gloUsername
      this.id = this.$store.state.gloUserId
      */
      this.username = this.$store.state.gloUsername;
      this.id = this.$store.state.gloUserId;
      this.lock = true;
      console.log(this.username);
      console.log(this.id);
    },
  },
};
</script>


<style scoped>
.adminimage {
  background: #4b6cb7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #182848,
    #4b6cb7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #182848,
    #4b6cb7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  height: 100%;
}
</style>