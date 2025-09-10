// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345, // ID of the assignment group (think of it like the multiplication lesson in a math class)
  name: "Fundamentals of JavaScript",
  course_id: 451, // ID of the course the assignment group belongs to (think of it like math class)
  group_weight: 25, // % weight of this assignment group (if math class has 4 lessons, each weigh 25)
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.

  // each object in this array will be organized based on individual learners

  // every object will hold the learners ID, the learner's total weighted avr,---
  // --- the percentage score of each of the learner's completed assignments, ---
  // --- if the assignment is not due, do not include it ANYWHERE smh
  const learnerDataDraft = [];
  const learnerDataResult = [];
  
  submissions.forEach(
    (submissionObj) => {
        // if id of proposed submission is the same as a previous submission, update avr n stuff
        // this is to make sure students submisisons are matched to them and not creating duplicate student objects
        // if (submissionObj.learner_id === learnerDataResult)
        let testObj1 = {
            learnerId: submissionObj.learner_id,
            assignmentID: submissionObj.assignment_id,
            submitDate: submissionObj.submission.submitted_at,
            submitScore: submissionObj.submission.score,
            scoreSum: 0,
            maxScoreSum: 0,
            total_average: 0,
            assignmentIdList: [],
            assignmentsScoreList: [],
            // assignmentsScoreList: []
        }

        learnerDataDraft.push(testObj1)
    }
  )

  function dueDateCheck(lnrDateStr, agDateStr) {
    let lnrDateArray = lnrDateStr.split("-")
    let agDateArray = agDateStr.split("-")
    // console.log(lnrDateArray)
    // console.log(agDateArray)
    let acceptAssignment = true

    
    for (let z = 0; z < lnrDateArray.length; z++) {
      if (lnrDateArray[z] == agDateArray[z]) {
        continue;
      }
      else if (lnrDateArray[z] < agDateArray[z]) {
        acceptAssignment = false;
        break;
      }
      else {
        acceptAssignment = true;
        break;
      }
    }

    return acceptAssignment;
  }

  console.log(learnerDataDraft);

  let count = 0;

  learnerDataDraft.forEach(
    (learnerSubmit) => {
        if (learnerDataResult == "") {
            learnerDataResult.push(learnerSubmit)

            if (dueDateCheck(learnerSubmit.submitDate, ag.assignments[(learnerSubmit.assignmentID-1)].due_at) == true) {
              learnerDataResult[count].scoreSum += learnerSubmit.submitScore
              learnerDataResult[count].maxScoreSum += ag.assignments[(learnerSubmit.assignmentID-1)].points_possible
              learnerDataResult[count].assignmentIdList.push(learnerSubmit.assignmentID)
              learnerDataResult[count].assignmentsScoreList.push(ag.assignments[(learnerSubmit.assignmentID-1)].points_possible)
            }

            console.log("The assignment worth -"+ag.assignments[(learnerSubmit.assignmentID-1)].points_possible+" pts- was added")
        }
        else if (learnerDataResult[count].learnerId == learnerSubmit.learnerId) {

            if (dueDateCheck(learnerSubmit.submitDate, ag.assignments[(learnerSubmit.assignmentID-1)].due_at) == true) {
              learnerDataResult[count].scoreSum += learnerSubmit.submitScore
              learnerDataResult[count].maxScoreSum += ag.assignments[(learnerSubmit.assignmentID-1)].points_possible
              learnerDataResult[count].assignmentIdList.push(learnerSubmit.assignmentID)
              learnerDataResult[count].assignmentsScoreList.push(ag.assignments[(learnerSubmit.assignmentID-1)].points_possible)
            }

            console.log("The assignment worth -"+ag.assignments[(learnerSubmit.assignmentID-1)].points_possible+" pts- was added")
            learnerDataResult[count].total_average = learnerDataResult[count].scoreSum/learnerDataResult[count].maxScoreSum
        }
        else if (learnerDataResult[count].learnerId !== learnerSubmit.learnerId) {
            learnerDataResult.push(learnerSubmit)
            learnerDataResult[count].total_average = learnerDataResult[count].scoreSum/learnerDataResult[count].maxScoreSum
            count++

            if (dueDateCheck(learnerSubmit.submitDate, ag.assignments[(learnerSubmit.assignmentID-1)].due_at) == true) {
              learnerDataResult[count].maxScoreSum += ag.assignments[(learnerSubmit.assignmentID-1)].points_possible
              learnerDataResult[count].assignmentIdList.push(learnerSubmit.assignmentID)
              learnerDataResult[count].assignmentsScoreList.push(ag.assignments[(learnerSubmit.assignmentID-1)].points_possible)
              console.log("The assignment worth -"+ag.assignments[(learnerSubmit.assignmentID-1)].points_possible+" pts- was added")
              learnerDataResult[count].scoreSum += learnerSubmit.submitScore
            }
        }
        else {
            console.log("something's wrong again jeff :(")
        }
    }
  )

  const learnerDataFormatted = [];
  for (let y = 0; y < learnerDataResult.length; y++) {
    let tempObj = {
      learner_id: learnerDataResult[y].learnerId,
      learner_weight_average: ((Math.round((learnerDataResult[y].total_average)*1000))/10)+"%",
      learner_submissions: "assignment id: "+learnerDataResult[y].assignmentID+"; assignment score: "+learnerDataResult[y].submitScore/ag.assignments[(learnerDataResult[y].assignmentID)-1].points_possible
      // [
      //   {
      //     assignment_ID: learnerDataResult[y].assignmentID,
      //     assignment_score: learnerDataResult[y].submitScore/ag.assignments[(learnerDataResult[y].assignmentID)-1].points_possible
      //   }
      // ]
    }
    learnerDataFormatted.push(tempObj)
  }

  console.log("Below is the length of the draft and the draft data")
  console.log(learnerDataDraft.length)
  console.log(learnerDataDraft)
  console.log("Below is the length of the final and the final data")
  console.log(learnerDataResult.length)
  console.log(learnerDataResult)


  return learnerDataFormatted;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);