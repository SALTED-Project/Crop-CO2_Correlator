<template>
  <div>
    <h1>Crop-CO2 correlator</h1>
    <input type="email" v-model="email" v-on:keyup.enter="login" placeholder="User">
    <input type="password" v-model="password" v-on:keyup.enter="login" placeholder="Password">
    <button @click="login">Login</button>
    <p v-if="failed">Failed login. Please try again.</p>
    <p v-if="!failed" style="color: #195a1700">Failed login. Please try again.</p>
    <a href="https://salted-project.eu/"><img id="salted_img_login" src="../assets/salted_logo_negativo.png" alt="Logo SALTED"></a> <br/>
    <a href="https://www.grupoamper.com/"><img id="amper_img_login" src="../assets/logo_grupoamper.png" alt="Logo AMPER"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      failed: false
    };
  },
  methods: {
    login() {
      if(this.email == process.env.VUE_APP_AUTH_USER && this.password == process.env.VUE_APP_AUTH_PASS) {
        this.$is_authenticated.value = true;
        this.$router.push('/');
      } else {
        this.$is_authenticated.value = false;
        this.failed = true;
      }
    }
  }
};
</script>

<style scoped>
div {
  background-color: #195a17;
  height: 60%;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  max-width: 350px;
  max-height: 480px;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

h1 {
  color: #f2f2f2;
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px 0;
}
input {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f2f2f2;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  width: 80%;
  margin-top: 15px;
  padding: 10px;
  background-color: #0e3f0c;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

#salted_img_login {
    width: 30%;
    max-width: 300px;
    margin-top: 20px;
}

#amper_img_login {
    width: 55%;
    max-width: 300px;
    margin: 15px 0;
}

button:hover {
  background-color: #0a2f09;
}

p {
  color: #f2f2f2;
  font-weight: bold;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0;
}
</style>