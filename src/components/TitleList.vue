<script>
    export default {
        name: "TitleList",
        props: {
            titles: {
                required: true,
                type: Array,
                default: () => { return []; }
            }
        },
        methods: {
            onSelect(id) {
                this.$emit("article-selected", id);
            }
        }
    }
</script>

<template>
    <div>
        <h3>Articles</h3>
        <ul>
            <li v-for="(title) in titles"
                :key="title.id"
                @click="onSelect(title.id)">
                {{ title.text }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
    li {
        cursor: pointer;
    }
</style>