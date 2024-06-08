import workoutData from "../data/workoutData.json";

const compoundSegments = {
  Push: ["Chest", "Triceps", "Shoulders"],
  Pull: ["Back", "Biceps"],
};

const getRandomExercise = (bodySegments) => {
  // const exercises = bodySegments
  //   .flatMap((segment) => workoutData.exercises?.[segment] || [])
  //   .filter((exercise) => exercise);
  const exercises = bodySegments
    .flatMap((segment) =>
      workoutData.exercises[segment].exercises.map((exercise) => ({
        name: exercise,
        segment: segment,
        image: workoutData.exercises[segment].image,
      }))
    )
    .filter((exercise) => exercise);

  // console.log("exercises:", exercises);

  if (exercises.length === 0) {
    console.log("No exercises found for the selected body segments.");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * exercises.length);
  const selectedExercise = exercises[randomIndex];

  // Remove the selected exercise to avoid repeats
  //exercises.splice(randomIndex, 1);

  return selectedExercise;
};

export const getRandomExercises = (bodySegments, count, lockedList) => {
  // Expand compound segments
  const expandedSegments = bodySegments.flatMap((segment) => {
    return compoundSegments[segment] || segment;
  });

  const selectedExercises = [];
  // console.log("lockedList: ", lockedList);
  for (let i = 0; i < count; i++) {
    let e = lockedList.find((lock) => lock.index === i);

    if (e === undefined) {
      const selectedExercise = getRandomExercise(expandedSegments);

      if (selectedExercise === null) {
        // No more exercises available
        break;
      }

      const isExerciseInLockedList = lockedList.some(
        (lock) => lock.name === selectedExercise.name
      );
      if (
        selectedExercises.some((ex) => ex.name === selectedExercise.name) ||
        isExerciseInLockedList
      ) {
        i--;
        continue;
      }
      // if (
      //   selectedExercises.includes(selectedExercise) ||
      //   isExerciseInLockedList
      // ) {
      //   i--;
      //   continue;
      // }
      if (selectedExercise !== null) {
        selectedExercises.push(selectedExercise);
      } else {
        // No more exercises available
        break;
      }
    } else {
      selectedExercises.push({
        name: e.name,
        segment: e.segment,
        image: e.image,
        index: e.index,
      });
    }
  }

  return { selectedExercises, lockedList }; //, updatedBodySegments: bodySegments };
};
