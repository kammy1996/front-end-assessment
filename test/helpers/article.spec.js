import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import sinon from "sinon";

import { getTitlesById } from "../../src/helpers/article";

suite("articleHelper", function() {
    suite("getTitlesById", function() {
        setup(function() {
            this.articles = [
                {
                    id: 1,
                    title: "article1",
                    author: "author1",
                    body: "body1"
                },
                {
                    id: 0,
                    title: "article0",
                    author: "author0",
                    body: "body0"
                },
                {
                    id: 4,
                    title: "article4",
                    author: "author4",
                    body: "body4"
                },
                {
                    id: 3,
                    title: "article3",
                    author: "author3",
                    body: "body3"
                },
                {
                    id: 2,
                    title: "article2",
                    author: "author2",
                    body: "body2"
                }
            ];
        });

        test("Returns an array.", function() {
            const actual = getTitlesById(this.articles);

            assert.isArray(actual);
        });

        test("Returns an array with an element for each element in the source.", function() {
            const actual = getTitlesById(this.articles);

            assert.equal(actual.length, this.articles.length);
        });

        test("Returned objects contain an \"id\" property.", function() {
            const actual = getTitlesById(this.articles);

            for (let a = 0, l = actual.length; a < l; a++) {
                if(!actual[a].hasOwnProperty("id"))
                    assert.fail("Object does not have an \"id\" property:\n" + JSON.stringify(actual[a]));
            }

            assert(true);
        });

        test("Returned objects contain a \"text\" property.", function() {
            const actual = getTitlesById(this.articles);

            for (let a = 0, l = actual.length; a < l; a++) {
                if(!actual[a].hasOwnProperty("text"))
                    assert.fail("Object does not have a \"text\" property:\n" + JSON.stringify(actual[a]));
            }

            assert(true);
        });

        test("Returned objects do not contain any additional properties.", function() {
            const actual = getTitlesById(this.articles);

            for (let a = 0, l = actual.length; a < l; a++) {
                if(Object.keys(actual[a]).length > 2)
                    assert.fail("Object has too many peorerties:\n" + JSON.stringify(actual[a]));
            }

            assert(true);
        });
    });
});