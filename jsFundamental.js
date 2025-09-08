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
  let learnerDataDraft = [];
  const learnerDataResult = [];
  
//   for (let i = 0; i < submissions.length; i++){
//     console.log(submissions[i].learner_id)

//     if ((submissions[i].learner_id) === (learnerDataResult[i-1].learner_id)) {
//         continue;
//     }
//     else {
//         let testObj1 = {
//             id: submissions[i].learner_id,
//             total_average: 0,
//             //update assignments to change depending on assignment count in assignment group
//             assignment1_average: 0,
//             assignment2_average: 0,
//             assignment3_average: 0
//         }
//         learnerDataResult.push(testObj1)
//     }

//   }
  
  submissions.forEach(
    (submissionObj) => {
        // if id of proposed submission is the same as a previous submission, update avr n stuff
        // this is to make sure students submisisons are matched to them and not creating duplicate student objects
        // if (submissionObj.learner_id === learnerDataResult)
        let testObj1 = {
            id: submissionObj.learner_id,
            total_average: 0,
            assignment1_average: 0,
            assignment2_average: 0,
            assignment3_average: 0
        }

        let count = 0;
        // if (testObj1.id == learnerDataResult[count-1].learner_id) {
        //     // continue;
        // }
        // let learnerIdMatch1 = testObj1.id
        // let learnerIdMatch2 = learnerDataResult[count-1].learner_id

        learnerDataDraft.push(testObj1)
    }
  )
  console.log(learnerDataDraft);
  
  //THIS IS AN ISSUE OF OUT OF BOUNDS SHITS
  for (let i = 0; i < learnerDataDraft.length; i++){

    // let learnerIdMatch1 = learnerDataDraft[i-1].id
    // let learnerIdMatch2 = learnerDataDraft[i].id

    for (let g = i+1; g < learnerDataDraft.length; g++) {
      // let learnerIdMatch2 = learnerDataDraft[i].id

      if (learnerDataDraft[i].id !== learnerDataDraft[g].id)
      if (learnerDataDraft[i].id !== learnerDataDraft[g].id) {
        console.log("new learner submission\ni = " + i + "\ng = " + g)
        break;
      }
      else {
        console.log("duplicate learner submission\ni = " + i + "\ng = " + g)
        //data manipulation code
        // learnerDataDraft.splice(g, 1)
      }
    }

    // if ((learnerDataDraft[i].id) === (learnerDataDraft[i-1].id)) {
    //     continue;
    // }
    // else {
    //     let testObj1 = {
    //         id: submissions[i].learner_id,
    //         total_average: 0,
    //         //update assignments to change depending on assignment count in assignment group
    //         assignment1_average: 0,
    //         assignment2_average: 0,
    //         assignment3_average: 0
    //     }
    //     learnerDataResult.push(testObj1)
    // }

  }



  console.log(learnerDataDraft)
  console.log(learnerDataResult)


//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

  return learnerDataResult;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);