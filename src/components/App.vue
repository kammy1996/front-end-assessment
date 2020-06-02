<script>
    import TitleList from "Components/TitleList";
    import NewArticle from "Components/NewArticle";
    import FlexGrid from "Components/FlexGrid";
    import FlexTile from "Components/FlexTile";
    import FullArticle from "Components/FullArticle";
    import { getAllArticles } from "Services/article";
    import { getTitlesById } from "Helpers/article";

    export default {
        name: "App",
        components: {
            FlexGrid,
            FlexTile,
            FullArticle,
            TitleList,
            NewArticle
        },
        data() {
            return {
                message: "Hello, World!",
                articles: [],
                selectedArticle: {}
            }
        },
        computed: {
            titles() {
                return getTitlesById(this.articles);
            }
        },
        mounted() {
            this.refreshArticles();
        },
        methods: {
            refreshArticles() {
                const that = this;

                getAllArticles().then(response => {
                    that.articles = response.articles;
                    let found = false;

                    for (let a = 0, l = that.articles.length; a < l; a++) {
                        if (that.articles[a].id == that.selectedArticle.id) {
                            found = true;
                            that.selectArticle(that.selectedArticle.id);
                            break;
                        }
                    }

                    if (!found) {
                        that.selectedArticle = {};
                    }
                })
            },
            selectArticle(id) {
                for (let a = 0, l = this.articles.length; a < l; a++) {
                    if (this.articles[a].id === id) {
                        this.selectedArticle = { ...this.articles[a] };
                        break;
                    }
                }
            }
        }
    }
</script>

<template>
    <div>
        <h1>{{ message }}</h1>
        <flex-grid>
            <flex-tile>
                <title-list ref="titleList"
                            :titles="titles"
                            @article-selected="selectArticle" />
            </flex-tile>
            <flex-tile>
                <new-article @refresh-articles="refreshArticles" />
            </flex-tile>
            <flex-tile>
                <full-article @refresh-articles="refreshArticles"
                              :article="selectedArticle" />
            </flex-tile>
        </flex-grid>
    </div>
</template>