<template>
  <div class="login">
      <div class="login_img"> 
          <img src="http://shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png"/> 
      </div>
      <div class="login_form">
          <van-cell-group>
            <van-field
                v-model="phone"
                @input="setInputValue"
                placeholder="请输入手机号"
            />
              <van-field
                v-model="sms"
                center
                clearable
                placeholder="请输入短信验证码"
            >
                <van-button :disabled="!isPhone" @click="showMess" slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            </van-cell-group>
      </div>
      <div class="login_desc">
          
        新用户登录即自动注册，并表示已同意
        <a href="">
            《用户服务协议》
        </a>
        和
        <a href="">
            《隐私权政策》
        </a>
      </div>
      <div @click="login" class="login_btn">
          登录
      </div>
      <div class="login_about">
          关于我
      </div>
  </div>
</template>

<script>
import {bus} from '../../main'
import axios from 'axios'
export default {
    data(){
        return {
            phone:'',
            isPhone: false,
            sms:null,
        }
    },
    methods: {
        setVisiable(){
            bus.$emit('visiable', false);
        },
        showMess(){
            this.$toast('发验证码是不可能的，你自己随便输入点什么吧');
        },
        login(){
            if(this.phone.length === 0) {
                this.$toast('请填写手机号');
                return false;
            }
            if(this.phone.length !== 11) {
                this.$toast('请填写合法的手机号');
                return false;
            }
            if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
                 this.$toast('请填写合法的手机号');
                 return false; 
            }
            const data = {
                phone: this.phone,
            }
            this.$axios({
                method:'post',
                url: '/login',
                data,
            }).then(res => {
                localStorage.setItem('userInfo',JSON.stringify(res));
                this.$router.push('/profile');
            })
 
        },
        setInputValue(){
            if(this.phone.length === 11) {
                this.isPhone = true;
            } else {
                this.isPhone = false;
            }
        }
    },
    created(){
        this.setVisiable();
    }
}
</script>

<style lang="less">
.login {
    width: 100%;
    height: 100vh;
    &_img {
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 120px;
            height: 50px;
        }
    }
    &_form {
        width: 80%;
        display: flex;
        justify-content: center;
        margin-left: 40px;
        .van-cell {
            margin-bottom: 10px;
        }
    }
    &_desc {
        width: 80%;
        color:#999;
        font-size: 13px;
        margin-left: 50px;
    }
    &_btn {
        width: 80%;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        background: rgb(76,217,100);
        height: 40px;
        margin-left: 40px;
        align-items: center;
        border-radius: 5px;
        color:white;
    }
    &_about {
        width: 80%;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        height: 40px;
        margin-left: 40px;
        align-items: center;
        color:#999;
    }
}
</style>