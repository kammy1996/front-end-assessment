const ARTICLE_ENDPOINT = "/api/articles";

export function getAllArticles() {
    /* TODO:
     * Use the fetch API.
     * Make a GET request.
     * On success, return a promise that resolves to the returned array.
     * On failure, return a promise that rejects.
     */
}

export function postNewArticle(article) {
    /* TODO:
     * Use the fetch API.
     * Make a POST request.
     * Declare that the data will be sent in JSON format.
     * Return a promise that rejects if the article is absent or is missing the title, author, or body properties.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.
     */
}

export function updateArticle(article) {
    /* TODO:
     * Use the fetch API.
     * Make a PUT request.
     * Declare that the data will be sent in JSON format.
     * Return a promise that rejects if the article is absent or is missing the id property.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.
     */
}

export function deleteArticle(articleId) {
    /* TODO:
     * Use the fetch API.
     * Make a DELETE request.
     * Return a promise that rejects if the articleId is missing.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.
     */
}