<template>
    <div style="padding: 20px;">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
            require-mark-placement="right-hanging" :size="(size as any)" :style="{
                maxWidth: '640px'
            }">
            <n-form-item label="姓名" path="username">
                <n-input v-model:value="model.username" placeholder="请输入姓名" />
            </n-form-item>

            <n-form-item label="别名" path="alias">
                <n-input v-model:value="model.alias" placeholder="请输入别名" />
            </n-form-item>
        </n-form>
    </div>
    <n-upload accept="image/png,image/jpg,image/webp" style="width: 300px;margin-left: 40px;" :data="model"
        @finish="(handleFinish as any)" multiple directory-dnd action="http://127.0.0.1:3004/upload" :max="5">
        <n-button type="success">上传文件</n-button>
    </n-upload>
    <n-data-table style="max-width: 900px;padding: 5px;" :columns="columns" :data="imageList" :bordered="false" />
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { getImage, delImageById } from '@/http/service/list';
import { NImage, useMessage, FormInst, NButton, NPopconfirm } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import { init } from '_vooks@0.2.12@vooks/lib/on-fonts-ready';
interface Images {
    id: string,
    name: string,
    aliasZ: string,
    avatar: string
}

const imageList = ref<Images[]>([])
const message = useMessage()
const backUrl = "http://127.0.0.1:3004"
const formRef = ref<FormInst | null>(null)
const model = ref<any>({
    username: null,
    alias: null,
})
const size = ref<string>('medium')
const rules = ref<any>({
    username: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入 姓名'
    },
    alias: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入 别名'
    },
})


const columns = [
    {
        title: 'Id',
        key: 'id'
    },
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '别名',
        key: 'alias'
    },
    {
        title: '头像',
        key: 'avatar',
        render(row: { avatar: string; }) {
            return h(
                NImage, {
                src: `${backUrl}${row.avatar.substring(6)}`,
                style: {
                    width: "90px",
                    height: '30px'
                },
            }, {
                default: () => '默认图片'
            }
            )
        }
    },
    {
        title: '操作',
        key: 'actions',
        // render(row: any) {
        //     return h(
        //         NPopconfirm,{
        //           onNegativeClick :() => 11  
        //         },[
                    
        //         ]
        //     )
        // },
    }
]

const confirmDel = () => {
    console.log('确认');

}
const cancleDel = () => {
    console.log('取消');

}

const initFunc = () => {
    getImage().then(res => {
        console.log(res, '图片');
        const imageInfo = res?.data?.data
        imageList.value = imageInfo
    })
}
initFunc()

const handleFinish = ({
    file,
    event
}: {
    file: UploadFileInfo
    event?: ProgressEvent
}) => {
    const res = JSON.parse((event?.target as XMLHttpRequest).response)
    if (res?.ok !== 1) {
        message.error('上传失败')
        return
    }
    message.success('上传成功!')
    initFunc()
}
const delCurRow = (row: { id: any; }) => {
    const { id } = row
    console.log(row, id);
    delImageById({ id }).then(res => {
        console.log(res, '删除');
        if (res.data?.info == 'empty') {
            message.error('id 不存在')
            return
        }
        message.success('删除成功')
        initFunc()
    })
}


</script>

<style scoped>
</style>