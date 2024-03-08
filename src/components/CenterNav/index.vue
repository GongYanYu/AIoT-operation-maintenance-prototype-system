<template>
    <div class="center-nav-view ">
        <img class="img" v-if="isSelected" src="./img/selected.png"  alt=""/>
        <img class="img" v-else src="./img/normal.png"  alt=""/>
        <div class="label">
            <span>{{label}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CenterNav",
    props: {
        label: {
            type: String,
            default: '标题',
        },
        isSelected: {
            type: Boolean,
            default: false,
        },

    },
};
</script>

<style lang="scss" scoped>
.center-nav-view {
    display: block;
    position: relative;
    height: 38px;

    .img{
        height: 38px;
        width: auto;
    }

    .label{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        padding-left: 20px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 1px;
    }
}
</style>

