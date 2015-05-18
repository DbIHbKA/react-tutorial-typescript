/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="./references.d.ts" />
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(2);
	var Comment = (function (_super) {
	    __extends(Comment, _super);
	    function Comment() {
	        _super.apply(this, arguments);
	    }
	    Comment.prototype.render = function () {
	        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
	        return (React.createElement("div", { className: "comment" }, React.createElement("h2", { className: "commentAuthor" }, this.props.author), React.createElement("span", { dangerouslySetInnerHTML: { __html: rawMarkup } })));
	    };
	    return Comment;
	})(React.Component);
	var CommentList = (function (_super) {
	    __extends(CommentList, _super);
	    function CommentList() {
	        _super.apply(this, arguments);
	    }
	    CommentList.prototype.render = function () {
	        var commentNodes = this.props.data.map(function (comment) { return (React.createElement(Comment, { author: comment.author }, comment.text)); });
	        return (React.createElement("div", { className: "commentList" }, commentNodes));
	    };
	    return CommentList;
	})(React.Component);
	var CommentForm = (function (_super) {
	    __extends(CommentForm, _super);
	    function CommentForm() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.handleSubmit = function (e) {
	            e.preventDefault();
	            var author = React.findDOMNode(_this.refs["author"]).value.trim();
	            var text = React.findDOMNode(_this.refs["text"]).value.trim();
	            if (!text || !author) {
	                return;
	            }
	            _this.props.onCommentSubmit({ author: author, text: text });
	            React.findDOMNode(_this.refs["author"]).value = '';
	            React.findDOMNode(_this.refs["text"]).value = '';
	            return;
	        };
	    }
	    CommentForm.prototype.render = function () {
	        return (React.createElement("form", { className: "commentForm", onSubmit: this.handleSubmit }, React.createElement("input", { type: "text", placeholder: "Your name", ref: "author" }), React.createElement("input", { type: "text", placeholder: "Say something...", ref: "text" }), React.createElement("input", { type: "submit", value: "Post" })));
	    };
	    return CommentForm;
	})(React.Component);
	var CommentBox = (function (_super) {
	    __extends(CommentBox, _super);
	    function CommentBox() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.state = { data: [] };
	        this.handleCommentSubmit = function (comment) {
	            var comments = _this.state.data;
	            var newComments = comments.concat([comment]);
	            _this.setState({ data: newComments });
	        };
	    }
	    CommentBox.prototype.loadCommentsFromServer = function () {
	        var _this = this;
	        $.ajax({
	            url: this.props.url,
	            dataType: "json",
	            cache: false,
	            success: function (data) {
	                _this.setState({ data: data });
	            },
	            error: function (xhr, status, err) {
	                console.error(_this.props.url, status, err.toString());
	            }
	        });
	    };
	    CommentBox.prototype.componentDidMount = function () {
	        var _this = this;
	        this.loadCommentsFromServer();
	        setInterval(function () { return _this.loadCommentsFromServer(); }, this.props.pollInterval);
	    };
	    CommentBox.prototype.render = function () {
	        return (React.createElement("div", { className: "commentBox" }, React.createElement("h1", null, "Comments"), React.createElement(CommentList, { data: this.state.data }), React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })));
	    };
	    CommentBox.defaultProps = { url: "/", pollInterval: 2000 };
	    return CommentBox;
	})(React.Component);
	React.render((React.createElement(CommentBox, { url: "comments.json", pollInterval: 2000 })), document.getElementById("content"));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ }
/******/ ]);