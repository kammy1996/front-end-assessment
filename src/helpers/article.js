export function getTitlesById(articles) {
    /* TODO:
     * The articles parameter passed to this function is an array of objects.
     * Each object has th following properties:
     * {
     *   author,
     *   body,
     *   id,
     *   title
     * }
     * 
     * Return an array of object containing the following properties:
     * {
     *   id,
     *   text - thish should contain the article's title property
     * }
     */
    let revisedArticles = [];
    articles.map(item => {
      let template = {};
      template.id = item.id;
      template.text = item.title;
      revisedArticles.push(template);
    })

    return revisedArticles;
    
}