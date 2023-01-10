<script>
    import TitleList from "Components/TitleList";
    import NewArticle from "Components/NewArticle";
    import FlexGrid from "Components/FlexGrid";
    import FlexTile from "Components/FlexTile";
    import FullArticle from "Components/FullArticle";
    import EditArticle from "Components/EditArticle";
    import { getAllArticles } from "Services/article";
    import { getTitlesById } from "Helpers/article";

    export default {
        name: "App",
        components: {
            FlexGrid,
            FlexTile,
            FullArticle,
            TitleList,
            NewArticle,
            EditArticle
        },
        data() {
            return {
                message: "Hello, World!",
                articles: [],
                selectedArticle: {},
                currentView:'full-article',
                originalArticle:{},
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
                        //Creating deep copy of an article
                        this.originalArticle = JSON.parse(JSON.stringify(this.selectedArticle))
                        break;
                    }
                }
            },
            changeView(view) { 
              this.currentView = view;
            },
            setPreviousValues() { 
              this.selectedArticle = this.originalArticle;
            }
        }
    }
</script>

<template>
    <div>
        <h1>{{ message }}</h1>
        <flex-grid class="tile-container">
            <flex-tile class="flex-tile">
                <title-list ref="titleList"
                  :titles="titles"
                  @article-selected="selectArticle" />
            </flex-tile>
            <flex-tile class="flex-tile"> 
                <new-article @refresh-articles="refreshArticles" />
            </flex-tile>
            <flex-tile class="flex-tile" v-if="currentView === 'full-article'">
                <full-article 
                  @refresh-articles="refreshArticles"
                  @change-article-view="changeView"
                  :article="selectedArticle" />
            </flex-tile>
            <flex-tile class="flex-tile" v-else>
                <edit-article
                  @refresh-articles="refreshArticles"
                  @change-article-view="changeView"
                  @edit-article-cancelled="setPreviousValues"
                  :article="selectedArticle" />
            </flex-tile>
        </flex-grid>
    </div>
</template>

<style >
  .flex-tile { 
    border:1px solid black;
    border-radius:20px;
    flex-basis: calc(33.33% - 20px);
    min-width: calc(33.33% - 20px);
    max-width: calc(33.33% - 20px);
    margin:20px 0px;
  }

  .tile-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
  }

  
  @media screen and (max-width: 1000px) {
    .flex-tile {
      flex-basis: calc(50% - 20px);
      min-width: calc(50% - 20px);
      max-width: calc(50% - 20px);
    }
  }

  @media screen and (max-width: 768px) {
    .flex-tile {
      flex-basis: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }
</style>