// Banner images
import AnxietyBanner from "../../../assets/Lessons/Anxiety_Banner.jpg";
import DepressionBanner from "../../../assets/Lessons/Depression_Banner.jpg";
import PTSD_Banner from "../../../assets/Lessons/PTSD_Banner.jpg";

// Anxiety Lesson 1 images
import Anxiety01_01 from "../../../assets/Lessons/Anxiety_1/Anxiety01_01.jpg";
import Anxiety01_02 from "../../../assets/Lessons/Anxiety_1/Anxiety01_02.jpg";
import Anxiety01_03 from "../../../assets/Lessons/Anxiety_1/Anxiety01_03.jpg";
import Anxiety01_04 from "../../../assets/Lessons/Anxiety_1/Anxiety01_04.jpg";
import Anxiety01_05 from "../../../assets/Lessons/Anxiety_1/Anxiety01_05.jpg";

export const topics = [

    // Dummy data for Anxiety topic 
    {
        id: 1,
        key: "anxiety",
        title: "Anxiety",
        banner: AnxietyBanner,
        links: [
            "What is Anxiety?",
            "Symptoms & Signs of Anxiety",
            "Coping Strategies for Anxiety"
        ],

        // Content for each lesson
        pages: {
            "what-is-anxiety": [
                {
                    title: "The Basics",
                    content: [
                        "Anxiety is often described as a feeling of fear or unease - and it's something everyone experiences at times. Feeling anxious is a perfectly natural reaction to some situations.",
                        "Anxiety can become a problem if we start worrying a lot about small stuff or relatively harmless situations. It's usually when our anxiety feels really intense or overwhelming that it starts to interfere with our daily life or affect our relationships."
                    ],
                    img: Anxiety01_01,
                    img_position: "right"
                },

                {
                    title: "How does it affect you?",
                    content: [
                        "Anxiety can affect our mind, body and behaviour. We might feel tearful, get stress headaches, or start avoiding things or people that trigger anxiety.",
                        "Common symptoms of anxiety include:",
                        "- Feeling tired, restless or irritable",
                        "- Feeling shaky or dizzy, sweating more",
                        "- Being unable to concentrate or make decisions",
                        "- Trouble sleeping",
                        "- Worrying about the past or future, or thinking something bad will happen"
                    ],
                    img: Anxiety01_02,
                    img_position: "left"
                },

                {
                    title: "What causes it?",
                    content: [
                        "Anxiety can be caused by many different situations and life experiences.",
                        "How anxiety affects us is very personal, and if you asked 100 people what it means to them, you'd probably get 100 different answers.",
                        "Sometimes there are no obvious triggers for anxiety, which can be stressful or upsetting.",
                        "Everyone's anxiety levels are different. Some people find more situations stressful and experience more challenges in life than others, and they get more anxious as a result."
                    ],
                    img: Anxiety01_03,
                    img_position: "left"
                },
                {
                    title: "How can you manage?",
                    content: [
                        "Understanding how to deal with the stresses and anxieties we all experience on a day-to-day basis is important for everyone.",
                        "Everyone's tolerance to the stresses of life is different, meaning how people manage their anxiety is also be unique to them.",
                        "There are several ways you can manage your anxiety, though there is no single 'catch-all' solution.",
                        
                    ],
                    img: Anxiety01_04,
                    img_position: "right"
                },
                {
                    title: "Tips on Managing Anxiety",
                    content: [
                        "Tips on managing anxiety:",
                        "- Shift your focus: Try mindfulness, meditation, breathing exercises.",
                        "- Understand your anxiety: Keep a journal or diary.",
                        "- Face your fears gradually: Slowly facing stressful situations can help.",
                        "- Make time for worries: Set a daily 'worry time'.",
                        "- Look at the bigger picture instead of focusing on details."
                    ],
                    img: Anxiety01_05,
                    img_position: "right"
                }
            ],

            "symptoms-&-signs-of-anxiety": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ],

            "coping-strategies-for-anxiety": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ]
        },

        // Quizzes for each lesson
        quiz: {
            "what-is-anxiety": [
                {
                    question: "When does anxiety typically become a problem?",
                    options: [
                        "When it makes day-to-day life difficult",
                        "Whenever you feel nervous",
                        "Only during major emergencies",
                        "When someone tells you to calm down"],
                    answer: 0
                },
                {
                    question: "Which of the following is a common physical symptom of anxiety?",
                    options: [
                        "Improved concentration",
                        "Feeling shaky or dizzy",
                        "Increased energy",
                        "Lower heart rate"
                    ],
                    answer: 1
                },

                {
                    question: "Anxiety can affect which parts of a person?",
                    options: [
                        "Only their thoughts",
                        "Only their physical health",
                        "Only their relationships",
                        "Mind, body, and behaviour"],
                    answer: 3
                },

                {
                    question: "Which of the following is listed as a strategy for managing anxiety?",
                    options: [
                        "Ignoring stressul situations completely",
                        "Writing a daily journal or diary",
                        "Avoiding all social contact",
                        "Keeping worries to yourself"],
                    answer: 1
                },

                {
                    question: "Which statement best describes the causes of anxiety?",
                    options: [
                        "It can arise from many experiences and varies from person to person",
                        "Everyone experiences anxiety in the exact same way",
                        "Anxiety always has a clear and obvious cause",
                        "It is caused only by genetics"],
                    answer: 0
                }
            ],
        }
    },

    // Dummy data for Depression topic 
    {
        id: 2,
        key: "depression",
        title: "Depression",
        banner: DepressionBanner,
        links: [
            "What is Depression?",
            "Symptoms & Signs of Depression",
            "Coping Strategies for Depression"
        ],

        pages: {
            "what-is-depression": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ],

            "symptoms-&-signs-of-depression": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ],

            "coping-strategies-for-depression": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ]
        },

        // Quizzes for each lesson
        quiz: {
            "what-is-anxiety": [
                {
                    question: "When does anxiety typically become a problem?",
                    options: [
                        "Option 1!",
                        "Option 2!",
                        "Option 3!",
                        "Option 4!"],
                    answer: 0
                }
            ],
        }
    },

    // Dummy data for PTSD topic 
    {
        id: 3,
        key: "PTSD",
        title: "Post-traumatic stress disorder (PTSD)",
        banner: PTSD_Banner,
        links: [
            "What is PTSD?",
            "Symptoms & Signs of PTSD",
            "Coping Strategies for PTSD"
        ],

        pages: {
            "what-is-ptsd": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ],

            "symptoms-&-signs-of-ptsd": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ],

            "coping-strategies-for-ptsd": [
                {
                    title: "Nothing here!",
                    content: [
                        "This page is currently has no content. More information coming soon!"
                    ]
                }
            ]
        },

        // Quizzes for lessons
        quiz: {
            "what-is-anxiety": [
                {
                    question: "When does anxiety typically become a problem?",
                    options: [
                        "Option 1!",
                        "Option 2!",
                        "Option 3!",
                        "Option 4!"],
                    answer: 0
                }
            ],
        }
    }
];
