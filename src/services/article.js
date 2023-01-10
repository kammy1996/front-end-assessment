const ARTICLE_ENDPOINT = "/api/articles";
//Adding base URL here to make sure we call the right backend
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
        if(response.ok) { 
          return Promise.resolve(response.json())
        }``
        return Promise.reject("Something went wrong")
    })
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
        if(response.ok) { 
          return Promise.resolve(response)
        } 
        return Promise.reject("Something went wrong")
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
        if(response.ok) { 
          return Promise.resolve(response)
        }
        return Promise.reject("Something went wrong")
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
        if(response.ok) { 
          return Promise.resolve()
        }
        return Promise.reject("Something went wrong")
      })
      .catch(error => { 
        return Promise.reject(error)
      })
    } else { 
    return Promise.reject("Article Id is missing")
  }

  return response;
}