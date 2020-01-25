export const formatTime = (time) => {
    let hours = 0;
    let minutes = 0;

    while(time > 59) {
        minutes += 1;
        time -= 59;
    }

    while(minutes > 59) {
        hours += 1;
        minutes -= 59;
    }

    return `${hours}:${minutes}:${time}`;
};

export const calculateExpectedTime = (attempts) => {
    let totalTime = 0;
    for(let i = 0; i < attempts.length; i++) {
        if (goals[i].addToTotal) totalTime += attempts[i].time;
    }

    return totalTime;
};

export const calculateActualTime = (actualTime, limits, goals) => {
    let totalQuestions = 0;
    for(let i = 0; i < goals.length; i++) {
        if(goals[i].addToTotal) totalQuestions += goals[i].actual;
    }

    for(let i = 0; i < limits.length; i++) {
        totalQuestions *= limits[i];
    }

    return (actualTime + totalQuestions);
};
export const calculateProgress = (goal) => {
    return parseFloat(((goal.attempted / goal.expected) * 100).toFixed(2));
}

export const calculateTotalProgress = (goals) => {
    let attempted = 0;
    let expected = 0;
    for(let i = 0; i < goals.length; i++) {
        attempted += goals[i].attempted;
        expected += goals[i].expected;
    }

    return parseFloat(((attempted / expected) * 100).toFixed(2));
}