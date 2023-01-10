const ARTICLE_ENDPOINT = "/api/articles";
const BASE_URL = 'http://localhost:3000';

export function getAllArticles() {
    /* TODO:
     * Use the fetch API.
     * Make a GET request.
     * On success, return a promise that resolves to the returned array.
     * On failure, return a promise that rejects.
     */
    const articles = fetch(`${BASE_URL}${ARTICLE_ENDPOINT}`,{ 
      method:"GET"
    })
    .then(response => { 
      //Returning simple response array could be nested may be in response.data or response.result
      return Promise.resolve(response)
    })
    .then((res) => res.json())
    .catch(error => { 
      return Promise.reject(error)
    })

    return articles;
}

export function postNewArticle(article) {
    /* TODO:
     * Use the fetch API.
     * Make a POST request.
     * Declare that the data will be sent in JSON format.
     * Return a promise that rejects if the article is absent or is missing the title, author, or body properties.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.`
     */
    let response; 
    if(article && article.author && article.title && article.body) { 
      response = fetch(`${BASE_URL}${ARTICLE_ENDPOINT}`,{ 
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      })
      .then((response) => { 
        if(response.status === 200) { 
          return Promise.resolve(response)
        }
      })
      .catch(error => { 
        return Promise.reject(error)
      })
    } else { 
      return Promise.reject("Enter All the required fields in the article")
    }

    return response;
}

export function updateArticle(article) {
    console.log("🚀 ~ file: article.js ~ line 60 ~ updateArticle ~ article", article.id)
    /* TODO:
     * Use the fetch API.
     * Make a PUT request.
     * Declare that the data will be sent in JSON format.
     * Return a promise that rejects if the article is absent or is missing the id property.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.
     */
    let response; 
    if(article && article.id) { 
      response = fetch(`${BASE_URL}${ARTICLE_ENDPOINT}/${article.id}`,{ 
        method:"PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      })
      .then((response) => { 
        if(response.status === 200) { 
          return Promise.resolve(response)
        }
      })
      .catch(error => { 
        return Promise.reject(error)
      })
    } else { 
      return Promise.reject("Article Id is missing")
    }

    return response;
      
}

export function deleteArticle(articleId) {
    /* TODO:
     * Use the fetch API.
     * Make a DELETE request.
     * Return a promise that rejects if the articleId is missing.
     * On success, return a promise that resolves.
     * On failure, return a promise that rejects.
     */

  let response; 

  if(articleId) { 
    response = fetch(`${BASE_URL}${ARTICLE_ENDPOINT}/${articleId}`,{ 
        method:"DELETE",
      })
      .then((response) => { 
        if(response.status === 200) { 
          return Promise.resolve()
        }
      })
      .catch(error => { 
        return Promise.reject(error)
      })
    } else { 
    return Promise.reject("Article Id is missing")
  }

  return response;
}