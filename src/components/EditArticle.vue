<script>
    import { updateArticle } from "Services/article";

    export default {
        name: "EditArticle",
        data() {
            return {
            };
        },
        props: {
            article: {
                required: false,
                type: Object,
                default: () => { return {}; }
            }
        },
        methods: {
            onSave() {
                let that = this;
                updateArticle(this.article)
                .then(() => {
                  that.$emit("refresh-articles")
                  that.$emit(`change-article-view`, 'full-article')
                });
                
            },
            onCancel() { 
              this.$emit(`edit-article-cancelled`)
              this.$emit(`change-article-view`, 'full-article')
            }
        }
    }
</script>

<template>
    <div class="tile-new-article">
        <h3> Edit Article</h3>
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
            <button @click="onSave">Save</button>
            <button @click="onCancel">Cancel</button>
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