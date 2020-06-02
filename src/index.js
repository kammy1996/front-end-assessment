import Vue from "vue";
import App from "Components/App";
import "./index.css";

new Vue({
    el: "#app",
    components: {
        "app-component": App
    },
    render: function (createElement) {
        return createElement("app-component");
    }
});