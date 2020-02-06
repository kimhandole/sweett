import React from 'react';
import { withRouter } from 'react-router-dom'
import SidebarContainer from '../sidebar/sidebar_container';
import TaskIndexContainer from '../tasks/task_index_container';
import GoalIndexContainer from '../goal/goal_index_container';


class DefaultCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="leetcode">
                <SidebarContainer />
                <TaskIndexContainer category={this.props.category} />
                <GoalIndexContainer categoryId={this.props.category._id} />
            </div>
        );
    }
}

export default withRouter(DefaultCategory);