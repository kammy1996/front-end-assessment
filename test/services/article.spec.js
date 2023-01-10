import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import sinon from "sinon";

import {
    getAllArticles,
    postNewArticle,
    updateArticle,
    deleteArticle
} from "../../src/services/article";

//Adding BASE_URL to the ARTICLE_POINT in test case file as it was failing multiple test cases;
const BASE_URL = 'http://localhost:3000';
const ARTICLE_ENDPOINT = `${BASE_URL}/api/articles`;

suite("articleService", function() {
    suite("getAllArticles()", function() {
        setup(function () {
			this.fetchStub = sinon.stub(globalThis, "fetch");
		});

		teardown(function () {
			this.fetchStub.restore();
        });
        
        test("Sends a request to the correct endpoint.", function () {
			const mockBody = {
                data: "test"
            };

			const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockBody),
                json() {
                    return Promise.resolve(mockBody);
                }
            };
            
            this.fetchStub.resolves(mockResponse);
            
            getAllArticles();

			sinon.assert.calledOnce(this.fetchStub);
            sinon.assert.calledWith(this.fetchStub, ARTICLE_ENDPOINT);
        });

        test("Sends a GET request.", function () {
            const mockBody = {
                data: "test"
            };

			const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockBody),
                json() {
                    return Promise.resolve(mockBody);
                }
            };
            
            this.fetchStub.resolves(mockResponse);
            
            getAllArticles();

            sinon.assert.calledOnce(this.fetchStub);
            assert(
                this.fetchStub.calledWith(ARTICLE_ENDPOINT) ||
                this.fetchStub.calledWith(ARTICLE_ENDPOINT, sinon.match(function(value) {
                    if (value === undefined || value === null) return true;
                    if (!value.method) return true;
                    if (value.method.toUpperCase() == "GET") return true;
    
                    return false;
                }))
            );
        });

        test("Returns a promise that resolves to the javascript array.", function() {
            const mockData = [
                "item1",
                "item2"
            ];

			const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };
            
            this.fetchStub.resolves(mockResponse);
            
            const actualData = getAllArticles();

			assert.eventually.deepEqual(actualData, mockData);
        });

        test("Returns a promise that resolves to the javascript array in the status code is OK, but not exactly 200.", function() {
            const mockData = [
                "item1",
                "item2"
            ];

			const mockResponse = {
                ok: true,
                status: 206,
                statusText: "Partial Content",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };
            
            this.fetchStub.resolves(mockResponse);
            
            const actualData = getAllArticles();

			assert.eventually.deepEqual(actualData, mockData);
        });

        test("Returns a rejecting promise if the server does not respond with an okay status code.", function() {
            const mockResponse = {
                ok: false,
                status: 301,
                statusText: "NOT OK",
                body: null,
                json() {
                    return Promise.resolve(null);
                }
            };

            this.fetchStub.resolves(mockResponse);
            
            const actualData = getAllArticles();

            assert.isRejected(actualData);
        });
    });

    suite("postNewArticle()", function() {
        setup(function () {
            this.fetchStub = sinon.stub(globalThis, "fetch");
            this.mockArticle = {
                title: "mockTitle",
                author: "mockAuthor",
                body: "mockBody"
            };
		});

		teardown(function () {
			this.fetchStub.restore();
        });

        test("Sends request to the correct endpoint.", function() {
            const mockData = {
                ...this.mockArticle,
                id: 999
            };

            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };

            this.fetchStub.resolves(mockResponse);

            postNewArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, ARTICLE_ENDPOINT);
        });

        test("Sends a POST request.", function() {
            const mockData = {
                ...this.mockArticle,
                id: 999
            };

            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };

            this.fetchStub.resolves(mockResponse);

            postNewArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, ARTICLE_ENDPOINT, sinon.match(function(value) {
                if (!value) return false;
                if (!value.method) return false;
                return value.method.toUpperCase() == "POST";
            }));
        });

        test("Includes JSON Content-Type header", function() {
            const mockData = {
                ...this.mockArticle,
                id: 999
            };

            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };

            this.fetchStub.resolves(mockResponse);

            postNewArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, ARTICLE_ENDPOINT, sinon.match(function(value) {
                if (!value || !value.headers) return false;
                const keys = Object.keys(value.headers);
                const contentTypeKeyArr = keys.filter(test => test.toLowerCase() == "content-type");
                if (!contentTypeKeyArr || !contentTypeKeyArr.length) return false;
                const contentTypeKey = contentTypeKeyArr[0];
                if (!value.headers[contentTypeKey]) return false;
                return value.headers[contentTypeKey].trim().toLowerCase().includes("application/json");
            }));
        });

        test("Returns a promise that resolves on an ok status code.", function() {
            const mockData = {
                ...this.mockArticle,
                id: 999
            };

            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = postNewArticle(this.mockArticle);

            assert.isFulfilled(actualData);
        });

        test("Returns a promise that rejects if the fetch fails.", function() {
            this.fetchStub.rejects();

            const actualData = postNewArticle(this.mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the HTTP request fails.", function() {
            const mockData = {
                ...this.mockArticle,
                id: 999
            };

            const mockResponse = {
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
                body: JSON.stringify(mockData),
                json() {
                    return Promise.resolve(mockData);
                }
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = postNewArticle(this.mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing.", function() {
            const actualData = postNewArticle();

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing a title.", function() {
            const mockArticle = {
                author: "mockAuthor",
                body: "mockBody"
            };

            const actualData = postNewArticle(mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing an author.", function() {
            const mockArticle = {
                title: "mockTitle",
                body: "mockBody"
            };

            const actualData = postNewArticle(mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing a body.", function() {
            const mockArticle = {
                title: "mockTitle",
                author: "mockAuthor"
            };

            const actualData = postNewArticle(mockArticle);

            assert.isRejected(actualData);
        });
    });

    suite("updateArticle()", function() {
        setup(function () {
            this.fetchStub = sinon.stub(globalThis, "fetch");
            this.mockArticle = {
                id: 999,
                title: "mockTitle",
                author: "mockAuthor",
                body: "mockBody"
            };
		});

		teardown(function () {
			this.fetchStub.restore();
        });

        test("Sends request to the correct endpoint.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(this.mockArticle),
                json() {
                    return Promise.resolve(this.mockArticle);
                }
            };

            const expectedEndpoint = ARTICLE_ENDPOINT + "/" + this.mockArticle.id;

            this.fetchStub.resolves(mockResponse);

            updateArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, expectedEndpoint);
        });

        test("Sends a PUT request.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(this.mockArticle),
                json() {
                    return Promise.resolve(this.mockArticle);
                }
            };
            
            const expectedEndpoint = ARTICLE_ENDPOINT + "/" + this.mockArticle.id;

            this.fetchStub.resolves(mockResponse);

            updateArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, expectedEndpoint, sinon.match(function(value) {
                if (!value) return false;
                if (!value.method) return false;
                return value.method.toUpperCase() == "PUT";
            }));
        });

        test("Includes JSON Content-Type header", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(this.mockArticle),
                json() {
                    return Promise.resolve(this.mockArticle);
                }
            };

            const expectedEndpoint = ARTICLE_ENDPOINT + "/" + this.mockArticle.id;

            this.fetchStub.resolves(mockResponse);

            updateArticle(this.mockArticle);

            sinon.assert.calledWith(this.fetchStub, expectedEndpoint, sinon.match(function(value) {
                if (!value || !value.headers) return false;
                const keys = Object.keys(value.headers);
                const contentTypeKeyArr = keys.filter(test => test.toLowerCase() == "content-type");
                if (!contentTypeKeyArr || !contentTypeKeyArr.length) return false;
                const contentTypeKey = contentTypeKeyArr[0];
                if (!value.headers[contentTypeKey]) return false;
                return value.headers[contentTypeKey].trim().toLowerCase().includes("application/json");
            }));
        });

        test("Returns a promise that resolves on an ok status code.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK",
                body: JSON.stringify(this.mockArticle),
                json() {
                    return Promise.resolve(this.mockArticle);
                }
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = updateArticle(this.mockArticle);

            assert.isFulfilled(actualData);
        });

        test("Returns a promise that rejects if the fetch fails.", function() {
            this.fetchStub.rejects();

            const actualData = updateArticle(this.mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the HTTP request fails.", function() {
          const mockResponse = {
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
                body: JSON.stringify(this.mockArticle),
                json() {
                    return Promise.resolve(this.mockArticle);
                }
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = updateArticle(this.mockArticle);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing.", function() {
            const actualData = updateArticle();

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article is missing the ID.", function() {
            const mockArticle = {
                title: "mockTitle",
                author: "mockAuthor",
                body: "mockBody"
            };

            const actualData = updateArticle(mockArticle);

            assert.isRejected(actualData);
        });

    });

    suite("deleteArticle()", function() {
        setup(function () {
            this.fetchStub = sinon.stub(globalThis, "fetch");
            this.mockArticle = {
                id: 999,
                title: "mockTitle",
                author: "mockAuthor",
                body: "mockBody"
            };
		});

		teardown(function () {
			this.fetchStub.restore();
        });

        test("Sends request to the correct endpoint.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK"
            };

            const expectedEndpoint = ARTICLE_ENDPOINT + "/" + this.mockArticle.id;

            this.fetchStub.resolves(mockResponse);

            deleteArticle(this.mockArticle.id);

            sinon.assert.calledWith(this.fetchStub, expectedEndpoint);
        });

        test("Sends a DELETE request.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK"
            };
            
            const expectedEndpoint = ARTICLE_ENDPOINT + "/" + this.mockArticle.id;

            this.fetchStub.resolves(mockResponse);

            deleteArticle(this.mockArticle.id);

            sinon.assert.calledWith(this.fetchStub, expectedEndpoint, sinon.match(function(value) {
                if (!value) return false;
                if (!value.method) return false;
                return value.method.toUpperCase() == "DELETE";
            }));
        });

        test("Returns a promise that resolves on an ok status code.", function() {
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: "OK"
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = deleteArticle(this.mockArticle.id);

            assert.isFulfilled(actualData);
        });

        test("Returns a promise that rejects if the fetch fails.", function() {
            this.fetchStub.rejects();

            const actualData = deleteArticle(this.mockArticle.id);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the HTTP request fails.", function() {
          const mockResponse = {
                ok: false,
                status: 500,
                statusText: "Internal Server Error"
            };

            this.fetchStub.resolves(mockResponse);

            const actualData = deleteArticle(this.mockArticle.id);

            assert.isRejected(actualData);
        });

        test("Returns a promise that rejects if the article ID is missing.", function() {
            const actualData = deleteArticle();

            assert.isRejected(actualData);
        });
    });
});