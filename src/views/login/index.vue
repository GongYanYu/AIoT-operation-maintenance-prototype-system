<template>
  <div class="login-main">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h1 class="login-title">三亚崖州湾科技城智慧工地监管平台项目</h1>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
<!--        <el-button type="info" v-on:click="loginout">-->
<!--          退出登录-->
<!--        </el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.form
          // console.log(md5('iflytek_new2022..'))
          //iflytek_new2022..
          const true_pwd_md5='483244838b27e56a071b1ceca57115a2'
          if (form.username === 'admin' && md5(form.password) === true_pwd_md5) {
            sessionStorage.setItem('UserInfo','admin_has_entered_in')
            this.$router.push('/')
          }else {
            this.$message({type:'info',message:'账号或密码错误'})
          }
        } else {
          this.dialogVisible = true
          return false
        }
      })
    },
    loginout(){
      sessionStorage.removeItem('UserInfo')
      this.$message({type:'info',message:'已退出'})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: url("../../assets/main/back_img_test.jpg");
  background-size: 100% 100%;
  color: black;
  .login-box {
    border: 1px solid #DCDFE6;
    width: 50%;
    height: 30%;
    margin: 200px 0 ;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: #FFFFFF00;
    backdrop-filter: blur(5px);
    .login-btn {
      padding: 10px 20px 10px 20px;
      margin-left: 320px;
      font-size: 20px;
    }
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
  }
}

</style>



