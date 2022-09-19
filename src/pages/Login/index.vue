<template>
    <div class="back_wrap">
        <n-form class="form_wrap" ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size">
            <h2 style="text-align: center;">登录界面</h2>
            <n-form-item label="账号" path="user.username">
                <n-input v-model:value="formValue.user.username" placeholder="输入账号" />
            </n-form-item>
            <n-form-item label="密码" path="user.password">
                <n-input type="password" @keyup.enter="handleValidateClick" v-model:value="formValue.user.password" placeholder="输入密码" />
            </n-form-item>
            <n-form-item>
                <n-button class="login_btn" attr-type="button" @click="handleValidateClick" type="info" >
                    登录
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormInst, useMessage } from 'naive-ui'
import { loginFunc } from '@/http/service/list'

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const router = useRouter()

const formValue = ref({
    user: {
        username: '',
        password: ''
    },
})
const size = ref<'small' | 'medium' | 'large'>('medium')
const rules = {
    user: {
        username: {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
        },
        password: {
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur']
        },
    },
}

const handleValidateClick = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            const { username, password } = formValue.value.user
            console.log(formValue.value.user.username, formValue.value.user.password);
            const params = {
                username,
                password
            }
            loginFunc(params).then(res => {
                console.log(res,);
                if (res?.data.ok == 1) {
                    message.success('登录成功！')
                    router.push('/')
                }else{
                    message.error('账号密码不匹配！')
                }

            })
        } else {
            console.log(errors)
            message.error('账号或者密码不匹配')
        }
    })
}

</script>

<style scoped lang="scss">
.back_wrap {
    background-image: url('../../assets/back.png');
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;

    .form_wrap {
        margin: auto;
        max-width: 400px;
        max-height: 400px;
        height: 300px;
        margin-top: 100px;
        padding: 20px;
        background-color: #FFFFFF;

        .login_btn {
            width: 100%;
        }
    }
}
</style>