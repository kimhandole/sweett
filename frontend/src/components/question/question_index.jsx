import React from 'react';
import { withRouter } from 'react-router-dom'
import QuestionIndexItemContainer from './question_index_item_container';

class QuestionIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedEasyQuestions: false,
            loadedMediumQuestions: false,
            loadedHardQuestions: false
        }
    }

    componentDidMount() {
        this.props.requestQuestions(this.props.match.params.categoryId);
    }

    renderMoreQuestions(questions, length) {
        return questions.slice(3).map((question, idx) => <QuestionIndexItemContainer key={idx+3+length} question={question} idx={idx+3+length} />);
    }

    handleLoadMore(input) {
        this.setState({[input]: true});
    }

    renderLoadMore(length, input) {
        if(length > 3) {
            return (
                <div onClick={event => this.handleLoadMore(input)} class="load-more">
                    <h1>Load More</h1>
                </div>  
            );
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const questionIndex = document.getElementsByClassName("question-index")[0];
        const goalIndex = document.getElementsByClassName("goal-index")[0];
        const sidebarToggleButton = document.getElementById("sidebar-toggle-button");

        // re-style question, goal divs
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
            questionIndex.style.width = "64%";
            goalIndex.style.width = "20%";
            sidebarToggleButton.style.left = "0.2%";
        } else {
            sidebar.style.display = "none";
            questionIndex.style.width = "72%";
            goalIndex.style.width = "28%";
            sidebarToggleButton.style.left = "0.2%";
        }
    }

    render() {
        const easyQuestionlength = this.props.easyQuestions.length;
        const mediumQuestionlength = this.props.mediumQuestions.length;

        return (
            <div className="question-index">
                <button id="sidebar-toggle-button" onClick={this.toggleSidebar}>
                </button>
                <div className="question-title-description-add">
                    <div className="question-title-description">
                        <p className="question-index-title">QUESTIONS</p>
                        <p className="question-index-description">{this.props.actualTime}/{this.props.expectedTime}</p>
                    </div>
                    <div id="question-add" onClick={() => this.props.addQuestion()}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" className="svg-inline--fa fa-plus-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
                    </div>
                </div>

                <div id="question-index-container">
                    <div className="question-container">
                        <p className="question-container-title">Easy</p>
                        {
                            this.props.easyQuestions.slice(0, 3).map((question, idx) => <QuestionIndexItemContainer key={idx} question={question} idx={idx} />)
                        }
                        {this.state.loadedEasyQuestions ? this.renderMoreQuestions(this.props.easyQuestions, 0) : this.renderLoadMore(this.props.easyQuestions.length, "loadedEasyQuestions")}
                    </div>
                    <div className="question-container">
                        <p className="question-container-title">Medium</p>
                        {
                            this.props.mediumQuestions.slice(0, 3).map((question, idx) => <QuestionIndexItemContainer key={idx + easyQuestionlength} question={question} idx={idx + easyQuestionlength} />)
                        }
                        {this.state.loadedMediumQuestions ? this.renderMoreQuestions(this.props.mediumQuestions, easyQuestionlength) : this.renderLoadMore(this.props.mediumQuestions.length, "loadedMediumQuestions")}
                    </div>
                    <div className="question-container">
                        <p className="question-container-title">Hard</p>
                        {
                            this.props.hardQuestions.slice(0, 3).map((question, idx) => <QuestionIndexItemContainer key={idx + easyQuestionlength + mediumQuestionlength} question={question} idx={idx + easyQuestionlength + mediumQuestionlength} />)
                        }
                        {this.state.loadedHardQuestions ? this.renderMoreQuestions(this.props.hardQuestions, easyQuestionlength + mediumQuestionlength) : this.renderLoadMore(this.props.hardQuestions.length, "loadedHardQuestions")}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(QuestionIndex);