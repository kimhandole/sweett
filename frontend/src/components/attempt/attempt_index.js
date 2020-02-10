import React from 'react';
import AttemptIndexItemContainer from './attempt_index_item_container';
import { leetcode_question_titles } from '../../util/leetcode_questions';

class AttemptIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: props.question,
            note: props.question.note
        }

        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.handleEditQuestion = this.handleEditQuestion.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }


    // componentDidUpdate(preProps) {
    //     if(this.props.attempts.length !== preProps.attempts.length) {
    //         console.log(this.props.attempts.length);
    //         this.props.requestQuestionAttempts(this.props.question._id);
    //     }
    // }

    handleDeleteQuestion(e) {
        this.props.deleteQuestion(this.props.question._id);
    }

    handleEditQuestion(e) {
        const questionEdit = document.getElementsByClassName("question-edit-form")[this.props.idx];
        const questionTitleSubmit = document.getElementsByClassName("question-edit-form-submit")[this.props.idx];
        // able
        if (questionEdit.disabled) {
            questionEdit.disabled = false;
            questionEdit.style.backgroundColor = "lightgrey";
            questionTitleSubmit.style.display = "block";
        } 
        // disable
        else {
            questionEdit.disabled = true;
            questionEdit.style.backgroundColor = "transparent";
            questionTitleSubmit.style.display = "none";
        }
    }

    validateQuestionName() {
        if (leetcode_question_titles.includes(this.state.question.name)) {
            return true;
        } else {
            return false;
        }
    }

    questionNote() {
        // e.preventDefault();
        return (
            <form className="question-note-form" onSubmit={this.updateNote}>
                <input type="textarea" className="question-note-input" placeholder="Note for question" />
                <input className="question-note-submit" type="submit" value="SAVE NOTE" />
            </form>
        );
    }

    updateNote(e) {
        this.setState({
            note: e.currentTarget.value
        }, () => {
                let newQuestion = this.state.question;
                newQuestion.note = this.state.note;
                this.props.updateQuestion(newQuestion);
        });
    }

    render() {
        if (!this.props.attempts)  return <ul className="attempts-list invisible"></ul>;

        return (
            <ul className="attempts-list invisible">

                {
                    this.props.attempts.map((attempt, idx) => <AttemptIndexItemContainer key={idx} attempt={attempt} idx={idx} />)
                }
                {this.questionNote()}

                <div className="question-delete-container">   
                    <button id="question-edit-btn" className="question-edit" onClick={this.handleEditQuestion}>EDIT TITLE</button>
                    { this.validateQuestionName() ? <a className="question-link" target="_blank" href={`https://leetcode.com/problems/${this.props.question.name.toLowerCase().split(" ").join("-")}`}>LEETCODE</a> : null}
                    <button className="question-delete" onClick={this.handleDeleteQuestion}>DELETE QUESTION</button>
                </div>
            </ul>
        );
    }
}

export default AttemptIndex;