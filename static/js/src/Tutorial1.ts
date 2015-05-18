///<reference path="./references.d.ts" />

import React = require("react/addons");



interface CommentProps {
    author : string;
    children : string;
}

class Comment extends React.Component<CommentProps, any> {
    render() {
        var rawMarkup:string = marked(this.props.children.toString(), {sanitize: true});
        return React.jsx(`
                         <div className="comment">
                           <h2 className="commentAuthor">
                             {this.props.author}
                           </h2>
                           <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
                         </div>
                         `)
    }
}

interface CommentListType {
    author: string;
    text: string;
}

interface CommentListProps {
    data: Array<CommentListType>;
}

class CommentList extends React.Component<CommentListProps, any> {
    render() {
        var commentNodes = this.props.data.map(comment => React.jsx(`
                                                                    <Comment author={comment.author}>
                                                                      {comment.text}
                                                                    </Comment>
                                                                    `));
        return React.jsx(`
                         <div className="commentList">
                           {commentNodes}
                         </div>
                         `)
    }
}

interface CommentFormProps {
    onCommentSubmit(comment: CommentListType): any;
}


class CommentForm extends React.Component<any, any> {
    handleSubmit = (e) => {
        e.preventDefault();
        var author = (<HTMLInputElement>React.findDOMNode(this.refs["author"])).value.trim();
        var text = (<HTMLInputElement>React.findDOMNode(this.refs["text"])).value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        (<HTMLInputElement>React.findDOMNode(this.refs["author"])).value = '';
        (<HTMLInputElement>React.findDOMNode(this.refs["text"])).value = '';
        return;
    }
    render() {
        return React.jsx(`
                         <form className="commentForm" onSubmit={this.handleSubmit}>
                           <input type="text" placeholder="Your name" ref="author"/>
                           <input type="text" placeholder="Say something..." ref="text"/>
                           <input type="submit" value="Post" />
                         </form>
                         `)
    }
}


interface CommentBoxProps {
    url: string;
    pollInterval: number;
}

interface CommentBoxState {
    data: Array<CommentListType>;
}

class CommentBox extends React.Component<CommentBoxProps, CommentBoxState> {

    static defaultProps = {url: "/", pollInterval: 2000};
    state = {data: []};

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleCommentSubmit = (comment) => {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(() => this.loadCommentsFromServer(), this.props.pollInterval);
    }

    render() {
        return React.jsx( `
                          <div className="commentBox">
                            <h1>Comments</h1>
                            <CommentList data={this.state.data}/>
                            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                          </div>
                          `)
    }
}

React.render(React.jsx(`
                       <CommentBox url="comments.json" pollInterval={2000} />
                       `)
            , document.getElementById("content"));
