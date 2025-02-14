export interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
}


export interface CreateCapsule {
    name: string;
    userEmail: string;
    endDate: string;
    ImageUpload?: string[];  // Optional, to handle cases where file uploads might not be provided
    VideoUpload?: string[];
}

export interface Riddle  {
    riddle: string;  // The riddle question itself
    answer: string;  // The correct answer to the riddle
}

export interface RiddleQuizStatus {
    answerCount: number; // Number of correct answers the user has given
    status: "LOCKED" | "UNLOCKED"; // Status of the riddle quiz
}

export interface RiddleQuiz {
    riddles: Riddle[]; // List of riddles for the quiz
    currentRiddleIndex: number; // The index of the current riddle
    userAnswer: string; // The user's answer to the current riddle
    message: string; // Message to be displayed after checking the answer
    status: RiddleQuizStatus; // Status of the quiz
}