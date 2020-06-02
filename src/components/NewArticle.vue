<script>
    import { postNewArticle } from "Services/article";

    export default {
        name: "NewArticle",
        data() {
            return {
                article: {
                    title: null,
                    author: null,
                    body: null
                }
            };
        },
        methods: {
            onClear() {
                this.article = {
                    title: null,
                    author: null,
                    body: null
                }
            },
            onSubmit() {
                let that = this;
                postNewArticle(this.article).then(()=>{ that.$emit("refresh-articles")});
                this.onClear();
            }
        }
    }
</script>

<template>
    <div class="tile-new-article">
        <h3> New Article</h3>
        <div>
            <label>Title:</label>
            <input v-model="article.title"
                   type="text" />
        </div>
        <div>
            <label>Author:</label>
            <input v-model="article.author"
                   type="text" />
        </div>
        <div>
            <label>Body:</label>
            <input v-model="article.body"
                   type="textarea" />
        </div>
        <div>
            <button @click="onSubmit">Submit</button>
            <button @click="onClear">Clear</button>
        </div>
    </div>
</template>

<style scoped>
    .tile-new-article>div {
        margin-top: .4em;
    }

    input {
        width: 100%;
        max-width: -webkit-fill-available;
        max-width: -moz-available;
    }
</style>