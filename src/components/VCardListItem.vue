<template>
    <v-list-item>
        <v-list-item-icon>
            <v-icon
                :title="icon.title"
                :style="icon.style"
            >{{icon.name}}</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{title}}</v-list-item-subtitle>
    </v-list-item>
</template>

<script>
    export default {
        name: "VCardListItem",
        props: {
            icon: {
                type: Object,
            },
            title: {
                type: String,
                default: 'title is here',
                required: true
            }
        }
    }
</script>

<style scoped>

</style>