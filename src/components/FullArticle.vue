<script>
import { deleteArticle } from "Services/article";

export default {
    name: "FullArticle",
    props: {
        article: {
            required: false,
            type: Object,
            default: () => { return {}; }
        }
    },
    computed: {
        articleHasId() {
            return (typeof this.article.id == "number");
        }
    },
    methods: {
        onDelete() {
            let that = this;
            deleteArticle(this.article.id).then(()=>{ that.$emit("refresh-articles"); });
        }
    }
}
</script>

<template>
    <div class="tile-full-article">
        <h3> Full Article</h3>
        <div v-if="article.title">
            <label>Title:</label>
            <div class="article-data">
                {{ article.title }}
            </div>
        </div>
        <div v-if="article.author">
            <label>Author:</label>
            <div class="article-data">
                {{ article.author }}
            </div>
        </div>
        <div v-if="article.body">
            <label>Body:</label>
            <div class="article-data">
                {{ article.body }}
            </div>
        </div>
        <div v-if="articleHasId">
            <button @click="onDelete">Delete Article</button>
        </div>
    </div>
</template>

<style scoped>
    .tile-full-article>div {
        margin-top: .6em;
    }

    .article-data {
        margin-left: .5em;
        text-indent: 1em;
    }
</style>